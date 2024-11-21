const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mongoose-express')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.post('/api/users', async (req, res) => {
  try {
    const user =await User.create(req.body);
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));