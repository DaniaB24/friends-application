const cardsOfFriends = document.getElementById("all_humans");
const searchBar = document.getElementById("search");
const filterMenu = document.getElementById("filter_menu");
const checkboxesGender = document.querySelector(".gender_checkbox");
let friends;
// let filteredUsers;
// let searchedFriend;
function startApp() {
  const URL = "https://randomuser.me/api?results=10";
  fetch(URL)
    .then(handleErrors)
    .then((response) => response.json())
    .then((users) => {
      friends = users.results;
      displayUsers(friends);
      searchFriends(friends);

      filterMenu.addEventListener("click", (event) => {
        setFilters(event, friends);
      });
    });
  // .catch((error) => {
  //   return error.message;
  // });
}
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function setFilters({ target }, friends) {
  if (target.closest(".filter_sort")) {
    const sortedResults = sortFriends(target, friends);
    displayUsers(sortedResults);
    filterByGender(sortedResults);
  }
}

function displayUsers(friends) {
  const userCards = friends
    .map((item) => {
      return `
    <div class="card_person">
    <div class="card_container">
    <img src="${item.picture.large}">
    <h3 class="card_name">${item.name.first} ${item.name.last}</h3>
    <p class="card_age">Age: ${item.dob.age}</p>
    <p class="card_gender">Gender: ${item.gender}</p>
    </div>
    </div>`;
    })
    .join("");
  cardsOfFriends.innerHTML = userCards;
}

function sortByAge(a, b) {
  return a.dob.age > b.dob.age ? 1 : -1;
}
function sortByName(a, b) {
  return a.name.first.localeCompare(b.name.first);
}
function sortFriends(target, friends) {
  const button = target.id;
  switch (button) {
    case "a-z":
      friends.sort(sortByName);
      break;
    case "z-a":
      friends.sort((a, b) => sortByName(b, a));

      break;
    case "0-9":
      friends.sort((a, b) => sortByAge(a, b));

      break;
    case "9-0":
      friends.sort((a, b) => sortByAge(b, a));

      break;
  }
  return friends;
}
function sortByAge(a, b) {
  return a.dob.age > b.dob.age ? 1 : -1;
}

function filterByGender(friends) {
  const checkboxes = Array.from(
    document.querySelectorAll(".gender_checkbox:checked")
  );
  let filteredUsers = friends.filter((item) =>
    checkboxes.some((gender) => item.gender === gender.value)
  );
  console.log(filteredUsers);
  displayUsers(filteredUsers);
  searchFriends(filteredUsers);
}

function searchFriends(friends) {
  searchBar.addEventListener("input", (e) => {
    const search = e.target.value.toLowerCase();
    let searchedFriend = friends.filter((item) => {
      const { first: firstName, last: lastName } = item.name;
      return `${firstName} ${lastName}`.toLowerCase().includes(search);
    });
    displayUsers(searchedFriend);
    // filterByGender(searchedFriend);
    console.log(searchedFriend);
    // filterByGender(searchedFriend);
  });
}
startApp();
