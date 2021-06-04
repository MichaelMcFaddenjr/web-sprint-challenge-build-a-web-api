const { get } = require('./actions-model');

function checkBody(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'valid project or action required'});
  } else if (!req.body.project_id) {
    res.status(400).json({ message: 'Project ID is required'});
  } else if (!req.body.description) {
    res.status(400).json({ message: 'description is required'});
  } else if (!req.body.notes) {
    res.status(400).json({ message: 'notes required'})
  } else {
    next();
  }
}

function checkActionsId(req, res, next) {
  get(req.params.id)
    .then(action => {
      if(action) {
        req.newBody = action;
        next();
      } else {
        res.status(404).json({
          message:'Actions with specified ID does not exist'
        })
      }
    })
    .catch(error => {
      next(error)
    })
}

module.exports = {
  checkActionsId,
  checkBody
}