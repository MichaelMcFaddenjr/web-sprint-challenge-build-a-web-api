const express = require('express');
const { checkBody, checkProjectsId } = require('./projects-middleware');

const router = express.Router();

const Projects = require('./projects-model');

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(next)
});

router.get('/:id', checkProjectsId, (req, res) => {
  res.json(req.newBody)
});

router.get('/:id/actions', checkProjectsId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => {
      res.status(200).json(actions)
    })
    .catch(next)
});

router.post('/', checkBody, (req, res, next) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(201).json(project)
    })
    .catch(next)
});

router.put('/:id', checkProjectsId, checkBody, (req, res, next) => {
  Projects.update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project)
    })
    .catch(next)
});

router.delete('/:id', checkProjectsId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then(project => {
      res.status(200).json(project)
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