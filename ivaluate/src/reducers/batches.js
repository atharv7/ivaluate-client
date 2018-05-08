import {ADD_BATCH, UPDATE_BATCHES} from '../actions/batches'

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_BATCH:
      return {
        ...state,
        [payload.id]: payload
      }

    case UPDATE_BATCHES:
      return payload.reduce((batches, batch) => {
        batches[batch.id] = batch
        return batches
      }, {})

    default:
      return state
  }
}