let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Contacts Model
let Contact = require('../models/contacts');

module.exports.displayContactList = async (req, res, next)=>{
    try {
        let contactList = await Contact.find();
        //console.log(gameList);

        res.render('contacts/list', 
            {title: 'Contacts', 
            ContactList: contactList,
            displayName: req.user ? req.user.displayName : ''})
    } catch (err){
        console.log(err);
    }
};

module.exports.displayAddPage = async (req, res, next)=>{
    try {
        res.render('contacts/add', {title: 'Add Contact'})
    } catch (err){
        console.log(err);
    }
};

module.exports.displayAddPage = async (req, res, next)=>{
    try {
        res.render('contacts/add', 
        {title: 'Add Contact',
        displayName: req.user ? req.user.displayName : ''})
    } catch (err){
        console.log(err);
    }
};

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

module.exports.displayEditPage = async (req, res, next) => {
    let id = req.params.id;

    try {
        let contactToEdit = await Contact.findById(id);
        res.render('contacts/edit', 
        {title: 'Edit Contact', 
        contact: contactToEdit,
        displayName: req.user ? req.user.displayName : ''});
    } catch (err){
        console.log(err);
        res.status(500).send(err);
    }
};

module.exports.processEditPage = async (req, res, next) => {
    let id = req.params.id;

    let updatedGame = {
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