const User= require('../../models/user/userScherma');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;

    // Validation
    if (!fullName || !phone || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already registered.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      phone,
      email,
      password: hashedPassword,
    });

    console.log('New User:', newUser);
    
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};