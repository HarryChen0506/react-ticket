// 演出详情 页面
import React from 'react';
import { Icon, Toast, Modal } from 'antd-mobile';
// import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import httpService from 'http_service/service.js'
import ShowCard from './subPages/ShowCard'
import ShowInfo from './subPages/ShowInfo'
import ShowContent from './subPages/ShowContent'
import SectionTitle from './subPages/SectionTitle'
import SectionLogo from 'component/SectionLogo'
import RowShowList from 'component/RowShowList'
import VaryHeader from 'component/VaryHeader'



import './show.scss'
@withRouter
class Show extends React.Component{ 
    constructor(...args){
        super(...args)
        this.state = {
            scrollTop: 0,
            showOID: this.props.match.params.showid,
            show: {},
            relateShowList: []
        }
        this.timerId = null
    }
    componentDidMount(){
        const showOID = this.props.match.params.showid||'';
        this.getShow(showOID);
        this.getRelateShowList(showOID);
        this.calScrollTop();
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    componentWillReceiveProps(nextProps){
        const lastShowid = this.props.match.params.showid;
        const nextShowid = nextProps.match.params.showid;
        if(lastShowid!==nextShowid){
            this.getShow(nextShowid);
            this.getRelateShowList(nextShowid);
            this.scrollToTop(this.show_container)
        }
    }
    calScrollTop(){
        this.timerId = setInterval(()=>{
            const scrollTop = this.show_container.scrollTop||0;
            this.setState({
                scrollTop: scrollTop
            })
        },50)
    }
    getShow(showOID){
        const params = {
            client: 'piaodashi_weixin',
            src: 'm_web'
        }   
        Toast.loading('正在加载...', 0, () => {});     
        httpService.main.getShowById(showOID,params).then((res)=>{            
            if(res.data.statusCode===200){
                this.setState({
                    show: res.data.result.data
                })
                Toast.hide();
            }else{
                Toast.fail(res.data.comments||'加载失败!!!', 1);
            }
        },(err)=>{
            Toast.fail('服务器出错,请稍后再试!!!', 1);
        })
    }
    getRelateShowList(showOID){
        const params = {
            client: 'piaodashi_weixin',
            src: 'm_web',
            offset: 0,
            length: 5
        }       
        httpService.main.getRelateShowList(showOID,params).then((res)=>{            
            if(res.data.statusCode===200){
                this.setState({
                    relateShowList: res.data.result.data
                })
            }
        },(err)=>{

        })
    }
    convertShowModel(show){        
        return {
            showName: show.showName,
            firstShowTime_weekday: show.firstShowTime_weekday,
            latestShowTime_weekday: show.latestShowTime_weekday,
            showOID: show.showOID,
            discount: ((show.discount||0)*10).toFixed(1),
            imgUrl: show.posterURL,
            text: '折起',           
            minPrice: show.minPrice,
            advertise: show.advertise,
            venueName: show.venueName,
            venueAddress: show.venueAddress,
            showStatus: show.showStatus,
            supportVr: show.supportVr
        }
    }
    convertShowListModel(list=[]){        
        return list.map((item)=>({
            showName: item.showName,
            showTime: item.firstShowTime,
            showOID: item.showOID,
            discount: (item.discount*10).toFixed(1),
            imgUrl: item.posterURL,
            text: '折起',
            firstShowTime: item.firstShowTime,
            lastShowTime: item.lastShowTime,
            minPrice: item.minPrice,
            advertise: item.advertise,
            venueName: item.venueName,
            showStatus: item.showStatus,
            supportVr: item.supportVr
        }))
    }
    scrollToTop(node){
        if(node && typeof(node.scrollTo)==='function'){
            node.scrollTo(0,0)
        }
    }
    backPage(){       
        this.props.history.goBack()
    }
    render(){
        // const pathname = this.props.location.pathname;
        const show = this.state.show;
        const alert = Modal.alert;
        return(
            <div className="show-page" >
                <div className="main" ref={(_el)=>{this.show_container = _el}}>
                    <VaryHeader
                        style={{position: 'absolute',top:'0',left: '0',zIndex:'3',width:'100%'}}
                        scrollTop={this.state.scrollTop}
                        threshold={150}
                        left={<span className="back" onClick={()=>{this.backPage()}}><Icon type={'left'} /></span>}
                        middle={<div className="show-header">{this.state.show.showName}</div>}
                    />
                    <ShowCard show={this.convertShowModel(this.state.show)} />
                    <ShowInfo show={this.convertShowModel(this.state.show)} />
                    <div style={{padding: '0px 4%', background: '#fff'}}>
                        <ShowContent htmlStr={show.content} key={show.showName}>
                            <SectionTitle content={'演出内容'}/>
                        </ShowContent>
                        <div className="buy-tip">
                            <SectionTitle content={'购票提示'}/>
                            <div className="tips-content"> 
                                <div className="tip-item">1、演出详情仅供参考，具体信息以主办方公布信息及现场为准，请准时到场以免错过演出。</div> 
                                <div className="tip-item">2、鉴于文体演出票品特殊性（具有时效性、唯一性等特征），一旦用户与卖家达成有效订单代表交易协议生效，
                                    用户不能主动要求取消交易（因演出活动被取消或延期除外）。</div>
                                <div className="tip-item">3、鉴于票品的不可复制性与稀缺性，本平台对本演出（活动）限购数量为6张，
                                    平台有权无理由取消任何用户超过限购数量的交易，平台识别同一用户的方式包括但不限于同一注册手机。</div> 
                                <div className="tip-item">4、本平台尽最大努力促使卖家对交易协议的履行，如果卖家付票过程中发生问题，
                                    本平台可寻求其它卖家提供更高票面或相同票面更好位置票品代替，
                                    否则，平台将全额退款并按订单上约定的赔付方式与金额向用户进行赔付，详细规则请见《常见问题-无票赔付》。</div>
                            </div>
                        </div>
                        <div className="relate-show">                      
                            <SectionTitle content="相关演出" />  
                            <RowShowList 
                                showList={this.convertShowListModel(this.state.relateShowList)}
                                onClick={(_el)=>{
                                    const showOID = _el.showOID;
                                    this.props.history.push('/show/'+showOID);
                                }}
                            /> 
                            <SectionLogo title="摩天轮票务"/>     
                        </div>
                    </div>
                </div>
                <div className="show-nav">
                    <div className="nav-icon">
                        <div>
                            <img src={require('./images/customer-service.png')} alt="客服" />
                            <div className="text">客服</div>
                        </div>
                    </div>
                    <div className="nav-button"
                        onClick={()=>{
                            alert('友情提示', '确定购买吗?', [
                                { text: '取消', onPress: () => console.log('取消') },
                                {
                                    text: '确定',
                                    onPress: () => new Promise((resolve) => {
                                        Toast.info('抱歉，演示页面不提供购票功能', 2);
                                        setTimeout(resolve, 1000);
                                    }),
                                },
                            ])
                        }}
                    >立即购买</div>
                </div>
            </div>
        )
    }
}
export default Show;