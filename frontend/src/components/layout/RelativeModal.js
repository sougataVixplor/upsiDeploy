import React from 'react'
import '../stylesheet/modals.css'
import '../stylesheet/common.css'

const RelativeModal = ({state, addRelative}) => {
    return (
      <div id="relative-modal" class="modal">
        <div class="row modal-content">
        <div className="row modal-title ">
        {state.addUser ? <span>Add new KMP</span> : <span>Edit KMP</span>}
      </div>
        <form id="addUser"
        className='col s12' 
        // onSubmit={state.addUser ? OnSubmit : OnUpdate}
        >
        <div className="input-field col s12">
          <input
            type="text"
            id="fpan_no"
            className="validate"
            // onChange={HandleChange}
            // value={state.firstName}
            required
          />
          <label className="active" for="fpan_no">
            PAN No
          </label>
        </div>
        <div className="input-field col s12">
          <input
            type="text"
            id="emp_code"
            className="validate"
            // onChange={HandleChange}
            // value={state.firstName}
            required
          />
          <label className="active" for="emp_code">
            Emp Code
          </label>
        </div>
        {/* <div className="input-field col s12">
          <input
            type="text"
            id="category"
            className="validate"
            // onChange={HandleChange}
            // value={state.firstName}
            required
          />
          <label className="active" for="category">
            Category
          </label>
        </div> */}
        {/* <div className="input-field col s12">
            <input
            type="text"
            id="designation"
            // onChange={HandleChange}
            // value={state.password}
            required
            />
            <label>Designation</label>
        </div> */}
        <div className="input-field col s12">
          <input
            type="text"
            id="name"
            className="validate"
            // onChange={HandleChange}
            // value={state.firstName}
            required
          />
          <label className="active" for="name">
            Name
          </label>
        </div>
        <div className="input-field col s12">
          <input
            type="number"
            id="contactNo"
            // onChange={HandleChange}
            // value={state.contactNo}
            required
          />
          <label>Phone Number</label>
        </div>
        {state.addUser ? (
          <div>
            <div className="input-field col s12">
              <input
                type="text"
                id="email"
                // onChange={HandleChange}
                // value={state.email}
                required
              />
              <label>Email</label>
            </div>
            {/* <div className="input-field col s12">
              <input
                type="password"
                id="password"
                // onChange={HandleChange}
                // value={state.password}
                required
              />
              <label>Password</label>
            </div> */}
          </div>
        ) : null}
        {/* <div className="input-field col s12">
          <input
            type="text"
            id="relation"
            className="validate"
            // onChange={HandleChange}
            // value={state.firstName}
            required
          />
          <label className="active" for="firstName">
            Relation
          </label>
        </div> */}
        <div className="input-field col s12">
            <input
            type="text"
            id="add1"
            // onChange={HandleChange}
            // value={state.password}
            required
            />
            <label>Relation</label>
        </div>
        {/* <div className="input-field col s12">
            <input
            type="text"
            id="pin"
            // onChange={HandleChange}
            // value={state.password}
            required
            />
            <label>PIN Code</label>
        </div> */}
        <div className="input-field col s12">
            <input
            type="number"
            id="current_share"
            // onChange={HandleChange}
            // value={state.password}
            required
            />
            <label>Current Share</label>
        </div>
        <div className="input-field col s12">
            <input
            type="date"
            id="current_benpos_date"
            // onChange={HandleChange}
            // value={state.password}
            required
            />
            <label>Cuurent BENPOS Date</label>
        </div>
        
        <div className="red-text center">
          {state.existsError ? <p>Email exists</p> : null}
        </div>
      </form>
        </div>
        <div className="modal-footer">
        <button className="modal-close waves-effect waves btn-flat">
          CANCEL
        </button>
        <button
          type="submit"
          form="addUser"
          className="waves-effect waves btn-flat"
        >
          EDIT USER
        </button>
      </div>
      </div>
    )
}

export default RelativeModal
