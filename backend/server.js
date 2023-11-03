////Declare the variables
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const csurf = require('csurf');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;
app.use('/uploads', express.static('uploads'));
const MovieRouter = require('./Routes/Movie')
const CategoryRouter = require('./Routes/Category')
const HallRouter = require('./Routes/MovieHall')
const ShowRouter = require('./Routes/Show')
const BookingRouter = require('./Routes/Booking')
const UserRouter = require('./Routes/users')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const cors = require('cors');
const bodyparser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
app.use(cors());
app.use(bodyparser.json());


// Middleware to set Content-Type header
app.use((req, res, next) => {
  // Set Content-Type header to 'text/html' for all web pages
  res.header('Content-Type', 'text/html');
  next();
});

// Middleware to set X-Content-Type-Options header
app.use((req, res, next) => {
  // Set X-Content-Type-Options header to 'nosniff'
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});


// Disable the X-Powered-By header
app.disable('x-powered-by');


// Serve static files from the 'uploads' folder
app.use(express.static(path.join(__dirname, 'uploads')));

// Set X-Frame-Options header to 'DENY' to prevent framing
// security feature that helps prevent clickjacking attacks by controlling whether a page can be displayed in a frame or iframe.
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

//whitelisted IP
const whitelist = ['127.0.0.1', '::1'];

const whitelistMiddleware = (req, res, next) => {
  const clientIP = req.ip; // Extract the client's IP address

  if (whitelist.includes(clientIP)) {
    // IP is in the whitelist, proceed to the next middleware
    next();
  } else {
    // IP is not in the whitelist, send a 403 Forbidden response

    res.status(403).send('Forbidden');
  }
};

app.use(whitelistMiddleware);

// Enable CSRF protection
const csrfProtection = csurf({ cookie: true });
app.use(cookieParser());
app.use(
  session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: false,
  }),
);
// Set Content-Security-Policy and other security related error to avoid xss attcks 
app.use(helmet());

// Set Content-Security-Policy header
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 'default-src \'self\' http://localhost:3000');
  next();
});


////connect to mongoDB
mongoose.connect(URL, (err) => {
  if (err) throw err;
  console.log('connected to MongoDB');
});

app.get('/api/csrf-token', csrfProtection, (req, res) => {
  // Provide CSRF token to the client
  res.json({ csrfToken: req.csrfToken() });
});


app.use('/movies', MovieRouter)
app.use('/categories', CategoryRouter)
app.use('/hall', HallRouter)
app.use('/show', ShowRouter)
app.use('/booking', BookingRouter)
app.use('/user', UserRouter);


////create server with port numebr 
app.listen(PORT, () => {
  console.log(`service is up and running on port ${PORT}`);
});
