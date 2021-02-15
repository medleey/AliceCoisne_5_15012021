'use strict';
(function () {
    const teddies = document.getElementById('teddies') //recherche l'id teddies dans index.html
    const request = new XMLHttpRequest(); //envoi des requêtes HTTP 
    request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/', true); 
    request.send();

    request.onreadystatechange = () => { //évènement au changement d'état 
        if (request.readyState == 4 && request.status == 200) { //readyState == 4 request done && status == 200 == request réussie = changement réussi
            const results = JSON.parse(request.responseText);
            results.forEach(teddy => { // fait une boucle sur tous les teddies disponibles dans l'API 

                teddies.innerHTML += `
                <div class="col-sm-12 col-md-4 mb-4">
                    <div class="card">
                        <img src="${teddy.imageUrl}" class="card-img-top" alt="photo peluche">
                        <div class="card-body">
                            <h4 class="card-title">${teddy.name}</h4>
                            <p class="card-text">${teddy.description}</p>
                            <a href="./products.html?id=${teddy._id}" class="btn btn-primary">Voir la fiche</a> 
                        </div>
                    </div>
                `
            });
        }
    }
})() 