
$(document).ready(function () {
    const apiUrl = "http://test.utcv.edu.mx/api/products";

    let localProducts = []; // Variable local para almacenar los productos.

    // Función para cargar los productos desde la API.
    function loadProducts() {
        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (response) {
                localProducts = response; // Cargar los productos en la variable local.
                renderProducts(); // Renderizar la tabla de productos.
            },
            error: function (xhr, status, error) {
                showAlert("Error al cargar productos: " + error, "danger");
            }
        });
    }

    // Función para renderizar la tabla de productos.
    function renderProducts() {
        let productTableBody = $("#product-table-body");
        productTableBody.empty();
        localProducts.forEach((product) => {
            productTableBody.append(`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.product}</td>
                    <td>${product.price}</td>
                    <td>${product.stock}</td>
                    <td>${product.bar_code}</td>
                    <td>${product.description}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-product-btn" data-id="${product.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-product-btn" data-id="${product.id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    }

    // Función para mostrar una alerta en la interfaz.
    function showAlert(message, type) {
        $("#alert-container").html(`
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
    }

    // Evento que se dispara al enviar el formulario para agregar o editar un producto.
    $("#product-form").submit(function (event) {
        event.preventDefault();
        let productId = $("#product-id").val();
        let productName = $("#product-name").val();
        let productPrice = $("#product-price").val();
        let productStock = $("#product-stock").val();
        let productBarCode = $("#product-bar-code").val();
        let productDescription = $("#product-description").val();

        let productData = {
            product: productName,
            price: productPrice,
            stock: productStock,
            bar_code: productBarCode,
            description: productDescription
        };

        if (productId) {
            // Editar producto existente.
            $.ajax({
                url: `${apiUrl}/${productId}`,
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify(productData),
                success: function (response) {
                    showAlert("Producto actualizado exitosamente", "success");
                    loadProducts();
                    $("#productModal").modal("hide");
                },
                error: function (xhr, status, error) {
                    showAlert("Error al actualizar producto: " + error, "danger");
                }
            });
        } else {
            // Agregar nuevo producto.
            $.ajax({
                url: apiUrl,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(productData),
                success: function (response) {
                    showAlert("Producto agregado exitosamente", "success");
                    loadProducts();
                    $("#productModal").modal("hide");
                },
                error: function (xhr, status, error) {
                    showAlert("Error al agregar producto: " + error, "danger");
                }
            });
        }
    });

    // Evento que se dispara al hacer clic en el botón de editar un producto.
    $(document).on("click", ".edit-product-btn", function () {
        let productId = $(this).data("id");
        let product = localProducts.find(p => p.id == productId);
        if (product) {
            $("#product-id").val(product.id);
            $("#product-name").val(product.product);
            $("#product-price").val(product.price);
            $("#product-stock").val(product.stock);
            $("#product-bar-code").val(product.bar_code);
            $("#product-description").val(product.description);
            $("#productModalLabel").text("Editar Producto");
            $("#productModal").modal("show");
        }
    });

    // Evento que se dispara al hacer clic en el botón de eliminar un producto.
    $(document).on("click", ".delete-product-btn", function () {
        let productId = $(this).data("id");
        $.ajax({
            url: `${apiUrl}/${productId}`,
            method: "DELETE",
            success: function (response) {
                showAlert("Producto eliminado exitosamente", "success");
                loadProducts();
            },
            error: function (xhr, status, error) {
                showAlert("Error al eliminar producto: " + error, "danger");
            }
        });
    });

    // Evento que se dispara al cerrar el modal.
    $("#productModal").on("hidden.bs.modal", function () {
        $("#product-form")[0].reset();
        $("#product-id").val("");
        $("#productModalLabel").text("Agregar Producto");
    });

    // Inicializar los productos al cargar la página.
    loadProducts();
});

$(document).ready(function () {
    const apiUrl = "https://reqres.in/api/users";
  
    
    let localUsers = []; // Variable local para almacenar los usuarios.
  
    // Función para cargar los usuarios desde la API.
    function loadUsers() {
        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (response) {
                localUsers = response.data; // Cargar los usuarios en la variable local.
                renderUsers(); // Renderizar la tabla de usuarios.
            },
        });
    }
  
    // Función para renderizar la tabla de usuarios.
    function renderUsers() {
        let userTableBody = $("#user-table-body");
        userTableBody.empty();
        localUsers.forEach((user) => {
            userTableBody.append(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.first_name} ${user.last_name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button class="btn btn-warning btn-sm edit-user-btn" data-id="${user.id}">Editar</button>
                        <button class="btn btn-danger btn-sm delete-user-btn" data-id="${user.id}">Eliminar</button>
                    </td>
                </tr>
            `);
        });
    }
  
    // Función para mostrar una alerta en la interfaz.
    function showAlert(message, type) {
        $("#alert-container").html(`
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        `);
    }
  
    // Evento que se dispara al enviar el formulario para agregar o editar un usuario.
    $("#user-form").submit(function (event) {
        event.preventDefault();
        let userId = $("#user-id").val();
        let userName = $("#user-name").val().split(" ");
        let userEmail = $("#user-email").val();
  
        if (userId) {
            // Editar usuario existente.
            let user = localUsers.find(u => u.id == userId);
            if (user) {
                user.first_name = userName[0];
                user.last_name = userName[1] || "";
                user.email = userEmail;
                showAlert("Usuario actualizado exitosamente", "success");
            }
        } else {
            // Agregar nuevo usuario.
            let newUser = {
                id: localUsers.length ? Math.max(localUsers.map(u => u.id)) + 1 : 1,
                first_name: userName[0],
                last_name: userName[1] || "",
                email: userEmail
            };
            localUsers.push(newUser);
            showAlert("Usuario agregado exitosamente", "success");
        }
        renderUsers();
        $("#userModal").modal("hide");
    });
  
    // Evento que se dispara al hacer clic en el botón de editar un usuario.
    $(document).on("click", ".edit-user-btn", function () {
        let userId = $(this).data("id");
        let user = localUsers.find(u => u.id == userId);
        if (user) {
            $("#user-id").val(user.id);
            $("#user-name").val(`${user.first_name} ${user.last_name}`);
            $("#user-email").val(user.email);
            $("#userModalLabel").text("Editar Usuario");
            $("#userModal").modal("show");
        }
    });
  
    // Evento que se dispara al hacer clic en el botón de eliminar un usuario.
    $(document).on("click", ".delete-user-btn", function () {
        let userId = $(this).data("id");
        localUsers = localUsers.filter(u => u.id != userId);
        renderUsers();
        showAlert("Usuario eliminado exitosamente", "success");
    });
  
    // Evento que se dispara al cerrar el modal.
    $("#userModal").on("hidden.bs.modal", function () {
        $("#user-form")[0].reset();
        $("#user-id").val("");
        $("#userModalLabel").text("Agregar Usuario");
    });
  
    // Inicializar los usuarios al cargar la página.
    loadUsers();
  });
  


  let myCarousel = document.querySelector('#carouselExampleAutoplaying');
let carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000,
    ride: 'carousel'
});


form.addEventListener('submit', function(event) {
    // Validación de Nombre
    const nombre = document.getElementById('Nombre').value;
    const nombrePattern = /^[A-Za-z]+$/; // Solo letras
    if (!nombrePattern.test(nombre)) {
        alert("El nombre solo puede contener letras.");
        event.preventDefault();
        return;
    }

    // Validación de Teléfono
    const telefono = document.getElementById('Telefono').value;
    const telefonoPattern = /^[0-9]{10}$/; // 10 dígitos
    if (!telefonoPattern.test(telefono)) {
        alert("El número de teléfono debe contener solo 10 dígitos.");
        event.preventDefault();
        return;
    }

    // Validación de Correo Electrónico
    const correo = document.getElementById('Correo').value;
    const correoPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato básico de correo
    if (!correoPattern.test(correo)) {
        alert("Por favor, introduzca una dirección de correo electrónico válida.");
        event.preventDefault();
        return;
    }

    // Validación de Mensaje
    const mensaje = document.getElementById('Mensaje').value;
    if (mensaje.length > 255) {
        alert("El mensaje no puede tener más de 255 caracteres.");
        event.preventDefault();
        return;
    }
});






