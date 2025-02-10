const easingFunctions = {
    easeInOutQuint: function (t) {
        const t1 = t - 1;
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * t1 * t1 * t1 * t1 * t1;
    },
    easeInOutExpo: function (t) {
        if (t === 0 || t === 1) return t;
        const scaledTime = t * 2;
        const scaledTime1 = scaledTime - 1;
        return scaledTime < 1
            ? 0.5 * Math.pow(2, 10 * scaledTime1)
            : 0.5 * (-Math.pow(2, -10 * scaledTime1) + 2);
    },
};

// Function to animate opacity
function animateOpacity(element, duration, easingName) {
    const start = performance.now();
    const easeFunction = easingFunctions[easingName] || easingFunctions.easeInOutQuint;

    function step(timestamp) {
        const elapsed = (timestamp - start) / duration;
        const t = Math.min(elapsed, 1);
        element.style.opacity = easeFunction(t);

        if (t < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Apply easing on page load
window.onload = function () {
    setTimeout(function(){
        const body = document.body;
        animateOpacity(body, 1500, "easeInOutQuint"); // Change easing here
    }, 600);
};