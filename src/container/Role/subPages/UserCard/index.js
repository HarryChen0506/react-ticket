//用户列表 卡片
import React from 'react';
import { WingBlank, Card, WhiteSpace, List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

@withRouter
class UserCard extends React.Component{
    render(){
        const Header = Card.Header;
        const Body = Card.Body;
        const Item = List.Item;
        const userList = this.props.dataList;
        const thumb_customer = require('./images/customer.png');
        const thumb_service = require('./images/service.png');
        return(
            <WingBlank>
                {userList.map(v=>(
                    <div key={v._id}>
                         <List className="profile-list" >                        
                            <Item
                                arrow="horizontal"
                                thumb={v.type==='customer'?thumb_customer:thumb_service}
                                multipleLine
                                platform="android"
                                onClick={() => {
                                    this.props.history.push(`/chat/${v._id}`)
                                }}
                            >
                                <div className="profile-content">{v.user}</div>
                            </Item>
                        </List>
                        <WhiteSpace /> 
                    </div>
                ))}
            </WingBlank>
        )
    }
}
UserCard.propTypes = {
    dataList: PropTypes.array    
}
export default UserCard;
