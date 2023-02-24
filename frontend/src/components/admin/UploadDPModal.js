import React from "react";
// This component currently not using
const UploadDPModal = (props) => {
  const fileValueClear = () => {
    const file = document.querySelector(".bulkKmp");
    console.log(file.value);
    file.value = null;
    const File = document.querySelector(".fileUser");
    console.log(File.value);
    File.value = null;
    props.resetValue("user");
  };

  return (
    <div id="UploadDPModal" class="modal">
      <div class="row modal-content">
        <div className="row modal-title ">
          <span>Upload Bulk DP</span>
        </div>
        <div>
          <form action="#">
            <div className="row">
              <div className="col s10 m10 l10">
                <div class="file-field input-field">
                  <div class="btn filebtn">
                    <span>File</span>
                    <input
                      type="file"
                      className="fileUser"
                      accept=".xls, .xlsx"
                      onChange={props.handleUploadKmp}
                    />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate bulkKmp" type="text" />
                  </div>
                </div>
              </div>
              <div className="col s2 m2 l2">
                <a
                  className="btn-floating btn-small waves-effect waves-light"
                  onClick={fileValueClear}
                  style={{ "margin-top": 18 }}
                >
                  <i class="material-icons">refresh</i>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col s12 m12 l12" style={{transform: 'translate(-114px, -38px)'}}>
                <a
                  className="hint"
                  href="./BULK_CP_UPLOAD_FORMAT.xlsx"
                >
                  DP Details Format Download
                </a>
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
          onClick={(e) => props.handleBulkKmpSubmit(e, 'DP')}
        >
          submit
        </button>
      </div>
    </div>
  );
};

export default UploadDPModal;
