const express = require('express');
const path = require('path');
const app = express();
const route = require('./routes/client/index.route');

const PORT = process.env.PORT;

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the news-events router
route(app)



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
