 (function() {
    
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

        /*function showErrorsList(errors){ //funkcja wyświetlająca listę błędów czerwoną czcionką
                                         // na czerwonym tle

             var ul = document.querySelector("ul.errors"); // sprawdzamy czy na stronie znajduje się
                                                           // ul z klasą errors
             
             if (!ul){ //ul==null --> nie znajduje się na stronie więc 

                var ul = document.createElement("ul"); // tworzenie ul, bo nie ma na stronie
                ul.classList.add("errors");             // dodanie ul class="errors"
            }else {
                ul.innerHTML=""; // znajduje się na stronie więc wcześniej już była wyświetlana
                                 // lista aby ja zresetować należy użyć takiego zapisu
            }

            for(var i=0; i<errors.length; i++){ 
                var li = document.createElement("li"); // stworznie listy
                var content = document.createTextNode(errors[i]); // wyciągnięcie z tablicy errors wszystkich błędów
                li.appendChild(content); //przypięcie błędów do li
                ul.appendChild(li); // przypięcie li do ul
                //form.appendChild(ulCreator);
                container.insertBefore(ul, form); // przypięcie ul przed formularzem (lista wyświetla się nad formularzem)  
            }
        }*/
        /////// powyżej moja alternatywna wersja zapisu funkcji, poniżej uproszczona ////////////
        function showErrorsList(errors) {
            var ul = document.querySelector("ul.errors"); // sprawdzamy czy na stronie znajduje się
                                                          // ul z klasą errors

            if(!ul) { // ul == null --> nie znajduje się na stronie więc:
                ul = document.createElement("ul"); // tworzymy pojedynczy ul
                ul.classList.add("errors");  // dodajemy klasę ul.errors
            }

            ul.innerHTML = ""; // gdy ul != null, bo jest taki element na przykład z poprzedniego
                               // wyświetlenia zrób reset ul - czyszczenie listy (można zapisać w else jak u mnie) 

            errors.forEach(function(error){ // wyciągamy wszystko co znajduje się w tablic errors - 
                                            // komunikaty z błędami
                var li = document.createElement("li"); // tyle ile komunikatów stwórz tyle li tak by każdy
                                                       // komunikat miał swoje li
                li.textContent = error;  // przypnij do każdego li komunikat błedu np ["Podaj imię i nazwisko"] jeżeli to pole jest puste i tak dla wszystkich
                ul.appendChild(li); // przypnij wszystkie li do ul
            });

            form.parentNode.insertBefore(ul, form); // chcemy wstawić listę błędów przed formularzem ale
                                                    // nie mamy container=querySelector(".container")
                                                    // i nie chcąc go tworzyć można to zrobić poprzez parentNode
                                                    // container jest rodzicem dla form (form dziecko)
                                                    // form.parentNode --> wskaż rodzica dla form = querySelector(".container") to jest równoznaczne
                                                    //insertBefore(co, przed czym)
        }


        if(errors.length){// erroes.length==0{
            showErrorsList(errors); // jeżeli tablica errors != 0 (zawiera błędy) pokaż listę błędów
        }else{
            form.submit(); // jeżeli errors == 0 wykonaj wysyłkę formularza
        }

        console.log(errors);
        

    }, false);


 })();
