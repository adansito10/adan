
$(document).ready(function () {
    const apiUrl = "https://test.utcv.edu.mx/api/products";

    let localProducts = []; // Variable local para almacenar los productos.

    // Función para cargar los productos desde la API.
    function loadProducts() {
        console.log("cargando productos...");
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
