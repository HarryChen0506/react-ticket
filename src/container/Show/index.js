// 演出详情 页面
import React from 'react';
// import { NavBar } from 'antd-mobile';
// import { connect } from 'react-redux';
// import { Route, Switch } from 'react-router-dom';
import httpService from 'http_service/service.js'
import ShowCard from './subPages/ShowCard'
import ShowInfo from './subPages/ShowInfo'
import ShowContent from './subPages/ShowContent'
import SectionTitle from './subPages/SectionTitle'

import './show.scss'
class Show extends React.Component{ 
    constructor(...args){
        super(...args)
        this.state = {
            showOID: this.props.match.params.showid,
            show: {}
        }
    }
    componentDidMount(){
        this.getShow();
    }
    getShow(){
        const params = {
            client: 'piaodashi_weixin',
            src: 'm_web'
        }
        const showOID = this.props.match.params.showid || '';
        httpService.main.getShowById(showOID,params).then((res)=>{            
            if(res.data.statusCode===200){
                this.setState({
                    show: res.data.result.data
                })
            }
        },(err)=>{

        })
    }
    render(){
        // const pathname = this.props.location.pathname;
        const show = this.state.show;
        console.log('show',show)
        return(
            <div className="show-page">
            <div className="main">
                <ShowCard />
                <ShowInfo />
                <div style={{padding: '0px 4%', background: '#fff'}}>
                    <ShowContent htmlStr={show.content}>
                        <SectionTitle content={'演出内容'}/>
                    </ShowContent>

                </div>
                
                
            </div>
                <div style={{height: '50px', background: '#ccc'}}></div>
            </div>
        )
    }
}
export default Show;