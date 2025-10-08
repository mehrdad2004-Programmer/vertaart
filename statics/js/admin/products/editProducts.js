import { fetchData } from "../../api/api.js";
const titleBar = document.querySelector('#title-bar');
const hiddenPart = document.querySelector('#hidden-part');
const submit = document.querySelector('#submit');


const title = document.querySelector("#title");
const categoury = document.querySelector('#categoury');
const price = document.querySelector('#price');
const description = document.querySelector('#description');


console.log(titleBar)

const type = new URLSearchParams(window.location.search).get('type');
const id = new URLSearchParams(window.location.search).get('id');

if(type == 'update'){
    titleBar.textContent = 'ویرایش محصول';
    hiddenPart.remove()

    const lastData = fetchData(`products/read?type=update&id=${id}`, "GET")

    lastData.then(data => {
        console.log(data)
        title.value = data.data.title
        price.value = data.data.price
        description.value = data.data.description
    });

    submit.addEventListener('click', function(e){
        e.preventDefault();

        const res= fetchData(`products/update?title=${title}&categoury=${categoury}&price=${price}&description=${description}`, 'PATCH')

        res.then(data => {
            if(data.statuscode == 201){
                alert("با موفقیت ویرایش شد")
                return
            }

            alert("خطا در ویرایش")
        })
    })
}