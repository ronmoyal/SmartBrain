import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const handleSignIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }
  
      try{
        const user = await User.findOne({ email: email }).exec();
        if(user){
            const isValidPassword = await bcrypt.compare(password, user.password);

            if (isValidPassword) {
                // Passwords match, user authenticated
                res.status(200).json({ message: 'User authenticated.', user });
              } else {
                // Passwords don't match, user not authenticated
                res.status(401).json({ message: 'Invalid email or password.' });
              }
            } else {
              // User not found in database
              res.status(404).json({ message: 'User not found.' });
            }
          } catch (err) {
            res.status(500).json({ message: 'An error occurred.', error: err });
          }
        };


    export default {handleSignIn};
