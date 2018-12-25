import firebase from 'firebase'

const database = firebase.database()

const postSpeechResult = (uid, data) => {
  const postKey = database.ref().child(`${uid}/speech`).push().key
  database.ref(`${uid}/speech/${postKey}`).set(data)
}

const getSpeechResults = (uid) => {
  const promise = new Promise((resolve, reject) => {
    database.ref(`${uid}/speech`).once('value').then((snapshot) => {
      const value = snapshot.val()
      resolve(value)
    })
      .catch((error) => {
        reject(error)
      })
  })
  return promise
}

export default { postSpeechResult, getSpeechResults }
