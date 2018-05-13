import React, {PureComponent} from 'react'
import {getStudents, createStudent,editStudent,deleteStudent} from '../../actions/students'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import './studentsList.css'
import { giveGrade } from '../../actions/grades'
import {algorithm} from '../../algorithm'

class StudentsList extends PureComponent {
  state = {} // setup empty state

  //onClickToggleButtons
  toggleOnClick = (e) => {
    const {id} = e.target
    if(this.state[id]==='block'){
    this.setState({
      [id]: 'none'
    }) } else {
    this.setState({
      [id]: 'block',
      [(id.split('_')[1]==='toggle')?id.split('_')[0]+'_grade':id.split('_')[0]+'_toggle']: 'none'
    })
  }
  }

  onChangeHandler = (e) => {
    const {name,value} = e.target
    this.setState ({
      [name]: value
    })
  }
 
  componentWillMount() {
    if (this.props.authenticated) {
      this.props.getStudents(this.props.match.params.id)
      
    }
  }


  renderStudent = (student,teacherId) => {
    
    const {editStudent,deleteStudent,giveGrade} = this.props
    
    return (<div className="StudentBox" key={student.id} style={{backgroundColor:student.lastGrade || 'grey'}}>
      
          <br/>
          <img src={student.photo} alt={student.fullName} style={{width:'100%'}}/>
          <h1>{student.fullName}</h1>
            <br/>
                <input
              id={student.id + '_grade'}
              type="button" 
              value="grade" 
              onClick={this.toggleOnClick} />
                <input
              id={student.id + '_toggle'}
              type="button" 
              value="edit" 
              onClick={this.toggleOnClick} />
                <input
              id={student.id + '_delete'}
              type="button" 
              value="delete" 
              onClick={
                ()=>deleteStudent(student.id)} />

          <form id={student.id+'_editform'} style={{display:this.state[student.id + '_toggle'] || 'none'}} onSubmit={
            (e)=>{
              this.setState({[student.id+'_toggle']:'none'})
              e.preventDefault()
          editStudent(student.id,this.state[student.id+'_editfullname'],this.state[student.id+'_editphoto'],student.batch)}
          }>
      <input type="text" name={student.id + "_editfullname"} placeholder="Full Name" onChange={this.onChangeHandler} value={this.state[this.id]}/>
      <input type="text" name={student.id + "_editphoto"} placeholder="Photo" onChange={this.onChangeHandler} value={this.state[this.id]}/>
      <input type="submit" value="Submit"
        color="primary"
        variant="raised"
        className="create-student"
      />
      </form>
      <form id={student.id+'_gradeform'} style={{display:this.state[student.id + '_grade'] || 'none'}} onSubmit={(e)=>{
                                this.setState({[student.id+'_grade']:'none'})
                                e.preventDefault()
                                giveGrade(this.state[student.id+'_editgrade'] || student.lastGrade,
                                this.state[student.id+'_editremark'] || '',student.id,teacherId|1)}}>
        <select name={student.id + "_editgrade"} placeholder="Select" onChange={this.onChangeHandler} value={this.state[this.name]}>
                <option value={student.lastGrade}>===select===</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
        </select>
        <textarea name={student.id+'_editremark'} placeholder="Remarks" onChange={this.onChangeHandler}></textarea>
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

    return (<div>
      <div id="myModal" className="modal" onClick={()=>this.setState({modeldisplay:'none'})} style={{display:this.state.modeldisplay ||'none'}}>


      <div className="modal-content">
        <span className="close" onClick={()=>this.setState({modeldisplay: 'none'})}>&times;</span>
        <img alt="randomImage" id="randomImage" src={this.state.randomImage || ''} style={{maxWidth:'500px'}} />
        <h2 id="randomName" style={{margin:'auto'}}>{this.state.randomName || ''}</h2>
      </div>

      </div>
    <div className="outer-paper">
    <h1>Batch #{this.props.match.params.id}</h1>
      <form onSubmit={(e)=>{
        e.preventDefault()
        createStudent(
          this.state.fullname || '',
          this.state.photo || '',
          this.props.match.params.id)
      }}>
      <input type="text" name="fullname" placeholder="Full Name" onChange={this.onChangeHandler} value={this.state.fullname}/>
      <input type="text" name="photo" placeholder="Photo" onChange={this.onChangeHandler} value={this.state.photo}/>
      <input type="submit" value="New Student"
        color="primary"
        variant="raised"
        className="create-student"
      />
      </form>
      <br/><br/>
      
      <input type="button" value="ASK A QUESTION" 
        onClick={async () => {
          const theChosenOne = await algorithm(this.props.match.params.id)
          if(!theChosenOne) {
            alert('No students in this batch!')
            return null
          }
          this.setState({
            randomImage:theChosenOne.photo,
            randomName:theChosenOne.fullName,
            modeldisplay:'block'})
          }}/>
          <br/><br/>
       { 
        this.props.students.length>0 && 
        <div> 
          <div className="bar red" style={{width:(this.props.students.filter(x=>x.lastGrade==='red').length/students.length)*100+'%'}}></div>
          <div className="bar yellow" style={{width:(this.props.students.filter(x=>x.lastGrade==='yellow').length/students.length)*100+'%'}}></div>
          <div className="bar green" style={{width:(this.props.students.filter(x=>x.lastGrade==='green').length/students.length)*100+'%'}}></div>
          <div className="bar grey" style={{width:(this.props.students.filter(x=>x.lastGrade==='Not Graded Yet!').length/students.length)*100+'%'}}/>
        </div>
      }
      </div> 
      <div>
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
