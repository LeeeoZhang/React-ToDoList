import React from 'react'
import './TodoInput.css'

export default class TodoInput extends React.Component {
    submit (e) {
        if (e.key === 'Enter') {
            this.props.onSubmit(e)
        }
    }

    changeTitle (event) {
        this.props.onChange(event)
    }

    render () {
        return <input className="TodoInput" type="text" value={this.props.content} onKeyPress={this.submit.bind(this)}
                      onChange={this.changeTitle.bind(this)}/>
    }
}
