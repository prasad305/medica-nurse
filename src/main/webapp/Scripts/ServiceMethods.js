/*=================================
		Response Handlers
 =================================*/

//Variables
let DataLength;
let LoopCount = 0;

function Login_Success(Response) {
    if (Response.Status != 1000 || Response.Data.UserTypeId != 4) {
        return ShowMessage(Messages.LoginInvalid, MessageTypes.Warning, "Warning!");
    } else {
        _Username = Response.Data.Username;
        setCookie("UserId", Response.Data.Id);
        _UserId = Response.Data.Id;
        setCookie("AccessToken", Response.Data.AccessToken);

        InitRequestHandler();

        new LayoutMain().Render();
        new PatientSearch().Render(Containers.MainContent);
        document.getElementById("PatientCard").style.backgroundColor = "#BDC3C7";


        GetSessionDoctorId();
        GetNurseBranches();
        NurseGet();
    }
}

function Welcome_Success(PatientData) {
    if (Response.Status == 1001 && Response.Data.length == 0) return ShowMessage(Messages.Error, MessageTypes.Warning, "Warning!"); else _PatientData = PatientData;
}

function SaveDetails_Success(Response) {
    _PatientNIC = undefined;

    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        if (_AppointmentSessionId !== null && _AppointmentSessionId !== undefined) {
            _PatientId = Response.Data.Id;
            _AppointmentPatientName = Response.Data.FirstName;
            new NewAppoinment().Render(Containers.MainContent);
            GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
            GetDoctorAppoinmentList();
        }

        _PatientDetails = Response.Data;
        FilterPatientData(Response.Data);

        return ShowMessage(Messages.UserSaveSuccess, MessageTypes.Success, "Success!");
    }
}

function NurseGet() {
    _Request.Get(ServiceMethods.GetNurse, null, NurseGet_Success);
}

function NurseGet_Success(Response) {
    _NurseFirstName = Response.Data[0].FirstName;
    _NurseLastName = Response.Data[0].LastName;
    _NurseNIC = Response.Data[0].NIC;
}

function GetNurseBranches() {
    _Request.Post(ServiceMethods.InstituteBranch, new Doctor(undefined, undefined), GetNurseBranches_Success);
    //_Request.Get(ServiceMethods.InstituteBranchGet, null, GetNurseBranches_Success);
}

function GetNurseBranches_Success(Response) {
    if (Response.Data[0] != null || Response.Data[0] != "") {
        _UserBranchId = Response.Data[0].Id;
        document.getElementById("LblInstituteBranch").innerHTML = Response.Data[0].Name;
    }
}


/*=================================
		Patient Methods
 =================================*/

function GetPatientData_Success(Response) {
    if (Response.Data.length === 0 || Response.Status != 1000) {
        swal({
            title: 'Ooops!',
            text: "No Patient Found! Please Add a New Patient",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success mr-5',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false

        }).then(function () {
            AddPatient_Click();
        }, function (dismiss) {
            if (dismiss === 'cancel') {

            }
        });
    } else {
        _PatientDetails = Response.Data[0];
        FilterPatientData(Response.Data);
    }
}

function FilterPatientData(Data) {
    let DataLength = Data.length;
    let Count = 0;
    let ArrayPatientData = [];
    let PatientType = "-";

    if (DataLength === undefined) {
        ArrayPatientData.push({
            " ": " ",
            Name: Data.Title + Data.FirstName + " " + Data.LastName,
            "NIC": Data.NIC,
            "Mobile": Data.Mobile,
            Gender: Data.Gender,
            Dep: PatientType,
            Action: '<button class="btn btn-info btn-icon" type="button" onclick= "LoadPatientData(' + Data.Id + ')"><span class="ul-btn__icon"><i class="i-Pen-2"></i></span></button>   <button class="btn btn-primary btn-icon" type="button" onclick= "SetAppointmentPatient(this,' + Data.Id + ')"><span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span></button>'
        });
    } else {
        for (Count; Count < DataLength; Count++) {
            switch (Data[Count].PatientTypeId) {
                case 1:
                    PatientType = "Adult";
                    break;
                case 2:
                    PatientType = "Child";
                    break;
                case 3:
                    PatientType = "Dependant";
                    break;
            }

            ArrayPatientData.push({
                " ": " ",
                Name: Data[Count].Title + Data[Count].FirstName + " " + Data[Count].LastName,
                "NIC": Data[Count].NIC,
                "Mobile": Data[Count].Mobile,
                Gender: Data[Count].Gender,
                Dep: PatientType,
                Action: '<button class="btn btn-info btn-icon" type="button" onclick= "LoadPatientData(' + Data[Count].Id + ')"><span class="ul-btn__icon"><i class="i-Pen-2"></i></span></button>   <button class="btn btn-primary btn-icon" type="button" onclick= "SetAppointmentPatient(this,' + Data[Count].Id + ')"><span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span></button>'
            });
        }
    }

    new PatientTable().Render(Containers.MainContent, ArrayPatientData);
    CreateDataTable('TableSelectPatient');
}

