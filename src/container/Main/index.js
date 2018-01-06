// 主页精选页面
import React from 'react'
import config from 'config'
import TopBanner from './subPages/TopBanner'
import Category from './subPages/Category'
import HotShow from './subPages/HotShow'
import RecommendShow from './subPages/RecommendShow'
import { Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js';

@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class Main extends React.Component{
    constructor(...args){
        super(...args);        
        this.state = {
            categoryList: config.mainCategoryList
        }
    }
    
    render(){        
         return (
            <div>
                <TopBanner /> 
                <div style={{height: '25px', width: '100%', background: '#fff'}}></div>  
                <Category 
                    categoryList = {this.state.categoryList}
                    onPress={(_el)=>{
                        this.props.categoryShow(_el);
                        this.props.loadListShow({
                            src: 'm_web',
                            siteCityOID: '1001',
                            offset: 0,
                            length: 10,
                            type: _el.code, 
                            sorting: 'weight',
                            seq:'desc',
                            client:'piaodashi_weixin'
                        },null,{
                            beforeSend(){
                                {/*console.log('发送!')*/}
                            },
                            success(){
                                {/*console.log('成功！')*/}
                            },
                            fail(){
                                {/*console.log('失败')*/}
                            },
                            error(){
                                {/*console.log('报错')*/}
                            }
                        });
                        this.props.history.push('/list');
                    }}
                />   
                <div style={{padding: '0 4%',background: '#fff'}}>                    
                    <HotShow />
                    <RecommendShow />
                </div>                         
               
            </div>
        )
    }   
}
export default Main;