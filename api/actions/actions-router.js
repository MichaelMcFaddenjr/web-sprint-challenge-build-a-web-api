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

router.post("/", checkBody, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/:id', checkActionsId, checkBody, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})

router.delete('/:id', checkActionsId, (req, res, next) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message:'something went wrong, sorry',
    err: err.message,
    stack: err.stack,
  })
});


module.exports = router;