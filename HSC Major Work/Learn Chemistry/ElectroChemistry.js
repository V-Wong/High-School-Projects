// Electrochemistry Mass Modal
var ElectrochemistryModal = new tingle.modal({
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
        Electrochemistry.scorearray = [];
    },
    beforeClose: function() {
        return true; 
        return false; 
    }
});

ElectrochemistryModal.setContent(document.getElementById('ElectrochemistryContent').innerHTML);

var Electrochemistry = { 
	randomElement1: null,
	randomElement2: null,
	Voltage1: null,
	Voltage2: null,
	randomMoles: null,
	question: null,
	answer: null,
	correct: null,
    scorearray: [],

Initiate: function(){ // function for starting the modal as well as moving to next question
	for(i = 1; i <=4;i++){
        choice = document.getElementById([i,"_2"].join(""))
        choice.style.background = "#134a7b"
    }

    this.scorearray = []
    this.HideNextButton()
    this.HideSolution()

    IncorrectMessage = document.getElementById("IncorrectMessage_2")
    CorrectMessage = document.getElementById("CorrectMessage_2")
    CorrectMessage.style.display = "none"
    IncorrectMessage.style.display = "none"

    ElectrochemistryModal.open()
    this.genQuestion()
    this.randomiseChoices()
    document.getElementById('ElectrochemistryQuestion').innerHTML = this.question;

},

genQuestion: function(){ // generate questions
	i = "True"
	while(i = "True"){
		this.randomElement1 = pTable[Math.floor((Math.random() * pTable.length))]
		this.randomElement2 = pTable[Math.floor((Math.random() * pTable.length))]
		if(this.randomElement1 != this.randomElement2 && this.randomElement1.EMF != null && this.randomElement2.EMF != null && this.randomElement2.valency != null && this.randomElement1.valency != null){
			break
		}
	}

	this.genAnswer()

},

genAnswer: function(){ // generate answers
    if(Number(this.randomElement1.EMF) < Number(this.randomElement2.EMF)){
        this.Voltage1 = -(this.randomElement1.EMF)
        this.Voltage2 = this.randomElement2.EMF
        this.question = "What is the voltage of the following galvanic cell: " + this.randomElement1.symbol +  " | " + this.randomElement1.symbol + "+".sup() + String((this.randomElement1.valency)).sup() + " || " + this.randomElement2.symbol + "+".sup() + String((this.randomElement2.valency)).sup() + " | " + this.randomElement2.symbol + " ?"
    }
    if(Number(this.randomElement1.EMF) > Number(this.randomElement2.EMF)){
        this.Voltage1 = this.randomElement1.EMF
        this.Voltage2 = -(this.randomElement2.EMF)
        this.question = "What is the voltage of the following galvanic cell: " + this.randomElement2.symbol +  " | " + this.randomElement2.symbol + "+".sup() + String((this.randomElement2.valency)).sup() + " || " + this.randomElement1.symbol + "+".sup() + String((this.randomElement1.valency)).sup() + " | " + this.randomElement1.symbol + " ?" 

    }
    this.answer = this.Voltage1 + this.Voltage2
    this.answer = (Math.round(this.answer * 100) / 100)
},

electroChemstep1: function(){
	 HTMLElement1 = document.getElementById("Solution1_2")
	 solution = "The element with the higher EMF drives the other element in a reverse oxidation reaction. Therefore the sign of the element with lower EMF must be flipped. Then calculate total EMF by summing up the two half reactions EMF."
     HTMLElement1.style.display = "block";
	 document.getElementById("Solution1_2").innerHTML = solution
   
     HTMLElement2 = document.getElementById("Next1_2")
     HTMLElement2.style.display = "block"
},

electroChemstep2: function(){
	HTMLElement = document.getElementById("Solution2_2")
	
	if(this.randomElement1.EMF > this.randomElement2.EMF){
		solution = "Reduction: " + this.randomElement1.symbol + "+".sup() + String((this.randomElement1.valency)).sup() + " + " + String(this.randomElement1.valency) + "e" + "-".sup() + "-> " + this.randomElement1.symbol + "<br>" + " EMF = " + this.randomElement1.EMF + " volts"
	}
	if(this.randomElement1.EMF < this.randomElement2.EMF){
		solution = "Reduction: " + this.randomElement2.symbol + "+".sup() + String((this.randomElement2.valency)).sup() + " + " + String(this.randomElement2.valency) + "e" + "-".sup() + "-> " + this.randomElement2.symbol + "<br>" + " EMF = " + this.randomElement2.EMF + " volts"
	}
	HTMLElement.style.display = "block";
	document.getElementById("Solution2_2").innerHTML = solution

    HTMLElement2 = document.getElementById("Next2_2")
    HTMLElement2.style.display = "block"
},

electroChemstep3: function(){
	HTMLElement = document.getElementById("Solution3_2")
	if(this.randomElement1.EMF < this.randomElement2.EMF){
		solution = "Oxidation: " + this.randomElement1.symbol + "-> " + this.randomElement1.symbol + "+".sup() + String((this.randomElement1.valency)).sup() + " + " + String(this.randomElement1.valency) + "e" + "-".sup() + "<br>" + " EMF = " + -(this.randomElement1.EMF) + " volts"
	}
	if(this.randomElement1.EMF > this.randomElement2.EMF){
		solution = "Oxidation: " + this.randomElement2.symbol + "-> " + this.randomElement2.symbol + "+".sup() + String((this.randomElement2.valency)).sup() + " + " + String(this.randomElement2.valency) + "e" + "-".sup() + "<br>" + " EMF = " + -(this.randomElement2.EMF) + " volts"
	}
	HTMLElement.style.display = "block";
	document.getElementById("Solution3_2").innerHTML = solution

    HTMLElement2 = document.getElementById("Next3_2")
    HTMLElement2.style.display = "block"
},

electroChemstep4: function(){
	HTMLElement = document.getElementById("Solution4_2")
	HTMLElement.style.display = "block";
	document.getElementById("Solution4_2").innerHTML = "Total EMF = " + this.Voltage1 + " volts + " + this.Voltage2 + " volts = " + this.answer + " volts"

    HTMLElement2 = document.getElementById("Next4_2")
    HTMLElement2.style.display = "block"
},

randomiseChoices: function(){ // randomises the multiple choice
    this.correct = Math.floor((Math.random() * 4) + 1);
    document.getElementById([this.correct,"_2"].join("")).innerHTML = this.answer + " volts";
    for (i = 1; i <= 4; i++) {
        if (i == this.correct) { continue; i++ }
        randomNumber = Math.random() * (1.5*this.answer - 0.5*this.answer) + 0.5*this.answer  
        document.getElementById([i,"_2"].join("")).innerHTML = (Math.round(randomNumber * 100) / 100)  + " volts";
    }
},

chooseAnswer: function(Choice){ // marks the choice selected by user
    IncorrectMessage = document.getElementById("IncorrectMessage_2")
    CorrectMessage = document.getElementById("CorrectMessage_2")

    if (Choice != this.correct ) { 
        CorrectMessage.style.display = "none"
        IncorrectMessage.style.display = "block"
        this.ChangeWrongColor(Choice)
        this.ScoreCounter("incorrect")
}

    if (Choice == this.correct) { 
        this.HideNextButton()
        IncorrectMessage.style.display = "none"
        this.HideSolution()
        CorrectMessage.style.display = "block"
        this.ChangeRightColor(Choice)
        this.ScoreCounter("correct")
        setTimeout("Electrochemistry.Initiate()", 1250)
        this.ScoreUpdate()
        
}
},

ChangeWrongColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_2"].join(""))
    choice.style.background = "red"

},

ChangeRightColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_2"].join(""))
    choice.style.background = "green"

},

HideNextButton: function(){
    for(i = 1; i <=4;i++){
        Next = document.getElementById(["Next",i,"_2"].join(""))
        Next.style.display = "none"
    }
},

HideSolution: function(){
    for(i = 1; i <=4;i++){
        Step = document.getElementById(["Solution",i,"_2"].join(""))
        Step.style.display = "none"
    }

},

ScoreInitialise: function(){// initialises the score in local storage if first use of program
    correct = localStorage.getItem("Correct_2");
    answered = localStorage.getItem("Answered_2");
    incorrect = localStorage.getItem("Incorrect_2")
    if(correct == null || answered == null){
        localStorage.setItem("Correct_2", 0);
        localStorage.setItem("Answered_2", 0)
        localStorage.setItem("Incorrect_2", 0)
    }
},

ScoreCounter: function(x){
    this.scorearray.push(x)
    console.log(this.scorearray)
    
},

ScoreUpdate: function(){ // Changes the score on homepage when user answers correctly
    if(this.scorearray[0] == "correct"){
        correct = parseInt(localStorage.getItem("Correct_2"));
        correct += 1
        localStorage.setItem("Correct_2", correct)
    }

    if(this.scorearray[0] == "incorrect"){
        incorrect = parseInt(localStorage.getItem("Incorrect_2"));
        incorrect += 1
        localStorage.setItem("Incorrect_2", incorrect)
    }

    answered = parseInt(localStorage.getItem("Answered_2"))
    answered += 1
    localStorage.setItem("Answered_2", answered)

    this.ScoreDisplay()

},

ScoreDisplay: function(){
    console.log(localStorage.getItem("Correct_2"))
    document.getElementById("ElectrochemistryAnswered").innerHTML = localStorage.getItem("Answered_2") + " questions answered"
    document.getElementById("ElectrochemistryCorrect").innerHTML = localStorage.getItem("Correct_2") + " questions correct"
    document.getElementById("ElectrochemistryIncorrect").innerHTML = localStorage.getItem("Incorrect_2") + " questions incorrect"
    if(localStorage.getItem("Answered_2") != 0){
        document.getElementById("ElectrochemistryPercentage").innerHTML = Math.round( localStorage.getItem("Correct_2") / localStorage.getItem("Answered_2") * 100 ) + "% correct answers"
    }else{
        document.getElementById("ElectrochemistryPercentage").innerHTML =  "No attempts yet"
    }

}

}

Electrochemistry.ScoreInitialise()
Electrochemistry.ScoreDisplay()