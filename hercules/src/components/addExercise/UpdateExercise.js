import React from 'react';
import { connect } from 'react-redux';
import './addexercise.css'
import { updateExercise } from '../../actions/index';
import { withRouter } from 'react-router-dom';
import Nav from "../Nav";
import { NavLink } from 'react-router-dom';
import './addexercise.css'

class UpdateExercise extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            journalId: 0,
            userId: localStorage.getItem('id'),
            name: '',
            reps: '',
            sets: '',
            weight: ''
        }
    }

      

    componentDidMount() {
        let userID = parseInt(localStorage.getItem("id"));
        //let filtered = this.props.exercises.filter( e => e.userId === userID);
        let filtered =[];
        //
        if( this.props.exercises  && this.props.exercises.length > 0){
          filtered = this.props.exercises.filter( e => e.userId === userID);
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();
          today = mm + '/' + dd + '/' + yyyy;
        
        this.setState({
                id: filtered[this.props.carouselIndex].id,
                journalId: filtered[this.props.carouselIndex].journalId,
                name: filtered[this.props.carouselIndex].name,
                reps: today,
                sets: filtered[this.props.carouselIndex].sets,
                weight: filtered[this.props.carouselIndex].weight             
            })
        }
    }



    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    submitHandler = (e) => {
        // console.log("sub e", e);
        
        // console.log("state id", this.state.id);
        // console.log("state journo id", this.state.journalId);
        e.preventDefault();
        
        this.props.updateExercise(this.state);
        this.props.history.push('/dashboard');
        setTimeout(function(){ window.location.reload() }, 200);
        //console.log("state id", this.state)

    }

    render(){
        console.log("update props", this.props.exercises)
        return(
            <div className="addExercise-page">
            <Nav />
            <NavLink exact to="/select-exercise"><div className="addExercise-back-btn"></div></NavLink>
            <form className="exerciseInfoForm" onSubmit={this.submitHandler}>
            <h3>Exercise Title</h3>
            <input className="input-title" onChange={this.inputHandler} type="text" name="name" placeholder="e.g. Quick hit Abs" value={this.state.name} required></input>
            <h3>Region</h3>
            <input className="input-date" onChange={this.inputHandler} type="text" name="sets" value={this.state.sets} placeholder="Sets" required></input>
            <h3>Description</h3>
            <textarea className="input-description" onChange={this.inputHandler} disabled="disabled" type="text" name="description" placeholder="Write a description of the workout" value={this.state.description}></textarea>

            <h3>Target Region Area</h3>
            <select className="targetRegion-Btns">
                <button type="button" onClick={this.inputHandler} /*disabled="disabled"*/ name="targetRegion" value="Biceps">Biceps</button>
                <button type="button" onClick={this.inputHandler} /*disabled="disabled"*/ name="targetRegion"  value="Triceps">Triceps</button>
                <button type="button" onClick={this.inputHandler} /*disabled="disabled"*/ name="targetRegion"  value="Back">Back</button>
                <button type="button" onClick={this.inputHandler} /*disabled="disabled"*/ name="targetRegion"  value="Chest">Chest</button>
                <button type="button" onClick={this.inputHandler} /*disabled="disabled"*/ name="targetRegion"  value="Shoulders">Shoulders</button>
                <button type="button" onClick={this.inputHandler} /*disabled="disabled"*/ name="targetRegion"  value="Legs">Legs</button>
            </select>

            <div className="addExercise-bottom">
                <h3>Date</h3>
                <h3> </h3>
                <h3 className="textlifted">Amount Lifted</h3>

                <input className="inputReps" type="text" onChange={this.inputHandler} value={this.state.reps} name="reps" placeholder="00" required></input>
                <h3>AND</h3>
                <input className="inputLifted" type="text" onChange={this.inputHandler} value={this.state.weight} name="weight" placeholder="00" required></input>
            </div>

            <div className="addExercise-customImage">
                <h3>Custom Image</h3>
                <input className="customImage" type="text" onChange={this.inputHandler} value={this.state.customimage} name="customimage" placeholder={`e.g https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/54522892_2244978498879256_1520327382362226688_n.jpg?_nc_cat=107&_nc_oc=AQkQKlS0mvrneVJtmCAgr2s0h8UApsxyzP7S02YoakMWFWKKCuwCj4a8c5REpm8IaLKyEUtoqbgb4aPwqE1jDp0A&_nc_ht=scontent-lga3-1.xx&oh=04f951dea2ad9f552d80f302e2152369&oe=5DC41051`}></input>
            </div>
            <button className="createExerciseBtn">Update exercise!</button>
        </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    exercises: state.exercises,
    carouselIndex: state.carouselIndex
    }
  };

export default withRouter(connect(mapStateToProps, {updateExercise})(UpdateExercise));