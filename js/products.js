'use strict'; //retirer les consoles.log avant rendu
(function() {
    let url = new URL(window.location.href); //mon URL (dans la barre de recherche)
    let id = url.searchParams.get("id");
    console.log(id); //variable
    

    const teddy = document.getElementById('teddy')
    const request = new XMLHttpRequest(); 
    request.open('GET', 'http://localhost:3000/api/teddies/' + id,true); //('bonjour' + teddy + ' !') = concaténation ajout de chaines de caractères ensemble
    request.send(); 

    request.onreadystatechange = () => { //prêt quand l'état changera, tu exécuteras la suite
        if (request.readyState == 4 && request.status == 200) { /*readyState == 4 request done && status == 200 == request réussie*/
            const results = JSON.parse(request.responseText); /*JSON.parse transforme les chaines de caractères en objet JSON*/

                // let name = teddy.name;
                // let description = teddy.description;
                // let img = teddy.imageUrl;
                // let id = teddy._id;
                //let price = teddy.price

                teddy.innerHTML = `
                <div class="row">
                <div class="col-md-6 photo-product text-center">
                    <img src="${teddy.imageUrl}" alt="">
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${teddy.name}</h5>
                            <p class="card-text">${teddy.description}</p>
                            <p class="card-text">${teddy.price}</p>
                            <a href="./basket.html" class="btn btn-primary">Ajouter au panier</a>
                        </div>
                    </div>
                </div>
                </div>
                `
        }
    }
})()