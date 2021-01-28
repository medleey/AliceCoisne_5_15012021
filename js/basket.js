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
                Price
            </td> 
            <td></td>
            <td>${total_price / 100 + ',00 €'}</td>
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
}
