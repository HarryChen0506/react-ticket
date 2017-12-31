// 路由
import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
// import Demo from 'container/Demo.js'
import Dashboard from 'container/Dashboard';

function Login(){
    return <div>登录组件</div>
}
// function Dashboard(){
//     return <div>面板组件</div>
// }
class AppRoute extends React.Component{     
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