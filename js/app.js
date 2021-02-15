'use strict';
(function () {
    const teddies = document.getElementById('teddies') //recherche l'id teddies dans index.html
    reqGetAllTeddies() //retourne une promesse qui affichera tous les teddies
        .then(response => {
            const results = JSON.parse(response);
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
        })
        .catch(error => console.log(error));

})()

//AJOUT FONCTION QUI RETOURNE UNE PROMISE
function reqGetAllTeddies() { //concerne la requête pour afficher les teddies dans le dropdown header
    return new Promise(function (resolve, reject) { //création promesse: 
        const request = new XMLHttpRequest();
        request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/', true);
        request.onload = function () { //chargement de la requête 
            if (this.status >= 200 && this.status < 300) { //resolve = status 200/300 avec le if 
                resolve(request.response); //promesse ok
            } else {
                reject({
                    status: this.status, // reject = status 500/400
                    statusText: request.statusText
                });
            }
        };
        request.onerror = function () {
            reject({
                status: this.status,
                statusText: request.statusText
            });
        };
        request.send();
    });
}