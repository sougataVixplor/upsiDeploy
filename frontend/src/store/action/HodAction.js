import { backendUrl } from "../../config/config";
import moment from "moment";
import {
  queryBuilder,
  decryptData,
  encryptData,
  createFormData,
} from "../../utils/helper";

export const uploadBulkEmployee = (excelFile, type, token) => {
  return (dispatch) => {
    dispatch({ type: "ADD_BULK_KMP_LOADING" });
    const data = new FormData();
    data.append("employeeData", excelFile);
    fetch(backendUrl + "/Employees/bulk?type=" + type, {
      method: "post",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
      .then((response) =>
        response
          .json()
          .then((data) => {
            if (response.status === 200) {
              console.log("Data", data);
              dispatch({ type: "ADD_BULK_KMP_SUCCESS", payload: data });
            } else
              dispatch({ type: "ADD_BULK_KMP_ERROR", message: data.message });
          })
          .catch((error) =>
            dispatch({ type: "ADD_BULK_KMP_ERROR", message: "Error Occured" })
          )
      )
      .catch((error) =>
        dispatch({ type: "ADD_BULK_KMP_ERROR", message: "Error Occured" })
      );
  };
};

export const getKmp = (token, query = null) => {
  return (dispatch) => {
    // dispatch({
    //     type: "COURSE_FETCH_LOADING"
    //   });
    var newUrl = queryBuilder("/users", query);
    fetch(backendUrl + newUrl, {
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
            type: "KMP_FETCH_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "KMP_FETCH_ERROR",
          });
        }
      })
    );
  };
};

export const violationTransaction = (start_date, end_date, token) => {
  return (dispatch) => {
    dispatch({
      type: "VIOLATION_TRANSACTION_FETCH_LOADING",
    });
    fetch(
      backendUrl +
        "/violations?startDate=" +
        start_date +
        "&endDate=" +
        end_date,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          var respData = JSON.parse(decryptData(data.data));
          data = respData;
          dispatch({
            type: "VIOLATION_TRANSACTION_FETCH_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "VIOLATION_TRANSACTION_FETCH_ERROR",
          });
        }
      })
    );
  };
};

export const requestAction = (status, id, token, body = {}) => {
  return (dispatch) => {
    dispatch({
      type: "REQUEST_ACTION_LOADING",
    });
    fetch(backendUrl + "/request?status=" + status + "&id=" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }).then((response) =>
      response.blob().then((blob) => {
        if (response.status === 500) {
          response.status.json.then((data) => {
            dispatch({ type: "REQUEST_ACTION_FAIL", message: data.message });
          });
        } else if (response.status === 200) {
          const data = window.URL.createObjectURL(blob);
          dispatch({
            type: "REQUEST_ACTION_SUCCESS",
            payload: data,
          });
          // const data = window.URL.createObjectURL(blob);
          // var link = document.createElement("a");
          // link.href = data;
          // link.download = "RESULT.pdf";
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
            type: "REQUEST_ACTION_FAIL",
          });
        }
      })
    );
  };
};

export const postRequestAction = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: "POST_REQUEST_ACTION",
    });
    fetch(backendUrl + "/request/" + id + "/complete", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.blob().then((blob) => {
        if (response.status === 500) {
          dispatch({
            type: "POST_REQUEST_ACTION_FAIL",
          });
        } else if (response.status === 200) {
          dispatch({
            type: "POST_REQUEST_ACTION_SUCCESS",
          });
          const data = window.URL.createObjectURL(blob);
          var link = document.createElement("a");
          link.href = data;
          link.download = "RESULT.pdf";
          link.click();
          setTimeout(function () {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
          }, 100);
        } else if (response.status === 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "POST_REQUEST_ACTION_FAIL",
          });
        }
      })
    );
  };
};

