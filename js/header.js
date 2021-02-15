'use strict';
(function () {
    const header = document.getElementById('header_list')
    reqGetAllTeddies() //retourne une promesse qui affichera tous les teddies
        .then(response => {
            const results = JSON.parse(response);
            results.forEach(teddy => { //affiche chaque teddy dans le dropdown 

                header.innerHTML += `
                <li>
                    <a class="dropdown-item" href="./products.html?id=${teddy._id}">${teddy.name}</a>
                </li>
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