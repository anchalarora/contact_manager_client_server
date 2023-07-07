import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const EditContact = ()=> {

  const location = useLocation();
  const navigate = useNavigate();
  const {id, name , email} = location.state.contact;
  const [newName , setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);

  const {updateContactHandler} = useContactsCrud();

  const update = (e) => {
    e.preventDefault();
    if (newName === " " || newEmail === "") {
      alert("Please Enter name and email");
      return;
    }
    updateContactHandler({id,name :newName,email :newEmail});
    setNewEmail("");
    setNewName("");
    navigate(-1);
  };

    return (
      <div className="ui main">
        <h2> Update Contact</h2>
        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            ></input>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="name"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            ></input>
          </div>
          <button className="ui button blue">Update Contact</button>
        </form>
      </div>
    );
  }

// export { EditContact };

// const EditContactWithLocation = (props) => {
//   const location = useLocation();
//   const navigate = useNavigate()

//   return <EditContact navigate={navigate} location={location} {...props} />;
// };

export default EditContact;
