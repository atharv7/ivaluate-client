import * as request from 'superagent'
import {baseUrl} from './constants'

export const algorithm = (batch) => async function(dispatch,getState) { 
    const state = getState()
    const jwt = state.login.user
    const dice = Math.floor(Math.random() * 100) + 1
    const color = (dice<54)?'red':(dice<82)?'yellow':'green'
    const theChosenOne = await request
                                .post(`${baseUrl}/randomstudent`)
                                .set('Authorization', `Bearer ${jwt}`)
                                .send({batch,color})
                                .then(result => {return result.body})
                                .catch(err => console.log(err))
    if (!theChosenOne) return alert('No Students in this batch')
    document.getElementById('randomImage').setAttribute('src',theChosenOne.photo)
    document.getElementById('randomName').innerText=theChosenOne.fullName
    document.getElementById('myModal').style.display='block'

}