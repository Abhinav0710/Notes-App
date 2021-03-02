//If user adds a note add it to the localstorage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        //Show nothing
        notesObj = [];
    }
    else {
        //Show the note given by user
        //Convert string to array
        notesObj = JSON.parse(notes);
    }
    //Update the notes after addBtn is clicked
    notesObj.push(addTxt.value);
    //Update local storage
    //local storage uses string hence stringify the array notesObj.
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);
    showNotes();
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    //Showing notes in each card with the help of notes object
    notesObj.forEach(function (element, index)
    {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index + 1}</h5>
                    <p class="card-text"> ${element}</p>
                    <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                </div>
            </div>`;
    });

    let notesElm=document.getElementById('notes');
    if(notesObj.length!=0)
    {
        //If not empty show the existing notes.
        notesElm.innerHTML=html;
    }
    else
    {
        notesElm.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

    function deleteNote(index) {
        
          let notes = localStorage.getItem("notes");
          if (notes == null) {
            notesObj = [];
          } else {
            notesObj = JSON.parse(notes);
          }
        //Select the note to be deleted
          notesObj.splice(index, 1);
          //Update the local Storage by removing the selected note.
          localStorage.setItem("notes", JSON.stringify(notesObj));
          showNotes();
        }
//Search a given note
        let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){
//Convert to lower text so that there is no problem of case.
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        //for each note check if search part matches or not.
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})