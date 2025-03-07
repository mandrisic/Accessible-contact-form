const textFields = document.querySelectorAll('.field');
const submit = document.getElementById('submit');
const modal = document.querySelector('.modal');
const customRadio = document.querySelectorAll('.custom-radio');
const email = document.getElementById('email');
const message = document.getElementById('message');
const radioButtons = document.querySelectorAll('input[name="query"]');
const checkbox = document.getElementById('consent');

const handleValidation = () => {
    let isValid = true;

    textFields.forEach(field => {
        if (!textValidation(field)) {
            isValid = false;
        }
    });

    if (!emailValidation()) isValid = false;
    if (!radioValidation()) isValid = false;
    if (!checkboxValidation()) isValid = false;

    return isValid;
}

const textValidation = (field) => {
    const errorId = field.getAttribute('aria-describedby');
    const error = document.getElementById(errorId);

    if (field.value.trim() === '') {
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

const emailValidation = () => {
    const emailRequired = document.getElementById('emailReq-error');
    const emailNotValid = document.getElementById('emailValid-error');
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = true;

    if (email.value.trim() === '') {
        emailRequired.style.display = 'block';
        emailNotValid.style.display = 'none';
        isValid = false;
    } else if (!email.value.match(emailRegex)) {
        emailNotValid.style.display = 'block';
        emailRequired.style.display = 'none';
        isValid = false;
    } else {
        emailNotValid.style.display = 'none';
        emailRequired.style.display = 'none';
    }

    return isValid;
}

const radioValidation = () => {
    const selected = document.querySelector('input[name="query"]:checked');
    const error = document.getElementById('query-error');
    if(!selected){
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

customRadio.forEach(radioContainer => {
    radioContainer.addEventListener('click', () => {
        customRadio.forEach(btn => {
            btn.style.backgroundColor = 'var(--white)';
        });

        const radioInput = radioContainer.querySelector('input[type="radio"]');
        if (radioInput) {
            radioInput.checked = true;

            radioContainer.style.backgroundColor = 'var(--green-200)';
            radioValidation();
        }
    });
});

const checkboxValidation = () => {
    const checkbox = document.getElementById('consent');
    const error = document.getElementById('consent-error');

    if(!checkbox.checked){
        error.style.display = 'block';
        return false;
    } else {
        error.style.display = 'none';
        return true;
    }
}

textFields.forEach(field => {
    field.addEventListener('input', () => textValidation(field));
});
email.addEventListener('input', emailValidation);
radioButtons.forEach(radio => {radio.addEventListener('change', radioValidation);});
checkbox.addEventListener('change', checkboxValidation);

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (handleValidation()) {
        modal.classList.remove('hidden');
        textFields.forEach(field => field.value = '');
        email.value = '';
        radioButtons.forEach(radio => radio.checked = false);
        customRadio.forEach(btn => btn.style.backgroundColor = 'var(--white)');
        checkbox.checked = false;

        setTimeout(() => {
            modal.classList.add('hidden');
        }, 3000);
    }
});