const mongoose = require('mongoose');

const poemSchema=new mongoose.Schema({
    poem:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    },
    author:{
        type: String,
        required: true,
    }
})

module.exports=mongoose.model('Poem',poemSchema);