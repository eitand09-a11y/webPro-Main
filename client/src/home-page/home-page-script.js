document.addEventListener('DOMContentLoaded', function () {
    const sortSelect = document.getElementById('sort-select');
    const dataContainer = document.getElementById('data-container');
    const cartButton = document.getElementById('cart-button');
    const productModal = document.getElementById('product-modal');
    const productDetailsContainer = document.getElementById('product-details');
    const modalCloseButton = document.querySelector('.close');
    const cart = [];

    function sortProducts(products, sortBy) {
        switch (sortBy) {
            case 'name':
                return products.sort((a, b) => a.title.localeCompare(b.title));
            case 'category':
                return products.sort((a, b) => a.category.localeCompare(b.category));
            case 'price':
                return products.sort((a, b) => a.price - b.price);
            default:
                return products;
        }
    }

    function addToCart(product) {
        cart.push(product);
        console.log(`Товар "${product.title}" add to cart.`);
    }

    function openProductModal(product) {
        // Заполнить детали продукта в модальном окне
        productDetailsContainer.innerHTML = `       
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p>Цена: $${product.price}</p>
            <button class="buy-button">add to cart</button>
        `;
        

        // Показать модальное окно
        productModal.style.display = 'block';
        document.body.classList.add('modal-open');
    }

    function renderProducts(products) {
        dataContainer.innerHTML = '';

        products.forEach(product => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            const imageElement = document.createElement('img');
            imageElement.src = product.image;
            imageElement.alt = product.title;

            const productInfoDiv = document.createElement('div');
            productInfoDiv.classList.add('product-info');

            const titleElement = document.createElement('p');
            titleElement.classList.add('product-title');
            titleElement.textContent = product.title;

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('product-description');
            descriptionElement.textContent = product.description;

            const priceElement = document.createElement('p');
            priceElement.classList.add('product-price');
            priceElement.textContent = `price: $${product.price}`;

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('buy-button');
            addToCartButton.textContent = 'add to cart';

            const viewDetailsButton = document.createElement('button');
            viewDetailsButton.classList.add('buy-button');
            viewDetailsButton.textContent = 'More...';

            addToCartButton.addEventListener('click', () => {
                addToCart(product);
            });

            viewDetailsButton.addEventListener('click', () => {
                openProductModal(product);
            });

            productInfoDiv.appendChild(titleElement);
            // productInfoDiv.appendChild(descriptionElement);
            productInfoDiv.appendChild(priceElement);
            // productInfoDiv.appendChild(imageElement)

            cardDiv.appendChild(imageElement);
            cardDiv.appendChild(productInfoDiv);
            cardDiv.appendChild(addToCartButton);
            cardDiv.appendChild(viewDetailsButton);

            dataContainer.appendChild(cardDiv);
        });
    }

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            let sortedProducts = sortProducts(json, sortSelect.value);

            sortSelect.addEventListener('change', function () {
                sortedProducts = sortProducts(json, sortSelect.value);
                renderProducts(sortedProducts);
            });

            cartButton.addEventListener('click', function () {
                console.log('go to cart:', cart);
                // Ваш код для перехода в корзину
            });

            modalCloseButton.addEventListener('click', function () {
                // Закрыть модальное окно
                productModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            });

            renderProducts(sortedProducts);
        })
        .catch(error => console.error('data error:', error));
});
