/*
* @Author: Rambo
* @Date:   2017-02-23 19:22:16
*/

"use strict";

class Tools {

    /**
     * [toast]
     * @param  {[String]} text
     */
    toast(text) {
        let toastDom = document.getElementById('toast');
        toastDom.innerHTML = text;
        toastDom.classList.add('show');

        setTimeout(() => {
            toastDom.classList.remove('show');
        }, 1500)
    }
}

Tools = new Tools();
module.exports = Tools;