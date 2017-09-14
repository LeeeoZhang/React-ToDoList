import AV from 'leancloud-storage'

let APP_ID = 'RG0ah6zCVcQbBlrcyjNoPrMB-gzGzoHsz'
let APP_KEY = 'Nm43xROY0jez4UYcboQa2LgU'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
export default AV


export const TodoModel = {
    getByUser (user, successFn, errorFn) {
        let query = new AV.Query('Todo')
        query.equalTo('deleted', false)
        query.find().then((response) => {
            let array = response.map((t) => {
                return {id: t.id, ...t.attributes}
            })
            successFn.call(null, array)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    },
    create ({status, title, deleted}, successFn, errorFn) {
        let Todo = AV.Object.extend('Todo')
        let todo = new Todo()
        todo.set('title', title)
        todo.set('status', status)
        todo.set('deleted', deleted)

        let acl = new AV.ACL()
        acl.setPublicReadAccess(false)
        acl.setWriteAccess(AV.User.current(), true)
        acl.setReadAccess(AV.User.current(), true)
        todo.setACL(acl)

        todo.save().then(function (response) {
            successFn.call(null, response.id)
        }, function (error) {
            errorFn && errorFn.call(null, error)
        })
    },
    destroy (todoId, successFn, errorFn) {
        TodoModel.update({id: todoId, deleted: true}, successFn, errorFn)
    },
    update ({id, title, status, deleted}, successFn, errorFn) {
        let todo = AV.Object.createWithoutData('Todo', id)
        title !== undefined && todo.set('title', title)
        status !== undefined && todo.set('status', status)
        deleted !== undefined && todo.set('deleted', deleted)
        todo.save().then(() => {
            successFn && successFn.call(null)
        }, (error) => {
            errorFn && errorFn.call(null, error)
        })
    }
}

export function signUp (username, password, email, successFn, errorFn) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.setEmail(email)
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })
    return undefined
}


export function signOut () {
    AV.User.logOut()
    return undefined
}

export function signIn (username, password, successFn, errorFn) {
    AV.User.logIn(username, password).then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })
}

export function getCurrentUser () {
    let user = AV.User.current()
    if (user) {
        return getUserFromAVUser(user)
    } else {
        return null
    }
}

export function getErrorMessage (code) {
    const map = {
        202: 'The username is occupied',
        217: 'Invalid username',
        210: 'The username and password do not match',
        211: 'The username could not be found',
        unknown: 'The request failed and tried later'
    }
    return map[code] || map.unknown
}

export function sendPasswordResetEmail (email, successFn, errorFn) {
    AV.User.requestPasswordReset(email).then(function (success) {
        successFn.call()
    }, function (error) {
        errorFn.call(null, error)
    })
}

function getUserFromAVUser (AVuser) {
    return {
        id: AVuser.id,
        ...AVuser.attributes
    }
}
