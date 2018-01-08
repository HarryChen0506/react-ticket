// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from 'container/Dashboard';
import Show from 'container/Show';

import { connect } from 'react-redux';
import { loadBannerShow, loadHotShow, loadRecommendShow, categoryShow, loadListShow } from 'redux_module/redux/show.redux.js';
import config from 'config';
function Login(){
    return <div>登录组件</div>
}

// function Dashboard(){
//     return <div>面板组件</div>
// }
@connect(
    state=>state,
    { loadBannerShow, loadHotShow, loadRecommendShow, categoryShow, loadListShow }
)
class AppRoute extends React.Component{  
    componentDidMount(){        
        this.props.loadBannerShow();        
        this.props.loadHotShow();        
        this.props.loadRecommendShow();        
        this.props.categoryShow(config.categoryList[0]);    
        this.props.loadListShow({
            src: 'm_web',
            siteCityOID: '1001',
            offset: 0,
            length: 10,
            sorting: 'weight',
            seq:'desc',
            client:'piaodashi_weixin'
        },null,null);           
    }   
    render(){
        return(
            <BrowserRouter>
                <div className="router">   
                    <Switch>   
                        <Route path="/login" component={Login} />
                        <Route path="/show/:showid" component={Show} />
                        <Route component={Dashboard} />
                    </Switch> 
                </div>  
            </BrowserRouter>
        )
    }
}

export default AppRoute;