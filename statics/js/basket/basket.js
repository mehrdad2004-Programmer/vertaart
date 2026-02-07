document.addEventListener('DOMContentLoaded', function(){
    fetch("http://localhost:8000/api/basket/get?username=" + sessionStorage.getItem('username'), {
        headers : {
            "Content-Type" : "application/json",
            "Accept" : "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        let counter = 0;
        let totalt = 0;
        let desc = "";
        data.msg.forEach(item => {
            counter++;

            totalt += parseInt(item.basket_products.price);
            desc += item.basket_products.title + ","

            document.querySelector("#t-body").innerHTML += `
                <tr>
                    <td>${counter}</td>
                    <td>
                        <a href="product.html?id=${item.basket_products.id}"><img src="http://mandegarhs.ir/verta/storage/app/public/products/${item.basket_products.pic}" height="50px"></a>
                    </td>
                    <td>${item.basket_products.title}</td>
                    <td>${item.count}</td>
                    <td>${item.count * item.basket_products.price}</td>
                    <td>
                        <button class="del btn btn-danger">حذف</button>
                    </td>
                </tr>
            `
        })

        document.querySelector("#total").textContent = totalt

        document.querySelector("#pay").addEventListener('click', function(e){
            if(confirm("آیا اطمینان دارید؟")){
                window.open("http://localhost:8000/api/payment/pay?amount=" + totalt + "&description=" + desc + "&username=" + sessionStorage.getItem('username'));
            }
        })
    })
})