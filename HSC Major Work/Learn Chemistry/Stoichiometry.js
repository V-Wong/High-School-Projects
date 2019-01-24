var StoichiometryModal = new tingle.modal({
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
        Stoichiometry.scorearray = [];
    },
    beforeClose: function() {
        return true; 
        return false; 
    }
});

StoichiometryModal.setContent(document.getElementById('StoichiometryContent').innerHTML);

var Stoichiometry = { 
    equation: null,
    reactant: null,
    reactantnumber: null, //number to track place in array
    product: null,
    productnumber: null, //number to track place in array
    mass: null,
    moles: null,
    question: null,
    answer: null,
    correct: null,
    scorearray: null,

Initiate: function(){
    for(i = 1; i <=4;i++){
        choice = document.getElementById([i,"_4"].join(""))
        choice.style.background = "#134a7b"
    }

    this.scorearray = []
    this.HideNextButton()
    this.HideSolution()


    IncorrectMessage = document.getElementById("IncorrectMessage_4")
    CorrectMessage = document.getElementById("CorrectMessage_4")
    CorrectMessage.style.display = "none"
    IncorrectMessage.style.display = "none"

    StoichiometryModal.open()
    this.genQuestion()
    this.randomiseChoices()
    document.getElementById('StoichiometryQuestions').innerHTML = this.question;
      
},

round: function(num,dp){
    return(Math.round(num * Math.pow(10,dp))/Math.pow(10,dp))

},

chooseReactant: function(){
	if(Math.random() < 0.5){
		this.reactant = this.equation[ ["reactant", String(1)].join("") ]
        this.reactantnumber = 1
	}else{
		this.reactant = this.equation[ ["reactant", String(2)].join("") ]
        this.reactantnumber = 2
	}


},

chooseProduct: function(){
	if(Math.random() < 0.5){
		this.product = this.equation[ ["product", String(1)].join("") ]
        this.productnumber = 1
	}else{
		this.product = this.equation[ ["product", String(2)].join("") ]
        this.productnumber = 2

	}
},

strip1: function(x){ //removes coefficients if they are 1s
    if(x == 1){
        return("")
    }
    else{
        return(x)
    }
},

subscriptter: function(x){ //subscripts any non coefficient numbers
    array = x.split("")
    for(i = 0; i <= array.length; i++){
        if(!isNaN(parseInt(array[i]))) {
            array[i] = String(array[i]).sub()
            }
        }
    return(array.join(""))
},

genQuestion: function(){
    this.equation = commonequations[Math.floor((Math.random() * commonequations.length))]  
    this.mass = Math.floor(Math.random() * 100) + 1
    this.chooseReactant()
    this.chooseProduct()


    if(this.reactantnumber == 1){
    	this.question = "Assuming " + this.subscriptter(this.equation[ ["reactant", String(2)].join("") ]) + " in excess. How much " + this.subscriptter(this.product) + " would be produced given " + this.mass + " grams of " + this.subscriptter(this.reactant) + "<br>" + this.strip1(this.equation["R1"]) + this.subscriptter(this.equation["reactant1"]) + " + " + this.strip1(this.equation["R2"]) + this.subscriptter(this.equation["reactant2"]) + " -> " + this.strip1(this.equation["P1"]) + this.subscriptter(this.equation["product1"]) + " + " + this.strip1(this.equation["P2"]) + this.subscriptter(this.equation["product2"])
    } else{
    	this.question = "Assuming " + this.subscriptter(this.equation[ ["reactant", String(1)].join("") ]) + " in excess. How much " + this.subscriptter(this.product) + " would be produced given " + this.mass + " grams of " + this.subscriptter(this.reactant) + "<br>" + this.strip1(this.equation["R1"]) + this.subscriptter(this.equation["reactant1"]) + " + " + this.strip1(this.equation["R2"]) + this.subscriptter(this.equation["reactant2"]) + " -> " + this.strip1(this.equation["P1"]) + this.subscriptter(this.equation["product1"]) + " + " + this.strip1(this.equation["P2"]) + this.subscriptter(this.equation["product2"])
    }

    this.genAnswer()


},

genAnswer: function(){
    if(this.reactantnumber == 1){
        this.molesofreactant = this.mass / this.equation[ ["RMM", String(1)].join("") ] // determine moles of reactant
        this.molesofreactant = this.round(this.molesofreactant,2)
        this.molesofproduct = (this.molesofreactant / this.equation[ ["R", String(1)].join("") ]) * this.equation[ ["P", String(this.productnumber)].join("") ] // determine moles of product formed
        this.molesofproduct = this.round(this.molesofproduct,2)
        this.massofproduct = this.molesofproduct * this.equation[ ["PMM", String(this.productnumber)].join("") ] 
        this.massofproduct = this.round(this.massofproduct,2)
        this.answer = this.round(this.massofproduct,2)

    }

    if(this.reactantnumber == 2){
        this.molesofreactant = this.mass / this.equation[ ["RMM", String(2)].join("") ] // determine moles of reactant
        this.molesofreactant = this.round(this.molesofreactant,2)
        this.molesofproduct = (this.molesofreactant / this.equation[ ["R", String(2)].join("") ]) * this.equation[ ["P", String(this.productnumber)].join("") ] // determine moles of product formed
        this.molesofproduct = this.round(this.molesofproduct,2)
        this.massofproduct = this.molesofproduct * this.equation[ ["PMM", String(this.productnumber)].join("") ] 
        this.massofproduct = this.round(this.massofproduct,2)
        this.answer = this.round(this.massofproduct,2)
        }
},


randomiseChoices: function(){ //randomises the multiple choices
    this.correct = Math.floor((Math.random() * 4) + 1);
    document.getElementById([this.correct,"_4"].join("")).innerHTML = this.answer + " grams";
    for (i = 1; i <= 4; i++) {
        if (i == this.correct) { continue; }
        randomNumber = Math.random() * (1.1*this.answer - 0.9*this.answer) + 0.9*this.answer  
        document.getElementById([i,"_4"].join("")).innerHTML = (Math.round(randomNumber * 100) / 100)  + " grams";
    }
},

StoichiometryStep1: function(){ // generates solution step 1
    HTMLElement = document.getElementById("Solution1_4")
    if(this.reactantnumber == 1){
    solution = "First determine the moles of the reactant you are given by dividing the mass by the molar mass of the substance:" + "<br>" + this.mass + " g " + " ÷ " + this.equation[ ["RMM", String(1)].join("") ] + " g/mol" + " = " + this.molesofreactant + " mols"
    }else{
    solution = "First determine the moles of the reactant you are given by dividing the mass by the molar mass of the substance:" + "<br>" + this.mass + " g " + " ÷ " + this.equation[ ["RMM", String(2)].join("") ] + " g/mol" + " = " + this.molesofreactant + " mols"
    }

    HTMLElement.style.display = "block";
    document.getElementById("Solution1_4").innerHTML = solution

    HTMLElement2 = document.getElementById("Next1_4")
    HTMLElement2.style.display = "block"
},

StoichiometryStep2: function(){ // generates solution step 1
    HTMLElement = document.getElementById("Solution2_4")
    if(this.reactantnumber == 1){
    solution = "Then use the mole ratio given by the equation to determine moles of products formed: " + "<br>" + this.molesofreactant + " mols * " + this.equation[ ["P", String(this.productnumber)].join("") ] + " / " + String(this.equation["R1"]) + " = " + String(this.molesofproduct) + " mols"
    }else{
    solution = "Then use the mole ratio given by the equation to determine moles of products formed: " + "<br>" + this.molesofreactant + " mols * " + this.equation[ ["P", String(this.productnumber)].join("") ] + " / " + String(this.equation["R2"]) + " = " + String(this.molesofproduct) + " mols"
    }

    HTMLElement.style.display = "block";
    document.getElementById("Solution2_4").innerHTML = solution

    HTMLElement2 = document.getElementById("Next2_4")
    HTMLElement2.style.display = "block"
},

StoichiometryStep3: function(){ // generates solution step 1
    HTMLElement = document.getElementById("Solution3_4")
    solution = "Then multiply the number of moles by the molar mass of the product to determine mass of products formed:" + "<br>" + this.molesofproduct +  " mols * " + this.equation[ ["PMM", String(this.productnumber)].join("")]  + " g/mol = " + this.massofproduct + " g "

    HTMLElement.style.display = "block";
    document.getElementById("Solution3_4").innerHTML = solution

    HTMLElement2 = document.getElementById("Next3_4")
    HTMLElement2.style.display = "block"
},

chooseAnswer: function(Choice){ //marks the choice selected by user
    IncorrectMessage = document.getElementById("IncorrectMessage_4")
    CorrectMessage = document.getElementById("CorrectMessage_4")

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
	    setTimeout("Stoichiometry.Initiate()", 1250)
	    this.ScoreUpdate()
}
},

ChangeWrongColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_4"].join(""))
    choice.style.background = "red"

},

ChangeRightColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_4"].join(""))
    choice.style.background = "green"
},

HideNextButton: function(){
    for(i = 1; i <=3;i++){
        Next = document.getElementById(["Next",i,"_4"].join(""))
        Next.style.display = "none"
    }
},

HideSolution: function(){
    for(i = 1; i <=3;i++){
        Step = document.getElementById(["Solution",i,"_4"].join(""))
        Step.style.display = "none"
    }

},

ScoreInitialise: function(){
    correct = localStorage.getItem("Correct_4");
    answered = localStorage.getItem("Answered_4");
    incorrect = localStorage.getItem("Incorrect_4")
    if(correct == null || answered == null){
        localStorage.setItem("Correct_4", 0);
        localStorage.setItem("Answered_4", 0)
        localStorage.setItem("Incorrect_4", 0)
    }
},

ScoreCounter: function(x){
    this.scorearray.push(x)
},

ScoreUpdate: function(){
    if(this.scorearray[0] === "correct"){
        correct = parseInt(localStorage.getItem("Correct_4"));
        correct += 1
        localStorage.setItem("Correct_4", correct)
    }

    if(this.scorearray[0] === "incorrect"){
        incorrect = parseInt(localStorage.getItem("Incorrect_4"));
        incorrect += 1
        localStorage.setItem("Incorrect_4", incorrect)
    }

    answered = parseInt(localStorage.getItem("Answered_4"))
    answered += 1
    localStorage.setItem("Answered_4", answered)

    this.ScoreDisplay()

},

ScoreDisplay: function(){
    document.getElementById("StoichiometryAnswered").innerHTML = localStorage.getItem("Answered_4") + " questions answered"
    document.getElementById("StoichiometryCorrect").innerHTML = localStorage.getItem("Correct_4") + " questions correct"
    document.getElementById("StoichiometryIncorrect").innerHTML = localStorage.getItem("Incorrect_4") + " questions incorrect"
    if(localStorage.getItem("Answered_4") != 0){
        document.getElementById("StoichiometryPercentage").innerHTML = Math.round( localStorage.getItem("Correct_4") / localStorage.getItem("Answered_4") * 100 ) + "% correct answers"
    }else{
        document.getElementById("StoichiometryPercentage").innerHTML = "No attempts yet"
    }

}
}

Stoichiometry.ScoreInitialise()
Stoichiometry.ScoreDisplay()


























