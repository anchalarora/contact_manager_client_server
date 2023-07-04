// import React from "react";
// import user from "../images/user.png";

// const ContactDetail = () => {

//   return (
//    <div className="main">
//     <div className="ui card centerd">
//         <div className="image">
//         <img src={user} alt={user}/>
//         </div>
//         <div className="content">
//             <div className="header">Anchal</div>
//             <div className="description">anchal@gmail.com</div>
//         </div>
//     </div>
//    </div>
//   );
// };

// export default ContactDetail;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = (props) => {
  const location = useLocation();
  const propsData = location.state;
  console.log("props =>", location, propsData);
  const { name, email } = propsData.contact;
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
