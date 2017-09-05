import React, {Component} from 'react'
import './App.css'
import 'normalize.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

let id = 0

function idMaker () {
    id += 1
    return id
}

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            newTodo: '',
            todoList: [
                {id: 1, title: '第一个待办'}
            ]
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

    changeTile (event) {
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
                <h1>我的待办</h1>
                <div className="inputWraper">
                    <TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)}
                               onChange={this.changeTile.bind(this)}/>
                </div>
                <ol className="todoList">
                    {todos}
                </ol>
            </div>
        )
    }
}

export default App
