document.addEventListener('DOMContentLoaded', function(){

    const submit = document.querySelector("#submit");

    submit.addEventListener('click', function(e){
        fetch("http://localhost:8000/api/users/login", {
            method : "POST",
            body : JSON.stringify({
                "username" : document.querySelector("#username").value,
                "password" : document.querySelector('#password').value
            }),
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                if(data.statuscode != 200){
                    alert("نام کاربری یا رمز عبور اشتباه است");
                    return;
                }
                sessionStorage.setItem("username", document.querySelector("#username").value);
                window.location.href = "index.html";
            })
    });

})
