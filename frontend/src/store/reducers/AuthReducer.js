const initState = {
  authError: "",
  authLoading: "",
  user: null,
  data: null,

  changePasswordSuccess: false,
  changePasswordLoading: false,
  changePasswordError: false,
};

const AuthReducer = (state = initState, action) => {
  console.log("from reducer");
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        authError: null,
        authLoading: true,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "Login Failed",
        authLoading: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null,
        authLoading: false,
        user: action.user,
        data: action.userData,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        authError: null,
        authLoading: false,
        user: null,
        data: null,
      };
    case "PASSWORD_CHANGE_LOADING":
      return {
        ...state,
        changePasswordSuccess: false,
        changePasswordLoading: true,
        changePasswordError: false
      };
    case "CHANGE_PASSWORD_SUCCESS":
      return {
        ...state,
        changePasswordSuccess: true,
        changePasswordLoading: false,
        changePasswordError: false,
      };
    case "CHANGE_PASSWORD_WRONG_PASSWORD":
      return {
        ...state,
        changePasswordSuccess: false,
        changePasswordLoading: false,
        changePasswordError: true,
        changePasswordMsg: action.msg
      };
    case "CHANGE_PASSWORD_FAIL":
      return {
        ...state,
        changePasswordSuccess: false,
        changePasswordLoading: false,
        changePasswordError: true,
        changePasswordMsg: action.msg
      };
    case "AUTHENTICATION_ERROR":
      alert("Your session has expired");
      return initState;
    case "TOKEN_REFRESH_SUCCESS":
      return {
        ...state,
        user: { ...state.user, accessToken: action.payload },
      };
    case "TOKEN_REFRESH_ERROR":
      alert("Your session has expired");
      return initState;
    default:
      return state;
  }
};
export default AuthReducer;
