const bgImage = new Image();
bgImage.src = 'background.png';

const starsImage = new Image();
starsImage.src = 'stars.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

Promise.all([
    new Promise(resolve => bgImage.addEventListener('load', resolve)),
    new Promise(resolve => starsImage.addEventListener('load', resolve)),
]).then(() => {
    const bgRatio = bgImage.width / bgImage.height;
    const bgWidth = Math.min(canvas.width * 0.8, canvas.height * 0.9 * bgRatio);
    const bgHeight = bgWidth / bgRatio;

    const starsRatio = starsImage.width / starsImage.height;
    const starsWidth = Math.min(canvas.width * 0.2, canvas.height * 0.3 * starsRatio);
    const starsHeight = starsWidth / starsRatio;

    let bgXOffset = 0;
    let bgYOffset = 0;
    let starsXOffset = 0;
    let starsYOffset = 0;
    let scrollPosition = window.scrollY;

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let x = (bgXOffset % bgWidth - bgWidth); x < canvas.width; x += bgWidth) {
            for (let y = (bgYOffset % bgHeight - bgHeight); y < canvas.height; y += bgHeight) {
                context.drawImage(bgImage, x, y, bgWidth, bgHeight);
            }
        }

        for (let x = (starsXOffset % starsWidth - starsWidth); x < canvas.width; x += starsWidth) {
            for (let y = (starsYOffset % starsHeight - starsHeight); y < canvas.height; y += starsHeight) {
                context.drawImage(starsImage, x, y, starsWidth, starsHeight);
            }
        }

        bgXOffset -= 0.1;
        starsXOffset -= 0.2;

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener('scroll', function (e) {
        const delta = window.scrollY - scrollPosition;
        if (delta > 0) {
            bgYOffset -= delta * 0.04;
            starsYOffset -= delta * 0.05;
        } else {
            bgYOffset -= delta * 0.04;
            starsYOffset -= delta * 0.05;
        }
        scrollPosition = window.scrollY;
    });


});
const sections = document.querySelectorAll(".section");

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        el.offsetTop < window.pageYOffset + window.innerHeight - el.offsetHeight * 0.1 &&
        el.offsetTop + el.offsetHeight > window.pageYOffset

    );
}

function showVisibleContainers() {
    sections.forEach((section) => {
        const container = section.querySelector(".container");
        if (isElementInViewport(section)) {
            container.classList.add("show");
        } else {
            container.classList.remove("show");
        }
    });
}

window.addEventListener("scroll", showVisibleContainers);
