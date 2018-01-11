//存储相关
const  LocalStorage = {
    save: function(key, value){
       return  localStorage.setItem(key, value)    
    },
    get: function(key){
        return localStorage.getItem(key)
    },
    remove: function(key){
        return localStorage.removeItem(key)
    }
}
export { LocalStorage };
