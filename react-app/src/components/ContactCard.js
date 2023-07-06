import React from "react";
import user from "../images/user.png";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactsCrudContext";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  const {removeContactHandler} = useContactsCrud();


  const deleteContact = (id) =>{
    removeContactHandler(id);
  }
  console.log("props.contacts", props.contact);
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt={user}></img>
      <div className="content">
        {/* <Link to={{pathname : `/contact/${id}`, state :{ contact: props.contact}}}> */}
        <Link
          to={`/contact/${id}`}
          state={{ contact: props.contact }}
        >
          <div className="header">{name} </div>
          <div>{email} </div>
        </Link>
      </div>

      <i
        className="trash alternate outline icon"
        style={{ color: "green", marginTop: "7px", marginRight: "10px" }}
        onClick={() => deleteContact(id)}
      ></i>
      <Link
        to={`/edit`}
        state={{ contact: props.contact }}
        className="link"
      >
         <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};




export default ContactCard;
