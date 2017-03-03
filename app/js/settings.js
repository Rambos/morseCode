/*
* @Author: Rambo
* @Date:   2017-03-03 15:41:22
*/

!(function(){
    'use strict';

    const {ipcRenderer} = require('electron');


    let windowTop = document.querySelector('input[name="windowTop"]');
    let windowOpacity = document.querySelector('input[name="windowOpacity"]')

    windowTop.checked = JSON.parse(localStorage.getItem('windowTop'));
    windowOpacity.value = localStorage.getItem('windowOpacity');

    windowTop.addEventListener('change', function() {

        localStorage.setItem('windowTop', this.checked);

        ipcRenderer.send('set-main-window-top', this.checked);

    })

    windowOpacity.addEventListener('input', function() {

        localStorage.setItem('windowOpacity', this.value);

        ipcRenderer.send('set-main-window-opacity', this.value);

    })

})();




