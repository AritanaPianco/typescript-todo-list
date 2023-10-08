import "./style.css"
import { v4 as uuidV4 } from "uuid"


type TaskAbstract = {
    id: string
    title: string
    complete: boolean
    createdAt: Date
}




const input = document.querySelector<HTMLInputElement>(".input")
const btnAdd = document.querySelector<HTMLButtonElement>(".btn-add")
const ulList = document.querySelector<HTMLUListElement>(".ul-list")


const tasks: TaskAbstract[] = loadTasks() 
tasks.forEach(addTask)



btnAdd?.addEventListener("click", (e) => {
   e.preventDefault()
   
  if(input?.value == "" || input?.value == null) return

  const newtask: TaskAbstract = {
     id: uuidV4(),
     title: input?.value,
     complete: false,
     createdAt: new Date()
  
  }

  tasks.push(newtask)
  salveTask()
  
  addTask(newtask) 
  input.value = ""      

})



function addTask( taskAdd: TaskAbstract ){
       const li = document.createElement("li")
       const span = document.createElement("span")
       const checkbox = document.createElement("input")   
       const btnRemove = document.createElement("button")

       
       
       checkbox.type = "checkbox" 
       checkbox.checked = taskAdd.complete
       span.innerText = taskAdd.title
       btnRemove.innerText = "Remove"
       li.append(span)
       li.append(checkbox)
       li.append(btnRemove)
       ulList?.appendChild(li)
    
       
       checkbox.addEventListener("change", () => {
           taskAdd.complete = checkbox.checked
            salveTask() 
       })  

      btnRemove.addEventListener("click",() => {
           const target = btnRemove.parentNode
           const currentContent = target?.firstChild?.textContent
           updateArrayTasks(currentContent)
            ulList?.removeChild(target)
          })
          
          
          
  
          
    }
        
        
        
function updateArrayTasks(currentContent:string){
  const jsonTasks = localStorage.getItem("tasks")
  if(jsonTasks === null) return []
   const jsonTaskksParse = JSON.parse(jsonTasks)
  const modified =  jsonTaskksParse.filter(item => item.title !== currentContent)
   localStorage.setItem("tasks", JSON.stringify(modified))     
  
}
console.log(tasks)  


function salveTask(){
   localStorage.setItem("tasks", JSON.stringify(tasks))
}



function loadTasks():TaskAbstract[]{

    const tasksJson = localStorage.getItem("tasks")
    if(tasksJson === null) return []
    return JSON.parse(tasksJson)

}

