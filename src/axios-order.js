import axios from 'axios';

const instance=axios.create({
    baseURL:'https://burgerbuilder-f662b.firebaseio.com/'
})

export default instance;