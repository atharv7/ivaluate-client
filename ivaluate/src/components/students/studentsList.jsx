import React, {PureComponent} from 'react'
import {getStudents, createStudent,editStudent,deleteStudent} from '../../actions/students'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './studentsList.css'
import { giveGrade } from '../../actions/grades'
import {algorithm} from '../../algorithm'

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
      
          <br/>
          <img src={student.photo} alt={student.fullName} style={{width:'100%'}}/>
          <h1>{student.fullName}</h1>
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

          <form id={student.id+'_editform'} style={{display:'none'}} onSubmit={
            (e)=>{e.preventDefault()
          editStudent(student.id,document.getElementById(student.id+'_editfullname').value,document.getElementById(student.id+'_editphoto').value,student.batch)}
          }>
      <input type="text" id={student.id + "_editfullname"} placeholder="Full Name"/>
      <input type="text" id={student.id + "_editphoto"} placeholder="Photo"/>
      <input type="submit" value="Submit"
        color="primary"
        variant="raised"
        className="create-student"
      />
      </form>
      <form id={student.id+'_gradeform'} style={{display:'none'}} onSubmit={(e)=>{
                                e.preventDefault()
                                giveGrade(document.getElementById(student.id+'_editgrade').value,
                                document.getElementById(student.id+'_editremark').value,student.id,teacherId|1)}}>
        <select id={student.id + "_editgrade"} placeholder="Select">
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
        </select>
        <textarea id={student.id+'_editremark'} placeholder="Remarks"></textarea>
        <input type="submit" value="Submit"
          color="primary"
          variant="raised"
          className="create-student"
        />
      </form>
      
        </div>
      )
  }

  render() {
    const {students, authenticated, createStudent,algorithm} = this.props
    
    if (!authenticated) return (
			<Redirect to="/home" />
		)

    if (students === null) return null

    return (<div><div className="outer-paper">
    <h1>Batch #{this.props.match.params.id}</h1>
      <form onSubmit={(e)=>{
        e.preventDefault()
        createStudent(
          document.getElementById('fullname').value,
          document.getElementById('photo').value,
          document.getElementById('batch').value)
      }}>
      <input type="hidden" id="batch" placeholder="Batch #" value={this.props.match.params.id} />
      <input type="text" id="fullname" placeholder="Full Name" />
      <input type="text" id="photo" placeholder="Photo" />
      <input type="submit" value="New Student"
        color="primary"
        variant="raised"
        className="create-student"
      />
      </form>
      <br/><br/>
      <input type="button" value="ASK A QUESTION" 
        onClick={()=>algorithm(this.props.match.params.id)}/>
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
  students: state.students === null ? null : Object.values(state.students).sort((a, b) => a.id - b.id)
})

export default connect(mapStateToProps, {getStudents,algorithm, createStudent, editStudent,deleteStudent,giveGrade})(StudentsList)
