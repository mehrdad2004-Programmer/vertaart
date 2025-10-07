import { fetchData } from "../api/api.js";

function showDetails(id){
    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const category = document.querySelector("#categoury");
    const code = document.querySelector("#code");
    const description = document.querySelector("#description");

    // Get ALL products from localStorage
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]');
    
    // Find the specific product by ID
    const product = allProducts.find(item => item.id == id);

    const pr_pic = document.querySelector("#product-pic")

    if (product) {
        title.textContent = product.title;
        price.textContent = product.price;
        category.textContent = product.categoury;
        code.textContent = product.id;
        description.textContent = product.description
        pr_pic.setAttribute("src", "http://mandegarhs.ir/verta/storage/app/public/products/" + product.pic)
        pr_pic.setAttribute("class", "product-img")
        pr_pic.setAttribute("height", "170px")
        pr_pic.setAttribute("width", "170px")
        console.log('Found product:', product);
    } else {
        console.error('Product not found with ID:', id);
        title.textContent = 'Product not found';
    }
}

showDetails(new URLSearchParams(window.location.search).get('id'));