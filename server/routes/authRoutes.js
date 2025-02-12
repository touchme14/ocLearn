const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // Untuk hashing password
const { User } = require('../models/user'); // Import model User Anda

// Route untuk halaman login
router.get('/login', (req, res) => {
  res.render('login');
});

// Route untuk halaman registrasi
router.get('/register', (req, res) => {
  res.render('register');
});

// Route untuk proses login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    // Jika user tidak ditemukan atau password salah
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).render('login', { error: 'Email atau password salah' });
    }

    // Jika login berhasil, Anda bisa menambahkan logika untuk menyimpan informasi user di session atau cookie
    // ...

    res.redirect('/'); // Redirect ke halaman utama setelah login berhasil
  } catch (error) {
    console.error(error);
    res.status(500).render('login', { error: 'Terjadi kesalahan saat login' });
  }
});

// Route untuk proses registrasi
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    // Hash password sebelum disimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
      full_name,
      email,
      password: hashedPassword,
    });

    res.redirect('/login'); // Redirect ke halaman login setelah registrasi berhasil
  } catch (error) {
    console.error(error);
    res.status(500).render('register', { error: 'Terjadi kesalahan saat registrasi' });
  }
});

module.exports = router;