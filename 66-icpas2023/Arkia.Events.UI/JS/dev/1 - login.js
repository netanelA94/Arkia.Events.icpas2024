$(function () {
    if ($('#RGS01').exists()) {
        ARKIA.LOGIN.init();
    }
});

ARKIA.LOGIN = {

    init: function () {
        $('input').keypress(function (e) {
            if (e.which == 13) {
                return false;
            }
        });
        $('input[id$="txtID"]').keyfilter(/[0-9]/i);
        //$('input[id$="txtLicense"]').keyfilter(/[0-9]/i);
        $('.txtLogin:first').focus();
        $('.close').attr('aria-label', MSG426);

        $('a[id$="btnContinue"]').click(ARKIA.LOGIN.onContinue);
        sessionStorage.clear();

        var years = new Array();
        var monthes = new Array();
        var days = new Array();

        var currentYear = new Date().getFullYear();
        var j = 0;
        for (var i = (currentYear - 12); i > currentYear - 88; i--) {
            years[j] = i;
            j++;
        }

        for (var i = 1; i < 13; i++) {
            monthes[i - 1] = i;
        }
        for (var i = 1; i < 32; i++) {
            days[i - 1] = i;
        }



        $.each(years, function (key, value) {
            $(".ddlYears")
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });

        $.each(monthes, function (key, value) {
            $(".ddlMonthes")
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });

        $.each(days, function (key, value) {
            $(".ddlDays")
                .append($("<option></option>")
                    .attr("value", value)
                    .text(value));
        });




        //todelete for dev
        if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.84.25") > -1) {
            $('input[id$="txtID"]').val(036038099);
            $('input[id$="txtLicense"]').val(23985);
            $(".ddlDays").val("4");
            $(".ddlMonthes").val("11");
            $(".ddlYears").val("1979");
        }



    },
    onContinue: function () {
        var isError = false;
        $(".inputError").removeClass("inputError");
        $(".msgBox").css('display', 'none');
        var errors = new Array();

        var englishRE = /^[a-zA-Z\ ]*$/;
        var hebrewRE = /^[א-ת\ ]*$/;
        var numberRE = /^[0-9]*$/;

       // optional validation for id with space
        //$('input[id$="txtID"]').val($('input[id$="txtID"]').val().replace(/\s/g, '')); 
        if (!ARKIA.VALIDATE.validateID($.trim($('input[id$="txtID"]').val()))) {
            errors[errors.length] = MSG45;
            $('input[id$="txtID"]').addClass('inputError');
            isError = true;
        }
        //if ($.trim($('input[id$="txtLicense"]').val()).length === 0) {
        //    $('input[id$="txtLicense"]').addClass('inputError');
        //    errors[errors.length] = MSG123;
        //    isError = true;
        //}

        //lpad
       
        var pad = "000000000";
        $('input[id$="txtID"]').val((pad + $('input[id$="txtID"]').val()).slice(-pad.length));
       

        var yearObj = $(".ddlYears option:selected");
        var monthObj = $(".ddlMonthes option:selected");
        var dayObj = $(".ddlDays option:selected");

        if (yearObj.val() < '0' || monthObj.val() < '0' || dayObj.val() < '0') {
            isError = true;
            if (yearObj.val() < '0') {
                yearObj.addClass('inputError');
            }
            if (monthObj.val() < '0') {
                monthObj.addClass('inputError');
            }
            if (dayObj.val() < '0') {
                dayObj.addClass('inputError');
            }
            errors[errors.length] = MSG123;
        }
        else if (ARKIA.COMMON.isNotLogicalDate(dayObj.children(':selected').text(), monthObj.children(':selected').text())) {  //|| !ARKIA.COMMON.isFutureDate6Month(dayObj.children(':selected').text(), monthObj.children(':selected').text(), yearObj.children(':selected').text())) {
            isError = true;
            dayObj.addClass('inputError');
            monthObj.addClass('inputError');
            errors[errors.length] = MSG123;
        }

        if (dayObj.children(':selected').text() >= 29 && monthObj.children(':selected').text() == 2) {
            if (ARKIA.COMMON.isNotLogicalFeb29(dayObj.children(':selected').text(), yearObj.children(':selected').text())) {
                isError = true;
                dayObj.addClass('inputError');
                monthObj.addClass('inputError');
                errors[errors.length] = MSG123;
            }
        }


        if (isError) {
            $('.close', $(".msgBox")).click(function () {
                $(".msgBox").fadeOut("normal");
                $('.actionBar .content').attr('tabindex', '-1');
                return false;
            });
            ARKIA.COMMON.showMessageBox(errors);
            var pageWidth = $(window).width();
            if (pageWidth > 1024) {
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.keyCode == 9 && !e.shiftKey) {
                        $('.inputError:first').focus();
                        e.preventDefault();
                    }
                });
            }
            else {
                $('.actionBar .content').removeAttr('role');
                setTimeout(function () {
                    $('.actionBar .content').attr('role', 'alert');
                    $('.actionBar .content').focus();
                }, 100);
                setTimeout(function () {
                    $('.inputError:first').focus();
                }, 5000);

            }
            return false;
        }
        sessionStorage.setItem('CustomerID', $.trim($('input[id$="txtID"]').val()));
        var YEAR = yearObj.val();
        var MONTH = monthObj.val();
        var DAY = dayObj.val();
        var DOB = (DAY < 10 ? '0' + DAY : DAY) + '/' + (MONTH < 10 ? '0' + MONTH : MONTH) + '/' + YEAR;
        $('input[id$="hfDob"]').val(DOB);
    }

};
