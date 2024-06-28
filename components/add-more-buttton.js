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


