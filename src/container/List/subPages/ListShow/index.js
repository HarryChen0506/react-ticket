// List页面  -演出列表页面
import React from 'react'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import LoadMore from 'component/LoadMore'
import ScrollTop from 'component/ScrollTop'
import RowShowList from 'component/RowShowList'


import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js'
import './listShow.scss'
@withRouter
@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class ListShow extends React.Component{
    constructor(...args){
        super(...args);      
        this.state = {
            isLoadingMore: false,
            showScrollTop: false
        }         
    }
    componentDidMount(){
        // this.initLoadShow()
        // console.log('componentDidMount',this.props.show.category)
    }
    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps', nextProps.show.listShow.scrollToTop)
        //父组件发生render就会触发此函数（子组件的state改变不会触发）
         const scrollToTop = nextProps.show.listShow.scrollToTop;
         if(scrollToTop){
            this.scrollToTop(this.show_container)
        } 
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
        if(!node){
            return
        }
        if(typeof(node.scrollTo)==='function'){
            node.scrollTo(0,0)
        }else{
            node.scrollTop=0;
        }        
    }
    calShowScrollTop(){
        const distanceToTop = (this.show_container&&this.show_container.scrollTop)||0;
        if(distanceToTop>700){
            this.setState({
                showScrollTop: true
            })
        }else{
            this.setState({
                showScrollTop: false
            })
        }
    }
    loadMoreShow(){
        const _this = this;
        const {offset, length }= this.props.show.listShow;
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
                _this.setState({
                    isLoadingMore: true
                })
                Toast.loading('正在加载...', 0, () => {});
            },
            success(res){
                 _this.setState({
                    isLoadingMore: false
                })
                Toast.hide();
            },
            fail(res){
                 _this.setState({
                    isLoadingMore: false
                })
                Toast.fail(res.data.comments||'加载失败!!!', 1);
            },
            error(err){
                 _this.setState({
                    isLoadingMore: false
                })
                Toast.fail('加载失败!!!', 1);
            }
        });       
    }
    render(){ 
        const shows = this.props.show.listShow.shows;       
        const hasMore = this.props.show.listShow.hasMore;
        // const isLoadingMore = this.props.show.listShow.isLoadingMore||false;
        return (             
             <div 
                className="show-container" 
                style={{padding: '0 4%',background: '#fff'}}
                id="show_container"
                ref={(_el)=>{this.show_container = _el}}
                onScroll={()=>{
                    this.calShowScrollTop()
                }}
             > 
                <RowShowList 
                    showList={this.getRecommendShowList(shows)}
                    onClick={(_el)=>{
                         const showOID = _el.showOID;
                        this.props.history.push('/show/'+showOID)
                    }}
                /> 
                <LoadMore 
                    containerNode = {this.show_container}
                    isLoadingMore={this.state.isLoadingMore} 
                    loadingText={'轮轮正努力加载中...'}
                    toLoadText={'即将加载更多...'}
                    loadMoreFn={()=>{
                        hasMore&&this.loadMoreShow&&this.loadMoreShow()
                    }} 
                    toBottom="50" 
                    hasMore = {hasMore}
                    noMoreText = {'拉到底了，老板请您别扯了...'}
                />
                <ScrollTop 
                    fadeIn={this.state.showScrollTop}
                    style={{position:'absolute', right: '2rem', bottom: '2rem'}}
                    onClick={()=>{
                       this.scrollToTop(this.show_container)
                    }}
                />  
            </div>          
        )
    }   
}
export default ListShow;