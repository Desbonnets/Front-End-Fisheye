async function eventHandler(event) {
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
                //console.dir(json);
                photographers = json["photographers"];
                //console.log(photographers);
            })

        // et bien retourner le tableau photographers seulement une fois

        return photographers;
    }
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

    async function displayData(photographer, media) {

        const photographersHeader = document.querySelector(".photograph-header");
        const photographersMedia = document.querySelector(".photograph-media");
        const score = document.querySelector(".score");
        //const mediaGalerie = document.getElementById(".galerie_modal");
        const section = document.createElement('section');
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersHeader.appendChild(userCardDOM);
        //on affiche tous les media d'un photographe
        media.forEach((media1) => {
            const mediaModel = mediaFactory(media1, photographer['name']);
            const mediaDOM = mediaModel.getMediaDOM();
            //const galerieDOM = mediaModel.getGalerieDOM();
            section.appendChild(mediaDOM)
            photographersMedia.appendChild(section);
            //mediaGalerie.appendChild(galerieDOM);
        });
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

        console.log(photograph);
        console.log(media2);

        await displayData(photograph, media2);
        let lightbox = new lightBox(media2);
        //on l'ajout de likes au click
        const likes = document.querySelectorAll('.likes');
        const scoreLikes = document.getElementById('scoreLikes');
        let resultat = 0;

        likes.forEach(like => {
            resultat += parseInt(like.innerText);
            like.addEventListener("click", () => addLikes(like));
        });
        scoreLikes.textContent = resultat;

        document.querySelectorAll('.photograph-media section div').forEach(lightboxDom => {
            lightboxDom.addEventListener('click', (e) => {
                lightbox.show(e.currentTarget.dataset.id);
            })
        })

    };

    // regex pour pouvoir récupérer les valeur digital
    const Regex = /([\d]*)/;

    await init();

    //on l'ajout de likes au click
    function addLikes(like) {
        const scoreLikes = document.getElementById('scoreLikes');
        let textReplace = like.innerHTML;
        scoreLikes.textContent = parseInt(scoreLikes.textContent) + 1;
        textReplace = textReplace.replace(Regex, parseInt(like.textContent, 10) + 1);
        like.innerHTML = textReplace;
    }

    const selectTrie = document.getElementById('Trie');

    selectTrie.addEventListener("change", newTrie);

    async function newTrie() {

        const photographers = await getPhotographers();
        const media = await getMedia();
        const photographersMedia = document.querySelector(".photograph-media");
        const sectionAll = document.querySelector("section");
        photographersMedia.removeChild(sectionAll);
        const section = document.createElement('section');
        console.log(photographersMedia);
        let photograph;
        let media2 = [];
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

        if (selectTrie.value == "titre") {
            const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
            const sortBySensitivity = sensitivity => (a, b) => a.localeCompare(b, undefined, { sensitivity });
            const byBase = sortBySensitivity('base');
            const toTitle = e => e['title'];
            const byTitle = sortByMapped(toTitle, byBase)
            console.log([...media2].sort(byTitle));
            media2 = media2.sort(byTitle);
            media2.forEach((media1) => {
                const mediaModel = mediaFactory(media1, photograph['name']);
                const mediaDOM = mediaModel.getMediaDOM();
                section.appendChild(mediaDOM)
                photographersMedia.appendChild(section);
            });
        } else if (selectTrie.value == "date") {
            const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
            const byValue = (a, b) => a - b;
            const toDate = e => new Date(e['date']);
            const byDate = sortByMapped(toDate, byValue)
            console.log([...media2].sort(byDate));
            media2 = media2.sort(byDate);
            media2.forEach((media1) => {
                const mediaModel = mediaFactory(media1, photograph['name']);
                const mediaDOM = mediaModel.getMediaDOM();
                section.appendChild(mediaDOM)
                photographersMedia.appendChild(section);
            });
        } else if (selectTrie.value == "popularite") {
            const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
            const byValue = (a, b) => a - b;
            const toLikes = e => e['likes'];
            const byLikes = sortByMapped(toLikes, byValue)
            console.log([...media2].sort(byLikes));
            media2 = media2.sort(byLikes);
            media2.forEach((media1) => {
                const mediaModel = mediaFactory(media1, photograph['name']);
                const mediaDOM = mediaModel.getMediaDOM();
                section.appendChild(mediaDOM)
                photographersMedia.appendChild(section);
            });
        }

        const likes = document.querySelectorAll('.likes');
        const scoreLikes = document.getElementById('scoreLikes');
        let resultat = 0;

        likes.forEach(like => {
            resultat += parseInt(like.innerText);
            like.addEventListener("click", () => addLikes(like));
        });
        scoreLikes.textContent = resultat;
        let lightbox = new lightBox(media2);
        document.querySelectorAll('.photograph-media section div').forEach(lightboxDom => {
            lightboxDom.addEventListener('click', (e) => {
                lightbox.show(e.currentTarget.dataset.id);
            })
        })

    }
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
