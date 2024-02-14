$(function () {
    if ($('#PMN02').exists()) {
        ARKIA.PAYMENT.init();
    }
});


ARKIA.PAYMENT = {


    init: function () {

        //$('#txtCvv').keyfilter(/[0-9]/i);
        $('#txtCardHolderName').keyfilter(/[a-zA-Zא-ת .-]+/);
        $('#txtInvoiceCustomerName').keyfilter(/[a-zA-Zא-ת .-]+/);
        $('#txtVatCaseRefNo').keyfilter(/[0-9]/i);
        $('.txtTokenVal').keyfilter(/[0-9]/i);

        $("#hfBalancePrice").val(parseInt($(".balancePrice").attr("data-amount")));

        window.setTimeout(function () {
            $.ajax(
                {
                    type: "POST",
                    url: "webmethods/AjaxMethods.aspx/CancelReservation",
                    data: "{reservationSn:'" + reservationSn + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var d = response.d;
                        window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + "form-wizard";
                        alert(MSG81);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {

                        window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + errorPage;
                    }
                });
        }, 900000);

        var handler = function () {
            $('#txtCCNumberPCI').unbind('click', handler);
            var cardHolder = $('#txtCardHolderName');

            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');


            if ($.trim(cardHolder.val()).length < 4) {
                var errors = new Array();
                errors.push(MSG94);
                cardHolder.addClass('inputError');
                ARKIA.COMMON.showMessageBox(errors);
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.which == 9 && !e.shiftKey) {
                        $('.inputError:first').focus();
                        e.preventDefault();
                    }
                });

                $('#txtCCNumberPCI').bind('click', handler);
                $('#txtCCNumberPCI').keydown(function (e) {
                    if (e.which == 13) {
                        $('#txtCCNumberPCI').click();
                    }
                });
            }
            else {

                $.ajax({
                    type: "POST",
                    url: "webmethods/AjaxMethods.aspx/GetPCIUrl",
                    data: "{customerName:'" + $.trim(cardHolder.val()) + "'}",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
                        var res = response.d;
                        if (res != null && res.ReturnCode == 0 && res.Url != null && res.Url != 'null') {
                            $('#pciIframe').attr('src', res.Url);

                            if (jQuery.browser.mobile) {
                                $('#pciDialog').addClass('absolute');
                            }
                            ARKIA.COMMON.getOverlay($('#pciDialog'),
                                {
                                    close: 'dialogBoxClose',
                                    closeOnClick: false,
                                    onBeforeClose: function () {
                                        $('#txtCCNumberPCI').bind('click', handler);
                                        $('#txtCCNumberPCI').keydown(function (e) {
                                            if (e.which == 13) {
                                                $('#txtCCNumberPCI').click();
                                            }
                                        });
                                    },
                                    closeOnEsc: false
                                });
                            $('#pciDialog .close').click(function () {
                                //$('#txtCvv').focus();
                                $('#ddlPaymentsNum').focus();
                            });
                            $('#pciDialog a.close').attr('tabindex', '0');
                            $('#pciDialog a.close').attr('aria-label', MSG426);
                            $('#pciDialog a.close').focus();
                            $('#pciDialog a.close').keydown(function (e) {
                                if (e.keyCode == 9 && e.shiftKey) {
                                    e.preventDefault();
                                }
                            });
                            $("#pciDialog").focusout(function () {
                                $(this).find("a.close").focus();
                            });
                        }
                        else {
                            alert(MSG92);
                            $('#txtCCNumberPCI').bind('click', handler);
                            $('#txtCCNumberPCI').keydown(function (e) {
                                if (e.which == 13) {
                                    $('#txtCCNumberPCI').click();
                                }
                            });
                        }

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert(MSG92);
                        $('#txtCCNumberPCI').bind('click', handler);
                        $('#txtCCNumberPCI').keydown(function (e) {
                            if (e.which == 13) {
                                $('#txtCCNumberPCI').click();
                            }
                        });
                        return false;
                    }
                });
            }

        };

        $('#txtCCNumberPCI').bind('click', handler);
        $('#txtCCNumberPCI').keydown(function (e) {
            if (e.which == 13) {
                $('#txtCCNumberPCI').click();
            }
        });

        //$.each(pricePlans.Value, function (index, value) {
        //    $("#ddlPaymnetMethod").append('<option value="' + value.PLAN_CODE + '">' + value.PLAN_NAME + '</option>');
        //});

        //for (var i = 1; i <= pricePlans.Value[0].MAX_PAYMENTS_NO; i++) {
        //    $('#ddlPaymentsNum').append("<option value=" + i + ">" + i + "</option>");
        //}

        ////assign event handler for payments selection.
        //$('#ddlPaymnetMethod').bind('change', function () {
        //    var select = $('#ddlPaymentsNum');
        //    select.find('option').remove().end();
        //    var selectedVal = $('option:selected', this).val();
        //    var selectedItem = jQuery.grep(pricePlans.Value, function (value) {
        //        return value.PLAN_CODE == selectedVal;
        //    });

        //    for (var i = 1; i <= selectedItem[0].MAX_PAYMENTS_NO; i++) {
        //        select.append("<option value=" + i + ">" + i + "</option>");
        //    }
        //});

        if (pricePlans.Value.length > 1)
            for (var i = 1; i <= 3 && i <= pricePlans.Value[1].MAX_PAYMENTS_NO; i++) {                
                   $('#ddlPaymentsNum').append("<option value=" + i + ">" + i + "</option>");
            }
        else $('.paymentRow.paymentsNum').css('display', 'none');

        var paymentByCc = true;
        $("#hlotherPayment").click(function () {
            $('#hfToken').val('');
            $('#hfTxnToken').val('');
            $('#txtCCNumberPCI').val('');
            $('#txtCardHolderName').val('');
            $("#ddlPaymnetMethod").val('');
            //$('#txtCvv').val('');
            $("#ddlPaymnetMethod").val($("#ddlPaymnetMethod option:first").val());
            $("#ddlPaymentsNum").val($("#ddlPaymentsNum option:first").val());
            $('#txtVatCaseRefNo').val('');
            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            $('#hlPayment').add('#otherPaymentMethodsBox').add('#btnOtherPayment').add("#titleText").show();
            $('#hlotherPayment').add('#invoicePropBox').add('#btnPayment').add("#titleCcText").add("#ccPaymentInfoBox").hide();
            paymentByCc = false;
        });

        $("#hlPayment").click(function () {
            $('#hfToken').val('');
            $('#hfTxnToken').val('');
            $('#txtCCNumberPCI').val('');
            $('#txtCardHolderName').val('');
            //$('#txtCvv').val('');
            $("#ddlPaymnetMethod").val($("#ddlPaymnetMethod option:first").val());
            $("#ddlPaymentsNum").val($("#ddlPaymentsNum option:first").val());
            $('#txtInvoiceCustomerName').val('');
            $('#txtVatCaseRefNo').val('');
            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            $('#hlPayment').add('#otherPaymentMethodsBox').add('#btnOtherPayment').add("#titleText").hide();
            $('#hlotherPayment').add('#invoicePropBox').add('#btnPayment').add("#titleCcText").add("#ccPaymentInfoBox").show();
            paymentByCc = true;
        });

        $('.close', $(".msgBox")).click(function () {
            $(".msgBox").fadeOut("normal");
            $('.actionBar .content').attr('tabindex', '-1');
            return false;
        });




        $(".txtTokenVal").blur(function () {


            var tokenDue = parseInt($(this).attr("data-TOKEN_DUE"));
            if (parseInt($(this).val()) > tokenDue) {

                alert(MSG351);
                $(this).val(0);
                return;
            }
        });



        $("#updateTokenLink").click(function () {

            var amountToPay = parseInt($(".balancePrice").attr("data-amount"));

            var a = 0;
            $(".txtTokenVal").each(function () {

                if ($(this).val())
                    a += parseInt($(this).val());
            });

            if (a > amountToPay) {
                alert(MSG350);
                return;
            }

            if (a >= amountToPay) {
                $("#paymentByCCBox").hide();
                paymentByCc = false;
            }
            else {
                $("#paymentByCCBox").show();
                paymentByCc = true;
            }

            $("#hfBalancePrice").val((amountToPay - a));
            $(".balancePrice span").text(eventsCurrency + ((amountToPay - a).formatMoney(0, '.', ',')));

        });


        $("#btnPayment").add("#btnOtherPayment").click(function () {

            if ($("#tokensList").length) {
                var amountToPay = parseInt($(".balancePrice").attr("data-amount"));

                var a = 0;
                $(".txtTokenVal").each(function () {

                    if ($(this).val())
                        a += parseInt($(this).val());
                });

                if ((amountToPay - a) != parseInt($("#hfBalancePrice").val())) {
                    alert(MSG352);
                    return;
                }
            }


            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            var errors = new Array();


            if ($("#paymentByCCBox").is(":visible")) {
                if ($.trim($('#txtCardHolderName').val()).length < 4) {
                    errors.push(MSG94);
                    $('#txtCardHolderName').addClass('inputError');
                }

                if ($.trim($('#hfTxnToken').val()).length < 4 || $.trim($('#hfTxnToken').val()).length < 4) {
                    errors.push(MSG98);
                    $('#txtCCNumberPCI').addClass('inputError');
                }

                //if (!ARKIA.VALIDATE.RE_WS.test($('#txtCvv').val()) || $('#txtCvv').val().length < 3) {
                //    errors.push(MSG95);
                //    $('#txtCvv').addClass('inputError');
                //}


                if (paymentByCc) {
                    if ($.trim($('#txtInvoiceCustomerName').val()).length > 1) {
                        if ($.trim($('#txtInvoiceCustomerName').val()).length < 4) {
                            errors.push(MSG96);
                            $('#txtInvoiceCustomerName').addClass('inputError');
                        }
                        else if ($.trim($('#txtVatCaseRefNo').val()).length < 2) {
                            errors.push(MSG97);
                            $('#txtVatCaseRefNo').addClass('inputError');
                        }
                    }
                }
                else {
                    if (!$('input[name=paymentType]:checked').val()) {
                        errors.push(MSG99);
                        $('input[name=paymentType]').addClass('inputError');
                    }
                }
            }
            else {
                paymentByCc = false;
            }


            if (errors.length > 0) {
                ARKIA.COMMON.showMessageBox(errors);
                setTimeout(function () {
                    $('.actionBar .content').attr('tabindex', '0');
                    $('.actionBar .content').focus();
                }, 100);
                $('.actionBar .content').keydown(function (e) {
                    if (e.which == 9 && !e.shiftKey) {
                        $('.inputError:first').focus();
                        e.preventDefault();
                    }
                });
                return false;
            }
            $(this).hide();
            $('#loader').show();

            var tokens = '';
            var paymentBYToken = false;

            if ($("#tokensList").length) {

                paymentBYToken = true;

                tokens = '<M_PAYMENT_TOKENS>';


                $(".txtTokenVal").each(function () {

                    if ($(this).val()) {

                        var paymentAmountT = parseInt($(this).val());
                        var exchangeRate = parseFloat($(this).attr('data-EXCHANGE_RATE'));

                        if (paymentAmountT > 0) {
                            tokens += '<O_PAYMENT_TOKEN>';
                            if (exchangeRate != 0) {
                                paymentAmountT = paymentAmountT / exchangeRate;
                            }
                            tokens += '<PAYMENT_AMOUNT>' + paymentAmountT + '</PAYMENT_AMOUNT>'
                            tokens += '<TOKENSN>' + $(this).attr('data-TOKENSN') + '</TOKENSN>'
                            tokens += '<CURRENCY_CODE>' + $(this).attr('data-CURRENCY_CODE') + '</CURRENCY_CODE>'
                            tokens += '</O_PAYMENT_TOKEN>';
                        }
                    }
                });

                tokens += '</M_PAYMENT_TOKENS>';
            }


            var DTO = {
                'reservationsn': reservationSn,
                'paymentByCc': paymentByCc,
                'token': $('#hfToken').val() ? $('#hfToken').val() : '',
                'txnToken': $('#hfTxnToken').val() ? $('#hfTxnToken').val() : '',
                'cardOwnerName': $('#txtCardHolderName').val() ? $('#txtCardHolderName').val() : '',
                'ccPlanNo': pricePlans.Value.length == 1 || pricePlans.Value.length > 1 && $('#ddlPaymentsNum').val() == 1 ? pricePlans.Value[0].PLAN_CODE : pricePlans.Value.length > 1 ? pricePlans.Value[1].PLAN_CODE : 0,
                'cvv': $('#txtCvv').val() ? $('#txtCvv').val() : 0,
                'paymentsNo': pricePlans.Value.length == 1 ? 1 : pricePlans.Value.length > 1 ? $('#ddlPaymentsNum').val() : 0,
                'pmtTokensXml': tokens,
                'invoiceCustomerName': paymentByCc && $('#txtInvoiceCustomerName').val() ? $('#txtInvoiceCustomerName').val() : null,
                'vatCaseRefNo': paymentByCc && $('#txtVatCaseRefNo').val() ? $('#txtVatCaseRefNo').val() : null,
                'invoiceEmailSend': paymentByCc && $('#txtInvoiceEmailSend').val() ? $('#txtInvoiceEmailSend').val() : null,
                'formOfPayment': !paymentByCc && !paymentBYToken ? $('input[name=paymentType]:checked').val() : null
            };


            $.ajax({
                type: "POST",
                url: "webmethods/AjaxMethods.aspx/DoPayment",
                data: JSON.stringify(DTO),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    var res = response.d;
                    window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + "tnx?r=" + reservationSn + "&ca=" + res.ContinueAction;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    window.location = "http://" + location.hostname + "/" + APPFolfer + "/" + errorPage;
                    console.log(errorThrown)
                }
            });
        });


    },
    /*----------------------------------------------------------------------------------------------------------------*/
    setToken: function (error, token, txnToken, url, oraMsg, oraSession) {

        console.info("ora: errCode: " + error + " msg: " + oraMsg + " session:" + oraSession);

        var hfTxnToken = $('#hfTxnToken'),
            hfToken = $('#hfToken');

        if (error == 0) {
            $('#pciDialog').overlay().close();
            $('#txtCvv').focus();
            hfTxnToken.val(txnToken);
            hfToken.val(token);
            $('#txtCCNumberPCI').val("************" + token.substr(token.length - 4));
            $('#paymentPCIError').hide();
        }
        else {
            $('#txtCCNumberPCI').val('');
            hfTxnToken.val('');
            hfToken.val('');
            $('#pciIframe').attr('src', url);

            $('#paymentPCIError').show();
        }
    }

};