let myLib = [];
let library = document.querySelector('.library');

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
    let newBook = new Book(newTitle, newAuthor, pageNumber, newRead);
    myLib.push(newBook);
}

function removeChildNodes(parent){
    let childs = parent.childNodes;
    while(childs.length > 0){
        childs[0].remove();
    }
}

function addBookName(object, appendLoc, i) {
    let parentDiv = document.createElement('div')
    let newBookDisplay = document.createElement('div');
    
    parentDiv.setAttribute('id', i);
    
    newBookDisplay.innerHTML = 
    `Title: ${object.title} Author: ${object.author} Pages: ${object.pages}`;

    appendLoc.appendChild(parentDiv);
    parentDiv.appendChild(newBookDisplay);
    readButton(object, parentDiv);
    deleteButton(i, parentDiv);
}

function readButton(object, appendLoc){
    let newReadButton = document.createElement('button');
    newReadButton.innerHTML = 'Not Yet Read';
    newReadButton.addEventListener('click', () =>{
        if(object.read === 'no'){
            newReadButton.innerHTML = 'Read';
            object.read = 'yes'
        }
        else{
            newReadButton.innerHTML = 'Not Yet Read';
            object.read = 'no'
        }
    })
    appendLoc.appendChild(newReadButton);
}

function deleteButton(i, appendLoc){
    let deleteBook = document.createElement('button')
    deleteBook.innerHTML = 'Delete';
    deleteBook.addEventListener('click', () =>{
        let deleteDOM = document.getElementById(i);
        console.log(deleteDOM);
        deleteDOM.remove();
        delete myLib[i];
        console.table(myLib)
    });
    appendLoc.appendChild(deleteBook);
}

function displayAllBooks(){
    removeChildNodes(library);
    myLib = myLib.filter( Boolean);
    for(let i = 0; i < myLib.length; i++){
        addBookName(myLib[i], library, i);
    }
}



document.querySelector('#newBookButton').addEventListener('click', addBookToLib);
document.querySelector('#showEntireLib').addEventListener('click', displayAllBooks);

// if(document.querySelector('#readSelect').value === 'notread'){
//     newReadButton.innerHTML = 'Not Read';
// }
// else{
//     newReadButton.innerHTML = 'Read';
// }