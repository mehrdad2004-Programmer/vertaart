import { fetchData } from "../../api/api.js";


function getProducts(){
    const products = fetchData("products/read", "GET");

    products.then(data => {
        const tbody = document.querySelector("#rows")
        const pagination = document.querySelector("#pagination")

        console.log("pagination : ", pagination)

        // Clear existing rows
        tbody.innerHTML = '';

        data.data.data.forEach(item => {
            tbody.innerHTML +=  `
                <tr>
                    <td>
                        <img src="../statics/images/products/p1.webp" class="p-img">
                    </td>
                    <td>${item.id}</td>
                    <td>${item.title}</td>
                    <td>${item.categoury}</td>
                    <td>
                        <a href="../product.html?id=${item.id}" class="btn btn-primary">مشاهده</a>
                        <a href="#" class="btn btn-warning">ویرایش</a>
                        <a href="#" class="btn btn-danger" id="delete">حذف</a>
                    </td>
                </tr>
            `

            document.querySelector("#delete").addEventListener('click', function(e) {
                if (confirm("آیا اطمینان دارید؟")) {
                    const del = fetchData("products/delete?id=" + item.id, "DELETE")

                    del.then(d => {
                        if(d.statuscode == 200)
                        {
                            alert("حذف شد")
                            location.reload()
                            return;
                        }
                        alert("خطا در حذف")
                    })
                }
            })
        });

        console.log("Last page:", data.data.last_page)

        // Clear existing pagination except Previous/Next buttons
        const existingItems = pagination.querySelectorAll('.page-item');
        for (let i = existingItems.length - 2; i > 0; i--) {
            existingItems[i].remove();
        }

        // Add page numbers (starting from 1, not 0)
        for(let i = 1; i <= data.data.last_page; i++){
            const pageItem = document.createElement('li');
            pageItem.className = 'page-item';
            pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            
            // Insert before the "Next" button
            pagination.insertBefore(pageItem, pagination.lastElementChild);
        }

        console.log("data is : ", data.data.data)
    }).catch(error => {
        console.error("Error fetching products:", error);
    });
}

getProducts();