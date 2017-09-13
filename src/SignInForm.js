import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default function (props) {
    let forgetPasswordBtn = {
        marginLeft: 10
    }
    return (
        <form className="signIn" onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                <TextField hintText="Username" onChange={props.onChange.bind(null, 'username')}
                           value={props.formData.username}/>
            </div>
            <div className="row">
                <TextField type="password" hintText="Password" onChange={props.onChange.bind(null, 'password')}
                           value={props.formData.password}/>
            </div>
            <div className="row action">
                {/*<button type="submit">登录</button>*/}
                <RaisedButton type="submit" label="SignIn" primary={true} />
                {/*<button onClick={props.onForgotPassword}>忘记密码？</button>*/}
                <RaisedButton label="Password?" primary={true} onClick={props.onForgotPassword} style={forgetPasswordBtn}/>
            </div>
        </form>
    )
}