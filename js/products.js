'use strict'; //retirer les consoles.log avant rendu

(() => { // Une fois que la page est chargée (= window.onload)
    let id = getIdInUrl(window.location.href);
    setTeddy(id)
})()

//RECHERCHE L'ID DU TEDDY DANS L'URL
function getIdInUrl(url) {  
    url = new URL(url);
    return url.searchParams.get('id')
}

//CHERCHE LE TEDDY DANS L'API,(AFFICHAGE+POSSIBILITÉ AJOUT AU PANIER)
function setTeddy(id) { 
    reqGetOneTeddy(id)
        .then(response => {
            let teddy = JSON.parse(response);
            showTeddy(teddy);
            addBasket(teddy);
        })
        .catch(error => console.log(error));
}
//AJOUT FONCTION QUI RETOURNE UNE PROMISE
function reqGetOneTeddy(id) { //concerne la requête pour afficher un teddy sur la page produit
    return new Promise(function (resolve, reject) { //création de la promesse: 
        const request = new XMLHttpRequest();
        request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/' + id);
        request.onload = function () { //sur le chargement de la requête 
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
// j'ai pris toutes les infos qui me servaient à afficher un teddy sur la page produit et je les ai mis dans une promesse

//AFFICHE LE TEDDY SUR LA PAGE PRODUCTS.HTML
function showTeddy(teddy) { 
    const img = document.getElementById('teddy_img');

    img.setAttribute('src', teddy.imageUrl);
    img.setAttribute('alt', teddy.name);

    teddy_name.innerText = teddy.name;
    teddy_description.innerText = teddy.description;
    teddy_price.innerText = (teddy.price / 100 + ' €');
    colors(teddy.colors)

}

//AFFICHE COULEURS DU TEDDY DANS LE DROPDOWN
function colors(colors) { 
    colors.forEach(color => {
        select_colors.innerHTML += `
        <option value="${color}"> ${color} </option>`
    })
}

//AJOUTE UN TEDDY AU PANIER
function addBasket(teddy) { 
    const colors_select = document.querySelector('#select_colors');
    let color = colors_select.value;
    colors_select.addEventListener('change', () => {
        color = colors_select.value;
    });

    const link = document.getElementById('link_basket');
    link.addEventListener('click', () => { //ajoute un évènement, ici au click sur le panier

        let basket = JSON.parse(localStorage.getItem('session_basket'))  //getItem = permet de récupérer qqch du localStorage

        if (basket === null) { //si c'est vide, ajoute un tableau vide pour éviter un message d'erreur 
            basket = []
        }
        teddy.color = color; //affiche la couleur sélectionnée 
        basket.push(teddy) //met le teddy danns le tableau
        localStorage.setItem('session_basket', JSON.stringify(basket)) //tout le panier est en String pour affichage dans le local storage
    })
}