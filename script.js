// ===============================
// IMPORTS
// ===============================

import { app, db } from "./firebase.js";

import furnitureItems from "./furniture.js";

import {
getAuth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {
doc,
setDoc,
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// ===============================
// FIREBASE AUTH
// ===============================

const auth = getAuth(app);


console.log("SCRIPT CONNECTED ✅");

// ===============================
// AI IMAGE GENERATOR
// ===============================


async function generateImage(){


const promptInput = document.getElementById("prompt");

const result = document.getElementById("result");


if(!promptInput || !result){

return;

}


const userPrompt = promptInput.value;


if(userPrompt === ""){


alert("Please enter design description");

return;


}


result.innerHTML = `

<h3>
🚀 Creating AI Design...
</h3>

<p>
Please wait...
</p>

`;



try{


const response = await fetch("/api/generate",{


method:"POST",


headers:{


"Content-Type":"application/json"


},


body:JSON.stringify({


prompt:userPrompt


})


});



const data = await response.json();



if(data.image){


result.innerHTML = `

<div class="result-card">


<h3>
✨ Your AI Design
</h3>


<img src="${data.image}" 
style="width:100%;border-radius:20px;">


</div>

`;


}else{


result.innerHTML="❌ Image not generated";


}



}catch(error){


console.log(error);


result.innerHTML="❌ Server Error";


}


}



window.generateImage = generateImage;

// ===============================
// AUTH SYSTEM
// ===============================


const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const authMessage = document.getElementById("authMessage");



// CREATE ACCOUNT

document.getElementById("signupBtn")?.addEventListener("click",()=>{


createUserWithEmailAndPassword(

auth,

emailInput.value,

passwordInput.value

)


.then(async(userCredential)=>{


await setDoc(

doc(db,"users",userCredential.user.uid),

{

email:userCredential.user.email,

plan:"Free",

createdAt:new Date().toISOString()

}

);


authMessage.innerHTML="✅ Account Created";


})


.catch(error=>{


authMessage.innerHTML=error.message;


});


});




// LOGIN

document.getElementById("loginBtn")?.addEventListener("click",()=>{


signInWithEmailAndPassword(

auth,

emailInput.value,

passwordInput.value

)


.then(()=>{


authMessage.innerHTML="✅ Login Successful";


})


.catch(error=>{


authMessage.innerHTML=error.message;


});


});




// LOGOUT

document.getElementById("logoutBtn")?.addEventListener("click",()=>{


signOut(auth)


.then(()=>{


authMessage.innerHTML="👋 Logged Out";


});


});




// CHECK USER LOGIN

onAuthStateChanged(auth,(user)=>{


const userProfile = document.getElementById("userProfile");

const userEmail = document.getElementById("userEmail");



if(user){


if(userProfile){

userProfile.style.display="block";

}


if(userEmail){

userEmail.innerHTML="Logged in as: "+user.email;

}


}else{


if(userProfile){

userProfile.style.display="none";

}


}


});

// ===============================
// USER PROFILE + DASHBOARD
// ===============================


const profileName = document.querySelector("#userProfile h3");

const userEmailDisplay = document.getElementById("userEmail");



// LOAD SAVED USER NAME

window.addEventListener("load",()=>{


const savedName = localStorage.getItem("userName");


if(savedName && profileName){


profileName.innerHTML =
"Welcome, " + savedName + " 👋";


}



});




// PROFILE EDIT BUTTON

const editProfileBtn = document.getElementById("editProfileBtn");

const profileModal = document.getElementById("profileModal");

const closeProfileBtn = document.getElementById("closeProfileBtn");

const saveProfileBtn = document.getElementById("saveProfileBtn");

const newName = document.getElementById("newName");



editProfileBtn?.addEventListener("click",()=>{


if(profileModal){

profileModal.style.display="flex";

}


});




closeProfileBtn?.addEventListener("click",()=>{


if(profileModal){

profileModal.style.display="none";

}


});





saveProfileBtn?.addEventListener("click",()=>{


if(newName.value){


localStorage.setItem(
"userName",
newName.value
);



if(profileName){


profileName.innerHTML =
"Welcome, "+newName.value+" 👋";


}



profileModal.style.display="none";


}


});




// PROJECT COUNTER

const designCount =
document.getElementById("designCount");



let totalDesigns =
localStorage.getItem("designCount") || 0;



if(designCount){


designCount.innerHTML = totalDesigns;


}

// ===============================
// FURNITURE LIBRARY
// ===============================


const furnitureGrid = document.getElementById("furnitureGrid");


if(furnitureGrid){


furnitureItems.forEach(item=>{


furnitureGrid.innerHTML += `


<div class="furniture-card">


<img src="${item.image}">


<h3>
${item.name}
</h3>


<p>
${item.category}
</p>


<button>
Add To Room
</button>


</div>


`;


});


}

// ===============================
// AI CHAT DESIGNER
// ===============================


const sendPromptBtn = document.getElementById("sendPrompt");

const userPromptInput = document.getElementById("userPrompt");

const chatBox = document.getElementById("chatBox");



if(sendPromptBtn){


sendPromptBtn.addEventListener("click",()=>{


const prompt = userPromptInput.value;



if(prompt === ""){


alert("Please enter your design idea");

return;


}




// USER MESSAGE

chatBox.innerHTML += `


<div class="ai-message">


You: ${prompt}


</div>


`;




// AI RESPONSE DEMO

setTimeout(()=>{


chatBox.innerHTML += `


<div class="ai-message">


✨ Creating your dream design...


</div>


`;



chatBox.scrollTop = chatBox.scrollHeight;



},800);




userPromptInput.value="";



});


}

// ===============================
// DASHBOARD ANALYTICS
// ===============================

window.addEventListener("load",()=>{

const favoriteCount=document.getElementById("favoriteCount");

const downloadCount=document.getElementById("downloadCount");

const todayCount=document.getElementById("todayCount");

if(favoriteCount){

let fav=JSON.parse(localStorage.getItem("favorites"))||[];

favoriteCount.innerHTML=fav.length;

}

if(downloadCount){

downloadCount.innerHTML=localStorage.getItem("downloads")||0;

}

if(todayCount){

todayCount.innerHTML=localStorage.getItem("todayDesigns")||0;

}

});

// ===============================
// PROJECT SEARCH
// ===============================

const search=document.getElementById("projectSearch");

search?.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".gallery-card").forEach(card=>{

card.style.display=

card.innerText.toLowerCase().includes(value)

?

"block"

:

"none";

});

});