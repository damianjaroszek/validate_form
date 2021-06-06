// (function() {

var form = document.querySelector("#myForm"),
    fields = form.querySelectorAll("[data-error]");



function isEmpty(fields){
    //console.log(fields.value)
if (fields.value !==''){
    return true;
}
else{ 
    return false;
}
}    

var tableError = [];
var textNodes = [];
var liTable = [];

form.addEventListener("submit", function(e){

      
    e.preventDefault();

    for (var i=0; i<fields.length; i++){
    if(isEmpty(fields[i])==false){
        tableError.push(fields[i].dataset.error);
    }
    }


for(var k=0; k<fields.length; k++){
    
    textNodes.push(document.createTextNode(tableError[k]));
}
 

for(var j=0; j<textNodes.length; j++){

    console.log(textNodes[j]);
    var li = document.createElement("li");

    li.appendChild(document.createTextNode(textNodes[j].textContent));
    form.appendChild(li);
}
 
tableError.length=0;
textNodes.length=0;
liTable.length=0;

}, false)




// })();