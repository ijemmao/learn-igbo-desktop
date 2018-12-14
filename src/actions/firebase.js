import * as firebase from 'firebase'
import serviceAccount from './../assets/data/firebase.json'

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://learn-igbo-1543470589176.firebaseio.com"
// })

firebase.initializeApp(serviceAccount)

export default firebase