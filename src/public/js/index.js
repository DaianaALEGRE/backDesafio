//este puto somos clientes
const socket=io();


socket.emit('message', "hola desde el websocket wey");

//add
document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    socket.emit('addProduct', data);
  });
  //deletebyid
  document.getElementById('deleteProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const productIdInput = document.getElementById('productId');
    const productId = parseInt(productIdInput.value);
  
    if (productId <= 0) {
      alert('El ID del producto debe ser mayor que cero.');
      return;
    }
  
    const formData = new FormData(event.target);
    socket.emit('deleteProduct', productId);
  });
  //mensaje 
  socket.on('message', (message) => {
    document.getElementById('responseMessage').textContent = message;
  });