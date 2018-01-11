// 个人信息组件
import React from 'react'
import {  List } from 'antd-mobile'
import './profile.scss'
class Profile extends React.Component{
    render(){  
        const Item = List.Item;
        const thumb = this.props.thumb||require('./images/profile.png');
         return (
             <div
                style={this.props.style}
             >  
                <List className="profile-list" >                        
                    <Item
                        arrow="horizontal"
                        thumb={thumb}
                        multipleLine
                        platform="android"
                        onClick={() => {
                            typeof this.props.onClick==='function'&&this.props.onClick()
                        }}
                    >
                        <div className="profile-content">{this.props.content}</div>
                    </Item>
                </List>
            </div>
        )
    }   
}
export default Profile;