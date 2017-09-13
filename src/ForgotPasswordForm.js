import React from 'react'
import './ForgotPasswordForm.css'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class ForgotPasswordForm extends React.Component {
    render () {
        let backSignInBtn = {
            marginLeft: 10
        }
        return (
            <div className="forgotPassword">
                <h3>
                    reset password
                </h3>
                <form className="forgotPassword" onSubmit={this.props.onSubmit}>
                    <div className="row">
                        {/*<label>邮箱</label>*/}
                        {/*<input type="text" value={this.props.formData.email}*/}
                        {/*onChange={this.props.onChange.bind(null, 'email')}/>*/}
                        <TextField hintText="Email" onChange={this.props.onChange.bind(null, 'email')}
                                   value={this.props.formData.email}/>
                    </div>
                    <div className="row action">
                        {/*<button type="submit">发送重置邮件</button>*/}
                        {/*<button onClick={this.props.onSignIn}>返回登录</button>*/}
                        <RaisedButton type="submit" label="send" primary={true}/>
                        <RaisedButton onClick={this.props.onSignIn} type="submit" label="back SignIn" primary={true}
                                      style={backSignInBtn}/>
                    </div>
                </form>
            </div>
        )
    }
}