

ARKIA.RESERVATION = {
    CUSTOMER: null,
    COMPANIONS: null,
    FEES: null,
    HOTELS: null,
    HOTEL_COMMENT: null,
    FLIGHTS: null,
    AD_PRODUCTS: null,
    AD_PRODUCTS1: null,
    AD_PRODUCTS2: null,
    AD_PRODUCTS3: null,
    AD_PRODUCTS4: null,
    AD_PRODUCTS5: null,
    SHUTTLE: null,
    MEAL: null,
    REGION: ''
};

ARKIA.CUSTOMER = function () { }

ARKIA.CUSTOMER.prototype = {
    LAST_NAME: '',
    CUSTOMER_NO: 0,
    CUSTOMER_NOIsNull: true,
    EMAIL: '',
    LATIN_LAST_NAME: '',
    JOB_TITLE_CODE: '',
    JOB_TITLE_CODEIsNull: true,
    DOB: '',
    PHONES: {},
    FIRST_NAME: '',
    LATIN_FIRST_NAME: '',
    TITLE_CODE: '',
    TITLE_CODEIsNull: '',
    ID_NO: '',
    PASSPORT_NO: '',
    EXPIRE_DATE: '',
    ADDITIONAL_INFO1: '',
    ADDITIONAL_INFO2: '',
    ADDITIONAL_INFO3: '',
    COMMENT_1: '',
    COMMENT_2: '',
    COMMENT_3: '',
    COMMENT_4: '',


    init: function (TITLE_CODE, JOB_TITLE_CODE, ID_NO, LAST_NAME, FIRST_NAME, LATIN_LAST_NAME, LATIN_FIRST_NAME, EMAIL, AREA_CODE1, PHONE1, AREA_CODE2, PHONE2, AREA_CODE_FAX, FAX, PASSPORT_NO, EXPIRE_DATE, YEAR, MONTH, DAY, ADDITIONAL_INFO1, ADDITIONAL_INFO2, ADDITIONAL_INFO3, COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4) {
        this.CUSTOMER_NO = 1;
        this.CUSTOMER_NOIsNull = false;
        this.TITLE_CODE = TITLE_CODE;
        this.TITLE_CODEIsNull = false;
        this.JOB_TITLE_CODE = JOB_TITLE_CODE;
        if (JOB_TITLE_CODE != 0)
            this.JOB_TITLE_CODEIsNull = false;
        this.ID_NO = ID_NO;
        this.FIRST_NAME = FIRST_NAME;
        this.LAST_NAME = LAST_NAME;
        this.LATIN_LAST_NAME = LATIN_LAST_NAME;
        this.LATIN_FIRST_NAME = LATIN_FIRST_NAME;
        this.EMAIL = EMAIL;
        if (PASSPORT_NO != null) {
            this.PASSPORT_NO = PASSPORT_NO;
            this.EXPIRE_DATE = EXPIRE_DATE;
            this.EXPIRE_DATEIsNull = false;
            this.DOB = YEAR + '' + (MONTH < 10 ? '0' + MONTH : MONTH) + '' + (DAY < 10 ? '0' + DAY : DAY);
        }
        this.PHONES = new ARKIA.PHONES();

        this.PHONES.Value = [];

        if (PHONE1) {
            var p1 = new ARKIA.PHONE();
            p1.init(PHONE1, AREA_CODE1, 'N');
            this.PHONES.Value.push(p1);
        }

        if (PHONE2) {
            var p2 = new ARKIA.PHONE();
            p2.init(PHONE2, AREA_CODE2, 'N');
            this.PHONES.Value.push(p2);
        }

        if (FAX) {
            var fax = new ARKIA.PHONE();
            fax.init(FAX, AREA_CODE_FAX, 'Y');
            this.PHONES.Value.push(fax);
        }

        this.ADDITIONAL_INFO1 = ADDITIONAL_INFO1;
        this.ADDITIONAL_INFO2 = ADDITIONAL_INFO2;
        this.ADDITIONAL_INFO3 = ADDITIONAL_INFO3;
        this.COMMENT_1 = COMMENT_1;
        this.COMMENT_2 = COMMENT_2;
        this.COMMENT_3 = COMMENT_3;
        this.COMMENT_4 = COMMENT_4;
    },
    initComp: function (CUSTOMER_NO, TITLE_CODE, JOB_TITLE_CODE, LATIN_LAST_NAME, LATIN_FIRST_NAME, YEAR, MONTH, DAY, PASSPORT_NO, EXPIRE_DATE) {
        this.CUSTOMER_NO = CUSTOMER_NO;
        this.CUSTOMER_NOIsNull = false;
        this.TITLE_CODE = TITLE_CODE;
        this.TITLE_CODEIsNull = false;
        this.JOB_TITLE_CODE = JOB_TITLE_CODE;
        if (JOB_TITLE_CODE != 0)
            this.JOB_TITLE_CODEIsNull = false;
        this.LATIN_LAST_NAME = LATIN_LAST_NAME;
        this.LATIN_FIRST_NAME = LATIN_FIRST_NAME;
        this.DOB = YEAR + '' + (MONTH < 10 ? '0' + MONTH : MONTH) + '' + (DAY < 10 ? '0' + DAY : DAY);
        if (PASSPORT_NO != null) {
            this.PASSPORT_NO = PASSPORT_NO;
            this.EXPIRE_DATE = EXPIRE_DATE;
            this.EXPIRE_DATEIsNull = false;
        }
    }

};

