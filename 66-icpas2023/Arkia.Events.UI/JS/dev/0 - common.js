/*============================================================================================*/
/* 1.EXPAND JQUERY FUNCTIONALITY                                                              */
/*============================================================================================*/
jQuery.fn.exists = function () {
    return this.length > 0;
};

var errorValues = [];
var errorPage = "./error";
var paymentPage = "payment";
var closeErrorPage = "./close-error";

/*============================================================================================*/
/* APPLICATION GLOBAL VARIABLE: this is the "namespace" for all the js related actions        */
/*============================================================================================*/
var ARKIA = {
    COMMON: {
        /*
        check if browser version is ie and if it is ie8
        -------------------------------------------------------------------------------------*/
        isIE8: function () {
            return ($.browser.msie && parseInt($.browser.version, 10) < 9);
        },
        showMessageBox: function (errors) {
            $(".msgBox .content").empty();
            var errList = '<ul>';
            $.each(errors, function (errNum) {
                errList += '<li>' + errors[errNum] + '</li>';
            });
            (errList + '</ul>');
            $(".msgBox .content").html(errList);
            $(".bodyMain .msgBox").css('display', 'block');

        },
        /*----------------------------------------------------------------------------------------------------------------*/
        isNotLogicalDate: function (d, m) {
            d = parseInt(d, 10);
            m = parseInt(m, 10);
            return ((m == 4 || m == 6 || m == 9 || m == 11) && d == 31);
        },
        /*----------------------------------------------------------------------------------------------------------------*/
        isNotLogicalFeb29: function (d, y) {
            var isleap = (y % 4 == 0 && (y % 100 != 0 || y % 400 == 0));
            return (d > 29 || (d == 29 && !isleap));
        },
        log: function (m) {
            try {
                console.log(m);
            }
            catch (e) { }
        },
        /*----------------------------------------------------------------------------------------------------------------*/
        isFutureDate: function (d, m, y) {
            var date = new Date(y, m - 1, d, 0, 0, 0, 0);
            return (date > new Date());
        },
        isFutureDate6Month: function (d, m, y) {
            var date = new Date(y, m - 1, d, 0, 0, 0, 0);
            var x = 6; //or whatever offset
            var CurrentDate = new Date();
            CurrentDate.setMonth(CurrentDate.getMonth() + x);
            return (date > CurrentDate);
        },
       
        /*
        get dialogs/modals overlay:
        -------------------------------------------------------------------------------------*/
        getOverlay: function (elm, settings) {
            var defaults = {
                color: '#213154',
                speed: 500,
                opacity: 0.5,
                close: 'geekster',
                closeOnClick: false,
                closeOnEsc: false,
                closeSpeed: 0,
                onBeforeClose: null,
                load: false,
                effect: 'default'
            };
            var settings = $.extend(defaults, settings);

            $(elm).overlay(
            {
                mask: {
                    color: settings.color,
                    loadSpeed: settings.speed,
                    opacity: settings.opacity
                },
                close: settings.closeClass,
                closeOnClick: settings.closeOnClick,
                closeOnEsc: settings.closeOnEsc,
                closeSpeed: settings.closeSpeed,
                onBeforeClose: settings.onBeforeClose,
                load: settings.load,
                effect: settings.effect
            });
            $(elm).data("overlay").load();
        },
        /*
        close dialogs/modals overlay:
        -------------------------------------------------------------------------------------*/
        closeOverlay: function (elm) {
            $(elm).overlay().close();
        }
    },
    VALIDATE: {
        RE_EMAIL: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)/,
        RE_VALID_PHONE_COUNTRY: /^[0-9]{1,3}$/,
        RE_VALID_PHONE_AREA: /^[0-9]{1,3}$/,
        RE_VALID_PHONE_NUM: /^[0-9]{7}$/,
        RE_PASS_LEN: /^.{6,32}/,
        RE_WS: /\S/,
        //validate israeli id number
        validateID: function (id) {
            if (id.length > 0) {
                var sum = 0;
                var p = 2;
                for (var i = id.length - 2; i >= 0; i--) {
                    var number = p * parseInt(id.toString().charAt(i).toString());
                    sum += parseInt(number / 10) + parseInt(number % 10);
                    p = p == 2 ? 1 : 2;
                }
                var checkDigit = parseInt(id.toString().charAt(id.length - 1).toString());
                return ((checkDigit + sum) % 10 == 0);
            }
            return false;
        },
        isValidPhone: function (phone) {
            //fix for default value problem
            phone[3] = $.trim(phone[3]);
            var flag = true,
            RE_VALID_PHONE_COUNTRY = /^[0-9]{2,3}/,
            RE_VALID_PHONE_AREA = /^[0-9]{1,3}/,
            RE_VALID_PHONE_NUM = /^[0-9]{7}/;
            if (!RE_VALID_PHONE_NUM.test(phone[1]) || !RE_VALID_PHONE_AREA.test(phone[2]) || !RE_VALID_PHONE_COUNTRY.test(phone[3])) {
                flag = false;
            }
            return flag;
        }
    }
};




Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
    c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
