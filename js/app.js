'use strict';
(function() {
    const teddies = document.getElementById('teddies')
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

                teddies.innerHTML += `
                <div class="col col-md-4">
                    <div class="card">
                        <img src="${teddy.imageUrl}" class="card-img-top" alt="peluche brune">
                        <div class="card-body">
                            <h4 class="card-title">${teddy.name}</h4>
                            <p class="card-text">${teddy.description}</p>
                            <a href="/products.html?id=${teddy._id}" class="btn btn-primary">Voir la fiche</a>
                        </div>
                    </div>
                `
            });
        }
    }
})() 