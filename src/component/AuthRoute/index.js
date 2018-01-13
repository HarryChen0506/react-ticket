//自动登录获取权限
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import httpService from 'http_service/service.js';
import { loadData } from 'redux_module/redux/user.redux.js';

@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    render(){
        return null
    }
    componentDidMount(){        
        httpService.user.info({}).then((res)=>{
            let data = res.data
            if(data.code===200){               
                this.props.loadData(data.result);
            }
        },(err)=>{
            console.log(err)
        })
    }
}
export default AuthRoute;