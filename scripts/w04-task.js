/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Casey Vince Tan Pag-ong",
    photo: "images/me.jpg",
    favoriteFoods: ['Adobo', 'Sinigang', 'Tinola', 'Paksiw', 'Caldereta'],
    hobbies: ['Playing piano', 'Computer games', 'Riding my bike'],
    placeLived:[],


};



/* Populate Profile Object with placesLiSve objects */
myProfile.placeLived.push(
    {
        place: 'Butuan City, Philippines', 
        length: '20 years', 
    }
)

myProfile.placeLived.push(
    {
        place: 'Cebu City, Philippines', 
        length: '3 years', 
    }
)

myProfile.placeLived.push(
    {
        place: 'Quezon City, Philippines', 
        length: '2 years', 
    }
)

/* DOM Manipulation - Output */
/* Name */
document.querySelector("#name").textContent = myProfile.name;


/* Photo with attributes */
document.querySelector("#photo").src = myProfile.photo;
document.querySelector("#photo").alt = myProfile.name;


/* Favorite Foods List*/
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    document.querySelector('#favorite-foods').appendChild(li);
  });


/* Hobbies List */
myProfile.hobbies.forEach(hobbies => {
    let li = document.createElement('li');
    li.textContent = hobbies;
    document.querySelector('#hobbies').appendChild(li);
  });

/* Places Lived DataList */
myProfile.placeLived.forEach(place => {
    let dt = document.createElement('dt');
    dt.textContent = place.place;
    
    let dd = document.createElement('dd');
    dd.textContent = place.length;
    
    document.getElementById('places-lived').appendChild(dt);
    document.getElementById('places-lived').appendChild(dd);
  });

