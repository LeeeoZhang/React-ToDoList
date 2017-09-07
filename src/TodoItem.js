import React from 'react'
import './TodoItem.css'

export default class TodoItem extends React.Component {

    deleted (event) {
        this.props.onDelete(event, this.props.todo)
    }

    toggle (event) {
        this.props.onToggle(event, this.props.todo)
    }

    render () {
        return (
            <div>
                <input className="TodoItem" type="checkbox" checked={this.props.todo.status === 'completed'}
                       onChange={this.toggle.bind(this)}/>
                <span className="title">{this.props.todo.title}</span>
                <button onClick={this.deleted.bind(this)}>删除</button>
            </div>
        )
    }
}
