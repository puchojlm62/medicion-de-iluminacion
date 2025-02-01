const hamburger = document.querySelector("#hamburguesa");
const enlaces= document.querySelector('#nav__links');

hamburger.addEventListener('click',() => {
    enlaces.classList.toggle('show')
});
