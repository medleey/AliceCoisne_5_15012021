(() => {
    let url = window.location.href;
    url = new URL(url);
    orderId.innerText = url.searchParams.get('id') //va chercher l'id dans l'url pour l'afficher dans le texte de validation de la commande
})()