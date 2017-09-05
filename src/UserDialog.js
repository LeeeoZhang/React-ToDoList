import React from 'react'
import './UserDialog.css'
import {signUp, signIn} from './leanCloud'

export default class UserDialog extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            selected: 'signUp',
            formData: {
                username: '',
                password: ''
            }
        }
    }

    switch (event) {
        this.setState({
            selected: event.target.value
        })
    }

    signUp (event) {
        event.preventDefault()
        let {username, password} = this.state.formData
        let success = (user) => {
            this.props.onSigUp.call(null, user)
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
        signUp(username, password, success, error)
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

    changeFormData (key, event) {
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = event.target.value
        this.setState(stateCopy)
    }

    render () {
        let signUpForm = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">注册</button>
                </div>
            </form>
        )
        let signInForm = (
            <form className="signIn" onSubmit={this.signIn.bind(this)}>
                <div className="row">
                    <label>用户名</label>
                    <input type="text" value={this.state.formData.username}
                           onChange={this.changeFormData.bind(this, 'username')}/>
                </div>
                <div className="row">
                    <label>密码</label>
                    <input type="password" value={this.state.formData.password}
                           onChange={this.changeFormData.bind(this, 'password')}/>
                </div>
                <div className="row action">
                    <button type="submit">登录</button>
                </div>
            </form>
        )
        return (
            <div className="UserDialog-Wrapper">
                <div className="UserDialog">
                    <nav>
                        <label>注册<input type="radio" value="signUp" checked={this.state.selected === 'signUp'}
                                        onChange={this.switch.bind(this)}/></label>
                        <label>登录<input type="radio" value="signIn" checked={this.state.selected === 'signIn'}
                                        onChange={this.switch.bind(this)}/></label>
                    </nav>
                    <div className="panes">
                        {this.state.selected === 'signUp' ? signUpForm : null}
                        {this.state.selected === 'signIn' ? signInForm : null}
                    </div>
                </div>
            </div>
        )
    }
}