//聊天页面
import React from 'react';
// import io from 'socket.io-client';
import { List, NavBar, Icon, Toast,TextareaItem } from 'antd-mobile';
import AuthRedirect from 'component/AuthRedirect'
import Emoji from 'component/Emoji';
import { tool } from 'utils/tool.js';
import './chat.scss';
import { getMsgList, sendMsg, recvMsg, readMsg } from 'redux_module/redux/chat.redux.js';
import { connect } from 'react-redux'

const Item = List.Item;
@connect(
    state=>state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    constructor(...args){
        super(...args);
        this.state={
            text: '',
            showEmoji: false
        }
        this.chatMsgLength = 0; //记录当前的聊天条数
    }
    componentDidMount(){
        if (!this.props.chat.chatMsg.length) {
			this.props.getMsgList();
		}
        // this.scrollChatBox();
    } 
    componentDidUpdate(){
       const chatMsgLength = this.getChatMsgLength();
        if(chatMsgLength!==this.chatMsgLength){   
            //如果当前聊天的信息增加，就触发scroll        
            this.chatMsgLength = chatMsgLength;
            this.scrollChatBox();
        }
    } 
    calAvatar( id, users){
        //计算头像
        const avatar_customer = require(`./images/customer.png`) 
        const avatar_service = require(`./images/service.png`) 
        if(users&& users[id] && users[id].type==='customer'){
            return avatar_customer
        }else {
            return avatar_service
        }
    }
    showMsg(somebodyId, myId, v, users){        
        if(v.from===somebodyId && v.to===myId){
            return (<List key={v._id} className="chat-somebody">
                        <Item
                            wrap
                            thumb={this.calAvatar(somebodyId, users)}
                        >
                        {v.content.split('\n').map((v,index)=>(
                            <div key={index}>{v}</div>     
                        ))}
                        </Item>    
                    </List>)
        }else if(v.from===myId && v.to===somebodyId){
            return (<List key={v._id} className="chat-me">
                        <Item
                            wrap
                            extra={<img src={this.calAvatar(myId, users)} alt=""/>}
                        >
                        {v.content.split('\n').map((v,index)=>(
                            <div key={index}>{v}</div>     
                        ))}
                        </Item>    
                    </List>)
        }else{
            return null
        }         
    }
    handleShowEmoji(){
        this.setState({
            showEmoji: !this.state.showEmoji
        })
    } 
    handleSendMsg(){
        const from = this.props.user._id;
        const to = this.props.match.params.userId;
        const msg = this.state.text;
        if(msg===''){
             Toast.info('发送内容不能为空!',1);
            return 
        }
        console.log({from, to, msg})
        this.props.sendMsg({from, to, msg})
        this.setState({
            text: '',
            showEmoji: false
        })        
    } 
    getChatMsgLength(){
        const userId = this.props.match.params.userId;
        const myId = this.props.user._id; 
        const msg = this.props.chat.chatMsg.filter(v=>v.chatId===tool.getChatId(myId,userId));
        return msg.length
    }
    scrollChatBox(){
        var dom = document.getElementById('chat-main');        
        if(dom){
            // console.log('dom',dom.scrollHeight);
            dom.scrollTop = dom.scrollHeight;
        }
    }
    render(){                
        const userId = this.props.match.params.userId;
        const users = this.props.chat.users;
        const myId = this.props.user._id; 
        const msg = this.props.chat.chatMsg.filter(v=>v.chatId===tool.getChatId(myId,userId));      
        // console.log(userId, users, myId, msg)
        const { user, _id, type  } = this.props.user; 
        const auth = (_id===''||_id===undefined||_id===null)?false:true;
        //判断是否登录
        if((!users||!users[userId])&&auth){
            return null
        }        
        return (  
            <div className="chat-page">    
                <AuthRedirect auth={auth} backPath={'/role'} loginPath={'/login'}/>           
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>{users[userId]&&users[userId].name}</div></NavBar>    
                <div className="chat-main" id="chat-main">
                    {msg.map((v,index)=>(
                       this.showMsg(userId,myId,v, users)
                    ))}
                </div>                
                <List>
                    <div className="send-box">
                        <div className="textarea-input">
                            <TextareaItem 
                                placeholder="请输入..."
                                data-seed="logId"
                                ref={el => this.autoFocusInst = el}
                                value={this.state.text}
                                onChange={(v)=>{
                                    this.setState({
                                        text: v
                                    })
                                }}
                                autoHeight
                            />
                        </div>
                        <div className="send-msg">
                            <span className="emoji" onClick={this.handleShowEmoji.bind(this)}>😃</span>
                            <span onClick={this.handleSendMsg.bind(this)}>发送</span>
                        </div>
                    </div>
                    {this.state.showEmoji?<Emoji onHandleClick={v=>{
                        this.setState({
                            text: this.state.text + v.text
                        })
                    }}/>:null} 
                    
                </List>
            </div>
        )
    }     
}

export default Chat;