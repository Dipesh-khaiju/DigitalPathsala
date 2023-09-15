const mongoose = require('mongoose');


const blogSchema  = new mongoose.Schema({
 title: {type: String, required: true},
 subtitle:{type:String, required: true},
 description:{type:String, required: true},

});

const blog = new mongoose.model('blog', blogSchema);

module.exports = blog;