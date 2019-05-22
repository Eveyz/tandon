import axios from 'axios'

const token = document.querySelector('[name="csrf-token"]') || {content: 'no-csrf-token'}
const ax = axios.create({
  headers: {
    common: {
      'X-CSRF-Token': token.content
    },
    'Content-Type': 'application/json',
    // 'Accept': 'application/json',
  }
})

export default ax