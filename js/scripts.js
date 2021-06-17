// (function() {
    
var form = document.querySelector("#myForm"),
    fields = form.querySelectorAll("[data-error]");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var errors = [];

        function isEmpty(field){
            if (field.value.length>0){
                return false;
            }else{
                return true;
            }
        }

        function isEmailCorrect(field){
            if (field.value.indexOf('@')!=-1 && field.value.indexOf('.')!=-1 && !isEmpty(field)){
                return false;
            }
            else{
                return true;
            }
        }

        function atLeast(field, min){
            if (field.value.length>=min){
                return false;    
            }
            else {
                return true;
            }
        }

        for(var i=0; i<fields.length; i++){
           // console.log(fields[i].dataset.error);
           var field = fields[i];

           if (field.type==="text" || field.type==="select-one"){ 
                if (isEmpty(field)){
                        errors.push(field.dataset.error);
                }
            
            }

            if (field.type==="email"){
                if (/*isEmpty(field) ||*/ isEmailCorrect(field)){
                    errors.push(field.dataset.error);
                }
            }


            if (field.type==="textarea"){
                if (atLeast(field, 3)){
                    errors.push(field.dataset.error);
                }
            }
        }

        console.log(errors);

        


    }, false);