const jwt = require('jsonwebtoken');
const secretKey = 'mysecretkey';
const users = []; // Array to store registered users

// Task 6: Register New user

exports.signup = (req, res) => {
  // Extract user information from the request body
  const { username, password } = req.body;

  // Check if the username is already taken
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  // Create a new user object
  const newUser = { username, password };

  // Store the new user in the users array
  users.push(newUser);
  console.log(users);

  res.json({ message: 'User registered successfully', users: users });
};

// Task 7: Login as a Registered user
exports.login = (req, res) => {
  // Extract user information from the request body
  const { username, password } = req.body;

  // Find the user with the matching username and password
  const user = users.find(
    user => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // Generate a JWT token with the user's username and a secret key
  const token = jwt.sign({ username: user.username }, secretKey, {
    expiresIn: '1h',
  });

  // Include the token in the response
  res.json({ message: 'Login successful', token });
};
