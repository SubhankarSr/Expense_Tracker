let editId = null;

let expenses =
JSON.parse(
localStorage.getItem("expenses")
) || [];

const form =
document.getElementById("expenseForm");

const tbody =
document.getElementById("tbody");

const totalExpense =
document.getElementById("totalExpense");

const totalTransactions =
document.getElementById("totalTransactions");

const search =
document.getElementById("search");

const themeBtn =
document.getElementById("themeBtn");

const filterCategory =
document.getElementById("filterCategory");

const minAmount =
document.getElementById("minAmount");

const maxAmount =
document.getElementById("maxAmount");

const applyFilter =
document.getElementById("applyFilter");

const logoutBtn =
document.getElementById("logoutBtn");

const exportBtn =
document.getElementById("exportBtn");

const clearBtn =
document.getElementById("clearBtn");



// LOGIN PROTECTION

if(
!localStorage.getItem("user")
){

window.location.href=
"index.html";

}



// ADD / UPDATE

form.addEventListener(
"submit",
function(e){

e.preventDefault();

let expense={

id:
editId || Date.now(),

amount:
document.getElementById("amount").value,

category:
document.getElementById("category").value,

date:
document.getElementById("date").value,

description:
document.getElementById("description").value,

payment:
document.getElementById("payment").value

};


if(editId){

expenses=
expenses.map(item=>

item.id===editId
? expense
: item

);

editId=null;

}
else{

expenses.push(expense);

}

saveData();

showExpenses();

updateChart();

form.reset();

}

);




// SAVE

function saveData(){

localStorage.setItem(

"expenses",

JSON.stringify(expenses)

);

}




// SHOW

function showExpenses(data=expenses){

tbody.innerHTML="";

let total=0;


if(data.length===0){

tbody.innerHTML=`

<tr>

<td colspan="6">

No Transactions Found

</td>

</tr>

`;

}


data.forEach(item=>{

total +=
Number(item.amount);


tbody.innerHTML +=`

<tr>

<td>₹${item.amount}</td>

<td>${item.category}</td>

<td>${item.date}</td>

<td>${item.description}</td>

<td>${item.payment}</td>

<td>

<button
onclick=
"editExpense(${item.id})">

Edit

</button>

<button
onclick=
"deleteExpense(${item.id})">

Delete

</button>

</td>

</tr>

`;

});


totalExpense.innerText=
`₹${total}`;

totalTransactions.innerText=
data.length;

}





// EDIT

function editExpense(id){

let expense=

expenses.find(
item=>item.id===id
);

document.getElementById(
"amount"
).value=
expense.amount;

document.getElementById(
"category"
).value=
expense.category;

document.getElementById(
"date"
).value=
expense.date;

document.getElementById(
"description"
).value=
expense.description;

document.getElementById(
"payment"
).value=
expense.payment;

editId=id;

}





// DELETE

function deleteExpense(id){

expenses=

expenses.filter(
item=>item.id!==id
);

saveData();

showExpenses();

updateChart();

}





// SEARCH

search.addEventListener(

"keyup",

function(){

let value=

search.value
.toLowerCase();

let filtered=

expenses.filter(item=>

item.description
.toLowerCase()
.includes(value)

||

item.category
.toLowerCase()
.includes(value)

);

showExpenses(filtered);

}

);




// FILTER

applyFilter.onclick=()=>{

let filtered=

expenses.filter(item=>{

let categoryMatch=

filterCategory.value==="all"

||

item.category===
filterCategory.value;


let minMatch=

minAmount.value===""

||

Number(item.amount)
>=
Number(minAmount.value);


let maxMatch=

maxAmount.value===""

||

Number(item.amount)
<=
Number(maxAmount.value);


return(

categoryMatch
&&
minMatch
&&
maxMatch

);

});

showExpenses(filtered);

};




// EXPORT CSV

exportBtn.onclick=()=>{

let csv=

"Amount,Category,Date,Description,Payment\n";

expenses.forEach(item=>{

csv +=

`${item.amount},
${item.category},
${item.date},
${item.description},
${item.payment}\n`;

});

let blob=

new Blob(
[csv],
{type:"text/csv"}
);

let a=

document.createElement(
"a"
);

a.href=
URL.createObjectURL(blob);

a.download=
"expenses.csv";

a.click();

};




// CLEAR ALL

clearBtn.onclick=()=>{

if(
confirm(
"Delete all expenses?"
)
){

expenses=[];

saveData();

showExpenses();

updateChart();

}

};




// DARK MODE

themeBtn.onclick = ()=>{

document.body.classList.toggle(
"dark"
);

localStorage.setItem(

"theme",

document.body.classList.contains(
"dark"
)

);

};


window.onload=()=>{

if(

localStorage.getItem(
"theme"
)==="true"

){

document.body.classList.add(
"dark"
);

}

};




// LOGOUT

logoutBtn.onclick=()=>{

localStorage.removeItem(
"user"
);

window.location.href=
"index.html";

};




// LOAD

showExpenses();

updateChart();