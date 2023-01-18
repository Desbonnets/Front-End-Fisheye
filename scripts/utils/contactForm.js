const focusableElementsArray = [
  '[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
];

//affiche la modal de contact
function displayModal() {
  const main = document.getElementById("main");
  const modal = document.getElementById("contact_modal");
  const focusableElements = modal.querySelectorAll(focusableElementsArray);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

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

  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", false);
  main.setAttribute("aria-hidden", true);
  modal.setAttribute("tabindex", "-1");
  modal.focus();
}

//ferme la modal de contact
function closeModal() {
  const main = document.getElementById("main");
  const modal = document.getElementById("contact_modal");
  main.setAttribute("aria-hidden", false);
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', true);
  modal.blur();
}

//envoie le message
function envoyerMessage() {
  const prenom = document.getElementById("prenom");
  const nom = document.getElementById("nom");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (prenom.value !== "" && nom.value !== "" && emailRegex.test(email.value) && message.value !== "") {
    console.log("Prénom = " + prenom.value + "| Nom = " + nom.value + "| Email = " + email.value + "| Message = " + message.value);
    closeModal();
  }
}