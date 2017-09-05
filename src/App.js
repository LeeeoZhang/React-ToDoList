import React, {Component} from 'react'
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'


let id = 0

function idMaker () {
    id += 1
    return id
}

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user: {},
            newTodo: '',
            todoList: []
        }
    }

    addTodo (event) {
        this.state.todoList.push({
            id: idMaker(),
            title: event.target.value,
            status: null,
            deleted: false
        })
        this.setState({
            newTodo: '',
            todoList: this.state.todoList
        })
    }

    changeTitle (event) {
        this.setState({
            newTodo: event.target.value,
            todoList: this.state.todoList
        })
    }

    toggle (event, todo) {
        todo.status = todo.status === 'completed' ? '' : 'completed'
        this.setState(this.state)
    }

    deleted (event, todo) {
        todo.deleted = true
        this.setState(this.state)
    }

    onSigUp(user){
        this.state.user = user
        this.setState(this.state)
    }

    render () {
        let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
            return (
                <li key={index}>
                    <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.deleted.bind(this)}/>
                </li>
            )
        })
        console.log(todos)
        return (
            <div className="App">
                <h1>{this.state.user.username || '我'}的待办</h1>
                <div className="inputWraper">
                    <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)}
                               onChange={this.changeTitle.bind(this)}/>
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
                <UserDialog onSigUp={this.onSigUp.bind(this)}/>
            </div>
        )
    }
}

export default App
