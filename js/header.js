'use strict';
(function() {
    const header = document.getElementById('header_list')
    const request = new XMLHttpRequest();
    request.open('GET', 'https://oc-p5-api.herokuapp.com/api/teddies/',true);
    request.send();

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) { /*readyState == 4 request done && status == 200 == request réussie*/
            const results = JSON.parse(request.responseText); /*JSON.parse transforme les chaines de caractères en objet JSON*/
            results.forEach(teddy => {

                header.innerHTML += `
                    <li>
                        <a class="dropdown-item" href="/products.html?id=${teddy._id}">${teddy.name}</a>
                    </li>
                `
            });
        }
    }
})() 