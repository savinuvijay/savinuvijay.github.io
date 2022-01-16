let cards = document.getElementById("cards");
let dots = document.getElementById("dots");

const refreshBackground = () => {
    var value = window.scrollY;
    //cards.style.top = value * 0.25 + "px";
    dots.style.top = value * 0.25 + "px";
};

const throttle = (func) => {
    let flag = true;
    return () => {
        if (flag) {
            func();
            flag = false;
            window.requestAnimationFrame(() => {
                flag = true;
            });
        }
    };
};

// const throttle = (func, limit) => {
//     let flag = true;
//     return () => {
//         if (flag) {
//             func();
//             flag = false;
//             window.requestAnimationFrame(() => {
//                 flag = true;
//             });
//             // setTimeout(() => {
//             //     flag = true;
//             // }, limit);
//         }
//     };
// };

window.addEventListener("scroll", throttle(refreshBackground));
