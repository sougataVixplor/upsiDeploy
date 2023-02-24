const initState = {
  uploadBulkEmployee: "",
  uploadBulkEmployeeSuccess: false,
  uploadBulkEmployeeError: false,
  uploadBulkEmployeeLoading: false,
  uploadBulkEmployeeMsg: "",

  getKmp: [],
  getKmpSuccess: false,
  getKmpError: false,
  getKmpLoading: false,

  correctionRequest: [],
  correctionRequestSuccess: false,
  correctionRequestError: false,
  correctionRequestLoading: false,
  correctionRequestMsg: null,

  kmRelative: [],
  kmpRelativeSuccess: false,
  kmpRelativeError: false,
  kmpRelativeLoading: false,

  getFolio: [],
  getFolioSuccess: false,
  getFolioError: false,

  upsiList: [],
  upsiFetchSuccess: false,
  upsiFetchError: false,
  upsiFetchLoading: false,

  correctionUserList: [],
  correctionUserSuccess: true,
  correctionUserError: false,
  correctionUserLoading: false,

  releseKmpList: [],
  releseKmpSuccess: false,
  releseKmpError: false,
  releseKmpLoading: false,
  releseKmpMsg: "",

  activityLog: [],
  activityLogSuccess: false,
  activityLogError: false,
  activityLogLoading: false,

  requestActionSuccess: false,
  requestActionError: false,
  requestActionLoading: false,
  request: null,
  requestMessage: null,

  bulkMailSuccess: false,
  bulkMailError: false,
  bulkMailLoading: false,
  bulkMailMessage: null,

  shareUpsiSuccess: false,
  shareUpsiError: false,
  shareUpsiLoading: false,
  shareUpsiMsg: "",

  resetPass: "",
  resestPassSuccess: false,
  resestPassError: false,
  resestPassLoading: false,
  resestPassMsg: "",

  emailPanRequestLoading: false,
  emailPanRequestSuccess: false,
  emailPanRequestError: false,
  errorMassege: "",

  restoreLoading: false,
  restoreSuccess: false,
  restoreError: false,

  backupLoading: false,
  backupSuccess: false,
  backupError: false,

  getConversationLoading: false,
  getConversationSuccess: false,
  getConversationError: false,
  conversation: null,
  getConversationMsg: null,

  createConversationLoading: false,
  createConversationSuccess: false,
  createConversationError: false,
  createConversationId: null,
  createConversationMsg: null,
};

