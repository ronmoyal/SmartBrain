import User from '../models/user.js';
import bcrypt from 'bcryptjs';

const handleRegister = async (req, res) => {
  const { email, password ,name} = req.body;
  if (!name || !email || !password) {
    return res
    .status(400)
    .json('incorrect form submission');  
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name,
      password: hash,
      email: email,
    });

    res.status(201).json({ message: 'User Create.', user });
  } catch (err) {
    res.status(400).json('unable to register');
  }
};

export default {handleRegister};
