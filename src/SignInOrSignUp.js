import React, {Component} from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import './SignInOrSignUp.css'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'

export default class SignInOrSignUp extends Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: 'signIn'
        }
    }

    switchForm (event) {
        console.log(event.target.value)
        this.setState({
            selected: event.target.value
        })
    }

    render () {
        let radioGroupStyle = {
            display: 'flex'
        }
        let radioStyle = {
            width: 50
        }
        return (
            <div className="signOrSinUp">
                <nav>
                    {/*<label>*/}
                    {/*<input type="radio" value="signUp" checked={this.state.selected === 'signUp'}*/}
                    {/*onChange={this.switch.bind(this)}/>*/}
                    {/*注册*/}
                    {/*</label>*/}
                    {/*<label>*/}
                    {/*<input type="radio" value="signIn" checked={this.state.selected === 'signIn'}*/}
                    {/*onChange={this.switch.bind(this)}/>*/}
                    {/*登录*/}
                    {/*</label>*/}
                    <RadioButtonGroup name="signInOrSignUp"
                                      style={radioGroupStyle}
                                      onChange={this.switchForm.bind(this)}
                                      defaultSelected="signIn">
                        <RadioButton
                            value="signUp"
                            label="SignUp"
                            style={radioStyle}
                        />
                        <RadioButton
                            value="signIn"
                            label="SignIn"
                            style={radioStyle}
                        />
                    </RadioButtonGroup>
                </nav>
                <div className="panes">
                    {this.state.selected === 'signUp' ?
                        <SignUpForm formData={this.props.formData} onSubmit={this.props.onSignUp}
                                    onChange={this.props.onChange}/> : null}
                    {this.state.selected === 'signIn' ?
                        <SignInForm formData={this.props.formData} onChange={this.props.onChange}
                                    onSubmit={this.props.onSignIn}
                                    onForgotPassword={this.props.onForgotPassword}/> : null}
                </div>
            </div>
        )
    }
}