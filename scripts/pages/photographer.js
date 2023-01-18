async function eventHandler(event) {

    //retourne les photographes en json
    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        let photographers = [];
        await fetch('./data/photographers.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                photographers = json["photographers"];
            })

        // et bien retourner le tableau photographers seulement une fois

        return photographers;
    }

    //retourne les photo et video en json
    async function getMedia() {
        // Penser à remplacer par les données récupérées dans le json
        let media = [];
        await fetch('./data/photographers.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(json => {
                //console.dir(json);
                media = json["media"];
                //console.log(media);
            })

        // et bien retourner le tableau photographers seulement une fois

        return media;
    }

    //affiche les données
    async function displayData(photographer, media) {

        const photographersHeader = document.querySelector(".photograph-header");
        const photographersMedia = document.querySelector(".photograph-media");
        const score = document.querySelector(".score");

        const section = document.createElement('section');

        //on récupere les elements pour l'affichage du profil du photographe
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        photographersHeader.appendChild(userCardDOM);

        //on affiche tous les media d'un photographe
        media.forEach((media1) => {
            const mediaModel = mediaFactory(media1, photographer['name']);
            const mediaDOM = mediaModel.getMediaDOM();

            section.appendChild(mediaDOM)
            photographersMedia.appendChild(section);
        });

        //on innitialise le score de likes du photographe
        const scoreCardDOM = photographerModel.getScoreCardDOM();
        score.appendChild(scoreCardDOM);

    };

    let media2 = [];
    let photograph;

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        const media = await getMedia();

        //on récupère tous les media d'un photographe
        photographers.forEach((photographer) => {
            let name = photographer['name'].replace(' ', '%20');
            if (location.search == '?' + name) {
                photograph = photographer;
                media.forEach((media1) => {
                    if (media1['photographerId'] == photographer['id']) {
                        media2.push(media1);
                    }
                });
            }
        });

        //l'affichage des données
        await displayData(photograph, media2);

        // initialise la lightbox
        let lightbox = new lightBox(media2);

        //initialise l'envenement d'affichage au click (sur une photo)
        document.querySelectorAll('.photograph-media section #photo').forEach(lightboxDom => {
            if (lightboxDom.querySelector('img')) {
                lightboxDom.querySelector('img').addEventListener('keydown', (e) =>{
                  if (e.which === keyCodes.enter) {
                    lightbox.show(e.currentTarget.parentNode.dataset.id);
                  }  
                });
                lightboxDom.querySelector('img').addEventListener('click', (e) => {
                    lightbox.show(e.currentTarget.parentNode.dataset.id);
                });
            } else {
                lightboxDom.querySelector('video').addEventListener('keydown', (e) =>{
                  if (e.which === keyCodes.enter) {
                    lightbox.show(e.currentTarget.parentNode.dataset.id);
                  }  
                });
                lightboxDom.querySelector('video').addEventListener('click', (e) => {
                    lightbox.show(e.currentTarget.parentNode.dataset.id);
                });
            }
        });

        //initialise le tri
        newTri(media2, photograph);
    };

    const keyCodes = {
        tab: 9,
        enter: 13,
        escape: 27,
      };

    await init();

    //le tri au changement de valeur
    const selectTri = document.getElementById('Tri');

    selectTri.addEventListener("change", () => newTri(media2, photograph));

    // initialise l'envoie de contact
    const btn = document.querySelector('.contact_button');
    const btnEnvoyer = document.getElementById('Envoyer');
    const form = document.getElementById('Contact');

    btn.addEventListener("click", displayModal);
    btnEnvoyer.addEventListener('click', envoyerMessage);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    }, false);

    // close dialog
    const contactmodal = document.getElementById("contact_modal");
    const closeContact = document.getElementById("closeContact");
    contactmodal.addEventListener('keydown', (event) => {
        if (event.which === keyCodes.escape) {
            closeModal();
        }      
    });
    closeContact.addEventListener('keydown', (event) => {
        if (event.which === keyCodes.enter) {
            closeModal();
        }      
    });

    const prenom = document.getElementById('prenom');
    const errorP = document.querySelector('#errPrenom');

prenom.addEventListener("input", function (event) {
  // on vérifie la validité du champ.
  if (prenom.validity.valid) {
    // S'il y a un message d'erreur affiché et que le champ est valide, on retire l'erreur
    prenom.className = "text-control valid";
    prenom.setAttribute('aria-invalid',false);
    errorP.innerHTML = "";
    errorP.className = "error";
  }
}, false);
form.addEventListener("submit", function (event) {
  // on vérifie que le champ est valide.
  if (!prenom.validity.valid || prenom.value == "") {

    prenom.className = "text-control invalid";
    prenom.setAttribute('aria-invalid',true);
    errorP.innerHTML = "Error: Enter votre prénom.";
    errorP.className = "error active";
    // Et on empêche l'envoi des données du formulaire
    event.preventDefault();
  }
}, false);

const nom = document.getElementById('nom');
const errorN = document.querySelector('#errNom');

nom.addEventListener("input", function (event) {
// on vérifie la validité du champ
  if (nom.validity.valid) {
    nom.setAttribute('aria-invalid',false);
    nom.className = "text-control valid";
    errorN.innerHTML = "";
    errorN.className = "error";
  }
}, false);
form.addEventListener("submit", function (event) {
// on vérifie la validité du champ
  if (!nom.validity.valid || nom.value == "") {
    nom.className = "text-control invalid";
    nom.setAttribute('aria-invalid',true);
    errorN.innerHTML = "Error: Enter votre nom.";
    errorN.className = "error active";

    event.preventDefault();
  }
}, false);

const email = document.getElementById('email');
const errorE = document.getElementById('errEmail');
//le string pour la vérification de l'email
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

email.addEventListener("input", function (event) {
// on vérifie la validité du champ
  if (email.validity.valid && emailRegExp.test(email.value)) {
    email.className = "text-control valid";
    email.setAttribute('aria-invalid',false);
    errorE.innerHTML = "";
    errorE.className = "error";
  }
}, false);
form.addEventListener("submit", function (event) {
// on vérifie la validité du champ
  if (!email.validity.valid || !emailRegExp.test(email.value)) {
    email.className = "text-control invalid";
    email.setAttribute('aria-invalid',true);
    errorE.innerHTML = "Veuillez renseigner une adresse e-mail valide (exemple@domaine.fr).";
    errorE.className = "error active";

    event.preventDefault();
  }
}, false);

const message = document.getElementById('message');
const errorM = document.querySelector('#errMessage');

message.addEventListener("input", function (event) {
// on vérifie la validité du champ
  if (message.validity.valid) {
    message.className = "text-control valid";
    message.setAttribute('aria-invalid',false);
    errorM.innerHTML = "";
    errorM.className = "error";
  }
}, false);
form.addEventListener("submit", function (event) {
// on vérifie la validité du champ
  if (!message.validity.valid || message.value == "") {
    message.className = "text-control invalid";
    message.setAttribute('aria-invalid',true);
    errorM.innerHTML = "Error: Enter votre message.";
    errorM.className = "error active";

    event.preventDefault();
  }
}, false);

}
eventHandler();
