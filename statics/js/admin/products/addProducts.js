import { fetchData } from "../../api/api.js";
function addProduct(jsonData){
    const add = fetchData("products/create", "POST", jsonData);

    add.then(data => {
        if(data.statscode == 201){
            alert("ثبت شد");
            return;
        }
        alert("خطا در ثبت محصول");
    }).catch(error => {
        console.error('Error:', error);
        alert("خطا در ارتباط با سرور");
    });
}

const submit = document.querySelector('#submit');

submit.addEventListener("click", function(e){
    e.preventDefault();

    const formData = new FormData(document.querySelector("#addProducts"));
    
    // Convert FormData to plain object
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    addProduct(jsonData);
});