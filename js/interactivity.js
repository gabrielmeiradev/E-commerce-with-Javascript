loadProducts(false, []);


function closeCart() {
    cartElement.style.transform = 'translateX(500px)';
}

function openCart() {
    cartElement.style.transform = 'translateX(0)';
}

function realize(price) {
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}

function loadProducts(filtered, newArray) {
    productsElement.innerHTML = '';
    if (!filtered) {
        products.forEach((product, index) => {
            let productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image})"></div>
            <div class="product-details">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">${realize(product.price)}</p>
            </div>
            <div class="product-actions">
            <a class="button buy-button" onClick="addToCart(${product.id-1})" id="button${product.id-1}"><i class="gg-shopping-cart"></i> adicionar ao carrinho</a>
            <a class="favorite-button" onClick="addToFavorites(${product.id-1})"><i class="gg-heart"></i></a>
            </div>
            </div>
            `;
            console.log(product.image)

            productsElement.appendChild(productElement);
        })
    } else {
        newArray.forEach((product, index) => {
            let productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image})"></div>
            <div class="product-details">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">${realize(product.price)}</p>
            </div>
            <div class="product-actions">
            <a class="button buy-button" onClick="addToCart(${product.id-1})" id="button${product.id-1}"><i class="gg-shopping-cart"></i> adicionar ao carrinho</a>
            <a class="favorite-button" onClick="addToFavorites(${product.id-1})"><i class="gg-heart"></i></a>
            </div>
            </div>
            `;
            console.log(product.image)

            productsElement.appendChild(productElement);
        })
    }

    updateProductButtons();
}



productsInCartElement.innerHTML = '<p style="color: rgba(0, 0, 0, .3)">Nenhum produto no carrinho :(</p>';

function updateCartInterface() {
    productsInCartElement.innerHTML = '';
    if (carrinho.length <= 0) {
        productsInCartElement.innerHTML = '<p style="color: rgba(0, 0, 0, .3)">Nenhum produto no carrinho :(</p>';
    }
    carrinho.forEach((product, index) => {
        let aProductInCart = document.createElement('div');
        aProductInCart.classList.add('carrinho-product');
        aProductInCart.innerHTML =
            `
        <div class="carrinho-product-img" style="background-image: url('${product.image}')"></div>
        <div class="carrinho-product-details">
        <p class="carrinho-product-details-title">${product.title}</p>
        <div class="carrinho-produto-actions">
        <small class="carrinho-produto-actions-price">${realize(product.price)}</small>
        <div class="trash-icon-container" onclick="removeFromCart(${product.id-1})">
        <i class="gg-trash"></i>
        </div>
        </div>
        </div>  
        `;
        productsInCartElement.appendChild(aProductInCart);
        let divider = document.createElement('div');
        divider.classList.add('divider')
        productsInCartElement.appendChild(divider);
    });

    updateProductButtons();
    showTotalOfProductsInBag();
    showTotalPrice();
}

function showTotalOfProductsInBag() {
    carrinhoCount.innerHTML = carrinho.length.toString();
}

function showTotalPrice() {
    let TotalPrice = 0;
    carrinho.forEach((product) => {
        TotalPrice += product.price
    })

    if (TotalPrice != 0) {
        totalPriceElement.style.display = 'inherit';
    } else {
        totalPriceElement.style.display = 'none';
    }

    totalPriceIndicator.innerHTML = realize(TotalPrice);
}

function updateProductButtons() {

    let updateButton = null;
    products.forEach((product, index) => {
        if (product.addedToCart !== true) {
            updateButton = document.querySelector(`#button${product.id-1}`);
            if (updateButton) {
                updateButton.innerHTML = '<i class="gg-shopping-cart"></i> adicionar ao carrinho';
                updateButton.style.background = 'transparent';
                updateButton.style.color = 'black';
                console.log(product.title + ' n adicionado')
            }
        } else {
            updateButton = document.querySelector(`#button${product.id-1}`);
            if (updateButton) {
                updateButton.innerHTML = '<i class="gg-check"></i> adicionado ao carrinho';
                updateButton.style.background = 'black';
                updateButton.style.color = 'white';
                console.log(product.title + ' adicionado')
            }
        }
    })
}

SearchInput.addEventListener('input', search);

let smartFilter = (string) => {
    return string.toLowerCase().replace("çã", "ca");
}

function search() {
    let SearchInputValue = SearchInput.value;
    let arraySearched = products.filter(product => smartFilter(product.title).includes(smartFilter(SearchInputValue)));
    loadProducts(true, arraySearched);
    loadFiltersInterface();
}

function searchByCategory(category) {
    let arraySearched = products.filter(product => product.category == category);
    loadProducts(true, arraySearched);
}

function loadFiltersInterface() {
    filtersElement.innerHTML = '';
    categorias.forEach((categoria) => {
        let filterElement = document.createElement('a');
        filterElement.classList.add('filter');
        filterElement.innerHTML = categoria;
        filterElement.onclick = () => {
            let formated = smartFilter(categoria)
            searchByCategory(formated);
            for(var i = 0; i < filtersElement.childNodes.length-1; i++){
                filtersElement.childNodes[i].classList = 'filter';
            }

            filterElement.classList.add('filter-active');

        }
        filtersElement.appendChild(filterElement);
    })

    let clearAllFiltersElement =  document.createElement('a');
    clearAllFiltersElement.classList.add('remove-filters');
    clearAllFiltersElement.innerHTML = '<i class="gg-close-o"></i> Remover todos';
    clearAllFiltersElement.onclick = () => {
        search();
    };
    filtersElement.appendChild(clearAllFiltersElement);
}


if(sessionStorage.getItem("openCart") == 'true'){
    openCart();
    window.sessionStorage.setItem("openCart", 'false');
}

loadFiltersInterface();
