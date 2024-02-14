/*
* This plugin filters keyboard input by specified regular expression.
* Version 1.8
* $Id$
*
* Source code inspired by Ext.JS (Ext.form.TextField, Ext.EventManager)
*
* Procedural style:
* $('#ggg').keyfilter(/[\dA-F]/);
* Also you can pass test function instead of regexp. Its arguments:
* this - HTML DOM Element (event target).
* c - String that contains incoming character.
* $('#ggg').keyfilter(function(c) { return c != 'a'; });
*
* Class style:
* <input type="text" class="mask-num" />
*
* Available classes:
* mask-pint:     /[\d]/
* mask-int:      /[\d\-]/
* mask-pnum:     /[\d\.]/
* mask-money     /[\d\.\s,]/
* mask-num:      /[\d\-\.]/
* mask-hex:      /[0-9a-f]/i
* mask-email:    /[a-z0-9_\.\-@]/i
* mask-alpha:    /[a-z_]/i
* mask-alphanum: /[a-z0-9_]/i
*/

(function ($) {
    // $.browser fallback for jQuery 1.9+.
    if ($.browser === undefined) {
        $.browser = (function () {
            var ua_match = function (ua) {
                ua = ua.toLowerCase();
                var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
                                /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
                                /(msie) ([\w.]+)/.exec(ua) ||
                                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
                                [];

                return { browser: match[1] || "", version: match[2] || "0" };
            },
                        matched = ua_match(navigator.userAgent),
                        browser = {};

            if (matched.browser) {
                browser[matched.browser] = true;
                browser.version = matched.version;
            }

            if (browser.chrome) {
                browser.webkit = true;
            } else if (browser.webkit) {
                browser.safari = true;
            }
            return browser;
        })();
    }

    var defaultMasks = {
        pint: /[\d]/,
        'int': /[\d\-]/,
        pnum: /[\d\.]/,
        money: /[\d\.\s,]/,
        num: /[\d\-\.]/,
        hex: /[0-9a-f]/i,
        email: /[a-z0-9_\.\-@]/i,
        alpha: /[a-z_]/i,
        alphanum: /[a-z0-9_]/i
    };

    var Keys = {
        TAB: 9,
        RETURN: 13,
        ESC: 27,
        BACKSPACE: 8,
        DELETE: 46
    };

    // safari keypress events for special keys return bad keycodes
    var SafariKeys = {
        63234: 37, // left
        63235: 39, // right
        63232: 38, // up
        63233: 40, // down
        63276: 33, // page up
        63277: 34, // page down
        63272: 46, // delete
        63273: 36, // home
        63275: 35  // end
    };

    var isNavKeyPress = function (e) {
        var k = e.keyCode;
        k = $.browser.safari ? (SafariKeys[k] || k) : k;
        return (k >= 33 && k <= 40) || k == Keys.RETURN || k == Keys.TAB || k == Keys.ESC;
    };

    var isSpecialKey = function (e) {
        var k = e.keyCode;
        var c = e.charCode;
        return k == 9 || k == 13 || k == 27 ||
                        k == 16 || k == 17 ||
                        (k >= 18 && k <= 20) ||
                        ($.browser.opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)))
                        ;

    };

    /**
    * Returns a normalized keyCode for the event.
    * @return {Number} The key code
    */
    var getKey = function (e) {
        var k = e.keyCode || e.charCode;
        return $.browser.safari ? (SafariKeys[k] || k) : k;
    };

    var getCharCode = function (e) {
        return e.charCode || e.keyCode || e.which;
    };

    $.fn.keyfilter = function (re) {
        return this.keypress(function (e) {
            if (e.ctrlKey || e.altKey) {
                return;
            }
            var k = getKey(e);
            if ($.browser.mozilla && (isNavKeyPress(e) || k == Keys.BACKSPACE || (k == Keys.DELETE && e.charCode == 0))) {
                return;
            }
            var c = getCharCode(e), cc = String.fromCharCode(c), ok = true;
            if (!$.browser.mozilla && (isSpecialKey(e) || !cc)) {
                return;
            }
            if ($.isFunction(re)) {
                ok = re.call(this, cc);
            }
            else {
                ok = re.test(cc);
            }
            if (!ok) {
                e.preventDefault();
            }
        });
    };

    $.extend($.fn.keyfilter, {
        defaults: {
            masks: defaultMasks
        },
        version: 1.7
    });

    $(document).ready(function () {
        var tags = $('input[class*=mask],textarea[class*=mask]');
        for (var key in $.fn.keyfilter.defaults.masks) {
            tags.filter('.mask-' + key).keyfilter($.fn.keyfilter.defaults.masks[key]);
        }
    });

})(jQuery);




