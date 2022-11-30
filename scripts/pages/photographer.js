async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    let photographers =[];
    await fetch('./data/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        console.dir(json);
        photographers = json["photographers"];
        console.log(photographers);
    })

    // et bien retourner le tableau photographers seulement une fois

    return photographers;
}
async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    let media =[];
    await fetch('./data/photographers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then(json => {
        console.dir(json);
        media = json["media"];
        console.log(media);
    })

    // et bien retourner le tableau photographers seulement une fois

    return media;
}

async function displayData(photographers, media) {
    const photographersHeader = document.querySelector(".photograph-header");
    const photographersMedia = document.querySelector(".photograph-media");
    photographers.forEach((photographer) => {
        let name = photographer['name'].replace(' ','%20');
        if (location.search == '?'+name){
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersHeader.appendChild(userCardDOM);
            let nbMedia = 1;
            media.forEach((media1) => {
                if (media1['photographerId'] == photographer['id']){
                    //const divrow = document.createElement('div');
                    //const result = nbMedia % 3;
                    const mediaModel = mediaFactory(media1, photographer['name']);
                    const mediaDOM = mediaModel.getMediaDOM();
                    photographersMedia.appendChild(mediaDOM);
                    nbMedia++;
                }
            });
        } 
    });
    
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    const media = await getMedia();
    displayData(photographers, media);
};

init();
