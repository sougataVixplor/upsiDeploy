import { backendUrl } from "../../config/config";
import { decryptData, encryptData } from "../../utils/helper";

export const clientRequest = (body) => {
  var data = encryptData(JSON.stringify(body));
  return (dispatch) => {
    dispatch({ type: "CLIENT_REQUEST_LOADING" });
    var url = backendUrl + "/request/";
    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then((response) =>
      response.json().then((data) => {
        if (response.status === 200) {
          data["body"] = body;
          // console.log("action", data)
          dispatch({
            type: "CLIENT_REQUEST_SUCCESS",
            payload: data,
          });
        } else if (response.status === 403 || response.status === 401) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "CLIENT_REQUEST_ERROR",
          });
        }
      })
    );
  };
};

export const requestTran = (body, token) => {
  var data = encryptData(JSON.stringify(body));
  return (dispatch) => {
    dispatch({
      type: "REQUEST_TRANSACTION_LOADING",
    });
    fetch(backendUrl + "/request", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Content-disposition": "response-id",
        Authorization: `Bearer ${token}`,
        id: "",
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then((response) =>
      response.blob().then((blob) => {
        // response.headers.forEach(console.log);
        for (let entry of response.headers.entries()) {
          console.log(entry);
        }
        console.log(
          "response",
          response.headers.get("id"),
          response.headers.get("Content-Type")
        );
        if (response.status === 500) {
          response.json().then((data) => {
            dispatch({
              type: "REQUEST_TRANSACTION_FAIL",
              message: data.message,
            });
          });
        } else if (response.status === 200) {
          const data = window.URL.createObjectURL(blob);
          dispatch({
            type: "REQUEST_TRANSACTION_SUCCESS",
            payload: data,
            header: response.headers.get("id"),
            blob: blob,
          });
          // const data = window.URL.createObjectURL(blob);
          // var link = document.createElement("a");
          // link.href = data;
          // link.download = "request.pdf";
          // link.click();
          // setTimeout(function () {
          //   // For Firefox it is necessary to delay revoking the ObjectURL
          //   window.URL.revokeObjectURL(data);
          // }, 100);
        } else if (response.status === 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "REQUEST_TRANSACTION_FAIL",
          });
        }
      })
    );
  };
};

export const fetchFolioList = (token) => {
  return (dispatch) => {
    dispatch({ type: "FETCH_FOLIOS_LOADING" });
    var url = backendUrl + "/folios";
    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        // var respData = JSON.parse(decryptData(data.data))
        // data = respData
        if (response.status === 200) {
          // console.log("action", data)
          var respData = JSON.parse(decryptData(data.data));
          data = respData;
          dispatch({
            type: "FETCH_FOLIOS_SUCCESS",
            payload: data.data,
          });
        } else if (response.status === 403 || response.status === 401) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "FETCH_FOLIOS_ERROR",
          });
        }
      })
    );
  };
};

export const updateUser = (body, id, stat, token) => {
  var data = encryptData(JSON.stringify(body));
  return (dispatch) => {
    dispatch({ type: "USER_UPDATE_LOADING" });
    var url = backendUrl + "/user/" + id;
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: data }),
    }).then((response) =>
      response.blob().then((blob) => {
        if (response.status === 200) {
          // data["status"] = stat;
          const data = window.URL.createObjectURL(blob);
          dispatch({
            type: "USER_UPDATE_SUCCESS",
            payload: data,
            status: stat,
          });
        } else if (response.status === 403 || response.status === 401) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "USER_UPDATE_ERROR",
            message: "Error to update user",
          });
        }
      })
    );
  };
};

export const updateRequest = (body, id, token) => {
  var data = encryptData(JSON.stringify(body));
  return (dispatch) => {
    dispatch({ type: "REQUEST_UPDATE_LOADING" });
    var url = backendUrl + "/request/" + id + "/complete";
    fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: data,
      }),
    }).then((response) => {
      if (response.status != 200) {
        response.json().then((data) => {
          if (response.status === 500) {
            dispatch({
              type: "REQUEST_UPDATE_ERROR",
              message: data.message,
            });
          } else if (response.status === 403) {
            dispatch({
              type: "AUTHENTICATION_ERROR",
              message: data.message,
            });
          } else {
            dispatch({
              type: "REQUEST_UPDATE_ERROR",
              message: data.message,
            });
          }
        });
      } else {
        response.blob().then((blob) => {
          const data = window.URL.createObjectURL(blob);
          dispatch({
            type: "REQUEST_UPDATE_SUCCESS",
            payload: data,
          });
          // const data = window.URL.createObjectURL(blob);
          // var link = document.createElement("a");
          // link.href = data;
          // link.download = "Req.pdf";
          // link.click();
          // setTimeout(function () {
          //   // For Firefox it is necessary to delay revoking the ObjectURL
          //   window.URL.revokeObjectURL(data);
          // }, 100);
        });
      }
    });
  };
};

export const resetUpdateStat = () => {
  return (dispatch) => {
    dispatch({ type: "REQUEST_UPDATE_LOADING" });
    dispatch({ type: "REQUEST_UPDATE_RESET" });
  };
};

export const releaseRelative = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: "RELESE_RELATIVE_LOADING",
    });
    fetch(backendUrl + "/relative/" + id + "/release", {
      method: "put",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "RELESE_RELATIVE_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "RELESE_RELATIVE_ERROR",
          });
        }
      })
    );
  };
};

export const userRelative = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: "USER_RELATIVE_FETCH_LOADING",
    });
    fetch(backendUrl + "/user/" + id + "/relatives", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        // var respData = JSON.parse(decryptData(data.data))
        // data = respData
        if (response.status == 200) {
          var respData = JSON.parse(decryptData(data.data));
          data = respData;
          dispatch({
            type: "USER_RELATIVE_FETCH_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "USER_RELATIVE_FETCH_ERROR",
          });
        }
      })
    );
  };
};

export const resetProps = () => {
  return (dispatch) => {
    dispatch({
      type: "RESET_PROPS_SUCCESS",
    });
  };
};
