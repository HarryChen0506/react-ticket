// 选择城市页面
import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import { NavBar, Icon, Toast } from 'antd-mobile'
import CityCategory from './subPages/CityCategory'
import CityItem from './subPages/CityItem'
import CityButton from './subPages/CityButton'
import { LocalStorage } from 'utils'
import './city.scss'
import httpService from 'http_service/service.js'

import { connect } from 'react-redux'
import { cityShow, loadBannerShow, loadHotShow, loadRecommendShow, loadListShow } from 'redux_module/redux/show.redux.js';
@withRouter
@connect(
    state=>state,
    { cityShow, loadBannerShow, loadHotShow, loadRecommendShow, loadListShow }
)
class City extends React.Component{
    constructor(...args){
        super(...args);
        this.state = {
            allCities: [],
            hotCities: [],
            slide: []
        }
    }  
    componentDidMount(){
        this.getCities()
    }  
    initPage(city){
        //banner
        this.props.loadBannerShow({
            siteCityOID: city.cityOID,
        });     
        //热门演出   
        this.props.loadHotShow({
            siteCityOID: city.cityOID,
        });   
        //推荐演出     
        this.props.loadRecommendShow({
            siteCityOID: city.cityOID,
        }); 
        this.props.loadListShow({
            src: 'm_web',
            siteCityOID: city.cityOID,
            offset: 0,
            length: 10,
            sorting: 'weight',
            seq:'desc',
            client:'piaodashi_weixin'
        },null,null);   
    }
    getCities(){
        Toast.loading('加载城市列表...', 0, () => {});
        httpService.main.getCities().then((res)=>{
            if(res.data.statusCode===200){
                this.setState({
                    allCities: res.data.result.allCities,
                    hotCities: res.data.result.hotCities,
                    slide: this.calSlideList(res.data.result.hotCities, res.data.result.allCities )
                })
                Toast.hide();
            }else{
                Toast.fail(res.data.comments||'加载失败!!!', 1);
            }
        },(err)=>{
            Toast.fail('加载失败!!!', 1);
        })
    }
    calSlideList(hotCities,allCities){
        let arr = [];
        arr.push({
            name: '热门',
            title: 'hot'
        })
        Array.forEach(allCities,item=>{
            arr.push({
                name: item.title,
                title: item.title
            })
        })
        return arr
    }
    calOffsetTop(reactNode){
        //计算元素距离父元素（relative）的高度
        const node = ReactDOM.findDOMNode(reactNode);
        return (node&&node.offsetTop)||0;
    }
    scrollTop(reactNode, targetTopValue){
        //滚动距离
        const node = ReactDOM.findDOMNode(reactNode);         
        if(!node){
            return
        }
        if(typeof(node.scrollTo)==='function'){
            node.scrollTo(0,targetTopValue)
        }else{
            node.scrollTop=targetTopValue;
        }  
    }
    render(){         
         const hotCities = this.state.hotCities;
         const allCities = this.state.allCities;
         const slide = this.state.slide;
         const currentCity = this.props.show.city;
         return (
            <div className="city-page">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#bbb"/>}
                    onLeftClick={() => this.props.history.goBack()}
                ><div style={{color: '#494949', fontSize: '1.6rem'}}>选择城市</div></NavBar>    
                <div className="city-main" ref={(node)=>this.container=node}>
                    <div className="main-left">
                        <CityCategory title={'热门城市'} type={'column'} ref={(node)=>this['hot']=node}>  
                            {hotCities.map(item=>
                                <CityButton 
                                    key={item.cityName} 
                                    name={item.cityName} 
                                    active={currentCity.cityOID===item.cityOID}
                                    onClick={()=>{
                                        LocalStorage.save('city', JSON.stringify(item))
                                        this.props.cityShow(item);
                                        this.initPage(item);
                                        this.props.history.goBack()
                                    }}
                                ></CityButton>        
                            )}                                                   
                        </ CityCategory>                    
                        {allCities.map((item, index)=>(
                            <CityCategory title={item.title} key={item.title} type={'row'} ref={(node)=>this[item.title]=node}>
                                {item.cities.map(city=>(
                                    <CityItem key={city.cityOID} name={city.cityName} active={currentCity.cityOID===city.cityOID}
                                        onClick={()=>{
                                             LocalStorage.save('city', JSON.stringify(city))
                                             this.props.cityShow(city);
                                             this.initPage(city);
                                             this.props.history.goBack()                                            
                                        }}
                                    ></CityItem>
                                ))}                            
                            </ CityCategory>
                        ))}
                    </div>
                    <div className="main-slide">
                        <div className="slide-container">
                             {slide.map(item=>(
                                <div 
                                    key={item.name} 
                                    onClick={()=>{
                                        const height = this.calOffsetTop(this[item.title]);                                                                          
                                        this.scrollTop(this.container, (height-30) )
                                    }}
                                >{item.name}</div>
                            ))}
                        </div>                       
                    </div> 
                </div>
            </div>
        )
    }   
}
export default City;