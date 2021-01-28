'use strict'; //retirer les consoles.log avant rendu

function getIdInurl() {
    let url = window.location.href
    url = new URL(url);
    return url.searchParams.get('id')
}

(function () {

    let id = getIdInurl();
    let teddy = getTeddy(id);
    console.log(teddy)

    showTeddy(teddy);


    let result;
})()

function getTeddy(id) {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/' + id, true);
    request.send();


    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            let result = JSON.parse(request.responseText);

            return result

        }
    }
}

function showTeddy(teddy) {
    console.log(teddy)
    const html = document.getElementById('teddy');
    const img = document.getElementById('teddy_img');
    const link = document.getElementById('link_basket');
    img.setAttribute('src', result.imageUrl);
    img.setAttribute('alt', result.name);

    teddy_name.innerText = result.name;
    teddy_description.innerText = result.description;
    teddy_price.innerText = (result.price / 100 + ' €');
}

function addBasket(basket) {
    link.addEventListener('click', () => { //permet d'ajouter un évènement, ici au click sur le panier

        let basket = localStorage.getItem('basket')  //getItem = permet de récupérer qqch du localStorage

        if (basket === null) {
            basket = []
        }
    })
}