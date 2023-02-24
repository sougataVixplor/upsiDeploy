import React, { useState } from "react";

const UploadUser = (props) => {
  const fileValueClear = () => {
    const file = document.querySelector(".bulkKmp");
    console.log(file.value);
    file.value = null;
    const File = document.querySelector(".fileUser");
    console.log(File.value);
    File.value = null;
    props.resetValue("user");
  };

  const [type, setType] = useState('DP')

  const changeType = (e) =>{
    setType(e.target.value)
  }

  return (
    <div id="upload-user-modal" className="modal">
      <div className="row modal-content">
        <div className="row modal-title ">
          <span>Upload Bulk Insiders</span>
        </div>
        <div>
          <form action="#">
            <div className="row">
              <div className="left" style={{marginLeft: '85px'}}>
                <span>
                  <label>
                    <input
                      id="gender"
                      type="radio"
                      checked={
                        type == 'CP' ? true : false
                      }
                      value='CP'
                      onChange={changeType}
                    />
                    <span>CP</span>
                  </label>
                </span>
                <span style={{ marginLeft: '83px' }}>
                  <label>
                    <input
                      id="gender"
                      type="radio"
                      checked={
                        type == 'DP' ? true : false
                      }
                      value='DP'
                      onChange={changeType}
                    />
                    <span>DP</span>
                  </label>
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col s10 m10 l10">
                <div className="file-field input-field">
                  <div className="btn filebtn">
                    <span>File</span>
                    <input
                      type="file"
                      className="fileUser"
                      accept=".xls, .xlsx"
                      onChange={props.handleUploadKmp}
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate bulkKmp" type="text" />
                  </div>
                </div>
              </div>
              <div className="col s2 m2 l2">
                <a
                  className="btn-floating btn-small waves-effect waves-light"
                  onClick={fileValueClear}
                  style={{ "margin-top": 18 }}
                >
                  <i className="material-icons">refresh</i>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12 l12" style={{ transform: 'translate(-50px, -38px)' }}>
                <span>
                  <a
                    className="hint"
                    href="./BULK_CP_UPLOAD_FORMAT.xlsx"
                  >
                    CP Details Upload Format
                  </a>
                </span>
                <span style={{ transform: 'translate(86px, 0px)' }}>
                  <a
                    className="hint"
                    href="./BULK_DP_UPLOAD_FORMAT.xlsx"
                  >
                    DP Details Upload Format
                  </a>
                  </span>
              </div>
            </div>
            <div>
              <span style={{ "font-size": 12, "font-weight": "700" }}>
                <b>Note:</b> If any error occurred during the upload please
                click the refresh button beside the uploader and then try to
                upload again.
              </span>
            </div>
          </form>
        </div>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves btn-flat">
          CANCEL
        </button>
        <button
          type="submit"
          form="addUser"
          className="waves-effect waves btn-flat"
          onClick={(e) => props.handleBulkKmpSubmit(e, type)}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default UploadUser;
