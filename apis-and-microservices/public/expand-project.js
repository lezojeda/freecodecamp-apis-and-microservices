let classname = document.getElementsByClassName('fa-chevron-circle-down') // Get all buttons with the arrow icon

Array.from(classname).forEach(function(element) {
    element.addEventListener('click', toggleVisibility);
}); //add event listener to all elements with the class of the icon


function toggleVisibility(e) {
    console.log(e.target.parentNode)
    let targetParentNode = e.target.parentNode
    if(targetParentNode.nextElementSibling.style.display == "none") {
        targetParentNode.nextElementSibling.style.display = "flex"
    } else {
        targetParentNode.nextElementSibling.style.display = "none"
    }
}

