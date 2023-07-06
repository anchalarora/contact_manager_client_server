import "./App.css";
// import AVideo from './components/AVideo'
import Header from "./components/Header";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactDetail from "./components/ContactDetail";
import EditContact from "./components/EditContact";
import {ContactsCrudContextProvider} from './context/ContactsCrudContext'

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

  


  

  return (
    <div className="ui container">
      <Router>
        {/* <Header /> */}
        <ContactsCrudContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
              />
            }
          ></Route>
          <Route
            path="/add"
            element={<AddContact />}
          ></Route>
          <Route path="/home" element={<div> Home Page </div>} />

          <Route path="/contact/:id" element={<ContactDetail />} />

          <Route
            path="/edit"
            element={
              <EditContact />
            }
          />
        </Routes>
        </ContactsCrudContextProvider>
      </Router>
    </div>
  );
}

export default App;
