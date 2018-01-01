// 主页精选页面
import React from 'react'
import { connect } from 'react-redux'
import TopBanner from './subPages/TopBanner'
class Main extends React.Component{
    render(){
         return (
            <div>
                <TopBanner />   
            </div>
        )
    }   
}
export default Main;