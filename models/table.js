const {Schema, model} = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');

const table = new Schema({
    name: {type: String, required: true},
    power: {type: Number, required: true},
    status: {type: Boolean, required: true}
})

table.plugin(autoIncrement.plugin, {model: 'Table', field: 'id'})

module.exports = model('Table', table)
