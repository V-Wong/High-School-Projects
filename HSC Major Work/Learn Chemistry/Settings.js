// Atomic Mass Modal
var SettingsModal = new tingle.modal({
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
    },

    beforeClose: function() {
        return true; 
        return false; 
    }
});

SettingsModal.setContent(document.getElementById('SettingsContent').innerHTML)

var Settings = { 
    ResetProgress: function(){
        for(i = 1; i <= 6; i++){
        localStorage.setItem(["Correct_",i].join(""), 0);
        localStorage.setItem(["Incorrect_",i].join(""), 0)
        localStorage.setItem(["Answered_",i].join(""), 0)
        }
    AtomicMass.ScoreDisplay()
    Electrochemistry.ScoreDisplay()
    HalfLife.ScoreDisplay()
    Stoichiometry.ScoreDisplay()
    Energy.ScoreDisplay()
    pH.ScoreDisplay()

    },

    changeFont: function(x){
        if(x == 'Normal'){
            localStorage.setItem("FontSize", "Normal")
        }
        if(x == 'Large'){
            localStorage.setItem("FontSize", "Large")
        }

        this.setFont()

    },

    setFont: function(){
        FontSize = localStorage.getItem("FontSize")

        if (FontSize == "Large"){
            console.log("FontSize")
            var questions = document.getElementsByClassName('Questions');
                for (var i = 0; i < questions.length; i++) {
                    questions[i].style.fontSize = '30px';
                }


            var incorrectmessage = document.getElementsByClassName('IncorrectMessage');
                for (var i = 0; i < incorrectmessage.length; i++) {
                    incorrectmessage[i].style.fontSize = '24px';
                }

            var correctmessage = document.getElementsByClassName('CorrectMessage');
                for (var i = 0; i < correctmessage.length; i++) {
                    correctmessage[i].style.fontSize = '24px';
                }

            var choices = document.getElementsByClassName('choicebutton');
                for (var i = 0; i < choices.length; i++) {
                    choices[i].style.fontSize = '26px';
                }

            var solution = document.getElementsByClassName('Solution');
                for (var i = 0; i < solution.length; i++) {
                    solution[i].style.fontSize = '1.3vw';
                    solution[i].style.height = '5.5vw';
                } 

            var column = document.getElementsByClassName('Column');
                for (var i = 0; i < column.length; i++) {
                    column[i].style.fontSize = '38px';
                } 


            var initiatebutton = document.getElementsByClassName('initiatebutton');
                for (var i = 0; i < initiatebutton.length; i++) {
                    initiatebutton[i].style.fontSize = '40px';
                } 

        }




        if (FontSize == "Normal"){
            var questions = document.getElementsByClassName('Questions');
                for (var i = 0; i < questions.length; i++) {
                    questions[i].style.fontSize = '1.5vw';
                }


            var incorrectmessage = document.getElementsByClassName('IncorrectMessage');
                for (var i = 0; i < incorrectmessage.length; i++) {
                    incorrectmessage[i].style.fontSize = '1.1vw';
                }

            var correctmessage = document.getElementsByClassName('CorrectMessage');
                for (var i = 0; i < correctmessage.length; i++) {
                    correctmessage[i].style.fontSize = '1.1vw';
                }

            var choices = document.getElementsByClassName('choicebutton');
                for (var i = 0; i < choices.length; i++) {
                    choices[i].style.fontSize = '1.1vw';
                }

            var solution = document.getElementsByClassName('Solution');
                for (var i = 0; i < solution.length; i++) {
                    solution[i].style.fontSize = '1.1vw';
                    solution[i].style.height = '4vw';
                } 

            var column = document.getElementsByClassName('Column');
                for (var i = 0; i < column.length; i++) {
                    column[i].style.fontSize = '2vw';
                } 


            var initiatebutton = document.getElementsByClassName('initiatebutton');
                for (var i = 0; i < initiatebutton.length; i++) {
                    initiatebutton[i].style.fontSize = '2.5vw';
                } 





        }

    }
}

Settings.setFont()
