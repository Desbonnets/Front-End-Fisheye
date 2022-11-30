    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        let photographers =[];
        await fetch('data/photographers.json')
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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        photographers.forEach((photographer) => {
            const photographerModel = photographersFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    