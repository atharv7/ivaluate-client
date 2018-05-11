import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_STUDENT = 'ADD_STUDENT'
export const UPDATE_STUDENTS = 'UPDATE_STUDENTS'

const addStudent = student => ({
    type: ADD_STUDENT,
    payload: student
  })

export const updateStudents = students => ({
    type: UPDATE_STUDENTS,
    payload: students
})

  export const getStudents = (batch) => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
    
    request
      .get(`${baseUrl}/students/${batch}/`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => dispatch(updateStudents(result.body)))
      .catch(err => console.error(err))
  }

  export const createStudent = (fullname,photo,batch) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())

    
    request
      .post(`${baseUrl}/students`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ fullName: fullname, photo: photo, batch: batch})
      .then(result => dispatch(addStudent(result.body)))
      .catch(err => console.error(err))
  }

  export const editStudent = (id,fullname,photo,batch) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())
    
    request
      .put(`${baseUrl}/students/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ fullName: fullname, photo: photo, batch: batch})
      .then(result => dispatch(getStudents(result.body.batch)))
      .catch(err => console.error(err))
  }

  export const deleteStudent = (id) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
    if (isExpired(jwt)) return dispatch(logout())
    
    request
      .delete(`${baseUrl}/students/${id}`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => dispatch(getStudents(result.body.batch)))
      .catch(err => console.error(err))
  }