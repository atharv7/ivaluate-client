/* eslint no-restricted-globals: ["off", "location"] */
import React, {PureComponent} from 'react'
import {getBatches, createBatch} from '../../actions/batches'
import {getUsers} from '../../actions/users'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

// import Button from 'material-ui/Button'
// import Paper from 'material-ui/Paper'
// import Card, { CardActions, CardContent } from 'material-ui/Card'
// import Typography from 'material-ui/Typography'

// import './BatchesList.css'

class BatchesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batches === null) this.props.getBatches()
    }
  }

  renderBatch = (batch) => {
    const {starts,ends} = this.props

    return (<div>
          Starts: {batch.starts} | Ends: {batch.ends}
            <br/>
          Batch #{batch.batch}
        
      
            <br/>
        <input type="button" value="VIEW"
          size="small"
          onClick={() => {history.push(`/batches/${batch.id}`)}}
        />
        </div>
      )
  }

  render() {
    const {batches, authenticated, createBatch} = this.props

    if (!authenticated) return (
			<Redirect to="/home" />
		)

    if (batches === null) return null

    return (<div><div className="outer-paper">
      <input type="button" value="New Batch"
        color="primary"
        variant="raised"
        onClick={createBatch}
        className="create-batch"
      />
</div><div>
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
