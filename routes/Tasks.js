var express = require('express')
var tasks = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')

const Task = require('../models/Task')

tasks.use(cors())

process.env.SECRET_KEY = 'secret'

tasks.get('/tasks', function(req, res, next) {
    Task.findAll()
      .then(tasks => {
        res.json(tasks)
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})

tasks.get('/task/:id', function(req, res, next) {
   Task.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(task => {
        if (task) {
          res.json(task)
        } else {
          res.send('Task does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
})

tasks.post('/task', function(req, res, next) {
    if (!req.body.name && !req.body.description) {
      res.status(400)
      res.json({
        error: 'Bad Data'
      })
    } else {
      Task.create(req.body)
        .then(data => {
          res.send(data)
        })
        .catch(err => {
          res.json('error: ' + err)
        })
    }
})

tasks.delete('/task/:id', function(req, res, next) {
      Task.findOne({
        where: {
          id:req.params.id
        }
      })
      .then(task => {
        if (task) {
          Task.destroy({
            where: {
              id: req.params.id
            }
          })
          .then(() => {
            res.json({ status: 'Task Deleted!' })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
        }else{
          res.json({ status: 'failed', message:'Task not found' })
        }
    }).catch(err => {
      res.json({ status: 'failed', message:'Task not found' })
    })
})

tasks.put('/task/:id', function(req, res, next) {
    if (!req.body.name && !req.body.description && !req.body.timeTask ) {
      res.status(400)
      res.json({
        error: 'Bad Data'
      })
    } else {
      Task.findOne({
        where: {
          id:req.params.id
        }
      })
        .then(task => {
          if (task) {
            Task.update(
              { name: req.body.name, description: req.body.description, 
                timeTask: req.body.timeTask},
              { where: { id: req.params.id } }
            )
              .then(() => {
                res.json({ status: 'success', message:'Task Updated !' })
              })
              .error(err => handleError(err))
          }else{
            res.json({ status: 'failed', message:'Task not found' })
          }
        }).catch(err => {
          res.json({ status: 'failed', message:'Task not found' })
        })

    }
})

module.exports = tasks
