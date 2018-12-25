import firebase from 'firebase'

const provider = new firebase.auth.GoogleAuthProvider()

const createGoogleUser = () => {
  const createGoogleUserPromise = new Promise((resolve, reject) => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      const { user } = result;
      resolve(user)
    }).catch((error) => {
      reject(error)
    });
  })
  return createGoogleUserPromise
}

const getGoogleUser = () => {
  const getGoggleUserPromise = new Promise((resolve) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(user)
      } else {
        resolve(null)
      }
    });
  })
  return getGoggleUserPromise
}

const signOutGoogleUser = () => {
  const signOutGoogleUserPromise = new Promise((resolve, reject) => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      resolve(null)
    }).catch((error) => {
      // An error happened.
      reject(error)
    });
  })
  return signOutGoogleUserPromise
}

export default { createGoogleUser, getGoogleUser, signOutGoogleUser }
