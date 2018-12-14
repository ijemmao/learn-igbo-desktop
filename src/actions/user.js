import firebase from 'firebase'
const provider = new firebase.auth.GoogleAuthProvider()

const createGoogleUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      let token = result.credential.accessToken;
      let user = result.user;
      resolve(user)
    }).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      let email = error.email;
      let credential = error.credential;
  
      reject('User:', email, 'was unable to sign up. Error Code:', errorCode, '. Error Message:', errorMessage)
    });
  })
}

const getGoogleUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
    });
  })
}

const signOutGoogleUser = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
      resolve(null)
    }).catch(function (error) {
      // An error happened.
      reject(error)
    });
  })
}

export default { createGoogleUser, getGoogleUser, signOutGoogleUser }