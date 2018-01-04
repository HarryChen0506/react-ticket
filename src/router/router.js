// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from 'container/Dashboard';

import { connect } from 'react-redux';
import { loadBannerShow, loadHotShow, loadRecommendShow, categoryShow } from 'redux_module/redux/show.redux.js';
import config from 'config';
function Login(){
    return <div>登录组件</div>
}
// function Dashboard(){
//     return <div>面板组件</div>
// }
@connect(
    state=>state,
    { loadBannerShow, loadHotShow, loadRecommendShow, categoryShow }
)
class AppRoute extends React.Component{  
    componentDidMount(){        
        this.props.loadBannerShow();        
        this.props.loadHotShow();        
        this.props.loadRecommendShow();        
        this.props.categoryShow(config.categoryList[0]);        
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