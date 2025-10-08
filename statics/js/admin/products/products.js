import { fetchData } from "../../api/api.js";

function getProducts() {
    const products = fetchData("products/read", "GET");

    products.then(data => {
        console.log(data);
        const tbody = document.querySelector("#rows");
        const pagination = document.querySelector("#pagination");

        // Clear existing rows
        tbody.innerHTML = '';

        // Render rows with data-id attribute on each <tr>
        data.data.forEach(item => {
            tbody.innerHTML += `
                <tr data-id="${item.id}">
                    <td>
                        <img src="http://mandegarhs.ir/verta/storage/app/public/products/${item.pic}" class="p-img">
                    </td>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.categoury}</td>
                    <td>
                        <a href="../product.html?id=${item.id}" class="btn btn-primary">مشاهده</a>
                        <a href="addproducts.html?type=update&id=${item.id} " class="btn btn-warning">ویرایش</a>
                        <a href="#" class="btn btn-danger delete">حذف</a>
                    </td>
                </tr>
            `;
        });

        // Event delegation for delete buttons inside tbody
        tbody.addEventListener('click', function(e) {
            if (e.target.classList.contains('delete')) {
                e.preventDefault();
                if (confirm("آیا اطمینان دارید؟")) {
                    const tr = e.target.closest('tr');
                    const id = tr.getAttribute('data-id');

                    fetchData("products/delete?id=" + id, "DELETE").then(d => {
                        if (d.statuscode == 200) {
                            alert("حذف شد");
                            location.reload();
                            return;
                        }
                        alert("خطا در حذف");
                    }).catch(err => {
                        alert("خطا در حذف");
                        console.error(err);
                    });
                }
            }
        });

        console.log("Last page:", data.data.last_page);

        // Clear existing pagination except Previous/Next buttons
        const existingItems = pagination.querySelectorAll('.page-item');
        for (let i = existingItems.length - 2; i > 0; i--) {
            existingItems[i].remove();
        }

        // Add page numbers (starting from 1)
        for (let i = 1; i <= data.data.last_page; i++) {
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;

            // Insert before the "Next" button
            pagination.insertBefore(pageItem, pagination.lastElementChild);
        }

        console.log("data is : ", data.data.data);
    }).catch(error => {
        console.error("Error fetching products:", error);
    });
}

getProducts();
