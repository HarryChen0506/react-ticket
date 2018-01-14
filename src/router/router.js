// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { LocalStorage } from 'utils'
import AuthRoute from 'component/AuthRoute'
import Dashboard from 'container/Dashboard';
import Show from 'container/Show';
import City from 'container/City';
import Login from 'container/Login';
import Register from 'container/Register';
import Chat from 'container/Chat'


import { connect } from 'react-redux';
import { loadBannerShow, loadHotShow, loadRecommendShow, categoryShow, loadListShow, cityShow } from 'redux_module/redux/show.redux.js';
import { recvMsg } from 'redux_module/redux/chat.redux.js';
import config from 'config';

// function Login(){
//     return <div>登录组件</div>
// }
// function Dashboard(){
//     return <div>面板组件</div>
// }
@connect(
    state=>state,
    { loadBannerShow, loadHotShow, loadRecommendShow, categoryShow, loadListShow, cityShow, recvMsg }
)
class AppRoute extends React.Component{  
    componentDidMount(){ 
       this.initPage();         
       this.recvMsg();         
    }   
    initPage(){
        let city = {};
        if(LocalStorage.get('city')){
            city = JSON.parse(LocalStorage.get('city'));
            this.props.cityShow(city); 
        }else{
            city = this.props.show.city;
        }
        //banner
        this.props.loadBannerShow({
            siteCityOID: city.cityOID,
        });     
        //热门演出   
        this.props.loadHotShow({
            siteCityOID: city.cityOID,
        });   
        //推荐演出     
        this.props.loadRecommendShow({
            siteCityOID: city.cityOID,
        });        
        this.props.categoryShow(config.categoryList[0]); 
        this.props.loadListShow({
            src: 'm_web',
            siteCityOID: city.cityOID,
            offset: 0,
            length: 10,
            sorting: 'weight',
            seq:'desc',
            client:'piaodashi_weixin'
        },null,null);   
    }
    recvMsg(){
        if(!this.props.chat.chatMsg.length){
            this.props.recvMsg();
        }
    }
    render(){
        return(
            <BrowserRouter>
                <div className="router">   
                    <AuthRoute />   
                    <Switch>   
                        <Route path="/login" component={Login} />
                        <Route path="/Register" component={Register} />
                        <Route path="/show/:showid" component={Show} />
                        <Route path="/city" component={City} />
                        <Route path="/chat/:userId" component={Chat}/>
                        <Route component={Dashboard} />
                    </Switch> 
                </div>  
            </BrowserRouter>
        )
    }
}

export default AppRoute;