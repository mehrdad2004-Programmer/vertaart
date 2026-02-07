document.addEventListener('DOMContentLoaded', function(e){
    const param = new URLSearchParams(window.location.search);

    console.log(param)

    if(param.get('Status') == "OK"){
        document.querySelector("#bill-tick").setAttribute("src", "statics/images/green_tick.webp")
        document.querySelector("#bill-tick").setAttribute("height", "70")
        document.querySelector("#status-desc").textContent = "تراکنش موفق"
        fetch("http://localhost:8000/api/payment/showBill?Authority=" + param.get("Authority"), {
            headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {

            document.querySelector("#amount").innerHTML = `
                <span>${data.amount}</span>
                <span>ریال</span>
            `

            document.querySelector("#datetime").innerHTML = `
                <span>${data.date}</span>
                <span> - </span>
                <span>${data.time}</span>
            `

            document.querySelector("#ref_id").innerHTML = `
            <span>${data.ref_id}</span>
            `
        })

    }

})