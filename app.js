var firebaseConfig = {
    apiKey: "AIzaSyBTZMgchyP8VjrS-wyjhMurNCfWNZgAfiw",
    authDomain: "book-library-33d66.firebaseapp.com",
    databaseURL: "https://book-library-33d66.firebaseio.com",
    projectId: "book-library-33d66",
    storageBucket: "book-library-33d66.appspot.com",
    messagingSenderId: "652372783017",
    appId: "1:652372783017:web:cade666dab126ca50f1eb8",
    measurementId: "G-W6ZJBMJJ0M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const database = firebase.database();

//realtime listener
db.collection('books').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added'){ //update page when you add a new book
            render(change.doc)
        } else if (change.type == 'removed'){ //updatee page when you remove a book
            let tr = tableBody.querySelector('[data-id=' + change.doc.id + ']');
            tableBody.removeChild(tr);
        } else if (change.type == 'modified'){ //update page when you change read status
            let tr = tableBody.querySelector('[data-id=' + change.doc.id + ']');
            render(change.doc)
            tableBody.removeChild(tr);
        }
    })
})



const newBookButton = document.getElementById('new-book')
const bookButton = document.getElementById('submit-book')
const bookForm = document.getElementById('book-form');
const bookTitleInput = document.getElementById('title');
const bookAuthorInput = document.getElementById('author');
const bookYearInput = document.getElementById('year');
const bookReadInput = document.getElementById('read');
const tableBody = document.getElementById('table-body');
const readButton = document.getElementById('toggle-button');


//saving data


function render(doc){

    let tr = document.createElement('tr');
    let title = document.createElement('td');
    let author = document.createElement('td');
    let year = document.createElement('td');
    let read = document.createElement('td');
    let readButton = document.createElement('a');
    let deleteTd = document.createElement('td');
    let deleteBook = document.createElement('i')
    let icon = document.createElement('a')

    tr.setAttribute('data-id', doc.id);
    readButton.setAttribute('class', 'btn amber toggle-button');
    readButton.setAttribute('id', 'toggle-button');
    readButton.textContent = isChecked(doc);
    title.textContent = doc.data().title;
    author.textContent = doc.data().author;
    year.textContent = doc.data().year;
    deleteBook.setAttribute('class', 'material-icons delete-button');
    icon.setAttribute('class', 'tooltipped')
    icon.setAttribute('data-tooltip', 'Delete');
    deleteBook.textContent = 'delete';

    tr.appendChild(title);
    tr.appendChild(author);
    tr.appendChild(year);
    tr.appendChild(read);
    read.appendChild(readButton);
    tr.appendChild(deleteTd);
    deleteTd.appendChild(icon);
    icon.appendChild(deleteBook);

    tableBody.appendChild(tr);

}


//add new book
function addNewBook(){

    db.collection('books').add({
        title: bookForm.title.value,
        author: bookForm.author.value,
        year: bookForm.year.value,
        read: bookForm.read.checked,
    });

    clearInputs();
}

//clear inputs
function clearInputs(){
    bookTitleInput.value = '';
    bookAuthorInput.value = '';
    bookYearInput.value = '';
    //add checkbox value
}

//show/hide form button
function toggleForm(){
    const bookForm = document.getElementById('book-form');

    if (!bookForm.classList.contains('show-item')){
        bookForm.classList.add('show-item');
    } else if (bookForm.classList.contains('show-item')){
        bookForm.classList.remove('show-item');
    }
}

//delete book
function deleteBook(event){
    let id = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');
    db.collection('books').doc(id).delete();
}

//toggle between 'read' and 'not read'
function toggleStatus(event){
    let id = event.target.parentElement.parentElement.getAttribute('data-id');

    if (event.target.innerHTML === 'read'){
        db.collection('books').doc(id).update({
            read: false
        })
    } else if (event.target.innerHTML === 'Not read') {
        db.collection('books').doc(id).update({
            read: true
        })
    }

}

//check if checkbox is checked or unchecked
function isChecked(doc){
    if (doc.data().read === true){
        return 'read';
    } else if (doc.data().read === false){
            return 'Not read';
    }
}

function eventListeners(){

    newBookButton.addEventListener('click', function(event){
        event.preventDefault();
        toggleForm();
    });

    bookForm.addEventListener('submit', function(event){
        event.preventDefault();
        database.collection
        addNewBook();
    });

    tableBody.addEventListener('click', function(event){
        deleteBook(event);
    });

    tableBody.addEventListener('click', function(event){
        toggleStatus(event);
    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})