function LoadPatientData(PatientId) {
    EditPatient_Click();
    _Request.Get(ServiceMethods.GetPatientData + PatientId, PatientId, LoadPatientData_Success);
}

function LoadPatientData_Success(Response) {
    _Id = Response.Data.Id;
    document.getElementById('TxtAddId').value = Response.Data.NIC;
    document.getElementById('TxtAddMobileNumber').value = Response.Data.Mobile;
    document.getElementById('TxtAddFirstName').value = Response.Data.FirstName;
    document.getElementById('TxtAddLastName').value = Response.Data.LastName;
    document.getElementById('TxtAddDateBirth').value = ConvertDate(Response.Data.DateOfBirth);
    document.getElementById('TxtPatientHealthId').innerHTML = Response.Data.UniqueId;

    document.getElementById('TxtAddAddress').value = Response.Data.Address;
    document.getElementById('TxtAddOccupation').value = Response.Data.Occupation;
    document.getElementById('DrpAddPatientMaritalStatus').value = Response.Data.MaritalStatus;

    Response.Data.Gender.toUpperCase() === "MALE" ? document.getElementById('ChkPatientMale').checked = true : document.getElementById('ChkPatientFemale').checked = true;
}


/*=================================
		Session Methods
 =================================*/

function SaveSession_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        CmdCancelSession_Click();
        return ShowMessage(Messages.SessionSaveSuccess, MessageTypes.Success, "Success!");
    }
}

function GetSessionDoctorId() {
    _Request.Get(ServiceMethods.NurseDoctor, _UserId, GetSessionDoctorId_Success);
}

function GetSessionDoctorId_Success(Response) {
    _DoctorSessionData = [];
    if (Response.Data === 0 || Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        let Count;
        let DataLength = Response.Data.length;
        for (Count = 0; Count < DataLength; Count++) {
            _Request.Get(ServiceMethods.DoctorGet + Response.Data[Count].DoctorId, undefined, GetDoctorData_Success);
        }
    }
}

function GetDoctorData_Success(Response) {
    _DoctorSessionData.push(Response.Data);
}

function SetDoctorData(Id) {
    let Count;
    let DataLength = _DoctorSessionData.length;
    for (Count = 0; Count < DataLength; Count++) {
        $('#' + Id).append('<option value="' + _DoctorSessionData[Count].Id + '">' + _DoctorSessionData[Count].FirstName + " " + _DoctorSessionData[Count].LastName + '</option>');
    }
}

function GetDoctorSessionData_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    if (Response.Data.length === 0) return ShowMessage(Messages.NoSession, MessageTypes.Warning, "Warning!"); else FilterDoctorSessionData(Response.Data);
}

function FilterDoctorSessionData(Data) {
    let DataLength = Data.length;
    let Count = 0;
    let Type;
    let ArrayDoctorSessionData = [];

    for (Count; Count < DataLength; Count++) {
        let SelectDate = Data[Count].TimeStart.split("T")[0];

        let RoomNumber = Data[Count].RoomNumber;

        let TimeStartSplit = Data[Count].TimeStart.split("T")[1].split(":");
        let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
        const StartTime = new Date(TimeFormat.DateFormat + TimeStart + 'Z').toLocaleTimeString(Language.SelectLanguage, {
            timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
        });

        let TimeEndSplit = Data[Count].TimeEnd.split("T")[1].split(":");
        let TimeEnd = TimeEndSplit[0] + ":" + TimeEndSplit[1];
        const EndTime = new Date(TimeFormat.DateFormat + TimeEnd + 'Z').toLocaleTimeString(Language.SelectLanguage, {
            timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
        });

        if (Data[Count].Type === 1) Type = "Virtual"; else if (Data[Count].Type === 2) Type = "Physical"; else Type = "Both";


        ArrayDoctorSessionData.push({
            " ": " ",
            "Date": SelectDate,
            "StartTime": StartTime,
            "EndTime": EndTime,
            "Room": RoomNumber,
            Type: Type,
            "Action": '<button class="btn btn-info btn-icon" type="button" onclick= "LoadSessionData(' + Data[Count].Id + ')"><span class="ul-btn__icon"><i class="i-Pen-2"></i></span></button> <button class="btn btn-warning btn-icon" type="button" onclick= "LoadSessionViceAppointments(this,' + Data[Count].Id + ')"><span class="ul-btn__icon"><i class="i-Pen-2"></i></span></button>'
        });
    }
    new DoctorSessionTable().Render('DivSessionTable', ArrayDoctorSessionData);
    CreateDataTable('TableSession');
}

function LoadSessionData(Id) {
    new AddNewSession().Render(Containers.MainContent);
    GetInstituteBranches();
    DatePicker();
    TimePicker();

    _Request.Get(ServiceMethods.SessionGet + Id, undefined, LoadSessionData_Success);
}

