import React, { useState } from "react";
import { withRouter } from "./withRouter";
import { useContactsCrud } from "../context/ContactsCrudContext";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { addContactHandler } = useContactsCrud();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === " " || email === "") {
      alert("Please Enter name and email");
      return;
    }
    addContactHandler({ name, email });
    setName("");
    setEmail("");
    navigate("/");
    //this.props.history.push("/");
  };

  return (
    <div className="ui main">
      <h2> Add Contact</h2>
      <form className="ui form" onSubmit={add}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="name"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <button className="ui button blue">Add Contact</button>
      </form>
    </div>
  );
};

export default withRouter(AddContact);
