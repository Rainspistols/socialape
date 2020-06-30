const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
// admin.initializeApp();
admin.initializeApp({
  credential: admin.credential.cert(require('../key/admin.json')),
});

const firebaseConfig = {
  apiKey: 'AIzaSyCnorel9yReJpDEhRUBpeZmah1pZmBlrbw',
  authDomain: 'socialape-4a360.firebaseapp.com',
  databaseURL: 'https://socialape-4a360.firebaseio.com',
  projectId: 'socialape-4a360',
  storageBucket: 'socialape-4a360.appspot.com',
  messagingSenderId: '748653335808',
  appId: '1:748653335808:web:7a971a6e4626f203ec4fe5',
};

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/screams', (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamsId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection('screams')
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: 'something went wrong' });
      console.error(err);
    });
});

//Singup route
app.post('/signup', (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  //TODO: validate data
  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: `Email is already is use` });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region('europe-west3').https.onRequest(app);
