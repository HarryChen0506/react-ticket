//面板页面
import React from 'react';
import { NavBar } from 'antd-mobile';
// import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import NavLinkBar from 'component/NavLinkBar';
import './dashboard.scss'
import Main from 'container/Main'
function List(){
    return <div>演出列表页</div>
}
// function Main(){
//     return <div>精选页面</div>
// }
function Mine(){
    return <div>用户页面</div>
}
class Dashboard extends React.Component{ 
    render(){
        const pathname = this.props.location.pathname;
        const navList = [{
            path: '/',
            text: '精选',
            icon: 'main',
            title: '精选',
            component: Main
        },{
            path: '/list',
            text: '演出列表',
            icon: 'list',
            title: '演出列表',
            component: List
        },{
            path: '/mine',
            text: '我的',
            icon: 'mine',
            title: '个人中心',
            component: Mine
        }];        
        const title = navList.filter((v)=>v.path===pathname)[0] && navList.filter((v)=>v.path===pathname)[0].title;
        const filterList = navList;
        // console.log('测试dash',pathname)
        return(
            <div className="dashboard">
                <div className="main">
                    <Switch>
                        {filterList.map(v=>{
                            if(v.path==='/'){
                                return <Route exact key={v.text} path={v.path} component={v.component}></Route> 
                            }else{
                                 return <Route key={v.text} path={v.path} component={v.component}></Route> 
                            }                            
                        })}
                    </Switch>
                </div>
                <NavLinkBar  dataList={filterList}></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard;