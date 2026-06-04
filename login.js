const loginForm =
document.getElementById("loginForm");

loginForm.addEventListener(
"submit",
function(e){

e.preventDefault();

const email =
document.getElementById("email")
.value.trim();

const password =
document.getElementById("password")
.value.trim();

const button =
document.querySelector("button");

const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;


if(email==="" || password===""){

showMessage(
"Please fill all fields",
"red"
);

return;

}

if(!emailPattern.test(email)){

showMessage(
"Enter valid email",
"red"
);

return;

}

button.innerHTML =
"Logging in...";

button.disabled=true;


localStorage.setItem(
"user",
JSON.stringify({

email:email

})
);


setTimeout(()=>{

button.innerHTML=
"Login";

window.location.href=
"dashboard.html";

},1500);

});

function showMessage(msg,color){

let oldMessage=
document.querySelector(
".login-message"
);

if(oldMessage){

oldMessage.remove();

}

const message=
document.createElement("p");

message.innerText=
msg;

message.classList.add(
"login-message"
);

message.style.color=
color;

message.style.marginTop=
"15px";

message.style.textAlign=
"center";

document.querySelector(
".login-box"
)
.appendChild(message);

setTimeout(()=>{

message.remove();

},3000);

}
