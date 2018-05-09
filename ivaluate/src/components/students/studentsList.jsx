import React, {PureComponent} from 'react'
import {getStudents, createStudent} from '../../actions/students'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class StudentsList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getStudents(this.props.match.params.id)
    }
  }

  renderStudent = (student) => {
    return (<div>
      
          Batch #{student.batch}
          <br/>
          Name: {student.fullName} | Photo: {student.photo}
            
        
      
            <br/>
        <hr/>
        </div>
      )
  }

  render() {
    const {students, authenticated, createStudent} = this.props
    
    if (!authenticated) return (
			<Redirect to="/home" />
		)

    if (students === null) return null

    return (<div><div className="outer-paper">
      <input type="hidden" id="batch" placeholder="Batch #" value={this.props.match.params.id} />
      <input type="text" id="fullname" placeholder="Full Name" />
      <input type="text" id="photo" placeholder="Photo" />
      <input type="button" value="New Student"
        color="primary"
        variant="raised"
        onClick={()=>createStudent(
                              document.getElementById('fullname').value,
                              document.getElementById('photo').value,
                              document.getElementById('batch').value)}
        className="create-student"
      />
      <div className="create-student-form">

      </div>
</div><div>
        {students.map(student => this.renderStudent(student))}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  students: state.students === null ? null : Object.values(state.students).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getStudents, createStudent})(StudentsList)
