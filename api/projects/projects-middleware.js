const { get } = require('./projects-model');

function checkBody(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ message: 'valid project or action required'});
  } else if (!req.body.name) {
    res.status(400).json({ message: 'name is required'});
  } else if (!req.body.description) {
    res.status(400).json({ message: 'description is required'});
  } else {
    next();
  }
}

function checkProjectsId(req, res, next) {
  get(req.params.id)
    .then((action) => {
      if(action) {
        req.newBody = action;
        next();
      } else {
        res.status(404).json({
          message: 'Project with specified ID does not exist'
        })
      }
    })
    .catch(error => {
      next(error);
    });
}

module.exports = {
  checkBody,
  checkProjectsId
}