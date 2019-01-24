// Atomic Mass Modal
var pHModal = new tingle.modal({
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
        pH.scorearray = [];
    },
    beforeClose: function() {
        return true; 
        return false; 
    }
});

pHModal.setContent(document.getElementById('pHContent').innerHTML); //setting the content of the modal 

var pH ={
    acidvolume: null,
    acidconcentration: null,
    acidmols: null,
    basevolume: null,
    baseconcentration: null,
    basemols: null,
    remainingmols: null,
    answer: null,
    pH: null,
    pOH: null,


Initiate: function(){ // function for starting the modal as well as moving to next question
    for(i = 1; i <=4;i++){
        choice = document.getElementById([i,"_6"].join(""))
        choice.style.background = "#134a7b"
    }

    this.scorearray = []
    this.HideNextButton()
    this.HideSolution()

    IncorrectMessage = document.getElementById("IncorrectMessage_6")
    CorrectMessage = document.getElementById("CorrectMessage_6")
    CorrectMessage.style.display = "none"
    IncorrectMessage.style.display = "none"

    pHModal.open()
    this.genQuestion()
    this.randomiseChoices()
    document.getElementById('pHQuestions').innerHTML = this.question;
},

round: function(num,dp){
    return(Math.round(num * Math.pow(10,dp))/Math.pow(10,dp))

},

genQuestion: function(){  //generate questions (Math.round(this.answer3 * 100) / 100)
    this.acidvolume = Math.floor(Math.random() * 50 + 20) //volume in mL
    this.acidconcentration = this.round(Math.random(), 2) // concentration in mol/L
    this.basevolume = Math.floor(Math.random() * 50 + 20)
    this.baseconcentration = this.round(Math.random(), 2)

    this.acidmols = this.round(this.acidvolume/1000 * this.acidconcentration, 4)
    console.log(this.acidmols)
    this.basemols = this.round(this.basevolume/1000 * this.baseconcentration, 4)
    console.log(this.basemols)

    this.genAnswer()

},

genAnswer: function(){
    if(this.acidmols > this.basemols){
        this.remainingmols = this.round(this.acidmols - this.basemols,4)
        console.log("Remaining moles:", this.remainingmols)
        this.pH = -Math.log( this.remainingmols / (this.acidvolume/1000 + this.basevolume/1000)) / Math.log(10)
        this.pH = this.round(this.pH, 2)
        this.answer = this.pH
    }

    if(this.basemols > this.acidmols){
        this.remainingmols = this.round(this.basemols - this.acidmols,4)
        console.log("Remaining moles:", this.remainingmols)
        this.pOH = -Math.log( this.remainingmols / (this.acidvolume/1000 + this.basevolume/1000)) / Math.log(10)
        this.answer = this.round(14 - this.pOH, 2)
    }

    this.question = this.acidvolume + " mL of " + this.acidconcentration + " mol/L HCl is mixed with " + this.basevolume + " mL of " + this.baseconcentration + " mol/L NaOH. What is the resulting pH? "   
},

randomiseChoices: function(){ //randomises the multiple choices
    this.correct = Math.floor((Math.random() * 4) + 1);
    document.getElementById([this.correct,"_6"].join("")).innerHTML = this.answer;
    for (i = 1; i <= 4; i++) {
        if (i == this.correct) { continue; }
        randomNumber = Math.floor(Math.random() * 1400 + 1)/100
        document.getElementById([i,"_6"].join("")).innerHTML = (Math.round(randomNumber * 100) / 100);
    }
},

chooseAnswer: function(Choice){ //marks the choice selected by user
    IncorrectMessage = document.getElementById("IncorrectMessage_6")
    CorrectMessage = document.getElementById("CorrectMessage_6")

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
        this.HideNextButton()
        this.HideSolution()
        this.ScoreCounter("correct")
        setTimeout("pH.Initiate()", 1250)
        this.ScoreUpdate()
}

},

pHStep1: function(){ // generates solution step 1
    HTMLElement = document.getElementById("Solution1_6")
    solution = "Equation: HCl + NaOH -> H2O + NaCL" + "<br>" + "Determine the substance in excess after neutrilisation by calculating moles by multiplying volume with concentration"
    HTMLElement.style.display = "block";
    document.getElementById("Solution1_6").innerHTML = solution

    HTMLElement2 = document.getElementById("Next1_6")
    HTMLElement2.style.display = "block"
},

pHStep2: function(){ // generates solution step 1
    HTMLElement = document.getElementById("Solution2_6")
    solution = "Moles of HCl: " + this.round(this.acidvolume/1000, 4) + "L * " + this.acidconcentration + " mol/L = " + this.acidmols + " mol" + "<br>" + "Moles of NaOH: " + this.round(this.basevolume/1000,4) + "L * " + this.baseconcentration + " mol/L = " + this.basemols + " mol"
    HTMLElement.style.display = "block";
    document.getElementById("Solution2_6").innerHTML = solution

    HTMLElement2 = document.getElementById("Next2_6")
    HTMLElement2.style.display = "block"
},

