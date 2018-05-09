import {ADD_STUDENT, UPDATE_STUDENTS} from '../actions/students'

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_STUDENT:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_STUDENTS:
      return payload.reduce((students, student) => {
        students[student.id] = student
        return students
      }, {})

    default:
      return state
  }
}