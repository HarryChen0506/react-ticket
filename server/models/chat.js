//聊天记录模型
var mongoose = require('mongoose');
var chatSchema = new mongoose.Schema({
  "chatId": {type: String },  //消息id
  "from": {type: String, required: true},    //发自谁
  "to": {type: String, required: true},      //发给谁
  "content":{type: String, default: ''}, //内容
  "readed":{type: Boolean, default: false},
  "created_time":{type: Number, required: true}, //创建时间
}) 
//Chat-模型名（可不要） user-数据库里集合名（必需）
// Mongoose会将集合名称设置为模型名称的小写版。
// 如果名称的最后一个字符是字母，则会变成复数；
// 如果名称的最后一个字符是数字，则不变；
// 如果模型名称为"MyModel"，则集合名称为"mymodels"；
// 如果模型名称为"Model1"，则集合名称为"model1"
module.exports = mongoose.model('Chat',chatSchema, 'chats');