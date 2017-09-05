import AV from 'leancloud-storage'

let APP_ID = 'RG0ah6zCVcQbBlrcyjNoPrMB-gzGzoHsz'
let APP_KEY = 'Nm43xROY0jez4UYcboQa2LgU'
AV.init({
    appId: APP_ID,
    appKey: APP_KEY
})
export default AV


export function signUp (username, password, successFn, errorFn) {
    let user = new AV.User()
    user.setUsername(username)
    user.setPassword(password)
    user.signUp().then(function (loginedUser) {
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function (error) {
        errorFn.call(null, error)
    })
    return undefined
}


export function signOut(){
    AV.User.logOut()
    return undefined
}

export function signIn(username, password, successFn, errorFn){
    AV.User.logIn(username, password).then(function(loginedUser){
        let user = getUserFromAVUser(loginedUser)
        successFn.call(null, user)
    }, function(error){
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

function getUserFromAVUser (AVuser) {
    return {
        id: AVuser.id,
        ...AVuser.attributes
    }
}