function LoadSessionData_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        _SessionId = Response.Data.Id;
        document.getElementById('TxtSessionRoomNumber').value = Response.Data.RoomNumber;
        document.getElementById('TxtSessionDate').value = Response.Data.TimeStart.split("T")[0];
        document.getElementById('TxtSessionStart').value = Response.Data.TimeStart.split("T")[1];
        document.getElementById('TxtSessionEnd').value = Response.Data.TimeEnd.split("T")[1];
        document.getElementById('DrpSessionInstituteBranchId').value = Response.Data.InstituteBranchId;
    }
}

function GetInstituteBranches() {
    _Request.Post(ServiceMethods.InstituteBranch, new Doctor(_DoctorId, undefined), GetInstituteBranches_Success);
}

function GetInstituteBranches_Success(Response) {
    let Count;
    let DataLength = Response.Data.length;
    for (Count = 0; Count < DataLength; Count++) {
        $('#DrpSessionInstituteBranchId').append('<option value="' + Response.Data[Count].Id + '">' + Response.Data[Count].Name + '</option>');
        $('#DrpSessionInstituteBranchId').val(1);
    }
}


/*=================================
		Appoinments Methods
 =================================*/

function GetDoctorSessionDataForAppoinment_Success(Response) {
    $("#DrpSessionDateDoctor").empty();

    if (Response.Status != 1000) $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>'); else {
        let DataLength = Response.Data.length;
        let Count = 0;
        let Type;
        if (DataLength === 0) $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>'); else {
            $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>');
            for (Count = 0; Count < DataLength; Count++) {
                let TimeStartSplit = Response.Data[Count].TimeStart.split("T")[1].split(":");
                let SessionDate = Response.Data[Count].TimeStart.split("T")[0].split(":");

                let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
                const StartTime = new Date(TimeFormat.DateFormat + TimeStart + 'Z').toLocaleTimeString(Language.SelectLanguage, {
                    timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
                });

                let TimeEndSplit = Response.Data[Count].TimeEnd.split("T")[1].split(":");
                let TimeEnd = TimeEndSplit[0] + ":" + TimeEndSplit[1];
                const EndTime = new Date(TimeFormat.DateFormat + TimeEnd + 'Z').toLocaleTimeString(Language.SelectLanguage, {
                    timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
                });

                if (Response.Data[Count].Type === 1) Type = "Virtual"; else if (Response.Data[Count].Type === 2) Type = "Physical"; else Type = "Both";

                $('#DrpSessionDateDoctor').append('<option value="' + Response.Data[Count].Id + '">  Room No ' + Response.Data[Count].RoomNumber + " / " + SessionDate + " / " + StartTime + "-" + EndTime + " / " + Type + '</option>');
            }
        }
    }
}

function GetNextAppoinmentNumber(Id, DoctorName, SessionDetails) {
    new NewAppoinment().Render(Containers.MainContent);
    _AppointmentSessionId = Id;
    if (_PatientId !== null && _PatientId !== undefined) {
        document.getElementById('TxtAppointmentsDetails').innerHTML = "Doctor : Dr." + DoctorName;
        document.getElementById('TxtAppointmentsDetailsSession').innerHTML = "Session : " + SessionDetails;
        document.getElementById('TxtAppointmentsDetailsPatient').innerHTML = "Patient : " + _AppointmentPatientName;
        //document.getElementById('TxtAppointPaymentCheck').innerHTML = "Total Amount : " + _PaymentCheck;
        $(".pres-img").hide();
    } else {
        document.getElementById('TxtAppointmentsDetails').innerHTML = "Dr." + "  " + DoctorName + "<br>" + SessionDetails;

        _ApoointmentHeadingTitle = "Dr." + DoctorName + "/" + SessionDetails;
        $("#BtnSaveAppointment").hide();
        document.getElementById("BtnNewAppointment").style.display = "block";

    }
    _Request.Post(ServiceMethods.NextAppoinment, new SessionId(Id), GetNextAppoinmentNumber_Sucess);
}

function GetNextAppoinmentNumber_Sucess(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else document.getElementById('TxtAppoinmentNumber').value = Response.Data.Number;
}

function SaveAppointment_Success(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        _PatientId = null;
        GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        GetDoctorAppoinmentList();

        //SavePatientAnalytics(Response.Data);
        return ShowMessage(Messages.ApoointmentSaveSuccess, MessageTypes.Success, "Success!");
    }
}

function GetDoctorAppoinmentList() {
    _ArrayAppointedPatientData = [];
    _Request.Post(ServiceMethods.GetAppoinment, new AppointmentList(undefined, undefined, undefined, _AppointmentSessionId), GetDoctorAppoinmentList_Success);
}

function GetDoctorAppoinmentList_Success(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        LoopCount = 0;
        _AppointmentDetails = Response.Data;
        //GetAppointedPatients(Response.Data);

        //*******new
        FilterAppointedPatientData(Response.Data);
        LoadAppointmentedPatientList();
    }
}

