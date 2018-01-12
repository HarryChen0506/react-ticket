var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  "user": {type: String, required: true},
  "pwd": {type: String, required: true},
  "type": {type: String, required: true},
  "avatar":{type: String}, //头像
}) 
//User-模型名（可不要） user-数据库里集合名（必需）
// Mongoose会将集合名称设置为模型名称的小写版。
// 如果名称的最后一个字符是字母，则会变成复数；
// 如果名称的最后一个字符是数字，则不变；
// 如果模型名称为"MyModel"，则集合名称为"mymodels"；
// 如果模型名称为"Model1"，则集合名称为"model1"
module.exports = mongoose.model('User',userSchema, 'users');