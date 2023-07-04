import "./App.css";
// import AVideo from './components/AVideo'
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import api from "./api/contacts";
import EditContactWithLocation from "./components/EditContact";

function App() {
  // const contacts =[
  //   {
  //     id: 1,
  //     name:"Anchal",
  //     email:"anch@gmail.com"
  //   },
  //   {
  //     id: 1,
  //     name:"Milo",
  //     email:"milo@gmail.com"
  //   },
  // ]

  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState([]);

  const [searchTerm , setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  useEffect(() => {
    // const contactsFromStorage = JSON.parse(
    //   localStorage.getItem(LOCAL_STORAGE_KEY)
    // );
    // if (contactsFromStorage) setContacts(contactsFromStorage);
    const getAllContacts = async () => {
      const contacts = await retriveContacts();
      if (contacts) setContacts(contacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

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

    const { id, name, email } = res.data;

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...res.data } : contact;
      })
    );
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

  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <Routes>
          {/* <Route path="/" element={() => <ContactList contacts={contacts} getContactId={removeContactHandler}/>}></Route> */}
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}

              />
            }
          ></Route>
          {/* <Route path="/" render={(props) =>(<ContactList {...props} contacts={contacts} getContactId={removeContactHandler} />)}></Route> */}
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          ></Route>
          <Route path="/home" element={<div> Home Page </div>} />

          <Route path="/contact/:id" element={<ContactDetail />} />

          <Route
            path="/edit"
            element={
              <EditContactWithLocation
                updateContactHandler={updateContactHandler}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
