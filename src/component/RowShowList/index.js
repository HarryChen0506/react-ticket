// 演出列表-纵向排列
import React from 'react'
import RowShow from 'component/RowShow'


class RowShowList extends React.Component{
    constructor(...args){
        super(...args); 
        this.state = {
            showList: [{},{}]
        }
    }   
    render(){   
        const showList = this.props.showList;
        return (
            <div className="row-show-list">    
               {showList.map((item,index)=>(
                    <RowShow 
                        key={index}
                        show={item}
                        onClick={(_el)=>{this.props.onClick&&this.props.onClick(_el)}}
                    />
                ))}
            </div>
        )
    }   
}
export default RowShowList;