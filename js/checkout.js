let CarrinhoStored = JSON.parse(sessionStorage.getItem("items"));
window.addEventListener('load', () => {
    carrinhoCount.innerHTML = CarrinhoStored.length;
    document.querySelector(".logo").addEventListener('click', () => {
        document.location.href = 'index.html'
    })
    UpdateTotalPrice();
})

const orderArea = document.querySelector("#order");
function realize(price) {
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

function findIndexOfString(string, character){
    let index = 0;
    string.split('').forEach((c, i) => {
        if(c == character){
            index = i;
        }
    })

    return index
}

function desrealize(price) {
    const priceRight = price.split('').splice(8).join('')
    let beforeDot = priceRight.split('').slice(0, -3).join('');
    let afterDot = priceRight.split('').slice(priceRight.length-2).join('');
    return parseFloat(`${beforeDot.replace('.', '')}.${afterDot}`);
}

CarrinhoStored.forEach((product, i) => {
    let cartProductElement = document.createElement('div');
    cartProductElement.className = 'cart-product flex-row space-between';
    cartProductElement.innerHTML = 
    `
    <div class="flex-row">
    <div class="cart-product-image"
        style="background-image: url('${product.image}')">
    </div>
    <div class="cart-product-info-text">
        <p>${product.title}</p>
        <small>${product.category}</small>
    </div>
    </div>
    <div class="card-product-qnt">
        <input type="number" value="1" min="1" max="100" onchange="changePriceState(${product.id-1}, ${product.price}, this.value)" inputmode='numeric' />
    </div>
    <div class="card-product-price">
        <p id="priceOfProduct${product.id-1}" class='priceOfProduct' >${realize(product.price)}</p>
    </div>
     `
    orderArea.appendChild(cartProductElement);
});

let total = 0;
let allPricesElements = document.querySelectorAll('.priceOfProduct');
function changePriceState(priceId, price, inputValue){
    document.querySelector('#priceOfProduct' + priceId).innerHTML = realize(price * inputValue);
    UpdateTotalPrice();
}

const totalPriceTextElement = document.querySelector('.total-price-text');

function UpdateTotalPrice(){
    allPricesElements.forEach((PriceElement) => {
        total+=desrealize(PriceElement.innerHTML);
    })

    totalPriceTextElement.innerHTML = realize(total);

}

function openCart(){
    window.sessionStorage.setItem("openCart", true);
    window.location.href = 'index.html';
}