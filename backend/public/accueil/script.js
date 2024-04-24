let currentUserId = -1;

function onInit() {

    axios.post('/users')
        .then(response => {
            const users = response.data; // axios automatically parses the JSON
            const tbody = document.getElementById('userTableBody');
            tbody.innerHTML = '';
            users.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <th scope="row">${user.id}</th>
                    <td>${user.pseudo}</td>
                    <td>${user.email}</td>
                    <td>${user.credit}</td>
                    <td>${user.score}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="toggleBanUser(${user.id}, ${user.bannie})">${user.bannie ? 'Débannir' : 'Bannir'}</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Supprimer</button>
<!--                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editCreditModal" onclick="setCurrentUserId(${user.id})">Modifier Crédit</button>-->
<!--                        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editScoreModal" onclick="setCurrentUserId(${user.id})">Modifier Score</button>-->
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error loading the users:', error);
        });
}

// Function to toggle ban status
function toggleBanUser(userId, isBanned) {
    console.log(`Toggling ban status for user ID: ${userId}`, isBanned);
    // Placeholder for an API call
    axios.post('/api/user/ban', { userId, isBanned })
        .then(response => {
            alert('Changement, statut du ban');
            console.log('Ban status changed', response.data);
            onInit();
        })
        .catch(error => console.error('Failed to change ban status:', error.response.data));
}

// Function to delete a user
function deleteUser(userId) {
    console.log(`Deleting user ID: ${userId}`);

    axios.post(`/admin/user/del`, { userId })
        .then(response => {
            alert('Utilisateur supprimé');
            console.log('User deleted', response.data);
            onInit();
        })
        .catch(error => {
            alert(error.response.data)
            console.error('Failed to delete user :', error.response.data)
        });
}

// Function to set the current user ID before modifying credit or score
function setCurrentUserId(userId) {
    console.log(`Setting current user ID to ${userId}`);
    currentUserId = userId;
}