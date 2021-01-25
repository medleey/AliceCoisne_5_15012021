'use strict';
(function() {
    const teddy = document.getElementById('teddy')
    const request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/api/teddies',true);
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) { /*readyState == 4 request done && status == 200 == request réussie*/
            const results = JSON.parse(request.responseText); /*JSON.parse transforme les chaines de caractères en objet JSON*/
            results.forEach(teddy => {
                console.log(teddy);
                // let name = teddy.name;
                // let description = teddy.description;
                // let img = teddy.imageUrl;
                // let id = teddy._id;
                //let price = teddy.price

                teddy.innerHTML = `
                <div class="row id="teddy">
                <div class="col-md-6 photo-product text-center">
                    <img src="${teddy.imageUrl}" alt="">
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${teddy.name}</h5>
                            <p class="card-text">${teddy.description}</p>
                            <p class="card-text">${teddy.price}</p>
                            <a href="/basket.html" class="btn btn-primary">Ajouter au panier</a>
                        </div>
                    </div>
                </div>
                </div>
                `
            });
        }
    }
})()