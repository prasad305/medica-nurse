/*=================================
		Common Methods
 =================================*/

function GetStringUpperCase(String) {
    return String.charAt(0).toUpperCase() + String.slice(1);
}

function GetStringAge(String) {
    let date = new Date();
    return date.getFullYear() - (String.toString().substring(0, 4));
}

// Warning -Need to Refactor-
function FileChoosenValidate(Id) {
    let FileDetails = "";
    FileDetails = $('#' + Id)[0].files[0];
    const AllowedExtensions = ['jpg', 'png', 'pdf', 'PDF', 'JPG', 'jpeg', 'JPEG', 'PNG'],
        sizeLimit = 5000000; // 5 megabyte
    // destructuring file name and size from file object
    const {name: fileName, size: fileSize} = FileDetails;
    const FileExtension = fileName.split(".").pop();
    for (var i = 0; i <= AllowedExtensions.length; i++) {
        if (AllowedExtensions[i] == FileExtension) {
            return true; // valid file extension
        }

    }

    return ShowMessage(Messages.InvalidFileType, MessageTypes.Warning, "Warning!");

    //if (!AllowedExtensions.includes(FileExtension))
    //{
    //    return ShowMessage(Messages.InvalidFileType, MessageTypes.Error, "Error!");
    //    $('#' + Id).val('');
    //}
    //else if (fileSize > sizeLimit)
    //{
    //    return ShowMessage(Messages.InvalidFileType, MessageTypes.Error, "Error!");
    //    $('#' + Id).val('');
    //}
}


function CreateDataTable(Id) {
    $('#' + Id).DataTable(
        {
            dom: 'Bfrtip',

            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive:
                {
                    details:
                        {
                            type: 'column',
                            target: 'tr'
                        }
                },
            columnDefs:
                [
                    {ClassName: 'control', "orderable": false, "targets": '_all'},
                    {responsivePriority: 1, targets: 0},
                    {responsivePriority: 2, targets: 4}
                ],

            "aaSorting": [],
            "ordering": false,
            "bPaginate": true,
            "bFilter": false,
            "bInfo": false,

        });
}

function ConvertDate(StringDate) {
    return StringDate.split("T")[0];
}

function DatePicker() {
    $('.Date-Picker').datepicker
    ({
        changeMonth: true,
        changeYear: true,
        yearRange: "1950:today"
    });
}

function TimePicker() {
    var Minite = 1000 * 60 * 30;

    $('.Time-Picker').timepicker
    ({
        timeFormat: 'h:mm:ss p',
        startTime: new Date(Math.round(new Date().getTime() / Minite) * Minite),
    });
}

function ValidateMobileNumber(Number) {
    if (Number.length === 10 || Number.length === 9) {
        return true;
    } else {
        return false;
    }
}

function GetAge() {
    let Age = AgeCalculate(FormatDate(document.getElementById('PatientDOB').value, "dd/MM/yyyy", "yyyy-MM-dd"));

    $('#age').val(Age[0]);
    $('#age1').val(Age[1]);
}

function GetDateOfBirthByNIC(NIC) {
    if (NIC === null || NIC === "")
        return null;

    if (ValidateNIC(NIC) === false)
        return null;

    // TogglePatientDataForChild(true);

    let Year;
    let Day;
    let Month;
    let DayText;

    let Gender;
    // Year
    if (NIC.length === 10) {
        Year = "19" + NIC.substr(0, 2);
        DayText = parseInt(NIC.substr(2, 3));
    } else {
        Year = NIC.substr(0, 4);
        DayText = parseInt(NIC.substr(4, 3));
    }

    // Gender
    if (DayText > 500) {
        Gender = "Female";
        DayText = DayText - 500;
    } else {
        Gender = "Male";
    }

    // Day Digit Validation
    if (DayText < 1 && DayText > 366) {
        return null
    }

    if (DayText > 335) {
        Day = DayText - 335;
        Month = "12";
    } else if (DayText > 305) {
        Day = DayText - 305;
        Month = "11";
    } else if (DayText > 274) {
        Day = DayText - 274;
        Month = "10";
    } else if (DayText > 244) {
        Day = DayText - 244;
        Month = "09";
    } else if (DayText > 213) {
        Day = DayText - 213;
        Month = "08";
    } else if (DayText > 182) {
        Day = DayText - 182;
        Month = "07";
    } else if (DayText > 152) {
        Day = DayText - 152;
        Month = "06";
    } else if (DayText > 121) {
        Day = DayText - 121;
        Month = "05";
    } else if (DayText > 91) {
        Day = DayText - 91;
        Month = "04";
    } else if (DayText > 60) {
        Day = DayText - 60;
        Month = "03";
    } else if (DayText < 32) {
        Month = "01";
        Day = DayText;
    } else if (DayText > 31) {
        Day = DayText - 31;
        Month = "02";
    }

    return Year + "/" + Month + "/" + Day + "/" + Gender;
}

function ValidateNIC(NICNo) {
    if (NICNo === 0 || NICNo === "")
        return false;

    if (NICNo.length === 12 && $.isNumeric(NICNo.substr(0, 12)))
        return true;

    if (NICNo.length === 12 && !NICNo.match(/^[0-9]{7}[0][0-9]{4}$/))
        return false;

    if (NICNo.length !== 10 && NICNo.length !== 12)
        return false;

    if (NICNo.length === 10 && !NICNo.match(/^([0-9]{9}[x|X|v|V]|[0-9]{12})$/))
        return false;

    if (NICNo.length === 10 && $.isNumeric(NICNo.substr(0, 9)))
        return true;

    return true;
}

function ValidateMobile(MobileNo) {
    if (MobileNo === null || MobileNo === undefined)
        return false;

    if (MobileNo.length !== 10)
        return false;

    if (MobileNo.startsWith("070") === false && MobileNo.startsWith("071") === false && MobileNo.startsWith("072") === false && MobileNo.startsWith("075") === false && MobileNo.startsWith("076") === false
        && MobileNo.startsWith("077") === false && MobileNo.startsWith("078") === false)
        return false;
}

// function isInvalid(String) {
//     return String !== null || String.trim() !== '' || String !== undefined ? String : '-';
// }

function isNull(String) {
    return String !== null ? String : '-';
}

function isNullOrUndefined(String) {
    return String !== null || String !== undefined ? String : '-';
}

// function isUndefined(String) {
//     return String !== undefined ? String : '-';
// }
//
// function isEmpty(String) {
//     return String.trim() !== '' ? String : '-';
// }
