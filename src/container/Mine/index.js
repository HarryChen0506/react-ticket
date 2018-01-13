// 个人中心页面
import React from 'react'
import { NavBar, Icon, Button,  WingBlank, Modal  } from 'antd-mobile'
import Profile from './subPages/Profile'
import MyOrder from './subPages/MyOrder'
import OrderCategory from 'component/OrderCategory'
import { MyList, MyItem } from 'component/common/MyList'
import AuthRedirect from 'component/AuthRedirect'
import httpService from 'http_service/service.js';


import config from 'config'
import './mine.scss'
import { connect } from 'react-redux'
import { logout } from 'redux_module/redux/user.redux.js';
@connect(
    state=>state,
    { logout }
)
class Mine extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
           orderCategoryList: config.orderCategoryList 
        }
    }  
    logout(){
        const alert = Modal.alert;
        alert('注销', '您确定退出登录吗?', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                // BrowserCookie.erase('userId');
               this.clearCookie.bind(this)();
            } },
        ])
    }
    clearCookie(){
        httpService.user.logout().then((res)=>{
            if(res.data.code===200){
                this.props.logout();
                this.props.history.push('/')
            }            
        },(err)=>{
            console.log(err)
        })
    }  
    render(){          
         const { user, _id } = this.props.user; 
         const auth = (_id===''||_id===undefined||_id===null)?false:true;
         console.log('auth',auth)
         return (
            <div className="mine-page">
                <AuthRedirect auth={auth} backPath={'/mine'} loginPath={'/login'}/>    
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>个人中心</div></NavBar>    
                <div className="mine-main">
                    <Profile
                        style={{marginTop: '10px'}}
                        content={user}
                        thumb={''}
                        onClick={()=>{console.log(123)}}
                    />
                    <MyOrder
                        style={{marginTop: '10px'}}
                        content={"我的订单"}
                        extra={'查看所有订单'}
                        onClick={()=>{console.log('查看所有订单')}}
                        onPress={(_el)=>{console.log(_el)}}
                    >
                        <OrderCategory                         
                            categoryList = {this.state.orderCategoryList}
                            onPress={(_el)=>{console.log(_el)}}
                        />  
                    </MyOrder>
                    <MyList style={{marginTop: '10px'}}>
                        <MyItem
                            thumb={config.mineCategory.address.icon}
                            arrow="horizontal"
                            multipleLine
                            platform="android"
                            onClick={() => {}}
                        >
                            <div className="content">{config.mineCategory.address.text}</div>
                        </MyItem>
                        <MyItem
                            thumb={config.mineCategory.coupon.icon}
                            arrow="horizontal"
                            multipleLine
                            platform="android"
                            onClick={() => {}}
                        >
                            <div className="content">{config.mineCategory.coupon.text}</div>
                        </MyItem>
                    </MyList>
                    <MyList style={{marginTop: '10px'}}>
                        <MyItem
                            thumb={config.mineCategory.online.icon}
                            arrow="horizontal"
                            multipleLine
                            platform="android"
                            onClick={() => {}}
                        >
                            <div className="content">{config.mineCategory.online.text}</div>
                        </MyItem>
                        <MyItem
                            thumb={config.mineCategory.contact.icon}
                            extra={<span style={{color: '#108ee9'}}>400-636-2266</span>}
                            arrow="horizontal"
                            multipleLine
                            platform="android"
                            onClick={() => {}}
                        >
                            <div className="content">{config.mineCategory.contact.text}</div>
                        </MyItem>
                    </MyList>                   
                    <WingBlank>
                        <Button  
                            style={{ 
                                margin: '2rem 0',
                                height: '3.5rem',
                                lineHeight: '3.5rem',
                                color: '#fff',
                                fontSize: '1.3rem',
                                backgroundImage: 'linear-gradient(to bottom,#ef6856,#ff5a57)'
                            }}
                            onClick={this.logout.bind(this)}
                        >退出登录</Button>
                    </WingBlank>
                    


                </div>


            </div>
        )
    }   
}
export default Mine;