const notesContainer = document.getElementsByClassName("more-note")
notesContainer.innerHTML = `

<div class="modal-body mid">

<input type="date" id="noteDate" class="note-date">

</div>

<p>Note title</p>

<input type="text" placeholder="Note Title" class="form-control"  id="textInput">

<div id="msg"></div>

<p>what's on your mind today?</p>

<textarea placeholder="Note content" class="form-control" id="note-content" cols="30" rows="5"></textarea>

<button type="submit" id="submit">

  save note

</button>

<button id="close">

    close

</button>

</div>`