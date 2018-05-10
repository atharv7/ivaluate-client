import * as request from 'superagent'
import {baseUrl} from '../constants'
import { UPDATE_STUDENTS } from './students';
import {getStudents} from './students'
export const GIVE_GRADE = 'GIVE_GRADE'


export const giveGrade = (color,remarks,student,teacher) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.login.user

  const grade = {
      color,remarks,student,teacher
  }
  grade.date=new Date()
  function getBatch(student){
      const batch = request
        .get(`${baseUrl}/students/${student}`)
        .then(result=>{alert(result.batch)})
  }
  request
    .post(`${baseUrl}/students/${student}/grades`)
    .send(grade)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
        const batchId = getBatch(result.body.student)
        dispatch(getStudents(batchId))
    })
    .catch(err => {console.log('error: ' + err)})
}