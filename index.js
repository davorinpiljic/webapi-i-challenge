///// implement your API here
const express = require('express')
const server = express()
const db = require('./data/db.js')


server.listen(1000, () => {
    console.log('test good')
})



server.post('/api/users', (request, response) => {
    const userSomething = request.body
    db.insert(userSomething)
    .then(user => {
    if (!userSomething.name || !userSomething.bio) {
        response.status(400).json({errorMessage: "Please provide name and bio for the user."})

        
    }
    else (user) {
        response
        .status(201).json({  succes: true, user})
    }
    })
    .catch(error => {
        response.status(500).json({error: "error while saving to database"})
    })
})

server.get('/api/users', (request, response) => {
    db.find() 
        .then(user => {
            response.status(200).json(user)
        })
        .catch(error => {
            response.status(500).json({error: "user info could not be retrieved"})
        })
})

server.get('/api/users/:id', (request, response) => {
    db.findById(id) 
        .then(id => {
            if (id) {
                response.status(200).json({success: true, id})
            }
            else {
                response.status(404).json({errorMessage: "user not found."}) 
            }
            
        })
        .catch(error => {
            response.status(500).json({error: "user info could not be retrieved"})
        })
})

server.delete('/api/users/:id', (request, response) => {
    db.remove(id) 
    .then(deleted => {
        if(deleted) {
            response.status(204).end()
        }else {
            res
              .status(404)
              .json({ message: "The user with the specified ID does not exist." });
          }
        })
        .catch(err => {
          res.status(500).json({ error: "The user could not be removed" });
        });
})

server.put('/api/users/:id', (request, response) => {
    db.update(id, user)
    .then(updated => {
      if (updated) {
        res.status(200).json({  updated });
      } 
      else if {
        response.status(400).json({errorMessage: "please provide name and bio for the user"})
      }
      else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});
})