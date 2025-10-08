import { fetchData } from "../api/api.js";

function showDetails(id) {
    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const category = document.querySelector("#categoury");
    const code = document.querySelector("#code");
    const description = document.querySelector("#description");

    // Get ALL products from localStorage


    // Find the specific product by ID
    const product = fetchData("products/read?type=update&id=" + id)
    const pr_pic = document.querySelector("#product-pic")

    product.then(data => {
        console.log("data is ", data)
        title.textContent = data.data.title;
        price.textContent = data.data.price;
        category.textContent = data.data.categoury;
        code.textContent = data.data.id;
        description.textContent = data.data.description
        pr_pic.setAttribute("src", "http://mandegarhs.ir/verta/storage/app/public/products/" + data.data.pic)
        pr_pic.setAttribute("class", "product-img")
        pr_pic.setAttribute("height", "170px")
        pr_pic.setAttribute("width", "170px")
        console.log('Found product:', data.data);
    })

    if (product) {

    } else {
        console.error('Product not found with ID:', id);
        title.textContent = 'Product not found';
    }
}

showDetails(new URLSearchParams(window.location.search).get('id'));