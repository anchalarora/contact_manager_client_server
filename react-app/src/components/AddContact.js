import React from "react";
import {withRouter} from './withRouter';



class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
  };
  

  add = (e) => {
    e.preventDefault();
    if (this.state.name === " " || this.state.email === "") {
      alert("Please Enter name and email");
      return;
    }
    this.props.addContactHandler(this.state);
    this.setState({ name: "", email: "" });
    console.log("props =>  ",this.props);
    this.props.navigate("/");
    //this.props.history.push("/");
  };

  render() {
    return (
      <div className="ui main">
        <h2> Add Contact</h2>
        <form className="ui form" onSubmit={this.add}>
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
          <button className="ui button blue">Add Contact</button>
        </form>
      </div>
    );
  }
}

export default withRouter(AddContact);
