/*
 * SmartWizard 2.0 plugin
 * jQuery Wizard control Plugin
 * by Dipu 
 * 
 * http://www.techlaboratory.net 
 * http://tech-laboratory.blogspot.com
 */

(function ($) {
    $.fn.smartWizard = function (action) {
        var options = $.extend({}, $.fn.smartWizard.defaults, action);
        var args = arguments;

        return this.each(function () {
            var obj = $(this);
            var curStepIdx = options.selected;
            var steps = $("ul > li > a[href^='#step-']", obj); // Get all anchors in this array
            var contentWidth = 0;
            var msgBox, elmActionBar, elmStepContainer, btNext, btPrevious, btFinish;

            //var elmmainContentBox = $('.mainContentBox', obj);
            elmActionBar = $('.actionBar', obj);
            //if (elmmainContentBox.length == 0) {
            //if(elmActionBar.length == 0){
            //elmmainContentBox = $('<div></div>').addClass("actionBar");
            //elmActionBar = $('<div></div>').addClass("actionBar");
            //}

            msgBox = $('.msgBox', obj);
            if (msgBox.length == 0) {
                msgBox = $('<div class="msgBox pie col-xs-12 col-sm-12"><a href="#" class="close" role="button">X</a><div class="errorFlag"></div><div class="content"></div></div>');
                elmActionBar.append(msgBox);
                //elmmainContentBox.append(msgBox);
            }

            $('.close', msgBox).click(function () {
                msgBox.fadeOut("normal");
                $('.msgBox  .content').attr('tabindex', '-1');
                return false;
            });
            var pageWidth = $(window).width();
            if (pageWidth > 1024) {
                $('.msgBox .content').keydown(function (e) {
                    if (e.keyCode == 9 && !e.shiftKey) {
                        if ($('.inputError:focusable').length > 0) {
                            $('.inputError:focusable:first').focus();
                            e.preventDefault();
                        }
                        else if ($('.inputError>[type="checkbox"]').length) {
                            $('.inputError>[type="checkbox"]').focus();
                            e.preventDefault();
                        }
                        else if ($(".selectName").length) {
                            for (var i = 0; i < $(".selectName").length; i++) {
                                if ($(".selectName").eq(i).find("option:selected").val() == "") {
                                    $(".selectName").eq(i).focus();
                                    e.preventDefault();
                                    break;
                                }
                            }
                        }
                        else if ($('#step-7:visible [role="ADULTS_PRD_NO"]').length) {
                            $('#step-7:visible [role="ADULTS_PRD_NO"]').focus();
                            e.preventDefault();
                        }
                    }
                });
            }
            else {
                setTimeout(function () {
                    if ($('.inputError:focusable').length > 0) {
                        $('.inputError:focusable:first').focus();
                    }
                    else if ($('.inputError>[type="checkbox"]').length) {
                        $('.inputError>[type="checkbox"]').focus();
                    }
                    else {
                        for (var i = 0; i < $(".selectName").length; i++) {
                            if ($(".selectName").eq(i).find("option:selected").val() == "") {
                                $(".selectName").eq(i).focus();
                                break;
                            }
                        }
                    }
                }, 5000);
            }

            // Method calling logic
            if (!action || action === 'init' || typeof action === 'object') {
                init();
            } else if (action === 'showMessage') {
                //showMessage(Array.prototype.slice.call( args, 1 ));
                var ar = Array.prototype.slice.call(args, 1);
                showMessage(ar[0]);
                return true;
            } else if (action === 'setError') {
                var ar = Array.prototype.slice.call(args, 1);
                setError(ar[0].stepnum, ar[0].iserror);
                return true;
            } else if (action === 'unVisitSteps') {
                $(steps, obj).each(function (i) {
                    var ar = Array.prototype.slice.call(args, 1);
                    if (i >= ar[0].stepnum) {
                        $(this).removeClass("selected").removeClass("done").addClass("disabled").attr("aria-disabled", "true").attr("tabindex", "-1");
                        $(this).attr("isDone", 0);
                    }
                });
            }
            else {
                $.error('Method ' + action + ' does not exist');
            }

            function init() {
                var allDivs = obj.children('div'); //$("div", obj);                
                obj.children('ul').addClass("anchor");
                allDivs.addClass("content");
                // Create Elements
                elmActionBar = $('<div></div>').addClass("actionBar");
                elmStepContainer = $('<div></div>').addClass("stepContainer  col-sm-12 col-xs-12");
                btNext = $(".buttonNext");
                btFinish = $(".buttonFinish");

                // highlight steps with errors
                if (options.errorSteps && options.errorSteps.length > 0) {
                    $.each(options.errorSteps, function (i, n) {
                        setError(n, true);
                    });
                }


                elmStepContainer.append(allDivs);
                obj.append(elmStepContainer);
                obj.append(elmActionBar);
                contentWidth = elmStepContainer.width();

                $(btNext).click(function () {
                    if ($(this).hasClass('buttonDisabled')) {
                        return false;
                    }
                    if ($(this).attr('jumpStep') == 'true') {
                        doForwardProgress(true);

                    }
                    else {
                        doForwardProgress();
                    }
                    return false;
                });
                $(btPrevious).click(function () {
                    if ($(this).hasClass('buttonDisabled')) {
                        return false;
                    }
                    doBackwardProgress();
                    return false;
                });
                $(btFinish).click(function () {
                    if (!$(this).hasClass('buttonDisabled')) {
                        if ($.isFunction(options.onFinish)) {
                            if (!options.onFinish.call(this, $(steps))) {
                                return false;
                            }
                        } else {
                            var frm = obj.parents('form');
                            if (frm && frm.length) {
                                frm.submit();
                            }
                        }
                    }

                    return false;
                });

                $(steps).bind("click", function (e) {
                    if (steps.index(this) == curStepIdx) {
                        return false;
                    }
                    var nextStepIdx = steps.index(this);
                    var isDone = steps.eq(nextStepIdx).attr("isDone") - 0;
                    if (isDone == 1) {
                        LoadContent(nextStepIdx);
                    }
                    return false;
                });

                // Enable keyboard navigation                 
                if (options.keyNavigation) {
                    $(document).keyup(function (e) {
                        if (e.which == 39) { // Right Arrow
                            doForwardProgress();
                        } else if (e.which == 37) { // Left Arrow
                            doBackwardProgress();
                        }
                    });
                }
                //  Prepare the steps
                prepareSteps();
                // Show the first slected step
                LoadContent(curStepIdx);
            }

            function prepareSteps() {
                if (!options.enableAllSteps) {
                    $(steps, obj).removeClass("selected").removeClass("done").addClass("disabled").attr('aria-disabled', 'true').attr('tabindex', '-1');
                    $(steps, obj).attr("isDone", 0);
                } else {
                    $(steps, obj).removeClass("selected").removeClass("disabled").addClass("done").attr("aria-disabled", "false").attr('tabindex', '0');
                    $(steps, obj).attr("isDone", 1);
                }

                $(steps, obj).each(function (i) {
                    $($(this).attr("href"), obj).hide();
                    $(this).attr("rel", i + 1);
                });
            }

            function LoadContent(stepIdx) {

                var selStep = steps.eq(stepIdx);
                var ajaxurl = options.contentURL;
                stepNum = stepIdx + 1;
                showStep(stepIdx);

            }

            function showStep(stepIdx) {
                var selStep = steps.eq(stepIdx);
                var curStep = steps.eq(curStepIdx);
                if (stepIdx != curStepIdx && stepIdx > curStepIdx) {
                    if ($.isFunction(options.onLeaveStep)) {
                        if (!options.onLeaveStep.call(this, $(curStep))) {
                            return false;
                        }
                    }
                }
                else {
                    $('.msgBox').css('display', 'none');
                }

                var isIE8 = ($.browser.msie && parseInt($.browser.version, 10) < 9);
                if (options.updateHeight)
                    elmStepContainer.height($($(selStep, obj).attr("href"), obj).outerHeight());
                if (options.transitionEffect == 'slide' && !isIE8) {
                    $($(curStep, obj).attr("href"), obj).slideUp("fast", function (e) {
                        $($(selStep, obj).attr("href"), obj).slideDown("fast");
                        curStepIdx = stepIdx;
                        SetupStep(curStep, selStep);
                    });
                } else if (options.transitionEffect == 'fade' && !isIE8) {
                    $($(curStep, obj).attr("href"), obj).fadeOut("fast", function (e) {
                        $($(selStep, obj).attr("href"), obj).fadeIn("fast");
                        curStepIdx = stepIdx;
                        SetupStep(curStep, selStep);
                    });
                } else if (options.transitionEffect == 'slideleft' && !isIE8) {
                    $($(curStep, obj).attr("href"), obj).hide("slide", { direction: "left" }, 150);
                    $($(selStep, obj).attr("href"), obj).show("slide", { direction: "right" }, 150);
                    curStepIdx = stepIdx;
                    SetupStep(curStep, selStep);
                } else {
                    $($(curStep, obj).attr("href"), obj).hide();
                    $($(selStep, obj).attr("href"), obj).show();
                    curStepIdx = stepIdx;
                    SetupStep(curStep, selStep);
                }
                return true;
            }

            function SetupStep(curStep, selStep) {
                $(curStep, obj).removeClass("selected");
                $(curStep, obj).addClass("done");
                $(curStep, obj).attr("aria-disabled", "false");
                $(curStep, obj).attr("tabindex", "0");

                $(selStep, obj).removeClass("disabled");
                $(selStep, obj).removeClass("done");
                $(selStep, obj).addClass("selected");
                $(selStep, obj).attr("aria-disabled", "true");
                $(selStep, obj).attr("tabindex", "-1");
                $(selStep, obj).attr("isDone", 1);
                adjustButton();
                if ($.isFunction(options.onShowStep)) {
                    if (!options.onShowStep.call(this, $(selStep))) {
                        return false;
                    }
                }
            }

            function doForwardProgress(jumpStep) {

                var nextStepIdx = curStepIdx + 1;
                if (jumpStep) {
                    var selStep = steps.eq(nextStepIdx);
                    $(selStep, obj).removeClass("selected").removeClass("done").addClass("disabled").attr("aria-disabled", "true").attr("tabindex", "-1");
                    $(selStep, obj).attr("isDone", 0);
                    nextStepIdx++;
                }

                if (steps.length <= nextStepIdx) {
                    if (!options.cycleSteps) {
                        return false;
                    }
                    nextStepIdx = 0;
                }
                LoadContent(nextStepIdx);
            }

            function doBackwardProgress() {
                var nextStepIdx = curStepIdx - 1;
                if (0 > nextStepIdx) {
                    if (!options.cycleSteps) {
                        return false;
                    }
                    nextStepIdx = steps.length - 1;
                }
                LoadContent(nextStepIdx);
            }

            function adjustButton() {
                if (!options.cycleSteps) {
                    if (0 >= curStepIdx) {
                        $(btPrevious).addClass("buttonDisabled");
                    } else {
                        $(btPrevious).removeClass("buttonDisabled");
                    }
                    if ((steps.length - 1) <= curStepIdx) {
                        $(btNext).addClass("buttonDisabled");
                    } else {
                        $(btNext).removeClass("buttonDisabled");
                    }
                }
                // Finish Button 
                if (!steps.hasClass('disabled') || options.enableFinishButton) {
                    $(btFinish).removeClass("buttonDisabled");
                } else {
                    $(btFinish).addClass("buttonDisabled");
                }
            }

            function showMessage(msg) {
                $('.content', msgBox).html(msg);
                msgBox.show();
            }

            function setError(stepnum, iserror) {
                if (iserror) {
                    $(steps.eq(stepnum - 1), obj).addClass('error')
                } else {
                    $(steps.eq(stepnum - 1), obj).removeClass("error");
                }
            }
        });
    };

    // Default Properties and Events
    $.fn.smartWizard.defaults = {
        selected: 0,  // Selected Step, 0 = first step   
        keyNavigation: true, // Enable/Disable key navigation(left and right keys are used if enabled)
        enableAllSteps: false,
        updateHeight: true,
        transitionEffect: 'slideleft', // Effect on navigation, none/fade/slide/slideleft
        contentURL: null, // content url, Enables Ajax content loading
        contentCache: true, // cache step contents, if false content is fetched always from ajax url
        cycleSteps: false, // cycle step navigation
        includeFinishButton: true, // whether to show a Finish button
        enableFinishButton: false, // make finish button enabled always
        errorSteps: [],    // Array Steps with errors
        labelNext: 'Next',
        labelPrevious: 'Previous',
        labelFinish: 'Finish',
        onLeaveStep: null, // triggers when leaving a step
        onShowStep: null,  // triggers when showing a step
        onFinish: null  // triggers when Finish button is clicked
    };

})(jQuery);
