//根据授权情况进行判断是否跳转登录页面 并记录登录后的跳转链接
import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadBackPath } from 'redux_module/redux/user.redux.js';

@withRouter
@connect(
    null,
    { loadBackPath }
)
class AuthRedirect extends React.Component{   
    constructor(...args){
        super(...args);
        this.state = {
            toRedirect: false
        }  
    }    
    componentWillMount(){
        const { auth=false, backPath='/' } = this.props;
        if(!auth){
            this.props.loadBackPath(backPath)
            this.setState({
                toRedirect: true
            })
        }
    } 
    render(){
        const { loginPath='/login' } = this.props;
        return (
            <div>
                {this.state.toRedirect?<Redirect to={loginPath} />:null}
            </div>
        )
    }
}
export default AuthRedirect;