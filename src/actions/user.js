import firebase from 'firebase'
const provider = new firebase.auth.GoogleAuthProvider()

const createGoogleUser = () => {
  firebase.auth().signInWithPopup(provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    // The signed-in user info.
    let user = result.user;
    console.log(user)
  }).catch(function (error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;

    console.log('User:', email, 'was unable to sign up. Error Code:', errorCode, '. Error Message:', errorMessage)
  });
}

export default { createGoogleUser }