//emoji输入框

import React from 'react';
import { Grid } from 'antd-mobile';
import './emoji.scss';

class Emoji extends React.Component{
    constructor(...args){
        super(...args);
        this.timeoutId = null; 
        this.state = {
            emoji: `😀,😃,😄,😁,😆,😅,😂,😊,😇,🙂,🙃,😉,😌,😍,😘,😗,😙,😚,😋,😜,😝,😛,🤑,🤗,🤓,😎,😏,😒,😞,😔,😟,😕,🙁,😣,😖,😫,😩,😤,😠,😡,😶,😐,😑,😯,😦,😧,😮,😲,😵,😳,😱,😨,😰,😢,😥,😭,😓,😪,😴,🙄,🤔,😬,🤐,😷,🤒,🤕,😈,👿,👹,👺,💩,👻,💀,☠️,️👽,👾,🤖,🎃,😺,😸,😹,😻,😼,😽,🙀,😿,😾,👐,🙌,👏,🙏,👍,👎,👊,✊,🤘,👌,👈,👉,👆,👇,✋,🖖,👋,💪,🖕,✍️,💅,🖖,💄,💋,👄,👅,👂,👃,👁,👀`
        }
    }
    fixCarousel(){
         this.timeoutId = setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
            console.log('resize')
		},0) 
    }
    componentDidMount(){
        this.fixCarousel()
    }
    componentWillUnmount(){
        window.clearTimeout(this.timeoutId);
    }
    render(){
        const emojiData = this.state.emoji.split(',').filter(v=>v).map((_val, i) => ({            
            text: _val,
        }))
        return (
            <div className="emoji-box">
                <Grid 
                    data={emojiData}
                    columnNum={9}
                    carouselMaxRow={4}
                    isCarousel
                    onClick={_el => {
                        this.props.onHandleClick(_el);
                    }} 
                />
            </div>
        )
    }
}
export default Emoji;