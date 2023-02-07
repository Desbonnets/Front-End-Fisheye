// regex pour pouvoir récupérer les valeur digital
const Regex = /([\d]*)/;

const keyCodes = {
    tab: 9,
    enter: 13,
    escape: 27,
  };

async function newTri(media2, photograph) {

    const selectTri = document.getElementById('Tri');
    const photographersMedia = document.querySelector(".photograph-media");
    const sectionAll = document.querySelector("section");
    photographersMedia.removeChild(sectionAll);
    const section = document.createElement('section');

    if (selectTri.value == "titre") {
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
    } else if (selectTri.value == "date") {
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
    } else if (selectTri.value == "popularite") {
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

    //on ajout l'evenement click aux l'elements likes de chaque photo
    const likes = document.querySelectorAll('.inputCheckLikes');
    const scoreLikes = document.getElementById('scoreLikes');
    let resultat = 0;

    likes.forEach(like => {
        resultat += parseInt(like.querySelector('.likes').innerText);
        like.querySelector('input').addEventListener("change", function () {
            if (this.checked) {
                addLikes(like.querySelector('.likes'))
            } else {
                removeLikes(like.querySelector('.likes'))
            }
        });
    });

    //on rafraîchi le score
    scoreLikes.textContent = resultat;

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
            })
        } else {
            lightboxDom.querySelector('video').addEventListener('keydown', (e) =>{
                if (e.which === keyCodes.enter) {
                  lightbox.show(e.currentTarget.parentNode.dataset.id);
                }  
              });
            lightboxDom.querySelector('video').addEventListener('click', (e) => {
                lightbox.show(e.currentTarget.parentNode.dataset.id);
            })
        }
    })

}

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