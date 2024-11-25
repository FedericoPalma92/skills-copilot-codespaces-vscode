// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Create array to store comments
const comments = [];

// Create new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  res.status(201).send(comment);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get comment by ID
app.get('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

// Update comment by ID
app.put('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const comment = comments.find((comment) => comment.id === id);
  if (comment) {
    comment.body = req.body.body;
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

// Delete comment by ID
app.delete('/comments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Start web server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
 