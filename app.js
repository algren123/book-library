const newBookButton = document.getElementById('new-book')
const bookButton = document.getElementById('submit-book')
const bookForm = document.getElementById('book-form');
const bookTitleInput = document.getElementById('title');
const bookAuthorInput = document.getElementById('author');
const bookYearInput = document.getElementById('year');
const bookReadInput = document.getElementById('read');
const tableBody = document.getElementById('table-body');

let myLibrary = [];

function Book(title, author, year, read) {
    //constructor
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
}

function render(arr){
    tableBody.innerHTML = '';

    for (let i=0; i<arr.length; i++){
        tableBody.innerHTML += `
            <tr index='${i}'>
                <td>${arr[i].title}</td>
                <td>${arr[i].author}</td>
                <td>${arr[i].year}</td>
                <td>
                    <button class='toggle-button btn grey darken-2' id="toggle" index-button='${i}'>${arr[i].read}</button>
                </td>
                <td>
                    <a href ='#' class="delete-button">
                        <i class = 'material-icons'>delete</i>
                    </a>
                </td>
            </tr>
        `;
    }
}

function addNewBook(){
    //get input values
    title = bookTitleInput.value;
    author = bookAuthorInput.value;
    year = bookYearInput.value;
    read = bookReadInput.value;


    //check checkbox status
    if (bookReadInput.checked){
        read = 'Read';
    } else {
        read = 'Not read';
    }

    //Add the book to render in myLibrary
    myLibrary.push(new Book(title, author, year, read));
    render(myLibrary);
    clearInputs();
}

function clearInputs(){
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookYearInput.value = '';
    bookReadInput.value = 'unchecked';
}


function toggleForm(){
    const bookForm = document.getElementById('book-form');

    if (!bookForm.classList.contains('show-item')){
        bookForm.classList.add('show-item');
    } else if (bookForm.classList.contains('show-item')){
        bookForm.classList.remove('show-item');
    }
}

function deleteBook(event){
    if (event.target.parentElement.classList.contains('delete-button')){
        event.target.parentElement.parentElement.parentElement.remove();
        const index = event.target.parentElement.parentElement.parentElement.getAttribute('index');
        myLibrary.splice(index, 1);
        render(myLibrary);
    }
}

function toggleStatus(event){
    if (event.target.classList.contains('toggle-button')){
        let indexOfButton = event.target.getAttribute('index-button');
        if (event.target.innerHTML === 'Read'){
            event.target.innerHTML = 'Not read';
            myLibrary[indexOfButton].read = 'Not read'
        } else if (event.target.innerHTML === 'Not read'){
            event.target.innerHTML = 'Read';
            myLibrary[indexOfButton].read = 'Read';
        }
    }
}

function eventListeners(){

    newBookButton.addEventListener('click', function(event){
        event.preventDefault();
        toggleForm();
    });

    bookForm.addEventListener('submit', function(event){
        event.preventDefault();
        addNewBook();
    });

    tableBody.addEventListener('click', function(event){
        deleteBook(event);
        toggleStatus(event);
    })
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})