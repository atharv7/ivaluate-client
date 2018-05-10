import React, {PureComponent} from 'react'
import {getStudents, createStudent,editStudent,deleteStudent} from '../../actions/students'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './studentsList.css'
import { giveGrade } from '../../actions/grades';

class StudentsList extends PureComponent {
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getStudents(this.props.match.params.id)
    }
  }


  renderStudent = (student,teacherId) => {
    const {editStudent,deleteStudent,giveGrade} = this.props
    const toggleForm = id => {
      document.getElementById(id+'_editform')
                            .style
                            .display=(document.getElementById(id+'_editform')
                                              .style
                                              .display==='block')?'none':'block'
    }
    const toggleGrade = id => {
      document.getElementById(id+'_gradeform')
                            .style
                            .display=(document.getElementById(id+'_gradeform')
                                              .style
                                              .display==='block')?'none':'block'
    }
    return (<div className="StudentBox" key={student.id} style={{backgroundColor:student.lastGrade || 'grey'}}>
      
          Batch #{student.batch}
          <br/>
          <p>Name: {student.fullName} | Photo: {student.photo}</p>
            <br/>
                <input
              id={student.id + '_grade'}
              type="button" 
              value="grade" 
              onClick={
                ()=>toggleGrade(student.id)} />
                <input
              id={student.id + '_toggle'}
              type="button" 
              value="edit" 
              onClick={
                ()=>toggleForm(student.id)} />
                <input
              id={student.id + '_delete'}
              type="button" 
              value="delete" 
              onClick={
                ()=>deleteStudent(student.id)} />

          <form id={student.id+'_editform'} style={{display:'none'}}>
      <input type="text" id={student.id + "_editfullname"} placeholder="Full Name"/>
      <input type="text" id={student.id + "_editphoto"} placeholder="Photo"/>
      <input type="button" value="Submit"
        color="primary"
        variant="raised"
        onClick={()=>editStudent(student.id,document.getElementById(student.id+'_editfullname').value,document.getElementById(student.id+'_editphoto').value,student.batch)}
        className="create-student"
      />
      </form>
      <form id={student.id+'_gradeform'} style={{display:'none'}}>
        <select id={student.id + "_editgrade"} placeholder="Select">
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
        </select>
        <textarea id={student.id+'_editremark'} placeholder="Remarks"></textarea>
        <input type="button" value="Submit"
          color="primary"
          variant="raised"
          onClick={()=>giveGrade(document.getElementById(student.id+'_editgrade').value,
                                document.getElementById(student.id+'_editremark').value,student.id,teacherId|1)}
          className="create-student"
        />
      </form>
      
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
        {students.map(student => this.renderStudent(student,this.props.teacherId))}
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  teacherId: state.currentUser.id,
  authenticated: state.currentUser !== null,
  users: state.users === null ? null : state.users,
  students: state.students === null ? null : Object.values(state.students).sort((a, b) => b.id - a.id)
})

export default connect(mapStateToProps, {getStudents, createStudent, editStudent,deleteStudent,giveGrade})(StudentsList)
