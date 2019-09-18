import axios from 'axios'; 

const headers = {
    'Content-Type': 'application/json'
}

let url = "https://snapchat.improve-code.net/";

export default {
    login : function(email, password) {
        return axios.post(url + 'connection', {
            'email': email, 
            'password' : password
        }, {
            headers :headers
        })
    }, 
    signup : function(send) {
        return axios.post(url + 'inscription', send, {headers: headers})
    },
    all : function (token){
        Token = {"token" : token}
        return axios.get(url + 'all', {headers: Token})
    }
}
