const socket = io();

// Escuchar actualizaciones de la lista de productos
socket.on('productListUpdate', (updatedProducts) => {
  console.log('Actualización de lista de productos:', updatedProducts);
  renderProductList(updatedProducts);
});

// Renderizar la lista de productos en tiempo real
function renderProductList(products) {
  const productList = document.getElementById('allProducts');
  productList.innerHTML = '';

  products.forEach((product) => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.id = product.id;

    const productHeader = document.createElement('div');
    productHeader.className = 'product-header';

    const productImage = document.createElement('img');
    productImage.src = product.thumbnail;
    productImage.alt = product.title;

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';

    const title = document.createElement('h3');
    title.textContent = product.title;

    const description = document.createElement('p');
    description.innerHTML = `<span>Descripción:</span><br>${product.description}`;

    const stock = document.createElement('p');
    stock.innerHTML = `<span>Stock disponible:</span> ${product.stock}`;

    const price = document.createElement('p');
    price.textContent = `Precio: $${product.price}`;

    productHeader.appendChild(productImage);
    productInfo.appendChild(title);
    productInfo.appendChild(description);
    productInfo.appendChild(stock);
    productInfo.appendChild(price);

    productCard.appendChild(productHeader);
    productCard.appendChild(productInfo);

    productList.appendChild(productCard);
  });
}

// Manejar el envío del formulario para agregar productos
document.getElementById('addProductForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());
  socket.emit('addProduct', data);
});

// Manejar el envío del formulario para eliminar productos por ID
document.getElementById('deleteProductForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const productIdInput = document.getElementById('productId');
  const productId = parseInt(productIdInput.value);

  if (productId <= 0) {
    alert('El ID del producto debe ser mayor que cero.');
    return;
  }

  socket.emit('deleteProduct', productId);
});

// Manejar mensajes recibidos desde el servidor
socket.on('message', (message) => {
  document.getElementById('responseMessage').textContent = message;
});