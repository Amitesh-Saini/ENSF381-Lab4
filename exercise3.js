const userGrid = document.getElementById("userGrid");
const viewToggleBtn = document.getElementById("viewToggleBtn");
const deleteIdInput = document.getElementById("deleteIdInput");
const deleteBtn = document.getElementById("deleteBtn");
const sortByGroupBtn = document.getElementById("sortByGroupBtn");
const sortByIdBtn = document.getElementById("sortByIdBtn");

let users = [];

const API_URL = "https://69a1dd672e82ee536fa268a4.mockapi.io/user_api";

async function retrieveData() {
  try {
    const response = await fetch(API_URL);
    users = await response.json();
    console.log(users);        // REQUIRED screenshot
    render(users);
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
}

retrieveData(); // runs on page load

function render(userArray) {
  userGrid.innerHTML = "";

  userArray.forEach(user => {
    userGrid.innerHTML += `
      <article class="user-card">
        <h3>${user.first_name ?? ""}</h3>
        <p>first_name: ${user.first_name ?? ""}</p>
        <p>user_group: ${user.user_group ?? ""}</p>
        <p>id: ${user.id ?? ""}</p>
      </article>
    `;
  });
}

viewToggleBtn.addEventListener("click", () => {
  if (userGrid.classList.contains("grid-view")) {
    userGrid.classList.remove("grid-view");
    userGrid.classList.add("list-view");
  } else {
    userGrid.classList.remove("list-view");
    userGrid.classList.add("grid-view");
  }
});

sortByGroupBtn.addEventListener("click", () => {
  users.sort((a, b) => a.user_group - b.user_group);
  render(users);
});

sortByIdBtn.addEventListener("click", () => {
  users.sort((a, b) => Number(a.id) - Number(b.id));
  render(users);
});

deleteBtn.addEventListener("click", async () => {
  const idToDelete = deleteIdInput.value;

  if (!idToDelete) {
    console.error("No ID entered");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/${idToDelete}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    users = users.filter(user => user.id !== idToDelete);
    render(users);
    deleteIdInput.value = "";

  } catch (error) {
    console.error("Error deleting user:", error);
  }
});