let CarrinhoStored = JSON.parse(sessionStorage.getItem("items"));

let products = [{
        id: 1,
        title: 'Camiseta Huf Barb Wire Classic H White',
        price: 159,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2022/06/DSC_0002pq-1.jpg',
        category: 'camiseta',
        addedToCart: false
    },
    {
        id: 2,
        title: 'Moletom Santa Cruz Strange Dot Black',
        price: 379.02,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2022/06/DSC_0069pq.jpg',
        category: 'moletom',
        addedToCart: false
    },
    {
        id: 3,
        title: 'Calça DGK OGC Cargo Black',
        price: 479.00,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2022/06/DSC_0048pq-1.jpg',
        category: 'calça',
        addedToCart: false
    },
    {
        id: 4,
        title: 'Camiseta Sufgang Bones Black',
        price: 159.90,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2022/06/DSC_0024PQ.jpg',
        category: 'camiseta',
        addedToCart: false
    },
    {
        id: 5,
        title: 'Moletom Huf Video Format White',
        price: 429.90,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2022/06/DSC_0020PQ-1.jpg',
        category: 'moletom',
        addedToCart: false
    },
    {
        id: 6,
        title: 'Moletom Santa Cruz Obscure Hand Black',
        price: 389.90,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2022/07/DSC_0019pq.jpg',
        category: 'moletom',
        addedToCart: false
    },
    {
        id: 7,
        title: 'Jaqueta PIET Wool Varsity Jacket Navy',
        price: 1299.90,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2021/12/DSC_0001-2PQ-1.jpg',
        category: 'jaqueta',
        addedToCart: false
    },
    {
        id: 8,
        title: 'Camiseta PIET Carabiner Black',
        price: 249.90,
        image: 'https://www.hipnoise.com.br/wp-content/uploads/2021/12/DSC_0006PQ-2.jpg',
        category: 'camiseta',
        addedToCart: false
    }
];

let carrinho = [];
const categorias = ['Camiseta', 'Calça', 'Moletom', 'Jaqueta'];

function FindProductInCart(Cart, ProductIndex) {
    let Answer = false;
    if (Cart.length == 0) {
        Answer = false;
    } else if (products[ProductIndex].addedToCart == true) {
        Answer = true;
    } else {
        Answer = false;
    }

    return Answer;

}

window.addEventListener('load', () => {
    if(CarrinhoStored){
    CarrinhoStored.forEach((product) => {
        products[product.id-1].addedToCart = true;
        carrinho.push(product);
    })
    updateCartInterface();
    updateProductButtons();
    }
});

function addToCart(ProductIndex) {
        if (!FindProductInCart(carrinho, ProductIndex)) {
            carrinho.push(products[ProductIndex]);
            products[ProductIndex].addedToCart = true;
            console.log('adicionado ' + products[ProductIndex].title)
        } else {
            console.log('não adicionado ' + products[ProductIndex].title)
        }

    UpdateSessionCart();
    updateCartInterface();
}

function removeFromCart(productId) {
    carrinho.forEach((product, index) => {
        if (product.id - 1 == productId) {
            carrinho.splice(index, 1);
            products[productId].addedToCart = false;
        } else {
            console.log('trying to remove: ' + product.title + ' in the index: ' + index)
        }
    })

    UpdateSessionCart();
    updateCartInterface();
}

function LoadICheckout(){
    UpdateSessionCart();
    window.location.href = 'checkout.html';    
}

function UpdateSessionCart(){
    window.sessionStorage.setItem("items", JSON.stringify(carrinho));
}
