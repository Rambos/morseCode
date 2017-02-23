const {clipboard} = nodeRequire('electron')



// option
const option = {
    space: '/',
    long: '-',
    short: '.'
};

let button = document.getElementById("button"),
    input = document.getElementById("input"),
    view = document.getElementById("view");


input.addEventListener('input', (e) => {
    let _value = e.target.value;
    view.innerHTML = /^(-|\.|\/)/.test(_value) ? xmorse.decode(_value, option) : xmorse.encode(_value, option);
    view.classList.add('show');
})

button.addEventListener('click', () => {
    clipboard.writeText(view.innerText);
    Toast.show('复制成功！');
});


/**
 * toast
 */

class Toast {

    show(text) {
        let toastDom = document.getElementById('toast');
        toastDom.innerHTML = text;
        toastDom.classList.add('show');

        setTimeout(() => {
            toastDom.classList.remove('show');
        }, 1500)
    }
}

Toast = new Toast();