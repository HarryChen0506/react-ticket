// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from 'container/Dashboard';

import { connect } from 'react-redux';
import { loadBannerShow } from 'redux_module/redux/show.redux.js';
function Login(){
    return <div>登录组件</div>
}
// function Dashboard(){
//     return <div>面板组件</div>
// }
@connect(
    state=>state,
    { loadBannerShow }
)
class AppRoute extends React.Component{  
    componentDidMount(){        
        this.props.loadBannerShow();        
    }   
    render(){
        return(
            <BrowserRouter>
                <div className="router">   
                    <Switch>   
                        <Route path="/login" component={Login} />
                        <Route component={Dashboard} />
                    </Switch> 
                </div>  
            </BrowserRouter>
        )
    }
}

export default AppRoute;