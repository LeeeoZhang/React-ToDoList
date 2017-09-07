import React from 'react'
import './UserDialog.css'
import {signUp, signIn, getErrorMessage, sendPasswordResetEmail} from './leanCloud'
import {getStateCopy} from './utils'
import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'

export default class UserDialog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                username: '',
                password: '',
                email: ''
            }
        }
    }

    signUp (event) {
        event.preventDefault()
        let {username, password, email} = this.state.formData
        let success = (user) => {
            this.props.onSigUp.call(null, user)
        }
        let error = (error) => {
            alert(getErrorMessage(error.code))
        }
        signUp(username, password, email, success, error)
    }

    signIn (event) {
        event.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            this.props.onSign.call(null, user)
        }
        let error = (error) => {
            switch (error.code) {
                case 202:
                    alert('用户名已被占用')
                    break
                default:
                    alert(error)
                    break
            }
        }
        signIn(username, password, success, error)
    }

    showForgotPassword () {
        let stateCopy = getStateCopy(this.state)
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }

    resetPassword (event) {
        event.preventDefault()
        sendPasswordResetEmail(this.state.formData.email)
    }

    returnToSignIn () {
        let stateCopy = getStateCopy(this.state)
        stateCopy.selectedTab = 'signInOrSignUp'
        this.setState(stateCopy)
    }

    changeFormData (key, event) {
        let stateCopy = getStateCopy(this.state)
        stateCopy.formData[key] = event.target.value
        this.setState(stateCopy)
    }

    render () {
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ?
                        <SignInOrSignUp formData={this.state.formData}
                                        onSignIn={this.signIn.bind(this)}
                                        onSignUp={this.signUp.bind(this)}
                                        onChange={this.changeFormData.bind(this)}
                                        onForgotPassword={this.showForgotPassword.bind(this)}/> :
                        <ForgotPasswordForm formData={this.state.formData}
                                            onSubmit={this.resetPassword.bind(this)}
                                            onChange={this.changeFormData.bind(this)}
                                            onSignIn={this.returnToSignIn.bind(this)}/>}
                </div>
            </div>
        )
    }
}