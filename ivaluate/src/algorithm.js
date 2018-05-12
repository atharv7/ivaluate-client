import * as request from 'superagent'
import {baseUrl} from './constants'



export const algorithm = (batch) => async (dispatch,getState) => { 
    const state = getState()
    const jwt = state.currentUser.jwt
    const allStudents = await request
                    .get(`${baseUrl}/students/${batch}`)
                    .set('Authorization', `Bearer ${jwt}`)
                    .then(result => {return result.body})
                    .catch(err => console.log(err))
    if (!allStudents) {
        alert('No Students in this batch')
        return ''
    } 

    const studentsBucket = []
    const pushRandomByColor = (color,allStudents) => {
        const studentsColored = allStudents.filter(student=>student.lastGrade===color)
        if(studentsColored.length===0) return null
        const toPushColored = studentsColored[Math.floor(Math.random()*studentsColored.length)]
        studentsBucket.push(toPushColored)
    }

    while (studentsBucket.length<100) {
        while(studentsBucket.length<53) {
            const statusRed = pushRandomByColor('red',allStudents)
            if(statusRed===null) {
                const statusGrey = pushRandomByColor('Not Graded Yet!',allStudents)
                if(statusGrey===null) break
            }
        }
        while(studentsBucket.length<81) {
            const statusYellow = pushRandomByColor('yellow',allStudents)
            if(statusYellow===null) {
                const statusGrey = pushRandomByColor('Not Graded Yet!',allStudents)
                if(statusGrey===null) break
            }
        }
        
        const statusGreen = pushRandomByColor('green',allStudents)
        if(statusGreen===null) {
            const statusGrey = pushRandomByColor('Not Graded Yet!',allStudents)
            if(statusGrey===null) break
        }
          
    }
    const theChosenOne = studentsBucket[Math.floor(Math.random()*studentsBucket.length)];
    return theChosenOne
}