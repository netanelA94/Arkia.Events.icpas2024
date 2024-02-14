$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.init();
    }
});

ARKIA.WIZARD = {

    init: function () {


        $("#menu li > a").each(function (index) {
            $(this).attr("href", "#step-" + (index + 1))
        });

        $("#wizardContent .stepContent").each(function (index) {
            $(this).attr("id", "step-" + (index + 1))
        });



        $('#wizard').smartWizard(
            {
                // Properties
                selected: 0,  // Selected Step, 0 = first step   
                keyNavigation: false, // Enable/Disable key navigation(left and right keys are used if enabled)
                enableAllSteps: false,  // Enable/Disable all steps on first load
                updateHeight: false,
                transitionEffect: 'fade', // Effect on navigation, none/fade/slide/slideleft
                contentURL: null, // specifying content url enables ajax content loading
                contentCache: true, // cache step contents, if false content is fetched always from ajax url
                cycleSteps: false, // cycle step navigation
                enableFinishButton: false, // makes finish button enabled always
                errorSteps: [],    // array of step numbers to highlighting as error steps
                labelNext: 'הבא', // label for Next button
                labelPrevious: 'הקודם', // label for Previous button
                labelFinish: 'סיום',  // label for Finish button        
                // Events
                onLeaveStep: ARKIA.WIZARD.leaveAStepCallback, // triggers when leaving a step
                onShowStep: ARKIA.WIZARD.showAStepCallback,  // triggers when showing a step
                onFinish: ARKIA.WIZARD.onFinishCallback  // triggers when Finish button is clicked
            });

        $("#wizardLoader").hide();
        $("#wizardContent").show();
    },
    wizardCtrl: ['$scope', '$window', function ($scope, $window) {
        $scope.init = function () {
            setWindowSize();
        }
        $(window).resize(function () {
            var currentSize = $scope.xs ? "xs" : $scope.sm ? "sm" : $scope.md ? "md" : "lg";
            setWindowSize();
            var newSize = $scope.xs ? "xs" : $scope.sm ? "sm" : $scope.md ? "md" : "lg";
            if (currentSize != newSize) {
                $window.location.reload();
            }
        });
        var setWindowSize = function () {
            $scope.xs = $scope.sm = $scope.md = $scope.lg = false;
            var w = $(window).width();
            if (w < 768) {
                $scope.xs = true;
            } else if (w < 992) {
                $scope.sm = true;
            } else if (w < 1200) {
                $scope.md = true;
            } else {
                $scope.lg = true;
            }
        }
    }],

    leaveAStepCallback: function (obj) {
        var stepnumber = obj.attr('rel'); // get the current step number
        var stepPage = obj.attr('data-stepPage'); // get the current step page
        return ARKIA.WIZARD.validateSteps(stepPage, stepnumber); // return false to stay on step and true to continue navigation 
    },
    showAStepCallback: function (obj) {
        var stepnumber = obj.attr('rel');
        var stepPage = obj.attr('data-stepPage');
        $('#wizard').smartWizard('unVisitSteps', { stepnum: stepnumber });
        switch (stepPage) {
            case 'RGS03':
                angular.element(document.getElementById('ng_Ctrl_RGS03')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_RGS03')).scope().$apply();
                break;
            case 'RGS04':
                angular.element(document.getElementById('ng_Ctrl_RGS04')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_RGS04')).scope().$apply();
                break;
            case 'RGS05':
                angular.element(document.getElementById('ng_Ctrl_RGS05')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_RGS05')).scope().$apply();
                break;
            case 'PRD01': // hotels
                angular.element(document.getElementById('ng_Ctrl_PRD01')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD01')).scope().$apply();
                $("#PRD01").show();
                $("#PRD02").hide();
                break;
            case 'PRD03': //flights
                angular.element(document.getElementById('ng_Ctrl_PRD03')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD03')).scope().$apply();
                $("#PRD03").show();
                $("#PRD04").hide();
                break;
            case 'PRD09': //Shuttle
                angular.element(document.getElementById('ng_Ctrl_PRD09')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD09')).scope().$apply();
                $("#shuttlePart1").show();
                $("#shuttlePart2").hide();
                break;
            case 'PRD05':
                angular.element(document.getElementById('ng_Ctrl_PRD05')).scope().init($('#ng_Ctrl_PRD05'), 'PRD05');
                angular.element(document.getElementById('ng_Ctrl_PRD05')).scope().$apply();
                $("#addPrdPart1PRD05").show();
                $("#addPrdPart2PRD05").hide();
                break;
            case 'PRD06':
                angular.element(document.getElementById('ng_Ctrl_PRD06')).scope().init($('#ng_Ctrl_PRD06'), 'PRD06');
                angular.element(document.getElementById('ng_Ctrl_PRD06')).scope().$apply();
                $("#addPrdPart1PRD06").show();
                $("#addPrdPart2PRD06").hide();
                break;
            case 'PRD07':
                angular.element(document.getElementById('ng_Ctrl_PRD07')).scope().init($('#ng_Ctrl_PRD07'), 'PRD07');
                angular.element(document.getElementById('ng_Ctrl_PRD07')).scope().$apply();
                $("#addPrdPart1PRD07").show();
                $("#addPrdPart2PRD07").hide();
                break;
            case 'PRD13':
                angular.element(document.getElementById('ng_Ctrl_PRD13')).scope().init($('#ng_Ctrl_PRD13'), 'PRD13');
                angular.element(document.getElementById('ng_Ctrl_PRD13')).scope().$apply();
                $("#mealsPart1").show();
                $("#mealsPart2").hide();
                break;
            case 'PMN01':
                angular.element(document.getElementById('ng_Ctrl_PMN01')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PMN01')).scope().$apply();
                break;
        }
        return true;
    },
    onFinishCallback: function () {
        if (ARKIA.WIZARD.validateAllSteps()) {
            var stepPage = obj.attr('data-stepPage');
            if (stepPage == "PMN01") {
                $('#wizard').smartWizard('showMessage', 'Finish Clicked');
                $('form').submit();
            }
        }
    },
    // Your Step validation logic
    validateSteps: function (stepPage, stepnumber) {

        var isStepValid = true;
        var errors = new Array();
        $(".inputError").removeClass("inputError");


        switch (stepPage) {
            case 'RGS03':
                isStepValid = ARKIA.WIZARD.REGISTRATION.ValidateStep(stepnumber);
                break;
            case 'RGS04':
                isStepValid = ARKIA.WIZARD.COMPANIONS.ValidateStep(stepnumber);
                break;
            case 'RGS05':
                isStepValid = ARKIA.WIZARD.FEES.ValidateStep(stepnumber);
                break;
            case 'PRD01':
                isStepValid = ARKIA.WIZARD.HOTELS.ValidateStep(stepnumber);
                break;
            case 'PRD03':
                isStepValid = ARKIA.WIZARD.FLIGHTS.ValidateStep(stepnumber);
                break;
            case 'PRD09':
                isStepValid = ARKIA.WIZARD.SHUTTLE.ValidateStep(stepnumber);
                break;
            case 'PRD05':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD05.ValidateStep(stepnumber);
                break;
            case 'PRD06':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD06.ValidateStep(stepnumber);
                break;
            case 'PRD07':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD07.ValidateStep(stepnumber);
                break;
            case 'PRD08':
                isStepValid = ARKIA.WIZARD.PRODUCTS.PRD08.ValidateStep(stepnumber);
                break;
            case 'PRD13':
                isStepValid = ARKIA.WIZARD.MEALS.PRD13.ValidateStep(stepnumber);
                break;
        }

        ARKIA.WIZARD.setError(stepnumber, !isStepValid);
        window.scrollTo(0, 170);
        return isStepValid;
    },
    createErrorListWizard: function (errors) {
        var errList = '<ul>';
        $.each(errors, function (errNum) {
            errList += '<li>' + errors[errNum] + '</li>';
        });
        var pageWidth = $(window).width();
        if (pageWidth > 1024) {
            setTimeout(function () {
                $('.actionBar .content').attr('tabindex', '0');
                $('.actionBar .content').focus();
            }, 100);
        }
        else {
            $('.actionBar .content').removeAttr('role');
            setTimeout(function () {
                $('.actionBar .content').attr('role', 'alert');
                $('.actionBar .content').focus();
            }, 100);
        }
        return (errList + '</ul>');
    },
    validateAllSteps: function () {
        var isStepValid = true;
        return isStepValid;
    },
    setError: function (stepnumber, iserr) {
        $('#wizard').smartWizard('setError', { stepnum: stepnumber, iserror: iserr });
        if (iserr) {
            $('#wizard').smartWizard('showMessage', errorValues[stepnumber]);
        } else { $('.msgBox').css('display', 'none'); }
    }
};