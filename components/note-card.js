
// function createNotes(){

//     let notes = [...document.getElementsByClassName('note')]
//     //---- |get every notes inside home page and create a dynamic components| -----//
//     notes.forEach((note , index) =>{
//         const noteContent = document.createElement('div')
//         noteContent.classList.add('note-content')
//         const noteLogo = document.createElement('div')
//         noteLogo.classList.add('note-logo')
//         const orangeLogo = document.createElement('img')
    
//         //----  |setting attributes for image (src , width , height)| ----//
//         orangeLogo.setAttribute('src' , './assets/download.png')
//         orangeLogo.setAttribute('width' , "80")
//         orangeLogo.setAttribute('height' , '80')
//         orangeLogo.setAttribute('draggable' , 'false')
    
//         // ------- |place holder for note title| --------//
//         let noteTitle = document.createElement('h3')
//         noteTitle.classList.add('note-title');
//         noteTitle.innerHTML = 'place holder for note '
    
//         //----- |appending image into image container| ----//
//         noteLogo.append(orangeLogo , noteTitle)
//         //------ |appending all children into the note element| ------//
    
//         const pElement = document.createElement('form')
//         pElement.classList.add('note-title')
    
//         noteContent.append(noteLogo)
//         note.appendChild(noteContent)
//     })
    
//     let noteContainer = [...document.getElementsByClassName('note')]
    
//     noteContainer.forEach((container , index) => {
//         const crudElement = document.createElement('div')                  
//         crudElement.classList.add('crud-function')
    
//         const spanBin = document.createElement('button')
//         const binSvg = document.createElement('img')
//         binSvg.setAttribute('src' ,  '../assets/icons/trash.svg')
    
//         spanBin.setAttribute('type' , 'button')
    
//         const spanEdit = document.createElement('button')
//         const editSvg = document.createElement('img')
//         editSvg.setAttribute('src' , '../assets/icons/pen.svg')
    
//         spanEdit.setAttribute('type' , 'button')
    
//         spanBin.appendChild(binSvg)
    
//         spanEdit.appendChild(editSvg)
    
//         crudElement.append(spanBin , spanEdit)
//         container.appendChild(crudElement)
    
//     })
// }

// export default createNotes ;