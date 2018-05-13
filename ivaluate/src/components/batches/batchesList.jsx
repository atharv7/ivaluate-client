
import React, {PureComponent} from 'react'
import {getBatches, createBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class BatchesList extends PureComponent {

  state = {}

  onChangeHandler = (e) => {
    const {name,value} = e.target
    this.setState ({
      [name]: value
    })
  }

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batches === null) this.props.getBatches()
    }
  }

  renderBatch = (batch) => {

    return (
      <div>
        Batch #{batch.batch}
        <br/>
        Starts: {batch.starts} | Ends: {batch.ends}
        <br/>
        <input type="button" value="VIEW"
          size="small"
          onClick={() => {this.props.history.push(`/batches/${batch.batch}`)}}
        /><hr/>
      </div>
    )
  }

  render() {
    const {batches, authenticated, createBatch} = this.props

    if (!authenticated) return (<Redirect to="/home" />)
    
    if (batches === null) return null
    
    return (
      <div>
        <input
          type="number"
          name="batch"
          placeholder="Batch #"
          onChange={this.onChangeHandler}
          value={this.state.batch || ''} 
        />
        <input
          type="date"
          name="starts"
          placeholder="Starts"
          onChange={this.onChangeHandler}
          value={this.state.starts || ''}
        />
        <input
          type="date"
          name="ends"
          placeholder="Ends"
          onChange={this.onChangeHandler}
          value={this.state.ends || ''}
        />
        <input
          type="button"
          value="New Batch"
          onClick={
            ()=>createBatch(this.state.batch,this.state.starts,this.state.ends)}
        />
        <div>
          {batches.map(batch => this.renderBatch(batch))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  batches: state.batches === null ? null : Object.values(state.batches).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getBatches, createBatch})(BatchesList)
