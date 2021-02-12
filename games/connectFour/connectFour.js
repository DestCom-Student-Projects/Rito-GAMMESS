//Jeu par ADS Antoine

// Initialisations des variables.
// Sélection des balises du DOM.
var puissanceQuatre = document.querySelector("#puissance4");
var bloc = document.querySelectorAll(".case");
var lancement = document.querySelector("#launch");
var intera = document.querySelector(".infosUtilisateurs");


let grid = new Array(); //Création du tableau.
let player = 0; //Initialisation de la valeur de roulement de tours.
let matchnul = ""; //Initialisation de la valeur en cas de matchs nuls.


//Création de la zone de jeu.
function creationGrille() {
    for (let x = 0; x < 6; x++) {
        grid[x] = new Array();
        for (let y = 0; y < 7; y++) {
            let creeDiv = document.createElement('div'); //Création du tableau.
            creeDiv.classList.toggle("x" + x + "y" + y); //Ajout d'une classe detectant les case indépendament les unes des autres.
            creeDiv.classList.toggle("case"); //Ajout de la classe de style.
            creeDiv.style.backgroundColor = "#FFFFFF"; //Assignation d'un fond blanc sur les case de la grille.
            puissanceQuatre.appendChild(creeDiv); //Ajout de la balise au DOM.
            grid[x][y] = 0; //Indique la valeur neutre des positions.
        }
    }
}

//Création des intéractions avec l'utilisateur.
function clickActivation() {
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 7; y++) {
            let bloc = document.querySelector(".x" + x + "y" + y);
            bloc.addEventListener('click', function (e) {
                addJeton(player, x, y, bloc);
            });

        };
    };
}

//Verification de la présence d'un coup gagnant.
function verificationPuiQuatre(i, j, plr) {

    //Designe quel joueur pose son jeton.
    if ((plr % 2) == 0) {
        plr = 2;
    } else {
        plr = 1;
    }

    //Initialisation des valeurs.
    let ligne = 0;
    let colonne = 0;
    let diag = 0;
    let diagInv = 0;
    let d = -Math.min(i, j);
    let a = -Math.min(i, 6 - j);
    let h = 5;
    let v = 6;

    // Vérification horizontale.
    while (h > -1) { //verification de la colonne du dernier jeton posé.
        if (grid[h][j] == plr) {
            colonne++; //Si ca correspond a "l'ID" du joueur, cela compte une série correcte sur la hauteur.
            h--; //Puis progresse pour vérifier la case du dessus.
        } else if ((grid[h][j] != plr) && (colonne == 4)) {
            h--; //Si on a bien une suite de 4, fini la boucle.
        } else {
            colonne = 0; //Si une seule piece du joueur est détecté, remise a zéro du compteur de la puissance pour la colonne.
            h--;
        }
    }

    // Vérification verticale
    while (v > -1) { //verification de la ligne du dernier jeton posé.
        if (grid[i][v] == plr) {
            ligne++; //Si ca correspond a "l'ID" du joueur, cela compte une série correcte sur la ligne.
            v--; //Puis progresse pour vérifier la case a gauche.
        } else if ((grid[i][v] != plr) && (ligne == 4)) {
            v--; //Si on a bien une suite de 4, fini la boucle.
        } else {
            ligne = 0; //Si une seule piece du joueur est détecté, remise a zéro du compteur de la puissance pour la ligne.
            v--;
        }
    }

    // Vérification diagonale
    while ((i + d < 6) && (j + d < 7) && (i + d >= 0) && (j + d >= 0)) { //Verifie qu'une ligne de 4 est possible sur la diagonale.
        if (grid[i + d][j + d] == plr) {
            diag++; //Si ca correspond a "l'ID" du joueur, cela compte une série correcte sur la diagonale.
            d++; //Puis progresse pour vérifier la case en ligne + 1 et colonne +1.
        } else if (grid[i + d][j + d] !== plr && diag == 4) {
            d++; //Si on a bien une suite de 4, fini la boucle.
        } else {
            diag = 0; //Si une seule piece du joueur est détecté, remise a zéro du compteur de la puissance pour la diagonale.
            d++;
        };
    };

    // Vérification diagonale inverse.
    while ((i + a < 6) && (j - a < 7) && (i + a >= 0) && (j - a >= 0)) { //Verifie qu'une ligne de 4 est possible sur la diagonale inversee.
        if (grid[i + a][j - a] == plr) {
            diagInv++; //Si ca correspond a "l'ID" du joueur, cela compte une série correcte sur la diagonale inverse.
            a++; //Puis progresse pour vérifier la case en ligne + 1 et colonne -1.
        } else if (grid[i + a][j - a] !== plr && diagInv == 4) {
            a++; //Si on a bien une suite de 4, fini la boucle.
        } else {
            diagInv = 0; //Si une seule piece du joueur est détecté, remise a zéro du compteur de la puissance pour la diagonale inverse.
            a++;
        };
    };

    // Affichage Résultat.
    if (ligne >= 4 || colonne >= 4 || diag >= 4 || diagInv >= 4) {
        return plr; //Si un seul compteur de vérification est vrai sortir de la fonction en retournant "l'id" du joueur.
    };

    //Verifie si chaque case du tableau a une piece posée en le parcourant.
    let cmptdeGrid = 0;
    for (let e = 0; e < 6; e++) {
        for (let f = 0; f < 7; f++) {
            if ((grid[e][f] == 1) || (grid[e][f] == 2)) {
                cmptdeGrid++; //si c'est le cas ajouter +1.
            }
            if (cmptdeGrid == 41) {
                matchnul = "yes"; //si le compteur de match nul est egal a 41 (valeur totale de case sur une grille de puissance 4), assigner yes a la variable match nul.
            }
        };

    };

    return 250; //Si la fonction n'as rien détecté renvoyer une valeur haute n'ayant aucune signification et aucun impact dans le code.

};


