// ListShow的包裹器
import React from 'react'

class ListContainer extends React.Component{
    render(){        
         return (
            <div {...this.props}>                                        
               {this.props.children}
            </div>
        )
    }   
}
export default ListContainer;