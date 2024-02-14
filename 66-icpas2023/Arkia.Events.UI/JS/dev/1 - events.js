$(function () {
    if ($('#PMN04').exists()) {
        ARKIA.PMN04.init();
    }
});

ARKIA.PMN04 = {

    init: function () {
        var userEmail = sessionStorage.getItem('userEmail');
        if (userEmail) {
            $('#txtDocsToMail').val(userEmail);
        }
        $("#hlGetDocsByMail").click(function () {
            if (jQuery.browser.mobile) {
                $('#sendDocsDialog').addClass('absolute');
            }
            ARKIA.COMMON.getOverlay($('#sendDocsDialog'),
                {
                    close: 'dialogBoxClose',
                    closeOnClick: true,
                    closeOnEsc: true
                });
            $('#sendDocsDialog a.close').attr('tabindex', '0');
            $('#sendDocsDialog a.close').attr('aria-label', 'סגור');
            $('#sendDocsDialog a.close').focus();
            $('#sendDocsDialog a.close').keydown(function (e) {
                if (e.keyCode == 9 && e.shiftKey) {
                    $('#sendDocsDialog #btnSendDocs').focus();
                    e.preventDefault();
                }
            });
            $('#sendDocsDialog #btnSendDocs').keydown(function (e) {
                if (e.keyCode == 9 && !e.shiftKey) {
                    $('#sendDocsDialog a.close').focus();
                    e.preventDefault();
                }
            });
        });

        $("#btnSendDocs").click(function () {

            $("#validBox").hide();
            var email = $.trim($('#txtDocsToMail').val());
            if (!email) {
                $("#txtDocsToMail").focus();
                $("#validBox").show();
                return false;
            }
            else if (!ARKIA.VALIDATE.RE_EMAIL.test(email)) {
                $("#txtDocsToMail").focus();
                $("#validBox").show();
                return false;
            }

            var DTO = {
                'reservationsn': reservationSn,
                'email': email
            };


            $.ajax({
                type: "POST",
                url: "webmethods/AjaxMethods.aspx/SendEmailDocs",
                data: JSON.stringify(DTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });

            $('#sendDocsDialog').overlay().close();

        });

    }

};


