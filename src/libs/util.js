import axios from 'axios';
import env from '../config/env';

let util = {

};
//https://www.beantu.cc/post/
const ajaxUrl = env === 'development' ?
    'http://106.14.15.78:9999' :
    env === 'production' ?
    'https://www.beantu.cc/new' :
    'https://www.beantu.cc/new';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;
