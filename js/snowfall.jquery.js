// Snow Fall
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
(function($) {
    $.snowfall = function(element, options) {
        var defaults = {
                snow: '❄',
                flakeCount: 35,
                flakeColor: '#ffffff',
                flakePosition: 'absolute',
                flakeIndex: 999999,
                minSize: 1,
                maxSize: 2,
                minSpeed: 1,
                maxSpeed: 5,
                round: false,
                shadow: false,
                collectionHeight: 40,
                deviceorientation: false
            },
            options = $.extend(defaults, options),
            random = function random(min, max) {
                return Math.round(min + Math.random() * (max - min));
            };
        $(element).data("snowfall", this);

        function Flake(_x, _y, _size, _speed, _id) {
                this.id = _id;
                this.x = _x;
                this.y = _y;
                this.size = _size;
                this.speed = _speed;
                this.step = 0;
                this.stepSize = random(1, 10) / 100;
                var flakeMarkup = null;
                if (options.image) {
                    flakeMarkup = $(document.createElement("img"));
                    flakeMarkup[0].src = options.image;
                } else {
                    flakeMarkup = $(document.createElement("div"));
                    flakeMarkup.text(options.snow);
                }
                flakeMarkup.attr({
                    'class': 'snowfall-flakes',
                    'id': 'flake-' + this.id
                }).css({
                    'width': this.size,
                    'height': this.size,
                    'position': options.flakePosition,
                    'top': this.y,
                    'left': this.x,
                    'fontSize': this.size,
                    'zIndex': options.flakeIndex
                });
                if ($(element).get(0).tagName === $(document).get(0).tagName) {
                    $('body').append(flakeMarkup);
                    element = $('body');
                } else {
                    $(element).append(flakeMarkup);
                }
                this.element = document.getElementById('flake-' + this.id);
                this.update = function() {
                    this.y += this.speed;
                    if (this.y > (elHeight) - (this.size + 6)) {
                        this.reset();
                    }
                    this.element.style.top = this.y + 'px';
                    this.element.style.left = this.x + 'px';
                    this.step += this.stepSize;
                    if (doRatio === false) {
                        this.x += Math.cos(this.step);
                    } else {
                        this.x += (doRatio + Math.cos(this.step));
                    }
                    if (this.x > (elWidth) - widthOffset || this.x < widthOffset) {
                        this.reset();
                    }
                }
                this.reset = function() {
                    this.y = 0;
                    this.x = random(widthOffset, elWidth - widthOffset);
                    this.stepSize = random(1, 10) / 100;
                    this.size = random((options.minSize * 100), (options.maxSize * 100)) / 100;
                    this.speed = random(options.minSpeed, options.maxSpeed);
                }
            }
        var flakes = [],
            flakeId = 0,
            i = 0,
            elHeight = $(element).height(),
            elWidth = $(element).width(),
            widthOffset = 0,
            snowTimeout = 0;
        if ($(element).get(0).tagName === $(document).get(0).tagName) {
            widthOffset = 25;
        }
        $(window).bind("resize", function() {
            elHeight = $(element)[0].clientHeight;
            elWidth = $(element)[0].offsetWidth;
        });
        for (i = 0; i < options.flakeCount; i += 1) {
            flakeId = flakes.length;
            flakes.push(new Flake(random(widthOffset, elWidth - widthOffset), random(0, elHeight), random((options.minSize * 100), (options.maxSize * 100)) / 100, random(options.minSpeed, options.maxSpeed), flakeId));
        }
        if (options.round) {
            $('.snowfall-flakes').css({
                '-moz-border-radius': options.maxSize,
                '-webkit-border-radius': options.maxSize,
                'border-radius': options.maxSize
            });
        }
        if (options.shadow) {
            $('.snowfall-flakes').css({
                '-moz-box-shadow': '1px 1px 1px #555',
                '-webkit-box-shadow': '1px 1px 1px #555',
                'box-shadow': '1px 1px 1px #555'
            });
        }
        var doRatio = false;
        if (options.deviceorientation) {
            $(window).bind('deviceorientation', function(event) {
                doRatio = event.originalEvent.gamma * 0.1;
            });
        }

        function snow() {
            for (i = 0; i < flakes.length; i += 1) {
                flakes[i].update();
            }
            snowTimeout = requestAnimationFrame(function() {
                snow()
            });
        }
        snow();
        this.clear = function() {
            $(element).children('.snowfall-flakes').remove();
            flakes = [];
            cancelAnimationFrame(snowTimeout);
        }
    };
    $.fn.snowfall = function(options) {
        if (typeof(options) == "object" || options == undefined) {
            return this.each(function(i) {
                (new $.snowfall(this, options));
            });
        } else if (typeof(options) == "string") {
            return this.each(function(i) {
                var snow = $(this).data('snowfall');
                if (snow) {
                    snow.clear();
                }
            });
        }
    };
})(jQuery);