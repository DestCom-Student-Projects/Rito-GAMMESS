//Initialisation des variable
var couleur = document.querySelector("#choixCouleur");
var bloc = document.querySelectorAll(".carre");
var efface = document.querySelector("#effacer");
var gomme = document.querySelector("#gomme");
var retrieveColor = document.querySelector("#pipette");
var cursorChange = document.querySelector(".gameBox");


var utilCouleur = "#FFFFFF";
var pip = false;
var gommer = false;

//Fonction convertissant le rgb en hexadecimal provenant de https://css-tricks.com/converting-color-spaces-in-javascript/
function hex(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";

    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
        g = (+rgb[1]).toString(16),
        b = (+rgb[2]).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return "#" + r + g + b;
}

//fonction qui change la couleur du bloc cliqué
function chanCol(col, numBloc) {
    bloc[numBloc].style.backgroundColor = col;
};


//fonction qui recupere la couleur du bloc cliqué et met a jour le nuancier de couleur
function recupCol(i) {
    var recupColor = bloc[i].style.backgroundColor;
    utilCouleur = hex(recupColor);
    document.getElementById("choixCouleur").value = utilCouleur;
    return utilCouleur;

}

//evenement utilisateur qui recupere la modification du nuancier de couleur
couleur.addEventListener("change", function (event) {
    utilCouleur = event.target.value;
});

//evenement utilisateur qui efface toute les case en les remettant a zéro
efface.addEventListener("click", function (event) {
    event.preventDefault();
    bloc.forEach((carre, numBloc) => {
        bloc[numBloc].style.backgroundColor = "#FFFFFF";
    });
});

//evenement utilisateur qui change le style du curseur et recupere la couleur d'une case déja posée et annule un bouton precedemment cliqué.
pipette.addEventListener("click", function (event) {
    event.preventDefault();
    cursorChange.style.cursor = "crosshair";
    gommer = false;
    pip = true;
});

//evenement utilisateur qui change le style du curseur et previens du choix d'effacer une unique case et annule un bouton precedemment cliqué.
gomme.addEventListener("click", function (event) {
    event.preventDefault();
    cursorChange.style.cursor = "crosshair";
    pip = false;
    gommer = true;
});

//Parcours du tableaux afin de crée une zone cliquable carée par carée
bloc.forEach((carre, numBloc) => {
    bloc[numBloc].addEventListener("click", function (event) {
        if ((!pip) && (!gommer)) { //Si aucun choix n'a précedemment ete fait, changer la couleur de la case
            event.stopPropagation();
            chanCol(utilCouleur, numBloc);
        } else if (pip) { //Si pipette a ete selectionée
            event.stopPropagation(); //annule le comportement du bouton 
            utilCouleur = recupCol(numBloc); //Retrouve la valeure hexadecimale de la case
            chanCol(utilCouleur, numBloc);
            cursorChange.style.cursor = "auto"; //remet le curseur a la normale
            pip = false; //deselectionne le choix
        } else if (gommer) {
            chanCol('#FFFFFF', numBloc); //Remet la case en blanc
            cursorChange.style.cursor = "auto"; //remet le curseur a la normale
            gommer = false; //deselectionne le choix
        }
    });

});
