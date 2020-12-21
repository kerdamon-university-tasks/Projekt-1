function removeElement(elementId) {
    try{
        let element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }
    catch (e){}
}