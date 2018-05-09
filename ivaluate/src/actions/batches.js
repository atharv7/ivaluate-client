import * as request from 'superagent'
import {baseUrl} from '../constants'
import {logout} from './users'
import {isExpired} from '../jwt'

export const ADD_BATCH = 'ADD_BATCH'
export const UPDATE_BATCHES = 'UPDATE_BATCHES'

const addBatch = batch => ({
    type: ADD_BATCH,
    payload: batch
  })

const updateBatches = batches => ({
    type: UPDATE_BATCHES,
    payload: batches
})

  export const getBatches = () => (dispatch, getState) => {
    const state = getState()
    if (!state.currentUser) return null
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
  
    request
      .get(`${baseUrl}/batches`)
      .set('Authorization', `Bearer ${jwt}`)
      .then(result => dispatch(updateBatches(result.body)))
      .catch(err => console.error(err))
  }

  export const createBatch = (batch,starts,ends) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.currentUser.jwt
  
    if (isExpired(jwt)) return dispatch(logout())
    
    request
      .post(`${baseUrl}/batches`)
      .set('Authorization', `Bearer ${jwt}`)
      .send({ batch: batch, starts: starts, ends: ends})
      .then(result => dispatch(addBatch(result.body)))
      .catch(err => console.error(err))
  }