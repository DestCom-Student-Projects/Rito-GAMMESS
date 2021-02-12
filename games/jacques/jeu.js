            //Programme réalisé par Stanley Jamais pour le projet de Front End à Hétic (W1)
            //Si jamais le code ne parrait pas clair ou que vous avez du feedback : jamais.stanley@gmail.com
            
            
            
            function fairedeck()
            {
                //creation du deck inspiration de : https://www.thatsoftwaredude.com/content/6196/coding-a-card-deck-in-javascript
                let puissance_carte = ["10","10","10","10","9","8","7","6","5","4","3","2","1"];
                let valeur_carte = ["Roi","Dame","Valet","10","9","8","7","6","5","4","3","2","1"]; //Déf de la valeur de la carte
                let couleur_carte = ["Carreau","Coeur","Pique","Trèfle"]; //def de sa couleur
                let i,j;
                let deck=[]; //creation du deck pour recevoir le couple couleur/valeur

                for(i=0;i<valeur_carte.length;i++)//boucle pour cree toutes les cartes avec les couleurs/valeurs
                {
                    for(j=0;j<couleur_carte.length;j++)
                    {
                        let carte=
                        {
                            couleur:couleur_carte[j],
                            valeur:valeur_carte[i],
                            puissance:puissance_carte[i]
                        }; 
                        deck.push(carte);//ajoute la carte au tab
                    }
                }
                return deck;//retourne le deck dans l'ordre manque plus que le mélange et les règles du jeu de BJ(pas ce que tu crois en blow)
            }
            
            function melange(deck)
            {
                let j=0;//incrementeur de vérité
                let deck_melange=[deck.length];//deck melanger qui doit etre de meme taille que le non melanger
                for(i=0;i<deck.length;i++)
                {
                    deck_melange[i]="";//remplissage de vide pour savoir quand le do while doit y mettre une valeur
                }
                do
                {
                    indice=Math.floor(Math.random() * 100) + 1 //indice allant de 1 a 100 en random
                    if(deck_melange[indice%deck.length]=="") // si la place est libre alors y mettre la carte sinon tour de boucle 
                    {
                        deck_melange[indice%deck.length]=deck[j];
                        j++;
                    }
                }while(deck.length!=j);
                return deck_melange;
            }
            
            var pack=melange(fairedeck());//var global de deck
            var main_joueur=[];//creation des mains des joueur
            var main_croupier=[];

            function afficher_main()//affiche la valeur de la main actuelle
            {   
                document.getElementById("main_j").innerHTML = "Votre main est: " + total;
                document.getElementById("main_c").innerHTML = "La main du croupier est: " + power;
            }

            function jouer()
            {
                main_joueur[0]=pack.shift();//pioche des deux premières cartes
                main_joueur[1]=pack.shift();//pioche des deux premières cartes
                main_croupier[0]=pack.shift();//pioche des deux premières cartes
                main_croupier[1]=pack.shift();//pioche des deux premières cartes
                creation_carte(main_joueur[0],"joueur",0);
                creation_carte(main_joueur[1],"joueur",1);
                creation_carte(main_croupier[0],"croup",0);
                creation_carte(main_croupier[1],"croup",1);
                back_card_c(true);
                leftindeck(pack);
                
                total=puissance_joueur("joueur");
                power=puissance_joueur("croup");
                acc=power;
                power=power-main_croupier[1]["puissance"];
                afficher_main();
                power=acc;
                document.getElementById("title").classList.add("hide");//Changement d'affichage title to board 
                document.getElementById("play").classList.add("hide");
                document.getElementById("box1").classList.remove("hide");
                document.getElementById("box2").classList.remove("hide");
                document.getElementById("box3").classList.remove("hide");
                document.getElementById("left").classList.remove("hide");
                document.getElementById("main_j").classList.remove("hide");
                document.getElementById("main_c").classList.remove("hide");
                document.getElementById("box_c").classList.remove("hide");
                document.getElementById("text_button1").classList.remove("hide");
                document.getElementById("text_button2").classList.remove("hide");
                document.getElementById("trait").classList.remove("hide");
                bjdetector();
            }

            function bjdetector() //              (really ?>(ಠ_ಠ)
            {
                if(main_joueur[0]["puissance"]=="1" && main_joueur[1]["puissance"]=="10" || main_joueur[0]["puissance"]=="10" && main_joueur[1]["puissance"]=="1")
                {
                    total=21
                    afficher_main();
                    ecran_final("BJ_J");
                }
                if(main_croupier[0]["puissance"]=="1" && main_croupier[1]["puissance"]=="10" || main_croupier[0]["puissance"]=="10" && main_croupier[1]["puissance"]=="1")
                {
                    power=21
                    afficher_main();
                    ecran_final("BJ_C");
                    back_card_c(false);
                    
                }
            }


            function leftindeck(deck)//calculateur du nombres de cartes restantes
            {
                let acc=deck.length;
                document.getElementById("left").innerHTML = "Le reste du deck est: " + acc;
            }

            var i=2;//Var index pour la main du joueur à ini a deux car deja deux val dans le array
            var total=0,power=0;//valeur de la main

            function puissance_joueur(val)//Fonction qui prends en entrée un string pour calculer la puissance du joueur souhaiter
            {
                
                
                let n;
                if(val==="joueur")
                {
                    total=0;
                    for(n=0;n!=main_joueur.length;n++)
                    {
                        total=total+parseInt(main_joueur[n]["puissance"]);
                    }
                    return total;
                } 
                else if(val==="croup")
                {
                    power=0;
                    for(n=0;n!=main_croupier.length;n++)
                    {
                        power=power+parseInt(main_croupier[n]["puissance"]);
                    }
                    return power;
                }
            } 

            function pioche()//joueur pioche et si sa main>21 alors il saute
            {
                
                main_joueur[i]=pack.shift();
                creation_carte(main_joueur[i],"joueur",i);
                leftindeck(pack);
                i++;
                total=puissance_joueur("joueur");
                power=puissance_joueur("croup");
                acc=power;
                power=power-main_croupier[1]["puissance"];
                afficher_main();
                power=acc;
                if(total>21)
                {
                    ecran_final("saut_j");//le joueur saute
                }

            }
            
            
            function croup_tour()//le tour du croupier
            {
                let y=2;
                back_card_c(false)
                afficher_main();
                while(power<total)//pioche tant que tu ne bat pas le Joueur
                {
                    power=0;
                    main_croupier[y]=pack.shift();
                    creation_carte(main_croupier[y],"croup",y);
                    leftindeck(pack);
                    y++;
                    power=puissance_joueur("croup");
                    afficher_main();
                }
                //verif de qui gagne
                if (power<total)
                {
                    afficher_main();
                    ecran_final("gagner");
                }
                if (power>21)
                {
                    afficher_main();
                    ecran_final("saut_c");
                }
                if (power===total)
                {
                    afficher_main();
                    ecran_final("egalite");   
                }
                if (power>total && power<=21)
                {
                    afficher_main();
                    ecran_final("perdu")   
                }
                

            }

            function rematch()//Reset des var globales
            {
                pack=melange(fairedeck());
                main_croupier=[];
                main_joueur=[];
                total=0;
                power=0;
                i=2;
                ecran_final("reset");
                jouer();
            }

            
            function ecran_final(value)//Un display qui clear/add un texte selon la situation de la partie du joueur.
            {
                switch (value)
                {
                    case "perdu":
                        document.getElementById("loose").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "egalite":
                        document.getElementById("draw").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "saut_j":
                        document.getElementById("over_j").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "saut_c":
                        document.getElementById("over_c").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "gagner":
                        document.getElementById("win").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "BJ_C":
                        document.getElementById("bj_c").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "BJ_J":
                        document.getElementById("bj_j").classList.remove("hide");
                        document.getElementById("text_button1").classList.add("hide");
                        document.getElementById("text_button2").classList.add("hide");
                        document.getElementById("rematch").classList.remove("hide");
                        break;
                    case "reset"://rematch
                        document.getElementById("loose").classList.add("hide");
                        document.getElementById("win").classList.add("hide");
                        document.getElementById("draw").classList.add("hide");
                        document.getElementById("rematch").classList.add("hide");
                        document.getElementById("over_c").classList.add("hide");
                        document.getElementById("over_j").classList.add("hide");
                        document.getElementById("bj_c").classList.add("hide");
                        document.getElementById("bj_j").classList.add("hide");
                        document.getElementById("carte_c").classList.add("hide");
                        document.getElementById("carte_j").classList.add("hide");
                        document.getElementById("text_button1").classList.remove("hide");
                        document.getElementById("text_button2").classList.remove("hide");
                        document.getElementById("carte_j").classList.remove("hide");
                        document.getElementById("carte_c").classList.remove("hide");
                        suppr_carte();
                        break;

                    default://if error
                        alert("erreur value_ecran_final");
                }
            }//a tester après VU OK 

            function creation_carte(card,joueur,indice)// Moteur de recherche de la carte selon les parametres du dico de la carte 
            {
                if (joueur=="croup")// suite à une idée partagée de Kevin Cruz, je n'ai jamais vu son code cependant.
                {
                    document.getElementById("carte_c").innerHTML += "<img id='carte" + indice + "' src='cartes/" + card["couleur"] + "/" + card["valeur"] + ".png" + "'></img>";
                }
                else if(joueur=="joueur")
                {
                    document.getElementById("carte_j").innerHTML += "<img id='carte" + indice + "' src='cartes/" + card["couleur"] + "/" + card["valeur"] + ".png" + "'></img>";
                }
                
                
            }

            function suppr_carte()//supprime l'excès de carte sur le board
            {
                document.getElementById("carte_j").innerHTML = "";
                document.getElementById("carte_c").innerHTML = "";
                
            }

            function back_card_c(verite)
            {
                if (verite==true)
                {
                    document.getElementById("carte_c").innerHTML += "<img id='retourn' src='cartes/divers/back.png'></img>";
                    document.getElementById("carte1").classList.add("hide"); 
                }  
                else if (verite==false)
                {
                    document.getElementById("carte1").classList.remove("hide"); 
                    document.getElementById("retourn").classList.add("hide"); 
                }  
            }
            