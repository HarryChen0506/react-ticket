// List页面  -演出列表页面
import React from 'react'
import ReactDOM from 'react-dom';
import { Toast, PullToRefresh } from 'antd-mobile'   
import LoadMore from 'component/LoadMore'
import NoticeTip from 'component/NoticeTip'
import RowShowList from 'component/RowShowList'
import httpService from 'http_service/service.js'
import ListContainer from '../ListContainer'

import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js'
import './listShow.scss'

@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class ListShow extends React.Component{
    constructor(...args){
        super(...args);   
         this.state = {
            refreshing: false,
            down: false,
            height: document.documentElement.clientHeight
        };            
    }
    componentDidMount(){        
        // console.log('state', this.state);
        const navHeight = document.querySelector('div.am-tab-bar').clientHeight||50;
        // console.log('navHeight',navHeight)
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop-navHeight;
        // console.log('offsetTop',ReactDOM.findDOMNode(this.ptr).offsetTop); 
        // console.log('hei', hei);
        setTimeout(() => this.setState({
            height: hei
        }), 0);
    }
    getRecommendShowList(list=[]){        
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
        // console.log('node',node)
        if(node && typeof(node.scrollTo)==='function'){
            node.scrollTo(0,0)
        }
    }
    loadMoreShow(){
        console.log('loading..')  
        const offset = this.props.show.listShow.offset;
        const length = this.props.show.listShow.length;
        const nextOffset = offset+length;
        const type = this.props.show.category.code;
        this.props.loadListShow({
            src: 'm_web',
            siteCityOID: '1001',
            offset: nextOffset,
            length: length,
            type: type, 
            sorting: 'weight',
            seq:'desc',
            client:'piaodashi_weixin'
        },{
            scrollToTop: false,
            concat: true
        },{
            beforeSend(){
                Toast.loading('正在加载...', 0, () => {});
            },
            success(res){
                Toast.hide();
            },
            fail(res){
                Toast.fail(res.data.comments||'加载失败!!!', 1);
            },
            error(err){
                Toast.fail(err||'加载失败!!!', 1);
            }
        });       
    }
    pullRefresh(){ 
        const offset = this.props.show.listShow.offset;
        const length = this.props.show.listShow.length;
        const nextOffset = offset+length;
        const type = this.props.show.category.code;
        const _this = this;
        this.props.loadListShow({
            src: 'm_web',
            siteCityOID: '1001',
            offset: nextOffset,
            length: length,
            type: type, 
            sorting: 'weight',
            seq:'desc',
            client:'piaodashi_weixin'
        },{
            scrollToTop: false,
            concat: true
        },{
            beforeSend(){
                _this.setState({ refreshing: true });
                Toast.loading('正在加载...', 0, () => {});
            },
            success(res){
                _this.setState({ refreshing: false });
                // console.log('success', _this)
                Toast.hide();
            },
            fail(res){
                _this.setState({ refreshing: false });
                Toast.fail(res.data.comments||'加载失败!!!', 1);
            },
            error(err){
                _this.setState({ refreshing: false });
                Toast.fail(err||'加载失败!!!', 1);
            }
        });   

        // setTimeout(() => {
        //     this.setState({ refreshing: false });
        // }, 1000);
    }
    pullShowList(){
        const hasMore = this.props.show.listShow.hasMore;
        if(!hasMore){
            Toast.info('没有更多了....', 2);
            return 
        }
        this.pullRefresh();
    }
    render(){    
        const category = this.props.category;
        const shows = this.props.show.listShow.shows;
        const scrollToTop = this.props.show.listShow.scrollToTop;
        const hasMore = this.props.show.listShow.hasMore;
        const isLoadingMore = this.props.show.listShow.isLoadingMore||false;
        // const isLoadingMore = false;
        // console.log('scrollToTop',this.props.show.listShow.scrollToTop)
        // console.log('isLoadingMore-组件容器',isLoadingMore)
        // console.log('show_container-组件容器',this.show_container)
        if(scrollToTop){
            console.log('scrollToTop',scrollToTop, this.ptr, ReactDOM.findDOMNode(this.ptr))            
            this.scrollToTop(ReactDOM.findDOMNode(this.ptr))
        } 
        return (             
             <div 
                className="show-container" 
                style={{padding: '0 4%',background: '#fff'}}
                id="show_container"
                ref={(_el)=>{this.show_container = _el;}}
             > 
                <PullToRefresh
                    ref={el => this.ptr = el}
                    style={{
                        height: this.state.height,
                        overflow: 'auto',
                    }}
                    indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                    direction={this.state.down ? 'down' : 'up'}
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                        this.pullShowList();
                    }}
                >
                    <RowShowList 
                        showList={this.getRecommendShowList(shows)}
                        onClick={(_el)=>{console.log(_el)}}
                    /> 
                    {!hasMore?<NoticeTip content="拉到底了，老板请您别扯了..."/>:null}
                </PullToRefresh>
            </div>
           
        )
    }   
}
export default ListShow;

/*
<div 
    className="show-container" 
    style={{padding: '0 4%',background: '#fff'}}
    id="show_container"
    ref={(_el)=>{       
        this.show_container = _el;
    }}
    > 
    <RowShowList 
        showList={this.getRecommendShowList(shows)}
        onClick={(_el)=>{console.log(_el)}}
    /> 
    {this.show_container&&hasMore?<LoadMore 
        containerNode = {this.show_container}
        isLoadingMore={isLoadingMore} 
        loadingText={'轮轮正努力加载中...'}
        toLoadText={'加载更多...'}
        loadMoreFn={()=>{this.loadMoreShow()}} toBottom="50" 
    />:<NoticeTip content="拉到底了，老板请您别扯了..."/>} 
</div>*/