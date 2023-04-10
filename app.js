// References to containers
const textarea = document.querySelector("textarea");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

let headerToBeEdited;

// Open context menu
function openContextMenu(){
  const contextMenu = document.querySelector(".contextMenu");
  contextMenu.style.display = "flex"
  footer.classList.add("moveUp")
}

// Close context menu
function closeContextMenu(){
  const contextMenu = document.querySelector(".contextMenu");
  contextMenu.style.display = "none"
  footer.classList.remove("moveUp")
}

// Convert to H1 field
function changeToH1(){
  textarea.classList.add("toHeader");
  closeContextMenu()
  textarea.value = ""
  textarea.placeholder = "Heading 1"
}

// Create header element
function createHeaderElement(headerText){
  const headerContainer = document.createElement("div");
  const headerElement = document.createElement("h1");
  const menuIcon = document.createElement("img");
  menuIcon.src = "./assets/menu.png"

  const trashIcon = document.createElement("img");
  trashIcon.src = "./assets/trash.png"
  trashIcon.className = "trash-icon"
  
  // Attach event listener for the icons
  menuIcon.addEventListener("click", () => {
    changeToH1()
    textarea.placeholder = "Edit here and type Enter to finish editing"
    headerToBeEdited = headerElement
  })

  trashIcon.addEventListener("click", () => {
    main.removeChild(headerContainer)
  })
  

  headerContainer.append(menuIcon, headerElement, trashIcon);
  headerElement.textContent = headerText
  headerContainer.className = "header-text-container"
  main.insertBefore(headerContainer, textarea)
}

// Create header text and change back to normal text
function saveAndBackToText(headerText){
  textarea.placeholder = "Type / for blocks, @ to link docs or people"
  textarea.classList.remove("toHeader");
  closeContextMenu();
  createHeaderElement(headerText)
  textarea.value = ""
}

// Event listener initialization
textarea.addEventListener("input", (e) => {
  const value = e.target.value
  // Only enable context menu in normal text mode
  if(value === "/" && e.target.placeholder === "Type / for blocks, @ to link docs or people"){
    openContextMenu()
  }else if(value === "/1"){
    changeToH1()
  } else {
    closeContextMenu()
  }
})

textarea.addEventListener("keypress", (e) => {
  if(e.key === "Enter" && e.target.placeholder === "Heading 1") {
    saveAndBackToText(e.target.value);
    e.preventDefault()
  } else if(e.key === "Enter" && e.target.placeholder === "Edit here and type Enter to finish editing") {
    headerToBeEdited.textContent = e.target.value
    e.target.value = ""
    textarea.placeholder = "Type / for blocks, @ to link docs or people"
    textarea.classList.remove("toHeader");
    e.preventDefault()
  }
})

// Event listener for cancel ( Return back to normal text )
textarea.addEventListener("keyup", (e) => {
  if(e.key === "Escape" && (e.target.placeholder === "Edit here and type Enter to finish editing" || e.target.placeholder === "Heading 1")) {
    e.preventDefault()
    textarea.placeholder = "Type / for blocks, @ to link docs or people"
    textarea.classList.remove("toHeader");
  }
})