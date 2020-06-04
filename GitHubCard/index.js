/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
// axios.get("https://api.github.com/users/cristina-altreche").then((response) => {
//   console.log("the response from the API, organized for us by axios", response);
//   const userObj = response.data.avatar_URL;

//   const userCard = cardMaker();
// });
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  "cristina-altreche",
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell",
];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
let container = document.querySelector(".cards");

function cardCreator(attr) {
  //elements created
  let {
    imageURL,
    name,
    userName,
    userLocation,
    userURL,
    followers,
    following,
    userBio,
  } = attr;

  let cardDiv = document.createElement("div");
  let img = document.createElement("img");
  let cardInfoDiv = document.createElement("div");
  let h3 = document.createElement("h3");
  let pUsername = document.createElement("p");
  let pLocation = document.createElement("p");
  let pProfile = document.createElement("p");
  let aTag = document.createElement("a");
  let pFollowers = document.createElement("p");
  let pFollowing = document.createElement("p");
  let pBio = document.createElement("p");

  //html created
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardInfoDiv);
  cardInfoDiv.appendChild(h3);
  cardInfoDiv.appendChild(pUsername);
  cardInfoDiv.appendChild(pLocation);
  cardInfoDiv.appendChild(pProfile);
  pProfile.appendChild(aTag);
  cardInfoDiv.appendChild(pFollowers);
  cardInfoDiv.appendChild(pFollowing);
  cardInfoDiv.appendChild(pBio);

  //classes
  cardDiv.classList.add("card");
  cardInfoDiv.classList.add("card-info");
  h3.classList.add("name");
  pUsername.classList.add("username");

  //content
  img.src = imageURL;
  h3.textContent = name;
  pUsername.textContent = userName;
  pLocation.textContent = `Location: ${userLocation}`;
  pProfile.textContent = `Profile: ${userURL}`;
  aTag.href = userURL;
  aTag.textContent = userURL;
  pFollowers.textContent = `Followers: ${followers}`;
  pFollowing.textContent = `Following: ${following}`;
  pBio.textContent = `Bio: ${userBio}`;

  return cardDiv;
}

// TESTING cardCreator function
// const theTestCard = cardCreator({
//   imageURL: "www",
//   name: "Cristina",
//   userName: "Tina",
//   userLocation: "Vineland",
//   userURL: "www2",
//   followers: "1",
//   following: "3",
//   userBio: "ladingaonngadfogna",
// });
// console.log("these are elements created with cardMaker", theTestCard);
function getUsers(followersArray) {
  let followersArr = followersArray;
  for (let i = 0; i < followersArr.length; i++) {
    axios
      .get(`https://api.github.com/users/${followersArr[i]}`)

      .then((response) => {
        console.log(
          "the response from the API, organized for us by axios",
          response
        );
        const imageURL = response.data.avatar_url;
        const name = response.data.login;
        const userName = response.data.name;
        const userLocation = response.data.location;
        const userURL = response.data.html_url;
        const followers = response.data.followers;
        const following = response.data.following;
        const userBio = response.data.bio;
        const userObj = {
          imageURL,
          name,
          userName,
          userLocation,
          userURL,
          followers,
          following,
          userBio,
        };

        //Step4 append to DOM from axios
        const newCard = cardCreator(userObj);
        container.appendChild(newCard);
      })
      .catch((error) => {
        console.log(
          "something went wrong, hopefully the error tells us what",
          error
        );
      });
  }
}
getUsers(followersArray);

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
