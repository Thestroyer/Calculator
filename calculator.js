//Działa, nie ruszaj

let currentOperation = "";
function push(character){
    var currentField = document.getElementById("current");
    var historyField = document.getElementById("history");
    
    var currentFieldVal = currentField.textContent;
    if(currentFieldVal == "0"){
        if(character == "."){
            currentField.textContent += character;
        }
        else{
            currentField.textContent = character;
        }
    }
    else if(character == "."){
        if(currentFieldVal.split(".").length > 1 ){
            var tmp = currentFieldVal.split(/[+\-÷×]/);
            if(tmp[tmp.length - 1].split(".").length > 1){
                return;
            }
        }
        var lastElement = currentField.textContent[currentField.textContent.length - 1];
        if(lastElement == "+" || lastElement == "-" || lastElement == "×" || lastElement == "÷" || lastElement == "√" || lastElement == "^"){    
            currentField.textContent += "0";
        }
        currentField.textContent += character;
    }
    else{
        currentField.textContent += character;
    }
    
}
function pop(number = 1){
    if(number == 0) return;
    var currentField = document.getElementById("current");
    if(currentField.textContent != "0"){
        currentField.textContent = currentField.textContent.slice(0, -number);
    }
    if(currentField.textContent.length == 0){
        currentField.textContent = 0;
    }
}

function reset(){
    document.getElementById("history").textContent = 0;
    document.getElementById("current").textContent = 0;
}
function addOperation(operator){
    var historyField = document.getElementById("history");
    var currentField = document.getElementById("current");
    switch(operator){
        case "+":
        case "-":
        case "*":
            if(operator == "*") operator = "&times;";
        case "/":
            if(operator == "/") operator = "&divide;";
            var lastElement = currentField.textContent[currentField.textContent.length - 1];
            if(lastElement == "+" || lastElement == "-" || lastElement == "×" || lastElement == "÷" || lastElement == "^"){
                currentField.textContent = currentField.textContent.slice(0, -1);
            }
            currentField.innerHTML = currentField.textContent + operator;
            break;
        case "sqrt":
            var tmp = currentField.textContent.split(/[+\-÷×]/);
            if(tmp[tmp.length - 1].split("√").length > 1){
                console.log(tmp[tmp.length - 1].slice(1));
                tmp[tmp.length - 1] = tmp[tmp.length - 1].slice(1);
                currentField.textContent = currentField.textContent.slice(0, -(tmp[tmp.length - 1].length + 1));
                currentField.textContent += tmp[tmp.length - 1];
                return;
            }
            else{
                if(tmp[tmp.length - 1].length > 0){
                    tmp[tmp.length - 1] = "√" + tmp[tmp.length - 1];
                }
                else{
                    tmp[tmp.length - 1] = "√";
                }
            }
            if(tmp[tmp.length - 1].length - 1 != 0){
                currentField.textContent = currentField.textContent.slice(0, -(tmp[tmp.length - 1].length - 1));
            }
            currentField.textContent += tmp[tmp.length - 1];
            break;
        case "^":
            var lastElement = currentField.textContent[currentField.textContent.length - 1];
            if(lastElement == "+" || lastElement == "-" || lastElement == "×" || lastElement == "÷" || lastElement == "^"){
                currentField.textContent = currentField.textContent.slice(0, -1);
            }
            currentField.textContent += "^";
            break;
        default:
            return;
    }
}
function calc(){
    var historyField = document.getElementById("history");
    var currentField = document.getElementById("current");
    var expression = currentField.textContent;
    
    if(expression == "0") return;
    
    var lastElement = expression[expression.length - 1];
    if(lastElement == "√") expression = expression.slice(0, -2);
    if(lastElement == "+" || lastElement == "-" || lastElement == "×" || lastElement == "÷" || lastElement == "^"){
        expression = expression.slice(0, -1);
    }
    if(expression[expression.length - 1] == "0" && expression[expression.length - 2] == "÷"){
        alert("Nie można dzielić przez zero!");
        return;
    }
    var normalizedExpr;
    normalizedExpr = expression.split("×").join("*");
    normalizedExpr = normalizedExpr.split("÷").join("/");
    //normalizedExpr = normalizedExpr.split("√").join("sqrt(");
    normalizedExpr = calcRoots(normalizedExpr);
    normalizedExpr = calcPowers(normalizedExpr);
    console.log(normalizedExpr);

    var result = eval(normalizedExpr);
    if(result == "Infinity"){
        alert("Wyrażenie nie jest możliwe do policzenia.");
        return;
    }
    historyField.innerHTML = expression + "=";
    currentField.textContent = result;
}
function calcRoots(expr){
    console.log(expr);
    var finalExpr = "";
    var exprArr = expr.split("√");
    for(i = 1; i < exprArr.length; ++i){
        var operatorIndex = exprArr[i].search(/[+\-/*]/);
        if(operatorIndex != -1){
            //finalExpr += "sqrt(" + exprArr[i].substr(0, operatorIndex) + ")" + exprArr[i].substr(operatorIndex);
            finalExpr += Math.sqrt(parseFloat(exprArr[i].substr(0, operatorIndex))) + exprArr[i].substr(operatorIndex);
        }
        else{
            //finalExpr += "sqrt(" + exprArr[i] + ")";
            finalExpr += Math.sqrt(parseFloat(exprArr[i]));
        }
    }

    return finalExpr.length == 0 ? expr : finalExpr;
}
function calcPowers(expr){
    finalExpr = "";
    var exprArr = expr.split("^");
    for(i = 0; i < exprArr.length - 1; ++i){
        var operatorIndex = exprArr[i].search(/[+\-/*]/);
        if(operatorIndex != -1){
            //finalExpr += "sqrt(" + exprArr[i].substr(0, operatorIndex) + ")" + exprArr[i].substr(operatorIndex);
            finalExpr += Math.pow(parseFloat(exprArr[i].substr(0, operatorIndex)), parseFloat(exprArr[++i].substr(operatorIndex)));
        }
        else{
            //finalExpr += "sqrt(" + exprArr[i] + ")";
            finalExpr += Math.pow(parseFloat(exprArr[i]), parseFloat(exprArr[++i]));
        }
    }
    return finalExpr.length == 0 ? expr : finalExpr;
}
