'use strict'; //retirer les consoles.log avant rendu

(() => { // Une fois que la page est chargé (= window.onload)
    let id = getIdInurl();
    setTeddy(id)
})()

function getIdInurl() {
    let url = window.location.href
    url = new URL(url);
    return url.searchParams.get('id')
}

function setTeddy(id) {
    const request = new XMLHttpRequest();

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            let teddy = JSON.parse(request.responseText);

            showTeddy(teddy);
            addBasket(teddy)
        }
    }

    request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/' + id);
    request.send();
}

function showTeddy(teddy) {
    const img = document.getElementById('teddy_img');
    
    img.setAttribute('src', teddy.imageUrl);
    img.setAttribute('alt', teddy.name);

    teddy_name.innerText = teddy.name;
    teddy_description.innerText = teddy.description;
    teddy_price.innerText = (teddy.price / 100 + ' €');
    colors(teddy.colors)
}

function colors(colors) {

    colors.forEach(color => {
        select_colors.innerHTML += `
        <option value="${color}"> ${color} </option>`
    })
}

function addBasket(teddy) {

    const link = document.getElementById('link_basket');
    link.addEventListener('click', () => { //permet d'ajouter un évènement, ici au click sur le panier

        let basket = JSON.parse(localStorage.getItem('session_basket'))  //getItem = permet de récupérer qqch du localStorage

        if (basket === null) {
            basket = []
        }
        console.log(basket)
        basket.push(teddy) //mettre danns le tableau

        localStorage.setItem('session_basket', JSON.stringify(basket))
    })
}