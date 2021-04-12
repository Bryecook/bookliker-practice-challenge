document.addEventListener("DOMContentLoaded", function() {
getBooks()
});

const getBooks = () => {
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => {
        books.forEach(book => {
            renderBookTitle(book)
        });
    })
}

const getUsers = () => {
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => {
        users.forEach(users => {
            
        });
    })
}

const renderBookTitle = (book) => {
    const bookMenu = document.getElementById('list')

    const bookTitle = document.createElement('li')
    bookTitle.innerText = book.title

    bookMenu.append(bookTitle)

    bookTitle.addEventListener('click', (e) => {
            e.preventDefault()
            const bookInfoDiv = document.getElementById('show-panel')
            bookInfoDiv.innerHTML = ''

            const bookImg = document.createElement('img')
            bookImg.src = book.img_url

            const bookInfoTitle = document.createElement('h3')
            bookInfoTitle.innerText = book.title

            const bookInfoSubtitle = document.createElement('h3')
            bookInfoSubtitle.innerText = book.subtitle

            const bookInfoAuthor = document.createElement('h3')
            bookInfoAuthor.innerText = book.author

            const bookInfoDesc = document.createElement('p')
            bookInfoDesc.innerText = book.description
            
            
            bookInfoDiv.append(bookImg, bookInfoTitle, bookInfoSubtitle, bookInfoAuthor, bookInfoDesc)
            
            const bookUsers = book.users
            
            bookUsers.forEach(user => {
                const userLiked = document.createElement('li')
                userLiked.innerText = user.username
                bookInfoDiv.append(userLiked)
            })

            const likeBtn = document.createElement('button')
            
            if (bookUsers.filter(e => e.username === 'pouros').length > 0) {
                likeBtn.innerText = 'Unlike'
            } else {
                likeBtn.innerText = 'Like'
              }
            bookInfoDiv.append(likeBtn)

            likeBtn.addEventListener('click', () => {
                // console.log("click")
                changeLikeStatus(book)
            })
    })
}

const changeLikeStatus = (book) => {
    // const newLikeStatus = book.users
    const bookUsers = book.users
    if (bookUsers.filter(e => e.username === 'pouros').length > 0) {
        let updatedUsers = bookUsers.filter(test => test.username != 'pouros')
        // console.log(pouros)
        console.log(updatedUsers)
    } else {
        let pouros = {"id":1, "username":"pouros"}
        bookUsers.push(pouros)
        let updatedUsers = bookUsers
        console.log(updatedUsers)
      }

      fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
            },
                body: JSON.stringify({
                users: updatedUsers
            })
      })
      .then (res => res.json())
      .then(updatedUsers => {
          renderBookTitle(book)
      })
}


// "id": 1,
// "title": "Grapefruit",
// "subtitle": "A book of Instruction and Drawings.",
// "description": "Back in print for the first time in nearly thirty years, here is Yoko Ono's whimsical, delightful, subversive, startling book of instructions for art and for life. 'Burn this book after you've read it.' -- Yoko 'A dream you dream alone may be a dream, but a dream two people dream together is a reality. This is the greatest book I've ever burned.' -- John",
// "author": "Yoko Ono",
// "img_url": "https://books.google.com/books/content?id=3S8Rwr-iBdoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
// "users": [
//   {