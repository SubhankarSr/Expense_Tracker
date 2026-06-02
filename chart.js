let chart;

function updateChart(){

let ctx =
document.getElementById(
"expenseChart"
);

let categoryTotals = {};


expenses.forEach(item=>{

if(
categoryTotals[item.category]
){

categoryTotals[item.category] +=
Number(item.amount);

}
else{

categoryTotals[item.category] =
Number(item.amount);

}

});



if(chart){

chart.destroy();

}


chart = new Chart(ctx,{

type:"pie",

data:{

labels:
Object.keys(
categoryTotals
),

datasets:[{

label:"Expenses",

data:
Object.values(
categoryTotals
)

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

position:"bottom"

}

}

}

});

}


updateChart();