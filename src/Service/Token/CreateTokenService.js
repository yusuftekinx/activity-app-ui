import axios from 'axios';
const createService = async(name,phone) => {
    return await axios.post('http://localhost:5000/api/token/create',{
        name,
        phone
    })
}


export default createService