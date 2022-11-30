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
        img.setAttribute("src", picture);
        img.setAttribute("class", "portrait");
        const h1 = document.createElement('h1');
        h1.textContent = name;
        const p = document.createElement( 'p' );
        const p1 = document.createElement( 'p' );
        p.textContent = city + ', ' + country;
        p1.textContent = tagline;
        p.setAttribute("class", "lieu");
        p1.setAttribute("class", "prix");
        article.appendChild(img);
        article.appendChild(h1);
        article.appendChild(p);
        article.appendChild(p1);
        return (article);
    }
    return { name, picture, city, country, tagline, price, getUserCardDOM }
}
function mediaFactory(data) {
    const { title, image, likes, date, price } = data;

    const picture = `assets/photographers/Mimi/${image}`;

    function getMediaDOM() {
        const section = document.createElement('section');
        const img = document.createElement( 'img' );
        const div = document.createElement('div');
        const p = document.createElement('p');
        img.setAttribute("src", picture);
        p.textContent = title+" "+image+" "+likes+" "+date+" "+price;
        //div.textContent = "Trier par";
        section.appendChild(img);
        section.appendChild(p);
        return (section);
    }
    return {  picture, title, likes, date, price, getMediaDOM }
}