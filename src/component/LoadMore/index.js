import React, {Component} from 'react';
import './loadMore.scss'

export default class LoadMore extends Component {
    constructor(props, context) {
        super(props, context);
        this.handleScroll = f=>f;
        this.containerNode = null;
    }    
    render() {
         const loadingText = this.props.loadingText||'加载中...';
         const toLoadText = this.props.toLoadText||'加载更多...';
        return (
            <div className="load-more" ref={(wrapper)=>{this.wrapper = wrapper}}>
                {
                    this.props.isLoadingMore
                    ? <span>{loadingText}</span>
                    : <span onClick={this.loadMoreHandle.bind(this)}>{toLoadText}</span>
                }
            </div>
        )
    }
    componentDidMount(){
        let wrapper = this.wrapper;    //加载条的容器    
        let isLoadingMore =  this.props.isLoadingMore;     //是否正在加载   
        let timeoutId;
        this.containerNode = this.props.containerNode||window;  //外面的容器
        this.handleScroll = function(){
            console.log('isLoadingMore',isLoadingMore)
            if(isLoadingMore){
                return 
            }
            if(timeoutId){
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(callBack.bind(this), 10);
        }
        function callBack(){
            const toTopDistance = wrapper.getBoundingClientRect().top; //元素距离浏览器视窗顶部距离    
            // console.log('toTopDistance',toTopDistance)  
            const windowHeight = window.screen.height;  //浏览器视窗的高度
            // console.log('windowHeight',windowHeight)                  
            const startDistance = windowHeight - parseInt(this.props.toBottom); //目标位置的高度
            // console.log('start',startDistance)
            if (toTopDistance && toTopDistance < startDistance) {
                // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
               this.loadMoreHandle()
            }
        }   
        // console.log('this.containerNode',this.containerNode);
        typeof this.containerNode.addEventListener ==='function'&&
        this.containerNode.addEventListener('scroll',this.handleScroll.bind(this));        
    }
    componentWillUnmount(){
        console.log('销毁组件')
        typeof this.containerNode.removeEventListener ==='function'&&
        this.containerNode.removeEventListener("scroll", this.handleScroll.bind(this));
    }
    loadMoreHandle() {
        // 执行传输过来的
        this.props.loadMoreFn();
    }
}

LoadMore.defaultProps = {
    toBottom:　0
}