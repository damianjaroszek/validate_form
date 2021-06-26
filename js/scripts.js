// (function() {
    
var form = document.querySelector("#myForm"),
    fields = form.querySelectorAll("[data-error]"),
    container = document.querySelector(".container");
    var isUlExsist = document.querySelectorAll("ul");

    form.addEventListener("submit", function(e){
        e.preventDefault(); //zapobieganie domyślnej akcji przeglądarki - blokujemy submit, żeby
                           // uwzględnić warunki, po których ma nastapić subbmit (walidacja)

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
            } //jeżeli pole field zawiera jakiekolwiek znaki zwróć false bo zaprzeczenie (można zrobić odwrotnie)
        

        function isEmailCorrect(field){
            if (field.value.indexOf('@')!=-1 && field.value.indexOf('.')!=-1 && !isEmpty(field)){
                return false; // sprawdzamy czy pole email zawiera @ i . we wprowadzonym ciągu znaków i czy 
                              // przypadkiem pole nie jest puste !isEmpty(field)
            }
            else{
                return true;
            }
        }

        function atLeast(field, min){
            if (field.value.length>=min){ //czy pole zawiera conajmniej określoną w parametrze min liczbę 
                                          // znaków
                return false;    
            }
            else {
                return true;
            }
        }

        for(var i=0; i<fields.length; i++){ // pętla bo będziemy sprawdzać wszystkie pola formularza
           var field = fields[i]; // wrzucenie w zmienną pole inkrementacji, uproszczenie zapisu
           var isValid = false; // zmienna isValid, która będzie przechowywała to co zwócą funkcje
                                // walidacyjne = true l lub false

           if (field.type==="text" || field.type==="select-one"){ 
                isValid = isEmpty(field); //jeżeli pole typu tekstowe (w tym wypadku imie) lub select-one
                                         // w tym wypadku "temat treści" jest puste isValid = true
                                         // i jest robiony przeskok do if(isValid) - jeżeli isValid=true 
                                         // zrób push komunikatu data-errors do tablicy errors i dodaj 
                                         // klasę error do pola (czerwona obramówka)
                                         // gdy isValid = false usuń klasę error (czerwona obramówka pola)
                                         // i tak dla każdego pola w zależności od jego typu
                //console.log("isvalid: "+isValid);                         
            }

           else if (field.type==="email"){
                isValid = isEmailCorrect(field);        
            }

            else if (field.type==="textarea"){
                isValid = atLeast(field, 3);      
            }


            if (isValid){   // działa bo to sobie leci w pętli pamiętaj, że field = fields[0]
                errors.push(field.dataset.error); // wyjaśnione w if(field.type===text)...
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


        if(errors.length){// erroes.length==0{
            showErrorsList(errors);
        }else{
            form.submit();
        }



        

        console.log(errors);
        

        


    }, false);

    console.log(isUlExsist);

    