function FilterAppointedPatientData(Data) {

    let DataLength = Data.length;
    let Count;

    for (Count = 0; Count < DataLength; Count++) {

        let PaymentStatus = '-';

        switch (Data[Count].Status) {
            case 2:
                PaymentStatus = "<span style='background-color:Green; color:white; padding:5px; text-left'>Paid</span>";
                break;
            case 3:
                PaymentStatus = "<span style='background-color:Red; color:white; padding:5px;'>Pending</span>";
                break;

        }

        let ChannelingStatusOriginal = Data[Count].ChannelingStatus != null ? Data[Count].ChannelingStatus.toLowerCase() : '-';
        let ChannelingStatus = '-';

        if (ChannelingStatusOriginal.includes('unsuccessful')) {
            ChannelingStatus = 'Unsuccessful';

        } else if (ChannelingStatusOriginal.includes('successful')) {
            ChannelingStatus = 'Successful';

        } else if (ChannelingStatusOriginal.includes('pending')) {
            ChannelingStatus = 'Pending';
        }

        // console.log(ChannelingStatusOriginal, ChannelingStatus);

        _ArrayAppointedPatientData.push(
            {
                "No": Data[Count].Number,
                "Name": Data[Count].Title + " " + Data[Count].FirstName + " " + Data[Count].LastName,
                "Mobile": Data[Count].Mobile,
                "Gender": Data[Count].Gender,
                "Payment": PaymentStatus,
                "Status": ChannelingStatus,
                // "Action": '<button class="btn btn-info btn-icon w-25 custom-btn" type="button" onclick="LoadVitals(' + Data[Count].Id + ')">' +
                //     '<span class="ul-btn__icon"><i class="i-Pen-2"> Vitals</i></span>' +
                //     '</button>' +
                //     '<button class="btn btn-info btn-icon w-25 custom-btn mx-2" type="button" onclick="UploadFile(' + Data[Count].Id + ')">' +
                //     '<span class="ul-btn__icon"><i class="i-Upload"> Upload</i></span>' +
                //     '</button>' +
                //     '<button class="btn btn-info btn-icon w-25 custom-btn" type="button" onclick="MedicalBillDisplay(' + Data[Count].Id + ')">' +
                //     '<span class="ul-btn__icon"><i class="i-Billing"> Bill</i></span>' +
                //     '</button>'
                "Action": '<button class="btn btn-info btn-icon w-25 custom-btn" type="button" onclick="LoadVitals(' + Data[Count].Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-info btn-icon w-25 custom-btn mx-2" type="button" onclick="UploadFile(' + Data[Count].Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Upload"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-info btn-icon w-25 custom-btn" type="button" onclick="MedicalBillDisplay(' + Data[Count].Id + ',' + Data[Count].Number + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Billing"></i></span>' +
                    '</button>'
            });

    }
}

function LoadVitals(Id) {
    _PatientId = Id;
    _AppointmentUser = _AppointmentDetails.filter(PId => PId.PatientId === GetPatientOriginalId(Id))[0];

    _Request.Get(ServiceMethods.GetPatientData + Id, Id, LoadPatientDataForVitals_Success);

    new AddVitals().Render(Containers.MainContent);
}

function GetPatientOriginalId(Id) {
    let PId;
    let IdString = Id.toString();

    if (IdString.length >= 7) {
        let A = IdString.substring(0, IdString.length - 2);
        PId = A.substring(4);
    }
    return parseInt(PId);
}

function LoadPatientDataForVitals_Success(Response) {
    _PatientDetails = Response.Data;
}

function UploadFile(PatientId) {
    new DocumentUploader().Render(Containers.MainContent);
    _PatientId = PatientId;
}

function MedicalBillDisplay(PatientId, appId) {
    console.log(appId)
    // console.log('MedicalBillDisplay.PatientId:', PatientId);
    // console.log('MedicalBillDisplay._AppointmentDetails:', _AppointmentDetails);
    const PatientMatched = _AppointmentDetails.filter((Patient) => Patient.Id === PatientId)[0];
    // console.log('MedicalBillDisplay.PatientMatched:', PatientMatched);
    new MedicalBill(PatientMatched, appId).Render(Containers.Footer);
}

function medicalBillTableFirstRowReplace() {
    $("#TblPatientInvoiceBody").html('');
    $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
}

function medicalBillTableRowAdd() {
    $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
    medicalBillTableRowCountReset();
    medicalBillTableButtonsReset();
}

function medicalBillTableAllRowsRemove() {
    $("#TblPatientInvoiceBody").html('');
    $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
    medicalBillTableButtonsReset();
    $('#TxtDiscount').val('');
    $('#TxtTotal').text(0);
}

function medicalBillTableRowDelete(TableRowElement) {
    $(TableRowElement).closest('tr').remove();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
    medicalBillTableButtonsReset();
}

function medicalBillTableTotalSumGet() {
    let FeeAmounts = document.getElementsByName('TxtFeeAmount');
    let Sum = 0;
    let TableRow = '';
    let TableRowValue = '';
    for (let i = 0; i < FeeAmounts.length; i++) {
        TableRow = FeeAmounts[i].value;
        TableRowValue = TableRow != NaN && TableRow != '' ? parseInt(TableRow) : 0;
        Sum += TableRowValue;
    }
    let Discount = $('#TxtDiscount').val() != NaN && $('#TxtDiscount').val() != '' ? parseInt($('#TxtDiscount').val()) : 0;
    let Total = Sum - Discount;
    if (Total < 0) {
        Total = 0;
    } else {
        Total = Sum - Discount;
    }
    $('#TxtTotal').text(Total);
    $('#TxtDiscount').attr('max', (Sum));
}

function medicalBillTableRowCountReset() {
    let TableRows = $('#TblPatientInvoiceBody .TblRow');
    let TableRow = '';
    let FirstColumnValue = 0;
    for (let i = 0; i < TableRows.length; i++) {
        TableRow = TableRows[i];
        FirstColumnValue = $(TableRow).find('td:eq(0)').text((i + 1));
    }
}

function medicalBillTableButtonsReset() {
    let Columns = $('#TblPatientInvoiceBody .ButtonHolderColumn');
    if (Columns.length === 1) {
        $(Columns[0]).html(_MedicalBillTableButtonAddRow);
    } else {
        let Column = '';
        for (let i = 0; i < Columns.length; i++) {
            Column = Columns[i];
            if (i === Columns.length - 1) {
                $(Column).html(_MedicalBillTableButtonAddRow + _MedicalBillTableButtonDelete);
            } else {
                $(Column).html(_MedicalBillTableButtonDelete);
            }
        }
    }
}

function medicalBillInputsValidate(PatientId, appId) {
    // console.log('MedicalBillDisplay.PatientId:', PatientId);
    // console.log('MedicalBillDisplay._AppointmentDetails:', _AppointmentDetails);
    const PatientMatched = _AppointmentDetails.filter((Patient) => Patient.Id === PatientId)[0];

    let TableRows = $('#TblPatientInvoiceBody .TblRow');
    let TableRow = '';
    let Item = '-';
    let FeeType = '-';
    let FeeAmount = 0;
    let TotalInputElements = 0;
    let FilledInputElements = 0;
    const MedicalBillItems = [];
    let MedicalBillItem = {};

    for (let i = 0; i < TableRows.length; i++) {
        TableRow = TableRows[i];
        Item = $(TableRow).find('#TxtItem').val() !== '' ? $(TableRow).find('#TxtItem').val() : '';
        FeeType = $(TableRow).find('#TxtFeeType').val() !== '' ? $(TableRow).find('#TxtFeeType').val() : '';
        FeeAmount = $(TableRow).find('#TxtFeeAmount').val() > 0 ? $(TableRow).find('#TxtFeeAmount').val() : 0;
        TotalInputElements += 3;
        if (Item !== '') {
            FilledInputElements++;
        }
        if (FeeType !== '') {
            FilledInputElements++;
        }
        if (FeeAmount > 0) {
            FilledInputElements++;
        }
        MedicalBillItem = {
            'Item': Item, 'FeeType': FeeType, 'FeeAmount': FeeAmount
        };
        MedicalBillItems.push(MedicalBillItem);
    }

    // console.log('medicalBillInputsValidate.MedicalBillItems:', MedicalBillItems);
    let date = new Date();
    let month = parseInt(date.getMonth()) + 1;
    const DateTime = date.getFullYear() + '-' +
        ("0" + month).slice(-2) + '-' +
        ("0" + date.getDate()).slice(-2) + ' ' +
        ("0" + date.getHours()).slice(-2) + ':' +
        ("0" + date.getMinutes()).slice(-2);

    const PatientsAge = parseInt(date.getFullYear().toString()) - parseInt(PatientMatched.DateOfBirth.split('-')[0]);
    // console.log('PatientsAge:', PatientsAge);

    const Patient = {
        'Doctor': 'Dr. Maester Luwin',
        'PatientName': PatientMatched.Title + ' ' + PatientMatched.FirstName + ' ' + PatientMatched.LastName,
        'Age': PatientsAge,
        'TelephoneNumber': PatientMatched.Mobile
    };
    const MedicalBill = {
        'Items': MedicalBillItems,
        'Discount': $('#TxtDiscount').val() !== '' ? $('#TxtDiscount').val() : 0,
        'Total': $('#TxtTotal').text(),
        'AppDate': DateTime,
        'AppNumber': appId,
        'BillNumber': 'SO/SC/57333',
        'BillDate': DateTime.split(' ')[0],
        'BillUser': 'Margery',
        'BillTime': DateTime.split(' ')[1]
    };
    const JsonObjectToSave = {
        'Patient': Patient,
        'Bill': MedicalBill,
        'UserId': _UserId,
    }

    if (FilledInputElements === TotalInputElements) {
        medicalBillSaveInLocalStorage(JSON.stringify(JsonObjectToSave));
    } else {
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }
}

function medicalBillSaveInLocalStorage(JsonString) {
    // console.log('medicalBillSaveInLocalStorage.JsonString:', JsonString);
    if (localStorage.getItem('MedicalBill') == null) {
        localStorage.setItem('MedicalBill', '{}');
    }
    localStorage.setItem('MedicalBill', JsonString);

    $('#ModalMedicalBill').modal('hide');

    medicalBillPrint();
}

function medicalBillPrint() {
    new MedicalBillPrintPageIframeModal().Render(Containers.Footer);

    $('#ModalForMedicalBillIframe .modal-body').html('');
    const Iframe = '<iframe height="650px" src="medical-bill.html?v1=1" class="w-100 h-700" frameborder="0" allowfullscreen></iframe>';
    $('#ModalForMedicalBillIframe .modal-body').append(Iframe);
    $('#ModalForMedicalBillIframe').modal('show');
}

function ClinicMedicalBillNestedPrint(ResponseData) {
    console.log('ClinicMedicalBillNestedPrint.ResponseData:', ResponseData);

    //hide currently opened modal
    $('#ModalForClinicMedicalBill').modal('hide');

    //save api response in local-storage
    if (localStorage.getItem('ClinicMedicalBill') == null) {
        localStorage.setItem('ClinicMedicalBill', '{}');
    } else {
        localStorage.setItem('ClinicMedicalBill', JSON.stringify(ResponseData));
    }

    //display the modal with the iframe
    new ClinicMedicalBillNestedPrintPageIframeModal().Render(Containers.Footer);

    $('#ModalForClinicMedicalBillIframe .modal-body').html('');
    const Iframe = '<iframe src="clinic-medical-bill.html" class="w-100 h-650" frameborder="0" allowfullscreen></iframe>';
    $('#ModalForClinicMedicalBillIframe .modal-body').append(Iframe);
    $('#ModalForClinicMedicalBillIframe').modal('show');
}

function ClinicMedicalBillGet_Success(Response) {
    if (Response.Data.length === 0 || Response.Status !== 1000) {
        return ShowMessage(Messages.NoData, MessageTypes.Warning, "Oops!");
    } else {
        console.log('ClinicMedicalBillGet_Success.Response.Data:', Response.Data[0]);
        ClinicMedicalBillNestedPrint(Response.Data[0]);
    }
}

function LoadPrescriptionRecordDrugs_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else FilterPrescriptionRecordDrugs(Response.Data);
}

