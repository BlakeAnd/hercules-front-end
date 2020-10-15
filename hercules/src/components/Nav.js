import React from "react";
import { NavLink } from 'react-router-dom';
import "./nav.css"
import { toggleDrop } from "../actions/NavActions"
import { connect } from "react-redux";

class Nav extends React.Component{
 
  dropMenu = () => {
    //this.props.dropped = !this.props.dropped;
    this.props.toggleDrop();
    //console.log("state", this.state);
    //console.log("prop drop", this.props.dropped);
  }
  
  clearToken = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  render(){
    return(
      <div className="Nav">
  
        <div className="mobile-bar desktop-bar">
          <div className="menu-burger" onClick={this.dropMenu}> </div>
          
          
          <div className="menu-logo"></div>

          <div className="menu-profile"></div>
        </div>
        
        
          <div className={  this.props.dropped ? "drop-down" : "up"}>
            
            <NavLink className="nav-links nav-link-home" exact to="/dashboard">Home</NavLink>
            <NavLink className="nav-links" exact to="/add-exercise">Add Excercise</NavLink>
            <NavLink className="nav-links" onClick={this.clearToken} exact to="/">Sign Out</NavLink>
          </div>
       

        
      </div>
      
    );
  }
}
//<NavLink exact to="/tracking">tracking</NavLink>
const mapStateToProps = state => ({
  dropped: state.dropped
});

export default connect(
  mapStateToProps,
  { toggleDrop }
)(Nav);

