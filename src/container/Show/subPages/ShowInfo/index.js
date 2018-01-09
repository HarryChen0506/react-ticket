// 演出详情 演出信息组件
import React from 'react';
import './showInfo.scss'
class ShowInfo extends React.Component{ 
    render(){       
        return(
            <div className="show-info">
                <div className="main">
                     <div className="row">
                        <div className="icon time"  style={{backgroundImage: `url(${require('./images/time.png')})`}} ></div>
                        <div className="content">
                            <div className="text">2018.01.27 19:30</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="icon location"  style={{backgroundImage: `url(${require('./images/location.png')})`}}></div>
                        <div className="content">
                            <div className="text normal">无锡市体育中心体育馆</div>
                            <div className="text light">无锡市太湖西大道1500号</div>
                        </div>
                    </div>
                    <div className="promise-row">
                        <div className="promise">
                            <div className="promise-icon" style={{backgroundImage: `url(${require('./images/promise.png')})`}}></div>
                            <div className="promise-text">真票保障</div>
                        </div>
                        <div className="promise">
                            <div className="promise-icon" style={{backgroundImage: `url(${require('./images/promise.png')})`}}></div>
                            <div className="promise-text">出票保障</div>
                        </div>
                        <div className="promise">
                            <div className="promise-icon" style={{backgroundImage: `url(${require('./images/promise.png')})`}}></div>
                            <div className="promise-text">配送保障</div>
                        </div>
                    </div>
                </div>
               
                <div className="splitor"></div>
            </div>
        )
    }
}
export default ShowInfo;
