const initState = {
  leftBarItem: "",
  leftBarSuccess: false,
  leftBarError: false,
  leftBarLoading: false,

  goToCompare: "",
  goToCompareSuccess: false,
  goToCompareError: false,
  goToCompareLoading: false,

  addRelativeFlag: "",
  addRelativeFlagSuccess: false,
  addRelativeFlagError: false,
  addRelativeFlagLoading: false,

  requestFetchLoading: false,
  requestFetch: false,
  requestFetchLoading: false,
  requests: [],

  getCompanyData: [],
  getCompanyDataLoading: false,
  getCompanyDataSuccess: false,
  getCompanyDataError: false,

  sharePdfSuccess: false,
  sharePdfLoading: false,
  sharePdfError: false,
  sharePdfMsg: null,

  systemResetSuccess: false,
  systemResetLoading: false,
  systemResetError: false,
  message: null,

  pdfDownloadError: false,

  updateEmployeeLoading: false,
  updateEmployeeSuccess: false,
  updateEmployeeErroe: false,
  updateEmployeeData: null,
  updateEmployeeMsg: null,

  insiderExcelDownloadLoading: false,
  insiderExcelDownloadSuccess: false,
  insiderExcelDownloadError: false,
  insiderExcelDownloadMsg: null,

  updateUPSIAccessLoading: false,
  updateUPSIAccessSuccess: false,
  updateUPSIAccessError: false,
  updateUPSIAccessData: null,
  updateUPSIAccessMsg: null,

  downloadUPSILoading: false,
  downloadUPSISuccess: false,
  downloadUPSIError: false,
  downloadUPSIData: null,
  downloadUPSIMsg: null,

  query: null,

  toogleConversationFlag: false,
};

