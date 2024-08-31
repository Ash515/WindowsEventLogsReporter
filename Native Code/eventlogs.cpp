#include <jni.h>
#include <windows.h>
#include <wbemidl.h>
#include <vector>
#include <string>
#include <map>
#include <algorithm> // Include for std::sort
#include <iostream>

#pragma comment(lib, "wbemuuid.lib")
#pragma comment(lib, "ole32.lib")

std::wstring BSTRToWString(BSTR bstr) {
    return std::wstring(bstr, SysStringLen(bstr));
}

uint64_t StandardizeTimeFormat(const std::wstring& timeString) {
    if (timeString.length() >= 14) {
        std::wstring standardizedTime = timeString.substr(0, 14); // Extract YYYYMMDDHHMMSS part
        return std::stoull(standardizedTime); // Convert to uint64_t
    }
    return 0;
}

HRESULT InitializeWMI(IWbemLocator** pLoc, IWbemServices** pSvc) {
    HRESULT hres = CoInitializeEx(0, COINIT_MULTITHREADED);
    if (FAILED(hres)) return hres;

    hres = CoInitializeSecurity(
        NULL, 
        -1, 
        NULL, 
        NULL, 
        RPC_C_AUTHN_LEVEL_DEFAULT, 
        RPC_C_IMP_LEVEL_IMPERSONATE, 
        NULL, 
        EOAC_NONE, 
        NULL
    );
    if (FAILED(hres)) return hres;

    hres = CoCreateInstance(
        CLSID_WbemLocator, 
        0, 
        CLSCTX_INPROC_SERVER, 
        IID_IWbemLocator, 
        (LPVOID*)pLoc
    );
    if (FAILED(hres)) return hres;

    BSTR namespaceStr = SysAllocString(L"ROOT\\CIMV2");

    hres = (*pLoc)->ConnectServer(
        namespaceStr,  // Namespace
        NULL,          // User name
        NULL,          // Password
        0,             // Locale
        0,             // Security flags
        0,             // Authority
        0,             // Context object
        pSvc           // IWbemServices proxy
    );

    SysFreeString(namespaceStr);

    return hres;
}

bool CompareLogsByTime(const std::pair<uint64_t, std::map<std::wstring, std::wstring>>& lhs, const std::pair<uint64_t, std::map<std::wstring, std::wstring>>& rhs) {
    return lhs.first < rhs.first;
}


