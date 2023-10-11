var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var productContainer = document.createElement("div");
productContainer.className = "product-container";
var countofButtons = 0;
var count = 0;
var cartCount = document.createElement("sup");
cartCount.className = "bg-white text-secondary mx-2 py-1 px-2 rounded";
function getCartCount() {
    var cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
    count = 0;
    cartData.forEach(function (c) {
        count += c.quantity;
    });
    return count;
}
cartCount.textContent = getCartCount() + "";
function navbar() {
    var nav = document.createElement("nav");
    // Styling navbar
    nav.className = "navbar navbar-expand-lg navbar-dark bg-dark py-2";
    // Left Half
    var span = document.createElement("span");
    span.innerText = "Ecommerce";
    span.className = "navbar-brand mx-5 fw-bold fs-3 ";
    // Right Half
    var div = document.createElement("div");
    div.className = "navbar-nav ms-auto";
    // Home link
    var a1 = document.createElement("a");
    a1.innerText = "Home";
    a1.style.cursor = "mouse";
    a1.addEventListener("click", function () {
        window.location.reload();
        productContainer.innerHTML = "";
        getDataProducts("all");
    });
    a1.className = "nav-link btn";
    // Categories dropdown
    var categoryDropdown = document.createElement("div");
    categoryDropdown.classList.add("dropdown");
    var dropdownButton = document.createElement("button");
    dropdownButton.classList.add("btn", "btn-secondary", "dropdown-toggle");
    dropdownButton.type = "button";
    dropdownButton.id = "categoryDropdownButton";
    dropdownButton.textContent = "Categories";
    dropdownButton.setAttribute("data-bs-toggle", "dropdown");
    dropdownButton.setAttribute("aria-expanded", "false");
    var dropdownMenu = document.createElement("ul");
    dropdownMenu.classList.add("dropdown-menu");
    // Add option for men's clothing
    var mensOption = document.createElement("li");
    var mensLink = document.createElement("a");
    mensLink.classList.add("dropdown-item");
    mensLink.textContent = "Men's Clothing";
    // mensLink.href = "categories.html?category="+mensLink.textContent;
    mensLink.addEventListener("click", function () {
        productContainer.innerHTML = "";
        getDataProducts("men's clothing");
        dropdownButton.textContent = "Men's Clothing";
    });
    mensOption.appendChild(mensLink);
    dropdownMenu.appendChild(mensOption);
    // Add option for jewelry
    var jewelryOption = document.createElement("li");
    var jewelryLink = document.createElement("a");
    jewelryLink.classList.add("dropdown-item");
    jewelryLink.textContent = "Jewelry";
    jewelryLink.addEventListener("click", function () {
        productContainer.innerHTML = "";
        getDataProducts("jewelry");
        dropdownButton.textContent = "Jewelry";
    });
    jewelryOption.appendChild(jewelryLink);
    dropdownMenu.appendChild(jewelryOption);
    // Add option for electronics
    var electronicsOption = document.createElement("li");
    var electronicsLink = document.createElement("a");
    electronicsLink.classList.add("dropdown-item");
    electronicsLink.textContent = "Electronics";
    electronicsLink.addEventListener("click", function () {
        productContainer.innerHTML = "";
        getDataProducts("electronics");
        dropdownButton.textContent = "Electronics";
    });
    electronicsOption.appendChild(electronicsLink);
    dropdownMenu.appendChild(electronicsOption);
    categoryDropdown.appendChild(dropdownButton);
    categoryDropdown.appendChild(dropdownMenu);
    // Cart link
    var a2 = document.createElement("a");
    a2.innerText = "Cart";
    a2.className = "nav-link btn mx-2";
    a2.addEventListener("click", function () {
        productContainer.innerHTML = "";
        displayCart();
        dropdownButton.textContent = "Cart";
    });
    a2.appendChild(cartCount);
    div.appendChild(a1);
    div.appendChild(categoryDropdown);
    div.appendChild(a2);
    nav.appendChild(span);
    nav.appendChild(div);
    document.body.appendChild(nav);
    // Custom styling
    span.style.color = "#fff";
    a1.style.color = "#fff";
    a1.style.marginRight = "20px";
    a1.style.textTransform = "uppercase";
    a2.style.color = "#fff";
    a2.style.marginRight = "20px";
    a2.style.textTransform = "uppercase";
    categoryDropdown.style.marginRight = "20px";
}
navbar();
var getProductDataById = function (productId) { return __awaiter(_this, void 0, void 0, function () {
    var response, productData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(productId))];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                productData = _a.sent();
                return [2 /*return*/, productData];
            case 3:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var ProductImpl = /** @class */ (function () {
    function ProductImpl(id, title, price, image, category, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.image = image;
        this.category = category;
        this.description = description;
    }
    return ProductImpl;
}());
;
var Cart = /** @class */ (function () {
    function Cart(id, quantity) {
        this.prodId = id;
        this.quantity = quantity;
    }
    return Cart;
}());
// Make an async call to the API and retrieve the product data
function getDataProducts(category) {
    return __awaiter(this, void 0, void 0, function () {
        var response, productsData, allProducts, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    allProducts = [];
                    if (!(category == "all")) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("https://fakestoreapi.com/products")];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, fetch("https://fakestoreapi.com/products/category/".concat(category))];
                case 3:
                    response = _a.sent();
                    _a.label = 4;
                case 4: return [4 /*yield*/, response.json()];
                case 5:
                    products = _a.sent();
                    products.forEach(function (p) {
                        var newp = new ProductImpl(p.id, p.title, p.price, p.image, p.category, p.description);
                        allProducts.push(newp);
                    });
                    displayProducts(allProducts);
                    return [2 /*return*/];
            }
        });
    });
}
getDataProducts("all");
function displaySpecificProduct(product) {
    // Remove the current content
    var productContainer = document.getElementById("product-container");
    if (productContainer !== null) {
        productContainer.innerHTML = "";
    }
    // Display the details of the selected product
    var productDetails = document.createElement("div");
    productDetails.className = "card ";
    productDetails.style.width = "18rem";
    var productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.className = "card-img-top";
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var productTitle = document.createElement("h2");
    productTitle.className = "card-title";
    productTitle.textContent = product.title;
    var productPrice = document.createElement("p");
    productPrice.className = "product-price";
    productPrice.textContent = "Price: $" + product.price;
    var productCategory = document.createElement("p");
    productCategory.className = "product-category";
    productCategory.textContent = "Category: " + product.category;
    var productDescription = document.createElement("p");
    productDescription.className = "product-description";
    productDescription.textContent = product.description;
    productDetails.appendChild(productImage);
    productDetails.appendChild(productTitle);
    productDetails.appendChild(productPrice);
    productDetails.appendChild(productCategory);
    productDetails.appendChild(productDescription);
    document.body.appendChild(productDetails);
}
// Define a function to display products using Bootstrap
function displayProducts(products) {
    return __awaiter(this, void 0, void 0, function () {
        var productRow;
        return __generator(this, function (_a) {
            productRow = document.createElement("div");
            productRow.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 my-3 mx-3";
            products.forEach(function (product) {
                var productCol = document.createElement("div");
                productCol.className =
                    "col mb-4 d-flex align-items-center justify-content-center productDiv mt-4 h-25";
                // Create the card and its image
                var productCard = document.createElement("div");
                productCard.className = "card";
                productCard.style.width = "25rem";
                // productCard.style.height="20rem";
                var imageWrapper = document.createElement("div");
                imageWrapper.className = "text-center mt-2";
                var image = document.createElement("img");
                image.className = "card-img-top img-fluid h-10";
                image.src = product.image;
                image.alt = product.title;
                image.style.height = "17rem";
                // Create the card body with the product information
                var cardBody = document.createElement("div");
                cardBody.className = "card-body d-flex flex-column";
                var title = document.createElement("h5");
                title.className = "card-title";
                title.textContent = product.title;
                var price = document.createElement("p");
                price.className = "card-text";
                price.textContent = "Price: $" + product.price;
                var category = document.createElement("p");
                category.className = "card-text";
                category.textContent = "Category: " + product.category;
                // const description = document.createElement("p");
                // description.className = "card-text flex-grow-1";
                // description.textContent = product.description;
                var buttons = document.createElement("div");
                buttons.className = "d-flex";
                var viewButton = document.createElement("a");
                viewButton.className = "btn btn-primary mt-2 ";
                viewButton.textContent = "View Details";
                viewButton.addEventListener("click", function () {
                    productContainer.innerHTML = "";
                    renderProduct(product.id);
                });
                // Add event listener to view button to redirect to product page
                var addToCart = document.createElement("a");
                addToCart.className = "btn btn-primary mt-2 mx-3";
                addToCart.textContent = "Add to Cart";
                // addToCart.href="cart.html"
                var count = 0;
                addToCart.addEventListener("click", function (e) {
                    var cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
                    cartCount.textContent = getCartCount() + "";
                    // alert("Item added to cart");
                    var productIndex = cartData.findIndex(function (item) { return item.prodId === product.id; });
                    console.log(productIndex);
                    if (productIndex == -1) {
                        // Product not found in cart - add it to the cart with quantity 1
                        var newCartItem = new Cart(product.id, 1);
                        cartData.push(newCartItem);
                        localStorage.setItem("cartData", JSON.stringify(cartData));
                    }
                    else {
                        // Product found in cart - increase its quantity by 1
                        // console.log(cartData[productIndex].quantity);
                        cartData[productIndex].quantity += 1;
                        localStorage.setItem("cartData", JSON.stringify(cartData));
                    }
                });
                // Append all elements to card and column
                cardBody.appendChild(title);
                cardBody.appendChild(price);
                cardBody.appendChild(category);
                // cardBody.appendChild(description);
                buttons.appendChild(viewButton);
                buttons.appendChild(addToCart);
                cardBody.appendChild(buttons);
                imageWrapper.appendChild(image);
                productCard.appendChild(imageWrapper);
                productCard.appendChild(cardBody);
                productCol.appendChild(productCard);
                productRow.appendChild(productCol);
            });
            // Append row to container
            productContainer.appendChild(productRow);
            document.body.append(productContainer);
            return [2 /*return*/];
        });
    });
}
localStorage.clear();
function getProductById(productId) {
    return __awaiter(this, void 0, void 0, function () {
        var response, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://fakestoreapi.com/products/".concat(productId))];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    product = _a.sent();
                    return [2 /*return*/, product];
            }
        });
    });
}
function renderProduct(id) {
    return __awaiter(this, void 0, void 0, function () {
        var productId, product_1, backButton, productContainer_1, productCard, image, div, description, title, price, buttond;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    productId = id;
                    if (!(productId !== null)) return [3 /*break*/, 2];
                    return [4 /*yield*/, getProductById(id)];
                case 1:
                    product_1 = _a.sent();
                    console.log(product_1);
                    backButton = document.createElement("button");
                    backButton.textContent = "Back";
                    backButton.className = "btn btn-danger my-5 mx-5";
                    backButton.style.marginBottom = "0px";
                    document.body.append(backButton);
                    backButton.addEventListener("click", function () {
                        window.location.reload();
                    });
                    productContainer_1 = document.createElement("div");
                    productContainer_1.id = "product-container";
                    productContainer_1.style.display = "flex";
                    productContainer_1.style.justifyContent = "center";
                    productContainer_1.style.alignItems = "center";
                    productContainer_1.style.height = "100vh";
                    productCard = document.createElement("div");
                    productCard.style.margin = "100px";
                    productCard.style.marginTop = "20px";
                    productCard.style.display = "flex";
                    productCard.style.flexDirection = "row";
                    productCard.style.fontFamily = "Arial, sans-serif";
                    productCard.style.color = "#333";
                    image = document.createElement("img");
                    image.src = product_1.image;
                    image.style.width = "300px";
                    image.style.marginRight = "100px";
                    productCard.appendChild(image);
                    div = document.createElement("div");
                    div.style.display = "flex";
                    div.style.flexDirection = "column";
                    // div.style.justifyContent="center"
                    // div.style.alignItems = "center";
                    div.style.marginLeft = "20px";
                    description = document.createElement("p");
                    title = document.createElement("h3");
                    price = document.createElement("h5");
                    description.textContent = product_1.description;
                    title.textContent = product_1.title;
                    price.textContent = "Price: $".concat(product_1.price.toFixed(2));
                    buttond = document.createElement("button");
                    buttond.textContent = "Add to Cart";
                    buttond.className = "btn btn-success";
                    buttond.addEventListener("click", function (e) {
                        var cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
                        cartCount.textContent = getCartCount() + "";
                        // alert("Item added to cart");
                        var productIndex = cartData.findIndex(function (item) { return item.prodId === product_1.id; });
                        console.log(productIndex);
                        if (productIndex == -1) {
                            // Product not found in cart - add it to the cart with quantity 1
                            var newCartItem = new Cart(product_1.id, 1);
                            cartData.push(newCartItem);
                            localStorage.setItem("cartData", JSON.stringify(cartData));
                        }
                        else {
                            // Product found in cart - increase its quantity by 1
                            // console.log(cartData[productIndex].quantity);
                            cartData[productIndex].quantity += 1;
                            localStorage.setItem("cartData", JSON.stringify(cartData));
                        }
                    });
                    div.appendChild(title);
                    div.appendChild(description);
                    div.appendChild(price);
                    div.appendChild(buttond);
                    productCard.appendChild(div);
                    productContainer_1.appendChild(productCard);
                    document.body.appendChild(productContainer_1);
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function displayCart() {
    return __awaiter(this, void 0, void 0, function () {
        var cartData, cartContainer, tot_price, _loop_1, i, checkout, label;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
                    cartContainer = document.createElement("div");
                    cartContainer.style.maxWidth = "600px";
                    cartContainer.className = "d-flex flex-wrap justify-content-center align-items-center  mx-auto";
                    cartContainer.classList.add("cart-container");
                    tot_price = 0;
                    _loop_1 = function (i) {
                        var item, productData, title, image, price, quantity, cartItem, productImg, productInfo, productName, productPrice, quantityContainer, quantityLabel, decreaseBtn, quantityEl, increaseBtn;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    item = cartData[i];
                                    return [4 /*yield*/, getProductDataById(item.prodId)];
                                case 1:
                                    productData = _b.sent();
                                    title = productData.title, image = productData.image, price = productData.price;
                                    quantity = item.quantity;
                                    tot_price += price * quantity;
                                    cartItem = document.createElement("div");
                                    cartItem.className = "d-flex my-5 d-inline";
                                    // cartItem.style.width="500px";
                                    cartItem.classList.add("cart-item");
                                    productImg = document.createElement("img");
                                    productImg.src = image;
                                    productImg.style.width = "25vw";
                                    productImg.style.height = "25vw";
                                    productImg.alt = "Product image of ".concat(title);
                                    productImg.className = "mx-5";
                                    cartItem.appendChild(productImg);
                                    productInfo = document.createElement("div");
                                    productInfo.classList.add("cart-item-info");
                                    productName = document.createElement("h3");
                                    productName.classList.add("cart-item-product-name");
                                    productName.textContent = title;
                                    productInfo.appendChild(productName);
                                    productPrice = document.createElement("div");
                                    productPrice.classList.add("cart-item-price");
                                    productPrice.textContent = "Price: $".concat(price);
                                    productInfo.appendChild(productPrice);
                                    quantityContainer = document.createElement("div");
                                    quantityContainer.classList.add("cart-item-quantity-container");
                                    quantityLabel = document.createElement("span");
                                    quantityLabel.textContent = "Quantity:";
                                    quantityContainer.appendChild(quantityLabel);
                                    decreaseBtn = document.createElement("button");
                                    decreaseBtn.className = "mx-2 quantity-btn rounded";
                                    decreaseBtn.textContent = "-";
                                    decreaseBtn.addEventListener("click", function () {
                                        if (item.quantity > 1) {
                                            item.quantity--;
                                            localStorage.setItem("cartData", JSON.stringify(cartData));
                                            quantityEl.textContent = item.quantity + "";
                                            cartCount.textContent = getCartCount() + "";
                                        }
                                    });
                                    quantityContainer.appendChild(decreaseBtn);
                                    quantityEl = document.createElement("span");
                                    quantityEl.classList.add("cart-item-quantity");
                                    quantityEl.textContent = quantity.toString();
                                    quantityContainer.appendChild(quantityEl);
                                    increaseBtn = document.createElement("button");
                                    increaseBtn.className = " mx-2 rounded quantity-btn ";
                                    increaseBtn.textContent = "+";
                                    increaseBtn.addEventListener("click", function () {
                                        item.quantity++;
                                        localStorage.setItem("cartData", JSON.stringify(cartData));
                                        quantityEl.textContent = item.quantity + "";
                                        cartCount.textContent = getCartCount() + "";
                                    });
                                    quantityContainer.appendChild(increaseBtn);
                                    productInfo.appendChild(quantityContainer);
                                    cartItem.appendChild(productInfo);
                                    cartContainer.appendChild(cartItem);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < cartData.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    checkout = document.createElement("button");
                    checkout.textContent = "Checkout";
                    checkout.className = "btn btn-success mx-3";
                    label = document.createElement("span");
                    label.textContent = "TotalPrice:    " + tot_price + " $";
                    cartContainer.append(checkout);
                    cartContainer.append(label);
                    document.body.appendChild(cartContainer);
                    return [2 /*return*/];
            }
        });
    });
}
// displayCart();
