// import React from "react";
// import { useLocation } from "react-router-dom";

// import { useNavigate } from 'react-router-dom';

import React from "react";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import {withRouter} from './withRouter';

// export const withRouter = (Component) => {
//   const Wrapper = (props) => {
//     const navigate = useNavigate();

//     return (
//       <Component
//         navigate={navigate}
//         {...props}
//         />
//     );
//   };

//   return Wrapper;
// };

// class EditContact extends React.Component {
//   componentDidMount() {
//     const { location } = this.props;

//     // Access properties of the location object
//     console.log("loc",location);

//   }
//   // state = {
//   //   name: "",
//   //   email: "",
//   // };

//   // constructor(props) {
//   //   super(props);

//   //   console.log("edit", props);

//   //   const { id = "23", email ="a", name ="d" } = props.contact;
//   //   //const { id, name, email } = contact;
//   //   this.state = {
//   //     id ,
//   //     name,
//   //     email
//   //   };
//   // }

//   render() {
//     return(
// <></>
//     )
//   }

//   //   update = (e) => {
//   //     e.preventDefault();
//   //     if (this.state.name === " " || this.state.email === "") {
//   //       alert("Please Enter name and email");
//   //       return;
//   //     }
//   //     this.props.updateContactHandler(this.state);
//   //     this.setState({ name: "", email: "" });
//   //     console.log("props =>  ", this.props);
//   //     this.props.navigate("/");
//   //     //this.props.history.push("/");
//   //   };

//   //   render() {
//   //     return (
//   //       <div className="ui main">
//   //         <h2> Update Contact</h2>
//   //         <form className="ui form" onSubmit={this.update}>
//   //           <div className="field">
//   //             <label>Name</label>
//   //             <input
//   //               type="text"
//   //               name="name"
//   //               placeholder="Name"
//   //               value={this.state.name}
//   //               onChange={(e) => this.setState({ name: e.target.value })}
//   //             ></input>
//   //           </div>
//   //           <div className="field">
//   //             <label>Email</label>
//   //             <input
//   //               type="text"
//   //               name="name"
//   //               placeholder="Email"
//   //               value={this.state.email}
//   //               onChange={(e) => this.setState({ email: e.target.value })}
//   //             ></input>
//   //           </div>
//   //           <button className="ui button blue">Add Contact</button>
//   //         </form>
//   //       </div>
//   //     );
//   //   }
// }

// export default withRouter(EditContact);

// class EditContact extends React.Component {
//   render() {
//     const { location } = this.props;

//     console.log("loc",location, location.state);

//     return (
//       <div>
//         <p>Current location: {location.pathname}</p>
//       </div>
//     );
//   }
// }

class EditContact extends React.Component {
  
  // componentDidMount() {

  //   const { location , navigate } = this.props;

  //   console.log("loc", location, navigate);
  // }

  constructor(props) {
    super(props);

    //console.log("edit", props);
    const { location } = props;

    console.log("loc", location, location.state.contact);

    const { id = "23", email = "a", name = "d" } = location.state.contact;
    //const { id, name, email } = location.state.contact;
    this.state = {
      id,
      name,
      email,
    };
  }

  update = (e) => {
    e.preventDefault();
    if (this.state.name === " " || this.state.email === "") {
      alert("Please Enter name and email");
      return;
    }
    this.props.updateContactHandler(this.state);
    this.setState({ name: "", email: "" });
    console.log("props =>  ", this.props);
    this.props.navigate(-1);
    //navigate(-1);
  };

  render() {
    return (
      <div className="ui main">
        <h2> Update Contact</h2>
        <form className="ui form" onSubmit={this.update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
            ></input>
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="name"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            ></input>
          </div>
          <button className="ui button blue">Update Contact</button>
        </form>
      </div>
    );
  }
}

export { EditContact };

const EditContactWithLocation = (props) => {
  const location = useLocation();
  const navigate = useNavigate()

  return <EditContact navigate={navigate} location={location} {...props} />;
};

export default EditContactWithLocation;
