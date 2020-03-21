document.addEventListener("DOMContentLoaded", function() {
    url = "http://localhost:3000/books"
    
    const bookList = document.getElementById('list')
    const bookPanel = document.getElementById('show-panel')
    fetchBooks().then(renderBooks)

    function fetchBooks(){
        return fetch(url)
        .then(resp => resp.json())
    }

    function renderBooks(books){
        books.forEach(book => addBooks(book))
    }

    function addBooks(book){
       const li = document.createElement('li')
       li.setAttribute("data-id", book.id)
       li.innerText = book.title
       li.addEventListener("click", showBookInfo)
       bookList.appendChild(li)
    }

    function showBookInfo(event){
        bookId = event.target.getAttribute("data-id")
        fetch(`http://localhost:3000/books/${bookId}`)
        .then(resp => resp.json())
        .then(book =>{
            bookPanel.innerHTML = 
            `
            <div>
                <img src = "${book.img_url}">
                <h2>${book.title}</h2>
                <p>${book.description}</p>
                <ul id="user-list"></ul
            </div>
            `
            book.users.forEach(book => {
                users = document.createElement('li')
                users.innerText = book.username
                bookPanel.appendChild(users)

            })
            bttn = document.createElement('button')
            bttn.innerText = "Like Book"
            bttn.setAttribute("data-id", `${bookId}`)            
            bookPanel.appendChild(bttn)
            bttn.addEventListener("click", likeBook)

        })

        function likeBook(event){
            const bookId = event.target.dataset.id
            const user = {"id":1, "username":"pouros"}
            const newLi = document.createElement('li')
            newLi.innerText = user.username
            
            console.log(event)
            fetch(`http://localhost:3000/books/${bookId}`)
            .then(res =>res.json())
            .then(book => {
                const likeUsers = book.users
                console.log(users)
                likeUsers.push(user)

                fetch(`http://localhost:3000/books/${bookId}`
                , {
                    method: "PATCH",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                      users: likeUsers
                    })
    
                })
                .then(res => res.json())
                .then(book => console.log(book))
            })

           
        }
    }


});
