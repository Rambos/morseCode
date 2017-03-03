/*
* @Author: Rambo
* @Date:   2017-02-23 17:08:44
*/
const {clipboard, ipcRenderer} = require('electron');

const Tools = require('./js/tools');
const xmorse = require('./libs/xmorse');

// option
const option = {
    space: '/',
    long: '-',
    short: '.'
};


let copy = document.getElementById("copy"),
    input = document.getElementById("input"),
    view = document.getElementById("view"),
    dropdown = document.getElementById("dropdown");


input.addEventListener('input', function() {
    let _value = this.value;
    view.innerHTML = /^(-|\.|\/)/.test(_value) ? xmorse.decode(_value, option) : xmorse.encode(_value, option);
    view.classList.add('show');
})

copy.addEventListener('click', function() {
    clipboard.writeText(view.innerText);
    Tools.toast('复制成功！');
});

dropdown.addEventListener('click', function(e) {
    if (!this.classList.contains('open')) {
        this.classList.add('open');
        ipcRenderer.send('open-settings-window');
        return;
    }
    ipcRenderer.send('close-settings-window');
    this.classList.remove('open');
})