function AddVitals(PatientId) {
    const PatientMatched = _AppointmentDetails.filter((Patient) => Patient.Id === PatientId)[0];
    new Vitals(PatientMatched).Render(Containers.MainContent);
}

function LoadAppointmentedPatientList() {
    new TablePatientAppointment().Render('DivAppointedPatientTable', _ArrayAppointedPatientData);
    CreateDataTable('TableAppointedPatient');
    if (_PatientId !== null && _PatientId !== undefined) {
        $(".pres-img").hide();
    }
}

function UploadPatientReport() {
    if ($("#FilePrescriptionChoosen")[0].files[0] == undefined) {
        return ShowMessage(Messages.EmptyFileUpload, MessageTypes.Error, "Error!");
    } else {
        let Params = new Map();
        Params.set("file", $("#FilePrescriptionChoosen")[0].files[0]);
        Params.set("PatientId", _PatientId);
        Params.set("UserSaved", 14);
        Params.set("ReportType", "Prescription");
        Params.set("Description", " ");

        _HttpRequestMultiPartWithoutAsync.Post(ServiceMethods.PatientReportSave, Params, SavePrescriptionFile_Success);
    }
}

function Clear() {
    new Appoinments().Render(Containers.MainContent);
}

function SavePatientAnalytics(Data) {
    Height = parseInt(document.getElementById('TxtBMIHeight').value);
    Weight = parseInt(document.getElementById('TxtBMIWeight').value);
    BloodPressureSystolic = parseInt(document.getElementById('TxtPressureBpSystolic').value);
    BloodPressureDiastolic = parseInt(document.getElementById('TxtPressureBpDiastolic').value);
    PulseRate = parseInt(document.getElementById('TxtPressurePulse').value);
    Temperature = parseInt(document.getElementById('TxtPressureTemp').value);
    let Patient = new SavePatientDetails(0, _PatientDetails.FirstName, _PatientDetails.LastName, _PatientDetails.NIC, _PatientDetails.Passport, _PatientDetails.Mobile, _PatientDetails.Gender, _PatientDetails.Title, undefined, _PatientDetails.DateOfBirth, _PatientDetails.UserSaved, undefined, _PatientDetails.ParentId, undefined, undefined, undefined, undefined);
    let Appoinment = new SaveAppointment(_AppointmentUser.Id, _AppointmentUser.Number, _AppointmentUser.SessionId, _AppointmentUser.PatientId, _AppointmentUser.Status, _AppointmentUser.UserSaved);
    _Request.Post(ServiceMethods.SaveAnalaytics, new MedicalAnalytic(0, _AppointmentUser.Id, _AppointmentUser.PatientId, Weight, Height, PulseRate, BloodPressureSystolic, BloodPressureDiastolic, Temperature, Patient, Appoinment, _UserId), SavePatientAnalytics_Success);
}

