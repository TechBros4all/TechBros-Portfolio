//Navbar Active
var navBar = document.querySelector(".navbar");
var links = document.querySelectorAll(".links a");
var progressValues = [100, 90, 70, 50, 30];
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", () => {
        let name = links[i].innerHTML.toLowerCase();
        let page = document.getElementById(`${name}`);
        if (page) page.scrollIntoView();
        else return;

    })
}

//Services Spacing
let space = 10

window.onload = servicesBoxSpacing(space);

window.addEventListener("resize", () => {
    servicesBoxSpacing(space)
})

function servicesBoxSpacing(margin = 0) {
    var servicesBox = document.querySelectorAll(".services-box");
    var service = document.querySelectorAll(".service");
    let width = servicesBox[0].clientWidth;
    let spacing = 0;
    let delay = 0;
    for (let i = 0; i < servicesBox.length; i++) {
        // service[i].style.transitionDelay = `${delay}s`
        servicesBox[i].style.left = `${spacing}px`;
        spacing += (width + margin);
        delay += 0.4;
    }
}


//Scroll Animations
$(window).ready(function () {
    AOS.init({
        duration: 500,
        easing: "ease-in-out",
        once: true,
        mirror: false,
        delay: 0
    });
});
//animate progress bars
const progress = () => {
    for (let i = 0; i < progressValues.length; i++) {
        let currentProgress = $(".progress-bar")[i];
        $(currentProgress).css('width', `${progressValues[i]}%`);
    }
}
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(document).scrollTop() > 10) {
            $(".navbar").addClass("scrolled");
        } else {
            $(".navbar").removeClass("scrolled");
        }
        // Get current scroll position
        var scrollPosition = $(window).scrollTop();

        // Loop through all sections to find the one in view
        $('section').each(function () {
            var sectionTop = $(this).offset().top - 300;
            var sectionBottom = sectionTop + $(this).outerHeight();
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Update navbar link for current active section
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + $(this).attr('id') + '"]').addClass('active');
                //animate progress-bars
                if ($(this).attr("class").includes("progress-bar-container")) {
                    progress();
                }
            }
        });
    });
});

;
//Cursor follow mouse

var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

new PureCounter();
// cursor.init();