/**
* @license 
* jQuery Tools @VERSION Overlay - Overlay base. Extend it.
* 
* NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
* 
* http://flowplayer.org/tools/overlay/
*
* Since: March 2008
* Date: @DATE 
*/
(function ($) {

    // static constructs
    $.tools = $.tools || { version: '@VERSION' };

    $.tools.overlay = {

        addEffect: function (name, loadFn, closeFn) {
            effects[name] = [loadFn, closeFn];
        },

        conf: {
            close: null,
            closeOnClick: true,
            closeOnEsc: true,
            closeSpeed: 'fast',
            effect: 'default',

            // since 1.2. fixed positioning not supported by IE6
            fixed: !/msie/.test(navigator.userAgent.toLowerCase()) || navigator.appVersion > 6,

            left: 'center',
            load: false, // 1.2
            mask: null,
            oneInstance: true,
            speed: 'normal',
            target: null, // target element to be overlayed. by default taken from [rel]
            top: '10%'
        }
    };


    var instances = [], effects = {};

    // the default effect. nice and easy!
    $.tools.overlay.addEffect('default',

    /* 
    onLoad/onClose functions must be called otherwise none of the 
    user supplied callback methods won't be called
    */
		function (pos, onLoad) {

		    var conf = this.getConf(),
				 w = $(window);

		    if (!conf.fixed) {
		        pos.top += w.scrollTop();
		        pos.left += w.scrollLeft();
		    }

		    pos.position = conf.fixed ? 'fixed' : 'absolute';
		    this.getOverlay().css(pos).fadeIn(conf.speed, onLoad);

		}, function (onClose) {
		    this.getOverlay().fadeOut(this.getConf().closeSpeed, onClose);
		}
	);


    function Overlay(trigger, conf) {

        // private variables
        var self = this,
			 fire = trigger.add(self),
			 w = $(window),
			 closers,
			 overlay,
			 opened,
			 maskConf = $.tools.expose && (conf.mask || conf.expose),
			 uid = Math.random().toString().slice(10);


        // mask configuration
        if (maskConf) {
            if (typeof maskConf == 'string') { maskConf = { color: maskConf }; }
            maskConf.closeOnClick = maskConf.closeOnEsc = false;
        }

        // get overlay and trigger
        var jq = conf.target || trigger.attr("rel");
        overlay = jq ? $(jq) : null || trigger;

        // overlay not found. cannot continue
        if (!overlay.length) { throw "Could not find Overlay: " + jq; }

        // trigger's click event
        if (trigger && trigger.index(overlay) == -1) {
            trigger.click(function (e) {
                self.load(e);
                return e.preventDefault();
            });
        }

        // API methods  
        $.extend(self, {

            load: function (e) {

                // can be opened only once
                if (self.isOpened()) { return self; }

                // find the effect
                var eff = effects[conf.effect];
                if (!eff) { throw "Overlay: cannot find effect : \"" + conf.effect + "\""; }

                // close other instances?
                if (conf.oneInstance) {
                    $.each(instances, function () {
                        this.close(e);
                    });
                }

                // onBeforeLoad
                e = e || $.Event();
                e.type = "onBeforeLoad";
                fire.trigger(e);
                if (e.isDefaultPrevented()) { return self; }

                // opened
                opened = true;

                // possible mask effect
                if (maskConf) { $(overlay).expose(maskConf); }

                // position & dimensions 
                var top = conf.top,
					 left = conf.left,
					 oWidth = overlay.outerWidth(true),
					 oHeight = overlay.outerHeight(true);

                if (typeof top == 'string') {
                    top = top == 'center' ? Math.max((w.height() - oHeight) / 2, 0) :
						parseInt(top, 10) / 100 * w.height();
                }

                if (left == 'center') { left = Math.max((w.width() - oWidth) / 2, 0); }


                // load effect  		 		
                eff[0].call(self, { top: top, left: left }, function () {
                    if (opened) {
                        e.type = "onLoad";
                        fire.trigger(e);
                    }
                });

                // mask.click closes overlay
                if (maskConf && conf.closeOnClick) {
                    $.mask.getMask().one("click", self.close);
                }

                // when window is clicked outside overlay, we close
                if (conf.closeOnClick) {
                    $(document).on("click." + uid, function (e) {
                        if (!$(e.target).parents(overlay).length) {
                            self.close(e);
                        }
                    });
                }

                // keyboard::escape
                if (conf.closeOnEsc) {

                    // one callback is enough if multiple instances are loaded simultaneously
                    $(document).on("keydown." + uid, function (e) {
                        if (e.keyCode == 27) {
                            self.close(e);
                        }
                    });
                }


                return self;
            },

            close: function (e) {

                if (!self.isOpened()) { return self; }

                e = e || $.Event();
                e.type = "onBeforeClose";
                fire.trigger(e);
                if (e.isDefaultPrevented()) { return; }

                opened = false;

                // close effect
                effects[conf.effect][1].call(self, function () {
                    e.type = "onClose";
                    fire.trigger(e);
                });

                // unbind the keyboard / clicking actions
                $(document).off("click." + uid + " keydown." + uid);

                if (maskConf) {
                    $.mask.close();
                }

                return self;
            },

            getOverlay: function () {
                return overlay;
            },

            getTrigger: function () {
                return trigger;
            },

            getClosers: function () {
                return closers;
            },

            isOpened: function () {
                return opened;
            },

            // manipulate start, finish and speeds
            getConf: function () {
                return conf;
            }

        });

        // callbacks	
        $.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (i, name) {

            // configuration
            if ($.isFunction(conf[name])) {
                $(self).on(name, conf[name]);
            }

            // API
            self[name] = function (fn) {
                if (fn) { $(self).on(name, fn); }
                return self;
            };
        });

        // close button
        closers = overlay.find(conf.close || ".close");

        if (!closers.length && !conf.close) {
            closers = $('<a class="close"></a>');
            overlay.prepend(closers);
        }

        closers.click(function (e) {
            self.close(e);
        });

        // autoload
        if (conf.load) { self.load(); }

    }

    // jQuery plugin initialization
    $.fn.overlay = function (conf) {

        // already constructed --> return API
        var el = this.data("overlay");
        if (el) { return el; }

        if ($.isFunction(conf)) {
            conf = { onBeforeLoad: conf };
        }

        conf = $.extend(true, {}, $.tools.overlay.conf, conf);

        this.each(function () {
            el = new Overlay($(this), conf);
            instances.push(el);
            $(this).data("overlay", el);
        });

        return conf.api ? el : this;
    };

})(jQuery);


