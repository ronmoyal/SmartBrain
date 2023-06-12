import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'; // import mongoose
import dotenv from 'dotenv';

import register from './controllers/register.js';
import signin from './controllers/signin.js';
import image from './controllers/image.js'

dotenv.config();

// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const app = express();
app.use(cors())
app.use(express.json());  // This is to parse the JSON body

app.post('/register',  register.handleRegister );
app.post('/signin',  signin.handleSignIn );
app.post('/image', image.handleImage); 


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});