const HodReducer = (state = initState, action) => {
  console.error("hod reducer:: ", action);
  switch (action.type) {
    case "ADD_BULK_KMP_LOADING":
      return {
        ...state,
        uploadBulkEmployeeSuccess: false,
        uploadBulkEmployeeError: false,
        uploadBulkEmployeeLoading: true,
      };
    case "ADD_BULK_KMP_SUCCESS":
      return {
        ...state,
        uploadBulkEmployee: action.payload,
        uploadBulkEmployeeSuccess: true,
        uploadBulkEmployeeError: false,
        uploadBulkEmployeeLoading: false,
      };
    case "ADD_BULK_KMP_ERROR":
      return {
        ...state,
        uploadBulkEmployeeSuccess: false,
        uploadBulkEmployeeError: true,
        uploadBulkEmployeeLoading: false,
        uploadBulkEmployeeMsg: action.message,
      };
    case "KMP_FETCH_SUCCESS":
      return {
        ...state,
        getKmpSuccess: true,
        getKmpError: false,
        getKmp: action.payload,
      };
    case "KMP_FETCH_ERROR":
      return {
        ...state,
        getKmpSuccess: false,
        getKmpError: true,
      };
    case "CORRECTION_REQUEST_LOADING":
      return {
        ...state,
        correctionRequestError: false,
        correctionRequestSuccess: false,
        correctionRequestLoading: true,
      };
    case "CORRECTION_REQUEST_SUCCESS":
      return {
        ...state,
        correctionRequest: action.payload,
        correctionRequestSuccess: true,
        correctionRequestError: false,
        correctionRequestLoading: false,
      };
    case "CORRECTION_REQUEST_FAILED":
      return {
        ...state,
        correctionRequestError: true,
        correctionRequestSuccess: false,
        correctionRequestLoading: false,
        correctionRequestMsg: action.message,
      };
    case "KMP_RELATIVE_FETCH_LOADING":
      return {
        ...state,
        kmRelativeError: false,
        kmRelativeSuccess: false,
        kmRelativeLoading: true,
      };
    case "KMP_RELATIVE_FETCH_SUCCESS":
      return {
        ...state,
        kmRelativeError: false,
        kmRelativeSuccess: true,
        kmRelativeLoading: false,
        kmRelative: action.payload,
      };
    case "KMP_RELATIVE_FETCH_ERROR":
      return {
        ...state,
        kmRelativeError: true,
        kmRelativeSuccess: false,
        kmRelativeLoading: false,
      };
    case "GET_FOILIOS_SUCCESS":
      return {
        ...state,
        getFolio: action.payload,
        getFolioSuccess: true,
        getFolioError: false,
      };
    case "UPSI_FETCH_LOADING":
      return {
        ...state,
        upsiFetchSuccess: false,
        upsiFetchError: false,
        upsiFetchLoading: true,
      };
    case "UPSI_FETCH_SUCCESS":
      return {
        ...state,
        upsiList: action.payload,
        upsiFetchSuccess: true,
        upsiFetchError: false,
        upsiFetchLoading: false,
      };
    case "UPSI_FETCH_ERROR":
      return {
        ...state,
        upsiFetchSuccess: false,
        upsiFetchError: true,
        upsiFetchLoading: false,
      };
    case "CORRECTION_FETCH_LOADING":
      return {
        ...state,
        correctionUserSuccess: false,
        correctionUserError: false,
        correctionUserLoading: true,
      };
    case "CORRECTION_FETCH_SUCCESS":
      return {
        ...state,
        correctionUserList: action.payload,
        correctionUserSuccess: true,
        correctionUserError: false,
        correctionUserLoading: false,
      };
    case "CORRECTION_FETCH_ERROR":
      return {
        ...state,
        correctionUserSuccess: false,
        correctionUserError: true,
        correctionUserLoading: false,
      };
    case "RELESE_KMP_LOADING":
      return {
        ...state,
        releseKmpSuccess: false,
        releseKmpError: false,
        releseKmpLoading: true,
      };
    case "RELESE_KMP_SUCCESS":
      return {
        ...state,
        releseKmpList: action.payload,
        releseKmpSuccess: true,
        releseKmpError: false,
        releseKmpLoading: false,
      };
    case "RELESE_KMP_ERROR":
      return {
        ...state,
        releseKmpSuccess: false,
        releseKmpError: true,
        releseKmpLoading: false,
        releseKmpMsg: action.message,
      };
    case "ACTIVITY_LOG_SUCCESS":
      return {
        ...state,
        activityLog: action.payload,
        activityLogSuccess: true,
        activityLogError: false,
        activityLogLoading: false,
      };
    case "ACTIVITY_LOG_ERROR":
      return {
        ...state,
        activityLogSuccess: false,
        activityLogError: true,
        activityLogLoading: false,
      };
    case "REQUEST_ACTION_LOADING":
      return {
        ...state,
        requestActionSuccess: false,
        requestActionError: false,
        requestActionLoading: true,
      };
    case "REQUEST_ACTION_SUCCESS":
      return {
        ...state,
        request: action.payload,
        requestActionSuccess: true,
        requestActionError: false,
        requestActionLoading: false,
      };
    case "REQUEST_ACTION_FAIL":
      return {
        ...state,
        requestActionSuccess: false,
        requestActionError: true,
        requestActionLoading: false,
        requestMessage: action.message,
      };
    case "BULK_MAIL_LOADING":
      return {
        ...state,
        bulkMailSuccess: false,
        bulkMailError: false,
        bulkMailLoading: true,
      };
    case "BULK_MAIL_SUCCESS":
      return {
        ...state,
        bulkMailSuccess: true,
        bulkMailError: false,
        bulkMailLoading: false,
      };
    case "BULK_MAIL_ERROR":
      return {
        ...state,
        bulkMailSuccess: false,
        bulkMailError: true,
        bulkMailLoading: false,
        bulkMailMessage: action.message,
      };
    case "SHARE_UPSI_LOADING":
      return {
        ...state,
        shareUpsiSuccess: false,
        shareUpsiError: false,
        shareUpsiLoading: true,
      };
    case "SHARE_UPSI_SUCCESS":
      return {
        ...state,
        shareUpsiSuccess: true,
        shareUpsiError: false,
        shareUpsiLoading: false,
      };
    case "SHARE_UPSI_ERROR":
      return {
        ...state,
        shareUpsiSuccess: false,
        shareUpsiError: true,
        shareUpsiLoading: false,
        shareUpsiMsg: action.message,
      };
    case "RESET_PASSWORD_LOADING":
      return {
        ...state,
        resestPassSuccess: false,
        resestPassError: false,
        resestPassLoading: true,
      };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        resetPass: action.payload,
        resestPassSuccess: true,
        resestPassError: false,
        resestPassLoading: false,
        resestPassMsg: action.message,
      };
    case "RESET_PASSWORD_FAIL":
      return {
        ...state,
        resestPassSuccess: false,
        resestPassError: true,
        resestPassLoading: false,
      };
    case "EMAILPAN_REQUEST_LOADING":
      return {
        ...state,
        emailPanRequestLoading: true,
        emailPanRequestSuccess: false,
        emailPanRequestError: false,
      };
    case "EMAILPAN_REQUEST_SUCCESS":
      return {
        ...state,
        emailPanRequestLoading: false,
        emailPanRequestSuccess: true,
        emailPanRequestError: false,
      };
    case "EMAILPAN_REQUEST_FAILED":
      return {
        ...state,
        emailPanRequestLoading: false,
        emailPanRequestSuccess: false,
        emailPanRequestError: true,
        errorMassege: action.massege,
      };
    case "RESTORE_LOADING":
      return {
        ...state,
        restoreLoading: true,
        restoreSuccess: false,
        restoreError: false,
      };
    case "RESTORE_SUCCESS":
      return {
        ...state,
        restoreLoading: false,
        restoreSuccess: true,
        restoreError: false,
      };
    case "RESTORE_ERROR":
      return {
        ...state,
        restoreLoading: false,
        restoreSuccess: false,
        restoreError: true,
      };
    case "BACKUP_LOADING":
      return {
        ...state,
        backupLoading: true,
        backupSuccess: false,
        backupError: false,
      };
    case "BACKUP_SUCCESS":
      return {
        ...state,
        backupLoading: false,
        backupSuccess: true,
        backupError: false,
      };
    case "BACKUP_ERROR":
      return {
        ...state,
        backupLoading: false,
        backupSuccess: false,
        backupError: true,
      };
    case "GET_CONVERSATION_LOADING":
      return {
        ...state,
        getConversationLoading: true,
        getConversationSuccess: false,
        getConversationError: false,
        conversation: null,
        getConversationMsg: null,
      };
    case "GET_CONVERSATION_SUCCESS":
      return {
        ...state,
        getConversationLoading: false,
        getConversationSuccess: true,
        getConversationError: false,
        conversation: action.payload,
        getConversationMsg: action.message,
      };
    case "GET_CONVERSATION_ERROR":
      return {
        ...state,
        getConversationLoading: false,
        getConversationSuccess: false,
        getConversationError: true,
        conversation: null,
        getConversationMsg: action.message,
      };
    case "CREATE_CONVERSATION_LOADING":
      return {
        ...state,
        createConversationLoading: true,
        createConversationSuccess: false,
        createConversationError: false,
        createConversationId: null,
        createConversationMsg: null,
      };
    case "CREATE_CONVERSATION_SUCCESS":
      return {
        ...state,
        createConversationLoading: false,
        createConversationSuccess: true,
        createConversationError: false,
        createConversationId: action.id,
        createConversationMsg: action.message,
      };
    case "CREATE_CONVERSATION_ERROR":
      return {
        ...state,
        createConversationLoading: false,
        createConversationSuccess: false,
        createConversationError: true,
        createConversationId: null,
        createConversationMsg: action.message,
      };
    case "LOGOUT_SUCCESS":
      return initState;
    default:
      return state;
  }
};
export default HodReducer;