std::vector<std::map<std::wstring, std::wstring>> QueryEventLogs(IWbemServices* pSvc) {
    IEnumWbemClassObject* pEnumerator = NULL;
    std::vector<std::pair<uint64_t, std::map<std::wstring, std::wstring>>> logsWithTime;

    std::wstring queryStr = L"SELECT * FROM Win32_NTLogEvent";
    BSTR bstrQuery = SysAllocString(queryStr.c_str());

    HRESULT hres = pSvc->ExecQuery(
        SysAllocString(L"WQL"),
        bstrQuery,
        WBEM_FLAG_FORWARD_ONLY | WBEM_FLAG_RETURN_IMMEDIATELY,
        NULL,
        &pEnumerator
    );

    SysFreeString(bstrQuery);

    IWbemClassObject* pclsObj = NULL;
    ULONG uReturn = 0;

    while (pEnumerator) {
        HRESULT hr = pEnumerator->Next(WBEM_INFINITE, 1, &pclsObj, &uReturn);
        if (0 == uReturn) break;

        VARIANT vtMessage, vtEventCode, vtSourceName, vtType, vtLogfile, vtTimeGenerated;
        std::map<std::wstring, std::wstring> logEntry;
        uint64_t sortableTime = 0;
        uint32_t eventCode = 0;

        hr = pclsObj->Get(L"TimeGenerated", 0, &vtTimeGenerated, 0, 0);
        if (SUCCEEDED(hr)) {
            sortableTime = StandardizeTimeFormat(BSTRToWString(vtTimeGenerated.bstrVal));
            logEntry[L"TimeGenerated"] = BSTRToWString(vtTimeGenerated.bstrVal);
            VariantClear(&vtTimeGenerated);
        }

        hr = pclsObj->Get(L"Message", 0, &vtMessage, 0, 0);
        if (SUCCEEDED(hr)) {
            logEntry[L"Message"] = BSTRToWString(vtMessage.bstrVal);
            VariantClear(&vtMessage);
        }

        hr = pclsObj->Get(L"EventCode", 0, &vtEventCode, 0, 0);
        if (SUCCEEDED(hr)) {
            eventCode = vtEventCode.uintVal;
            logEntry[L"EventCode"] = std::to_wstring(eventCode);
            VariantClear(&vtEventCode);
        }

        hr = pclsObj->Get(L"SourceName", 0, &vtSourceName, 0, 0);
        if (SUCCEEDED(hr)) {
            logEntry[L"SourceName"] = BSTRToWString(vtSourceName.bstrVal);
            VariantClear(&vtSourceName);
        }

        hr = pclsObj->Get(L"Type", 0, &vtType, 0, 0);
        if (SUCCEEDED(hr)) {
            logEntry[L"Type"] = BSTRToWString(vtType.bstrVal);
            VariantClear(&vtType);
        }

        hr = pclsObj->Get(L"Logfile", 0, &vtLogfile, 0, 0);
        if (SUCCEEDED(hr)) {
            logEntry[L"Logfile"] = BSTRToWString(vtLogfile.bstrVal);
            VariantClear(&vtLogfile);
        }

        logsWithTime.emplace_back(sortableTime, logEntry);
        pclsObj->Release();
    }

    pEnumerator->Release();

    std::sort(logsWithTime.begin(), logsWithTime.end(), CompareLogsByTime);

    std::vector<std::map<std::wstring, std::wstring>> sortedLogs;
    for (const auto& log : logsWithTime) {
        sortedLogs.push_back(log.second);
    }

    return sortedLogs;
}

std::vector<std::map<std::wstring, std::wstring>> CollectAllLogs(IWbemServices* pSvc) {
    return QueryEventLogs(pSvc);
}


extern "C" JNIEXPORT jobject JNICALL Java_EventLogCollector_collectAllLogs(JNIEnv* env, jobject obj) {
    IWbemLocator* pLoc = NULL;
    IWbemServices* pSvc = NULL;

    HRESULT hres = InitializeWMI(&pLoc, &pSvc);
    if (FAILED(hres)) {
        return NULL;
    }

    std::vector<std::map<std::wstring, std::wstring>> logs = CollectAllLogs(pSvc);

    jclass arrayListClass = env->FindClass("java/util/ArrayList");
    jobject arrayList = env->NewObject(arrayListClass, env->GetMethodID(arrayListClass, "<init>", "()V"));
    jmethodID addMethod = env->GetMethodID(arrayListClass, "add", "(Ljava/lang/Object;)Z");

    jclass hashMapClass = env->FindClass("java/util/HashMap");
    jmethodID hashMapConstructor = env->GetMethodID(hashMapClass, "<init>", "()V");
    jmethodID putMethod = env->GetMethodID(hashMapClass, "put", "(Ljava/lang/Object;Ljava/lang/Object;)Ljava/lang/Object;");

    for (const auto& log : logs) {
        jobject hashMap = env->NewObject(hashMapClass, hashMapConstructor);

        for (const auto& entry : log) {
            jstring jKey = env->NewString(reinterpret_cast<const jchar*>(entry.first.c_str()), entry.first.length());
            jstring jValue = env->NewString(reinterpret_cast<const jchar*>(entry.second.c_str()), entry.second.length());
            env->CallObjectMethod(hashMap, putMethod, jKey, jValue);
            env->DeleteLocalRef(jKey);
            env->DeleteLocalRef(jValue);
        }

        env->CallBooleanMethod(arrayList, addMethod, hashMap);
        env->DeleteLocalRef(hashMap);
    }

    pSvc->Release();
    pLoc->Release();
    CoUninitialize();

    return arrayList;
}
