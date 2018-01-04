//常用配置
const config = {
    mainCategoryList: [
        {icon: require('static/images/category/vocalConcert.png'),text:'演唱会',name:'VocalConcert',code:'1'},
        {icon: require('static/images/category/drama.png'),text:'话剧歌剧',name: "Drama",code: "3"},
        {icon: require('static/images/category/concert.png'),text:'音乐会',name: "Concert",code: "2"},
        {icon: require('static/images/category/sports.png'),text:'体育赛事',name: "Sports",code: "6"},
        {icon: require('static/images/category/more.png'),text:'更多',name: "All",code: ""}
    ],
    categoryList: [
        {code: "", name: "All", text: "全部"},
        {code: "1", name: "VocalConcert", text: "演唱会"}, 
        {code: "3", name: "Drama", text: "话剧歌剧"},            
        {code: "2", name: "Concert", text: "音乐会"},
        {code: "6", name: "Sports", text: "体育赛事"},
        {code: "4", name: "Acrobatics", text: "曲艺杂谈"},
        {code: "5", name: "Dancing", text: "舞蹈芭蕾"},       
        {code: "7", name: "Exhibition", text: "展览休闲"},
        {code: "9", name: "Children", text: "儿童亲子"}    
    ]
}

export default config;

// [{code: "1", name: "VocalConcert", text: "演唱会", $$hashKey: "object:26"},
// {code: "2", name: "Concert", text: "音乐会", $$hashKey: "object:27"},
// {code: "3", name: "Drama", text: "话剧歌剧", $$hashKey: "object:28"},
// {code: "4", name: "Acrobatics", text: "曲艺杂谈", $$hashKey: "object:29"},
// {code: "5", name: "Dancing", text: "舞蹈芭蕾", $$hashKey: "object:30"},
// {code: "6", name: "Sports", text: "体育赛事", $$hashKey: "object:31"},
// {code: "7", name: "Exhibition", text: "展览休闲", $$hashKey: "object:32"},
// {code: "9", name: "Children", text: "儿童亲子", $$hashKey: "object:33"}]