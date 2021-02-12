var pierre = 0;
var feuille = 1;
var ciseau = 2;

var J2 = 0;

var bouton1 = document.querySelector(".bouton1"); //bouton : pierre
var bouton2 = document.querySelector(".bouton2"); //bouton : feuille
var bouton3 = document.querySelector(".bouton3"); //bouton : ciseaux
var afficher = document.querySelector("#affiche");
var rock = document.querySelector(".pierre");
var paper = document.querySelector(".paper");
var scissors = document.querySelector(".knife");

function removeProp() { //fonction pour faire apparaitre le choix du bot
    rock.classList.add("hidden");
    paper.classList.add("hidden");
    scissors.classList.add("hidden");
}

function displayProp(prop) {
    if (prop == 0) {
        rock.classList.remove("hidden");
    } else if (prop == 1) {
        paper.classList.remove("hidden");
    } else if (prop == 2) {
        scissors.classList.remove("hidden");
    }
}

function sound1() { //fonction son quand on clique sur les symbôles
    var bruit1 = new Audio("bling.mp3");
    bruit1.play();
}

function sound2() {
    var bruit2 = new Audio("cut3.mp3");
    bruit2.play();
}

function sound3() {
    var bruit3 = new Audio("cut2.mp3");
    bruit3.play();
}

bouton1.addEventListener("click", function (event) { //bouton pierre
    removeProp();
    sound1();
    var J1 = Math.floor(Math.random() * 3);
    afficher.innerHTML = J1;
    console.log(J1);
    J2 = 0; //assimilation au bouton pierre
    displayProp(J1);
    if (J1 === 2) {
        afficher.innerHTML = "Bravo tu as gagné !";
    } else if (J1 === 1) {
        afficher.innerHTML = "Dommage, réessaye !";
    } else if (J1 === 0) {
        afficher.innerHTML = "Match nul !";
    }

});

bouton2.addEventListener("click", function (event) { //bouton feuille
    removeProp();
    sound2();
    var J1 = Math.floor(Math.random() * 3);
    afficher.innerHTML = J1;
    console.log(J1);
    J2 = 1; //assimiliation au bouton feuille
    displayProp(J1);
    if (J1 === 0) {
        afficher.innerHTML = "Bravo, tu as gagné !";
    } else if (J1 === 2) {
        afficher.innerHTML = "Dommage, réessaye !";
    } else if (J1 === 1) {
        afficher.innerHTML = "Match nul !";
    }

});

bouton3.addEventListener("click", function (event) { //bouton ciseaux
    removeProp();
    sound3();
    var J1 = Math.floor(Math.random() * 3);
    afficher.innerHTML = J1;
    console.log(J1);
    J2 = 2; //assimilation au bouton ciseaux
    displayProp(J1);
    if (J1 === 1) {
        3
        afficher.innerHTML = "Bravo, tu as gagné !";
    } else if (J1 === 0) {
        afficher.innerHTML = "Dommage, réessaye !";
    } else if (J1 === 2) {
        afficher.innerHTML = "Match nul !";
    }

});
