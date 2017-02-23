// option
const option = {
    space: '/',
    long: '-',
    short: '.'
};

let button = document.getElementById("button"),
    input = document.getElementById("input"),
    view = document.getElementById("view");

button.addEventListener('click', () => {

    let  _value = input.value;
    if (!_value.length) {
        input.classList.add('has-error');
        return;
    }
    view.innerHTML = /^(-|\.|\/)/.test(_value) ? xmorse.decode(_value, option) : xmorse.encode(_value, option);
    view.classList.add('show');

});
