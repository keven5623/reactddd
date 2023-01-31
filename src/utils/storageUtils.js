import store from 'store'
const USER_KEY = 'user_key'
const WATCH_BOOL = 'watch_bool'
let ifWatch = []


// eslint-disable-next-line import/no-anonymous-default-export
export default{
    //保存user
    saveUser(user){
        //localStorage.setItem(USER_KEY,JSON.stringify(user))
        store.set(USER_KEY,user)
    },

    getUser(){
        //return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        return store.get(USER_KEY) || {}
    },

    removeUser(){
        //localStorage.removeItem(USER_KEY);
        store.remove(USER_KEY)
    },

    //保存是否觀看過
    saveWatch(_id){
        ifWatch.push(_id)
        store.set(WATCH_BOOL,ifWatch)
    },

    getWatch(){
        return store.get(WATCH_BOOL) || []
    },

    removeWatch(){
        store.remove(WATCH_BOOL)
    },
    

    
}