//Mode nuit annulé car inutile, fonctionnel sur une partie du site.

var nuit = document.querySelector(".night");
var icon = document.querySelector(".buttonNight")


nuit.addEventListener("click", function (event) {
    if(icon.classList.contains('fa-moon')){
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        document.querySelector('.fond').style.backgroundColor = "black";
        sessionStorage.setItem("nuit", false);
    }
    else if(icon.classList.contains('fa-sun')){
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        document.querySelector('.fond').style.backgroundColor = "#E7E6E3";
        sessionStorage.setItem("nuit", true);
    }
    console.log(sessionStorage.getItem("nuit"));
});
