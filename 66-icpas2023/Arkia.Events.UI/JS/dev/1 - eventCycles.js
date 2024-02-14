$(function () {
    if ($('#RGS02').exists()) {
        ARKIA.RGS02.init();
    }
});

ARKIA.RGS02 = {

    init: function () {
        $('input').keypress(function (e) {
            if (e.which == 13) {
                return false;
            }
        });

        $('input[id$="txtRoommate1Area_code"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate2Area_code"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate1Phone"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate2Phone"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate1Name"]').keyfilter(/[א-תa-zA-Z\ ]/i);
        $('input[id$="txtRoommate2Name"]').keyfilter(/[א-תa-zA-Z\ ]/i);
        $('input[id$="txtRoommate1Id"]').keyfilter(/[0-9]/i);
        $('input[id$="txtRoommate2Id"]').keyfilter(/[0-9]/i);
        $('input[id*="rbCycle"]').attr('title', MSG435);
        $('.roommateArea_code').attr("aria-label", MSG434);
        $('.close').attr('aria-label', MSG426);
        $('input[type="radio"]').attr('name', 'rbLaps');
        $('input[type="radio"]:disabled').attr('aria-disabled', 'true');
        $('a[id$="btnContinue"]').bind('click', ARKIA.RGS02.onContinue);

        //var cycleID = sessionStorage.getItem('cycleID');
        //if (cycleID) {
        //    $("input[name = 'rbLaps']").eq(cycleID - 1).attr("checked", "true");
        //    //$('[id$="txtRoommate1Name"]').val(sessionStorage.getItem('Roomate1Name'));
        //    //$('[id$="txtRoommate1Id"]').val(sessionStorage.getItem('Roomate1Id'));
        //    if (cycleID == '2') {
        //        $(".roommatesRow").show();
        //        //$('[id$="txtRoommate2Name"]').val(sessionStorage.getItem('Roomate2Name'));
        //        //$('[id$="txtRoommate2Id"]').val(sessionStorage.getItem('Roomate2Id'));
        //    }
        //}
        //if (window.location.href.indexOf("dev") > -1 || window.location.href.indexOf("192.168.95") > -1) {
        //    $('input[id$="txtRoommate1Name"]').val("test");
        //    $('input[id$="txtRoommate1Phone"]').val("203807490");
        //    $("input[name = 'rbLaps']:first").attr("checked", "true");
        //    $(".roommatesRow.rr1").show();
        //}
        if ($(".bodyMain.ltr").length) {
            $(".phoneWrapper").attr("dir", "rtl");
        }

        $(".lapWrapper li:has(.aspNetDisabled) .lapName").attr("style", "color: red");

        //$("input[name = 'rbLaps']").change(function () {
        //    var cycle_id = $("input[name='rbLaps']:checked").parent().attr('data-cycleid');
        //    sessionStorage.setItem('cycleID', cycle_id);
        //    if (cycle_id == "1") {
        //        $(".roommatesRow.rr2").hide();
        //    }
        //    else {
        //        $(".roommatesRow").show();
        //    }
        //});
        //$(".ddlRoommates").change(function () {
        //    if ($(this).val() == 0) {
        //        $(".roommatesRow").hide();
        //    }
        //    else {
        //        if ($(this).val() == 1) {
        //            $(".roommatesRow.rr1").show();
        //            $(".roommatesRow.rr2").hide();
        //        }
        //        else {
        //            $(".roommatesRow").show();
        //        }
        //    }

        //});

        $(".roommateClear").click(function () {
            $(".roommatesRow input").val('');
            $(".IdNoExists").css("display", "none");
        });
        $(".roommateClear").keydown(function (e) {
            if (e.keyCode == 13) {
                $(".roommatesRow input").val('');
                $(".IdNoExists").css("display", "none");
            }
        });
    },
    onContinue: function () {
        var isError = false;
        var englishRE = /^[a-zA-Z\ ]*$/;
        var hebrewRE = /^[א-ת\ ]*$/;
        var numberRE = /^[0-9]*$/;



        $(".inputError").removeClass("inputError");
        $(".msgBox").css('display', 'none');
        var errors = new Array();
        if (!$("input[name='rbLaps']:checked").val()) {
            errors[errors.length] = MSG39;
            $("input[name = 'rbLaps']").addClass('inputError');
            $('.close', $(".msgBox")).click(function () {
                $(".msgBox").fadeOut("normal");

            });
            isError = true;

        }
        //name
        if ($('[id$="txtRoommate1Name"]:visible').length && $.trim($('[id$="txtRoommate1Name"]').val()).length < 2) {
            errors.push(MSG326);
            $('[id$="txtRoommate1Name"]').addClass('inputError');
            isError = true;
        }
        if ($('[id$="txtRoommate2Name"]:visible').length && $.trim($('[id$="txtRoommate2Name"]').val()).length < 2) {
            errors.push(MSG327);
            $('[id$="txtRoommate2Name"]').addClass('inputError');
            isError = true;
        }
        //phone
        //if ($(".phoneWrapper:visible").length) {
        //    if ($.trim($('[id$="txtRoommate1Phone"]').val()).length < 7) {
        //        errors.push(MSG330);
        //        $('[id$="txtRoommate1Phone"]').addClass('inputError');
        //        isError = true;
        //    }
        //    if ($.trim($('[id$="txtRoommate1Area_code"]').val()).length < 2) {
        //        $('[id$="txtRoommate1Area_code"]').addClass('inputError');
        //        isError = true;
        //        if ($.trim($('input[id$="txtRoommate1Phone"]').val()).length > 6) {
        //            errors.push(MSG330);
        //        }
        //    }
        //    else if ($('[id$="customerPhone"]').val()) {
        //        var phone1 = $.trim($('[id$="txtRoommate1Area_code"]').val()) + $.trim($('[id$="txtRoommate1Phone"]').val());
        //        if (phone1 === $('[id$="customerPhone"]').val()) {
        //            errors.push(MSG439);
        //            $('[id$="txtRoommate1Area_code"], [id$="txtRoommate1Phone"]').addClass('inputError');
        //            isError = true;
        //        }
        //    }

        //}
        //if ($('[id$="txtRoommate2Phone"]:visible').length) {
        //    if ($.trim($('[id$="txtRoommate2Phone"]').val()).length < 7) {
        //        errors.push(MSG331);
        //        $('[id$="txtRoommate2Phone"]').addClass('inputError');
        //        isError = true;
        //    }
        //    if ($.trim($('[id$="txtRoommate2Area_code"]').val()).length < 2) {
        //        $('[id$="txtRoommate2Area_code"]').addClass('inputError');
        //        isError = true;
        //        if ($.trim($('input[id$="txtRoommate2Phone"]').val()).length > 6) {
        //            errors.push(MSG331);
        //        }
        //    }
        //    if ($('[id$="customerPhone"]').val()) {
        //        var phone2 = $.trim($('[id$="txtRoommate2Area_code"]').val()) + $.trim($('[id$="txtRoommate2Phone"]').val());
        //        if (phone2 === $('[id$="customerPhone"]').val()) {
        //            errors.push(MSG440);
        //            $('[id$="txtRoommate2Area_code"], [id$="txtRoommate2Phone"]').addClass('inputError');
        //            isError = true;
        //        }
        //    }
        //    if ($.trim($('[id$="txtRoommate1Area_code"]').val()) === $.trim($('[id$="txtRoommate2Area_code"]').val()) && $.trim($('input[id$="txtRoommate1Phone"]').val()) === $.trim($('input[id$="txtRoommate2Phone"]').val())) {
        //        errors.push(MSG438);
        //        $('[id$="Area_code"], [id$="Phone"]').addClass('inputError');
        //        isError = true;
        //    }
        //}

        //id
        //if ($('input[id$="txtRoommate1Id"]').val() == '') {
        //    errors[errors.length] = MSG45;
        //    $('input[id$="txtRoommate1Id"]').addClass('inputError');
        //    isError = true;
        //}

        var pad = "000000000";
        if ($(".roommatesRow.rr1 [id$='txtRoommate1Id']:visible").length) {
            if ($.trim($('input[id$="txtRoommate1Id"]').val()).length < 1) {
                errors.push(MSG238);
                $('input[id$="txtRoommate1Id"]').addClass('inputError');
                isError = true;
            }
            else if ($.trim($('input[id$="txtRoommate1Id"]').val()).length > 0 && !ARKIA.VALIDATE.validateID($.trim($('input[id$="txtRoommate1Id"]').val()))) {
                errors.push(MSG238);
                $('input[id$="txtRoommate1Id"]').addClass('inputError');
                isError = true;
            }
            else {
                $('input[id$="txtRoommate1Id"]').val((pad + $('input[id$="txtRoommate1Id"]').val()).slice(-pad.length));
                if ($.trim($('input[id$="txtRoommate1Id"]').val()) === sessionStorage.getItem('CustomerID')) {
                    errors.push(MSG420);
                    $('input[id$="txtRoommate1Id"]').addClass('inputError');
                    isError = true;
                }
            }
        }
        if ($(".roommatesRow.rr2 [id$='txtRoommate2Id']:visible").length) {
            if ($.trim($('input[id$="txtRoommate2Id"]').val()).length < 1) {
                errors.push(MSG239);
                $('input[id$="txtRoommate2Id"]').addClass('inputError');
                isError = true;
            }
            else if ($.trim($('input[id$="txtRoommate2Id"]').val()).length > 0 && !ARKIA.VALIDATE.validateID($.trim($('input[id$="txtRoommate2Id"]').val()))) {
                errors.push(MSG239);
                $('input[id$="txtRoommate2Id"]').addClass('inputError');
                isError = true;
            }
            else {
                $('input[id$="txtRoommate2Id"]').val((pad + $('input[id$="txtRoommate2Id"]').val()).slice(-pad.length));
                if ($.trim($('input[id$="txtRoommate2Id"]').val()) === sessionStorage.getItem('CustomerID')) {
                    errors.push(MSG421);
                    $('input[id$="txtRoommate2Id"]').addClass('inputError');
                    isError = true;
                }
                else if ($.trim($('input[id$="txtRoommate2Id"]').val()) == $.trim($('input[id$="txtRoommate1Id"]').val())) {
                    errors.push(MSG422);
                    $('input[id$="txtRoommate1Id"], input[id$="txtRoommate2Id"]').addClass('inputError');
                    isError = true;
                }
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
                        if ($('.inputError').length > 0) {
                            $('.inputError:first').focus();
                            e.preventDefault();
                        }
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
                    if ($('.inputError').length > 0) {
                        $('.inputError:first').focus();
                    }
                }, 5000);
            }            
            return false;
        }
        var id = $("input[name='rbLaps']:checked").parent().attr('data-cycleid');
        $('input[id$="hfSelectedCycle"]').val(id);
        //sessionStorage.setItem('Roomate1Name', $('[id$="txtRoommate1Name"]').val());
        //sessionStorage.setItem('Roomate1Id', $('[id$="txtRoommate1Id"]').val());
        //if (id == 2) {
            //sessionStorage.setItem('Roomate2Name', $('[id$="txtRoommate2Name"]').val());
            //sessionStorage.setItem('Roomate2Id', $('[id$="txtRoommate2Id"]').val());
        //}
        //if ($('[id$="txtRoommate1Phone"]:visible').length) {
        //    sessionStorage.setItem('PhoneRoomate1', $.trim($('[id$="txtRoommate1Area_code"]').val()) + $.trim($('[id$="txtRoommate1Phone"]').val()));
        //}
        //if ($('[id$="txtRoommate2Phone"]:visible').length) {
        //    sessionStorage.setItem('PhoneRoomate2', $.trim($('[id$="txtRoommate2Area_code"]').val()) + $.trim($('[id$="txtRoommate2Phone"]').val()));
        //}
        return true;
    }
};
