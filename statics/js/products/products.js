import { fetchData } from "../api/api.js";

function showDetails(id) {
    const title = document.querySelector("#title");
    const price = document.querySelector("#price");
    const category = document.querySelector("#categoury");
    const code = document.querySelector("#code");
    const description = document.querySelector("#description");

    // Get ALL products from localStorage


    // Find the specific product by ID
    const product = fetchData("products/read?type=read&id=" + id)
    const pr_pic = document.querySelector("#product-pic")

    product.then(data => {
        console.log("data is ", data)
        title.textContent = data.data[0].title;
        price.textContent = data.data[0].price;
        category.textContent = data.data[0].categoury;
        code.textContent = data.data[0].id;
        description.textContent = data.data[0].description
        pr_pic.setAttribute("src", "http://mandegarhs.ir/verta/storage/app/public/products/" + data.data[0].pic)
        pr_pic.setAttribute("class", "product-img")
        pr_pic.setAttribute("height", "170px")
        pr_pic.setAttribute("width", "170px")
        console.log('Found product:', data.data[0]);
    })

    if (product) {

    } else {
        console.error('Product not found with ID:', id);
        title.textContent = 'Product not found';
    }
}




showDetails(new URLSearchParams(window.location.search).get('id'));


document.addEventListener('DOMContentLoaded', function(){
    const add_basket = document.querySelector("#add_basket");

    add_basket.addEventListener('click', function(e){
        fetchData("basket/insert", "POST", {
            "p_id" : new URLSearchParams(window.location.search).get('id'),
            "count" : document.querySelector("#count").value,
            "username" : sessionStorage.getItem('username')
        })
        .then(data => {
            if(!data.statuscode == 201){
                alert("خطا در افزودن به سبد خرید")
                return;
            }
            alert("با موفقیت افزوده شد");
        })
    })
})