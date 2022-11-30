function photographersFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("class", "portrait");
        const a = document.createElement('a');
        a.setAttribute("href", "./photographer.html?"+name)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const p = document.createElement( 'p' );
        const p1 = document.createElement( 'p' );
        const p2 = document.createElement( 'p' );
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;
        p2.textContent = price +' €/ jour';
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "tagline");
        p2.setAttribute("class", "prix");
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        article.appendChild(p);
        article.appendChild(p1);
        article.appendChild(p2);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/Photographers ID Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        const btn = document.createElement('button')
        const div = document.createElement('div')
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
        img.setAttribute("class", "portrait");
        btn.setAttribute("class", "contact_button");
        btn.setAttribute("onclick", "displayModal()");
        btn.textContent = "Contactez-moi";
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const p = document.createElement( 'p' );
        const p1 = document.createElement( 'p' );
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "prix");

        article.appendChild(h1);
        article.appendChild(p);
        article.appendChild(p1);
        div.appendChild(article);
        div.appendChild(btn);
        div.appendChild(img);
        return (div);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
function mediaFactory(data, nom) {
    const { title, image, likes, date, price } = data;
    const picture = `assets/photographers/${nom}/${image}`;

    function getMediaDOM() {
        const img = document.createElement( 'img' );
        const div = document.createElement('div');
        const p = document.createElement('p');
        img.setAttribute("src", picture);
        p.textContent = title+" "+likes+" "+date+" "+price;
        div.appendChild(img);
        div.appendChild(p);
        return (div);
    }
    return {  picture, title, likes, date, price, getMediaDOM }
}