const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const profileDiv = document.getElementById("profile");

searchBtn.addEventListener("click", async () => {
  const username = usernameInput.value.trim();
  if (!username) return;

  profileDiv.innerHTML = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    if (response.ok) {
      profileDiv.innerHTML = `
        <img src="${data.avatar_url}">
        <h3>${data.name || data.login}</h3>
        <p>${data.bio || "No bio available"}</p>
        <p>Followers: ${data.followers}</p>
        <p>Public Repos: ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">View Profile</a>
      `;
    } else {
      profileDiv.innerHTML = "User not found!";
    }

  } catch (error) {
    profileDiv.innerHTML = "Error fetching data!";
  }
});
