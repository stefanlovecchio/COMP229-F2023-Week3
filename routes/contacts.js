let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactsController = require('../controllers/contacts')

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Get Route for the Contact List page - READ Operation
router.get('/', requireAuth, contactsController.displayContactList);

// Get Route for the Add page - CREATE Operation
router.get('/add', requireAuth, contactsController.displayAddPage);

// Post Route for processing the Add page - CREATE Operation
router.post('/add', requireAuth, contactsController.processAddPage);

// Get Route for displaying the Edit page - UPDATE Operation
router.get('/edit/:id', requireAuth, contactsController.displayEditPage);

// Post Route for processing the Edit page - UPDATE Operation
router.post('/edit/:id', requireAuth, contactsController.processEditPage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id', requireAuth, contactsController.performDelete);

module.exports = router;