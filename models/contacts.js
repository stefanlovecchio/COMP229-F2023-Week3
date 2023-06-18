/* contacts.js by Stefan Lovecchio ID# 301305372 18/06/23 */
let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    name: String,
    phone: String,
    email: String,
},
{
    collection: 'contacts'
});

module.exports = mongoose.model('Contact', contactModel);