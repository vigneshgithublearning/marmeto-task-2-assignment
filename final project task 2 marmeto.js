let showProducts = document.getElementById("showProducts");
let menButton = document.getElementById("menButton");
let womenButton = document.getElementById("womenButton");
let kidsButton = document.getElementById("kidsButton");
let productsData;
let FilterProducts;
let selectedCategory = "Men";

let createAndAppendProduct = function(value) {
    let {
        badge_text,
        title,
        vendor,
        price,
        image,
        compare_at_price
    } = value;
    let priceLess = compare_at_price - price;
    let discount = Math.floor((priceLess / compare_at_price) * 100);
    let bagdeFound = badge_text ? "product-bagde" : "";

    let productContainer = document.createElement("li");
    let productImgContainer = document.createElement("div");
    let productImgEle = document.createElement("img");
    let productImgBadgeEle = document.createElement("b");
    let productTitleEle = document.createElement("h2");
    let productVendorEle = document.createElement("h4");
    let productPriceEle = document.createElement("span");
    let productOrginalPriceEle = document.createElement("span");
    let productPriceDiscountEle = document.createElement("span");
    let productAddCartBtnEle = document.createElement("button");

    productImgEle.src = image;
    productImgEle.className = "product-img";
    productImgContainer.className = "product-img-container";
    productImgContainer.appendChild(productImgEle);
    productContainer.appendChild(productImgContainer);
    productImgBadgeEle.textContent = badge_text;
    productImgBadgeEle.className = bagdeFound;
    productImgContainer.appendChild(productImgBadgeEle);

    productTitleEle.textContent = title.slice(0, 22);
    productTitleEle.className = "product-title";
    productContainer.appendChild(productTitleEle);

    productVendorEle.textContent = vendor;
    productVendorEle.className = "product-vendor";
    productContainer.appendChild(productVendorEle);
    productPriceEle.textContent = "Rs " + price + '.00';
    productPriceEle.className = "product-price";
    productContainer.appendChild(productPriceEle);

    productOrginalPriceEle.textContent = compare_at_price;
    productOrginalPriceEle.className = "procuct-original-price";
    productContainer.appendChild(productOrginalPriceEle);

    productPriceDiscountEle.textContent = discount + " " + "% off";
    productPriceDiscountEle.className = "procuct-discount";
    productContainer.appendChild(productPriceDiscountEle);

    productAddCartBtnEle.textContent = "Add To Cart";
    productAddCartBtnEle.className = "product-btn";
    productContainer.appendChild(productAddCartBtnEle);
    productContainer.className = "product-container";

    showProducts.appendChild(productContainer);
};

let loopEachProduct = function(value) {
    for (let product of value.category_products) {
        createAndAppendProduct(product);
    }
};

menButton.className = "active-btn";

menButton.addEventListener("click", function(s) {
    showProducts.textContent = "";
    selectedCategory = s.target.value;
    menButton.className = "active-btn";
    womenButton.className = "";
    kidsButton.className = "";
    FilterProducts = productsData.find(
        (eachProduct) => eachProduct.category_name === selectedCategory
    );
    loopEachProduct(FilterProducts);
});

womenButton.addEventListener("click", function(s) {
    showProducts.textContent = "";
    selectedCategory = s.target.value;
    menButton.className = "";
    womenButton.className = "active-btn";
    kidsButton.className = "";
    FilterProducts = productsData.find(
        (eachProduct) => eachProduct.category_name === selectedCategory
    );
    loopEachProduct(FilterProducts);
});

kidsButton.addEventListener("click", (s) => {
    showProducts.textContent = "";
    selectedCategory = s.target.value;
    menButton.className = "";
    womenButton.className = "";
    kidsButton.className = "active-btn";
    FilterProducts = productsData.find(
        (eachProduct) => eachProduct.category_name === selectedCategory
    );
    loopEachProduct(FilterProducts);
});

let fetchApi = async () => {
    let url =
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
    let options = {
        method: "GET",
    };

    let req = await fetch(url, options);
    let res = await req.json();
    productsData = res.categories;
    FilterProducts = productsData.find(
        (eachProduct) => eachProduct.category_name === selectedCategory);
    loopEachProduct(FilterProducts);
};
fetchApi();