/* user.js by Stefan Lovecchio ID# 301305372 18/06/23 */

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

//create User schema
let User = mongoose.Schema(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            require: 'Username is required.'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'users'
    }
)

//configure options for User Model
let options = ({missingPasswordError: 'Wrong / Missing Password'});
User.plugin(passportLocalMongoose, options);
module.exports.User = mongoose.model('User', User);