import { fetchData } from "../api/api.js"

function getComments() {
    const comments = fetchData("comments/getComments", 'GET')

    comments.then(data => {
        console.log("id filtered data is : ", data)
        const cbox = document.querySelector("#comments-box")

        data.msg.forEach(element => {
            console.log(element)
            cbox.innerHTML += `
            <div class="container description d-rtl mt-4 border border-2 p-3 rounded-3">
                <div class="container">
                    <div class="comment-avatar d-flex">
                        <div>
                            <img src="statics/images/products/p1.webp" class="comment-avatar-image">
                        </div>
                        <div class="space"></div>
                        <div>
                            <span class="fw-bold">${element.users.fname} ${element.users.lname}</span>
                            <div>
                                <span class="text-muted">${element.date}</span>
                            </div>
                        </div>
                    </div>
                    <div class="container mt-2">
                        <span>
                            ${element.content}
                        </span>
                    </div>
                </div>
            </div>
        `
        });


        console.log("the data is :", data)
    })
}


function createComment() {
    const comment = fetchData("comments/createComment", 'POST', {
        content: document.querySelector("#content").value,
        username: "09190505223",
        product_id : new URLSearchParams(window.location.search).get('id'),
        date: "1111",
        time: "11111"
    });

    comment.then(data => {
        if (data.statuscode == 201) {
            alert("دیدگاه ثبت شد")
            document.querySelector("#content").value = "";
            location.reload();
            return;
        }

        return alert("خطا در ثبت دیدگاه")
    })
}


getComments();

document.querySelector("#submit-comment").addEventListener("click", function (e) {
    e.preventDefault();

    createComment()
})

