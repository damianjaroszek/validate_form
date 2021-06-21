// (function() {
    
var form = document.querySelector("#myForm"),
    fields = form.querySelectorAll("[data-error]"),
    container = document.querySelector(".container");
    var isUlExsist = document.querySelectorAll("ul");

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var errors = [];

        // function isEmpty(field){
        //     if (field.value.length>0){
        //         return false;
        //     }else{
        //         return true;
        //     }
        // }

        function isEmpty(field){
            return !(field.value.length>0) //funkcja ma zwrócić true lub false, krótszy zapis
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
           var isValid = false;

           if (field.type==="text" || field.type==="select-one"){ 
                isValid = isEmpty(field);
            }

           else if (field.type==="email"){
                isValid = isEmailCorrect(field);        
            }

            else if (field.type==="textarea"){
                isValid = atLeast(field, 3);      
            }


            if (isValid){   // działa bo to sobie leci w pętli pamiętaj, że field = fields[0]
                errors.push(field.dataset.error);
                field.classList.add("error");
            }
            else{
                field.classList.remove("error");
            }
        }

        function showErrorsList(errors){
           

             var ulCreator = document.createElement("ul");
            ulCreator.classList.add("errors");
            
            for(var i=0; i<errors.length; i++){
                 var liCreator = document.createElement("li");
                 var content = document.createTextNode(errors[i]);
                 liCreator.appendChild(content);
                 ulCreator.appendChild(liCreator);
                 //form.appendChild(ulCreator);
                container.insertBefore(ulCreator, form);   
            }
        }

        showErrorsList(errors);

        console.log(errors);
        

        


    }, false);

    console.log(isUlExsist);

    