// Task Node
  class Task {
    constructor(id,text){
      this.id=id;
      this.label=text;
    }
  }
  
  // Model - takes care of the app state , and state updates
  class ToDoListModel {
    constructor(todoViewObj){
      this.tasks=[]; // storage
      this.todoViewObj=todoViewObj;
      this.init();
    }
  
    init() {
      this.todoViewObj.bindEvents(this);
      this.todoViewObj.updateView();
    }
    
    add(newTaskText) {
      const taskObj=new Task(this.tasks.length,newTaskText);
      this.tasks.push(taskObj);
      this.todoViewObj.updateView(this.tasks);
    }
    
    remove(taskID) {
      if(taskID===null || taskID===undefined) return;
      this.tasks=this.tasks.filter(task=> task.id!==+taskID);
      this.todoViewObj.updateView(this.tasks);
    }
  }
  
  // View of TODO list - on app state update , this view gets updated
  class ToDoListView { 
    constructor(root, addBtn) {
        this.tableContainer=root;
        this.addBtn=addBtn; //document.querySelector('#todo-header-btn-add');
        this.todoModel=null;
    }
    
    isValidInput(inputVal) {
        return inputVal!=='';
    }
    bindEvents(todoModelObj) {
        this.todoModel=todoModelObj; // save the MODEL instance here
        this.addBtn.addEventListener('click',this.handleAdd);
        this.tableContainer.addEventListener('click',this.handleDelete);
    }
    
    createRowTemplate({id,label}) {
        let listItem=document.createElement('li');
        listItem.className='task-item';
        listItem.setAttribute('data-id',id);
        listItem.innerHTML=`<div>${label}<a class="btn-delete" href="#" role="buttonDelete">Delete</a></div>`;
    return listItem;
    }
    
    handleAdd=(e)=>{
        let targetInputElement=e.target.closest('.todo-header').children[0];
        let newValue=targetInputElement.value;
        if(!this.isValidInput(newValue)){
            return;
        }
        this.todoModel.add(newValue);
        targetInputElement.value="";// reset input 
    };
    
    handleDelete=(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('btn-delete')){
        // call delete callback
        let taskToBeRemoved=e.target.closest('.task-item').getAttribute('data-id');
        
        this.todoModel.remove(taskToBeRemoved);
    }
    
    };
    
    createTableTemplate(taskListArr){
        let list=document.createElement('ul');
        list.classname="task-list";   
        taskListArr.forEach(task=> {
            list.appendChild(this.createRowTemplate(task));
        });
        return list;
    }
    
    
    updateView(tasks=[]){ // rerenders the whole table
        this.tableContainer.innerHTML=''; // reset table container
        if(tasks.length==0){
            this.tableContainer.innerHTML=`<div>No Tasks</div>`;
        }else{
            this.tableContainer.appendChild(this.createTableTemplate(tasks));
        }
    }
  }