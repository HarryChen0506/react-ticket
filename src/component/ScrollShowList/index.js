// 主页精选页面
import React from 'react'
import './scrollShowList.scss'
import ScrollShow from 'component/ScrollShow'
class ScrollShowList extends React.Component{
    render(){   
         const hotShowList = this.props.showList;     
         return (
             <div className="scroll-show-list">
                 <div className="list-container">    
                     {hotShowList.length>0&&hotShowList.map((item)=>(
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