import { createContext, useContext, useState } from "react";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";

const contactsCrudContext = createContext();

// For context consumer : we use useContext hook
export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm , setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) setContacts(response.data);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    // id we received from props from contactcard
    console.log("id in App.js", id);
    const newContactList = contacts.filter((contact) => {
      console.log(contact.id, id, contact.id !== id);
      return contact.id !== id;
    });
    console.log(newContactList);
    setContacts(newContactList);
  };

  const addContactHandler = async (contact) => {
    console.log("#### =>" + contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    //{ id: uuid(), ...contact }
    setContacts([...contacts, response.data]);
  };

  const updateContactHandler = async (contact) => {
    const res = await api.put(`/contacts/${contact.id}`, contact);

    console.log("new", res.data);

    const { id } = res.data;

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...res.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) =>{
    console.log("searchHandler",searchTerm);
    setSearchTerm(searchTerm);

    if(searchTerm !== ""){
      const newContactList = contacts.filter((contact) =>{
        console.log("$$$$$$" , contact , Object.values(contact).join(" ").toLowerCase(), Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      })

      setSearchResults(newContactList);
      console.log("setSearchResults",searchResults, newContactList);
    }else{
      setSearchResults(contacts);
    }
  }


  const value = {
    contacts,
    searchTerm,
    searchResults,
    retriveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
    searchHandler
  };
  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
