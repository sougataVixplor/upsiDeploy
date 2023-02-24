const initState = {
  clientRequest: "",
  clientRequestSuccess: false,
  clientRequestError: false,
  clientRequestLoading: false,

  folios: [],
  folioRequestSuccess: false,
  folioRequestError: false,
  folioRequestLoading: false,

  requestFolios: [],
  requestFoliosSuccess: false,
  requestFoliosError: false,
  requestFoliosLoading: false,

  userUpdateSuccess: false,
  userUpdateError: false,
  userUpdateLoading: false,
  userUpdateStatus: "",
  userUpdateData: null,
  userUpdateMsg: "",

  requestUpdate: null,
  requestUpdateSuccess: false,
  requestUpdateError: false,
  requestUpdateLoading: false,
  requestUpdateMsg: "",

  releseRelativeList: [],
  releseRelativeSuccess: false,
  releseRelativeError: false,
  releseRelativeLoading: false,

  userRelativeError: false,
  userRelativeSuccess: false,
  userRelativeLoading: false,
  userRelative: [],

  requestTransSuccess: false,
  requestTransError: false,
  requestTransLoading: false,
  requestTrans: null,
  blob: null,
  header: null,
  requestTransMsg: "",
};

const ClientReducer = (state = initState, action) => {
  switch (action.type) {
    case "CLIENT_REQUEST_SUCCESS":
      return {
        ...state,
        clientRequest: action.payload,
        clientRequestSuccess: true,
        clientRequestError: false,
        clientRequestLoading: false,
      };
    case "CLIENT_REQUEST_ERROR":
      return {
        ...state,
        clientRequestSuccess: false,
        clientRequestError: true,
        clientRequestLoading: false,
      };
    case "FETCH_FOLIOS_LOADING":
      return {
        ...state,
        folios: [],
        folioRequestSuccess: false,
        folioRequestError: false,
        folioRequestLoading: true,
      };
    case "FETCH_FOLIOS_SUCCESS":
      return {
        ...state,
        folios: action.payload,
        folioRequestSuccess: true,
        folioRequestError: false,
        folioRequestLoading: false,
      };
    case "FETCH_FOLIOS_ERROR":
      return {
        ...state,
        folios: [],
        folioRequestSuccess: false,
        folioRequestError: true,
        folioRequestLoading: false,
      };
    case "FETCH_REQUEST_FOLIOS_LOADING":
      return {
        ...state,
        requestFolios: [],
        requestFoliosSuccess: false,
        requestFoliosError: false,
        requestFoliosLoading: true,
      };
    case "FETCH_REQUEST_FOLIOS_SUCCESS":
      return {
        ...state,
        requestFolios: action.payload,
        requestFoliosSuccess: true,
        requestFoliosError: false,
        requestFoliosLoading: false,
      };
    case "FETCH_REQUEST_FOLIOS_ERROR":
      return {
        ...state,
        requestFolios: [],
        requestFoliosSuccess: false,
        requestFoliosError: true,
        requestFoliosLoading: false,
      };
    case "USER_UPDATE_LOADING":
      return {
        ...state,
        userUpdateSuccess: false,
        userUpdateError: false,
        userUpdateLoading: true,
      };
    case "USER_UPDATE_SUCCESS":
      if (action.status == "Temp")
        alert(
          "Your details have been successfully registered. Please check your email for new login credentials "
        );
      // else
      // alert('User update request sent...')
      return {
        ...state,
        userUpdateData: action.payload,
        userUpdateSuccess: true,
        userUpdateError: false,
        userUpdateLoading: false,
      };
    case "USER_UPDATE_ERROR":
      // alert('User Update Error...')
      return {
        ...state,
        userUpdateSuccess: false,
        userUpdateError: true,
        userUpdateLoading: false,
        userUpdateMsg: action.message,
      };
    case "REQUEST_UPDATE_LOADING":
      return {
        ...state,
        requestUpdateSuccess: false,
        requestUpdateError: false,
        requestUpdateLoading: true,
      };
    case "REQUEST_UPDATE_SUCCESS":
      // alert('Update successfull. ')
      return {
        ...state,
        requestUpdate: action.payload,
        requestUpdateSuccess: true,
        requestUpdateError: false,
        requestUpdateLoading: false,
      };
    case "REQUEST_UPDATE_ERROR":
      // alert('Update Error...')
      return {
        ...state,
        requestUpdateSuccess: false,
        requestUpdateError: true,
        requestUpdateLoading: false,
        requestUpdateMsg: action.message,
      };
    case "REQUEST_UPDATE_RESET":
      return {
        ...state,
        requestUpdateSuccess: false,
        requestUpdateError: false,
        requestUpdateLoading: false,
      };
    case "RELESE_RELATIVE_LOADING":
      return {
        ...state,
        releseRelativeSuccess: false,
        releseRelativeError: false,
        releseRelativeLoading: true,
      };
    case "RELESE_RELATIVE_SUCCESS":
      return {
        ...state,
        releseRelativeList: action.payload,
        releseRelativeSuccess: true,
        releseRelativeError: false,
        releseRelativeLoading: false,
      };
    case "RELESE_RELATIVE_ERROR":
      return {
        ...state,
        releseRelativeSuccess: false,
        releseRelativeError: true,
        releseRelativeLoading: false,
      };
    case "USER_RELATIVE_FETCH_LOADING":
      return {
        ...state,
        userRelativeError: false,
        userRelativeSuccess: false,
        userRelativeLoading: true,
      };
    case "USER_RELATIVE_FETCH_SUCCESS":
      return {
        ...state,
        userRelativeError: false,
        userRelativeSuccess: true,
        userRelativeLoading: false,
        userRelative: action.payload,
      };
    case "USER_RELATIVE_FETCH_ERROR":
      return {
        ...state,
        userRelativeError: true,
        userRelativeSuccess: false,
        userRelativeLoading: false,
      };
    case "RESET_PROPS_SUCCESS":
      return {
        ...state,
        userUpdateSuccess: false,
        userUpdateLoading: false,
      };
    case "REQUEST_TRANSACTION_LOADING":
      return {
        ...state,
        requestTransSuccess: false,
        requestTransError: false,
        requestTransLoading: true,
      };
    case "REQUEST_TRANSACTION_SUCCESS":
      return {
        ...state,
        requestTrans: action.payload,
        blob: action.blob,
        header: action.header,
        requestTransSuccess: true,
        requestTransError: false,
        requestTransLoading: false,
      };
    case "REQUEST_TRANSACTION_FAIL":
      // alert('Update Error...')
      return {
        ...state,
        requestTransSuccess: false,
        requestTransError: true,
        requestTransLoading: false,
        requestTransMsg: action.message,
      };

    case "LOGOUT_SUCCESS":
      return initState;
    default:
      return state;
  }
};
export default ClientReducer;
