// implement your API here
// require the express npm module, needs to be added to the project using "yarn add" or "npm install"
const express = require('express');
const db = require('./data/db.js')
// creates an express application using the express module
const server = express();
server.use(express.json());

// configures our server to execute a function for every GET request to "/"
// the second argument passed to the .get() method is the "Route Handler Function"
// the route handler function will run on every GET request to "/"
server.get('/', (req, res) => {
  // express will pass the request and response objects to this function
  // the .send() on the response object can be used to send a response to the client
  res.send('Hello World');
});
server.get('/hobbits', (requestObject, responseObject) => {
    //route handler function code goes here
    const hobbits = [
        {
          id: 1,
          name: 'Samwise Gamgee',
        },
        {
          id: 2,
          name: 'Frodo Baggins',
        },
      ];
      responseObject.status(200).json(hobbits)
})
// Your job is to create a new /users endpoint that returns the list of users contained in the provided database. To get the list of users, require the /data/db.js file into index.js and use it’s .find() method to get the data. The .find() method returns a promise, so make sure to send the response after that promise has resolved and, in case of failure, return a status code of 500 and an error message back to the client.
server.get('/users', (request, response) => {
    //route handler function code goes here
    db.find() 
    .then(users => {
        response.status(200).json(users)
    })
    .catch(error => {
        response.status(500).json({error})
    })
})


///webapi-i-challenge start:
server.post('/api/users', (request, response) => {
  const user = request.body
  if(!user.name || !user.bio) {
    response.status(400).json({errorMessage: "Please provide name and bio for the user."})
   
  }
  console.log(user)
  db.insert(user)
  .then(posted => {
    if (posted) {
    response
    .status(201).json({posted})
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
    const id = request.params.id
    console.log(id)
    db.findById(id) 
      .then(user => {
          if (user) {
              response.status(200).json(user)
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
    const id = request.params.id
  db.remove(id)
  .then(deleted => {
      if(deleted) {
          response.status(200).json({
            message: 'the user was deleted.',
          })
      }  else  {
          response
            .status(404)
            .json({ message: "The user with the specified ID does not exist." });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
      });
})
server.put('/api/users/:id', (request, response) => {
  const id = request.params.id;
  const user = request.body;
  console.log(id)
  console.log(request.body)
  if(!user.name || !user.bio) {
    response.status(400).json({errorMessage: "Please provide name and bio for the user."})
   
  }
  db.update(id, user)
  .then(updatedUser => {
    if(updatedUser) {
    response.status(200).json( {msg: "success update", updatedUser} )
  }
  else {
    response.status(404).json({errorMessage: "The user with the specified ID does NOT exist."})

  }
  })
  .catch(err => {
    res.status(500).json({ success: "is no work", err });
  });
});
// once the server is fully configured we can have it "listen" for connections on a particular "port"
// the callback function passed as the second argument will run once when the server starts
server.listen(8000, () => console.log('API running on port 8000'));
