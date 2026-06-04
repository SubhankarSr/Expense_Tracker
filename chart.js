let chart;

function updateChart(){

const ctx =
document.getElementById(
"expenseChart"
);

let categoryTotals = {};

expenses.forEach(item=>{

if(categoryTotals[item.category]){

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

if(Object.keys(
categoryTotals
).length===0){

chart = new Chart(ctx,{

type:"doughnut",

data:{

labels:["No Data"],

datasets:[{

data:[1],

backgroundColor:[
"#475569"
],

borderWidth:0

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

labels:{
color:"white"
}

}

}

}

});

return;

}

chart = new Chart(ctx,{

type:"doughnut",

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
),

backgroundColor:[

"#3b82f6",
"#06b6d4",
"#8b5cf6",
"#f59e0b",
"#10b981",
"#ef4444"

],

borderWidth:2,

hoverOffset:20

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

cutout:"60%",

animation:{

animateRotate:true,
duration:1500

},

plugins:{

legend:{

position:"bottom",

labels:{

color:"white",

padding:20,

font:{

size:13

}

}

},

tooltip:{

backgroundColor:"#0f172a",

titleColor:"#fff",

bodyColor:"#fff"

}

}

}

});

}

updateChart();
