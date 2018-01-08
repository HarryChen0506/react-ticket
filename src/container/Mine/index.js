// 个人中心页面
import React from 'react'
import { NavBar, Icon, List, Button, WhiteSpace, WingBlank } from 'antd-mobile'
import Profile from './subPages/Profile'
import MyOrder from './subPages/MyOrder'
import OrderCategory from 'component/OrderCategory'
import { MyList, MyItem } from 'component/common/MyList'


import config from 'config'
import './mine.scss'
import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js';
@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class Mine extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
           orderCategoryList: config.orderCategoryList 
        }
    }    
    render(){ 
         return (
            <div className="mine-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => console.log('onLeftClick')}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>个人中心</div></NavBar>    
                <div className="mine-main">
                    <Profile
                        style={{marginTop: '10px'}}
                        content={'13512341234'}
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
                        >退出登录</Button>
                    </WingBlank>
                    


                </div>


            </div>
        )
    }   
}
export default Mine;