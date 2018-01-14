// 合并所有reducer 并且返回
import { combineReducers } from 'redux'
import { user } from './redux/user.redux.js'
import { show } from './redux/show.redux.js'
import { chatuser } from './redux/chatuser.redux.js'
import { chat } from './redux/chat.redux.js'

export default combineReducers({
    show,
    user,
    chatuser,
    chat
})