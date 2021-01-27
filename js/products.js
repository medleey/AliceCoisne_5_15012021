'use strict'; //retirer les consoles.log avant rendu
(function() {
    let url = new URL(window.location.href); //mon URL (dans la barre de recherche)
    let id = url.searchParams.get("id");
    console.log(id); //variable
    

    const teddy = document.getElementById('teddy');
    const name = document.getElementById('teddy_name');
    const img = document.getElementById('teddy_img');
    const description = document.getElementById('teddy_description');
    const price = document.getElementById('teddy_price');
    const link = document.getElementById('link_basket');
    let result;
    

    const request = new XMLHttpRequest(); 
    request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/' + id,true); //('bonjour' + teddy + ' !') = concaténation ajout de chaines de caractères ensemble
    request.send(); 
    

    request.onreadystatechange = () => { //prêt quand l'état changera, tu exécuteras la suite
        if (request.readyState == 4 && request.status == 200) { /*readyState == 4 request done && status == 200 == request réussie*/
            result = JSON.parse(request.responseText); /*JSON.parse transforme les chaines de caractères en objet JSON*/

                img.setAttribute('src', result.imageUrl);
                img.setAttribute('alt', result.name);

                teddy_name.innerText = result.name;
                teddy_description.innerText = result.description;
                teddy_price.innerText = (result.price/100 + ' €');

        }
    }

    link.addEventListener('click',() => { //permet d'ajouter un évènement, ici au click sur le panier

        let basket = localStorage.getItem('basket')  //getItem = permet de récupérer qqch du localStorage

        if (basket === null) {
           basket = []
        }
        console.log(basket)
    } ) 
})()