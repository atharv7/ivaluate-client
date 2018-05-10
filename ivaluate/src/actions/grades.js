import * as request from 'superagent'
import {baseUrl} from '../constants'
import {getStudents} from './students'
export const GIVE_GRADE = 'GIVE_GRADE'


export const giveGrade = (color,remarks,student,teacher) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.login.user

  const grade = {
      color,remarks,student,teacher
  }
  grade.date=new Date()
  async function getBatch(studentId){
      await request
        .get(`${baseUrl}/getbatch/${studentId}`)
        .set('Authorization', `Bearer ${jwt}`)
        .then(result=>{
            dispatch(getStudents(result.body.student.batch))
        })
  }
  request
    .post(`${baseUrl}/students/${student}/grades`)
    .send(grade)
    .set('Authorization', `Bearer ${jwt}`)
    .then(async function(result) {
        getBatch(parseInt(result.body.student,10))
    })
    .catch(err => {console.log('error: ' + err)})
}