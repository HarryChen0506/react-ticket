//底部tab栏
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import './navLinkBar.scss';


import { connect } from 'react-redux'
import { loadListShow } from 'redux_module/redux/show.redux.js';

@withRouter
@connect(
    state=>state,
    { loadListShow }
)
class NavLinkBar extends React.Component{   
    render(){
        const Item = TabBar.Item;
        const navList = this.props.dataList;
        const pathname = this.props.location.pathname;
        return(            
            <TabBar                
                unselectedTintColor="#AAA"
                tintColor="#FD6857"
                barTintColor="white"
                hidden={false}
            >                
            {navList.map((v)=>(
                <Item                    
                    title={v.text}
                    key={v.text}
                    icon={{ uri: require(`./images/${v.icon}.png`) }}
                    selectedIcon={{ uri: require(`./images/${v.icon}-active.png`) }}                    
                    selected={pathname===v.path}
                    onPress={()=>{
                        this.props.history.push(v.path)
                        if(v.path==='/list'){
                             
                        }                       
                    }}
                    data-seed="logId"
                >
                </Item> 
            ))}
            </TabBar>           
        )
    }
}
NavLinkBar.propTypes = {
    dataList: PropTypes.array
}
export default NavLinkBar;