export const correctionRequest = (data, id, token) => {
  data = encryptData(JSON.stringify(data));
  return (dispatch) => {
    dispatch({
      type: "CORRECTION_REQUEST_LOADING",
    });
    fetch(backendUrl + "/user/" + id, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: data }),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          if (response.status === 200) {
            dispatch({
              type: "CORRECTION_REQUEST_SUCCESS",
              payload: data,
            });
          } else if (response.status === 403) {
            dispatch({
              type: "AUTHENTICATION_ERROR",
            });
          } else {
            dispatch({
              type: "CORRECTION_REQUEST_FAILED",
              message: data.message,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: "CORRECTION_REQUEST_FAILED",
          });
        })
    );
  };
};

export const emailPanRequest = (data, token) => {
  return (dispatch) => {
    dispatch({
      type: "EMAILPAN_REQUEST_LOADING",
    });
    fetch(backendUrl + "/user", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          if (response.status === 200) {
            dispatch({
              type: "EMAILPAN_REQUEST_SUCCESS",
              payload: data,
            });
          } else if (response.status === 403) {
            dispatch({
              type: "AUTHENTICATION_ERROR",
            });
          } else {
            dispatch({
              type: "EMAILPAN_REQUEST_FAILED",
              massege: data.message,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: "EMAILPAN_REQUEST_FAILED",
            massege: data.message,
          });
        })
    );
  };
};

export const kmpRelative = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: "KMP_RELATIVE_FETCH_LOADING",
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
            type: "KMP_RELATIVE_FETCH_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "KMP_RELATIVE_FETCH_ERROR",
          });
        }
      })
    );
  };
};

export const getFolios = (data, pan, refDate) => {
  return (dispatch) => {
    var NewData = [];
    var filterData = [];
    for (var d = 0; d < data.length; d++) {
      if (data[d].pan == pan) {
        var refDateStr = moment(refDate).format("DD-MM-YYYY");
        var current_benpos_date = data[d].current_benpos_date;
        var current_benpos_date_str =
          moment(current_benpos_date).format("DD-MM-YYYY");
        if (refDateStr == current_benpos_date_str) {
          filterData.push(data[d]);
        } else {
          NewData.push(data[d]);
        }
      } else {
        NewData.push(data[d]);
      }
    }
    // return {filterData: filterData, NewData: NewData}
    dispatch({
      type: "GET_FOILIOS_SUCCESS",
      payload: { filterData: filterData, NewData: NewData },
    });
  };
};

export const getUpsi = (start_date, end_date, token) => {
  return (dispatch) => {
    dispatch({
      type: "UPSI_FETCH_LOADING",
    });
    fetch(
      backendUrl + "/upsi?startDate=" + start_date + "&endDate=" + end_date,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "UPSI_FETCH_SUCCESS",
            payload: data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "UPSI_FETCH_ERROR",
          });
        }
      })
    );
  };
};

export const shareUpsi = (body, attachment, token) => {
  var data = encryptData(JSON.stringify(body));
  return (dispatch) => {
    var formData = new FormData();
    formData.append("attachment", attachment);
    formData.append("data", JSON.stringify({ data: data }));
    dispatch({ type: "SHARE_UPSI_LOADING" });
    var url = backendUrl + "/upsi";
    fetch(url, {
      method: "post",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((response) =>
      response.json().then((data) => {
        if (response.status === 200) {
          dispatch({
            type: "SHARE_UPSI_SUCCESS",
            payload: data,
          });
        } else if (response.status === 403 || response.status === 401) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "SHARE_UPSI_ERROR",
            message: data.message,
          });
        }
      })
    );
  };
};

export const bulkMail = (body, file, token) => {
  return (dispatch) => {
    var formData = new FormData();
    formData.append("attachment", file);
    formData.append("data", JSON.stringify(body));
    dispatch({ type: "BULK_MAIL_LOADING" });
    var url = backendUrl + "/mail";
    fetch(url, {
      method: "post",
      headers: {
        // Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }).then((response) =>
      response.json().then((data) => {
        console.log("header", response.headers.get("Content-Type"));
        console.log("header", response.headers);
        if (response.status === 200) {
          dispatch({
            type: "BULK_MAIL_SUCCESS",
            payload: data,
          });
        } else if (response.status === 403 || response.status === 401) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "BULK_MAIL_ERROR",
            message: data.message,
          });
        }
      })
    );
  };
};

