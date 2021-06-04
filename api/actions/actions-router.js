const express = require('express');
const { checkActionBody, checkActionsId } = require('./actions.middleware')

const router = express.Router();

const Actions = require('./actions-model');



module.exports = router;