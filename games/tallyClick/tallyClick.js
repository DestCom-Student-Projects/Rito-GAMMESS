//Jeu par ADS Antoine

//Initialisation des variables
var plusOne = document.querySelector(".click");
var RAZ = document.querySelector(".RAZ");
var numberFour = document.querySelector(".caseFour");
var numberThree = document.querySelector(".caseThree");
var numberTwo = document.querySelector(".caseTwo");
var numberOne = document.querySelector(".caseOne");

var increment = 0;
var incrementOne = 0;
var incrementTwo = 0;
var incrementThree = 0;

//Fonction qui joue le "OUI" de didier drogba dans la pub kinder bueno de 2007-2008
function drogba() {
    var didier = new Audio('oui.mp3');
    didier.play();
}

//Si l'utilisateur clique 
plusOne.addEventListener("click", function (event) {
    increment++; //Auguemente les unité de 1

    if (((increment % 10) == 0) && increment != 0) { //Si l'on passe une  dizaine 
        increment = 0; //Remet les unités a 0
        incrementThree++; //Auguemente les dizaine de 1
    }
    if ((incrementThree % 10 == 0) && incrementThree != 0) {
        increment = 0; //Remet les unités a 0
        incrementThree = 0; //Remet les dizaines a 0
        incrementTwo++; //Auguemente les centaines de 1
    }
    if ((incrementTwo % 10 == 0) && incrementTwo != 0) {
        increment = 0; //Remet les unités a 0
        incrementThree = 0; //Remet les dizaines a 0
        incrementTwo = 0; //Remet les centaines a 0
        incrementOne++; //Auguemente les milliers de 1
    }

    if ((incrementOne % 10 == 0) && incrementOne != 0) { //Si l'on dépasse 9999
        drogba(); //Jouer le "OUI" de didier drogba
        increment = 0; //Remet les unités a 0
        incrementThree = 0; //Remet les dizaines a 0
        incrementTwo = 0; //Remet les centaines a 0
        incrementOne = 0; //Remet les milliers a 0
    }

    //Mets a jour l'affichage
    numberOne.innerHTML = incrementOne;
    numberTwo.innerHTML = incrementTwo;
    numberThree.innerHTML = incrementThree;
    numberFour.innerHTML = increment;
});

//Si l'utilisateur remet a zéro son compteur
RAZ.addEventListener("click", function (event) {
    increment = 0; //Remet les unités a 0
    incrementOne = 0; //Remet les milliers a 0
    incrementTwo = 0; //Remet les centaines a 0
    incrementThree = 0; //Remet les dizaines a 0

    //Mets a jour l'affichage
    numberOne.innerHTML = 0;
    numberTwo.innerHTML = 0;
    numberThree.innerHTML = 0;
    numberFour.innerHTML = 0;
});
