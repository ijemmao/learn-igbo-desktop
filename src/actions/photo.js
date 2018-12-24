import firebase from 'firebase'

const database = firebase.database()

const postPhotoResult = (uid, data) => {
  const postKey = database.ref().child(`${uid}/photos`).push().key
  database.ref(`${uid}/photos/${postKey}`).set(data)
}

const getPhotoResults = (uid) => {
  const promise = new Promise((resolve, reject) => {
    database.ref(`${uid}/photos`).once('value').then((snapshot) => {
      const value = snapshot.val()
      resolve(value)
    })
      .catch((error) => {
        reject(error)
      })
  })
  return promise
}

export default { postPhotoResult, getPhotoResults }
