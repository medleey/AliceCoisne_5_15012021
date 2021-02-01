(() => { // Une fois que la page est chargé (= window.onload) - fonction anonyme
    let basket = JSON.parse(localStorage.getItem('session_basket'))
    let total_price = 0;
    if (basket === null || basket.length == 0) {
        let visibility = document.getElementById('visibility')
        visibility.classList.add('d-none')
        return false;
    }

    basket.forEach((teddy, index) => {
        total_price += teddy.price
        basket_content.innerHTML += `
                            <tr>
                                <td>
                                    <figure class="media">
                                        <div class="img-wrap"><img src="${teddy.imageUrl}" class="img-thumbnail img-sm"></div>
                                        <figcaption class="media-body">
                                            <h6 class="title text-truncate">${teddy.name}</h6>    
                                            </dl>
                                            <dl class="param param-inline small">
                                                <dt>Color: </dt>
                                                <dd>${teddy.color}</dd>
                                            </dl>
                                        </figcaption>
                                    </figure> 
                                </td>
                                <td> 
                                    <select class="form-control">
                                        <option>1</option>	
                                    </select> 
                                </td>
                                
                                <td class="text-right" > 
                                    <button type="button" class="remove_teddy btn btn-outline-danger" data-id="${index}"> × Remove</button>
                                </td>
                                <td> 
                                    <div class="price-wrap"> 
                                        <var class="price">${teddy.price / 100 + ',00€'}</var>  
                                    </div> <!-- price-wrap .// -->
                                </td>
                            </tr>
                    `
    })
    basket_content.innerHTML +=
        `<tr>
            <td>
                Prix <i>(total en €)</i>
            </td> 
            <td></td>
            <td></td>
            <td id="price">${total_price / 100 + ',00 €'}</td>
        </tr>`
    let remove_teddy = document.getElementsByClassName('remove_teddy');
    for (let i = 0; i < remove_teddy.length; i++) {
        remove_teddy[i].addEventListener('click', remove)
    }

    const form = document.querySelector('#form1');
    form.addEventListener('submit', submitForm); // Quand on soumet le form avec le bouton type submit

})()

function remove(e) {
    let i = e.target.getAttribute('data-id');
    let basket = JSON.parse(localStorage.getItem('session_basket'))
    basket.splice(i, 1);
    localStorage.setItem('session_basket', JSON.stringify(basket))

    e.target.parentNode.parentNode.remove();

    let total_price = 0; // Je recrée un variable pour le prix qui commence a 0
    basket.forEach((teddy, index) => { // Je boucle sur tout les teddies restant dans mon panier
        total_price += teddy.price; // Je concat le prix de chaque teddy dans total_price
    });

    let price = document.getElementById('price'); // Je recupere l'endroit ou est affiché le prix dans le tableau
    price.innerText = total_price / 100 + ',00 €' // Je remplace le text

    if (basket === null || basket.length == 0) {
        let visibility = document.getElementById('visibility')
        visibility.classList.add('d-none')
        return false;
    }
}

function submitForm(e) { 
    e.preventDefault(); // sert a annuler l'envoi du formulaire pour ne pas recharger la page
    const form = document.querySelector('#form1');
    const formData = new FormData(form) //formData classe qui permet de récupérer ton formulaire
    let formContent = Object.fromEntries(formData.entries());
    let basket = JSON.parse(localStorage.getItem('session_basket'));
    const request = new XMLHttpRequest();
    request.open('POST', 'https://oc-p5-api.herokuapp.com/api/teddies/order',true);
    request.setRequestHeader("Content-type", "application/json;charset=UTF-8");

    const params = {
        'contact': formContent,
        'products': basket
    };

    request.send(JSON.stringify(params));

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 201) { 
            const results = JSON.parse(request.responseText);
            const orderId = results.orderId;
            localStorage.clear();
            window.location.href = "./command-ok.html?id=" + orderId; 
        }
}}

