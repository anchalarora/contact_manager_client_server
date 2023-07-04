import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {

  console.log("ContactList",props);

  const searchStringInput = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const contacts = [
    {
      id: 1,
      name: "Anchal",
      email: "anch@gmail.com",
    },
    {
      id: 1,
      name: "Milo",
      email: "milo@gmail.com",
    },
  ];

  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      ></ContactCard>
    );
  });

  const getSearchterm = () =>{
    props.searchKeyword(searchStringInput.current.value);
  }

  return (
    <div className="main">
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref={searchStringInput} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchterm}/>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length > 0  ? renderContactList : "No contacts available"}</div>
    </div>
  );
};

export default ContactList;
