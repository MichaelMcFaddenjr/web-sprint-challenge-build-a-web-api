const { get } = require('./actions-model');

function checkActionsId(req, res, next) {
  get(req.params.id)
    .then(action => {
      if(action) {
        req.newBody = action;
        next();
      }else {
        res.status(404).json({
          message:'Actions with specified ID does not exist'
        })
      }
    })
    .catch(error => {
      next(error)
    })
}

function checkActionBody(res, req, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'Valid action required'});
  } else if (!req.body.name) {
    res.status(400).json({ message: 'Name is required'});
  } else if (!req.body.description) {
    res.status(400).json({ message: 'Description is required'});
  } else if (!req.body.project_id) {
    res.status(400).json({ message: 'ID is required'})
  } else if (!req.body.notes) {
    res.status(400).json({ message: 'Notes are required' })
  } else {
    next();
  }
}

module.exports = {
  checkActionsId,
  checkActionBody
}