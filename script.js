let buffer = '0'
let runningTotal = '0'
let previousOperator
const calcScreen = document.querySelector('.screen')

// getting button click values
function buttonClick(value){
    if (isNaN(parseInt(value))){
        handleSymbol(value)
    } else {
        handleNumber(value)
    }
    rerender()
}

// handling numbers
function handleNumber(number){
  if (buffer === '0'){
    buffer = number
  } else {
    buffer += number
  } 
}

// math operations
function handleMath(value){
    if (buffer === '0'){
        // do nothing
        return 
    }

    const intBuffer = parseInt(buffer)
    if (runningTotal === 0){
        runningTotal = intBuffer
    } else {
        flushOperation (intBuffer)
    }

    previousOperator = value
    buffer = '0'
}

function flushOperation(intBuffer){
    if (previousOperator === '+'){
        runningTotal += intBuffer
    } else if (previousOperator === '-'){
        runningTotal -= intBuffer
    } else if (previousOperator === 'x'){
        runningTotal *= intBuffer
    } else if (previousOperator === '÷'){
        runningTotal /= intBuffer
    }
}

// handling symbols
function handleSymbol(symbol){
    switch (symbol){
        case 'C':
            buffer = '0'
            break

        case '=':
            if (previousOperator === null){
                // numbers do maths
                return
            }
            flushOperation(parseInt(buffer))
            previousOperator = null

            buffer = '' + runningTotal // turning numbers to strings to maintain consistency
            runningTotal = 0
            break

        case '←':
            if (buffer.length === 1){
                buffer = '0'
            } else {
                buffer = buffer.substring(0, buffer.length-1)
            }
            break

        case '+':
        case '-':
        case '÷':
        case 'x':
            handleMath(symbol)
            break
    }
  
}

function init(){
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event){
        buttonClick(event.target.innerText)
    })
}

init()

function rerender(){
    calcScreen.innerText = buffer
}
