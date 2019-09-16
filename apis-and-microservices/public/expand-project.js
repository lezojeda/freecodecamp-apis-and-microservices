let classname = document.getElementsByClassName('fa-chevron-circle-down') // Get all buttons with the arrow icon

Array.from(classname).forEach(function(element) {
    element.addEventListener('click', toggleVisibilityAndRotate);
}); //add event listener to all elements with the class of the icon


function toggleVisibilityAndRotate(e) {
    let targetParentNode = e.target.parentNode
    if(targetParentNode.nextElementSibling.style.display == "none") {
        targetParentNode.nextElementSibling.style.display = "flex"
        e.target.style.transform = "rotate(180deg)"
    } else {
        targetParentNode.nextElementSibling.style.display = "none"
        e.target.style.transform = "rotate(0deg)"
    }
}
