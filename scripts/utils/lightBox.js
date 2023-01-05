class lightBox {
    //créer la nouvelle liste d'elements (json en parametre)
    constructor(listElement){
        this.currentElement = null;
        this.listElement = listElement;
        this.name = location.search.replace('?','')
        this.manageEvent();
    }

    //affiche l'element selectionner
    show(id){
        this.currentElement = this.getElementById(id);
        this.display();
    }
    
    //passe à l'element suivant
    next(){
        let index = this.listElement.findIndex(element => element.id == this.currentElement.id);
        if(index == (this.listElement.length -1)){
            this.currentElement = this.listElement[0];
        }else{
            this.currentElement = this.listElement[index + 1];
        }
        this.display();
    }
    
    //passe à l'element précédent
    previous(){
        let index = this.listElement.findIndex(element => element.id == this.currentElement.id);
        if(index == 0){
            this.currentElement = this.listElement[(this.listElement.length - 1)];
        }else{
            this.currentElement = this.listElement[index - 1];
        }
        this.display();
    }
    
    //initialise les evenements (flèches de navigation et la croix pour fermer)
    manageEvent(){
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
    getElementById(id){
        return this.listElement.find(element => element.id == id);
    }

    //initialise l'affichage de la ligthBox
    display(){

        if(this.currentElement.image !== undefined){
            document.querySelector('#lightBox .content .imgLightBox').src = 'assets/photographers/'+this.name+'/'+this.currentElement.image;
            document.querySelector('#lightBox .content .imgLightBox').alt = 'Photo de ' + this.currentElement.title;
            document.querySelector('#lightBox .titre').textContent = this.currentElement.title;
            document.querySelector('#lightBox .content .videoLightBox').style.display = 'none';
            document.querySelector('#lightBox .content .imgLightBox').style.display = 'block';

        }else if (this.currentElement.video.endsWith(".mp4")) {

            document.querySelector('#lightBox .content .videoLightBox').src = 'assets/photographers/'+this.name+'/'+this.currentElement.video;
            document.querySelector('#lightBox .content .videoLightBox').alt = this.currentElement.title;
            document.querySelector('#lightBox .titre').textContent = this.currentElement.title;
            document.querySelector('#lightBox .content .videoLightBox').style.display = 'block';
            document.querySelector('#lightBox .content .imgLightBox').style.display = 'none';
        }
        
        document.getElementById("lightBox").style.display = "flex";
    }
}