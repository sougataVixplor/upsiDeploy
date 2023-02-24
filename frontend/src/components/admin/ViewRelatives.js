import React from "react";

function ViewRelatives({ kmpRelatives }) {
  return (
    <div id="view-relatives-modal" class="modal">
      <div class="row modal-content">
        <div className="row modal-title ">
          <span>Relatives</span>
        </div>
        <div className="container">
          <ul class="collapsible">
            {kmpRelatives &&
              kmpRelatives.map((data) => (
                <>
                  <li>
                    <div class="collapsible-header">
                      <span className="view-relatives-name">{data.name}</span>
                    </div>
                    <div class="collapsible-body">
                      <div className="row">
                        <div className="col s6 m6 l6">
                          <span>
                            Code:<b>{" "+data.emp_sub_code}</b>
                          </span>
                        </div>
                        <div className="col s6 m6 l6">
                          <span>
                            PAN:<b>{" "+data.pan}</b>
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col s6 m6 l6">
                          <span>
                            Mail:<b>{" "+data.email}</b>
                          </span>
                        </div>
                        <div className="col s6 m6 l6">
                          <span>
                            Relation:<b>{" "+data.relation}</b>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ViewRelatives;
