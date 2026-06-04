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

const averageExpense =
document.getElementById("averageExpense");

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

const resetBtn =
document.getElementById("resetBtn");

const logoutBtn =
document.getElementById("logoutBtn");

const exportBtn =
document.getElementById("exportBtn");

const clearBtn =
document.getElementById("clearBtn");


/* LOGIN CHECK */

if(!localStorage.getItem("user")){

window.location.href =
"index.html";

}
function showToast(message){

let toast =
document.getElementById("toast");

toast.innerText = message;

toast.style.cssText = `
position:fixed;
bottom:20px;
right:20px;
padding:15px;
border-radius:10px;
background:#2563eb;
color:white;
opacity:1;
transition:.5s;
z-index:1000;
`;

setTimeout(()=>{

toast.style.opacity="0";

},2500);

}
form.addEventListener(
"submit",
function(e){

e.preventDefault();

let amount =
document.getElementById("amount").value;

if(amount<=0){

showToast(
"Enter valid amount"
);

return;

}

let expense={

id:
editId || Date.now(),

amount:amount,

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

expenses =
expenses.map(item=>

item.id===editId
? expense
: item

);

editId=null;

showToast(
"Expense Updated ✅"
);

}
else{

expenses.push(expense);

showToast(
"Expense Added ✅"
);

}

saveData();

showExpenses();

updateChart();

form.reset();

}

);

function saveData(){

localStorage.setItem(
"expenses",
JSON.stringify(expenses)
);

}

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

total += Number(
item.amount
);

tbody.innerHTML += `

<tr>

<td>₹${item.amount}</td>

<td>${item.category}</td>

<td>${item.date}</td>

<td>${item.description}</td>

<td>${item.payment}</td>

<td>

<button onclick=
"editExpense(${item.id})">

Edit

</button>

<button onclick=
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

let avg =
data.length===0
?0
:(total/data.length);

averageExpense.innerText=
`₹${avg.toFixed(0)}`;

}

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

window.scrollTo({

top:0,
behavior:"smooth"

});

showToast(
"Editing Expense..."
);

}

function deleteExpense(id){

expenses=
expenses.filter(
item=>item.id!==id
);

saveData();

showExpenses();

updateChart();

showToast(
"Expense Deleted ❌"
);

}

search.addEventListener(
"keyup",
()=>{

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

resetBtn.onclick=()=>{

filterCategory.value=
"all";

minAmount.value="";

maxAmount.value="";

search.value="";

showExpenses();

showToast(
"Filters Reset"
);

};

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
{
type:"text/csv"
}
);

let a=
document.createElement(
"a"
);

a.href=
URL.createObjectURL(
blob
);

a.download=
"expenses.csv";

a.click();

showToast(
"CSV Downloaded"
);

};

clearBtn.onclick=()=>{

if(confirm(
"Delete all expenses?"
)){

expenses=[];

saveData();

showExpenses();

updateChart();

showToast(
"All Expenses Cleared"
);

}

};

themeBtn.onclick=()=>{

document.body.classList.toggle(
"dark"
);

themeBtn.innerHTML=

document.body.classList.contains(
"dark"
)

? "☀️"
: "🌙";

localStorage.setItem(
"theme",
document.body.classList.contains(
"dark"
)
);

};


window.onload=()=>{

if(localStorage.getItem(
"theme"
)==="true"){

document.body.classList.add(
"dark"
);

themeBtn.innerHTML="☀️";

}

};


logoutBtn.onclick=()=>{

localStorage.removeItem(
"user"
);

window.location.href=
"index.html";

};


showExpenses();
updateChart();
