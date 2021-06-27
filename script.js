let myLib = [];
let library = document.getElementById('library');

function Book(title, author, pages, read){
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLib(){
    let newTitle = document.getElementById('titleInput').value;
    let newAuthor = document.getElementById('authorInput').value;
    let pageNumber = document.getElementById('pageInput').value;
    let newRead = document.getElementById('readSelect').value;
    if(newTitle === '' || newAuthor === '' || pageNumber === '' || newRead === 'default'){
        return alert('Please Fill in All Details!')
    }
    let newBook = new Book(newTitle, newAuthor, pageNumber, newRead);
    myLib.push(newBook);
}
function removeTextFromInput(){
    document.getElementById('titleInput').value = '';
    document.getElementById('authorInput').value = '';
    document.getElementById('pageInput').value = '';
    document.getElementById('readSelect').value = 'default';
}


function removeChildNodes(parent){
    let tableRow = parent.getElementsByTagName('tr')
    while(tableRow.length > 1){
        tableRow[1].parentNode.removeChild(tableRow[1]);
    }
}

function addBookName(object, appendLoc, i) {
    let parentDiv = document.createElement('tr')
    let titleDisplay = document.createElement('td');
    let authorDisplay = document.createElement('td');
    let pageDisplay = document.createElement('td');
    
    parentDiv.setAttribute('id', i);
    
    titleDisplay.innerHTML = object.title;
    authorDisplay.innerHTML = object.author;
    pageDisplay.innerHTML = object.pages;

    appendLoc.appendChild(parentDiv);
    parentDiv.appendChild(titleDisplay);
    parentDiv.appendChild(authorDisplay);
    parentDiv.appendChild(pageDisplay);
    readButton(object, parentDiv);
    deleteButton(i, parentDiv);
}

function readButton(object, appendLoc){
    let readButtonDisplay = document.createElement('td');
    let newReadButton = document.createElement('button');
    if(object.read === 'read'){
        newReadButton.innerHTML = 'Read'
    }
    else{
        newReadButton.innerHTML = 'Not Read'
    }
    newReadButton.addEventListener('click', () =>{
        if(object.read === 'read'){
            newReadButton.innerHTML = 'Not Read';
            object.read = 'notread'
        }
        else{
            newReadButton.innerHTML = 'Read';
            object.read = 'read'
        }
    })
    readButtonDisplay.appendChild(newReadButton)
    appendLoc.appendChild(readButtonDisplay);
}

function deleteButton(i, appendLoc){
    let deleteButtonDisplay = document.createElement('td');
    let deleteBook = document.createElement('button')
    deleteBook.innerHTML = 'Delete';
    deleteBook.addEventListener('click', () =>{
        let deleteDOM = document.getElementById(i);
        deleteDOM.remove();
        delete myLib[i];
    });
    deleteButtonDisplay.appendChild(deleteBook);
    appendLoc.appendChild(deleteButtonDisplay);
}

function displayAllBooks(){
    removeTextFromInput();
    removeChildNodes(library);
    myLib = myLib.filter( Boolean);
    for(let i = 0; i < myLib.length; i++){
        addBookName(myLib[i], library, i);
    }
}

function appendBook(){
    addBookToLib();
    displayAllBooks();
}



document.querySelector('#newBookButton').addEventListener('click', appendBook);