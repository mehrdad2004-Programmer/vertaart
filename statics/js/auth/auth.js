import { fetchData } from "../api/api.js";


function login(username, password){
    const data = fetchData("users/login", 'POST', {
        "username" : username,
        "password" : password
    });

    return data
}


document.getElementsByName("submit")[0].addEventListener("click", (e)=>{
    e.preventDefault();
    const val = login(
        document.getElementsByName("username")[0].value,
        document.getElementsByName('password')[0].value
    );
    
    val.then(data => {
        if(data.statuscode != 200){
            alert("نام کاربری یا رمزعبور صحیح نیست مجدد تلاش کنید")
            return;
        }
        window.location.href = "products.html"
    })
})