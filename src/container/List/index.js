// 主页精选页面
import React from 'react'
import CategoryBar from 'component/CategoryBar'
import ListShow from './subPages/ListShow'
import config from 'config'
import { Toast } from 'antd-mobile'

import { connect } from 'react-redux'
import { categoryShow, loadListShow } from 'redux_module/redux/show.redux.js';
import './list.scss'

@connect(
    state=>state,
    { categoryShow, loadListShow }
)
class List extends React.Component{
    constructor(...args){
        super(...args);  
        this.state = {
            categoryList: config.categoryList
        }
    } 
  
    render(){   
        const category=this.props.show.category;
        // console.log('category',category)
        return (
            <div className="list-page" style={{position: 'relative'}}>               
                <CategoryBar  
                    categoryList = {this.state.categoryList} 
                    style={{height: '5rem'}}
                    category={category}
                    onPress={(_el)=>{                        
                       this.props.categoryShow(_el);  
                       this.props.loadListShow({
                            src: 'm_web',
                            siteCityOID: this.props.show.city.cityOID,
                            offset: 0,
                            length: 10,
                            type: _el.code, 
                            sorting: 'weight',
                            seq:'desc',
                            client:'piaodashi_weixin'
                        },{
                            scrollToTop: true
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
                                Toast.fail('加载失败!!!', 1);
                            }
                        });                                 
                    }}
                />                
                <ListShow />                
            </div>
        )
    }   
}
export default List;