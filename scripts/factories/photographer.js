//affiche le profil des photographes (index.html)
function photographersFactory(data) {
    //déstructuration du json
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        //creation des elements
        const article = document.createElement('article');
        const img = document.createElement('img');
        const div = document.createElement('div');
        const a = document.createElement('a');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');

        //ajouter les attributs de chaque elements
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "tagline");
        p2.setAttribute("class", "prix");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de " + name);
        img.setAttribute("class", "portrait");
        a.setAttribute("href", "./photographer.html?" + name);
        a.setAttribute("aria-label", "Lien vers la pages de " + name);

        //Ajout du contenu dans les elements
        h2.textContent = name;
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;
        p2.textContent = price + ' €/ jour';

        //organisation (parents/enfants) des elements
        div.appendChild(img);
        div.appendChild(h2);
        article.appendChild(div);
        article.appendChild(p);
        article.appendChild(p1);
        article.appendChild(p2);
        a.appendChild(article);

        return (a);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}

// affiche le profil d'un photographe (photographer.html)
function photographerFactory(data) {
    //déstructuration du json
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        //creation des elements
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const div = document.createElement('div');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');
        const p1 = document.createElement('p');

        //ajouter les attributs de chaque elements
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de " + name);
        img.setAttribute("class", "portrait");
        btn.setAttribute("class", "contact_button");
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute("data-target", "#contact_modal");
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "description");
        btn.setAttribute('aria-label', 'Contacter-moi mon cher');

        //Ajout du contenu dans les elements
        btn.textContent = "Contactez-moi";
        h1.textContent = name;
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;

        //organisation (parents/enfants) des elements
        article.appendChild(h1);
        article.appendChild(p);
        article.appendChild(p1);
        div.appendChild(article);
        div.appendChild(btn);
        div.appendChild(img);
        return (div);
    }

    function getScoreCardDOM() {
        //creation des elements
        const div = document.createElement('div')
        const icon = document.createElement('i');
        const p = document.createElement('p');
        const p1 = document.createElement('p');

        //ajouter les attributs de chaque elements
        icon.setAttribute('class', 'fa-solid fa-heart');
        p.setAttribute('id', 'scoreLikes');

        //Ajout du contenu dans les elements
        p.textContent = 0;
        p1.textContent = price + '€ / jour';

        //organisation (parents/enfants) des elements
        div.appendChild(p);
        div.appendChild(icon);
        div.appendChild(p1);

        return (div);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM, getScoreCardDOM }
}

//affiche les photos d'un photographe (photographer.html)
function mediaFactory(data, nom) {
    //déstructuration du json
    const { id, title, image, video, likes } = data;

    //on vérifie si c'est une image ou une video
    let picture = "";
    if (image !== undefined) {
        picture = `assets/photographers/${nom}/${image}`;
    } else {
        picture = `assets/photographers/${nom}/${video}`;
    }

    function getMediaDOM() {
        //creation des elements
        const img = document.createElement('img');
        const vd = document.createElement('video');
        const div = document.createElement('div');
        const divInputCheck = document.createElement('div');
        const divInputContent = document.createElement('div');
        const p = document.createElement('p');
        const aime = document.createElement('input');
        const icon = document.createElement('i');

        //si c'est une video on construit la balise video
        if (picture.endsWith(".mp4")) {
            //creation des elements
            const source = document.createElement('source');

            //ajouter les attributs de chaque elements
            source.setAttribute("src", picture);
            source.setAttribute("role", "img");
            source.setAttribute("alt", "Video de " + title);
            vd.setAttribute("disablePictureInPicture", "");

            //Ajout du contenu dans les elements
            vd.textContent = "La vidéo n'est pas supporter par le navigateur."

            //organisation (parents/enfants) des elements
            vd.appendChild(source);
            div.appendChild(vd);

        } else {
            //ajouter les attributs de chaque elements
            img.setAttribute("src", picture);
            img.setAttribute("alt", "Image de " + title);

            //organisation (parents/enfants) des elements
            div.appendChild(img);
        }

        //ajouter les attributs de chaque elements
        div.setAttribute('id', "photo")
        div.setAttribute('data-id', id)
        aime.setAttribute('type', 'checkbox');
        divInputCheck.setAttribute('class', 'inputCheckLikes');
        divInputContent.setAttribute("class", "likes");
        icon.setAttribute('class', 'fa-solid fa-heart');

        //Ajout du contenu dans les elements
        p.textContent = title;
        divInputContent.textContent = likes;

        //organisation (parents/enfants) des elements
        div.appendChild(p);
        divInputCheck.appendChild(aime);
        divInputCheck.appendChild(divInputContent);
        divInputContent.appendChild(icon);
        div.appendChild(divInputCheck);

        return (div);
    }
    return { picture, title, likes, getMediaDOM }
}