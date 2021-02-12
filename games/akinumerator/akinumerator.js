//Jeu par Verger Eva

var J1 = Math.floor(Math.random() * 101); //On déclare et on initialise une variable aléatoire qui va de 0 à 100
var compteurJ2 = 0;
var afficher = document.querySelector("#affiche");

function manche1() {
    var J2 = document.getElementById("J2").value;
    var verif = true;
    //Répéter la fonction tant que c'est pas gagné
    do {
        if (J1 > J2) {
            afficher.innerHTML = "C'est plus";
            compteurJ2 = compteurJ2 + 1;
            verif = true;

        }

        if (J1 < J2) {
            afficher.innerHTML = "C'est moins";
            compteurJ2 = compteurJ2 + 1;
            verif = true;
        }

        if (J1 == J2) {
            afficher.innerHTML = "C'est gagné, <br> Manche 1 : " + compteurJ2 + " essais";
            manche2();
            verif = true;
        }
    } while (verif == false);


}


var bouton1 = document.getElementById("bouton1"); //bouton : c'est plus
var bouton2 = document.getElementById("bouton2"); //bouton : c'est moins
var bouton3 = document.getElementById("bouton3"); //bouton : c'est gagné
var prop = document.querySelector(".prop");
var ordi = 0;
var compteurordi = 0;
var afficher = document.querySelector("#affiche");


function proposition(max, min) {
    ordi = Math.floor(Math.random() * (max - min)) + min;
    prop.innerHTML = ordi;
}

function manche2() {
    document.querySelector(".manche2").classList.remove("hidden");
    document.querySelector(".manche1").classList.add("hidden");
    var borneSup = 100;
    var borneInf = 0;

    proposition(borneSup, borneInf);
    bouton1.addEventListener("click", function (event) {
        borneInf = ordi;
        proposition(borneSup, ordi);
        compteurordi = compteurordi + 1;
    })
    bouton2.addEventListener("click", function (event) {
        bornSup = ordi;
        proposition(ordi, borneInf);
        compteurordi = compteurordi + 1;
    })
    bouton3.addEventListener("click", function (event) {
        J1 = Math.floor(Math.random() * 101);
        afficher.innerHTML = "C'est gagné, <br> Manche 2 : " + compteurordi + " essais";
        document.querySelector(".manche1").classList.remove("hidden");
        document.querySelector(".manche2").classList.add("hidden");
        if (compteurJ2 > compteurordi) {
            afficher.innerHTML = "Akinumerator a gagné";
        }
        if (compteurordi > compteurJ2) {
            afficher.innerHTML = "Tu as gagné !";
        }
    })

}
