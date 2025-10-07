import { fetchData } from "../../api/api.js";

function addProduct(formData) {
    const add = fetchData("products/create", "POST", formData);

    add.then(data => {
        console.log(data.statuscode == 201)

        if(data.statuscode === 201){
            alert("ثبت شد");

        }else{
         alert("خطا در ثبت محصول");

        }
    }).catch(error => {
        console.error('Error:', error);
        alert("خطا در ارتباط با سرور");
    });
}

const submit = document.querySelector('#submit');

submit.addEventListener("click", function(e){
    e.preventDefault();

    const formData = new FormData(document.querySelector("#addProducts"));
    
    // Don't convert to JSON - send FormData directly
    addProduct(formData);
});

// Optional: Add image preview functionality
const imageInput = document.querySelector('#image');
const imagePreview = document.querySelector('#imagePreview');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    } else {
        imagePreview.style.display = 'none';
    }
});