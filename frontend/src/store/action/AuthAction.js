import { backendUrl } from "../../config/config";
import { decryptData, encryptData } from "../../utils/helper";


export const signIn = (credential) => {
  var data = encryptData(JSON.stringify({
    email: credential.email,
    password: credential.password,
  }))
  // console.error("data:: ",data);
  return (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });
    fetch(backendUrl + "/login", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          var respData = JSON.parse(decryptData(data.data))
          data = respData
          dispatch({
            type: "LOGIN_SUCCESS",
            user: {
              ...data.data,
              id: data.userDetails.id,
              name: data.userDetails.name,
              deptId: data.userDetails.deptId,
              photo: data.userDetails.photo,
              designation: data.userDetails.designation,
              is_compliance: data.userDetails.is_compliance,
              accessToken: data.accessToken,
              refreshAccessToken: data.refreshAccessToken,
            },
            userData: data,
          });
        } else {
          dispatch({
            type: "LOGIN_ERROR",
          });
        }
      })
    );
  };
};

export const refreshToken = (token, refreshToken) => {
  return (dispatch) => {
    dispatch({ type: "TOKEN_REFRESHING" });
    fetch(backendUrl + "/refreshtoken", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        refreshAccessToken: refreshToken,
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          // console.log("refreshed token", data.accessToken);
          dispatch({
            type: "TOKEN_REFRESH_SUCCESS",
            payload: data.accessToken,
          });
        } else {
          dispatch({
            type: "TOKEN_REFRESH_ERROR",
          });
        }
      })
    );
  };
};

export const signOut = (token) => {
  return (dispatch) => {
    dispatch({ type: "AUTH_LOADING" });
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
    fetch(backendUrl + "/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "LOGOUT_SUCCESS",
          });
        } else {
          dispatch({
            type: "LOGOUT_ERROR",
          });
        }
      })
    );
  };
};

export const changePassword = (credential, id, token) => {
  var data = encryptData(JSON.stringify({
    password: credential.password,
    newPassword: credential.newPassword,
  }))
  return (dispatch) => {
    dispatch({ type: "PASSWORD_CHANGE_LOADING" });
    fetch(backendUrl + "/user/" + id + "/changepassword", {
      method: "post",
      body: JSON.stringify({
        data: data
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "CHANGE_PASSWORD_SUCCESS"
          });
        } else if (response.status == 401) {
          dispatch({
            type: "CHANGE_PASSWORD_WRONG_PASSWORD",
            msg: data.message
          });
        } else if (response.status === 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "CHANGE_PASSWORD_FAIL",
            msg: data.message
          });
        }
      })
    );
  };
};
