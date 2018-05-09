/* eslint no-restricted-globals: ["off", "location"] */
import React, {PureComponent} from 'react'
import {getBatches, createBatch} from '../../actions/batches'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class BatchesList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.batches === null) this.props.getBatches()
    }
  }

  renderBatch = (batch) => {

    return (<div>
      
          Batch #{batch.batch}
          <br/>
          Starts: {batch.starts} | Ends: {batch.ends}
            
        
      
            <br/>
        <input type="button" value="VIEW"
          size="small"
          onClick={() => {this.props.history.push(`/batches/${batch.id}`)}}
        /><hr/>
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
      <input type="number" id="batch" placeholder="Batch #" />
      <input type="date" id="starts" placeholder="Starts" />
      <input type="date" id="ends" placeholder="Ends" />
      <input type="button" value="New Batch"
        color="primary"
        variant="raised"
        onClick={()=>createBatch(document.getElementById('batch').value,
                              document.getElementById('starts').value,
                              document.getElementById('ends').value)}
        className="create-batch"
      />
      <div className="create-batch-form">

      </div>
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
