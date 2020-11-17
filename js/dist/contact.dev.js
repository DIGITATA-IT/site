"use strict";

var contactForm = document.getElementById('frmContact');
contactForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var fields = document.querySelectorAll('input[required], textarea[required]');
  fields.forEach(function (field) {
    resetField(field);
  });
  var valid = true;
  fields.forEach(function (field) {
    if (!validateField(field)) {
      valid = false;
    }
  });

  if (valid) {
    e.target.submit();
  }
}, false);

function validateField(field) {
  if (field.checkValidity()) {
    return true;
  } else {
    field.classList.add('invalid');
    field.previousElementSibling.insertAdjacentHTML('beforeend', "<span class=\"msg\">".concat(field.validationMessage, "</span>"));
    return false;
  }
}

function resetField(field) {
  var fieldLabel = field.previousElementSibling;
  field.classList.remove('invalid');

  while (fieldLabel.firstElementChild) {
    fieldLabel.removeChild(fieldLabel.firstElementChild);
  }

  field.valid = true;
}
/*let contactForm = document.getElementById('contactForm');


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let fields = document.querySelectorAll('input[required], textarea[required]');
    fields.forEach((field) => {resetField(field)});
    let valid = true;

    fields.forEach((field) => {
      if(! validateField(field)) {
          valid = false;
      }
    });
    if(valid){
        e.target.submit();
    }

},false);
   

function validateField(field) {
   if (field.checkValidity()) {
       return true;
   }else{
       field.classList.add('invalid');
       field.previousElementSibling.insertAdjacentHTML('beforeend', `<span class="msg">${field.validationMessage}</span>`);
       return false;
   }
}
 
/*
function resetField(field){
    let fieldLabel = field.previousElementSibling;
    field.classList.remove('invalid');
    while(fieldLabel.Element){
        fieldLabel.remove(fieldLabel.Element);
    }
    field.valid = true;
}*/

/*
 while(fieldLabel.firstElementChild){
     fieldLabel.removeChild(fieldLabel.firstElementChild);
 }
 field.valid = true;

function resetField(field){
 let fieldLabel = field.previousElementSibling;
 field.classList.remove('invalid');
 while(fieldLabel.firstElementChild){
     fieldLabel.removeChild(fieldLabel.firstElementChild);
 }
 field.valid = true;
}

 

}, false);

function validateField(field){
 if(field.checkValidity()){
     return true;
 } else {
     field.classList.add('invalid');
     field.previousElementSibling.insertAdjacentHTML('beforeend', `<span class="msg">${field.validationMessage}</span>`);
     return false;
 }
}

*/
//# sourceMappingURL=contact.dev.js.map
