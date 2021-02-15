(() => { // Une fois que la page est chargé (= window.onload) - fonction anonyme
    let basket = JSON.parse(localStorage.getItem('session_basket'))
    let total_price = 0;
    if (basket === null || basket.length == 0) {
        let visibility = document.getElementById('visibility')
        visibility.classList.add('d-none'); // ajoute une class bootstrap 
        return false; // s'arrête là pour ne pas afficher les fonctions suivantes 
    }

    basket.forEach((teddy, index) => {
        total_price += teddy.price // (total_price = total_price + teddy.price)
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
    basket_content.innerHTML += //change le prix total dynamiquement
        `<tr>
    <td>
    Prix <i>(total en €)</i>
    </td> 
    <td></td>
    <td></td>
    <td id="price">${total_price / 100 + ',00 €'}</td>
    </tr>`

    let remove_teddy = document.getElementsByClassName('remove_teddy'); //tab qui comprend tous les boutons remove (selon les teddies dans le panier)
    for (let i = 0; i < remove_teddy.length; i++) { //tableau qui commence à 0, tant que i est inférieur à la taille totale du tab
        remove_teddy[i].addEventListener('click', remove) //exécute la fonction remove
    }

    const form = document.querySelector('#form1');
    form.addEventListener('submit', submitForm); // soumet le form avec le bouton type submit

})()

 //SUPPRIME 1 TEDDY DU PANIER
function remove(e) {
    let i = e.target.getAttribute('data-id');
    let basket = JSON.parse(localStorage.getItem('session_basket'))
    basket.splice(i, 1); //splice modifie directement un tab (ajout ou retrait) 
    localStorage.setItem('session_basket', JSON.stringify(basket)) //ajoute ma "session_basket" au local Storage 

    e.target.parentNode.parentNode.remove(); //supprime le parent 

    //RECALCULE LE PRIX TOTAL APRÈS SUPPRESSION D'1 TEDDY
    let total_price = 0; //recrée une variable pour le prix qui commence a 0€
    basket.forEach((teddy, index) => { // boucle sur chaque teddy restant dans mon panier
        total_price += teddy.price;
    });

    //NOUVEAU PRIX TOTAL 
    let price = document.getElementById('price'); 
    price.innerText = total_price / 100 + ',00 €'

    //si panier vide, il ne s'affiche pas 
    if (basket === null || basket.length == 0) {
        let visibility = document.getElementById('visibility');
        visibility.classList.add('d-none') //ajoute une classe bootstrap "d-none" pour cacher mon panier si il n'y a rien dedans 
        return false;
    }
}
// SOUMETTRE MON FORMULAIRE 
function submitForm(e) {  
    e.preventDefault(); // previent le comportement par défaut, ne va pas actualiser la page 
    const form = document.querySelector('#form1');
    const formData = new FormData(form) //formData prend le html du form et converti en objet
    let formContent = Object.fromEntries(formData.entries()); // prend toutes les entrées et pour chacune d'entre elle, en fait un objet 
    let basket = JSON.parse(localStorage.getItem('session_basket'));

    //AJOUT REGEXP POUR L'EMAIL, NOM ET PRENOM, : 
    const reEmail = (/^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i); 
    const reName = /^[A-Za-z]+$/
    let formValide = reEmail.test(formContent.email.toLowerCase()) && reName.test(formContent.lastName) && reName.test(formContent.firstName); //&& chaque valeur doit être true
    //ci-dessus, je fais les trois tests à la suite, si l'un d'entre eux est false, le formValide ne sera pas validé 

    if (formValide) { //si tous les champs compris dans le if sont valides, le form sera envoyé, à l'inverse il ne se passera rien

        //correspond aux paramètres que je vais envoyer 
        const paramsOrder = {
            'contact': formContent, //données entrées dans le form
            'products': basket // correpond au panier
        };

        reqPostCommand(paramsOrder)
            .then(response => {
                const results = JSON.parse(response);
                const orderId = results.orderId; //récupération de orderId
                localStorage.clear(); //appelle clear pour vider le localStorage
                window.location.href = "./command-ok.html?id=" + orderId;
            })
            .catch(error => console.log(error))
    }
}

//AJOUT FONCTION QUI RETOURNE UNE PROMISE
function reqPostCommand(paramsOrder) { //concerne la requête pour envoyer la commande 
    return new Promise(function (resolve, reject) { //création de la promesse: 
        const request = new XMLHttpRequest();
        request.open('POST', 'https://oc-p5-api.herokuapp.com/api/teddies/order', true);
        request.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        request.onload = function () { // chargement requête 
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
        request.send(JSON.stringify(paramsOrder));//converti JSON en strings: envoie à api/teddies/order
    });
}

/*j'ai pris toutes les lignes qui me servaient à faire ma
requete post.order pour envoyer le form et le panier et je les ai mis dans une promesse*/