function SavePatientAnalytics_Success(Response) {
    if (Response.Status !== 1000) {
        return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    } else {
        return ShowMessage(Response.Message, MessageTypes.Success, "Done!");
    }
}

function SaveReportFile_Success(Response) {
    if (Response.Status != 0) return ShowMessage(Messages.ReportUploadFailed, MessageTypes.Error, "Error!");
    return ShowMessage(Messages.ReportUploadSuccess, MessageTypes.Success, "Success!");
}

function BMICalculator() {
    var height = document.getElementById('TxtBMIHeight').value;
    var weight = document.getElementById('TxtBMIWeight').value;

    var finalWeight = weight * .45;
    var finalHeight = height * .025;

    var BMI = (finalWeight / Math.pow(finalHeight, 2));

    document.getElementById('TxtBMIValue').innerHTML = "Your BMI Is: " + BMI;
}


/*=================================
		Pharmacy Methods
 =================================*/

function GetPrescriptionList() {
    _Request.Post(ServiceMethods.PrescriptionRecords, new Prescription(0, _UserBranchId), GetPrescriptionList_Success)
}

function GetPrescriptionList_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else FilterPrescriptionData(Response.Data);
}

function FilterPrescriptionData(Data) {
    _ArrayPrescriptionData = Data;
    let DataLength = Data.length;
    let Count = 0;
    let ArrayPrescriptionData = [];

    for (Count; Count < DataLength; Count++) {
        let Status;
        let NextStatus;
        switch (Data[Count].Status) {
            case 1:
                Status = "New";
                NextStatus = "Ready";
                break;
            case 2:
                Status = "Ready";
                NextStatus = "Issue";
                break;
            case 3:
                Status = "Issued";
                NextStatus = "Issued";
                break;
        }

        ArrayPrescriptionData.push({
            "No": Count + 1,
            "Prescription Id": Data[Count].PrescriptionId,
            "Name": Data[Count].PatientFullName,
            "Health Id": Data[Count].HealthId !== null ? Data[Count].HealthId : '-',
            "Status": '<button class="btn btn-info btn-icon mr-2">' + Status + '</button>' +
                '<button class="btn btn-primary btn-icon mr-2" onclick= "LoadPrescriptionRecordDrugs(' + Data[Count].Id + ')">View</button>' +
                '<button class="btn btn-info btn-icon mr-2" onclick= "LoadContactData(' + Data[Count].Id + ')">Contact</button>' +
                '<button class="btn btn-info btn-icon mr-2" onclick= "UpdateIssueStatus(' + Data[Count].Id + ')">' + NextStatus + '</button>' +
                '<button class="btn btn-info btn-icon" onclick= "ClinicMedicalBillPrint(' + Data[Count].Id + ')">Print</button>'
        });
    }
    new Pharmacy().Render(Containers.MainContent, ArrayPrescriptionData);
    CreateDataTable('TablePharmacyPrescription');
}

