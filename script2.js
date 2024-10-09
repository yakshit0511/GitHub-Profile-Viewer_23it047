document.getElementById('github-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    fetchGitHubProfile(username);
});

function fetchGitHubProfile(username) {
    const url = `https://api.github.com/users/${username}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => displayProfile(data))
        .catch(error => {
            document.getElementById('profile').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayProfile(data) {
    const profileDiv = document.getElementById('profile');
    profileDiv.innerHTML = `
        <h2>${data.login}</h2>
        <img src="${data.avatar_url}" alt="${data.login}'s avatar" width="150">
        <p><strong>Followers:</strong> ${data.followers}</p>
        <p><strong>Public Repositories:</strong> ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
    `;
}
