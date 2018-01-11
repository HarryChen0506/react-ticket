// 近期热门
import React from 'react'
import { connect } from 'react-redux'
import SectionTitle from 'component/SectionTitle'
import ScrollShowList from 'component/ScrollShowList'
import './hotShow.scss'

@connect(
    state=>state,
    null
)
class HotShow extends React.Component{
    getHotShowList(list=[]){        
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
         const  showList = this.getHotShowList(this.props.show.hotShow) 
         return (
            <div className="hot-show"> 
                <SectionTitle title="近期热门" arrow={true}/>  
                <ScrollShowList showList={showList}/>
            </div>
        )
    }   
}
export default HotShow;