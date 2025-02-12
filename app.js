const express = require('express');
const { sequelize } = require('./server/models/user');
const authRoutes = require('./server/routes/authRoutes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting view engine ke Pug
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'pug');

// Static files (CSS, JS)
app.use(express.static(path.join(__dirname, './client/css')));
app.use(express.static(path.join(__dirname, './client/js')));

// *** THIS IS THE CORRECT WAY TO RENDER index.pug ***
app.get('/', (req, res) => {
  console.log('Rendering index.pug'); // Debugging
  res.render('index'); // Use res.render, not res.redirect
});

app.get('/login', (req, res) => {
  console.log('Rendering login.pug');
  res.render('login');
});

app.get('/register', (req, res) => {
  console.log("Rendering register.pug");
  res.render('register');
});

app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data kelas' });
  }
});

app.use('/auth', authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
});