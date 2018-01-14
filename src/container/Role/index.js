//角色列表 沟通对象（客户或者客服）
import React from 'react'
import { NavBar, Icon, Button,  WingBlank, Modal  } from 'antd-mobile'
import AuthRedirect from 'component/AuthRedirect'
import httpService from 'http_service/service.js'
import UserCard from './subPages/UserCard'

import './role.scss'
import { connect } from 'react-redux'
import { getUserList } from 'redux_module/redux/chatuser.redux.js';
@connect(
    state=>state,
    { getUserList }
)
class Role extends React.Component{
    constructor(...args){
        super(...args); 
    }
    componentDidMount(){
        const { type  } = this.props.user;
        if(type){
            const roleName = type==='customer'?'service':'customer';
            this.props.getUserList&&this.props.getUserList(roleName);
        }
    }
    render(){          
         const { user, _id, type  } = this.props.user; 
         const auth = (_id===''||_id===undefined||_id===null)?false:true;
         const roleName = type==='customer'?'客服':'用户';   
         const userList = this.props.chatuser.userList;      
         return (
            <div className="role-page">
                <AuthRedirect auth={auth} backPath={'/role'} loginPath={'/login'}/>    
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>{roleName}</div></NavBar>    
                <div className="role-main">
                     <UserCard dataList={userList}></UserCard>
                </div>
            </div>
        )
    }   
}
export default Role;