function ClinicMedicalBillPrint(PrescriptionId) {
    const PrescriptionMatched = _ArrayPrescriptionData.filter((Prescription) => Prescription.Id === PrescriptionId)[0];
    new ClinicMedicalBillPrintPageIframeModal(PrescriptionMatched).Render(Containers.Footer);
}

function ClinicMedicalBillsSearchFormRender() {
    new ClinicBillSearchForm().Render('ClinicMedicalBillsSearch');
}

function ClinicMedicalBillsSearch_Success(Response) {
    if (Response.Data.length === 0 || Response.Status !== 1000) {
        swal({
            title: 'Oops!',
            text: "No Bills Found!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0CC27E',
            cancelButtonColor: '#FF586B',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonClass: 'btn btn-success mr-5',
            cancelButtonClass: 'btn btn-danger',
            buttonsStyling: false

        }).then(function () {
            // AddPatient_Click();
        }, function (dismiss) {
            if (dismiss === 'cancel') {

            }
        });
    } else {
        // console.log('ClinicMedicalBillsSearch_Success.Response.Data:', Response.Data);
        _ArrayClinicBillsSearchResultsData = Response.Data;
        ClinicMedicalBillsSearchResultsTableDisplay(Response.Data);
    }
}

function ClinicMedicalBillsSearchResultsTableDisplay(Data) {
    const ArrayBillSearchResultsData = [];

    // console.log('ClinicMedicalBillsSearchResultsTableDisplay.Data:', Data);

    if (Data.length > 0) {

        for (let Count = 0; Count < Data.length; Count++) {

            let PaymentStatus = '-';

            switch (Data[Count].Status) {
                case 2:
                    PaymentStatus = "<span style='background-color:Green; color:white; padding:5px; text-left'>Paid</span>";
                    break;
                case 3:
                    PaymentStatus = "<span style='background-color:Red; color:white; padding:5px;'>Pending</span>";
                    break;
            }

            let ChannelingStatusOriginal = Data[Count].ChannelingStatus != null ? Data[Count].ChannelingStatus.toLowerCase() : '-';
            let ChannelingStatus = '-';

            if (ChannelingStatusOriginal.includes('unsuccessful')) {
                ChannelingStatus = 'Unsuccessful';

            } else if (ChannelingStatusOriginal.includes('successful')) {
                ChannelingStatus = 'Successful';

            } else if (ChannelingStatusOriginal.includes('pending')) {
                ChannelingStatus = 'Pending';
            }

            ArrayBillSearchResultsData.push({
                "No": Data[Count].Number,
                "Name": Data[Count].Title + " " + Data[Count].FirstName + " " + Data[Count].LastName,
                "Mobile": Data[Count].Mobile,
                "Gender": Data[Count].Gender,
                "Payment": PaymentStatus,
                "Status": ChannelingStatus,
                "Action": '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="ClinicPrescriptionDisplay(' + Data[Count].Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-info btn-icon custom-btn mx-2" type="button" onclick="ClinicMedicalBillGet(' + Data[Count].Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Billing"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="ClinicReferenceLetterDisplay(' + Data[Count].Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Letter-Open"></i></span>' +
                    '</button>'
            });

        }
    }

    new ClinicBillSearchResultsTable().Render('ClinicMedicalBillsSearchResults', ArrayBillSearchResultsData);
    CreateDataTable('TableClinicMedicalBillsSearchResults');

    //add pagination
    // TablePaginationAdd('TableClinicMedicalBillsSearchResults', 'desc', 10);
}

function TablePaginationAdd(TableId, DisplayOrder, MinimumRowCount) {
    $(TableId).DataTable({
        order: [[0, DisplayOrder]],
        "pageLength": MinimumRowCount
    });
}

function ClinicPrescriptionDisplay(PrescriptionId) {
    console.log('ClinicPrescriptionDisplay.PrescriptionId:', PrescriptionId);
}

function ClinicReferenceLetterDisplay(PrescriptionId) {
    console.log('ClinicReferenceLetterDisplay.PrescriptionId:', PrescriptionId);
}

function ClinicMedicalBillDisplay(PrescriptionId) {
    console.log('ClinicMedicalBillDisplay.PrescriptionId:', PrescriptionId);
}

function LoadContactData(PrescriptionId) {
    // console.log('LoadContactData.PrescriptionId:', PrescriptionId);
}

function UpdateIssueStatus(PrescriptionId) {
    // console.log('UpdateIssueStatus.PrescriptionId:', PrescriptionId);
}

function ClinicMedicalBillsModalDisplay() {
    new ClinicMedicalBillsSearchModal().Render(Containers.Footer);
}

function LoadPrescriptionRecordDrugs_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else FilterPrescriptionRecordDrugs(Response.Data);
}