const CommonReducer = (state = initState, action) => {
  switch (action.type) {
    case "NAV_CLICK_SUCCESS":
      return {
        ...state,
        leftBarItem: action.payload,
        leftBarSuccess: true,
        leftBarError: false,
        leftBarLoading: false,
      };
    case "GO_TO_COMPARE_SUCCESS":
      return {
        ...state,
        goToCompare: action.payload,
        goToCompareSuccess: true,
        goToCompareError: false,
        goToCompareLoading: false,
      };
    case "ADD_RELATIVE_FLAG_SUCCESS":
      return {
        ...state,
        addRelativeFlag: action.payload,
        addRelativeFlagSuccess: true,
        addRelativeFlagError: false,
        addRelativeFlagLoading: false,
      };
    case "FETCH_REQUEST_LIST_LOADING":
      return {
        ...state,
        requestFetchLoading: true,
        requestFetchSuccess: false,
        requestFetchError: false,
        requests: [],
      };
    case "FETCH_REQUEST_LIST_SUCCESS":
      console.error("in reducer:: ", action.payload);
      return {
        ...state,
        requestFetchLoading: false,
        requestFetchSuccess: true,
        requestFetchError: false,
        requests: action.payload,
      };
    case "FETCH_REQUEST_LIST_ERROR":
      return {
        ...state,
        requestFetchLoading: false,
        requestFetchSuccess: false,
        requestFetchError: true,
      };
    case "GET_COMPANY_DATA_SUCCESS":
      return {
        ...state,
        getCompanyData: action.payload.data["0"],
        getCompanyDataLoading: false,
        getCompanyDataSuccess: true,
        getCompanyDataError: false,
      };
    case "GET_COMPANY_DATA_ERROR":
      return {
        ...state,
        getCompanyDataLoading: false,
        getCompanyDataSuccess: false,
        getCompanyDataError: true,
      };
    case "SYSTEM_RESET_LOADING":
      return {
        ...state,
        systemResetSuccess: false,
        systemResetLoading: true,
        systemResetError: false,
      };
    case "SYSTEM_RESET_SUCCESS":
      return {
        ...state,
        systemResetSuccess: true,
        systemResetLoading: false,
        systemResetError: false,
      };
    case "SYSTEM_RESET_ERROR":
      return {
        ...state,
        systemResetSuccess: false,
        systemResetLoading: false,
        systemResetError: true,
        message: action.message,
      };
    case "SHARE_PDF_SUCCESS":
      return {
        ...state,
        sharePdfSuccess: true,
        sharePdfLoading: false,
        sharePdfError: false,
      };
    case "SHARE_PDF_ERROR":
      return {
        ...state,
        sharePdfSuccess: false,
        sharePdfLoading: false,
        sharePdfError: true,
        sharePdfMsg: action.message,
      };
    case "SHARE_PDF_LOADING":
      return {
        ...state,
        sharePdfSuccess: false,
        sharePdfLoading: true,
        sharePdfError: false,
      };
    case "UPDATE_EMPLOYEE_LOADING":
      return {
        ...state,
        updateEmployeeLoading: true,
        updateEmployeeSuccess: false,
        updateEmployeeErroe: false,
        updateEmployeeData: null,
        updateEmployeeMsg: null,
      };
    case "UPDATE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        updateEmployeeLoading: false,
        updateEmployeeSuccess: true,
        updateEmployeeErroe: false,
        updateEmployeeData: action.data,
        updateEmployeeMsg: action.message,
      };
    case "UPDATE_EMPLOYEE_ERROR":
      return {
        ...state,
        updateEmployeeLoading: false,
        updateEmployeeSuccess: false,
        updateEmployeeErroe: true,
        updateEmployeeData: action.data,
        updateEmployeeMsg: action.message,
      };
    case "UPDATE_UPSI_ACCESS_LOADING":
      return {
        ...state,
        updateUPSIAccessLoading: true,
        updateUPSIAccessSuccess: false,
        updateUPSIAccessError: false,
        updateUPSIAccessData: null,
        updateUPSIAccessMsg: null,
      };
    case "UPDATE_UPSI_ACCESS_SUCCESS":
      return {
        ...state,
        updateUPSIAccessLoading: false,
        updateUPSIAccessSuccess: true,
        updateUPSIAccessError: false,
        updateUPSIAccessData: action.data,
        updateUPSIAccessMsg: action.message,
      };
    case "UPDATE_UPSI_ACCESS_ERROR":
      return {
        ...state,
        updateUPSIAccessLoading: false,
        updateUPSIAccessSuccess: false,
        updateUPSIAccessError: true,
        updateUPSIAccessData: action.data,
        updateUPSIAccessMsg: action.message,
      };
    // case "LOGOUT_SUCCESS":
    //   return {
    //     leftBarItem: "",
    //     leftBarSuccess: false,
    //     leftBarError: false,
    //     leftBarLoading: false,

    //     goToCompare: "",
    //     goToCompareSuccess: false,
    //     goToCompareError: false,
    //     goToCompareLoading: false,

    //     addRelativeFlag: "",
    //     addRelativeFlagSuccess: false,
    //     addRelativeFlagError: false,
    //     addRelativeFlagLoading: false,

    //     requestFetchLoading: false,
    //     requestFetch: false,
    //     requestFetchLoading: false,
    //     requests: [],

    //     sharePdfSuccess: false,
    //     sharePdfLoading: false,
    //     sharePdfError: false,

    //     systemResetSuccess: false,
    //     systemResetLoading: false,
    //     systemResetError: false,
    //   };
    case "ERROR_IN_DOWNLOAD_PDF":
      return {
        ...state,
        pdfDownloadError: true,
      };
    case "INSIDERS_EXCEL_LOADING":
      return {
        ...state,
        insiderExcelDownloadLoading: true,
        insiderExcelDownloadSuccess: false,
        insiderExcelDownloadError: false,
        insiderExcelDownloadMsg: null,
      };
    case "INSIDERS_EXCEL_SUCCESS":
      return {
        ...state,
        insiderExcelDownloadLoading: false,
        insiderExcelDownloadSuccess: true,
        insiderExcelDownloadError: false,
        insiderExcelDownloadMsg: null,
      };
    case "INSIDERS_EXCEL_ERROR":
      return {
        ...state,
        insiderExcelDownloadLoading: false,
        insiderExcelDownloadSuccess: false,
        insiderExcelDownloadError: true,
        insiderExcelDownloadMsg: action.message,
      };
    case "DOWNLOAD_UPSI_LOADING":
      return {
        ...state,
        downloadUPSILoading: true,
        downloadUPSISuccess: false,
        downloadUPSIError: false,
        downloadUPSIData: null,
        downloadUPSIMsg: null,
      };
    case "DOWNLOAD_UPSI_SUCCESS":
      return {
        ...state,
        downloadUPSILoading: false,
        downloadUPSISuccess: true,
        downloadUPSIError: false,
        downloadUPSIData: action.data,
        downloadUPSIMsg: action.message,
      };
    case "DOWNLOAD_UPSI_ERROR":
      return {
        ...state,
        downloadUPSILoading: false,
        downloadUPSISuccess: false,
        downloadUPSIError: true,
        downloadUPSIData: null,
        downloadUPSIMsg: action.message,
      };
    case "SET_QUERY_SECCESS":
      return { ...state, query: action.query };
    case "TOOGLE_CONVERSATION_FLAG":
      return { ...state, toogleConversationFlag: action.flag };
    case "RESET_REDUCER":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
export default CommonReducer;
