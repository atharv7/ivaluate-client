import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {signup} from '../../actions/users'
import SignupForm from './signupForm'
import {Redirect} from 'react-router-dom'

class SignupPage extends PureComponent {
	handleSubmit = (data) => {
		this.props.postSignup(data.firstname, data.lastname, data.email, data.password)
	}

	render() {
		if (this.props.signup.success) {
            this.props.signup.success=false
            alert('Thank you! Please Login now!')
            return (
            
            <Redirect to="/" />
		)}

		return (
			<div>
				<h1>Sign up</h1>

				<SignupForm onSubmit={this.handleSubmit} />

				<p style={{color:'red'}}>{ this.props.signup.error }</p>
			</div>
		)
	}
}

const mapStateToProps = function (state) {
	return {
		signup: state.signup
	}
}

export default connect(mapStateToProps, {postSignup: signup})(SignupPage)
