let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Contacts = mongoose.Schema(
    {
        name:
        {
            type: String,
            default: "",
            trim: true,
            require: 'Name is required.'
        },
        email:
        {
            type: String,
            default: "",
            trim: true,
            require: 'Email address is required.'
        },
        phone:
        {
            type: String,
            default: "",
            trim: true,
            require: 'Phone number is required.'
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
//let options = ({missingPasswordError: 'Wrong / Missing Password'});
//User.plugin(passportLocalMongoose, options);
module.exports.Contacts = mongoose.model('Contacts', Contacts);