(() => { // Une fois que la page est chargé (= window.onload)
    // fonction anonyme

    let basket = JSON.parse(localStorage.getItem('session_basket'))
    let total_price = 0;
    basket.forEach((teddy, index) => {
        total_price += teddy.price
        console.log(total_price)
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
                                <td> 
                                    <div class="price-wrap"> 
                                        <var class="price">${teddy.price / 100 + ',00€'}</var> 
                                        
                                    </div> <!-- price-wrap .// -->
                                </td>
                                <td class="text-right" > 
                                    <button type="button" class="remove_teddy btn btn-outline-danger" data-id="${index}"> × Remove</button>
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
            <td id="price">${total_price / 100 + ',00 €'}</td>
        </tr>`
    let remove_teddy = document.getElementsByClassName('remove_teddy');
    for (let i = 0; i < remove_teddy.length; i++) {
        remove_teddy[i].addEventListener('click', remove)
    }

})()

function remove(e) {
    let i = e.target.getAttribute('data-id');
    let basket = JSON.parse(localStorage.getItem('session_basket'))
    console.log(basket)
    basket.splice(i, 1);
    localStorage.setItem('session_basket', JSON.stringify(basket))

    e.target.parentNode.parentNode.remove();

    let total_price = 0; // Je recrée un variable pour le prix qui commence a 0
    basket.forEach((teddy, index) => { // Je boucle sur tout les teddy restant dans mon panier
        total_price += teddy.price; // Je concat le prix de chaque teddy dans total_price
    });

    let price = document.getElementById('price'); // Je recupere l'endroit ou est affiché le prix dans le tableau
    price.innerText = total_price / 100 + ',00 €' // Je remplace le text

}
