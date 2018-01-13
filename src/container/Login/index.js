// 登陆页面
import React from 'react'
import { Redirect } from 'react-router-dom';
import { NavBar, InputItem, Icon, Toast, NoticeBar } from 'antd-mobile'
import './login.scss'
import { connect } from 'react-redux'
import { login, errMsgClear } from 'redux_module/redux/user.redux.js';
@connect(
    state=>state,
    { login, errMsgClear }
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
    } 
    login(){
        // console.log('登录',this.state)
        let {user, pwd} = this.state;
        if(user===''){
            Toast.info('用户名不能为空!',1);
            return 
        }else if(pwd===''){
            Toast.info('密码不能为空!',1);
            return 
        }
        this.props.login({user, pwd},()=>{
            //成功的回调
            console.log('成功的回调')
        },()=>{
            //失败的回调
            console.log('失败的回调')
            this.pwdInput.clearInput();
        })
    }
    register(){ 
        this.props.errMsgClear();
        this.props.history.push('/register')
    }
    render(){ 
         const { _id, backPath } = this.props.user; 
         const auth = (_id===''||_id===undefined||_id===null)?false:true;

         return (
            <div className="login-page">
                <div>
                    {auth?<Redirect to={backPath} />:null}
                </div>     
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>登录</div></NavBar>    
                <div className="login-main">                 
                    <div className="logo-bg"> 
                        <div className="logo-container">
                             <img width="100%" alt="logo" src={`${require('./images/login-logo.png')}`} />
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
                                    placeholder="***"
                                    clear
                                    onChange={(v)=>{this.handleChange.bind(this)('pwd',v)}}
                                >密码</InputItem> 
                            </div>           
                     </div>
                     <div style={{paddingLeft: '20px'}}>
                            {this.props.user.msg?<NoticeBar mode="" icon={null}>{this.props.user.msg}</NoticeBar>:null} 
                     </div>
                     <div className="login-btn-wrapper"> 
                         <div className="login-btn" onClick={this.login.bind(this)}>登录</div> 
                     </div>
                     <div className="login-tip" onClick={this.register.bind(this)}>
                         <span>* 如果没有账号， 请点此进行注册</span> 
                     </div>
                          
                </div>
            </div>
        )
    }   
}
export default Login;