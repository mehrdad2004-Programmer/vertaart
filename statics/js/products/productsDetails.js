import { fetchData } from "../api/api.js";

function getAllProducts(){
    const all = fetchData("products/read", "GET");

    all.then(data => {
        console.log(data)
    })
}



console.log(getAllProducts());
