// 近期热门
import React from 'react'
import SectionTitle from 'component/SectionTitle'
import ScrollShowList from 'component/ScrollShowList'
import './hotShow.scss'

class HotShow extends React.Component{
    constructor(...args){
        super(...args);
    }

    render(){        
         return (
            <div className="hot-show"> 
                <SectionTitle title="近期热门" arrow={true}/>  
                <ScrollShowList />
            </div>
        )
    }   
}
export default HotShow;