ARKIA.PHONES = function () { }
ARKIA.PHONES.prototype = {
    Value: []
};

ARKIA.PHONE = function () { }
ARKIA.PHONE.prototype = {
    FAX_YN: '',
    PHONE_NO: 0,
    PHONE_NOIsNull: true,
    AREA_CODE: 0,
    AREA_CODEIsNull: true,

    init: function (PHONE_NO, AREA_CODE, FAX_YN) {
        this.PHONE_NO = PHONE_NO;
        this.PHONE_NOIsNull = false;
        this.AREA_CODE = AREA_CODE;
        this.AREA_CODEIsNull = false;
        this.FAX_YN = FAX_YN;
    }
};

ARKIA.PRODUCTS = function () { }
ARKIA.PRODUCTS.prototype = {
    Value: []
};


ARKIA.PRODUCT = function () { }
ARKIA.PRODUCT.prototype = {
    PRD_KEY: null,
    PASSENGERS: null,
    HT_PARTY_TYPE_CODE: 0,
    HT_PARTY_TYPE_CODEIsNull: true,
    HT_BOARD_BASIS_CODE: 0,
    HT_BOARD_BASIS_CODEIsNull: true,
    ADULTS_PRD_NO: 0,
    ADULTS_PRD_NOIsNull: true,
    CHILDREN_PRD_NO: 0,
    CHILDREN_PRD_NOIsNull: true,

    initFee: function (PRD_KEY, CUSTOMER_NO) {
        this.PRD_KEY = PRD_KEY;
        this.PASSENGERS = new ARKIA.PASSENGERS();
        this.PASSENGERS.Value = [];
        this.PASSENGERS.StatusArray = [];
        if (CUSTOMER_NO) {

            this.PASSENGERS.Value.push(CUSTOMER_NO);
            this.PASSENGERS.StatusArray.push(1); // NotNull = 1,
        }
    },
    initHotel: function (PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        this.HT_PARTY_TYPE_CODE = HT_PARTY_TYPE_CODE;
        this.HT_PARTY_TYPE_CODEIsNull = false;
        this.HT_BOARD_BASIS_CODE = HT_BOARD_BASIS_CODE;
        this.HT_BOARD_BASIS_CODEIsNull = false;
        var pass = new ARKIA.PASSENGERS();
        pass.Value = [];
        pass.StatusArray = [];
        if (CUSTOMERS_NO) {
            $.each(CUSTOMERS_NO, function (index, entry) {
                pass.Value.push(entry);
                pass.StatusArray.push(1); // NotNull = 1,
            });
        }
        this.PASSENGERS = pass;
    },
    initFlight: function (PRD_KEY, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        var pass = new ARKIA.PASSENGERS();
        pass.Value = [];
        pass.StatusArray = [];
        if (CUSTOMERS_NO) {
            $.each(CUSTOMERS_NO, function (index, entry) {
                pass.Value.push(entry);
                pass.StatusArray.push(1); // NotNull = 1,
            });
        }
        this.PASSENGERS = pass;
    },
    initProduct: function (PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        if (ADULTS_PRD_NO > 0) {
            this.ADULTS_PRD_NO = ADULTS_PRD_NO;
            this.ADULTS_PRD_NOIsNull = false;
        }
        if (CHILDREN_PRD_NO > 0) {
            this.CHILDREN_PRD_NO = CHILDREN_PRD_NO;
            this.CHILDREN_PRD_NOIsNull = false;
        }

        if (CUSTOMERS_NO) {
            var pass = new ARKIA.PASSENGERS();
            pass.Value = [];
            pass.StatusArray = [];
            if (CUSTOMERS_NO) {
                $.each(CUSTOMERS_NO, function (index, entry) {
                    pass.Value.push(entry);
                    pass.StatusArray.push(1); // NotNull = 1,
                });
            }
            this.PASSENGERS = pass;
        }
    },

    initMeal: function (PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO) {
        this.PRD_KEY = PRD_KEY;
        if (ADULTS_PRD_NO > 0) {
            this.ADULTS_PRD_NO = ADULTS_PRD_NO;
            this.ADULTS_PRD_NOIsNull = false;
        }
        if (CHILDREN_PRD_NO > 0) {
            this.CHILDREN_PRD_NO = CHILDREN_PRD_NO;
            this.CHILDREN_PRD_NOIsNull = false;
        }
    },

    initShuttle: function (PRD_KEY, CUSTOMERS_NO) {
        this.PRD_KEY = PRD_KEY;
        var pass = new ARKIA.PASSENGERS();
        pass.Value = [];
        pass.StatusArray = [];
        if (CUSTOMERS_NO) {
            $.each(CUSTOMERS_NO, function (index, entry) {
                pass.Value.push(entry);
                pass.StatusArray.push(1); // NotNull = 1,
            });
        }
        this.PASSENGERS = pass;
    },
};

