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
function animateOpacity(elements, duration, easingName) {
    const easeFunction = easingFunctions[easingName] || easingFunctions.easeInOutQuint;

    // Ensure it's always an array (even if a single element)
    elements = elements instanceof NodeList ? Array.from(elements) : [elements];

    elements.forEach((element) => {
        const start = performance.now();

        function step(timestamp) {
            const elapsed = (timestamp - start) / duration;
            const t = Math.min(elapsed, 1);
            element.style.opacity = easeFunction(t);

            if (t < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    });
}

window.onload = function () {
    setTimeout(function(){
        const logo = document.querySelector("#AxiomLogo");
        animateOpacity(logo, 1500, "easeInOutQuint");
    }, 100);
    
    setTimeout(function(){
        const content = document.querySelectorAll("#content, #ExperimentalLogo");
        animateOpacity(content, 1500, "easeInOutQuint");
    }, 2100);
};