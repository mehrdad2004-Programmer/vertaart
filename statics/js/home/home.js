import { fetchData } from "../api/api.js";

function getLatestProducts(){
    const latest = fetchData("products/readLatest", "GET");

    latest.then(data => {
        const latestProducts = document.querySelector("#latestProducts");
        latestProducts.innerHTML = '';
        
        // Store ALL products as array in localStorage
        localStorage.setItem("products", JSON.stringify(data.data));
        
        data.data.forEach(item => {
            const productHTML = `    
                <div class="card mt-3">
                    <div class="product-img d-flex justify-content-center mt-2">
                        <img src="http://mandegarhs.ir/verta/storage/app/public/products/${item.pic}" alt="${item.title}" class="product-image rounded-3"/>
                    </div>
                    <div class="container-fluid text-right mt-3">
                        <span class="fw-bold">${item.title}</span>
                    </div>
                    <div class="price-display d-flex justify-content-end align-items-center mt-3">
                        <span class="currency">تومان</span>
                        <span class="price-value">${item.price}</span>
                    </div>
                    <div class="container mt-3">
                        <a href="product.html?id=${item.id}" class="see-btn btn-yellow text-light">مشاهده</a>
                    </div>
                </div>
                <div class="space"></div>
            `;
            
            latestProducts.innerHTML += productHTML;
        });

    }).catch(error => {
        console.error('Error fetching products:', error);
    });
}

getLatestProducts();