pHStep3: function(){
    HTMLElement = document.getElementById("Solution3_6")
    if(this.acidmols > this.basemols ){
            solution = "Determine remaining moles after neutrilisation: " + this.acidmols + " - " + this.basemols + " = " + this.remainingmols + "<br>" + "Then divide this by total volume to get molarity: " + "0.00" + this.remainingmols + " / ( " + String(this.acidvolume) + " + " + "0.00" + String(this.basevolume) + " ) = " + this.round(this.remainingmols / (this.acidvolume/1000 + this.basevolume/1000),4)

    }

    if(this.basemols > this.acidmols ){
            solution = "Determine remaining moles after neutrilisation: " + this.basemols + " - " + this.acidmols + " = " + this.remainingmols + "<br>" + "Then divide this by total volume to get molarity: " + "0.00" + this.remainingmols + " / ( " + String(this.acidvolume/1000) + " + " + "0.00" + String(this.basevolume/1000) + " ) = " + this.round(this.remainingmols / (this.acidvolume/1000 + this.basevolume/1000),4)

    }

    HTMLElement.style.display = "block";
    document.getElementById("Solution3_6").innerHTML = solution

    HTMLElement2 = document.getElementById("Next3_6")
    HTMLElement2.style.display = "block"



},

pHStep4: function(){
    HTMLElement = document.getElementById("Solution4_6")
    if(this.acidmols > this.basemols ){
           solution = "Then determine pH by taking -log[H+]: -log[ " + this.round(this.remainingmols / (this.acidvolume/1000 + this.basevolume/1000),4) + "]" + " = " + this.answer

    }

    if(this.basemols > this.acidmols ){
            solution = "Then determine pOH by taking -log[OH-]: -log[ " + this.round(this.remainingmols / (this.acidvolume/1000 + this.basevolume/1000),4) + "]" + " = " + this.round(-Math.log( this.remainingmols / (this.acidvolume/1000 + this.basevolume/100)) / Math.log(10),4) + "<br>" + "Then use pH = 14 - pOH to find pH: " + " 14 - " + this.round(-Math.log( this.remainingmols / (this.acidvolume/1000 + this.basevolume/100)) / Math.log(10),4) + " = " + this.answer

    }

    HTMLElement.style.display = "block";
    document.getElementById("Solution4_6").innerHTML = solution

    HTMLElement2 = document.getElementById("Next4_6")
    HTMLElement2.style.display = "block"

},


ChangeWrongColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_6"].join(""))
    choice.style.background = "red"

},

ChangeRightColor: function(x){ // changes multiple choice buttons depending if correct or not upon user seelction
    choice = document.getElementById([x,"_6"].join(""))
    choice.style.background = "green"
},


HideNextButton: function(){
    for(i = 1; i <=4;i++){
        Next = document.getElementById(["Next",i,"_6"].join(""))
        Next.style.display = "none"
    }
},

HideSolution: function(){
    for(i = 1; i <=4;i++){
        Step = document.getElementById(["Solution",i,"_6"].join(""))
        Step.style.display = "none"
    }

},

ScoreInitialise: function(){
    correct = localStorage.getItem("Correct_6");
    answered = localStorage.getItem("Answered_6");
    incorrect = localStorage.getItem("Incorrect_6")
    if(correct == null || answered == null){
        localStorage.setItem("Correct_6", 0);
        localStorage.setItem("Answered_6", 0)
        localStorage.setItem("Incorrect_6", 0)
    }
},

ScoreCounter: function(x){
    this.scorearray.push(x)
    console.log(this.scorearray)
},

ScoreUpdate: function(){
    if(this.scorearray[0] === "correct"){
        correct = parseInt(localStorage.getItem("Correct_6"));
        correct += 1
        localStorage.setItem("Correct_6", correct)
    }

    if(this.scorearray[0] === "incorrect"){
        incorrect = parseInt(localStorage.getItem("Incorrect_6"));
        incorrect += 1
        localStorage.setItem("Incorrect_6", incorrect)
    }

    answered = parseInt(localStorage.getItem("Answered_6"))
    answered += 1
    localStorage.setItem("Answered_6", answered)

    this.ScoreDisplay()

},

ScoreDisplay: function(){
    document.getElementById("pHAnswered").innerHTML = localStorage.getItem("Answered_6") + " questions answered"
    document.getElementById("pHCorrect").innerHTML = localStorage.getItem("Correct_6") + " questions correct"
    document.getElementById("pHIncorrect").innerHTML = localStorage.getItem("Incorrect_6") + " questions incorrect"
    if(localStorage.getItem("Answered_6") != 0){
        document.getElementById("pHPercentage").innerHTML = Math.round( localStorage.getItem("Correct_6") / localStorage.getItem("Answered_6") * 100 ) + "% correct answers"
    }else{
        document.getElementById("pHPercentage").innerHTML = "No attempts yet"
    }
}

}

pH.ScoreInitialise()
pH.ScoreDisplay()