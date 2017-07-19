import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : 'iView project';
    window.document.title = title;
};
//https://www.beantu.cc/post/
const ajaxUrl = env === 'development' ?
    'http://106.14.15.78:9999' :
    env === 'production' ?
    'http://106.14.15.78:9999' :
    'http://106.14.15.78:9999';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

export default util;