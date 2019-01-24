// Half Life Modal
var HalfLifeModal = new tingle.modal({
    footer: true,
    stickyFooter: true,
    closeMethods: ['overlay', 'escape'],
    closeLabel: "Close",
    closeMethods: ['overlay', 'button', 'escape'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
        HalfLife.scorearray = 0;
    },
    beforeClose: function() {
        return true; 
        return false; 
    }
});

HalfLifeModal.setContent(document.getElementById('HalfLifeContent').innerHTML);

var HalfLife = { 
	mass: null,
	halflife: null,
	years: null,
    question: null,
    answer: null,
    correct: null,
    scorearray: null,


Initiate: function(){ // function for starting the modal as well as moving to next question
    HalfLifeModal.open()

    for(i = 1; i <=4;i++){
        choice = document.getElementById([i,"_3"].join(""))
        choice.style.background = "#134a7b"
    }

    this.scorearray = []
    this.HideSolution()
    this.HideNextButton()

    IncorrectMessage = document.getElementById("IncorrectMessage_3")
    CorrectMessage = document.getElementById("CorrectMessage_3")
    CorrectMessage.style.display = "none"
    IncorrectMessage.style.display = "none"


    this.genQuestion()
    this.randomiseChoices()

    document.getElementById('HalfLifeQuestions').innerHTML = this.question;

},

genQuestion: function(){
	this.mass = Math.floor((Math.random() * 100) + 1);
	this.halflife = Math.floor((Math.random() * 100) + 2);
	this.years = Math.floor((Math.random() * 100) + 1);
	this.question = "The half-life of " + this.mass + " grams of a radioisotope is " + this.halflife + " years, how many grams will remain in " + this.years + " years?"
	this.genAnswer()
},

genAnswer: function(){
    this.answer = this.mass / Math.pow(2, this.years/this.halflife)
    this.answer = (Math.round(this.answer * 100) / 100)
},

randomiseChoices: function(){ //randomises the multiple choices
    this.correct = Math.floor((Math.random() * 4) + 1);
    document.getElementById([this.correct,"_3"].join("")).innerHTML = this.answer + " grams";
    for (i = 1; i <= 4; i++) {
        if (i == this.correct) { continue; }
        randomNumber = Math.random() * 1.1*this.answer + 0.9*this.answer  
        document.getElementById([i,"_3"].join("")).innerHTML = (Math.round(randomNumber * 100) / 100)  + " grams";
    }
},

chooseAnswer: function(Choice){
    IncorrectMessage = document.getElementById("IncorrectMessage_3")
    CorrectMessage = document.getElementById("CorrectMessage_3")

    if (Choice != this.correct ) { 
        CorrectMessage.style.display = "none"
        IncorrectMessage.style.display = "block"
        this.ChangeWrongColor(Choice)
        this.ScoreCounter("incorrect")
       
}

    if (Choice == this.correct) { 
        IncorrectMessage.style.display = "none"
        CorrectMessage.style.display = "block"
        this.ChangeRightColor(Choice)
        this.HideSolution()
        this.HideNextButton()
        this.ScoreCounter("correct")
        setTimeout("HalfLife.Initiate()", 1250)
        this.ScoreUpdate()
        
}
},

HalfLifeStep1: function(){
	HTMLElement = document.getElementById("Solution1_3")
	solution = "The half life is the time taken for the number of nuclei of a radioisotope to halve. Remaining mass can be measured by the formula: A * (1/2) " + " t / h ".sup() + "where A is the initial mass, t is the time periods elapsed, and h is the half life"

    HTMLElement.style.display = "block";
    document.getElementById("Solution1_3").innerHTML = solution

    HTMLElement2 = document.getElementById("Next1_3")
    HTMLElement2.style.display = "block"
},

HalfLifeStep2: function(){
	HTMLElement = document.getElementById("Solution2_3")
	solution = this.mass + " * (1/2)" + String(this.years).sup() + "/".sup() + String(this.halflife).sup() + " = " + this.answer + " grams"

    HTMLElement.style.display = "block";
    document.getElementById("Solution2_3").innerHTML = solution

    HTMLElement2 = document.getElementById("Next2_3")
    HTMLElement2.style.display = "block"
},


ChangeWrongColor: function(x){
    choice = document.getElementById([x,"_3"].join(""))
    choice.style.background = "red"

},

ChangeRightColor: function(x){
    choice = document.getElementById([x,"_3"].join(""))
    choice.style.background = "green"

},

HideSolution: function(){
    for(i = 1; i <=2;i++){
        Step = document.getElementById(["Solution",i,"_3"].join(""))
        Step.style.display = "none"
    }

},

HideNextButton: function(){
    for(i = 1; i <=2;i++){
        Next = document.getElementById(["Next",i,"_3"].join(""))
        Next.style.display = "none"
    }
},

ScoreInitialise: function(){
    correct = localStorage.getItem("Correct_3");
    answered = localStorage.getItem("Answered_3");
    incorrect = localStorage.getItem("Incorrect_3")
    if(correct == null || answered == null || incorrect == null || correct == NaN || answered == NaN || incorrect == NaN){
        localStorage.setItem("Correct_3", 0);
        localStorage.setItem("Answered_3", 0)
        localStorage.setItem("Incorrect_3", 0)
    }
},

ScoreCounter: function(x){
    this.scorearray.push(x)
    console.log(this.scorearray)
    
},

ScoreUpdate: function(){
    if(this.scorearray[0] == "correct"){
        correct = parseInt(localStorage.getItem("Correct_3"));
        correct += 1
        localStorage.setItem("Correct_3", correct)
    }

    if(this.scorearray[0] == "incorrect"){
        incorrect = parseInt(localStorage.getItem("Incorrect_3"));
        incorrect += 1
        localStorage.setItem("Incorrect_3", incorrect)
    }

    answered = parseInt(localStorage.getItem("Answered_3"))
    answered += 1
    localStorage.setItem("Answered_3", answered)

    this.ScoreDisplay()

},

ScoreDisplay: function(){
    document.getElementById("HalfLifeAnswered").innerHTML = localStorage.getItem("Answered_3") + " questions answered"
    document.getElementById("HalfLifeCorrect").innerHTML = localStorage.getItem("Correct_3") + " questions correct"
    document.getElementById("HalfLifeIncorrect").innerHTML = localStorage.getItem("Incorrect_3") + " questions incorrect"
    if(localStorage.getItem("Answered_3") != 0){
        document.getElementById("HalfLifePercentage").innerHTML = Math.round( localStorage.getItem("Correct_3") / localStorage.getItem("Answered_3") * 100 ) + "% correct answers"
    }else{
        document.getElementById("HalfLifePercentage").innerHTML = "No attempts yet"
    }
}


}

HalfLife.ScoreInitialise()
HalfLife.ScoreDisplay()