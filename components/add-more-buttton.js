class NoteApp {
    constructor() {
        //-------- |Get elements by class name and ID| --------//
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

        //-------- |Initialize data and editing index| --------//
        this.data = JSON.parse(localStorage.getItem('data')) || [];
        this.editingIndex = -1;

        //-------- |Add event listeners| --------//
        this.addMore.addEventListener("click", this.toggleAddMore.bind(this));
        this.submitButton.addEventListener("click", this.handleSubmit.bind(this));
        this.closeButton.addEventListener("click", this.closeModal.bind(this));

        //-------- |Get data from localStorage and display it| --------//
        this.getData();
    }

    toggleAddMore() {
        Array.from(this.blury).forEach(element => {
            element.classList.toggle("active-add-more");
        });
        this.textInput.value = "";
        this.noteDate.value = "";

        this.addMore.classList.add('hidden');
        this.moreNote.classList.toggle('active-note');
    }

    handleSubmit() {
        if (this.validation()) {
            if (this.editingIndex !== -1) {
                this.updateNoteData(this.editingIndex);
                this.editingIndex = -1;
            } else {
                this.pushData();
            }
            this.textInput.value = "";
            this.noteContent.value = "";
            this.noteDate.value = "";
            console.log(this.data);
        }
    }

    closeModal() {
        this.moreNote.classList.toggle('active-note');
        Array.from(this.blury).forEach(element => {
            element.classList.toggle("active-add-more");
        });
        this.addMore.classList.toggle('hidden');
    }

    validation() {
        if (this.textInput.value === "") {
            this.errorMsg.innerHTML = "Title must not be empty";
            return false;
        } else if (this.noteDate.value === "") {
            this.errorMsg.innerHTML = "Date must not be empty";
            return false;
        } else {
            console.log("success");
            this.errorMsg.innerHTML = "";
            return true;
        }
    }

    createNote() {
        this.noteContainer.innerHTML = "";
        this.data.forEach((note, index) => {
            this.noteContainer.innerHTML += `
                <div class="note-content">
                    <div class="note-logo">
                        <img src="./assets/download.png" width="80" height="80" alt="logo" draggable="false">
                        <h3 class="note-title">${note.title}</h3>
                        <p class="note-date">Date: ${note.date}</p>
                    </div>
                </div>
                <div class="crud-function">
                    <button type="button" onclick="noteApp.deleteNoteData(${index})">
                        <img src="../assets/icons/trash.svg" alt="delete note">
                    </button>
                    <button type="button" onclick="noteApp.prepareEditNoteData(${index})">
                        <img src="../assets/icons/pen.svg" alt="edit note">
                    </button>
                </div>
            `;
        });
    }

    pushData() {
        this.data.push({
            title: this.textInput.value,
            content: this.noteContent.value,
            date: this.noteDate.value,
        });
        localStorage.setItem('data', JSON.stringify(this.data));
        this.createNote();
    }

    prepareEditNoteData(index) {
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
        this.data[index].title = this.textInput.value;
        this.data[index].content = this.noteContent.value;
        this.data[index].date = this.noteDate.value;
        localStorage.setItem('data', JSON.stringify(this.data));
        this.createNote();
    }

    deleteNoteData(index) {
        this.data.splice(index, 1);
        localStorage.setItem('data', JSON.stringify(this.data));
        this.createNote();
    }

    getData() {
        this.createNote();
    }
}

// Instantiate the class
const noteApp = new NoteApp();
