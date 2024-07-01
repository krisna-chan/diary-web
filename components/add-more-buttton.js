//-------- |Get elements by class name and ID| --------//
const blury = document.getElementsByClassName('blury');
const moreNote = document.getElementById('more-note');
const addMore = document.getElementById("add-more");
const noteContent = document.getElementById("note-content");
let textInput = document.getElementById("textInput");
let submitButton = document.getElementById("submit");
let errorMsg = document.getElementById("msg");
let closeButton = document.getElementById("close");
let noteContainer = document.getElementsByClassName("note-container")[0];

//-------- |Initialize data and editing index| --------//
let data = JSON.parse(localStorage.getItem('data')) || [];
let editingIndex = -1;

//-------- |Add event listener for 'Add More' button| --------//
addMore.addEventListener("click", () => {
    Array.from(blury).forEach(element => {
        element.classList.toggle("active-add-more");
    });
    textInput.value = "";

    addMore.classList.add('hidden');
    moreNote.classList.toggle('active-note');
});

//-------- |Add event listener for 'Submit' button| --------//
submitButton.addEventListener("click", () => {
    if (validation()) {
        if (editingIndex !== -1) {
            updateNoteData(editingIndex);
            editingIndex = -1;
        } else {
            pushData();
        }
        textInput.value = "";
        noteContent.value = "";
        console.log(data);
    }
});

//-------- |Close modal function| --------//
function closeModal(e) {
    e.addEventListener("click", () => {
        moreNote.classList.toggle('active-note');
        Array.from(blury).forEach(element => {
            element.classList.toggle("active-add-more");
        });
        addMore.classList.toggle('hidden');
    });
}

//-------- |Validation function for text input| --------//
function validation() {
    if (textInput.value === "") {
        errorMsg.innerHTML = "Title must not be empty";
        return false;
    } else {
        console.log("success");
        errorMsg.innerHTML = "";
        return true;
    }
}

//-------- |Create note elements dynamically| --------//
function createNote() {
    noteContainer.innerHTML = "";
    data.forEach((note, index) => {
        noteContainer.innerHTML += `
            <div class="note-content">
                <div class="note-logo">
                    <img src="./assets/download.png" width="80" height="80" alt="logo" draggable="false">
                    <h3 class="note-title">${note.title}</h3>
                    <form action="" class="note-title">
                    </form>
                    </div>
                    </div>
                    <div class="crud-function">
                        <button type="button" onclick="deleteNoteData(${index})">
                            <img src="../assets/icons/trash.svg" alt="delete note">
                        </button>
                        <button type="button" onclick="prepareEditNoteData(${index})">
                            <img src="../assets/icons/pen.svg" alt="edit note">
                        </button>
                    </div>
        `;
    });
}

//-------- |Push new data to the array and update localStorage| --------//
function pushData() {
    data.push({
        title: textInput.value,
        content: noteContent.value,
    });
    localStorage.setItem('data', JSON.stringify(data));
    createNote();
}

//-------- |Prepare to edit note data| --------//
function prepareEditNoteData(index) {
    const note = data[index];
    textInput.value = note.title;
    noteContent.value = note.content;
    editingIndex = index;
    moreNote.classList.add('active-note');
    Array.from(blury).forEach(element => {
        element.classList.add("active-add-more");
    });
    addMore.classList.add('hidden');
}


//-------- |Update existing note data| --------//
function updateNoteData(index) {
    data[index].title = textInput.value;
    data[index].content = noteContent.value;
    localStorage.setItem('data', JSON.stringify(data));
    createNote();
}

//-------- |Delete note data and update localStorage| --------//
function deleteNoteData(index) {
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    createNote();
}

//-------- |Get data from localStorage and display it| --------//
function getData() {
    createNote();
}

//-------- |Call functions to close modal and get data on load| --------//
closeModal(closeButton);
getData();





//-------- |Initialize sign-up array from localStorage or as an empty array if not present| --------//
let signUp = JSON.parse(localStorage.getItem('sign-up')) || [];

//-------- |Get username and password input elements| --------//
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');

//-------- |Get confirm sign-in button element| --------//
const confirmSignIn = document.getElementById('sign-in');

//-------- |Add event listener for 'Sign In' button| --------//
confirmSignIn.addEventListener('click', () => {
    //-------- |Validate input fields| --------//
    if (usernameInput.value === '' || passwordInput.value === '') {
        alert('Both username and password must be filled out');
        return;
    }

    //-------- |Push new user data to signUp array| --------//
    signUp.push({
        username: usernameInput.value,
        password: passwordInput.value
    });

    //-------- |Save signUp array to localStorage| --------//
    localStorage.setItem('sign-up', JSON.stringify(signUp));
    
    //-------- |Log signUp array to console| --------//
    console.log(signUp);
    
    //-------- |Clear input fields after submission| --------//
    usernameInput.value = '';
    passwordInput.value = '';
});

//-------- |Function to load existing data from localStorage on page load| --------//
const storedData = JSON.parse(localStorage.getItem('sign-up'));
function loadData() {
    if (storedData && storedData.length > 0) {
        signUp = storedData;
        console.log('Loaded sign-up data from localStorage:', signUp);
        //-------- |Optionally hide the sign-up form if data exists| --------//
    } else {
        console.log('No existing sign-up data found in localStorage.');
    }
}
const signUpForms = document.getElementsByClassName('sign-up-form');
if (storedData && storedData.length > 0) {
    for (let i = 0; i < signUpForms.length; i++) {
        signUpForms[i].style.display = "none";
    }
}

//-------- |Call loadData function to initialize the signUp array| --------//
loadData();

