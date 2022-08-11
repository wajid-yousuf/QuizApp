const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
let shuffleQuestions, currentQuestionIndex
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-buttons')

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', ()=>{
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}
function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer =>{
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    })
}
function resetState(){
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while(answerButtonElement.firstChild){
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if(shuffleQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    }else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}
function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }else{
        element.classList.add('wrong')
    }
}
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is the summer capital of Jammu & Kashmir ?',
        answers:[
            {text: 'Srinagar', correct:true},
            {text: 'Jammu', correct:false},
            {text: 'Ramban', correct:false},
            {text: 'Baramulla', correct:false}
        ]
    },
    {
        question: 'What is the capital of China ?',
        answers:[
            {text: 'Beijing', correct:true},
            {text: 'Shanghai', correct:false},
            {text: 'Guangzhou', correct:false},
            {text: 'Hong Kong', correct:false}
        ]
    },
    {
        question: 'what is the capital of Iceland ?',
        answers:[
            {text: 'Rejkjavik', correct:true},
            {text: 'Akureyri', correct:false},
            {text: 'Isafjordur', correct:false},
            {text: 'Grundarfjordur', correct:false}
        ]
    },
    {
        question: 'what is the capital of Australia ?',
        answers:[
            {text: 'Canberra', correct:true},
            {text: 'Sydney', correct:false},
            {text: 'Melbourne', correct:false},
            {text: 'Brisbane', correct:false}
        ]
    },
    {
        question: 'What is the capital of New Zealand ?',
        answers:[
            {text: 'Wellington', correct:true},
            {text: 'Auckland', correct:false},
            {text: 'Queenstown', correct:false},
            {text: 'Dunedin', correct:false}
        ]
    },
]