//Fonction tirée de https://gomakethings.com/how-to-create-a-konami-code-easter-egg-with-vanilla-js/
//Dans le but d'ajouter des eastereggs dans le site web

//Modification de la séquence d'activation.
var pattern = ['ArrowLeft', 'ArrowLeft', 'ArrowRight', 'w'];

var current = 0;
var ui = new Audio('wii.mp3');
var waves = new Audio('synthwave.mp3');
var son = document.querySelector(".sounds");

function synth(){
    waves.play();
}

//Fonction activant l'audio caché.
function wii() {
    waves.pause();
    ui.play();
}


document.addEventListener('keydown', function(event){
    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
		current = 0;
		return;
	}

	current++;

	if (pattern.length === current) {
		current = 0;
		wii();
	}
}, false);

son.addEventListener("click", function (event) {
    if(son.classList.contains('fa-volume-mute')){
        son.classList.remove('fa-volume-mute');
        son.classList.add('fa-volume-up');
        ui.pause();
        synth();
    }
    else if(son.classList.contains('fa-volume-up')){
        son.classList.remove('fa-volume-up');
        son.classList.add('fa-volume-mute');
        waves.pause();
    }
});
