/* contacts.js by Stefan Lovecchio ID# 301305372 18/06/23 */

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Contacts Model
let Contact = require('../models/contacts');

//display list of contacts
module.exports.displayContactList = async (req, res, next)=>{
    try {
        let contactList = await Contact.find();

        res.render('contacts/list', 
            {title: 'Contacts', 
            ContactList: contactList,
            username: req.user ? req.user.username : ''})
    } catch (err){
        console.log(err);
    }
};

//display page for adding contacts
module.exports.displayAddPage = async (req, res, next)=>{
    try {
        res.render('contacts/add', 
        {title: 'Add Contact',
        username: req.user ? req.user.username : ''})
    } catch (err){
        console.log(err);
    }
};

//process added contact info
module.exports.processAddPage = async (req, res, next) => {
    let newContact = new Contact({
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
    });

    try {
        await newContact.save();
        res.redirect('/contacts-list')
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

//display page for editing a contact
module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contacts/edit', 
        {title: 'Edit Contact', 
        contact: contactToEdit,
        username: req.user ? req.user.username : ''});
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

//process edited ontact
module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;

    let updatedContact = {
        "name": req.body.name,
        "phone": req.body.phone,
        "email": req.body.email,
    };
    try {
        await Contact.updateOne({_id: id}, updatedContact);
        res.redirect('/contacts-list');
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

//process contact deletion
module.exports.performDelete = async (req, res, next) => {
    let id = req.params.id;

    try {
        await Contact.findByIdAndRemove(id);
        res.redirect('/contacts-list');
    }catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};