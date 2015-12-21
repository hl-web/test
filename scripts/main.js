/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

    // Use this variable to set up the common and page specific functions. If you
    // rename this variable, you will also need to rename the namespace below.
    var Beelory = {
        // All pages
        'common': {
            init: function() {
                // JavaScript to be fired on all pages
                new WOW().init();
                FastClick.attach(document.body);
                $('.partner .owl-carousel').owlCarousel({
                    loop: true,
                    margin: 10,
                    nav: false,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        },
                        992: {
                            items: 5
                        },
                        1200: {
                            items: 6
                        }
                    }
                });
                var review = $('.review .owl-carousel');
                review.owlCarousel({
                    loop: true,
                    nav: false,
                    items: 1,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    animateOut: 'fadeOut',
                    animateIn: 'fadeIn'
                });
                $('.carousel-nav').on('click', '.prev', function() {
                    review.trigger('prev.owl.carousel');
                });
                $('.carousel-nav').on('click', '.next', function() {
                    review.trigger('next.owl.carousel');
                });
                $('.header').affix({
                    offset: {
                        top: 100,
                        bottom: function() {
                            return (this.bottom = $('.footer').outerHeight(true))
                        }
                    }
                });
                $('.our-team .owl-carousel').owlCarousel({
                    loop: true,
                    margin: 30,
                    nav: false,
                    responsive: {
                        0: {
                            items: 1
                        },
                        768: {
                            items: 3
                        },
                        992: {
                            items: 4
                        }
                    }
                });
                   $('.portfolio .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 1,
        dots: true,
         navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],

    });
     $('#portfolio1 .owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        items: 1,
        // dots: true,
         navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],

    });
            },
            finalize: function() {
                // JavaScript to be fired on all pages, after page specific JS is fired
                $('.loading').remove();
                var projectcount = new CountUp('projectcount', 10, 43);
                var workhours = new CountUp('workhours', 1000, 3600);
                var clientnum = new CountUp('clientnum', 50, 105);
                $(window).scroll(function() {
                    if ($('#projectcount').visible(true)) {
                        projectcount.start();
                    }
                    if ($('#workhours').visible(true)) {
                        workhours.start();
                    }
                    if ($('#clientnum').visible(true)) {
                        clientnum.start();
                    }
                    if ($('.skill').visible(true)) {
                        $('.progress-bar').each(function() {
                            var el = $(this);
                            el.css('width', el.data('percentage') + '%');
                        });
                    }
                });
            }
        },
        // Home page
        'home': {
            init: function() {
                // JavaScript to be fired on the home page
            },
            finalize: function() {
                // JavaScript to be fired on the home page, after the init JS

            }
        },
        // About us page, note the change from about-us to about_us.
        'about_us': {
            init: function() {
                // JavaScript to be fired on the about us page
            }
        }
    };

    // The routing fires all common scripts, followed by the page specific scripts.
    // Add additional events for more control over timing e.g. a finalize event
    var UTIL = {
        fire: function(func, funcname, args) {
            var fire;
            var namespace = Beelory;
            funcname = (funcname === undefined) ? 'init' : funcname;
            fire = func !== '';
            fire = fire && namespace[func];
            fire = fire && typeof namespace[func][funcname] === 'function';

            if (fire) {
                namespace[func][funcname](args);
            }
        },
        loadEvents: function() {
            // Fire common init JS
            UTIL.fire('common');

            // Fire page-specific init JS, and then finalize JS
            $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
                UTIL.fire(classnm);
                UTIL.fire(classnm, 'finalize');
            });

            // Fire common finalize JS
            UTIL.fire('common', 'finalize');
        }
    };

    // Load Events
    $(document).ready(UTIL.loadEvents);



})(jQuery); // Fully reference jQuery after this point.
