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
        }
    }

    request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/' + id);
    request.send();
}

function showTeddy(teddy) {
    console.log(teddy)
    const html = document.getElementById('teddy');
    const img = document.getElementById('teddy_img');
    const link = document.getElementById('link_basket');
    img.setAttribute('src', teddy.imageUrl);
    img.setAttribute('alt', teddy.name);

    teddy_name.innerText = teddy.name;
    teddy_description.innerText = teddy.description;
    teddy_price.innerText = (teddy.price / 100 + ' €');
    colors(teddy.colors)
}

function colors(colors) {
    console.log(select_colors);//id du select
    colors.forEach(color => {
        select_colors.innerHTML += `
        <option value="${color}"> ${color} </option>`
        
    })
    console.log(colors)
}

function addBasket(basket) {
    link.addEventListener('click', () => { //permet d'ajouter un évènement, ici au click sur le panier

        let basket = localStorage.getItem('basket')  //getItem = permet de récupérer qqch du localStorage

        if (basket === null) {
            basket = []
        }
    })
}