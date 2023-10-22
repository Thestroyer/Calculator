document.addEventListener("keydown", function(event){
    //event.preventDefault();
    switch(event.key){
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            push(event.key);
            break;
        case ",":
            push(".");
            break;
        case "+":
        case "-":
        case "/":
        case "*":
            addOperation(event.key);
            break;
        case "Backspace":
            pop();
            break;
        case "Escape":
            reset();
            break;
        case "Enter":
            calc();
            break;    
    }
    if(event.ctrlKey){
        if(event.key == "a" || event.key == "A"){
            event.preventDefault();
            //window.getSelection().removeAllRanges();
            window.getSelection().selectAllChildren(document.getElementById("current"));
        }
    }
});