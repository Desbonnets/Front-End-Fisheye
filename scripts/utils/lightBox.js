class lightBox {
    //créer la nouvelle liste d'elements (json en parametre)
    constructor(listElement) {
        this.keyCodes = {
            ArrowLeft: 37,
            ArrowRight: 39,
            tab: 9,
            enter: 13,
            escape: 27,
        };
        this.currentElement = null;
        this.listElement = listElement;
        this.name = location.search.replace('?', '')
        this.manageEvent();
    }

    //affiche l'element selectionner
    show(id) {
        this.currentElement = this.getElementById(id);
        this.display();
    }

    //passe à l'element suivant
    next() {
        let index = this.listElement.findIndex(element => element.id == this.currentElement.id);
        if (index == (this.listElement.length - 1)) {
            this.currentElement = this.listElement[0];
        } else {
            this.currentElement = this.listElement[index + 1];
        }
        this.display();
    }

    //passe à l'element précédent
    previous() {
        let index = this.listElement.findIndex(element => element.id == this.currentElement.id);
        if (index == 0) {
            this.currentElement = this.listElement[(this.listElement.length - 1)];
        } else {
            this.currentElement = this.listElement[index - 1];
        }
        this.display();
    }

    //initialise les evenements (flèches de navigation et la croix pour fermer)
    manageEvent() {
        document.querySelector('.previous').addEventListener('keydown', (e) => {
            if (e.which === this.keyCodes.enter) {
                this.previous();
            }
        })
        document.querySelector('.next').addEventListener('keydown', (e) => {
            if (e.which === this.keyCodes.enter) {
                this.next();
            }

        })
        document.querySelector('.close').addEventListener('keydown', (e) => {
            if (e.which === this.keyCodes.enter) {
                document.getElementById("lightBox").style.display = "none";
                this.currentElement.focus();
            }
        })
        document.getElementById('lightBox').addEventListener('keydown', (e) => {
            if (e.which === this.keyCodes.ArrowLeft) {
                this.previous();
            }
            if (e.which === this.keyCodes.ArrowRight) {
                this.next();
            }
            if (e.which === this.keyCodes.escape) {
                document.getElementById("lightBox").style.display = "none";
                console.log(this.currentElement);
            }
        })
        document.querySelector('.previous').addEventListener('click', () => {
            this.previous();
        })
        document.querySelector('.next').addEventListener('click', () => {
            this.next();
        })
        document.querySelector('.close').addEventListener('click', () => {
            document.getElementById("lightBox").style.display = "none";
        })
    }

    //retourne un element de la liste qui a pour ID l'ID en parametre
    getElementById(id) {
        return this.listElement.find(element => element.id == id);
    }

    //initialise l'affichage de la ligthBox
    display() {

        const focusableElementsArray = [
            '[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ];
        const main = document.getElementById("main");
        const focusableElements = document.getElementById("lightBox").querySelectorAll(focusableElementsArray);
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (this.currentElement.image !== undefined) {
            document.querySelector('#lightBox .content .imgLightBox').src = 'assets/photographers/' + this.name + '/' + this.currentElement.image;
            document.querySelector('#lightBox .content .imgLightBox').alt = 'Photo de ' + this.currentElement.title;
            document.querySelector('#lightBox .titre').textContent = this.currentElement.title;
            document.querySelector('#lightBox .content .videoLightBox').style.display = 'none';
            document.querySelector('#lightBox .content .imgLightBox').style.display = 'block';

        } else if (this.currentElement.video.endsWith(".mp4")) {

            document.querySelector('#lightBox .content .videoLightBox').src = 'assets/photographers/' + this.name + '/' + this.currentElement.video;
            document.querySelector('#lightBox .content .videoLightBox').alt = this.currentElement.title;
            document.querySelector('#lightBox .titre').textContent = this.currentElement.title;
            document.querySelector('#lightBox .content .videoLightBox').style.display = 'block';
            document.querySelector('#lightBox .content .imgLightBox').style.display = 'none';
        }

        focusableElements.forEach((focusableElement) => {
            if (focusableElement.addEventListener) {
                focusableElement.addEventListener('keydown', (event) => {
                    const tab = event.which === keyCodes.tab;

                    if (!tab) {
                        return;
                    }

                    if (event.shiftKey) {
                        if (event.target === firstFocusableElement) { // shift + tab
                            event.preventDefault();

                            lastFocusableElement.focus();
                        }
                    } else if (event.target === lastFocusableElement) { // tab
                        event.preventDefault();

                        firstFocusableElement.focus();
                    }
                });
            }
        });

        document.getElementById("lightBox").style.display = "flex";
        document.getElementById("lightBox").setAttribute("aria-hidden", false);
        main.setAttribute("aria-hidden", true);
        document.getElementById("lightBox").setAttribute("tabindex", "-1");
        document.getElementById("lightBox").focus();
        document.getElementById("lightBox").style.display = "flex";
    }
}