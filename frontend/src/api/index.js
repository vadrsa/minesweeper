const apiUrl = 'http://localhost:3030';
console.log(apiUrl);

function handleErrors(data){
    return data.json().then(json => {
        if(!data.ok){
            json.isError = true;
        }
        return json;
    });
}
function saveToken(data){
    if(!data.isError){
        localStorage.setItem('token', data.token)
    }
    return data;
}

async function loginUser(credentials) {
    return fetch(apiUrl+'/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(handleErrors)
    .then(saveToken)
}

async function registerUser(credentials) {
    return fetch(apiUrl+'/users', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(handleErrors)
}

function logoutUser() {
    return localStorage.removeItem('token');
}


function isLoggedIn(){
    return localStorage.getItem('token') != undefined;
}

export default {
    loginUser,
    logoutUser,
    registerUser,
    isLoggedIn
};