export const viewCorrectionRequest = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: "CORRECTION_FETCH_LOADING",
    });
    fetch(backendUrl + "/user/" + id, {
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
            type: "CORRECTION_FETCH_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "CORRECTION_FETCH_ERROR",
          });
        }
      })
    );
  };
};

export const releaseKmp = (id, token) => {
  return (dispatch) => {
    dispatch({
      type: "RELESE_KMP_LOADING",
    });
    fetch(backendUrl + "/user/" + id + "/release", {
      method: "put",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "RELESE_KMP_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "RELESE_KMP_ERROR",
            message: data.message,
          });
        }
      })
    );
  };
};

export const activityLog = (start_date, end_date, token) => {
  return (dispatch) => {
    dispatch({
      type: "ACTIVITY_LOG_LOADING",
    });
    fetch(
      backendUrl + "/activity?startDate=" + start_date + "&endDate=" + end_date,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "ACTIVITY_LOG_SUCCESS",
            payload: data.data,
          });
        } else if (response.status == 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "ACTIVITY_LOG_ERROR",
          });
        }
      })
    );
  };
};

export const resetPassword = (id, token) => {
  return (dispatch) => {
    dispatch({ type: "RESET_PASSWORD_LOADING" });
    fetch(backendUrl + "/user/" + id + "/resetpassword", {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response.json().then((data) => {
        if (response.status == 200) {
          dispatch({
            type: "RESET_PASSWORD_SUCCESS",
            payload: data,
          });
        } else if (response.status == 401) {
          dispatch({
            type: "RESET_PASSWORD_FAIL",
          });
        } else if (response.status === 403) {
          dispatch({
            type: "AUTHENTICATION_ERROR",
          });
        } else {
          dispatch({
            type: "RESET_PASSWORD_FAIL",
            message: data.message,
          });
        }
      })
    );
  };
};

export const restore = (token) => {
  return (dispatch) => {
    dispatch({ type: "RESTORE_LOADING" });
    fetch(backendUrl + "/restore", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "RESTORE_SUCCESS" });
        } else {
          dispatch({ type: "RESTORE_ERROR" });
        }
      })
      .catch((err) => {
        dispatch({ type: "RESTORE_ERROR" });
      });
  };
};

export const backup = (token) => {
  return (dispatch) => {
    dispatch({ type: "BACKUP_LOADING" });
    fetch(backendUrl + "/backup", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "BACKUP_SUCCESS" });
        } else {
          dispatch({ type: "BACKUP_ERROR" });
        }
      })
      .catch((err) => {
        dispatch({ type: "BACKUP_ERROR" });
      });
  };
};

export const getConversations = (query, token) => {
  return (dispatch) => {
    dispatch({
      type: "GET_CONVERSATION_LOADING",
    });
    var url = queryBuilder("/conversation", query);
    fetch(backendUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          if (response.status === 200) {
            dispatch({
              type: "GET_CONVERSATION_SUCCESS",
              payload: data.data,
              message: data.message,
            });
          } else if (response.status == 403) {
            dispatch({
              type: "AUTHENTICATION_ERROR",
            });
          } else {
            dispatch({
              type: "GET_CONVERSATION_ERROR",
              message: data.message,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: "GET_CONVERSATION_ERROR",
            message: "Internal Error",
          });
        })
    );
  };
};

export const createConversation = (query, file, body, token) => {
  return (dispatch) => {
    dispatch({ type: "CREATE_CONVERSATION_LOADING" });
    const url = queryBuilder("/conversation", query);
    fetch(backendUrl + url, {
      method: "post",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: createFormData("attachment", file, body),
    }).then((response) =>
      response
        .json()
        .then((data) => {
          if (response.status === 200) {
            dispatch({
              type: "CREATE_CONVERSATION_SUCCESS",
              message: data.message,
              id: data.id,
            });
          } else if (response.status === 403 || response.status === 401) {
            dispatch({
              type: "AUTHENTICATION_ERROR",
            });
          } else {
            dispatch({
              type: "CREATE_CONVERSATION_ERROR",
              message: data.message,
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: "CREATE_CONVERSATION_ERROR",
            message: "Internal Error",
          });
        })
    );
  };
};
