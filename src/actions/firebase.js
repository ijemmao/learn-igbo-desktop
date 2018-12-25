import * as firebase from 'firebase'
import serviceAccount from '../assets/data/firebase.json'

firebase.initializeApp(serviceAccount)

export default firebase

// "build": "NODE_ENV=production webpack --colors",
