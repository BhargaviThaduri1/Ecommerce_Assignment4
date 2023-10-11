const productContainer = document.createElement("div") as HTMLDivElement;
productContainer.className="product-container";
let countofButtons=0;
let count=0;
let cartCount = document.createElement("sup") as HTMLScriptElement;
cartCount.className = "bg-white text-secondary mx-2 py-1 px-2 rounded";

function getCartCount():Number{
  const cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
  count=0;
  cartData.forEach((c)=>{
    count+=c.quantity;
  })
  return count;
}
cartCount.textContent=getCartCount()+"";


function navbar() {
  let nav = document.createElement("nav") as HTMLDivElement;

  // Styling navbar
  nav.className = "navbar navbar-expand-lg navbar-dark bg-dark py-2";

  // Left Half
  let span = document.createElement("span") as HTMLSpanElement;
  span.innerText = "Ecommerce";
  span.className = "navbar-brand mx-5 fw-bold fs-3 ";

  // Right Half
  let div = document.createElement("div") as HTMLDivElement;
  div.className = "navbar-nav ms-auto";

  // Home link
  let a1 = document.createElement("a") as HTMLAnchorElement;
  a1.innerText = "Home";
  a1.style.cursor="mouse"
  a1.addEventListener("click",()=>{
    window.location.reload();
    productContainer.innerHTML="";
    getDataProducts("all");
  })
  a1.className = "nav-link btn";


  // Categories dropdown
  const categoryDropdown = document.createElement("div") as HTMLDivElement;
  categoryDropdown.classList.add("dropdown");

  const dropdownButton = document.createElement("button") as HTMLButtonElement;
  dropdownButton.classList.add("btn", "btn-secondary", "dropdown-toggle");
  dropdownButton.type = "button";
  dropdownButton.id = "categoryDropdownButton";
  dropdownButton.textContent = "Categories";
  dropdownButton.setAttribute("data-bs-toggle", "dropdown");
  dropdownButton.setAttribute("aria-expanded", "false");

  const dropdownMenu = document.createElement("ul") as HTMLUListElement;
  dropdownMenu.classList.add("dropdown-menu");

  // Add option for men's clothing
  const mensOption = document.createElement("li") as HTMLLIElement;
  const mensLink = document.createElement("a") as HTMLAnchorElement;
  mensLink.classList.add("dropdown-item");
  mensLink.textContent = "Men's Clothing";
  // mensLink.href = "categories.html?category="+mensLink.textContent;
  mensLink.addEventListener("click", () => {
    productContainer.innerHTML = "";
    getDataProducts("men's clothing");
    dropdownButton.textContent = "Men's Clothing";
  });

  mensOption.appendChild(mensLink);
  dropdownMenu.appendChild(mensOption);

  // Add option for jewelry
  const jewelryOption = document.createElement("li") as HTMLLIElement;
  const jewelryLink = document.createElement("a") as HTMLAnchorElement;
  jewelryLink.classList.add("dropdown-item");
  jewelryLink.textContent = "Jewelry";
  jewelryLink.addEventListener("click", () => {
    productContainer.innerHTML = "";
    getDataProducts("jewelry");
    dropdownButton.textContent = "Jewelry";
  });

  jewelryOption.appendChild(jewelryLink);
  dropdownMenu.appendChild(jewelryOption);

  // Add option for electronics
  const electronicsOption = document.createElement("li") as HTMLLIElement;
  const electronicsLink = document.createElement("a") as HTMLAnchorElement;
  electronicsLink.classList.add("dropdown-item");
  electronicsLink.textContent = "Electronics";
  electronicsLink.addEventListener("click", () => {
    productContainer.innerHTML = "";
    getDataProducts("electronics");
    dropdownButton.textContent = "Electronics";
  });

  electronicsOption.appendChild(electronicsLink);
  dropdownMenu.appendChild(electronicsOption);

  categoryDropdown.appendChild(dropdownButton);
  categoryDropdown.appendChild(dropdownMenu);

  // Cart link
  let a2 = document.createElement("a") as HTMLAnchorElement;
  a2.innerText = "Cart";
  a2.className = "nav-link btn mx-2";
  a2.addEventListener("click", () => {
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


const getProductDataById = async (productId: number) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const productData = await response.json();
    return productData;
  } catch (error) {
    console.error(error);
  }
};

// ------------------PRODUCTS LIST--------------
// Define the product interface
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

class ProductImpl implements Product {
  constructor(
    public id: number,
    public title: string,
    public price: number,
    public image: string,
    public category: string,
    public description: string,
  ) {}
};

interface CartInte {
  prodId: number;
  quantity: number;
}

class Cart implements CartInte {
  prodId: number;
  quantity: number;
  constructor(id: number, quantity: number) {
    this.prodId = id;
    this.quantity = quantity;
  }
}


// Make an async call to the API and retrieve the product data
async function getDataProducts(category:String) {
  let response;
  let productsData;
  let allProducts:ProductImpl[]=[];
  if(category=="all"){
   response = await fetch("https://fakestoreapi.com/products");
  }
  else{
    response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
  }
  const products = await response.json();
  products.forEach((p: Product) => {
    let newp = new ProductImpl(
      p.id,
      p.title,
      p.price,
      p.image,
      p.category,
      p.description,
    );
    allProducts.push(newp);
  });
  displayProducts(allProducts);
}
getDataProducts("all");


function displaySpecificProduct(product: Product): void {
  // Remove the current content
  const productContainer = document.getElementById("product-container");
  if (productContainer !== null) {
    productContainer.innerHTML = "";
  }

  // Display the details of the selected product
  const productDetails = document.createElement("div");
  productDetails.className = "card ";
  productDetails.style.width="18rem";


  const productImage = document.createElement("img");
  productImage.src = product.image;
  productImage.className = "card-img-top";

  const cardBody = document.createElement("div") as HTMLDivElement;
  cardBody.className = "card-body";


  
  const productTitle = document.createElement("h2");
  productTitle.className = "card-title";
  productTitle.textContent = product.title;

  const productPrice = document.createElement("p");
  productPrice.className = "product-price";
  productPrice.textContent = "Price: $" + product.price;

  const productCategory = document.createElement("p");
  productCategory.className = "product-category";
  productCategory.textContent = "Category: " + product.category;

  const productDescription = document.createElement("p");
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
async function displayProducts(products: Product[]): void {
 

    // Create a row for the grid and set a margin between the cards
    const productRow = document.createElement("div");
    productRow.className = "row row-cols-1 row-cols-sm-2 row-cols-md-3 my-3 mx-3";

    products.forEach((product) => {
      const productCol = document.createElement("div");
      productCol.className =
        "col mb-4 d-flex align-items-center justify-content-center productDiv mt-4 h-25";

      // Create the card and its image
      const productCard = document.createElement("div");
      productCard.className = "card";
      productCard.style.width = "25rem";
      // productCard.style.height="20rem";

      const imageWrapper = document.createElement("div");
      imageWrapper.className = "text-center mt-2";
      const image = document.createElement("img");
      image.className = "card-img-top img-fluid h-10";
      image.src = product.image;
      image.alt = product.title;
      image.style.height = "17rem";

    
      // Create the card body with the product information
      const cardBody = document.createElement("div");
      cardBody.className = "card-body d-flex flex-column";
      const title = document.createElement("h5");
      title.className = "card-title";
      title.textContent = product.title;
      const price = document.createElement("p");
      price.className = "card-text";
      price.textContent = "Price: $" + product.price;
      const category = document.createElement("p");
      category.className = "card-text";
      category.textContent = "Category: " + product.category;
      // const description = document.createElement("p");
      // description.className = "card-text flex-grow-1";
      // description.textContent = product.description;
      const buttons = document.createElement("div") as HTMLDivElement;
      buttons.className = "d-flex" ;

      const viewButton = document.createElement("a");
      viewButton.className = "btn btn-primary mt-2 ";
      viewButton.textContent = "View Details";
      
      viewButton.addEventListener("click",()=>{
        productContainer.innerHTML = "";
        renderProduct(product.id);

      })
      // Add event listener to view button to redirect to product page
      
      const addToCart = document.createElement("a");
      addToCart.className = "btn btn-primary mt-2 mx-3";
      addToCart.textContent = "Add to Cart";
      // addToCart.href="cart.html"
      let count=0;
      addToCart.addEventListener("click",(e)=>{
        const cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
        cartCount.textContent=getCartCount()+"";
      

        // alert("Item added to cart");
        const productIndex = cartData.findIndex((item) => item.prodId === product.id);
        console.log(productIndex);
        if (productIndex==-1) {
          // Product not found in cart - add it to the cart with quantity 1
          const newCartItem = new Cart(product.id, 1);
          cartData.push(newCartItem);
          localStorage.setItem("cartData", JSON.stringify(cartData));

        } else {
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
  }


localStorage.clear();

async function getProductById(productId: number): Promise<Product> {
  const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const product: Product = await response.json();
  return product;
}

async function renderProduct(id:number): Promise<void> {
  const productId = id;
  if (productId !== null) {
    const product = await getProductById(id);
    console.log(product);
    const backButton = document.createElement("button") as HTMLButtonElement;
    backButton.textContent = "Back";
    backButton.className = "btn btn-danger my-5 mx-5";
    backButton.style.marginBottom  = "0px";
    document.body.append(backButton);
    backButton.addEventListener("click",()=>{
      window.location.reload();

    })

    const productContainer = document.createElement("div");
    productContainer.id = "product-container";
    

    productContainer.style.display = "flex";
    productContainer.style.justifyContent = "center";
    productContainer.style.alignItems = "center";
    productContainer.style.height = "100vh";

    const productCard = document.createElement("div");
    productCard.style.margin="100px";
    productCard.style.marginTop="20px";
    productCard.style.display = "flex";
    productCard.style.flexDirection = "row";
    productCard.style.fontFamily = "Arial, sans-serif";
    productCard.style.color = "#333";

    const image = document.createElement("img") as HTMLImageElement;
    image.src = product.image;
    image.style.width = "300px";
    image.style.marginRight="100px";

    productCard.appendChild(image);

    const div = document.createElement("div") as HTMLElement;
    div.style.display = "flex";
    div.style.flexDirection = "column";
    // div.style.justifyContent="center"
    // div.style.alignItems = "center";
    div.style.marginLeft = "20px";

    const description = document.createElement("p") as HTMLElement;
    const title = document.createElement("h3") as HTMLElement;
    const price = document.createElement("h5") as HTMLElement;
    description.textContent = product.description;
    title.textContent = product.title;
    price.textContent = `Price: $${product.price.toFixed(2)}`;

    let buttond = document.createElement("button") as HTMLButtonElement;
    buttond.textContent = "Add to Cart";
    buttond.className = "btn btn-success";
    
    buttond.addEventListener("click",(e)=>{
      const cartData = JSON.parse(localStorage.getItem("cartData") || "[]");
      cartCount.textContent=getCartCount()+"";
    

      // alert("Item added to cart");
      const productIndex = cartData.findIndex((item) => item.prodId === product.id);
      console.log(productIndex);
      if (productIndex==-1) {
        // Product not found in cart - add it to the cart with quantity 1
        const newCartItem = new Cart(product.id, 1);
        cartData.push(newCartItem);
        localStorage.setItem("cartData", JSON.stringify(cartData));

      } else {
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

    productContainer.appendChild(productCard);
    document.body.appendChild(productContainer);
  }
}



async function displayCart() {
  const cartData = JSON.parse(localStorage.getItem("cartData") || "[]");

  const cartContainer = document.createElement("div");
  cartContainer.style.maxWidth = "600px";
  cartContainer.className = "d-flex flex-wrap justify-content-center align-items-center  mx-auto";
  cartContainer.classList.add("cart-container");

  let tot_price=0;
  for (let i = 0; i < cartData.length; i++) {
    const item = cartData[i];
    const productData = await getProductDataById(item.prodId);

    const { title, image, price } = productData;
    const { quantity } = item;
    tot_price += price*quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "d-flex my-5 d-inline";
    // cartItem.style.width="500px";
    cartItem.classList.add("cart-item");

    const productImg = document.createElement("img");
    productImg.src = image;
    productImg.style.width = "25vw";
    productImg.style.height = "25vw";
    productImg.alt = `Product image of ${title}`;
    productImg.className = "mx-5"
    cartItem.appendChild(productImg);

    const productInfo = document.createElement("div");
    productInfo.classList.add("cart-item-info");

    const productName = document.createElement("h3");
    productName.classList.add("cart-item-product-name");
    productName.textContent = title;
    productInfo.appendChild(productName);

    const productPrice = document.createElement("div");
    productPrice.classList.add("cart-item-price");
    productPrice.textContent = `Price: $${price}`;
    productInfo.appendChild(productPrice);

    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("cart-item-quantity-container");

    const quantityLabel = document.createElement("span");
    quantityLabel.textContent = "Quantity:";
    quantityContainer.appendChild(quantityLabel);

    const decreaseBtn = document.createElement("button");
    decreaseBtn.className = "mx-2 quantity-btn rounded"
    decreaseBtn.textContent = "-";
    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cartData", JSON.stringify(cartData));
        quantityEl.textContent = item.quantity + "";
        cartCount.textContent = getCartCount() + "";
      }
    });
    quantityContainer.appendChild(decreaseBtn);

    const quantityEl = document.createElement("span");
    quantityEl.classList.add("cart-item-quantity");
    quantityEl.textContent = quantity.toString();
    quantityContainer.appendChild(quantityEl);

    const increaseBtn = document.createElement("button");
    increaseBtn.className = " mx-2 rounded quantity-btn "
    increaseBtn.textContent = "+";
    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cartData", JSON.stringify(cartData));
      quantityEl.textContent = item.quantity + "";
      cartCount.textContent = getCartCount() + "";
    });
    quantityContainer.appendChild(increaseBtn);

    productInfo.appendChild(quantityContainer);
    cartItem.appendChild(productInfo);

    cartContainer.appendChild(cartItem);
  }

  const checkout = document.createElement("button") as HTMLElement;
  checkout.textContent = "Checkout";
  checkout.className = "btn btn-success mx-3";

  const label = document.createElement("span") as HTMLSpanElement;
  label.textContent = "TotalPrice:    "+tot_price+" $";

  cartContainer.append(checkout);
  cartContainer.append(label);

  document.body.appendChild(cartContainer);
}

// displayCart();