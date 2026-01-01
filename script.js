const btnAnim = document.querySelectorAll(".btn-anim");

window.setTimeout(() => {
    btnAnim.forEach((sq) => {
        sq.classList.add("btn-anim-transition");
    });
}, 1000);

const menu = document.getElementById("menu");
var isMenuOpen = false;

function toggleMenu() {
    console.log("toggleMenu");
    if (isMenuOpen) {
        menu.classList.remove("navbar-anim-transform");
        isMenuOpen = false;
    } else {
        menu.classList.add("navbar-anim-transform");
        isMenuOpen = true;
    }
}

const getInteractionObserver = () => {
    let flag = true;
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (flag) {
                    let txtAnim = entry.target.querySelectorAll(".txt-anim");
                    txtAnim.forEach((ta) => {
                        ta.classList.add("txt-anim-transition");
                    });
                }
                return;
            }
            flag = true;
            let txtAnim = entry.target.querySelectorAll(".txt-anim");
            txtAnim.forEach((ta) => {
                ta.classList.remove("txt-anim-transition");
            });
        });
    });
};
// var flag = true;
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//             if (flag) {
//                 let txtAnim = entry.target.querySelectorAll(".txt-anim");
//                 txtAnim.forEach((ta) => {
//                     ta.classList.add("txt-anim-transition");
//                 });
//             }
//             return;
//         }
//         flag = true;
//         let txtAnim = entry.target.querySelectorAll(".txt-anim");
//         txtAnim.forEach((ta) => {
//             ta.classList.remove("txt-anim-transition");
//         });
//     });
// });

var landing = document.getElementById("home");
var about = document.getElementById("about");
var experience = document.getElementById("experience");
var skills = document.getElementById("skills");
// var certifications = document.getElementById("certifications");
var works = document.getElementById("works");
//var achievements = document.getElementById("achievements");
var contacts = document.getElementById("contacts");

// observer.observe(landing);
// observer.observe(about);
// observer.observe(experience);
// observer.observe(works);
// observer.observe(achievements);
// observer.observe(contacts);

const observer = getInteractionObserver();

observer.observe(landing);
observer.observe(about);
observer.observe(experience);
observer.observe(skills);
// observer.observe(certifications);
observer.observe(works);
//observer.observe(achievements);
observer.observe(contacts);

function scrollToElement(element) {
    var elmnt = document.getElementById(element);
    elmnt.scrollIntoView({ behavior: "smooth", block: "start" });
    menu.classList.remove("navbar-anim-transform");
    isMenuOpen = false;
}

var projectsModal = document.getElementById("projects-modal");
var projectsBtn = document.getElementById("projects-btn");

projectsBtn.onclick = function () {
    projectsModal.style.visibility = "visible";
    projectsModal.classList.add("modal-anim-transition");
    setModalClose(projectsModal);
};

var certificatesModal = document.getElementById("certificates-modal");
var certificatesBtn = document.getElementById("certificates-btn");

certificatesBtn.onclick = function () {
    certificatesModal.style.visibility = "visible";
    certificatesModal.classList.add("modal-anim-transition");
    setModalClose(certificatesModal);
};

var articlesModal = document.getElementById("articles-modal");
var articlesBtn = document.getElementById("articles-btn");

articlesBtn.onclick = function () {
    articlesModal.style.visibility = "visible";
    articlesModal.classList.add("modal-anim-transition");
    setModalClose(articlesModal);
};

var publicationsModal = document.getElementById("publications-modal");
var publicationsBtn = document.getElementById("publications-btn");

publicationsBtn.onclick = function () {
    publicationsModal.style.visibility = "visible";
    publicationsModal.classList.add("modal-anim-transition");
    setModalClose(publicationsModal);
};

var designsModal = document.getElementById("designs-modal");
var designsBtn = document.getElementById("designs-btn");

designsBtn.onclick = function () {
    designsModal.style.visibility = "visible";
    designsModal.classList.add("modal-anim-transition");
    setModalClose(designsModal);
};

function setModalClose(modal) {
    var span = modal.getElementsByClassName("modal-close")[0];
    span.onclick = function () {
        modal.classList.remove("modal-anim-transition");
        setTimeout(() => {
            modal.style.visibility = "hidden";
        }, 500);
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.classList.remove("modal-anim-transition");
            setTimeout(() => {
                modal.style.visibility = "hidden";
            }, 500);
        }
    };
}

// let name1 = {
//     firstname: "Savinu",
//     lastname: "vijay",
// };

// let printFullName = function (hometown, state) {
//     console.log(
//         this.firstname +
//             " " +
//             this.lastname +
//             " from " +
//             hometown +
//             ", " +
//             state
//     );
// };

// let printFullNameArrow = () => {
//     console.log(this.firstname + " " + this.lastname);
// };

// //printFullName.call(name1, "Kollam", "Kerala");
// //printFullName.apply(name1, ["Kollam", "Kerala"]);
// //printFullNameArrow.call(name1);

// let name2 = {
//     firstname: "Sachin",
//     lastname: "Tendulkar",
// };

// //printFullName.call(name2, "Mumbai", "Maharashtra");
// //printFullName.apply(name2, ["Mumbai", "Maharashtra"]);
// //printFullNameArrow.call(name2);

// let printMyName = printFullName.bind(name2, "Mumbai", "Maharashtra");
// //console.log(printMyName);
// //printMyName();
