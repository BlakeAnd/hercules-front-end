import axios from 'axios'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const GET_USERS = "GET_USERS"
export const ERROR_MESSAGE = "ERROR_MESSAGE"
export const LOADING = "LOADING"
export const GET_EXERCISE = "GET_EXERCISE"

let login_url = 'http://localhost:8000/api/auth/login' || 'https://get-hercules.herokuapp.com/api/auth/login';
let signup_url = 'http://localhost:8000/api/auth/register' || 'https://get-hercules.herokuapp.com/api/auth/register';

export const login = creds => dispatch => {
    dispatch({type:LOGIN_START});
    return axios
    .post(`${login_url}`,creds)
    .then(res => {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('id',res.data.user.id)
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('token',res.data.token)
        dispatch({type:LOGIN_SUCCESS,payload:res.data.payload})
        console.log("res", res)
        return true
    })
    .catch(err => {
        dispatch({type:LOGIN_FAILURE,payload:err.response})
    })
}


export const signup = (creds) => {
    return(dispatch) => {
      dispatch({type: LOADING})
      axios.post(`${signup_url}`, creds)
        .then( response => {
          dispatch({type: GET_USERS, users: response.data})
        })
        .catch(err => {
          dispatch({type: ERROR_MESSAGE, errorMessage: "User was unable to be added."})
        })
    }
  }

export const addExercise = (exdata) => {
  return(dispatch) => {
    dispatch({type: LOADING})
    axios.post('https://get-hercules.herokuapp.com/api/restricted/exercises', exdata,
    {headers: { Authorization: localStorage.getItem("token") }, 'Content-Type': 'application/json'}, {headers: { Authorization: localStorage.getItem("id") } })
    .then( response => {
      dispatch({type: GET_EXERCISE, exercises: response.data})
      
    })
    .catch(err => {
      dispatch({type: ERROR_MESSAGE, errorMessage: "User was unable to be added."})
    })
  }
}

export const deleteExercise = (id) => {
  return(dispatch) => {
    dispatch({type: LOADING})
    axios.delete(`https://get-hercules.herokuapp.com/api/restricted/exercises/${id}`, {headers: { Authorization: localStorage.getItem("token") } })
      .then(response => {
        dispatch({type: GET_EXERCISE, exercises: response.data })
      })
      .catch(err => {
        dispatch({type: ERROR_MESSAGE, errorMessage: "This exercise cannot be deleted."})
      })
  }
}

export const getExercise = () => {
  return(dispatch) => {
    dispatch({type: LOADING})
    axios.get('https://get-hercules.herokuapp.com/api/restricted/exercises', {headers: { Authorization: localStorage.getItem("token") } })
    .then( response => {
      dispatch({type: GET_EXERCISE, exercises: response.data.exercises})
    })
    .catch(err => {
      dispatch({type: ERROR_MESSAGE, errorMessage: "User was unable to be added."})
    })
  }
  
}


export const updateExercise = (updateExercise) => {
  return(dispatch) => {
    console.log("update action test id", updateExercise.id)
    dispatch({type: LOADING})

    axios.put(`https://get-hercules.herokuapp.com/api/restricted/exercises/${updateExercise.id}`, updateExercise, {headers: { Authorization: localStorage.getItem("token") } })

      .then( response => {
        console.log("update res", response)
        dispatch({type: GET_EXERCISE, exercise: response.data})
        // getExercise()
      })
      .catch(err => {
        dispatch({type: ERROR_MESSAGE, errorMessage: `This exercise can't be updated.`})
      })
  }
}
