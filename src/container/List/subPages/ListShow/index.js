// List页面  -演出列表页面
import React from 'react'
import { Toast } from 'antd-mobile'
import LoadMore from 'component/LoadMore'
import RowShowList from 'component/RowShowList'
import httpService from 'http_service/service.js'

import { connect } from 'react-redux'
import { categoryShow } from 'redux_module/redux/show.redux.js'
import './listShow.scss'

@connect(
    state=>state,
    { categoryShow }
)
class ListShow extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = { 
            showList: [],
            pagination: {},
            page:0,
            length:10,
            isLoadingMore: false,
            hasMore: true //是否还有更多
        }
    }
    componentDidMount(){  
        
        this.getListShows()
       
    }
    getListShows(config){
        // offset=0&length=10&type=1&src=m_web&sorting=weight&seq=desc&client=piaodashi_weixin&
        // time=1515133417052&locationCityOID=&siteCityOID=3101
        console.log('this',this.props.show.category)        
        const type = this.props.show.category.code;
        const page = this.state.page;
        const length = this.state.length;
        const offset = page*length;
        const params = {
            offset,
            length,
            type,
            src: 'm_web',
            sorting: 'weight',
            seq: 'desc',
            client: 'piaodashi_weixin',
            siteCityOID: '1001'
        }
        Toast.loading('正在加载...', 0, () => {
            // console.log('Load complete !!!');
        });
        httpService.main.getListShows(params).then((res)=>{
            if(res.data.statusCode===200){                
                this.dealShowDada(config, res)        
                Toast.hide();
            }else{
                Toast.fail(res.data.comments||'加载失败!!!', 1);
            }           
        },(err)=>{
            Toast.fail(err||'加载失败!!!', 1);
        })
    }
    dealShowDada(config, res){
        const page = this.state.page;
        const length = this.state.length;
        const showList = res.data.result.data;
        const pagination = res.data.result.pagination;
        if(!config||config.type==='new'){
            this.setState({
                showList: showList,
                pagination: pagination,
                hasMore: this.calHasMore({count:pagination.count, length, page})             
            })
        }else if(config.type==='add'){
            this.setState({               
                pagination: pagination,
                hasMore: this.calHasMore({count:pagination.count, length, page})
            })
            if(showList&&showList.length>0){
                this.setState({
                    showList: this.state.showList.concat(showList)                      
                })
            }                   
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
        // console.log('node',node)
        node&&node.scrollTo(0,0);
    }
    calHasMore({count,length,page}){
        //计算是否还有更多
        console.log(count, length, page)
        return (count-length*page)>0
    }
    initLoadShow(){
        this.setState({
            page: 0
        })
        this.getListShows();
        this.scrollToTop(this.show_container); //滚动到顶部
    }
    loadMoreShow(){
        console.log('loading..',this.state)
        this.setState({
            page: this.state.page+1
        })
        this.getListShows({type: 'add'})
    }
    render(){    
        const category = this.props.category;    
         return (
             <div 
                className="show-container" 
                style={{padding: '0 4%',background: '#fff'}}
                ref={(_el)=>{this.show_container = _el }}
             >
                <RowShowList 
                    showList={this.getRecommendShowList(this.state.showList)}
                    onClick={(_el)=>{console.log(_el)}}
                /> 
                {this.show_container?<LoadMore 
                    containerNode = {this.show_container}
                    isLoadingMore={this.state.isLoadingMore} 
                    loadingText={'轮轮正努力加载中...'}
                    toLoadText={'加载更多...'}
                    loadMoreFn={()=>{this.loadMoreShow()}} toBottom="50" 
                />:null}             

                 <div>{ category.code} </div>

            </div>
           
        )
    }   
}
export default ListShow;