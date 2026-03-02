const API_URL = "http://localhost:3000/products";

let form = document.getElementById("product-form");
let productsBody = document.getElementById("products-body");
let statusEl = document.getElementById("status");
let submitBtn = document.getElementById("submit-btn");
let cancelBtn = document.getElementById("cancel-btn");
let editingId = null;
let isError = false;
let idcounter = null;
function setStatus(message, isError ) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#b91c1c" : "#065f46";
}

function resetForm() {
  form.reset();
  editingId = null;
  submitBtn.textContent = "Add Product";
  cancelBtn.style.display = "none";
}

function renderProducts(products) {
  productsBody.innerHTML = "";
  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.desc}</td>
      <td>
        <button class="edit-btn" data-id="${product.id}">Edit</button>
        <button class="delete-btn" data-id="${product.id}">Delete</button>
      </td>
    `;
    productsBody.appendChild(row);
  });
}


function loadProducts() {
  if(idcounter === null){
    let idcounter = prompt("Enter the starting ID for new products (must be a number):", "1");
    localStorage.setItem("idcounter", idcounter);
  }
  fetch(API_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
      return res.json();
    })
    .then((products) => {
      renderProducts(products);
      setStatus("Products loaded.");
    })
    .catch((err) => setStatus(err.message, true));
}

function addProduct(product) {
  submitBtn.disabled = true;
  product.id = localStorage.getItem("idcounter");
  localStorage.setItem("idcounter", localStorage.getItem("idcounter") + 1);
  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to add product (${res.status})`);
      return res.json();
    })
    .then(() => {
      setStatus("Product added.");
      resetForm();
      loadProducts();
    })
    .catch((err) => setStatus(err.message, true))
    .finally(() => {
      submitBtn.disabled = false;
    });
}

function updateProduct(id, product) {
  submitBtn.disabled = true;
  setStatus("Updating…");
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to update product (${res.status})`);
      return res.json();
    })
    .then(() => {
      setStatus("Product updated.");
      resetForm();
      loadProducts();
    })
    .catch((err) => setStatus(err.message, true))
    .finally(() => {
      submitBtn.disabled = false;
    });
}

function deleteProduct(id) {
  setStatus("Deleting…");
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to delete product (${res.status})`);
      setStatus("Product deleted.");
      loadProducts();
    })
    .catch((err) => setStatus(err.message, true));
}

function startEdit(id) {
  fetch(`${API_URL}/${id}`)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch product (${res.status})`);
      return res.json();
    })
    .then((product) => {
      document.getElementById("product-id").value = product.id;
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-desc").value = product.desc;
      editingId = id;
      submitBtn.textContent = "Update Product";
      cancelBtn.style.display = "inline-block";
      setStatus("Editing product — make changes and click Update.");
      document.getElementById("product-name").focus();
    })
    .catch((err) => setStatus(err.message, true));
}


form.addEventListener("submit", (event) => {
  event.preventDefault();
  const product = {
    id: document.getElementById("product-id").value.trim(),
    name: document.getElementById("product-name").value.trim(),
    desc: document.getElementById("product-desc").value.trim(),
  };

  if (editingId !== null) {
    updateProduct(editingId, product);
  } else {
    addProduct(product);
  }
});

cancelBtn.addEventListener("click", () => {
  resetForm();
  setStatus("");
});

productsBody.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("edit-btn")) {
    startEdit(target.dataset.id);
  }
  if (target.classList.contains("delete-btn")) {
    deleteProduct(target.dataset.id);
  }
});


loadProducts();
