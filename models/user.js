const {Schema, model, Types} = require('mongoose')

const user = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    array: [{type: Types.ObjectId, ref: 'link'}]
})

module.exports = model('User', user)