function FilterPrescriptionRecordDrugs(Data) {
    _ArrayDrugData = Data;
    let DataLength = Data.length;
    let Count = 0;
    let ArrayDrugsData = [];
    for (Count; Count < DataLength; Count++) {
        ArrayDrugsData.push({
            " ": " ",
            "No": Count + 1,
            "BrandName": Data[Count].GenericName + " (" + Data[Count].TradeName + ")",
            "Dosage": Data[Count].WeightType,
            "Frequency": Data[Count].Frequency,
            "Duration": Data[Count].Duration,
            "Available": '<label class="switch pr-5 switch-primary mr-3"><span></span><input type="checkbox" Id="AvailableRecordDrug_' + Count + '" DrugId="' + Data[Count].DrugId + '" RecordDrugId="' + Data[Count].Id + '"> <span class="slider"></span></label>'
        });
    }
    new PharmacyPrescription().Render(Containers.MainContent, ArrayDrugsData);
    CreateDataTable('TableDrugList');

    switch (_ArrayPrescriptionData[0].Status) {
        case 1:
            document.getElementById("BtnStatusUpdate").value = "Ready";
            break;
        case 2:
            document.getElementById("BtnStatusUpdate").value = "Issue";
            break;
        case 3:
            document.getElementById("BtnStatusUpdate").value = "Issued";
            break;
    }
}

function AvailableDrugStatusSave(RecordDrugs, Id, PrescriptionId, AppointmentId, PatientId, Status, UserSaved) {
    let Entity = new RecordDrugsUpdatesDetails(RecordDrugs, Id, PrescriptionId, AppointmentId, PatientId, Status, UserSaved);
    _Request.Post("AppointmentPrescriptionRecord/Update", Entity, AvailableDrugStatusSave_Success);
}

function AvailableDrugStatusSave_Success(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        ShowMessage(Response.Message, MessageTypes.Success, "Success!");
        GetPrescriptionList();
    }
}

function FooterDefaultContentReset() {
    new Footer().Render(Containers.Footer);
}
