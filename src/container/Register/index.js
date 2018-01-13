// 登陆页面
import React from 'react'
import { Redirect } from 'react-router-dom';
import { NavBar,  InputItem,  Icon,  Toast } from 'antd-mobile'
import './register.scss'
import { connect } from 'react-redux'
import { register } from 'redux_module/redux/user.redux.js';
@connect(
    state=>state,
    { register}
)
class Register extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'customer',
            isService: false
        }  
    }   
    handleChange(key, v){
        this.setState({
            [key]: v
        })
    } 
    changeService(){
        this.setState({
            isService: !this.state.isService
        },()=>{           
            this.setState({
                type: this.state.isService===true?'service':'customer'
            })
        })
    }
    register(){ 
        if(this.state.user===''){
            Toast.info('用户名不能为空!',1);
            return 
        }else if(this.state.pwd===''){
            Toast.info('密码不能为空!',1);
            return 
        }else if(this.state.repeatPwd!==this.state.pwd){
            Toast.info('重复密码不正确!',1);
            return 
        }
        // console.log('注册',this.state)
        let {user, pwd, type} = this.state;
        this.props.register({user, pwd, type});
    }
    render(){ 
         const { _id, backPath } = this.props.user; 
         const auth = (_id===''||_id===undefined||_id===null)?false:true;
         return (
            <div className="register-page">
                <div>
                    {auth?<Redirect to={backPath} />:null}
                </div>  
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>注册</div></NavBar>    
                <div className="register-main">      
                     <div className="hide" onClick={()=>{this.changeService()}}>
                        <div>
                            <span className="text">客服</span> 
                        </div>    
                        
                        <div className="icon">                           
                            {this.state.isService?<Icon type="check" color="#108ee9"/>:null}                                                       
                        </div>                                         
                    </div>     
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
                            <div className="input">
                                 <InputItem   
                                    ref={(v)=>{this.pwdInput = v}}                     
                                    type="password"
                                    placeholder="***"
                                    clear
                                    onChange={(v)=>{this.handleChange.bind(this)('repeatPwd',v)}}
                                >重复密码</InputItem> 
                            </div>           
                     </div>
                     <div className="login-btn-wrapper"> 
                         <div className="login-btn" onClick={()=>this.register()}>注册</div> 
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