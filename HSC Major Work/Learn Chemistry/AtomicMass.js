// Atomic Mass Modal
var AtomicMassModal = new tingle.modal({
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
        AtomicMass.scorearray = [];
    },
    beforeClose: function() {
        return true; 
        return false; 
    },

});

AtomicMassModal.setContent(document.getElementById('AtomicMassContent').innerHTML); //setting the content of the modal 

var AtomicMass = { //namespace
	randomElement: null, //variables dedicated to this section
	randomMoles: null,
	question: null,
	answer: null,
	correct: null,
    scorearray: [],

Initiate: function(){ // function for starting the modal as well as moving to next question
    for(i = 1; i <=4;i++){
        choice = document.getElementById([i,"_1"].join(""))
        choice.style.background = "#134a7b"
    }

    this.scorearray = []
    this.HideNextButton()
    this.HideSolution()

    IncorrectMessage = document.getElementById("IncorrectMessage_1")
    CorrectMessage = document.getElementById("CorrectMessage_1")
    CorrectMessage.style.display = "none"
    IncorrectMessage.style.display = "none"

    AtomicMassModal.open()
    this.genQuestion()
    this.randomiseChoices()
    document.getElementById('AtomicMassQuestion').innerHTML = this.question;
},

genQuestion: function(){  //generate questions
    this.randomElement = pTable[Math.floor((Math.random() * pTable.length))]
    this.randomMoles = Math.floor((Math.random() * 100) + 1)
    this.question = "How much does " + this.randomMoles + " moles of " + this.randomElement.name + " weigh?"
    
    this.genAnswer()
  
},

genAnswer: function(){ // generate answers
    this.answer = (Math.round(this.randomElement.aMass * this.randomMoles * 100) / 100)
    console.log("Answer: ", this.answer)
},

randomiseChoices: function(){ //randomises the multiple choices
    this.correct = Math.floor((Math.random() * 4) + 1);
    document.getElementById([this.correct,"_1"].join("")).innerHTML = this.answer + " grams";
    for (i = 1; i <= 4; i++) {
        if (i == this.correct) { continue; }
        randomNumber = Math.random() * (1.1*this.answer - 0.9*this.answer) + 0.9*this.answer  
        document.getElementById([i,"_1"].join("")).innerHTML = (Math.round(randomNumber * 100) / 100)  + " grams";
    }
},

aMassStep1: function(){ // generates solution step 1
    HTMLElement = document.getElementById("Solution1_1")
    solution = "There are " + this.randomMoles + " moles of " + this.randomElement.name + ". Therefore multiply " + this.randomMoles + " by the atomic mass of " + this.randomElement.name + "." 
    HTMLElement.style.display = "block";
    document.getElementById("Solution1_1").innerHTML = solution

    HTMLElement2 = document.getElementById("Next1_1")
    HTMLElement2.style.display = "block"
},

aMassStep2: function(){ // generates solution step 2
    HTMLElement = document.getElementById("Solution2_1")
    solution =  + this.randomElement.aMass + "g/mol x " + this.randomMoles + " mol = " + this.answer + "g"
    HTMLElement.style.display = "block";
    document.getElementById("Solution2_1").innerHTML = solution

    HTMLElement2 = document.getElementById("Next2_1")
    HTMLElement2.style.display = "block"
},

chooseAnswer: function(Choice){ //marks the choice selected by user
    IncorrectMessage = document.getElementById("IncorrectMessage_1")
    CorrectMessage = document.getElementById("CorrectMessage_1")

    if (Choice != this.correct ) { 
        CorrectMessage.style.display = "none"
        IncorrectMessage.style.display = "block"
        this.ChangeWrongColor(Choice)
        this.ScoreCounter("incorrect")
}

    if (Choice == this.correct) { 
        IncorrectMessage.style.display = "none"
        this.HideSolution
        CorrectMessage.style.display = "block"
        this.ChangeRightColor(Choice)
        this.HideNextButton()
        this.HideSolution()
        this.ScoreCounter("correct")
        setTimeout("AtomicMass.Initiate()", 1250)
        this.ScoreUpdate()
}

},
ChangeWrongColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_1"].join(""))
    choice.style.background = "red"

},

ChangeRightColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_1"].join(""))
    choice.style.background = "green"
},

HideNextButton: function(){ 
    for(i = 1; i <=2;i++){
        Next = document.getElementById(["Next",i,"_1"].join(""))
        Next.style.display = "none"
    }
},

HideSolution: function(){
    for(i = 1; i <=2;i++){
        Step = document.getElementById(["Solution",i,"_1"].join(""))
        Step.style.display = "none"
    }

},

ScoreInitialise: function(){ // initialises the score in local storage if first use of program
    correct = localStorage.getItem("Correct_1");
    answered = localStorage.getItem("Answered_1");
    incorrect = localStorage.getItem("Incorrect_1")
    if(correct == null || answered == null){
        localStorage.setItem("Correct_1", 0);
        localStorage.setItem("Answered_1", 0)
        localStorage.setItem("Incorrect_1", 0)
    }
},

ScoreCounter: function(x){ 
    this.scorearray.push(x)
    console.log(this.scorearray)
},

ScoreUpdate: function(){ // Changes the score on homepage when user answers correctly
    if(this.scorearray[0] === "correct"){
        correct = parseInt(localStorage.getItem("Correct_1"));
        correct += 1
        localStorage.setItem("Correct_1", correct)
    }

    if(this.scorearray[0] === "incorrect"){
        incorrect = parseInt(localStorage.getItem("Incorrect_1"));
        incorrect += 1
        localStorage.setItem("Incorrect_1", incorrect)
    }

    answered = parseInt(localStorage.getItem("Answered_1"))
    answered += 1
    localStorage.setItem("Answered_1", answered)

    this.ScoreDisplay()

},

ScoreDisplay: function(){ 
    document.getElementById("aMassAnswered").innerHTML = localStorage.getItem("Answered_1") + " questions answered"
    document.getElementById("aMassCorrect").innerHTML = localStorage.getItem("Correct_1") + " questions correct"
    document.getElementById("aMassIncorrect").innerHTML = localStorage.getItem("Incorrect_1") + " questions incorrect"
    if(localStorage.getItem("Answered_1") != 0){
    document.getElementById("aMassPercentage").innerHTML = Math.round( localStorage.getItem("Correct_1") / localStorage.getItem("Answered_1") * 100 ) + "% correct answers"
    }else{
        document.getElementById("aMassPercentage").innerHTML = "No attempts yet"
    }
}

} // end of namespace


AtomicMass.ScoreInitialise()
AtomicMass.ScoreDisplay()
