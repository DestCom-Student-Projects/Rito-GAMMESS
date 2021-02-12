// let strict = false;
let Game_won = false;
let start_game = false;
let gamePattern = [];
let Niveau = 0;
let currentStep = 0;
let Timeout;

/* Constantes permettant les interactions avec les différents Boutons et affichage du jeu */
// const B_Strict = document.querySelector("#strict");
const Score_Box = document.querySelector("#Score_Box");
const B_Reset = document.querySelector("#reset");
const B_Start = document.querySelector("#start");
const Color_Buttons = document.querySelectorAll(".bouton_couleur")

// Active le bouton de réinitialisation de séquence par le clic de l'utilisateur
B_Reset.addEventListener('click', (event) => {
        document.querySelector("#Box").innerHTML = "Le PATOCHE"; // Affiche le texte onclick
        ResetGame(); // L'activation lance la fonction de réinitialisation 
});

//Active le bouton d'initialisation de séquence par le clic de l'utilisateur
B_Start.addEventListener('click', (event) => {
        document.querySelector("#Box").innerHTML = "Let's start!";
        StartGame();
});

//La fonction de réinitialisation de séquence
function ResetGame() {
    start_game = false
    Game_won = false;
    gamePattern = [];
    currentStep = 0;
    Niveau = 0;
}

// La fonction qui initialise le début de séquence de jeu
function StartGame() {
    start_game = true;
    Game_won = false;
    gamePattern = [];
    Game_sequence();
}

// Fonction qui permet de lancer la boucle jusqu'à 20 séquences avant la victoire
function Game_sequence() { 
        for (var i = 0; i < 21; i++) {
            let RandNumb = Math.floor(Math.random() * 4); // 1. Permet d'obtenir l'affichage d'un des boutons de couleur de manière aléatoire
            let randColor = Color_Buttons[RandNumb] // 2.
            gamePattern.push(randColor); // "push" la couleur dans le gamePattern de manière aléatoire
        }
        Display_Sequence();
}

// Fonction d'affichage de la séquence et interaction avec le player
function Display_Sequence() {
    for (let i = 0; i <= Niveau; i++){
        setTimeout(function() {
            gamePattern[i].classList.toggle("bouton_actif"); // Utilisation d'un toggle comme d'un interrupteur switch/off

            setTimeout(function() {
                gamePattern[i].classList.toggle("bouton_actif");   
            }, 500) // Temps d'affichage des couleurs

        }, (i + 1) * 1000) // Laps de temps entre chaque temps d'affichage des couleurs dans la séquence
    }
};

    for (let i = 0; i < Color_Buttons.length; i++){ // la liste des couleurs s'incrémente grâce à cette boucle 
        const button = Color_Buttons[i]; 
        button.addEventListener("click", (event) => { // S'active onclick de l'utilisateur
            if (button.id === gamePattern[currentStep].id) { // Si l'ID du bouton est identique à l'ID séquence montrée
                if (currentStep === Niveau ) { //Action de la boucle si la couleur cliquée est identique à celle affichée lors de la séquence du niveau 
                    PlaySoundOui();
                    Niveau++;
                    currentStep = 0;
                    document.querySelector("#Box").innerHTML = "Yep !"; // Permet d'afficher le texte demandé dans la Score_Box
                    Display_Sequence();
                }
                else {
                    currentStep++
        if (Niveau === 20) { // En cas de victoire si le player atteint le maximum de 20 séquences
            PlaySoundWin();
            document.querySelector("#Box").innerHTML = "Winner!";
        }
                }
            }
            else { // Erreur lors du clic utilisateur qui ne correspond pas à la séquence, réinitalisation de la séquence
                PlaySoundNon();
                document.querySelector("#Box").innerHTML = "Nope, start again!";
                start_game = false
                Game_won = false;
                gamePattern = [];
                currentStep = 0;
                Niveau = 0;
            }
            
        });
    }

// Différentes fonctions audio du jeu: correct answer, error, et win
function PlaySoundOui() {
    var Son = new Audio ('LEGG.mp3');
    Son.play();
}

function PlaySoundNon() {
    var Son = new Audio ('SeaDoggo1.mp3');
    Son.play();
}

function PlaySoundWin() {
    var Son = new Audio ('VICTORY.mp3');
    Son.play();
}




