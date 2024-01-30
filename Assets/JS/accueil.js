const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const dropDownMenu = document.querySelector('.dropdown_menu');

toggleBtn.onclick = function() {
    dropDownMenu.classList.toggle('open');
    const isOpen = dropDownMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen
    ? 'fa fa-remove'
    : 'fa fa-bars'
}


//sliderVidéos

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");



var sliderNav = function(manual){

    btns.forEach((btn) => {
        btn.classList.remove('active');
    });

    slides.forEach((slide) => {
        slide.classList.remove('active');
    });

    contents.forEach((content) => {
        content.classList.remove('active');
    });

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");
    contents[manual].classList.add("active");

}

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    })
});  





// Formulaire

//connexion
document.querySelector("#show-login").addEventListener("click", function(){
    document.querySelector(".popup").classList.add("active");
});


document.querySelector(".popup .close-btn").addEventListener("click", function(){
    document.querySelector(".popup").classList.remove("active");
});


//inscription
document.querySelector("#show-signin").addEventListener("click", function(){
    document.querySelector(".popdown").classList.add("active");
});


document.querySelector(".popdown .close-btn").addEventListener("click", function(){
    document.querySelector(".popdown").classList.remove("active");
});


// popUp success

document.getElementById("inscriptionBouton").addEventListener("click", function(){
    document.getElementsByClassName("popup-success")[0].classList.add("active-success");
});


document.getElementById("dismiss-popup-btn").addEventListener("click", function(){
    document.getElementsByClassName("popup-success")[0].classList.remove("active-success");
});