//affiche la modal de contact
function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
}

//ferme la modal de contact
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

//envoie le message
function evoyerMessage(event){
    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    console.log("Prénom = "+prenom.value + "| Nom = "+nom.value+"| Email = "+email.value+"| Message = "+message.value);
}