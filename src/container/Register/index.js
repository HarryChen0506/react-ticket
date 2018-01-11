// 登陆页面
import React from 'react'
import { NavBar, List, InputItem, Button, Icon, Radio } from 'antd-mobile'
import './register.scss'
import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js';
@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class Register extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
            user: '',
            pwd: '',
            rpwd: '',
            isService: false
        }  
    }   
    handleChange(key, v){
        this.setState({
            [key]: v
        })
        console.log(this.state)
    } 
    changeService(){
        this.setState({
            isService: !this.state.isService
        })
    }
    render(){ 
         return (
            <div className="register-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>注册</div></NavBar>    
                <div className="register-main">      
                     <div className="hide" onClick={()=>{this.changeService()}}>
                        <span className="text">客服</span> 
                        <div className="icon">                           
                            {this.state.isService?<Icon type="check" color="#108ee9"/>:null}                                                       
                        </div>                                         
                    </div>     
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
                            <div className="input">
                                 <InputItem   
                                    ref={(v)=>{this.pwdInput = v}}                     
                                    type="password"
                                    placeholder="****"
                                    clear
                                    onChange={(v)=>{this.handleChange.bind(this)('rpwd',v)}}
                                >重复密码</InputItem> 
                            </div>           
                     </div>
                     <div className="login-btn-wrapper"> 
                         <div className="login-btn" ng-click="login.login()">注册</div> 
                     </div>
                     <div className="login-tip" onClick={()=>this.props.history.push('/login')}>
                         <span>* 点此可进行登录</span> 
                     </div>
                </div>
            </div>
        )
    }   
}
export default Register;