import axios from 'axios';

// const url = 'https://learn-igbo.herokuapp.com'
const url = 'http://localhost:8080'

const translateEnglish = (data) => {
  return new Promise((resolve, reject) => {
    axios.get(`${url}/translate`, {
      params: { words: data },
    }).then((res) => {
      resolve(res.data)
    })
    .catch((error) => {
      reject(error);
    })
  })
}

const translate = {
  translateEnglish,
}

export default translate