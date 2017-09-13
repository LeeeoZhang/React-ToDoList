import React, {Component} from 'react'
import './App.css'
import './reset.css'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import UserDialog from './UserDialog'
import {getCurrentUser, signOut, TodoModel} from './leanCloud'
import {getStateCopy} from './utils'
import FlatButton from 'material-ui/FlatButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'


export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            user: getCurrentUser() || {},
            todoList: []
        }
        let user = getCurrentUser()
        if (user) {
            TodoModel.getByUser(user, (todo) => {
                let stateCopy = getStateCopy(this.state)
                stateCopy.todoList = todo
                this.setState(stateCopy)
            })
        }
    }

    addTodo () {
        let newTodo = {
            title: '',
            status: '',
            deleted: false,
        }
        TodoModel.create(newTodo, (id) => {
            newTodo.id = id
            this.state.todoList.push(newTodo)
            this.setState({
                todoList: this.state.todoList
            })
        }, (error) => {
            console.log(error)
        })
    }

    changeTitle (event, todo) {
        let oldTitle = todo.title
        todo.title = event.target.value
        TodoModel.update(todo, () => {
            this.setState(this.state)
        }, (error) => {
            todo.title = oldTitle
            this.setState(this.state)
        })
    }

    toggle (event, todo) {
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        TodoModel.update(todo, () => {
            this.setState(this.state)
        }, (error) => {
            todo.status = oldStatus
            this.setState(this.state)
        })
    }

    deleted (event, todo) {
        TodoModel.destroy(todo.id, () => {
            todo.deleted = true
            this.setState(this.state)
        })
    }

    onSignUpOrSignIn (user) {
        let stateCopy = getStateCopy(this.state)
        stateCopy.user = user
        TodoModel.getByUser(user, (todo) => {
            let stateCopy = getStateCopy(this.state)
            stateCopy.todoList = todo
            this.setState(stateCopy)
        })
        this.setState(stateCopy)
    }

    signOut () {
        signOut()
        let stateCopy = getStateCopy(this.state)
        stateCopy.user = {}
        stateCopy.todoList = []
        this.setState(stateCopy)
    }

    render () {
        let todos = this.state.todoList.filter((item) => !item.deleted).map((item, index) => {
            return (
                <li key={index}>
                    <TodoItem todo={item} onToggle={this.toggle.bind(this)} onDelete={this.deleted.bind(this)}
                              onChange={this.changeTitle.bind(this)}/>
                </li>
            )
        })
        let addButtonStyle = {
            position: 'absolute',
            right: '1em',
            bottom: '-1.5em',
        }
        let labelStyle = {
            paddingLeft: '0px'
        }
        return (
            <MuiThemeProvider>
                <div className="App">
                    <header>
                        <h1>{(this.state.user.username || 'Who') + "'s "}Task</h1>
                        {this.state.user.id ?
                            <FlatButton labelStyle={labelStyle} hoverColor="#366cd3" label="Logout" primary={true}
                                        onClick={this.signOut.bind(this)}/> : null}
                        <FloatingActionButton onClick={this.addTodo.bind(this)} secondary={true} style={addButtonStyle}>
                            <ContentAdd/>
                        </FloatingActionButton>
                    </header>
                    {/*<div className="inputWraper">*/}
                    {/*<TodoInput content={this.state.newTodo} onSubmit={this.addTodo.bind(this)}*/}
                    {/*onChange={this.changeTitle.bind(this)}/>*/}
                    {/*</div>*/}
                    <ol className="todoList">
                        {todos}
                    </ol>
                    {this.state.user.id ? null :
                        <UserDialog onSigUp={this.onSignUpOrSignIn.bind(this)}
                                    onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
                </div>
            </MuiThemeProvider>
        )
    }
}


