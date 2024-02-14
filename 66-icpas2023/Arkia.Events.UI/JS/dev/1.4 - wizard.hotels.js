$(function () {
    if ($('#wizard').exists()) {
        ARKIA.WIZARD.HOTELS.init();
    }
});


ARKIA.WIZARD.HOTELS = {
    reLoad: true,
    reLoad2: true,
    roomsChecked: {},
    partyTypeDefault: null,
    init: function () {
        $("#btnHotelCon").click(function () {
            var allRoomsSelected = false;
            var errors = new Array();
            $(".inputError").removeClass("inputError");
            var stepnumber = 4;
            var isStepValid = true;
            if ($("[role='HOTEL_PRD01']").val() === '') {
                isStepValid = false;
                $("[role='HOTEL_PRD01']").addClass('inputError');
                errors.push(MSG112);
            }
            if ($("[role='ACOM_PRD01']").val() === '') {
                isStepValid = false;
                $("[role='ACOM_PRD01']").addClass('inputError');
                errors.push(MSG62);
            }
            if ($("[role='ROOM_PRD01']").val() === '') {
                isStepValid = false;
                $("[role='ROOM_PRD01']").addClass('inputError');
                errors.push(MSG63);
            }
            if ($("[role='ROOM_NUM']").exists()) {
                allRoomsSelected = true;
                var Adults = 0, Children = 0, Infants = 0;
                $("[role='ROOM_NUM']").each(function (index, value) {
                    var parent = $(this).parent();
                    if (window.innerWidth < 768) {
                        parent = $(this).parent().parent();
                    }
                    if ($("[role='ROOM_TYPE_NAME']", parent).val() === '') {
                        isStepValid = false;
                        $("[role='ROOM_TYPE_NAME']", parent).addClass('inputError');
                        errors.push(MSG64.replace('{0}', (index + 1)));
                        allRoomsSelected = false
                    }

                    if ($("[role='PARTY_TYPE_NAME']", parent).val() < '0') {
                        isStepValid = false;
                        $("[role='PARTY_TYPE_NAME']", parent).addClass('inputError');
                        errors.push(MSG65.replace('{0}', (index + 1)));
                        allRoomsSelected = false
                    }

                    if (allRoomsSelected) {

                        if (typeof ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].PARTY_TYPE !== 'undefined') {
                            Adults += Number(ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].PARTY_TYPE.ADULTS);
                            Children += Number(ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].PARTY_TYPE.CHILDREN);
                            Infants += Number(ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[index].INFANTS);
                        }
                    }
                });
            }
            if (allRoomsSelected) {
                //age checking
                var agc = ARKIA2.WIZARD.getAgeGroupCount();
                if (agc.adults != Adults || agc.children != Children) {
                    $("[role='ROOM_NUM']").each(function (index, value) {
                        $("[role='PARTY_TYPE_NAME']").addClass('inputError');
                        isStepValid = false;
                    });
                    errors.push(MSG68);
                }
                if (agc.infants != Infants) {
                    $("[role='ROOM_NUM']").each(function (index, value) {
                        $("[role='MAX_INFANTS']").addClass('inputError');
                        isStepValid = false;
                        errors.push(MSG67.replace('{0}', (index + 1)));
                    });
                }
                var roomTypes = [];
                $(ARKIA.WIZARD.HOTELS.roomsChecked.hotel.ROOMS.Value).each(function (index, value) {
                    roomTypes.push({ type: ARKIA.WIZARD.HOTELS.roomsChecked.hotel.ROOMS.Value[index].ROOM_TYPE_NAME, limit: ARKIA.WIZARD.HOTELS.roomsChecked.hotel.ROOMS.Value[index].ROOMS_NO, roomsNum: 0 });
                });
                for (var i = 0; i < ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms.length; i++) {
                    for (var j = 0; j < roomTypes.length; j++) {
                        if (roomTypes[j].type === ARKIA.WIZARD.HOTELS.roomsChecked.selectedRooms[i].ROOM.ROOM_TYPE_NAME) {
                            roomTypes[j].roomsNum++;
                            break;
                        }
                    }
                }
                for (var i in roomTypes) {
                    if (roomTypes[i].limit < roomTypes[i].roomsNum) {
                        isStepValid = false;
                        errors.push(MSG66);
                        break;
                    }
                }
            }


            if (isStepValid) {
                ARKIA2.WIZARD.resetHotels();
                ARKIA2.WIZARD.setHotelComment($("#HotelComment").val());
                $("#PRD01").hide();
                $("#PRD02").show();
                angular.element(document.getElementById('ng_Ctrl_PRD02')).scope().init();
                angular.element(document.getElementById('ng_Ctrl_PRD02')).scope().$apply();
                $(".roomPrice").css("margin-top", ($(".hotelInfoRow").height() - 24) / 2);
                $(".marketingTextBox").height($(".hotelsRowThird").height() - 20);
            }
            else {
                errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
            }
            ARKIA.WIZARD.setError(stepnumber, !isStepValid);
        });
        $("#backToPRD01").click(function () {
            $(".inputError").removeClass("inputError");
            $(".msgBox").css('display', 'none');
            $("#PRD01").show();
            $("#PRD02").hide();
        });
        $('#HotelComment').keyfilter(/[א-ת0-9_\.\-\,\:\;\!\ ]/i);
        if ($('.bodyMain.ltr').length) {
            $('#HotelComment').attr('title', 'In Hebrew');
        }
        else {
            $('#HotelComment').attr('title', 'הזן בעברית');
        }
    },
    hotesCtrl: ['$scope', '$http', function ($scope, $http) {
        $scope.hotels = [];
        $scope.noInfants = false;
        $scope.hotelOptions = {};
        $scope.hotelOptions.hotel = {};
        $scope.hotelOptions.room = {};
        $scope.hotelOptions.board = {};
        $scope.rooms_amount_arr = [];
        $scope.hotelOptions.rooms_amount;
        $scope.hotelOptions.selectedRooms = [];
        $scope.INFANTS_ARR_proto = [0, 1, 2, 3, 4, 5];

        $('#HotelComment').keyfilter(/[א-ת0-9_\.\-\,\:\;\!\ ]/i);

        var roomsCount = [];
        for (var i = 0; i < maxRooms; i++) {
            roomsCount.push(i + 1);
        }

        $scope.changeHotels = function (newVal) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;

            if (newVal.hotel == null) {
                newVal.boards = {};
                $scope.rooms_amount_arr = [];
                newVal.rooms_amount = null;
                newVal.selectedRooms = [];
            }
            else {
                if (newVal.hotel.BOARD_BASIS.Value.length == 1) {
                    newVal.boards = newVal.hotel.BOARD_BASIS.Value[0];
                    $scope.changeBoardBasis(newVal.boards);
                }
                else {
                    newVal.boards = {};
                }


            }

        }

        $scope.changeBoardBasis = function (boards) {
            var agc = ARKIA2.WIZARD.getAgeGroupCount();
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;

            if (boards == null) {
                $scope.rooms_amount_arr = [];
                $scope.hotelOptions.rooms_amount = null;
                $scope.hotelOptions.selectedRooms = [];
            }
            else {

                $scope.rooms_amount_arr = [];
                $scope.hotelOptions.rooms_amount = null;
                $scope.hotelOptions.selectedRooms = [];
                if ($scope.hotelOptions.hotel != null) {
                    $scope.rooms_amount_arr = roomsCount;

                    if (roomsCount.length === 1 || agc.adults === 1 && agc.children === 0) {
                        $scope.hotelOptions.rooms_amount = roomsCount[0];
                        $scope.changeRooms($scope.hotelOptions);
                        $scope.adultsCount = 1;
                    }
                    else {
                        $scope.hotelOptions.rooms_amount = 0;
                        $scope.adultsCount = 0;
                    }

                }
            }

            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });

        }

        $scope.changeRooms = function (newVal) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;

            $scope.hotelOptions.selectedRooms = [];
            for (var i = 0; i < newVal.rooms_amount; i++) {
                $scope.hotelOptions.selectedRooms.push({});
            }

            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });

            ARKIA.WIZARD.HOTELS.roomsChecked = newVal;


            if (ARKIA.WIZARD.HOTELS.partyTypeDefault != null) {
                newVal.selectedRooms[0].PARTY_TYPE = newVal.selectedRooms[0].ROOM.PARTY_TYPES.Value[ARKIA.WIZARD.HOTELS.partyTypeDefault];
            }


            if (newVal.hotel.ROOMS.Value.length == 1) {
                for (var i = 0; i < $scope.hotelOptions.selectedRooms.length; i++) {
                    $scope.hotelOptions.selectedRooms[i].ROOM = $scope.hotelOptions.hotel.ROOMS.Value[0];
                    $scope.roomTypeChanged($scope.hotelOptions.selectedRooms[i]);
                }
            }

        }

        $scope.roomTypeChanged = function (room) {


            if (room.ROOM != null) {
                room.INFANTS_ARR = $scope.INFANTS_ARR_proto.slice(0, room.ROOM.MAX_INFANTS + 1);
                room.INFANTS = room.INFANTS_ARR[0];
                var agc = ARKIA2.WIZARD.getAgeGroupCount();
                if ($scope.hotelOptions.selectedRooms.length == 1) {

                    var party_types_num = $scope.hotelOptions.hotel.ROOMS.Value[0].PARTY_TYPES.Value.length;
                    for (var i = 0; i < party_types_num; i++) {
                        if ($scope.hotelOptions.hotel.ROOMS.Value[0].PARTY_TYPES.Value[i].ADULTS == agc.adults &&
                            $scope.hotelOptions.hotel.ROOMS.Value[0].PARTY_TYPES.Value[i].CHILDREN == agc.children) {
                            ARKIA.WIZARD.HOTELS.partyTypeDefault = i;
                            break;
                        }
                    }
                }

                if ($scope.hotelOptions.rooms_amount == 1 && room.ROOM.PARTY_TYPES.Value.length > 1) {
                    var pt = jQuery.grep(room.ROOM.PARTY_TYPES.Value, function (f) {
                        return f.ADULTS == agc.adults && f.CHILDREN == agc.children;
                    });

                    room.PARTY_TYPE = pt[0];
                    $scope.updatePrice(room);
                }

                if (room.ROOM.PARTY_TYPES.Value.length == 1) {
                    room.PARTY_TYPE = room.ROOM.PARTY_TYPES.Value[0];
                    $scope.updatePrice(room);
                }

                if ($scope.hotelOptions.rooms_amount == 1) {
                    room.INFANTS = agc.infants;
                    $scope.updatePrice(room);
                }
                if ($scope.noInfants) {
                    $(".roomInfantsSel").css('display', 'none')

                }


            }
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
        };

        $scope.updatePrice = function (room) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            ARKIA.WIZARD.HOTELS.partyTypeDefault = null;
            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });

            room.PRICE_FORMATTED = '';
            if (room.PARTY_TYPE != null) {
                var p = jQuery.grep(room.PARTY_TYPE.PRICES.Value, function (f) {
                    return f.BOARD_BASIS_CODE == $scope.hotelOptions.boards.CODE;
                });

                var infantPrice = p[0].INFANT_PRICE * room.INFANTS;
                room.PRICE_FORMATTED = eventsCurrency + (p[0].PRICE + infantPrice).formatMoney(0, '.', ',');
            }
        };

        $scope.init = function () {


            $scope.noInfants = (ARKIA2.WIZARD.getAgeGroupCount().infants === 0) ? true : false;
            if (!$scope.hotels || ARKIA.WIZARD.HOTELS.reLoad) {

                $("[role='adultsCount']").empty();
                $("[role='childrencCount']").empty();
                $("[role='infantsCount']").empty();
                $("[role='childLine']").hide();
                $("[role='infantLine']").hide();
                $('[role="HOTEL_COMMENT"]').val('');

                var agc = ARKIA2.WIZARD.getAgeGroupCount();
                if (agc.adults === 1) {
                    if ($(".bodyMain.ltr").length) {
                        $("[role='adultsCount']").text("adult");
                    }
                    else {
                        $("[role='adultsCount']").text("מבוגר");
                    }
                }
                else {
                    if ($(".bodyMain.ltr").length) {
                        $("[role='adultsCount']").text(agc.adults + " adults");
                    }
                    else {
                        $("[role='adultsCount']").text(agc.adults + " מבוגרים");
                    }
                }
                if (agc.children > 0) {
                    $("[role='childLine']").show();
                    if (agc.children === 1) {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='childrencCount']").text("child");
                        }
                        else {
                            $("[role='childrencCount']").text("ילד");
                        }
                    }
                    else {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='childrencCount']").text(agc.children + " children");
                        }
                        else {
                            $("[role='childrencCount']").text(agc.children + " ילדים");
                        }
                    }
                }
                if (agc.infants > 0) {
                    $("[role='infantLine']").show();
                    if (agc.infants === 1) {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='infantsCount']").text("infant");
                        }
                        else {
                            $("[role='infantsCount']").text("תינוק");
                        }
                    }
                    else {
                        if ($(".bodyMain.ltr").length) {
                            $("[role='infantsCount']").text(agc.infants + " infants");
                        }
                        else {
                            $("[role='infantsCount']").text(agc.infants + " תינוקות");
                        }
                    }
                }

                $scope.hotelOptions.rooms_amount = 0;
                $scope.hotelOptions.selectedRooms = null;
                $scope.hotelOptions.hotel = null;
                var ageGroupCount = ARKIA2.WIZARD.getAgeGroupCount();
                $http({
                    url: 'webmethods/AjaxMethods.aspx/GetHotels',
                    method: "POST",
                    data: JSON.stringify(ageGroupCount),
                    headers: { 'Content-Type': 'application/json; charset=utf-8' }
                })
                    .success(function (data, status, headers, config) {
                        if (data.d.Value == null) {
                            alert(MSG383);
                            window.location = "./event-cycles";
                        }
                        $scope.hotels = data.d.Value;

                        if ($scope.hotels.length == 1) {
                            $scope.hotelOptions.hotel = $scope.hotels[0];
                            $scope.changeHotels($scope.hotelOptions);
                        }
                        ARKIA.WIZARD.HOTELS.reLoad = false;
                        $("#hotelsLoader").hide();
                        $("#hotelsContent").show();
                    })
                    .error(function (data, status, headers, config) {
                        window.location = errorPage;
                    });

            }
        }
    }],
    hotesCtrl_2: ['$scope', '$http', function ($scope, $http) {
        $scope.checkedOptions = {};

        if ($(".bodyMain.ltr").length) {
            var age_group_name = ['adult', 'child', 'infant'];
        }
        else {
            var age_group_name = ['מבוגר', 'ילד', 'תינוק'];
        }
        var infants = 0;
        $scope.addAllHotelRooms = function () {
            for (var i in $scope.checkedOptions.selectedRooms) {
                var PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE;
                PRD_KEY = $scope.checkedOptions.selectedRooms[i].ROOM.ROOM_PRD_KEY;
                HT_PARTY_TYPE_CODE = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PARTY_TYPE_CODE;
                HT_BOARD_BASIS_CODE = $scope.checkedOptions.boards.CODE;
                var CUSTOMERS_NO = [];
                for (var index in $scope.checkedOptions.selectedRooms[i].room_customers) {
                    CUSTOMERS_NO.push($scope.checkedOptions.selectedRooms[i].room_customers[index].room_customer.CUSTOMER_NO);
                }
                ARKIA2.WIZARD.addHotelRoom(PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO);
            }
        }
        $scope.init_flag = true
        $scope.init = function () {

            if (ARKIA.WIZARD.HOTELS.reLoad2 == true) {
                $scope.init_flag = true


                var customers = { "A": [], "C": [], "I": [] };
                $('[role="HOTEL_COMMENT"]').val('');


                $scope.checkedOptions = ARKIA.WIZARD.HOTELS.roomsChecked;

                var customersArray = ARKIA2.WIZARD.getPassengers();

                for (var item in customersArray) {
                    customersArray[item].fullName = customersArray[item].LATIN_FIRST_NAME + " " + customersArray[item].LATIN_LAST_NAME;
                    customers[customersArray[item].AgeGroup].push(customersArray[item]);

                    infants += (customersArray[item].AgeGroup == 'I') ? 1 : 0;
                }

                for (var i in $scope.checkedOptions.selectedRooms) {
                    var aNumber = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.ADULTS;
                    var cNumber = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.CHILDREN;
                    var iNumber = $scope.checkedOptions.selectedRooms[i].INFANTS;
                    $scope.checkedOptions.selectedRooms[i].room_customers = [];
                    for (var price = 0; price < $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value.length; price++) {
                        if ($scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].BOARD_BASIS_CODE == ARKIA.WIZARD.HOTELS.roomsChecked.boards.CODE) {
                            var infantPrice = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].INFANT_PRICE * iNumber;
                            $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICE_FORMATTED =
                                ($scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].PRICE > 0) ? eventsCurrency + ($scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].PRICE + infantPrice).formatMoney(0, '.', ',') : "";
                            $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICE_SELECTED = $scope.checkedOptions.selectedRooms[i].PARTY_TYPE.PRICES.Value[price].PRICE + infantPrice;
                            break;
                        }
                    }

                    var oneRoom = ($scope.checkedOptions.selectedRooms.length == 1);

                    var cArr = [];
                    for (var ind in customers["A"]) {
                        cArr.push(customers["A"][ind]);
                    }
                    for (var j = 0; j < aNumber; j++) {
                        $scope.checkedOptions.selectedRooms[i].room_customers.push({ room_customer: oneRoom ? cArr[j] : null, type: "A", select_arr: oneRoom ? [cArr[j]] : cArr, label: age_group_name[0] });
                    }

                    var cArr = [];
                    for (var ind in customers["C"]) {
                        cArr.push(customers["C"][ind]);
                    }
                    for (var j = 0; j < cNumber; j++) {
                        $scope.checkedOptions.selectedRooms[i].room_customers.push({ room_customer: oneRoom ? cArr[j] : null, type: "C", select_arr: oneRoom ? [cArr[j]] : cArr, label: age_group_name[1] });
                    }

                    var cArr = [];
                    for (var ind in customers["I"]) {
                        cArr.push(customers["I"][ind]);
                    }
                    for (var j = 0; j < iNumber; j++) {
                        $scope.checkedOptions.selectedRooms[i].room_customers.push({ room_customer: oneRoom ? cArr[j] : null, type: "I", select_arr: oneRoom ? [cArr[j]] : cArr, label: age_group_name[2] });
                    }

                }
                ARKIA.WIZARD.HOTELS.reLoad2 = false;
                setTimeout(function () {
                    $('.hotelInfoRow .roomTypeSel').each(function () {
                        $(this).attr('aria-label', $(this).parents('.roomsResultRow').find('.roomNumLbl').text() + " " + $(this).prev().text());
                    });
                }, 100);
            }

            if ($scope.checkedOptions.selectedRooms.length == 1) {
                $("#buttonNextHotel").click();
            }
        }
        $scope.clearSelected = function (room) {
            ARKIA.WIZARD.HOTELS.reLoad2 = true;
            $scope.init();
        };

        $scope.passengersChange = function (roomItem, passItem, items) {

            if (passItem.OLD_SELECTED != null) {
                $.each(items, function (ind, room) {
                    $.each(room.room_customers, function (index, val) {
                        if (val.OLD_SELECTED != passItem.OLD_SELECTED) {
                            if (val.type == passItem.type) {
                                val.select_arr.push(passItem.OLD_SELECTED);
                            }
                        }
                    });
                });
            }

            if (passItem.room_customer != null) {
                $.each(items, function (ind, room) {
                    $.each(room.room_customers, function (index, val) {
                        if (val.room_customer != passItem.room_customer) {
                            val.select_arr = jQuery.grep(val.select_arr, function (value) {
                                return value.CUSTOMER_NO != passItem.room_customer.CUSTOMER_NO;
                            });
                        }
                    });
                });
            }

            //FIX for IE9
            angular.forEach($("select:visible"), function (currSelect) {
                currSelect.options[currSelect.selectedIndex].text += " ";
            });


            if (passItem.room_customer != null) {
                var selected = jQuery.grep(passItem.select_arr, function (value) {
                    return value.CUSTOMER_NO == passItem.room_customer.CUSTOMER_NO;
                });
                passItem.OLD_SELECTED = selected[0];
            }
            else {
                passItem.OLD_SELECTED = null;
            }

        }
    }],
    ValidateStep: function (stepnumber) {
        var isStepValid = true;
        var errors = new Array();
        $("[role='CUSTOMER_PRD02']").each(function (index, value) {
            if ($(this).val() < '0') {
                isStepValid = false;
                $(this).addClass('inputError');
                errors.push(MSG74.replace('{0}', (index + 1)));
            }
        });
        if (isStepValid) {
            angular.element(document.getElementById('ng_Ctrl_PRD02')).scope().addAllHotelRooms();
        }
        if (!isStepValid) {
            errorValues[stepnumber] = ARKIA.WIZARD.createErrorListWizard(errors);
        }
        return isStepValid;
    }
}