function initOrderCreate() {
    const hiddenInputs = document.getElementById("hidden-inputs");
    const productSelect = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const addButton = document.getElementById("add-product");
    const detailBody = document.getElementById("detail-body");
    const totalElement = document.getElementById("total");

    if (!addButton) {
        return;
    }

    let items = [];

    bindEvents();

    function bindEvents() {
        addButton.addEventListener("click", addProduct);
    }

    function addProduct() {
        const option = productSelect.options[productSelect.selectedIndex];

        if (!option.value) {
            alert("Seleccione un producto.");
            return;
        }

        const quantity = parseInt(quantityInput.value);

        if (isNaN(quantity) || quantity <= 0) {
            alert("Cantidad inválida.");
            return;
        }

        const stock = parseInt(option.dataset.stock);

        const existing = items.find((item) => item.product_id == option.value);

        if (existing) {
            const newQuantity = existing.quantity + quantity;

            if (newQuantity > stock) {
                alert("La cantidad total supera el stock disponible.");
                return;
            }

            existing.quantity = newQuantity;
        } else {
            if (quantity > stock) {
                alert("La cantidad supera el stock disponible.");
                return;
            }

            items.push({
                product_id: option.value,
                sku: option.dataset.sku,
                name: option.dataset.name,
                price: parseFloat(option.dataset.price),
                quantity: quantity,
            });
        }

        productSelect.selectedIndex = 0;
        quantityInput.value = 1;

        renderTable();
    }

    function removeProduct(index) {
        items.splice(index, 1);

        renderTable();
    }

    function renderTable() {
        detailBody.innerHTML = "";

        if (items.length === 0) {
            detailBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No hay productos agregados.
                    </td>
                </tr>
            `;
        } else {
            items.forEach((item, index) => {
                const subtotal = item.price * item.quantity;

                detailBody.innerHTML += `
                    <tr>

                        <td>
                            <strong>${item.name}</strong><br>
                            <small class="text-muted">
                                SKU: ${item.sku}
                            </small>
                        </td>

                        <td>$${item.price.toFixed(2)}</td>

                        <td>${item.quantity}</td>

                        <td>$${subtotal.toFixed(2)}</td>

                        <td>

                            <button
                                type="button"
                                class="btn btn-danger btn-sm remove-product"
                                data-index="${index}">

                                Eliminar

                            </button>

                        </td>

                    </tr>
                `;
            });
        }

        renderHiddenInputs();

        updateTotal();

        document.querySelectorAll(".remove-product").forEach((button) => {
            button.addEventListener("click", function () {
                removeProduct(Number(this.dataset.index));
            });
        });
    }

    function renderHiddenInputs() {
        hiddenInputs.innerHTML = "";

        items.forEach((item, index) => {
            hiddenInputs.innerHTML += `

                <input
                    type="hidden"
                    name="products[${index}][product_id]"
                    value="${item.product_id}">

                <input
                    type="hidden"
                    name="products[${index}][quantity]"
                    value="${item.quantity}">

            `;
        });
    }

    function updateTotal() {
        let total = 0;

        items.forEach((item) => {
            total += item.price * item.quantity;
        });

        totalElement.textContent = `$${total.toFixed(2)}`;
    }
}

initOrderCreate();
