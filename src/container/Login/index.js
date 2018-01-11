// 登陆页面
import React from 'react'
import { NavBar, List, InputItem, Button, Icon } from 'antd-mobile'
import './login.scss'
import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js';
@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class Login extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
            user: '',
            pwd: '',
        }  
    }   
    handleChange(key, v){
        this.setState({
            [key]: v
        })
        console.log(this.state)
    } 
    render(){ 
         return (
            <div className="login-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>登录</div></NavBar>    
                <div className="login-main">                 
                    <div className="logo-bg"> 
                        <div className="logo-container">
                             <img width="100%" src={`${require('./images/login-logo.png')}`} />
                        </div>
                       
                     </div>
                     <div className="login-input">                        
                            <div className="input">
                                <InputItem                        
                                    type="text"
                                    placeholder="请输入用户名"
                                    clear
                                    value={this.state.user}
                                    onChange={(v)=>{this.handleChange.bind(this)('user',v)}}
                                >用户名</InputItem>
                            </div>
                            <div className="input">
                                 <InputItem   
                                    ref={(v)=>{this.pwdInput = v}}                     
                                    type="password"
                                    placeholder="****"
                                    clear
                                    onChange={(v)=>{this.handleChange.bind(this)('pwd',v)}}
                                >密码</InputItem> 
                            </div>           
                     </div>
                     <div className="login-btn-wrapper"> 
                         <div className="login-btn" ng-click="login.login()">登录</div> 
                     </div>
                     <div className="login-tip" onClick={()=>this.props.history.push('/register')}>
                         <span>* 如果没有账号， 请点此进行注册</span> 
                     </div>
                </div>
            </div>
        )
    }   
}
export default Login;