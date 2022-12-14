function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function evoyerMessage(event){
    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    console.log("Prénom = "+prenom.value + "| Nom = "+nom.value+"| email = "+email.value+"| message = "+message.value);
}