import React from "react";

export const UploadDocument = (props) => {
  const fileValueClear = () => {
    const file = document.querySelector(".weeklyData");
    file.value = "";
    const File = document.querySelector(".file");
    File.value = "";
    props.resetValue("doc");
  };
  return (
    <div id="upload-modal" class="modal">
      <div class="row modal-content">
        <div className="row modal-title ">
          <span>Upload Benpos Data</span>
        </div>
        <div>
          <form action="#">
            <div className="row">
              <div className="input-field col s12 m12 l12">
                <input
                  id="date"
                  type="date"
                  class="validate"
                  min={props.state.day15}
                  value={props.state.date}
                  onChange={props.handleUploadDate}
                />
                <label for="date">Date</label>
              </div>
              <div className=" col s10 m10 l10">
                <div class="file-field input-field">
                  <div class="btn">
                    <span>File</span>
                    <input
                      type="file"
                      className="file"
                      accept=".xls, .xlsx"
                      onInput={props.handleUpload}
                    />
                  </div>
                  <div class="file-path-wrapper">
                    <input class="file-path validate weeklyData" type="text" />
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
              <div className="row">
                <div className="col s12 m12 l12" style={{ transform: 'translate(-103px, -12px)' }}>
                  <a
                    className="hint"
                    // title="Benpos data format download"
                    href="./BENPOS_UPLOAD_FORMAT.xlsx"
                  >
                    Benpos data format download
                  </a>
                </div>
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
          onClick={props.handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  );
};
