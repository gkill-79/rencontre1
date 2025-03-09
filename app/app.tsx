const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/rencontre1', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connecté à MongoDB'))
.catch(err => console.error('Erreur de connexion à MongoDB:', err));

// Configuration du middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des vues
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configuration des sessions
app.use(session({
  secret: 'votre_secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/rencontre1' }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 jour
}));

// Middleware pour vérifier l'authentification
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

// Routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// Route principale - page avec carousel
app.get('/', isAuthenticated, async (req, res) => {
  try {
    const User = require('./models/user');
    const users = await User.find({ _id: { $ne: req.session.user._id } }).limit(10);
    res.render('home', { currentUser: req.session.user, users });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).send('Erreur du serveur');
  }
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});