import isEmail from 'validator/lib/isEmail';

export function Validate(input, setFormValue, formValue, setIsValid) {
  const {name, value, message} = input;

  let status = true;
  let error = message;

  setFormValue({
    ...formValue,
    [name]: value
  });

  if (input.type === 'email') {
    status = isEmail(value);
    if (!status) {
      error = "Неверный формат email";
      input.classList.add('authentication__invalid')
    } else {
      input.classList.remove('authentication__invalid')
    };
  } else {
    status = input.checkValidity();
  }
  setIsValid(status);
  return error;
}