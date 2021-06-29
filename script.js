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
        return alert('Please Fill in All Details!');
    }
    else if(isNaN(pageNumber)){
        return alert('Please add a valid page count');
    };
    let newBook = new Book(newTitle, newAuthor, pageNumber, newRead);
    myLib.push(newBook);
    saveToLocalStorage();
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
    newReadButton.setAttribute('class', 'readButton');
    if(object.read === 'read'){
        newReadButton.innerHTML = 'READ'
    }
    else{
        newReadButton.innerHTML = 'NOT READ'
    }
    newReadButton.addEventListener('click', () =>{
        if(object.read === 'read'){
            newReadButton.innerHTML = 'NOT READ';
            object.read = 'notread'
        }
        else{
            newReadButton.innerHTML = 'READ';
            object.read = 'read'
        }
    })
    readButtonDisplay.appendChild(newReadButton)
    appendLoc.appendChild(readButtonDisplay);
}

function deleteButton(i, appendLoc){
    let deleteButtonDisplay = document.createElement('td');
    let deleteBook = document.createElement('button')
    deleteBook.setAttribute('class', 'deleteButton');
    deleteBook.innerHTML = 'DELETE';
    deleteBook.addEventListener('click', () =>{
        let deleteDOM = document.getElementById(i);
        deleteDOM.remove();
        delete myLib[i];
        saveToLocalStorage();
    });
    deleteButtonDisplay.appendChild(deleteBook);
    appendLoc.appendChild(deleteButtonDisplay);
}

function saveToLocalStorage(){
    localStorage.setItem('library', JSON.stringify(myLib));
}

function getLocalStorageOnStart(){
    if(!(localStorage.getItem('library'))){
        myLib = [];
        console.log(myLib)
    }
    else{
        myLib = JSON.parse(localStorage.getItem('library'));
    };
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

function renderStart(){
    getLocalStorageOnStart();
    displayAllBooks();
}

renderStart();
document.querySelector('#newBookButton').addEventListener('click', appendBook);