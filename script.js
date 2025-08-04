var todoFormElem = document.querySelector("#todo-form");
var todoWrapperElem = document.querySelector("#todo-wrapper");
var buttonTrashElems = document.querySelectorAll(".button-trash");
var allTodos = [];

function handleTrash() {
    console.log(this);
    
}
buttonTrashElems.forEach(buttonElem => {
    buttonElem.addEventListener('click', (event) => {
    if (event.target.closest('.button-trash')) {
        const section = event.target.closest('section');
        if (section) {
            section.remove();
        }
    }
});
});

todoFormElem.addEventListener("submit", (e) => { 
    e.preventDefault();

    let newTodo = {};

    for (let target of e.target) {
        if (target.id == "input-title") {
            newTodo["title"] = target.value ? target.value : "Title";
            
        } if (target.id == "input-description") {
            newTodo["description"] = target.value ? target.value : "No description";
            
        } if (target.id == "input-duedate") {
            newTodo["duedate"] = target.value ? new Date(target.value) : new Date().toISOString().split('T')[0];
            
        } if (target.id == "input-person") {
            newTodo["person"] = target.selectedOptions[0].text != target[0].text ? target.selectedOptions[0].text : "Anyone";
            
        } if (target.id == "input-files") {
            newTodo["files"] = [];
            for(let file of target.files) {
                newTodo["files"].push(file.name);
                
            }
            
        } if (target.id == "") {
            // skip
            
        }
    }
    
    console.log(newTodo);
    allTodos.push(newTodo);
    
    todoWrapperElem.innerHTML += `
        <section class="container border border-2 rounded p-1 mb-3">
            <div class="row justify-content-between">
                <div class="col-6">
                    <h3 class="">${newTodo.title}</h3>
                    <p class="">${newTodo.description}</p>
                </div>
                
                <div class="col-6 row mb-auto">
                    <p class="col text-nowrap m-0" style="font-size: 0.85rem;">Created: ${new Date().toISOString().split('T')[0]}</p>
                    <div class="col btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary"><i class="fa-solid fa-check"></i></button>
                        <button class="btn btn-outline-secondary"><i class="fa-solid fa-pen"></i></button>
                        <button class="button-trash btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>

                <div class="row d-flex flex-row ">
                    <p class="col mb-0 text-nowrap"><i class="fa-solid fa-calendar"></i> ${newTodo.duedate.toLocaleString()}</p>
                    <p class="col mb-0"><i class="fa-solid fa-user"></i> ${newTodo.person}</p>
                    <p class="col mb-0"><i class="fa-solid fa-paperclip"></i> ${newTodo.files.length} attatchments</p>
                </div>
            </div>
        </section>
    `;

});
