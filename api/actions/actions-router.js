const express = require('express');
const { checkBody, checkActionsId } = require('./actions.middleware')

const router = express.Router();

const Actions = require('./actions-model');

router.get('/', (req, res, next) => {
  Actions.get()
    .then(action=> {
      res.status(200).json(action)
    })
    .catch(next)
});

router.get('/:id', checkActionsId, (req, res) => {
  res.json(req.newBody)
});

router.post('/', checkBody, (req, res, next) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action)
    })
    .catch(next)
})



module.exports = router;