class NoteApp {
    constructor() {
        //-----------|Get elements by class name and ID|-----------//
        this.blury = document.getElementsByClassName('blury');
        this.moreNote = document.getElementById('more-note');
        this.addMore = document.getElementById("add-more");
        this.noteContent = document.getElementById("note-content");
        this.textInput = document.getElementById("textInput");
        this.submitButton = document.getElementById("submit");
        this.errorMsg = document.getElementById("msg");
        this.closeButton = document.getElementById("close");
        this.noteContainer = document.getElementsByClassName("note-container")[0];
        this.noteDate = document.getElementById("noteDate");

        //-----------|Initialize data and editing index|-----------//
        this.data = JSON.parse(localStorage.getItem('data')) || [];
        this.editingIndex = -1;

        //-----------|Add event listeners|-----------//
        this.addMore.addEventListener("click", this.toggleAddMore.bind(this));
        this.submitButton.addEventListener("click", this.handleSubmit.bind(this));
        this.closeButton.addEventListener("click", this.closeModal.bind(this));

        //-----------|Get data from localStorage and display it|-----------//
        this.getData();
    }

    toggleAddMore() {
        //-----------|Toggle add more note modal visibility|-----------//
        Array.from(this.blury).forEach(element => {
            element.classList.toggle("active-add-more");
        });
        //-----------|Clear input fields|-----------//
        this.textInput.value = "";
        this.noteDate.value = "";
        this.noteContent.value = "";
        this.addMore.classList.add('hidden');
        this.moreNote.classList.toggle('active-note');
    }

    handleSubmit() {
        //-----------|Handle form submission|-----------//
        if (this.validation()) {
            if (this.editingIndex !== -1) {
                //-----------|Update existing note|-----------//
                this.updateNoteData(this.editingIndex);
                this.editingIndex = -1;
            } else {
                //-----------|Add new note|-----------//
                this.pushData();
            }
            //-----------|Clear input fields|-----------//
            this.textInput.value = "";
            this.noteContent.value = "";
            this.noteDate.value = "";
            this.closeModal();
        }
    }

    closeModal() {
        //-----------|Close the modal and clear inputs|-----------//
        this.moreNote.classList.toggle('active-note');
        Array.from(this.blury).forEach(element => {
            element.classList.toggle("active-add-more");
        });
        this.addMore.classList.toggle('hidden');
    }

    validation() {
        //-----------|Validate form inputs|-----------//
        if (this.textInput.value === "") {
            this.errorMsg.innerHTML = "Title must not be empty";
            return false;
        } else if (this.noteDate.value === "") {
            this.errorMsg.innerHTML = "Date must not be empty";
            return false;
        } else {
            this.errorMsg.innerHTML = "";
            return true;
        }
    }

    createNote() {
        //-----------|Create notes and display them|-----------//
        this.noteContainer.innerHTML = "";
        this.data.forEach((note, index) => {
            this.noteContainer.innerHTML += `
            <div class = "note-contain">
                <div class="note-content">
                    <div class="note-logo">
                        <img src ="./assets/pictures/orange_cat.png" width="80" height="80" alt="logo" draggable="false">
                        <h3 class="note-title">${note.title}</h3>
                        <p class="note-date">Date: ${note.date}</p>
                    </div>
                </div>
                <div class="crud-function">
                    <button type="button" onclick="noteApp.deleteNoteData(${index})">
                        <img src="./assets/icons/trash.svg" alt="delete note">
                    </button>
                    <button type="button" onclick="noteApp.prepareEditNoteData(${index})">
                        <img src="./assets/icons/pen.svg" alt="edit note">
                    </button>
                    <button type="button" onclick="noteApp.prepareEditNoteData(${index})">
                        <img src="./assets/icons/view.svg" alt="edit note">
                    </button>
                </div>
            </div>
            `;
        });
    }

    pushData() {
        //-----------|Add new note to data and update localStorage|-----------//
        this.data.push({
            title: this.textInput.value,
            content: this.noteContent.value,
            date: this.noteDate.value,
        });
        localStorage.setItem('data', JSON.stringify(this.data));
        this.createNote();
    }

    prepareEditNoteData(index) {
        //-----------|Prepare note data for editing|-----------//
        const note = this.data[index];
        this.textInput.value = note.title;
        this.noteContent.value = note.content;
        this.noteDate.value = note.date;
        this.editingIndex = index;
        this.moreNote.classList.add('active-note');
        Array.from(this.blury).forEach(element => {
            element.classList.add("active-add-more");
        });
        this.addMore.classList.add('hidden');
    }

    updateNoteData(index) {
        //-----------|Update note data in localStorage|-----------//
        this.data[index].title = this.textInput.value;
        this.data[index].content = this.noteContent.value;
        this.data[index].date = this.noteDate.value;
        localStorage.setItem('data', JSON.stringify(this.data));
        this.createNote();
    }

    deleteNoteData(index) {
        //-----------|Delete note data and update localStorage|-----------//
        this.data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(this.data));
        this.createNote();
    }

    getData() {
        //-----------|Get data from localStorage and create notes|-----------//
        this.createNote();
    }
}

//-----------|Instantiate the class|-----------//
const noteApp = new NoteApp();
