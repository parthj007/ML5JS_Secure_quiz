//webcam's video
let video;

//canvas for showing the video
let canvas;

//labes for results
let label;

//human detection Model Url
let imageModelURL = 'human-model/';

//classifier
let classifier;

//first fo all load the model 
function preload()
{
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}


//setup the webcam and take video from webcam
 async function  setup (){

    let height="250";

    let width = "250";

    canvas = createCanvas(height,width);

    //canvas.parent('video');

    capture = createCapture(VIDEO);
    
    capture.size(height,width);
    
   capture.hide();

   
    //Call the classify() to pred.

   classifyVideo();
}

async function draw(){
           image(capture,0,0);
    
    }

function classifyVideo(){

    classifier.classify(capture,gotResult);
}

//Results
function gotResult(error,results)
{
    if(error)
    {
        console.log(error);
        return;
    }
    label = results[0].label;

    if(label == 'person')
    {
        document.getElementById('status').innerHTML = "<h2>OK!</h2>";
    }
    else
    {
        document.getElementById('status').innerHTML = "<h2>NOT OK!</h2>";
        window.alert("user is not found");
    }
   
    
    classifyVideo();
    document.addEventListener('visibilitychange',function(){
        console.log(document.visibilityState);
        //window.close();
});
}



const quizData = [
    {
        question:"which language runs in a web browser?",
        a:"Java",
        b:"C",
        c:"Python",
        d:"javas",
        correct:"d", 
         
    },
    {
        question:"which language is your favourite?",
        a:"Java",
        b:"C",
        c:"Python",
        d:"js",
        correct:"a",

    },
    {
        question:"which language you like?",
        a:"Java",
        b:"C",
        c:"Python",
        d:"javascript",
        correct:"c",
    },
]

//mapping
const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const question = document.getElementById('question-text'); 
const a_text = document.getElementById('a-text');
const b_text = document.getElementById('b-text');
const c_text = document.getElementById('c-text');
const d_text = document.getElementById('d-text');

let submit = document.getElementById('submit');

//for incr

let currentQuiz = 0;
let score = 0;

//load all data one by one
loadQuiz() 

function loadQuiz(){
     
    const currentQuizData = quizData[currentQuiz];
    question.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

}
function dsanswer(){
    answerEls.forEach(answerEL = answerEls.checked = false)
}

function sanswer(){
    let answer
    answerEls.forEach(answerEL => {
        if(answerEL.checked){
            answer = answerEL.id
        }
    })
    return answer
}

submit.addEventListener('click',() => {
    const answer = sanswer()
    if(answer){
        if(answer == quizData[currentQuiz].correct){
            score++
        }
    }
    currentQuiz++
    
if(currentQuiz < quizData.length){
    loadQuiz()
}
else{
    quiz.innerHTML = `<h2>You answered ${score}/${quizData.length} questions correctly</h2>

    <button onclick="location.reload()">Reload</button>`
}

})