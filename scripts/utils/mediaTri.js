async function newTrie() {

    const selectTrie = document.getElementById('Trie');
    const photographers = await getPhotographers();
    const media = await getMedia();
    const photographersMedia = document.querySelector(".photograph-media");
    const sectionAll = document.querySelector("section");
    photographersMedia.removeChild(sectionAll);
    const section = document.createElement('section');
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

    //on ajout l'evenement click aux l'elements likes de chaque photo
    const likes = document.querySelectorAll('.inputCheckLikes');
    const scoreLikes = document.getElementById('scoreLikes');
    let resultat = 0;

    likes.forEach(like => {
        resultat += parseInt(like.querySelector('.likes').innerText);
        like.querySelector('input').addEventListener("change", () => addLikes(like.querySelector('.likes')));
    });

    //on rafraîchi le score
    scoreLikes.textContent = resultat;

    // initialise la lightbox
    let lightbox = new lightBox(media2);

    //initialise l'envenement d'affichage au click (sur une photo)
    document.querySelectorAll('.photograph-media section #photo').forEach(lightboxDom => {
        if (lightboxDom.querySelector('img')) {
            lightboxDom.querySelector('img').addEventListener('click', (e) => {
                lightbox.show(e.currentTarget.parentNode.dataset.id);
            })
        } else {
            lightboxDom.querySelector('video').addEventListener('click', (e) => {
                lightbox.show(e.currentTarget.parentNode.dataset.id);
            })
        }
    })

}