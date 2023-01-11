//affiche la modal de contact
function displayModal() {
    const main = document.getElementById("main");
    const modal = document.getElementById("contact_modal");
    const close = document.getElementById("close");
    modal.style.display = "flex";
    modal.setAttribute("aria-hidden", "false");
    modal.setAttribute("aria-disabled", "false");
    main.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-disabled", "true");
    close.focus();
}

//ferme la modal de contact
function closeModal() {
    const main = document.getElementById("main");
    const modal = document.getElementById("contact_modal");
    main.setAttribute("aria-disabled", "false");
    main.setAttribute("aria-hidden", "false");
    modal.style.display = "none";
    modal.setAttribute("aria-disabled", "true");
    modal.setAttribute("aria-hidden", "true");
}

//envoie le message
function envoyerMessage() {
    const prenom = document.getElementById("prenom");
    const nom = document.getElementById("nom");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    debugger;
    if (prenom.value !== "" && nom.value !== "" && email.value !== "" && message.value !== "") {
        console.log("Prénom = " + prenom.value + "| Nom = " + nom.value + "| Email = " + email.value + "| Message = " + message.value);
        closeModal();
    }
}