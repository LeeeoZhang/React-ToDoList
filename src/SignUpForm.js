import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default function (props) {
    return (
        <form className="signUp" onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                {/*<label>邮箱</label>*/}
                {/*<input type="text" value={props.formData.email}*/}
                {/*onChange={props.onChange.bind(null, 'email')}/>*/}
                <TextField hintText="Email" onChange={props.onChange.bind(null, 'email')}
                           value={props.formData.email}/>
            </div>
            <div className="row">
                {/*<label>用户名</label>*/}
                {/*<input type="text" value={props.formData.username}*/}
                {/*onChange={props.onChange.bind(null, 'username')}/>*/}
                <TextField hintText="Username" onChange={props.onChange.bind(null, 'username')}
                           value={props.formData.username}/>
            </div>
            <div className="row">
                {/*<label>密码</label>*/}
                {/*<input type="password" value={props.formData.password}*/}
                {/*onChange={props.onChange.bind(null, 'password')}/>*/}
                <TextField type="password" hintText="Password" onChange={props.onChange.bind(null, 'password')}
                           value={props.formData.password}/>
            </div>
            <div className="row action">
                {/*<button type="submit">注册</button>*/}
                <RaisedButton type="submit" label="SignUp" primary={true}/>
            </div>
        </form>
    )
}