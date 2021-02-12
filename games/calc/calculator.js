var acc=0;

function prendre_val(valeur)
{
    acc = document.calc.affi.value+= valeur; //accumule les valeur (string) du doc dans un acc
}

function rez()
{
    document.calc.affi.value=eval(acc); // eval étant risqué je l'utilise en étant conscient de ses risques, il convertit les valeurs string en maths
}

function delete_aff()
{
    document.calc.affi.value="";
} 