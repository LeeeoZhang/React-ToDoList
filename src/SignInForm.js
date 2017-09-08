import React from 'react'

export default function (props) {
    return (
        <form className="signIn" onSubmit={props.onSubmit.bind(this)}>
            <div className="row">
                <label>用户名</label>
                <input type="text" value={props.formData.username}
                       onChange={props.onChange.bind(null, 'username')}/>
            </div>
            <div className="row">
                <label>密码</label>
                <input type="password" value={props.formData.password}
                       onChange={props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row action">
                <button type="submit">登录</button>
                <button onClick={props.onForgotPassword}>忘记密码？</button>
            </div>
        </form>
    )
}