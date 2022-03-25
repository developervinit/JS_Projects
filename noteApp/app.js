const insrt_btn = document.querySelector(".insrt_btn"); 
const del_btn = document.querySelector(".del_item_btn");
const plus_btn_wraper = document.querySelector(".plus_btn_wraper");
const addNoteContainer = document.querySelector(".add_note_container");
const dispContainer = document.querySelector(".display_notes_container");


//click event to create-notes
insrt_btn.addEventListener("click", setValueLocalStorage);


//click-event to remove all notes from the loccalStorage
del_btn.addEventListener("click", removeAllNotes)

var globalState = true;
conditionCall();

plus_btn_wraper.addEventListener("click", function(){
    globalState = false;
    conditionCall();
});

//this function to check the condition
function conditionCall() {    
    if(globalState === true){
        addNoteContainer.classList.remove("active");
        plus_btn_wraper.classList.add("active");
    } else {
        plus_btn_wraper.classList.remove("active");
        addNoteContainer.classList.add("active");
        showSavedNotesOnPageLoadAtFirst();
    }
}

function showSavedNotesOnPageLoadAtFirst() {
    let allNotes = getNotes();
    if(allNotes.length !== 0){
        showNotes();
    }
}

var idArray = [];
let id;

//saving notes into local storage
function setValueLocalStorage(){
    const input = document.querySelector(".txt_area").value;

    //fetching the previous notes from the localStorage
    let allNotes = getNotes();
    var id;
    
    //creating new id
    if(allNotes.length === 0){
        id = 1;
    }else {
        let newLength = allNotes.length - 1
        id = allNotes[newLength].id + 1; 
    }
     
    if(input === ""){
        alert("Please write somthing to Make Notes");
        return;
    } else {
        localStorage.setItem("notes", JSON.stringify([...allNotes, {id: id, value: input}]));
        alert("Your Note is saved");
    }

    document.querySelector(".txt_area").value = "";
     
    globalState = false;
    conditionCall();
    showNotes();
}

//function to showNotes
function showNotes(){
    dispContainer.innerHTML = " ";
    let allNotes = getNotes()
    if(allNotes.length !== 0){
        allNotes.forEach((data) => fetchNote(data));
    }
};


//getting previous notes from the localStorage
function getNotes(){
    let storgItem = JSON.parse(localStorage.getItem("notes"));
    storgItem = storgItem === null ? [] : storgItem
    return storgItem;
}

//removing all notes
function removeAllNotes(){

    const allNotes = getNotes();

    if(allNotes.length !== 0){
        const delWord = prompt("write 'delete' to clear the all notes");
        if(delWord === 'delete'){
            localStorage.removeItem("notes");
            alert("Items are deleted");
            conditionCall();
        }else {
            alert("you did not write word 'delete'");
        }
    }else {
        alert("No Item to Delete");
        return;
    }

    globalState = true;
    showNotes()
};


//this function creating new-html and putting it into dom
function fetchNote(data){

    const noteLi = document.createElement("li");

    noteLi.classList.add("notes_card");

    noteLi.innerHTML = `<div class="del_note fa fa-trash" id=${data.id}></div>
                           <div class="display_notes">
                            ${data.value}
                           </div>`

    const delNoteElemnt = noteLi.querySelector(".del_note");
    
    
    //deleting note on click cross button
    delNoteElemnt.addEventListener("click", function(e){
        const allNotes = getNotes()
        let id = parseInt(e.target.id);
        localStorage.setItem("notes", JSON.stringify(allNotes.filter(note => note.id !== id)));
        showNotes();
    })
    
    dispContainer.appendChild(noteLi);
    
}