ARKIA.PASSENGERS = function () { }
ARKIA.PASSENGERS.prototype = {
    Value: [],
    StatusArray: [] //OracleUdtStatus Null = 0, NotNull = 1,
};

ARKIA.COMPANIONS = function () { }
ARKIA.COMPANIONS.prototype = {
    Value: []
};


var ARKIA2 = {

    WIZARD: {

        setCustomer: function (TITLE_CODE, JOB_TITLE_CODE, ID_NO, LAST_NAME, FIRST_NAME, LATIN_LAST_NAME, LATIN_FIRST_NAME, EMAIL, AREA_CODE1, PHONE1, AREA_CODE2, PHONE2, AREA_CODE_FAX, FAX, PASSPORT_NO, EXPIRE_DATE, YEAR, MONTH, DAY, REGION, ADDITIONAL_INFO1, ADDITIONAL_INFO2, ADDITIONAL_INFO3, COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4) {
            cust = new ARKIA.CUSTOMER();
            cust.init(TITLE_CODE, JOB_TITLE_CODE, ID_NO, LAST_NAME, FIRST_NAME, LATIN_LAST_NAME, LATIN_FIRST_NAME, EMAIL, AREA_CODE1, PHONE1, AREA_CODE2, PHONE2, AREA_CODE_FAX, FAX, PASSPORT_NO, EXPIRE_DATE, YEAR, MONTH, DAY, ADDITIONAL_INFO1, ADDITIONAL_INFO2, ADDITIONAL_INFO3, COMMENT_1, COMMENT_2, COMMENT_3, COMMENT_4);

            ARKIA.RESERVATION.CUSTOMER = cust;
            ARKIA.RESERVATION.REGION = REGION;

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },

        //if something changed reset session and send true
        resetCompanions: function (resetSelectedProducts) {

            ARKIA.RESERVATION.COMPANIONS = null;

            if (resetSelectedProducts && resetSelectedProducts == true) {
                ARKIA.RESERVATION.FEES = null;
                ARKIA.RESERVATION.HOTELS = null;
                ARKIA.RESERVATION.HOTEL_COMMENT = null;
                ARKIA.RESERVATION.FLIGHTS = null;
                ARKIA.RESERVATION.AD_PRODUCTS = null;
                ARKIA.RESERVATION.AD_PRODUCTS1 = null;
                ARKIA.RESERVATION.AD_PRODUCTS2 = null;
                ARKIA.RESERVATION.AD_PRODUCTS3 = null;
                ARKIA.RESERVATION.AD_PRODUCTS4 = null;
                ARKIA.RESERVATION.AD_PRODUCTS5 = null;
                ARKIA.RESERVATION.SHUTTLE = null;
                ARKIA.RESERVATION.MEAL = null;

            }
        },

        addCompanions: function (TITLE_CODE, JOB_TITLE_CODE, LATIN_LAST_NAME, LATIN_FIRST_NAME, YEAR, MONTH, DAY, PASSPORT_NO, EXPIRE_DATE) {

            if (!ARKIA.RESERVATION.COMPANIONS) {
                ARKIA.RESERVATION.COMPANIONS = new ARKIA.COMPANIONS();

                ARKIA.RESERVATION.COMPANIONS.Value = [];
            }

            var comp = new ARKIA.CUSTOMER();
            comp.initComp(ARKIA.RESERVATION.COMPANIONS.Value.length + 2, TITLE_CODE, JOB_TITLE_CODE, LATIN_LAST_NAME, LATIN_FIRST_NAME, YEAR, MONTH, DAY, PASSPORT_NO, EXPIRE_DATE);
            ARKIA.RESERVATION.COMPANIONS.Value.push(comp);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;

        },

        resetFees: function () {
            ARKIA.RESERVATION.FEES = null;
        },

        addFee: function (PRD_KEY, CUSTOMER_NO) {
            if (!ARKIA.RESERVATION.FEES) {
                ARKIA.RESERVATION.FEES = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.FEES.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initFee(PRD_KEY, CUSTOMER_NO);
            ARKIA.RESERVATION.FEES.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();

            return ARKIA.RESERVATION;
        },


        resetHotels: function () {
            ARKIA.RESERVATION.HOTELS = null;
        },
        initHotels: function () {
            if (!ARKIA.RESERVATION.HOTELS) {
                ARKIA.RESERVATION.HOTELS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.HOTELS.Value = [];
            }
        },
        //CUSTOMERS_NO - array of CUSTOMER_NO
        addHotelRoom: function (PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO) {
            if (!ARKIA.RESERVATION.HOTELS) {
                ARKIA.RESERVATION.HOTELS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.HOTELS.Value = [];
            }
            var prd = new ARKIA.PRODUCT();
            prd.initHotel(PRD_KEY, HT_PARTY_TYPE_CODE, HT_BOARD_BASIS_CODE, CUSTOMERS_NO);
            ARKIA.RESERVATION.HOTELS.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },
        setHotelComment: function (HOTEL_COMMENT) {
            ARKIA.RESERVATION.HOTEL_COMMENT = HOTEL_COMMENT;
        },
        resetFlights: function () {
            ARKIA.RESERVATION.FLIGHTS = null;
        },
        initFlights: function () {
            if (!ARKIA.RESERVATION.FLIGHTS) {
                ARKIA.RESERVATION.FLIGHTS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.FLIGHTS.Value = [];
            }
        },
        //CUSTOMERS_NO - array of CUSTOMER_NO
        AddFlight: function (PRD_KEY, CUSTOMERS_NO) {
            if (!ARKIA.RESERVATION.FLIGHTS) {
                ARKIA.RESERVATION.FLIGHTS = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.FLIGHTS.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initFlight(PRD_KEY, CUSTOMERS_NO);
            ARKIA.RESERVATION.FLIGHTS.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },
        resetProducts: function (indexPage) {
            ARKIA.RESERVATION.AD_PRODUCTS = null;
            switch (indexPage) {
                case 1:
                    ARKIA.RESERVATION.AD_PRODUCTS1 = null;
                    break;
                case 2:
                    ARKIA.RESERVATION.AD_PRODUCTS2 = null;
                    break;
                case 3:
                    ARKIA.RESERVATION.AD_PRODUCTS3 = null;
                    break;
                case 4:
                    ARKIA.RESERVATION.AD_PRODUCTS4 = null;
                    break;
                case 5:
                    ARKIA.RESERVATION.AD_PRODUCTS5 = null;
                    break;
            }
        },
        AddProduct: function (indexPage, PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO) {
            switch (indexPage) {
                case 1:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS1) {
                        ARKIA.RESERVATION.AD_PRODUCTS1 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS1.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS1.Value.push(prd);
                    break;
                case 2:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS2) {
                        ARKIA.RESERVATION.AD_PRODUCTS2 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS2.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS2.Value.push(prd);
                    break;
                case 3:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS3) {
                        ARKIA.RESERVATION.AD_PRODUCTS3 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS3.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS3.Value.push(prd);

                    break;
                case 4:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS4) {
                        ARKIA.RESERVATION.AD_PRODUCTS4 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS4.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS4.Value.push(prd);
                    break;
                case 5:
                    if (!ARKIA.RESERVATION.AD_PRODUCTS5) {
                        ARKIA.RESERVATION.AD_PRODUCTS5 = new ARKIA.PRODUCTS();
                        ARKIA.RESERVATION.AD_PRODUCTS5.Value = [];
                    }
                    var prd = new ARKIA.PRODUCT();
                    prd.initProduct(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO, CUSTOMERS_NO);
                    ARKIA.RESERVATION.AD_PRODUCTS5.Value.push(prd);
                    break;
            }

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },
        resetMeal: function () {
            ARKIA.RESERVATION.MEAL = null;
        },
        AddMeal: function (PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO) {
            if (!ARKIA.RESERVATION.MEAL) {
                ARKIA.RESERVATION.MEAL = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.MEAL.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initMeal(PRD_KEY, ADULTS_PRD_NO, CHILDREN_PRD_NO);
            ARKIA.RESERVATION.MEAL.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },

        resetShuttle: function () {
            ARKIA.RESERVATION.SHUTTLE = null;
        },
        initShuttle: function () {
            if (!ARKIA.RESERVATION.SHUTTLE) {
                ARKIA.RESERVATION.SHUTTLE = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.SHUTTLE.Value = [];
            }
        },
        //CUSTOMERS_NO - array of CUSTOMER_NO
        AddShuttle: function (PRD_KEY, CUSTOMERS_NO) {
            if (!ARKIA.RESERVATION.SHUTTLE) {
                ARKIA.RESERVATION.SHUTTLE = new ARKIA.PRODUCTS();

                ARKIA.RESERVATION.SHUTTLE.Value = [];
            }

            var prd = new ARKIA.PRODUCT();
            prd.initShuttle(PRD_KEY, CUSTOMERS_NO);
            ARKIA.RESERVATION.SHUTTLE.Value.push(prd);

            ARKIA2.WIZARD.saveInSession();
            return ARKIA.RESERVATION;
        },

        saveInSession: function () {
            sessionStorage.setItem('RESERVATION', JSON.stringify(ARKIA.RESERVATION));
        },


        getReservation: function () {
            var res = null;

            if (ARKIA.RESERVATION.CUSTOMER) {

                res = ARKIA.RESERVATION;
            }
            else {
                var str = sessionStorage.getItem('RESERVATION')
                if (str) {
                    ARKIA.RESERVATION = JSON.parse(str);
                    ARKIA.RESERVATION.FEES = null;
                    ARKIA.RESERVATION.HOTELS = null;
                    ARKIA.RESERVATION.HOTEL_COMMENT = null;
                    ARKIA.RESERVATION.FLIGHTS = null;
                    ARKIA.RESERVATION.AD_PRODUCTS = null;
                    ARKIA.RESERVATION.SHUTTLE = null;
                    res = ARKIA.RESERVATION;
                }
            }
            if (res != null) {
                if (res.AD_PRODUCTS == null) {
                    res.AD_PRODUCTS = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS.Value = [];
                }
                if (res.AD_PRODUCTS1 == null) {
                    res.AD_PRODUCTS1 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS1.Value = [];
                }
                if (res.AD_PRODUCTS2 == null) {
                    res.AD_PRODUCTS2 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS2.Value = [];
                }
                if (res.AD_PRODUCTS3 == null) {
                    res.AD_PRODUCTS3 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS3.Value = [];
                }
                if (res.AD_PRODUCTS4 == null) {
                    res.AD_PRODUCTS4 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS4.Value = [];
                }
                if (res.AD_PRODUCTS5 == null) {
                    res.AD_PRODUCTS5 = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.AD_PRODUCTS5.Value = [];
                }
                if (res.SHUTTLE == null) {
                    res.SHUTTLE = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.SHUTTLE.Value = [];
                }
                if (res.MEAL == null) {
                    res.MEAL = new ARKIA.PRODUCTS();
                    ARKIA.RESERVATION.MEAL.Value = [];
                }

                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS1.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS2.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS3.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS4.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.AD_PRODUCTS5.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.SHUTTLE.Value);
                res.AD_PRODUCTS.Value = $.merge(res.AD_PRODUCTS.Value, res.MEAL.Value);
                //במידה ואין דף מוצרים כגון ארוחות או הסעות יש להוריד את השורה

            }
            return res;
        },
        getPassengers: function () {
            var items = [];
            var cust = ARKIA.RESERVATION.CUSTOMER;
            cust.AgeGroup = 'A';
            cust.FULL_NAME = cust.LATIN_FIRST_NAME + " " + cust.LATIN_LAST_NAME;
            items.push(cust);
            if (ARKIA.RESERVATION.COMPANIONS) {
                $.each(ARKIA.RESERVATION.COMPANIONS.Value, function (index, item) {
                    item.AgeGroup = ARKIA2.WIZARD.getAgeGroup(item);
                    item.FULL_NAME = item.LATIN_FIRST_NAME + " " + item.LATIN_LAST_NAME;
                    items.push(item);
                });
            }
            return items;
        },
        getAgeByDate: function (dateString) {
            var parts = startDate.split('/');
            eventStartDate = new Date(parts[2], parts[1] - 1, parts[0]);

            var year = dateString.substring(0, 4);
            var month = dateString.substring(4, 6);
            var day = dateString.substring(6, 8);
            var birthDate = new Date(year, month - 1, day);
            var age = eventStartDate.getFullYear() - birthDate.getFullYear();
            var m = eventStartDate.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && eventStartDate.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },
        getAgeGroup: function (entry) {
            if (entry.CUSTOMER_NO == 1) {
                return 'A'; // adult - Main Customer
            }
            else {
                var age = ARKIA2.WIZARD.getAgeByDate(entry.DOB);
                if (age < ChildAgeStart) {
                    return 'I'; // baby
                }
                else if (age < ChildAgeEnd) {
                    return 'C'; // child
                }
                return 'A'; // adult
            }

        },
        getAgeGroupRegType: function (entry) {
            if (entry.CUSTOMER_NO == 1) {
                return 'A'; // adult - Main Customer
            }
            else {
                var age = ARKIA2.WIZARD.getAgeByDate(entry.DOB);
                if (age < 2) {
                    return 'I'; // baby
                }
                else if (age < 22) {
                    return 'C'; // child
                }
                return 'A'; // adult
            }

        },

        getAgeGroupCountRegType: function () {
            var adults = 1;
            var children = 0;
            var infants = 0;

            if (ARKIA.RESERVATION.COMPANIONS != null && ARKIA.RESERVATION.COMPANIONS.Value != null) {
                $.each(ARKIA.RESERVATION.COMPANIONS.Value, function (index, entry) {
                    if (ARKIA2.WIZARD.getAgeGroupRegType(entry) == 'I') {
                        infants++;
                    }
                    else if (ARKIA2.WIZARD.getAgeGroupRegType(entry) == 'C') {
                        children++;
                    }
                    else {
                        adults++;
                    }
                });
            }

            return {
                adults: adults,
                children: children,
                infants: infants
            };

        },

        getAgeGroupCount: function () {
            var adults = 1;
            var children = 0;
            var infants = 0;

            if (ARKIA.RESERVATION.COMPANIONS != null && ARKIA.RESERVATION.COMPANIONS.Value != null) {
                $.each(ARKIA.RESERVATION.COMPANIONS.Value, function (index, entry) {
                    if (ARKIA2.WIZARD.getAgeGroup(entry) == 'I') {
                        infants++;
                    }
                    else if (ARKIA2.WIZARD.getAgeGroup(entry) == 'C') {
                        children++;
                    }
                    else {
                        adults++;
                    }
                });
            }

            return {
                adults: adults,
                children: children,
                infants: infants
            };

        }
    }
};