//Fonction gérant les tours des joueurs et de savoir si quelqun a gagner
function changementJoueur(joueur, x, y, bloc) {
    if ((joueur % 2) == 0) { //Si c'est le joueur jaune qui joue
        bloc.style.backgroundColor = '#FFB000'; //Changer le fond de la balise par la couleur du joueur
        grid[x][y] = 2; //Appose "l'id" du joueur jaune dans la position du joueur dans le tableau
        if ((verificationPuiQuatre(x, y, player)) == 2) { //Si la fonction de verification retourne 2 ("l'id" du joueur jaune)
            winner = 2; //Mettre "l'id" du joueur dans la variable winner
            victory = true; //Signifie que le jeu est terminée
            for (let i = 0; i < 6; i++) { //Supprime la possibilité d'intéragir avec le jeu
                for (let j = 0; j < 7; j++) {
                    let caseElt = document.querySelector(".x" + i + "y" + j);
                    caseElt.removeEventListener('click', function (e) {
                        player++;
                        addJeton(player, x, y, bloc);
                    });

                };
            };
            puissanceQuatre.style.display = "none"; //Cache la zone de jeu au joueur
            intera.innerHTML = "Félicitation, Joueur 1(JAUNE)<br/>Tu as gagner !"; //Indique qui a gagner le jeu
        }
    } else if ((joueur % 1) == 0) { //Si c'est le joueur rouge qui joue
        bloc.style.backgroundColor = '#FF0000'; //Changer le fond de la balise par la couleur du joueur
        grid[x][y] = 1; //Appose "l'id" du joueur rouge dans la position du joueur dans le tableau
        if ((verificationPuiQuatre(x, y, player) == 1)) { //Si la fonction de verification retourne 1 ("l'id" du joueur rouge)
            winner = 1; //Mettre "l'id" du joueur dans la variable winner
            victory = true; //Signifie que le jeu est terminée
            for (let i = 0; i < 6; i++) { //Supprime la possibilité d'intéragir avec le jeu
                for (let j = 0; j < 7; j++) {
                    let caseElt = document.querySelector(".x" + i + "y" + j);
                    caseElt.removeEventListener('click', function (e) {
                        player++;
                        addJeton(player, x, y, bloc);
                    });

                };
            };
            puissanceQuatre.style.display = "none"; //Cache la zone de jeu au joueur
            intera.innerHTML = "Félicitation, Joueur 2 (ROUGE)<br/>Tu as gagner !"; //Indique qui a gagner le jeu
        } else if ((matchnul == "yes")) { //Si lors de la vérification d'une puissance un match nul a été detecté
            for (let i = 0; i < 6; i++) { //Supprime la possibilité d'intéragir avec le jeu
                for (let j = 0; j < 7; j++) {
                    let caseElt = document.querySelector(".x" + i + "y" + j);
                    caseElt.removeEventListener('click', function (e) {
                        player++;
                        addJeton(player, x, y, bloc);
                    });

                };
            };
            puissanceQuatre.style.display = "none"; //Cache la zone de jeu au joueur
            intera.innerHTML = "Match NUL"; //Indique qu'il y a eu match nul
        }
    }
}


//Fonction qui verifie si un jeton est posable a l'hauteur cliquée
function addJeton(plr, x, y, bloc) {
    if (recupCol(bloc) == "#ffffff") { //Si le fond est blanc
        if (x < 5) { //Si l'utilisateur a cliqué dans une hauteur comprise entre 0 (le haut de la zone de jeu) et l'avant derniere ligne
            let blocendessous = document.querySelector(".x" + (x + 1) + "y" + y); //Recupere la position de la case en dessous de la case cliquée
            if ((recupCol(blocendessous) == "#ffffff")) { //Si la couleur du bloc en dessous cliquée est blanche
                prevPos = x;
                x = x + 1; //Descendre x d'une case
                addJeton(plr, x, y, blocendessous); //Rappeler la fonction avec les nouvelles coordonées
            } else { //Si la case d'en dessous est colorée 
                changementJoueur(plr, x, y, bloc); //Compter le coup du joueur
                player++; //Changer de joueur
            }
        } else { //Si le joueur est dans la derniere ligne compter le coup
            changementJoueur(plr, x, y, bloc);
            player++;
        }
    }

}


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

//Fonction recuperant la couleur demandee en rgb et la convertissant en hexadecimale
function recupCol(bloc) {
    var recupColor = bloc.style.backgroundColor;
    utilCouleur = hex(recupColor);
    return utilCouleur;

}


//Intéraction avec l'utilisateur pour lancer le jeu
lancement.addEventListener("click", function (e) {
    //Remise a zero des variables
    player = 0;
    matchnul = "none";
    intera.innerHTML = "";
    puissanceQuatre.style.display = ""; //Afficher de nouveau la zone de jeu
    puissanceQuatre.innerHTML = ""; //Vider les resultat d'une precedente partie
    creationGrille();
    clickActivation();
})
