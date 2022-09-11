const addButton = document.querySelector("#add");
const updateLSData = () => {
	const textAreaData= document.querySelectorAll("textarea");
	const notes = [];
	textAreaData.forEach((note)=>{
		return notes.push(note.value);
	})
	localStorage.setItem('notes',JSON.stringify(notes));
}
const addNewNote = (text = '') => {
	const note = document.createElement('div');
	note.classList.add('note');
	const htmlData=`
	<div class='operation'>
		<button class="edit"><i class="fas fa-edit"></i></button>
		<button class="delete"><i class="fas fa-trash-alt"></i></button>
	</div>
	<div class="main ${text ? "" : "d-none" }"></div>
	<textarea class="${text ? "d-none" : "" }"></textarea>
	`;
	note.insertAdjacentHTML("afterbegin",htmlData);

	//getting references
	const editButton = note.querySelector(".edit");
	const delButton = note.querySelector(".delete");
	const mainDiv = note.querySelector(".main");
	const txtArea = note.querySelector("textarea");

	//deleting the node
	delButton.addEventListener("click",()=>{
		note.remove();
		updateLSData();
	});
	txtArea.value=text;
	mainDiv.innerHTML=text;
	// Toggele edit button
	editButton.addEventListener("click" , ()=>{

		mainDiv.classList.toggle("d-none");
		txtArea.classList.toggle("d-none");
	})
	txtArea.addEventListener("change",(event) => {
		const val=event.target.value;
		console.log(val);
		mainDiv.innerHTML=val;
		updateLSData();

	})
	document.body.appendChild(note);
	// It appends a node as the last child of a node

}

// getting data from local storage
const notes = JSON.parse(localStorage.getItem('notes'));
if(notes){
	notes.forEach((note)=> addNewNote(note) );
}

addButton.addEventListener("click",()=>{
	addNewNote();
});

