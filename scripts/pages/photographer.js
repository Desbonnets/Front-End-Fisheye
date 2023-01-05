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

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        const media = await getMedia();
        let photograph;
        let media2 = [];
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
            if(lightboxDom.querySelector('img')){
                lightboxDom.querySelector('img').addEventListener('click', (e) => {
                    lightbox.show(e.currentTarget.parentNode.dataset.id);
                })
            }else{
                lightboxDom.querySelector('video').addEventListener('click', (e) => {
                    lightbox.show(e.currentTarget.parentNode.dataset.id);
                })
            }
        });

        //on ajout l'evenement click aux l'elements likes de chaque photo
        const likes = document.querySelectorAll('.inputCheckLikes');
        const scoreLikes = document.getElementById('scoreLikes');
        let resultat = 0;

        likes.forEach(like => {
            resultat += parseInt(like.querySelector('.likes').innerText);
            like.querySelector('input').addEventListener("change", function() {
                if(this.checked){
                    addLikes(like.querySelector('.likes'))
                }else{
                    removeLikes(like.querySelector('.likes'))
                }
                });
        });
        //on rafraîchi le score
        scoreLikes.textContent = resultat;

    };

    // regex pour pouvoir récupérer les valeur digital
    const Regex = /([\d]*)/;

    await init();

    //on l'ajout un likes si on coche la checkbox
    function addLikes(like) {
        const scoreLikes = document.getElementById('scoreLikes');
        let textReplace = like.innerHTML;
        scoreLikes.textContent = parseInt(scoreLikes.textContent) + 1;
        textReplace = textReplace.replace(Regex, parseInt(like.textContent, 10) + 1);
        like.innerHTML = textReplace;
    }

    //on supprime un likes si on décoche la checkbox
    function removeLikes(like) {
        const scoreLikes = document.getElementById('scoreLikes');
        let textReplace = like.innerHTML;
        scoreLikes.textContent = parseInt(scoreLikes.textContent) - 1;
        textReplace = textReplace.replace(Regex, parseInt(like.textContent, 10) - 1);
        like.innerHTML = textReplace;
    }

    //initialise le tri
    const selectTrie = document.getElementById('Trie');

    selectTrie.addEventListener("change", newTrie);

    // initialise l'envoie de contact
    const btn = document.querySelector('.contact_button');
    const btnEnvoyer = document.getElementById('Envoyer');
    const form =document.getElementById('Contact');

    btn.addEventListener("click", displayModal);
    btnEnvoyer.addEventListener('click', evoyerMessage);

    form.addEventListener("submit", function (event){
    event.preventDefault();
    }, false);

}
eventHandler();
