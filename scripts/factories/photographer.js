function photographersFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de "+name);
        img.setAttribute("class", "portrait");
        const div = document.createElement('div');
        const a = document.createElement('a');
        a.setAttribute("href", "./photographer.html?" + name)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const p = document.createElement('p');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;
        p2.textContent = price + ' €/ jour';
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "tagline");
        p2.setAttribute("class", "prix");
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
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button')
        const div = document.createElement('div')
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de "+name);
        img.setAttribute("class", "portrait");
        btn.setAttribute("class", "contact_button");
        btn.textContent = "Contactez-moi";
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const p = document.createElement('p');
        const p1 = document.createElement('p');
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "description");

        article.appendChild(h1);
        article.appendChild(p);
        article.appendChild(p1);
        div.appendChild(article);
        div.appendChild(btn);
        div.appendChild(img);
        return (div);
    }

    function getScoreCardDOM() {
        const div = document.createElement('div')
        const icon = document.createElement('i');
        const p = document.createElement('p');
        const p1 = document.createElement('p');
        icon.setAttribute('class', 'fa-solid fa-heart')
        p.setAttribute('id', 'scoreLikes')
        p.textContent = 0;
        p1.textContent = price + '€ / jour';
        div.appendChild(p);
        div.appendChild(icon);
        div.appendChild(p1);

        return (div);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM, getScoreCardDOM }
}
function mediaFactory(data, nom) {
    const { id, title, image, video, likes } = data;
    let picture = "";
    if (image !== undefined) {
        picture = `assets/photographers/${nom}/${image}`;
    } else {
        picture = `assets/photographers/${nom}/${video}`;
    }
    function getMediaDOM() {
        const img = document.createElement('img');
        const vd = document.createElement('video');
        const div = document.createElement('div');
        const divInputCheck = document.createElement('div');
        const divInputContent = document.createElement('div');
        const p = document.createElement('p');
        const aime = document.createElement('input');
        const icon = document.createElement('i');
        if (picture.endsWith(".mp4")) {
            const source = document.createElement('source');
            source.setAttribute("src", picture);
            source.setAttribute("type", "video/mp4")
            source.setAttribute("alt", "Video de "+title);
            vd.setAttribute("disablePictureInPicture", "");
            vd.textContent = "La vidéo n'est pas supporter par le navigateur."
            vd.appendChild(source);
            div.appendChild(vd);
        } else {
            img.setAttribute("src", picture);
            img.setAttribute("alt", "Image de "+title);
            div.appendChild(img);
        }
        p.textContent = title;
        div.setAttribute('id', "photo")
        div.setAttribute('data-id', id)
        div.appendChild(p);
        aime.setAttribute('type', 'checkbox');
        divInputCheck.setAttribute('class', 'inputCheckLikes');
        divInputCheck.appendChild(aime);
        divInputCheck.appendChild(divInputContent);
        divInputContent.setAttribute("class", "likes");
        divInputContent.textContent = likes;
        icon.setAttribute('class', 'fa-solid fa-heart');
        divInputContent.appendChild(icon);
        div.appendChild(divInputCheck);
        return (div);
    }
    return { picture, title, likes, getMediaDOM }
}