import React from 'react'
import './TodoItem.css'
import FlatButton from 'material-ui/FlatButton'
import Checkbox from 'material-ui/Checkbox'

export default class TodoItem extends React.Component {

    deleted (event) {
        this.props.onDelete(event, this.props.todo)
    }

    toggle (event) {
        this.props.onToggle(event, this.props.todo)
    }

    onChange (event) {
        this.props.onChange(event, this.props.todo)
    }

    render () {
        let checkboxStyle = {
            width: 40
        }
        return (
            <div className="TodoItem">
                <input className="title" onBlur={this.onChange.bind(this)}
                       disabled={this.props.todo.status === 'completed'} defaultValue={this.props.todo.title}/>
                <div className="action">
                    <Checkbox onCheck={this.toggle.bind(this)}
                              checked={this.props.todo.status === 'completed'}
                              style={checkboxStyle}/>
                    <FlatButton disabled={this.props.todo.status === 'completed'} label="Delete" secondary={true}
                                onClick={this.deleted.bind(this)}/>
                </div>
            </div>
        )
    }
}
