// 主页精选页面
import React from 'react'
import './scrollShowList.scss'
import ScrollShow from 'component/ScrollShow'
import httpService from 'http_service/service.js'
class ScrollShowList extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
            hotShowList: []
        }
    }
    componentDidMount(){
       this.getMarketingShows();
    }
    getMarketingShows(){         
        const params = {
             src: 'weixin',
             siteCityOID: '1001'
        }
        httpService.main.getMarketingShows(params).then((res)=>{
            const data = res.data.result.data;
            const recentShows = data.recentShows;
            this.setState({
                hotShowList: this.getHotShowList(recentShows)
            })
        },(err)=>{
            alert(err)
        })
    }
    getHotShowList(list){        
        return list.map((item)=>({
            showName: item.showName,
            showTime: item.firstShowTime,
            showOID: item.showOID,
            number: (item.discount*10).toFixed(1),
            imgUrl: item.posterURL,
            text: '折'
        }))
    }
    render(){   
         const hotShowList = this.state.hotShowList;     
         return (
             <div className="scroll-show-list">
                 <div className="list-container">    
                     {hotShowList.map((item)=>(
                         <ScrollShow 
                            key={item.showOID}
                            show={item}
                            style={{marginRight: "1rem"}}
                            onClick={(_el)=>{console.log(_el)}}
                       />
                     ))}
                 </div>
             </div>
         )
    }   
}
export default ScrollShowList;