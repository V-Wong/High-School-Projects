// Energy Modal
var EnergyModal = new tingle.modal({
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
        Energy.scorearray = []
    },
    beforeClose: function() {
        return true; 
        return false; 
    }
});

EnergyModal.setContent(document.getElementById('EnergyContent').innerHTML);

var Energy = { 
    fuel: null,
    watermass: null,
    tempchange: null,
    question: null,HideNextButton: function(){
    for(i = 1; i <=2;i++){
        Next = document.getElementById(["Next",i,"_1"].join(""))
        Next.style.display = "none"
    }
},
    answer: null,
    correct: null,
    scorearray: [],

Initiate: function(){
    for(i = 1; i <=4;i++){
        choice = document.getElementById([i,"_5"].join(""))
        choice.style.background = "#134a7b"
    }

    this.scorearray = []
    this.HideNextButton()
    this.HideSolution()

    IncorrectMessage = document.getElementById("IncorrectMessage_5")
    CorrectMessage = document.getElementById("CorrectMessage_5")
    CorrectMessage.style.display = "none"
    IncorrectMessage.style.display = "none"





    EnergyModal.open()
    this.genQuestion()
    this.randomiseChoices()
    document.getElementById('EnergyQuestions').innerHTML = this.question;
    

},

genQuestion: function(){
    this.fuel = commonfuels[Math.floor((Math.random() * commonfuels.length))]
    this.watermass = Math.floor((Math.random() * 100) + 1)
    this.tempchange = Math.floor((Math.random() * 30) + 1)
    this.question = "Given " + (this.fuel).name + " has a heat of combustion of " + this.fuel.heat + " kj/mol. What mass is required to heat up " + this.watermass + " L of water " + "by " + this.tempchange + "K?"
    
    this.genAnswer()


},

genAnswer: function(){
    this.answer1 = (4.18 * this.watermass * this.tempchange) // Calculate Q = mCΔT to get kj required
    this.answer2 = this.answer1 / this.fuel.heat // Divide Q by heat of combustion (kj/mol) to get moles required
    this.answer3 = this.answer2 * this.fuel.molarmass // Multiply Q by molar mass to get required mass
    this.answer = (Math.round(this.answer3 * 100) / 100)
},

randomiseChoices: function(){
    this.correct = Math.floor((Math.random() * 4) + 1);
    document.getElementById([this.correct,"_5"].join("")).innerHTML = this.answer + " g";
    for (i = 1; i <= 4; i++) {
        if (i == this.correct) { continue; }
        randomNumber = Math.random() * (1.1*this.answer - 0.9*this.answer) + 0.9*this.answer  
        document.getElementById([i,"_5"].join("")).innerHTML = (Math.round(randomNumber * 100) / 100)  + " g";
    }
},

EnergyStep1: function(){
    HTMLElement = document.getElementById("Solution1_5")
    solution = "Heat of combustion formula: Q = mCΔT"
    HTMLElement.style.display = "block";
    document.getElementById("Solution1_5").innerHTML = solution

    HTMLElement2 = document.getElementById("Next1_5")
    HTMLElement2.style.display = "block"
},

EnergyStep2: function(){
    HTMLElement = document.getElementById("Solution2_5")
    solution = "Water has a heat capacity of 4.18 kj/(g*k). Therefore: Q = " + "4.18 * " + this.watermass + " * " + this.tempchange + " = " + Math.round(this.answer1 * 100) / 100 + "kj"  + "<br> This is the energy required for the desired heating"  
    HTMLElement.style.display = "block";
    document.getElementById("Solution2_5").innerHTML = solution

    HTMLElement2 = document.getElementById("Next2_5")
    HTMLElement2.style.display = "block"
},

EnergyStep3: function(){
    HTMLElement = document.getElementById("Solution3_5")
    solution = "Then divde by the heat of combustion stated in the question to get the moles of fuel required: " + "<br>" +  String(Math.round(4.18*this.watermass*this.tempchange * 100) / 100) + "/ " + this.fuel.heat + " = " + Math.round(this.answer2 * 100) / 100 + " moles"
    HTMLElement.style.display = "block";
    document.getElementById("Solution3_5").innerHTML = solution

    HTMLElement2 = document.getElementById("Next3_5")
    HTMLElement2.style.display = "block"
},

EnergyStep4: function(){
    HTMLElement = document.getElementById("Solution4_5")
    solution = "Then multiply by the atomic mass of the fuel to get mass required:" + "<br>" + String(Math.round(((Math.round(4.18*this.watermass*this.tempchange * 100) / 100) / this.fuel.heat) * 100) / 100) + " * " + this.fuel.molarmass +  " = " + this.answer +  "g" 
    HTMLElement.style.display = "block";
    document.getElementById("Solution4_5").innerHTML = solution

    HTMLElement2 = document.getElementById("Next4_5")
    HTMLElement2.style.display = "block"
},


chooseAnswer: function(Choice){
    IncorrectMessage = document.getElementById("IncorrectMessage_5")
    CorrectMessage = document.getElementById("CorrectMessage_5")

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
        setTimeout("Energy.Initiate()", 1250)
        this.ScoreUpdate()
}
},

ChangeWrongColor: function(x){
    choice = document.getElementById([x,"_5"].join(""))
    choice.style.background = "red"

},

ChangeRightColor: function(x){
    choice = document.getElementById([x,"_5"].join(""))
    choice.style.background = "green"
},

HideNextButton: function(){
    for(i = 1; i <=4;i++){
        Next = document.getElementById(["Next",i,"_5"].join(""))
        Next.style.display = "none"
    }
},

HideSolution: function(){
    for(i = 1; i <=4;i++){
        Step = document.getElementById(["Solution",i,"_5"].join(""))
        Step.style.display = "none"
    }
},


ScoreInitialise: function(){
    correct = localStorage.getItem("Correct_5");
    answered = localStorage.getItem("Answered_5");
    incorrect = localStorage.getItem("Incorrect_5")
    if(correct == null || answered == null){
        localStorage.setItem("Correct_5", 0);
        localStorage.setItem("Answered_5", 0)
        localStorage.setItem("Incorrect_5", 0)
    }
},

ScoreCounter: function(x){
    this.scorearray.push(x)
    console.log(this.scorearray)
},

ScoreUpdate: function(){
    if(this.scorearray[0] === "correct"){
        correct = parseInt(localStorage.getItem("Correct_5"));
        correct += 1
        localStorage.setItem("Correct_5", correct)
    }

    if(this.scorearray[0] === "incorrect"){
        incorrect = parseInt(localStorage.getItem("Incorrect_5"));
        incorrect += 1
        localStorage.setItem("Incorrect_5", incorrect)
    }

    answered = parseInt(localStorage.getItem("Answered_5"))
    answered += 1
    localStorage.setItem("Answered_5", answered)

    this.ScoreDisplay()

},

ScoreDisplay: function(){
    document.getElementById("EnergyAnswered").innerHTML = localStorage.getItem("Answered_5") + " questions answered"
    document.getElementById("EnergyCorrect").innerHTML = localStorage.getItem("Correct_5") + " questions correct"
    document.getElementById("EnergyIncorrect").innerHTML = localStorage.getItem("Incorrect_5") + " questions incorrect"
    if(localStorage.getItem("Answered_5") != 0){
        document.getElementById("EnergyPercentage").innerHTML = Math.round( localStorage.getItem("Correct_5") / localStorage.getItem("Answered_5") * 100 ) + "% correct answers"
    }else{
        document.getElementById("EnergyPercentage").innerHTML = "No attempts yet"
    }
}
}

Energy.ScoreInitialise()
Energy.ScoreDisplay()