function onInit(){
    sessionStorage.setItem('logOk', false);
}

function login(){
    axios.post('/admin/login', {
        pseudo: document.getElementById('username').value,
        email: document.getElementById('password').value
    }).then(res => {
        if(res.data.message === 'success'){
            console.log('Connexion réussie', res.data.value);
            sessionStorage.setItem('logOk', true);
            window.location.href = '/accueil';
        } else {
            console.error('Erreur lors de la connexion');
            sessionStorage.setItem('logOk', false);
        }
    });
}