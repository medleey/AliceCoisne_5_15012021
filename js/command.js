(() => { 
    let url = window.location.href; 
    url = new URL(url); 
    orderId.innerText = url.searchParams.get('id')
})()