/*=================================
			Event Handlers
 =================================*/

function CmdLogin_Click(Sender) {
    if (!ValidateFields("UserLogin"))
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");

    _Request.Post(ServiceMethods.Login, new UserCredential(document.getElementById("TxtUsername").value, document.getElementById("TxtPassword").value), Login_Success);

}

function Welcome_Load() {
    let UserMobileNumber = new MobileNumber(_Username);
    _Request.Post(ServiceMethods.GetPatient, UserMobileNumber, Welcome_Success);
}

function CmdFullScreen_Click() {
    var elem = document.documentElement;

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    }
}

function LnkRecover_Click() {
    return ShowMessage(Messages.ResetPassword, MessageTypes.Warning, "Warning!");
}

function LnkDoctorOnline_Click() {
    //a.href = "www.doctoronline.lk";
    //document.body.prepend(a);

    window.location.replace("http://www.doctoronline.lk");
}

function LnkVirtualconsultation_Click() {
    window.location.replace("https://docnote.medica.lk/");
}

function LnkEditProfile_Click() {
    new Profile().Render(Containers.MainContent);

    document.getElementById('UserFullName').innerHTML = _PatientTitle + " " + _PatientFirstName + " " + _PatientLastName;
    document.getElementById('UserAge').innerHTML = _PatientAge + " Years";
    document.getElementById('UserGender').innerHTML = _PatientGender;
    GetDependentData();
}

function LnkResetPassword_Click() {
    new ResetPassword().Render(Containers.MainContent);
}

function LnkQrCode_Click() {
    new ShowQrCode().Render(Containers.MainContent);

    const QrCode = new QRCode(document.getElementById('QrCode'),
        {
            text: 'http://jindo.dev.naver.com/collie',
            width: 128,
            height: 128,
            colorDark: '#000',
            colorLight: '#fff',
            correctLevel: QRCode.CorrectLevel.H
        });

    QrCode.set
    ({
        size: 450,
        value: _MedicaId
    });
}


/*=================================
			Patient Events
 =================================*/

function CmdPatientSearch_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        // CardClicked = '';
        _CardClicked = 'PatientSearch';
        // console.log('_CardClicked:', _CardClicked);
        _AppointmentSessionId = undefined;
        new PatientSearch().Render(Containers.MainContent);
    }

}

function CmdSearchPatient_Click() {
    let PatientNicNumber = document.getElementById('TxtPatientNIC').value;
    let PatientMobileNumber = document.getElementById('TxtPatientMobileNumber').value;
    let PatientHealthID = document.getElementById('TxtPatientHealthID').value;
    let PatientName = "";//document.getElementById('TxtPatientName').value;
    let PatientDateBirth = document.getElementById('TxtPatientDateBirth').value;

    _PatientNIC = PatientNicNumber;
    _PatientMobile = PatientMobileNumber;

    if (ValidateNIC(PatientNicNumber) === false && PatientNicNumber != "")
        return ShowMessage(Messages.InvalidNIC, MessageTypes.Warning, "Warning!");

    if (ValidateMobile(PatientMobileNumber) === false && PatientMobileNumber != "")
        return ShowMessage(Messages.InvalidMobileNumber, MessageTypes.Warning, "Warning!");

    if (PatientNicNumber === "" && PatientMobileNumber === "" && PatientHealthID === "" && PatientName === "")
        return ShowMessage(Messages.SearchFieldValidate, MessageTypes.Warning, "Warning!");
    else {
        if (PatientNicNumber === "")
            PatientNicNumber = undefined;

        if (PatientMobileNumber === "")
            PatientMobileNumber = undefined;

        if (PatientHealthID === "")
            PatientHealthID = undefined;

        if (PatientName === "")
            PatientName = undefined;

        if (PatientDateBirth === "")
            PatientDateBirth = undefined;

        if (PatientName != null) {
            return ShowMessage(Messages.NoAuthorizedSearch, MessageTypes.Warning, "Warning!");
        }

        _Request.Post(ServiceMethods.GetPatient, new SearchPatient(PatientNicNumber, PatientMobileNumber, PatientDateBirth, PatientName, undefined, PatientHealthID), GetPatientData_Success);
    }
}

function CmdClearSearchPatient_Click() {
    document.getElementById("TxtPatientNIC").value = "";
    document.getElementById("TxtPatientDateBirth").value = "";
    document.getElementById("TxtPatientMobileNumber").value = "";
    document.getElementById("TxtPatientHealthID").value = "";
}

function TxtPatientNIC() {
    document.getElementById("CmdSearch").disabled = false;
}

function LoadSessionViceAppointments(Object, SessionId) {
    _AppointmentSessionId = SessionId;

    var CurrentRow = $(Object).closest("tr");
    let SelectDate = CurrentRow.find("td:eq(0)").text();
    let StartTime = CurrentRow.find("td:eq(1)").text();
    let EndTime = CurrentRow.find("td:eq(2)").text();
    let RoomNumber = CurrentRow.find("td:eq(3)").text();
    let Type = CurrentRow.find("td:eq(4)").text();

    let SessionDetails = "Room No " + RoomNumber + " / " + SelectDate + "/" + StartTime + "-" + EndTime + "/" + Type;

    _SessionDetails = SessionDetails;

    ViewAppointmentedPatientList();
}

async function cancelAllAppointments() {

    //filter out appointments that are not cancelled already
    let appointmentsNotCancelled = _ArrayAppointmentsForToday.filter(appointment => appointment.ChannelingStatus !== 'cancelled');
    console.log(_ArrayAppointmentsForToday);
    console.log(_SessionId);
    ShowMessage(`<i id='count'> Cancelling appointments 0 of ${appointmentsNotCancelled.length}</i>`, MessageTypes.Success, "Success!");

    const count = document.getElementById('count');

    let completed = 1;

    function setCompletedCount() {
        count.innerHTML = `Cancelling appointments ${completed} of ${appointmentsNotCancelled.length}`;
        completed++;
    }

    function setCompletedStatus() {
        count.innerHTML = `All appointments cancelled and patients were notified`;
    }

    for (let i = 0; i < appointmentsNotCancelled.length; i++) {
        try {
            let doctorName = appointmentsNotCancelled[i].DoctorName;
            let startingDateTime = appointmentsNotCancelled[i].TimeStart;
            let id = appointmentsNotCancelled[i].Id;
            let number = appointmentsNotCancelled[i].Number;
            let patientId = appointmentsNotCancelled[i].PatientId;
            let sessionId = appointmentsNotCancelled[i].SessionId;
            let mobile = appointmentsNotCancelled[i].Mobile;

            console.log(appointmentsNotCancelled[i])

            let result = await PostAsync({
                serviceMethod: ServiceMethods.ChanalingStatusSave,
                requestBody: {
                    "AppointmentId": id,
                    "SessionId": sessionId,
                    "PatientId": patientId,
                    "DoctorStatus": "Cancel Appointment",
                    "ChanalingStatus": "cancelled",
                    "Id": 0
                }
            })

            // notify patients
            let status = await PostAsync({
                serviceMethod: ServiceMethods.SENDSMS,
                requestBody: {
                    "ScheduleMedium": [
                        {
                            "MediumId": 1,
                            "Destination": mobile,
                            "Status": 0
                        }
                    ],
                    "ScheduleMediumType": [
                        {
                            "MediumId": 1,
                            "Destination": mobile,
                            "Status": 0
                        }
                    ],
                    "NotifactionType": 1,
                    "Message": `Appointment Cancelled! Docnote Booking Reference Number : ${id}, Appointment Number: ${number}, Doctor: ${doctorName}, Session Date: ${startingDateTime.split("T")[0]}, Session Start Time: ${new Date(startingDateTime).toLocaleString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    })}`,
                    "Status": 0
                }
            })
            setCompletedCount();
        } catch (e) {
            console.log(e);
        }
    }
    setCompletedStatus();
    GetDoctorAppoinmentList();

}

function SetAppointmentPatient(Object, PatientId) {
    var CurrentRow = $(Object).closest("tr");
    _AppointmentPatientName = CurrentRow.find("td:eq(1)").text();

    _PatientId = PatientId;
    InitRequestHandler();

    ViewAppointmentedPatientList();
}

function ViewAppointmentedPatientList() {
    if (_AppointmentSessionId !== null && _AppointmentSessionId !== undefined) {
        new NewAppoinment().Render(Containers.MainContent);
        CmdBtnColorRemove_Click();
        $('#AppoinmentsCard').css('background-color', '#BDC3C7');
        // GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        GetDoctorAppoinmentList();
    } else {
        new Appoinments().Render(Containers.MainContent);
        GetSessionDoctorId('DrpAppoinmentDoctor');
        SetDoctorData('DrpAppoinmentDoctor');
    }
}

function AddPatient_Click() {
    _Id = 0;
    new NavEditPatient().Render(Containers.MainContent);
    document.getElementById('nav-primary-tab').click();

    if (_PatientNIC != undefined && _PatientNIC != null && _PatientNIC != "") {
        document.getElementById('TxtAddId').value = _PatientNIC;
        CmdGetDOBandGender();
    }

    if (_PatientMobile != undefined && _PatientMobile != null && _PatientMobile != "")
        document.getElementById('TxtAddMobileNumber').value = _PatientMobile;

    DatePicker();
}

function CmdGetDOBandGender() {
    var GetDateofBirth = GetDateOfBirthByNIC(document.getElementById('TxtAddId').value).split("/");
    document.getElementById('TxtAddDateBirth').value = GetDateofBirth[0] + "-" + GetDateofBirth[1] + "-" + GetDateofBirth[2];

    if (GetDateofBirth[3] == "Male")
        document.getElementById("ChkPatientMale").checked = true;

    if (GetDateofBirth[3] == "Female")
        document.getElementById("ChkPatientFemale").checked = true;
}

function SavePatient_Click() {
    let Passport = undefined;
    let PatientTypeId = 1;
    let Gender;

    let NIC = document.getElementById('TxtAddId').value;
    let Title = document.getElementById('DrpAddPatientTtitle').value;
    let MobileNumber = document.getElementById('TxtAddMobileNumber').value;
    let FirstName = document.getElementById('TxtAddFirstName').value;
    let LastName = document.getElementById('TxtAddLastName').value;
    let DateBirth = document.getElementById('TxtAddDateBirth').value;
    let Address = document.getElementById('TxtAddAddress').value;
    let Occupation = document.getElementById('TxtAddOccupation').value;
    let MaritalStatus = document.getElementById('DrpAddPatientMaritalStatus').value;

    if (document.getElementById("ChkPatientMale").checked === true)
        Gender = "MALE";
    else if (document.getElementById("ChkPatientFemale").checked === true)
        Gender = "FEMALE";

    let PatientData = new SavePatientDetails(_Id, FirstName, undefined, LastName, NIC, Passport, MobileNumber, Gender, Title, DateBirth, PatientTypeId, getCookie("UserId"), undefined, MaritalStatus, Occupation, Address, "");

    _Request.Post(ServiceMethods.SavePatient, PatientData, SaveDetails_Success);
}

function SaveBillData(printData) {

    var dataset = [];

    $('#TblPatientInvoice > tbody  > tr').each(function (index, tr) {
        dataset.push(new BillData(tr.cells[3].children[0].value, tr.cells[2].children[0].value, tr.cells[1].children[0].value))
    });

    var allData = new Bill(billId, selectedSessionId, selectedDoctorId, selectedPatientId
        , $('#TxtDiscount').val() !== '' ? $('#TxtDiscount').val() : 0
        , $('#TxtTotal').text(), selectedAppId, dataset, selectedAppointmentId)

    // console.log(allData);

    _Request.Post(ServiceMethods.BillSave, allData, function (res) {
        printData.Bill.BillNumber = 'SO/SC/' + String(res.Data.Id).padStart(5, '0');
        medicalBillSaveInLocalStorage(JSON.stringify(printData));
    });
}


function SetPatientDataByNIC() {
    let NIC = document.getElementById('TxtAddMobileNumber').value;
    if (GetDateOfBirthByNIC(NIC) === null)
        return ShowMessage(Messages.InvalidNIC, MessageTypes.Warning, "Warning!");
    else {
        let NICDetailsArray = GetDateOfBirthByNIC(NIC).split("/");
        document.getElementById('TxtAddDateBirth').value = NICDetailsArray[0] + "-" + NICDetailsArray[1] + "-" + NICDetailsArray[2];
    }
}

function EditPatient_Click() {
    new NavEditPatient().Render(Containers.MainContent);
    document.getElementById('nav-primary-tab').click();
    document.querySelectorAll('.Add-Patient-Div').forEach(function (Element) {
        Element.style.display = 'none';
    });
}

function CmdPrimaryPatient_Click() {
    new AddPatient().Render("nav-primary");
}

function CmdAddPatientCancel_Click() {
    new PatientSearch().Render(Containers.MainContent);
}


/*=================================
			Session Events
 =================================*/

function CmdSession_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        new Session().Render(Containers.MainContent);
        SetDoctorData('DrpSessionDoctor');
    }

}

function CmdAddSession_Click() {
    if (document.getElementById('DrpSessionDoctor').value === '0')
        return ShowMessage(Messages.SelectDoctor, MessageTypes.Warning, "Warning!");
    else {
        _SessionId = 0;
        _DoctorId = document.getElementById('DrpSessionDoctor').value;
        new AddNewSession().Render(Containers.MainContent);
        GetInstituteBranches();
        DatePicker();
        TimePicker();
    }
}

function CmdSaveSession_Click() {
    let RoomNumber = document.getElementById('TxtSessionRoomNumber').value;
    let SessionDate = document.getElementById('TxtSessionDate').value;
    let StartTime = document.getElementById('TxtSessionStart').value;
    let EndTime = document.getElementById('TxtSessionEnd').value;
    let BranchId = document.getElementById('DrpSessionInstituteBranchId').value;
    let SessionType = document.getElementById('DrpSessionType').value;

    if (RoomNumber === "" || SessionDate === "" || StartTime === "" || EndTime === "" || BranchId === 0 || SessionType === 0)
        return ShowMessage(Messages.SearchFieldValidate, MessageTypes.Warning, "Warning!");

    _Request.Post(ServiceMethods.SaveSession, new SessionSave(_SessionId, null, _DoctorId, BranchId, RoomNumber, 1, SessionType, SessionDate, EndTime, StartTime, _UserId), SaveSession_Success);
}

function CmdSessionSearch_Click() {
    _DoctorId = document.getElementById('DrpSessionDoctor').value;
    _AppointmentDoctorName = $("#DrpSessionDoctor option:selected").text();
    // _AppointmentSessionId = parseInt(document.getElementById('DrpSessionDateDoctor').value);
    // selectedDoctorId = $("#DrpAppoinmentDoctor option:selected")[0].value;
    // _SessionDetails = $("#DrpSessionDateDoctor option:selected").text();
    // selectedSessionId = $("#DrpSessionDateDoctor option:selected")[0].value;

    if (document.getElementById('DrpSessionDoctor').value === '0')
        return ShowMessage(Messages.SelectDoctor, MessageTypes.Warning, "Warning!");

    _Request.Post(ServiceMethods.SessionsGet, new Doctor(_DoctorId, null), GetDoctorSessionData_Success);
}

function CmdCancelSession_Click() {
    // CmdSession_Click();
    CmdSession_Click(document.getElementById('SessionCard'));
    // _UpdateSession = false;
    // document.getElementById('DrpSessionDoctor').value = _DoctorId;
    // _Request.Post(ServiceMethods.SessionsGet, new Doctor(_DoctorId, null), GetDoctorSessionData_Success);
    new Session().Render(Containers.MainContent);
    SetDoctorData('DrpSessionDoctor');
}


/*=================================
			Appoiment Events
 =================================*/

function CmdAppoinments_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        _CardClicked = 'Appointments';
        // console.log('_CardClicked:', _CardClicked);
        _PatientId = undefined;
        InitRequestHandler();
        _AppointmentPatientName = undefined;
        // new Appoinments().Render(Containers.MainContent);
        new NewAppoinment().Render(Containers.MainContent);
        GetAllPatientAppointmentsList('all');
        SetDoctorData('DrpAppoinmentDoctor');
    }
}

function GetDoctorSessionDataForAppoinment(CardType) {
    // console.log('GetDoctorSessionDataForAppoinment.CardType:', CardType);
    // _Request.Post(ServiceMethods.SessionGetByDate, new Doctor(document.getElementById('DrpAppoinmentDoctor').value, null), GetDoctorSessionDataForAppoinment_Success);
    const AppointmentDoctorId = document.getElementById('DrpAppoinmentDoctor').value;
    if (CardType === 'Appoinments') {
        var GetCurrentDate = new Date();
        var GetTodayDate = GetCurrentDate.getFullYear() + '-' + (GetCurrentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + GetCurrentDate.getDate().toString().padStart(2, "0");
        // console.log('GetDoctorSessionDataForAppoinment:', document.getElementById('DrpAppoinmentDoctor').value, GetTodayDate);
        _Request.Post(ServiceMethods.SessionGetByDate, new GetSessions(AppointmentDoctorId, GetTodayDate, null), GetDoctorSessionDataForAppoinment_Success);
    } else {
        const AppointmentSearchDate = $('#TxtAppointmentSearchDate').val();
        // console.log('GetDoctorSessionDataForAppoinment:', document.getElementById('DrpAppoinmentDoctor').value, AppointmentSearchDate);
        _Request.Post(ServiceMethods.SessionGetByDate, new GetSessions(AppointmentDoctorId, AppointmentSearchDate, null), GetDoctorSessionDataForAppoinment_Success);
    }
}

function GetDoctorsSessionsForAppointmentUpdate() {
    const AppointmentSearchDate = $('#TxtAppointmentUpdateDate').val();
    const AppointmentDoctorId = $('#TxtAppointmentUpdateDoctor').val();
    _Request.Post(ServiceMethods.SessionGetByDate, new GetSessions(AppointmentDoctorId, AppointmentSearchDate, null), GetDoctorsSessionsForAppointmentUpdate_Success);
}

function SetAppoinmentToDoctor_Click() {
    _AppointmentSessionId = parseInt(document.getElementById('DrpSessionDateDoctor').value);
    _AppointmentDoctorName = $("#DrpAppoinmentDoctor option:selected").text();
    _SessionDetails = $("#DrpSessionDateDoctor option:selected").text();
    _IsSetAppointmentToDoctorClicked = true;
    // console.log('SetAppoinmentToDoctor_Click._AppointmentSessionId:', _AppointmentSessionId);

    if (document.getElementById('DrpSessionDateDoctor').value != " " && document.getElementById('DrpAppoinmentDoctor').value != " ") {
        GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        GetDoctorAppoinmentList();
        document.getElementById('BtnSaveAppointment').setAttribute('disabled', 'disabled');
    } else {
        return ShowMessage(Messages.SelectDrp, MessageTypes.Warning, "Warning!");
    }
}

function Appointments_Search() {
    _AppointmentSessionId = parseInt(document.getElementById('DrpSessionDateDoctor').value);
    _AppointmentDoctorName = $("#DrpAppoinmentDoctor option:selected").text();
    _SessionDetails = $("#DrpSessionDateDoctor option:selected").text();
    const AppointmentDate = $('#TxtAppointmentSearchDate').val();

    // console.log('Appointments_Search.AppointmentDate:', _AppointmentSessionId, AppointmentDate);

    if (document.getElementById('DrpAppoinmentDoctor').value.trim() !== "" && document.getElementById('DrpSessionDateDoctor').value === "0") {
        $('#AppointmentsSearchButton').prop('disabled', true);
        GetAllPatientAppointmentsList('sessions');

    } else if (document.getElementById('DrpSessionDateDoctor').value === "0" && document.getElementById('DrpAppoinmentDoctor').value === "0") {
        // GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        // GetDoctorAppoinmentList();
        $('#AppointmentsSearchButton').prop('disabled', true);
        GetAllPatientAppointmentsList('search');
        // document.getElementById('BtnSaveAppointment').setAttribute('disabled', 'disabled');

    } else if (document.getElementById('DrpSessionDateDoctor').value != " " &&
        document.getElementById('DrpAppoinmentDoctor').value != " " && (AppointmentDate !== "" && AppointmentDate != NaN)) {
        // GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        $('#AppointmentsSearchButton').prop('disabled', true);
        GetDoctorAppoinmentList();
        // document.getElementById('BtnSaveAppointment').setAttribute('disabled', 'disabled');

    } else {
        return ShowMessage(Messages.SelectDrp, MessageTypes.Warning, "Warning!");
    }
}

function SaveAppointment_Click() {
    _Request.Post(ServiceMethods.SaveAppoinmnet, new SaveAppointment(0, parseInt(document.getElementById('TxtAppoinmentNumber').value), _AppointmentSessionId, _PatientId, null, 10, _UserId), SaveAppointment_Success);
}

function AddPatientAppointment_Click() {
    new PatientSearch().Render(Containers.MainContent);
}

function CmdBmi_Click(Id) {
    new BMIAppoinment().Render(Id);
}

function CmdPressure_Click(Id) {
    new PressureAppoinment().Render(Id);
}

function CmdTemperature_Click(Id) {
    new TemperatureAppoinment().Render(Id);
}

this.ShowCommunicationError = function () {
    return ShowMessage(Messages.ConnectingError, MessageTypes.Error, "error");
};


// ***Warning -Need to Refactor
function CmdUploadReportFile_Click() {
    //File Validating
    let FupUpload = document.getElementById("FilePrescriptionChoosen").cloneNode(true);

    //If File is missing Give's Error
    if (FupUpload.files.length == 0)
        return ShowMessage(Messages.EmptyFileUpload, MessageTypes.Error, "Error!");

    try {
        let FupUploadSize = FupUpload.files[0];

        let GetFileName = FupUploadSize.name;

        let FileName = GetFileName.split('.').slice(0, -1).join('.');

        let Files = new FormData();

        let Form = document.createElement("form");
        Form.appendChild(FupUpload);

        if (FupUploadSize.size > _UploadSizeMax)
            return ShowMessage(Messages.FileMaximumSize, MessageTypes.Warning, "Warning!");

        //Upload File
        for (let Count = 0; Count < FupUpload.files.length; Count++)
            Files.append('files', FupUpload.files[Count]);

        ShowLoader();

        _Request.Upload("PatientDiagnosisDocument", Files, FupUpload, function (Response) {
            HideLoader();

            _Request.Post(ServiceMethods.PatientInformationSave, new PatientUploadInformation(_PatientId, FupUploadSize.type, FupUploadSize.name, FileName, _UserId), PatientReportSave_Success);
        });

    } catch (Error) {
        HideLoader();
        if (Error.message !== null && Error.message !== undefined) {
            ShowMessage(Error.message, MessageTypes.Error, "Error");
            HideLoader();
        } else {
            ShowMessage(Error.message, MessageTypes.Error, "Error");
            HideLoader();
        }
    }
}

function PatientReportSave_Success(Response) {
    if (Response.Status != 1000)
        return ShowMessage(Messages.FileUploadFailed, MessageTypes.Warning, "Warning!");
    else {
        return ShowMessage(Messages.FileUploadSuccess, MessageTypes.Success, "Success!");
    }
}

function SavePatientAnalytics() {

}

function AppointmentDoctorChangeEnable() {
    $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdateDoctor').prop('disabled', false);
    $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdateDoctorSession').prop('disabled', false);
    $('#BtnUpdateAppointment').prop('disabled', false);
}

function AppointmentDateChangeEnable() {
    $('#ModalForAppointmentDetailsEdit #AppointmentDate').prop('disabled', false);
}

function AppointmentTimeChangeEnable() {
    $('#ModalForAppointmentDetailsEdit #AppointmentTime').prop('disabled', false);
}

function AppointmentUpdate() {
    // console.log('AppointmentUpdate._ArrayAppointmentsForToday', _ArrayAppointmentsForToday);
    const PatientId = $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdatePatientId').val();
    const AppointmentNo = $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdateAppointmentNo').val();
    const DoctorId = $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdateDoctor').val();
    const Date = $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdateDate').val();
    const Time = $('#ModalForAppointmentDetailsEdit #TxtAppointmentUpdateTime').val();

    let val = $('#TxtAppointmentUpdateDoctorSession').val();

    selectedRowSessionId = parseInt(val);
    console.log(selectedRowSessionId.isNaN);
    if (isNaN(selectedRowSessionId)) {
        return ShowMessage("Please Select Session", MessageTypes.Warning, "Warning!");
    } else {
        let Entity = new DoctorChannelingStatus(selectedRowAppointmentId, selectedRowSessionId, selectedRowPatientId, "Cancel Appointment",
            "cancelled", 0)

        _Request.Post(ServiceMethods.ChanalingStatusSave, Entity, DoctorChannelingStatusUpdate_Success);


        //next appoinment

        _Request.Post(ServiceMethods.NextAppoinment, new SessionId(selectedRowSessionId), function (Res) {

            _Request.Post(ServiceMethods.SaveAppoinmnet, new SaveAppointment(0,
                    parseInt(Res.Data.Number),
                    selectedRowSessionId,
                    selectedRowPatientId, null,
                    2, _UserId)
                , SaveAppointment_Success_Update);
        });
    }


    // console.log('AppointmentUpdate.JsonObject:', JsonObject);
}

function SaveAppointment_Success_Update(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        CmdAppoinments_Click();
        console.log(Response)
        // send sms to patient
        let appointmentNumber = Response.Data.Number;
        let appointmentId = Response.Data.Id;
        let doctorName = Response.Data.DoctorName;
        let startingDateTime = Response.Data.TimeStart;

        let patientMobileNo = Response.Data.Mobile;

        shareAppointmentDetailsWithPatient({
            messageTitle: 'Appointment Updated!',
            mobileNumber: patientMobileNo,
            appointmentNumber: appointmentNumber,
            appointmentId: appointmentId,
            doctorName: doctorName,
            startingDateTime: startingDateTime
        })

        return ShowMessage(Messages.ApoointmentSaveSuccess, MessageTypes.Success, "Success!");
    }
}

function DoctorChannelingStatusUpdate_Success(Response) {
    if (Response.Status != 1000)
        return;
}

function AppointmentPaymentTypeUpdate(AppointmentId, AppointmentNumber) {
    // console.log('AppointmentPaymentTypeUpdate.Appointment:', AppointmentId, AppointmentNumber);
    const PaymentType = $('#ModalForAppointmentDetailsEdit #TxtPaymentType').val();
    _Request.Post(ServiceMethods.SaveAppoinmnet, new SaveAppointment(
            AppointmentId,
            AppointmentNumber,
            selectedRowSessionId,
            selectedRowPatientId,
            null,
            parseInt(PaymentType),
            _UserId)
        , AppointmentPaymentTypeUpdate_Success);
}

function AppointmentPaymentTypeUpdate_Success(Response) {
    if (Response.Status != 1000)
        return ShowMessage(Response.message.split("-")[1].trim(), MessageTypes.Warning, "Warning!");
    else {
        CmdAppoinments_Click('AppoinmentsCard');
        return ShowMessage("Payment Type Updated!", MessageTypes.Success, "Success!");
    }
}

/*=================================
			Pharmacy Events
 =================================*/

function CmdPrescription_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        new Pharmacy().Render(Containers.MainContent);
        GetPrescriptionList();
        SetDoctorData('TxtPrescriptionsSearchDoctor');
    }
}

function LoadPrescriptionRecordDrugs(Id) {
    _ArrayPrescriptionData = _ArrayPrescriptionData.filter(Prescriptions => Prescriptions.Id === Id);
    _Request.Post(ServiceMethods.DrugsPrescriptions, new PrescriptionRecord(Id), LoadPrescriptionRecordDrugs_Success)
}

function CmdReadyDrugUpdate_Click() {
    let RecordDrugs = [];
    let PrescriptionRecordId = _ArrayPrescriptionData[0].Id;
    let PrescriptionId = _ArrayPrescriptionData[0].PrescriptionId;
    let AppointmentId = _ArrayPrescriptionData[0].AppointmentId;
    let PatientId = _ArrayPrescriptionData[0].PatientId;

    let StatusButtonValue = document.getElementById("BtnStatusUpdate").value;
    let PrescriptionStatus;
    switch (StatusButtonValue) {
        case "Ready":
            PrescriptionStatus = 2;
            break;
        case "Issue":
            PrescriptionStatus = 3;
            break;
        case "Reject":
            PrescriptionStatus = 4;
            break;
    }

    const PrescriptionDrugList = document.getElementById('TableDrugList');
    let length = PrescriptionDrugList.rows.length - 1;

    for (let RowCount = 0; RowCount < length; RowCount++) {
        if (document.getElementById("AvailableRecordDrug_" + RowCount).checked === true) {
            let Id = document.getElementById("AvailableRecordDrug_" + RowCount).getAttribute("recorddrugid");
            let DrugId = document.getElementById("AvailableRecordDrug_" + RowCount).getAttribute("drugid");
            let Status = PrescriptionStatus;

            let Entity = new RecordDrugsUpdates(Status, Id, DrugId);

            RecordDrugs.push(Entity);
        }
    }

    AvailableDrugStatusSave(RecordDrugs, PrescriptionRecordId, PrescriptionId, AppointmentId, PatientId, PrescriptionStatus, _UserId)
}

function IsSearchDatesValid(InputDate) {
    // console.log('Events.IsSearchDatesValid.InputDate:', InputDate);
    const DateToday = new Date().toISOString().slice(0, 10);
    const DateSixMonthsPrior = new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()).toISOString().slice(0, 10);
    const FromDate = $('#TxtClinicBillSearchFromDate').val();
    const ToDate = $('#TxtClinicBillSearchToDate').val();
    return true;
}

function ClinicMedicalBillsSearchFieldsClear() {
    const DateToday = new Date().toISOString().slice(0, 10);
    const DateSixMonthsPrior = new Date(new Date().getFullYear(), new Date().getMonth() - 6, new Date().getDate()).toISOString().slice(0, 10);
    const FromDate = $('#TxtClinicBillSearchFromDate');
    const ToDate = $('#TxtClinicBillSearchToDate');
    $(FromDate).attr('value', DateToday);
    $(FromDate).attr('min', DateSixMonthsPrior);
    $(ToDate).attr('value', DateToday);
    $(ToDate).attr('min', DateSixMonthsPrior);

    const Response = {
        "Status": 1000,
        "Data": [],
        "Message": "Success"
    };
    //append an 'empty' 'search' results table
    ClinicMedicalBillsSearchResultsTableDisplay(Response.Data);
}

function ClinicMedicalBillsSearch() {
    let FromDate = $('#TxtClinicBillSearchFromDate').val();
    let ToDate = $('#TxtClinicBillSearchToDate').val();

    if (!IsSearchDatesValid(FromDate) && FromDate !== "") {
        return ShowMessage(Messages.InvalidDate, MessageTypes.Warning, "Warning!");

    } else if (!IsSearchDatesValid(ToDate) && ToDate !== "") {
        return ShowMessage(Messages.InvalidDate, MessageTypes.Warning, "Warning!");

    } else {
        if (FromDate === "")
            FromDate = undefined;

        if (ToDate === "")
            ToDate = undefined;

        // console.log('Events.ClinicMedicalBillsSearch:', FromDate, ToDate);

        const Response = {
            "Status": 1000,
            "Data": [
                {
                    "Id": 242428,
                    "UserId": 0,
                    "Number": 1,
                    "SessionId": 301120,
                    "PatientId": 693616232020,
                    "Status": 1,
                    "Description": null,
                    "ChannelingStatus": "Unsuccessful consultation with Rescheduling",
                    "DoctorStatus": "Cancel Appointment",
                    "RoomNumber": 0,
                    "TimeStart": "0001-01-01T00:00:00",
                    "TimeEnd": "0001-01-01T00:00:00",
                    "Title": "Mr.",
                    "FirstName": "Test",
                    "LastName": "Prasad",
                    "NIC": "",
                    "Mobile": "0781951196",
                    "Email": null,
                    "Gender": "MALE",
                    "DateOfBirth": "1996-09-26T00:00:00"
                },
                {
                    "Id": 242429,
                    "UserId": 0,
                    "Number": 2,
                    "SessionId": 301120,
                    "PatientId": 16593924010,
                    "Status": 4,
                    "Description": null,
                    "ChannelingStatus": "Successful Consultation",
                    "DoctorStatus": "Prescription Issued",
                    "RoomNumber": 0,
                    "TimeStart": "0001-01-01T00:00:00",
                    "TimeEnd": "0001-01-01T00:00:00",
                    "Title": "Mr.",
                    "FirstName": "Ravi",
                    "LastName": "Abeysekera",
                    "NIC": "711310045v",
                    "Mobile": "0701080083",
                    "Email": null,
                    "Gender": "MALE",
                    "DateOfBirth": "1971-05-10T00:00:00"
                },
                {
                    "Id": 242430,
                    "UserId": 0,
                    "Number": 3,
                    "SessionId": 301120,
                    "PatientId": 1584333211,
                    "Status": 1,
                    "Description": null,
                    "ChannelingStatus": "Unsuccessful consultation with Rescheduling",
                    "DoctorStatus": "Cancel Appointment",
                    "RoomNumber": 0,
                    "TimeStart": "0001-01-01T00:00:00",
                    "TimeEnd": "0001-01-01T00:00:00",
                    "Title": "Mr.",
                    "FirstName": "sudarikas",
                    "LastName": "abeywikrama",
                    "NIC": "123456789v",
                    "Mobile": "0716505314",
                    "Email": "chamal@mobios.lk",
                    "Gender": "FEMALE",
                    "DateOfBirth": "1987-09-06T00:00:00"
                },
                {
                    "Id": 242431,
                    "UserId": 0,
                    "Number": 4,
                    "SessionId": 301120,
                    "PatientId": 4797333368,
                    "Status": 1,
                    "Description": null,
                    "ChannelingStatus": "pending",
                    "DoctorStatus": "Pending",
                    "RoomNumber": 0,
                    "TimeStart": "0001-01-01T00:00:00",
                    "TimeEnd": "0001-01-01T00:00:00",
                    "Title": "Mr.",
                    "FirstName": "charhura",
                    "LastName": "perera",
                    "NIC": "",
                    "Mobile": "0716505314",
                    "Email": "chamal@mobios.lk",
                    "Gender": "MALE",
                    "DateOfBirth": "2000-06-25T00:00:00"
                }
            ],
            "Message": "Success"
        };

        // console.log('Events.ClinicMedicalBillsSearch.Response:', Response);
        ClinicMedicalBillsSearch_Success(Response);

        _Request.Post(
            ServiceMethods.GetPatient,
            // new SearchPatient(PatientNicNumber, PatientMobileNumber, PatientDateBirth, PatientName, undefined, PatientHealthID),
            Response,
            ClinicMedicalBillsSearch_Success
        );
    }
}


/*=================================
			Common Events
 =================================*/

function CmdUploadFile_Click(InputId, SpanId) {
    const InputFile = document.getElementById(InputId);
    InputFile.click();
    const FileText = document.getElementById(SpanId);
    InputFile.addEventListener("change", function () {
        if (InputFile.value) {
            FileText.innerHTML = InputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else {
            FileText.innerHTML = Messages.NofileChoosen;
        }
    });
}

function CmdResetInputFields(Class) {
    var x = document.querySelectorAll("." + Class);
    x.forEach(el => {
        el.value = '';
        el.innerHTML = '';
    });
}

function MessageAlert() {
    return ShowMessage(Messages.NoMessage, MessageTypes.Warning, "Oops!");
}

function CmdProfile_Click() {
    new Profile().Render(Containers.MainContent);
    let FullName = _NurseFirstName + " " + _NurseLastName;
    document.getElementById('UserFullName').innerHTML = FullName;
    document.getElementById('UserNIC').innerHTML = _NurseNIC;
}

function CmdAboutUs_Click() {
    new AboutUs().Render(Containers.MainContent);
}

function LnkSignOut_Click() {
    location.reload();
}

function CmdBtnClickable_Click(Event) {
    CmdBtnColorRemove_Click();
    Event.style.backgroundColor = "#BDC3C7";

}

function CmdBtnColorRemove_Click() {
    try {
        document.getElementById("PatientCard").style.backgroundColor = "white";
        document.getElementById("AppoinmentsCard").style.backgroundColor = "white";
        document.getElementById("SessionCard").style.backgroundColor = "white";
        document.getElementById("InvoiceCard").style.backgroundColor = "white";
    } catch (Error) {
        //do nothing
    }
}


// Warning -Need to Refactor-  Refactor Done
function SuccessReadingScan(QrCodeMessage) {
    document.getElementById("TxtPatientHealthID").value = QrCodeMessage;
}

function ErrorReadingScan(ErrorMessage) {

}

function CmdLoadCamera_Click() {
    const QrCodeScanner = new Html5QrcodeScanner("reader", {fps: 10, qrbox: 250});
    QrCodeScanner.render(SuccessReadingScan, ErrorReadingScan);
}

function CmdChkAppointment_Click() {
    if (document.getElementById('CheckAppoinmentNumber').checked) {

        document.getElementById("BtnSaveAppointment").disabled = false;
    } else {
        document.getElementById("BtnSaveAppointment").disabled = true;
    }

}

$('#TableAppointedPatient').each(function (index) {
    $(this).children('td').two().addClass('d-none d-lg-table-cell');
    $(this).children('td').three().addClass('d-none d-lg-table-cell');
    $(this).children('td').four().addClass('d-none d-lg-table-cell');
    $(this).children('td').five().addClass('d-none d-lg-table-cell');

});

/*=================================
			Admin Events
 =================================*/

function LnkSettings_Click() {
    //admin ui
    Admin_View();
}

function LnkGeneral_Click() {
    //reception ui
    General_View();
}

function AdminButtons_Click(Card) {
    AdminButtons_BgColorRemove();
    $(Card).css('background-color', '#BDC3C7');
}

function AdminButtons_BgColorRemove() {
    try {
        $("#BranchesCard").css('background-color', 'white');
        $("#DoctorsCard").css('background-color', 'white');
        $("#ReportsCard").css('background-color', 'white');
        $("#MiscCard").css('background-color', 'white');
    } catch (Error) {
        //do nothing
    }
}

/*=================================
            Branches Events
 =================================*/

function Branches_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        new Branches().Render(Containers.MainContent);
        AllBranchesOfTheInstituteGet();
    }

}

function GetBranchData() {
    if ($("#SearchBranchSelect").val().trim() !== '') {

    } else {
        return ShowMessage(Messages.SelectDrp, MessageTypes.Warning, "Warning!");
    }
}

/*=================================
            Doctors Events
 =================================*/

function Doctors_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        new Doctors().Render(Containers.MainContent);
        SetBranchData('DrpBranch');
    }
}

/*=================================
            Reports Events
 =================================*/

function Reports_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        new Reports().Render(Containers.MainContent);
        SetBranchData('DrpBranch');
    }
}

/*=================================
            Misc Events
 =================================*/

function Misc_Click(CardElement) {
    if (CmdCardClicked !== CardElement.id) {
        $('#' + CardElement.id).attr('disabled', true);
        $('#' + CardElement.id).css('cursor', 'auto');
        CmdCardClicked = CardElement.id;
        new Misc().Render(Containers.MainContent);
    }
}


//doctor

function DoctorBranch_Search() {
    let id = $('#DrpBranch').val();
    if (id == "0") {
        return ShowMessage("Please Select Branch", MessageTypes.Warning, "Warning!");
    }
    LoadAllDoctorsForBranch(id);
}

function GetDoctorByBranch() {

    // DrpDoctor
    let id = $('#DrpBranch').val();
    let Payload = new GetDoctorsByInstituteBranchId(id);
    _Request.Post(ServiceMethods.GetInstituteBranchDoctor, Payload, function (Response) {

        ttlDoctors = 0;
        curDoctor = 0;
        AllDoctor = [];
        if (Response.Status === 1000) {
            ttlDoctors = Response.Data.length;
            if (ttlDoctors == 0) {
                doctorDrpData(AllDoctor);
            }
            Response.Data.forEach(function (Doctor) {
                _Request.Get("Doctor/GET/" + Doctor.DoctorId, Doctor.DoctorId, function (Res) {
                    curDoctor++;
                    AllDoctor.push(Res.Data);
                    if (curDoctor === ttlDoctors) {
                        // console.log(AllDoctor);
                        doctorDrpData(AllDoctor);
                    }
                });
            });
        }
    });


}

function LoadAllDoctorsForBranch(Branch) {
    let Payload = new GetDoctorsByInstituteBranchId(Branch);
    _Request.Post(ServiceMethods.GetInstituteBranchDoctor, Payload, SuccessLoadDoctors);
}

let ttlDoctors = 0;
let curDoctor = 0;
let AllDoctor = [];

function SuccessLoadDoctors(Response) {
    ttlDoctors = 0;
    curDoctor = 0;
    AllDoctor = [];
    if (Response.Status === 1000) {
        ttlDoctors = Response.Data.length;
        if (ttlDoctors == 0) {
            doctorTblData(AllDoctor);
        }
        Response.Data.forEach(function (Doctor) {
            _Request.Get("Doctor/GET/" + Doctor.DoctorId, Doctor.DoctorId, LoadDoctorToTable);
        });
    }

}


function LoadDoctorToTable(Res) {
    curDoctor++;
    AllDoctor.push(Res.Data);
    if (curDoctor === ttlDoctors) {
        // console.log(AllDoctor);
        doctorTblData(AllDoctor);
    }
}

function doctorDrpData(Res) {
    let Count;
    let DataLength = Res.length;
    //all doctors - as the first option
    $('#DrpDoctor').html('');
    $('#DrpDoctor').append('<option value="0">All Doctors</option>');
    for (Count = 0; Count < DataLength; Count++) {
        $('#DrpDoctor').append('<option value="' + Res[Count].Id + '">' +
            Res[Count].Title + ' ' + Res[Count].FirstName + ' ' + Res[Count].LastName + '</option>');
    }
}

function doctorTblData(Response) {
    //reset flag
    const ArrayDoctorSearchResultsData = [];
    if (Response.length > 0) {
        let Doctor = {};
        for (let Count = 0; Count < Response.length; Count++) {
            Doctor = Response[Count];
            ArrayDoctorSearchResultsData.push({
                "Doctor Name": Doctor.Title + ' ' + Doctor.FirstName + ' ' + Doctor.LastName,
                "Email": Doctor.Email,
                "NIC": isNull(Doctor.NIC),
                "Registration Number": isNull(Doctor.RegistrationNumber),
                "Action": '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="DoctorAddOrUpdateModalView(' + Count + ',' + Doctor.Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' +
                    '</button>' +
                    // '<button class="btn btn-danger" style="margin-left: 1rem" type="button" id="6">' +
                    // '<i class="nav-icon i-Close-Window"></i></button>' +
                    '<button class="btn btn-primary" style="margin-left: 1rem" type="button" id="6" data-toggle="modal" ' +
                    'onclick="DoctorLoginModalShow(' + Doctor.Id + ')">Login</button>'
            });
        }
    }

    new DoctorsSearchResultsTable().Render('DoctorsSearchResults', ArrayDoctorSearchResultsData);
    CreateDataTable('TableDoctorsSearchResults');
}


function SetBranchData(Id) {
    // console.log('SetDoctorData.Id:', Id);
    let Count;
    let DataLength = _ArrayAllBranchesOfTheInstituteResultsData.length;
    //all doctors - as the first option
    for (Count = 0; Count < DataLength; Count++) {
        $('#' + Id).append('<option value="' + _ArrayAllBranchesOfTheInstituteResultsData[Count].Id + '">' + _ArrayAllBranchesOfTheInstituteResultsData[Count].Name + '</option>');
    }
}

function DoctorLoginModalShow(Id) {

    new DoctorsLoginModal().Render(Containers.Footer, Id);
}

let _SelectedDoctor;

function DoctorAddOrUpdateModalView(index, id) {
    if (id) {
        _SelectedDoctor = AllDoctor[index];
        new DoctorsAddOrUpdateModal().Render(Containers.Footer, id, 'Update');

        $("#DrpTitle").val(_SelectedDoctor.Title);
        $("#TxtDoctorFirst_Name").val(_SelectedDoctor.FirstName);
        $("#TxtDoctorMiddle_Name").val(_SelectedDoctor.MiddleName);
        $("#TxtDoctorLast_Name").val(_SelectedDoctor.LastName);
        $("#TxtDoctorEmail").val(_SelectedDoctor.Email);
        $("#TxtDoctorNIC").val(_SelectedDoctor.NIC);
        $("#TxtDoctorRegistration_Number").val(_SelectedDoctor.RegistrationNumber);
        $("#TxtDoctorDate_Of_Birth").val((_SelectedDoctor.DateOfBirth).substring(0, 10));

        let Payload = new DoctorSpecialization(undefined, _SelectedDoctor.Id, undefined, undefined, _UserId);
        _Request.Post("DoctorSpecialization/GetDoctorSpecialization", Payload, function (ResponseSp) {
            DoctorSpecializationId = ResponseSp.Data[0].Id
            DoctorSpecializationDrpId = ResponseSp.Data[0].SpecializationId
            _Request.Get("Specialization/Get", undefined, SpecializationGetSuccess);
        });
        _Request.Post("DoctorQualification/Get", Payload, function (ResponseQa) {
            DoctorQualificationId = ResponseQa.Data[0].Id
            _Request.Get("Qualification/Get", undefined, QualificationGetSuccess);
        });
        _Request.Post("DoctorContactNumber/GetContactNumber", Payload, function (Response) {
            if (Response.Status === 1000) {
                if (Response.Data.length == 2) {
                    DoctorContactIdArr = [Response.Data[0].Id, Response.Data[1].Id]
                    $("#TxtDoctorContact_No").val(Response.Data[0].ContactNumber);
                    $("#TxtDoctorPhone_No").val(Response.Data[1].ContactNumber);
                }
            }
        });
    } else {
        new DoctorsAddOrUpdateModal().Render(Containers.Footer, "BranchId", 'AddNew');
        _Request.Get("Specialization/Get", undefined, SpecializationGetSuccess);
        _Request.Get("Qualification/Get", undefined, QualificationGetSuccess);
    }


}

function DoctorsDateOfBirthDisplay() {
    let NIC = $("#TxtDoctorNIC").val().trim();
    if (NIC === "" || (ValidateNIC(NIC) === false && NIC !== "")) {
        $("#TxtDoctorDate_Of_Birth").val('');
        return ShowMessage(Messages.InvalidNIC, MessageTypes.Warning, "Warning!");
    }
    const dob = GetDateOfBirthByNIC(NIC);
    const dobReformatted = dob.split('/')[0] + '-' + dob.split('/')[1].padStart(2, '0') + '-' + dob.split('/')[2].padStart(2, '0');
    $("#TxtDoctorDate_Of_Birth").val(dobReformatted);
}

function AddOrUpdateDoctor(id) {
    makeCustomHeader(_UserIdAdmin);
    if (!id) {
        id = 0;
    }

    let Title = $("#DrpTitle").val().trim();
    let FirstName = $("#TxtDoctorFirst_Name").val().trim();
    let MiddleName = $("#TxtDoctorMiddle_Name").val().trim();
    let LastName = $("#TxtDoctorLast_Name").val().trim();
    let Contact1 = $("#TxtDoctorContact_No").val().trim();
    let Contact2 = $("#TxtDoctorPhone_No").val().trim();
    let Email = $("#TxtDoctorEmail").val().trim();
    let NIC = $("#TxtDoctorNIC").val().trim();
    let RegNumber = $("#TxtDoctorRegistration_Number").val().trim();
    let DOB = $("#TxtDoctorDate_Of_Birth").val().trim();
    let Specialization = $("#DrpSpecialization").val();
    let Qualification = $("#DrpQualifications").val();
    // console.log('AddOrUpdateDoctor:', Specialization, Qualification);

    //validation
    if (Title === "")
        return ShowMessage('Invalid Title!', MessageTypes.Warning, "Warning!");

    if (FirstName === "")
        return ShowMessage('Invalid First Name!', MessageTypes.Warning, "Warning!");

    if (LastName === "")
        return ShowMessage('Invalid Last Name!', MessageTypes.Warning, "Warning!");

    if (Contact1 === "" || (ValidateMobile(Contact1) === false && Contact1 !== ""))
        return ShowMessage(Messages.InvalidMobileNumber, MessageTypes.Warning, "Warning!");

    if (Email === "")
        return ShowMessage('Invalid Email!', MessageTypes.Warning, "Warning!");

    if (NIC === "" || (ValidateNIC(NIC) === false && NIC !== ""))
        return ShowMessage(Messages.InvalidNIC, MessageTypes.Warning, "Warning!");

    if (DOB === "")
        return ShowMessage('Invalid Date of Birth!', MessageTypes.Warning, "Warning!");

    if (Specialization === null)
        return ShowMessage('Invalid Specialization!', MessageTypes.Warning, "Warning!");

    if (Qualification === null)
        return ShowMessage('Invalid Qualification!', MessageTypes.Warning, "Warning!");

    let ContactList = [];

    ContactList.push(new ContactNumbers(DoctorContactIdArr[0] == 0 ? 0 : DoctorContactIdArr[0], Contact1, 0));

    if (Contact2 != "")
        ContactList.push(new ContactNumbers(DoctorContactIdArr[1] == 0 ? 0 : DoctorContactIdArr[1], Contact2, 0))


    let Payload = new DoctorSave(id, Title, FirstName, MiddleName, LastName, Email, NIC, 1,
        _UserIdAdmin, RegNumber, DOB, undefined, ContactList);

    _Request.Post("doctor/post", Payload, SuccessSaveDoctorDetails);

    DoctorContactIdArr = [0, 0];

}

function SpecializationGetSuccess(Response) {
    console.log(Response)
    if (Response.Status !== 1000) {
    } else {
        let max = Response.Data.length;
        for (let i = 0; i < max; i++) {
            let opt = document.createElement('option');
            opt.value = Response.Data[i].Id;
            opt.innerHTML = Response.Data[i].Name;
            $('#DrpSpecialization').append(opt);
        }
        $('#DrpSpecialization').val(DoctorSpecializationDrpId);
    }
}

function QualificationGetSuccess(Response) {

    if (Response.Status !== 1000) {
    } else {
        let max = Response.Data.length;
        for (let i = 0; i < max; i++) {
            let opt = document.createElement('option');
            opt.value = Response.Data[i].Id;
            opt.innerHTML = Response.Data[i].Name;
            $('#DrpQualifications').append(opt);
        }
        $('#DrpQualifications').val(DoctorQualificationId);
    }
}

function SuccessSaveDoctorDetails(Response) {
    if (Response.Status !== 1000) {
        makeCustomHeader(_UserId);
        ShowMessage("Error !", MessageTypes.Error, "Error!");

    } else {
        let PayLoad = new DoctorBranch($('#DrpBranch').val(), Response.Data.Id, 1, _UserIdAdmin);
        _Request.Post("DoctorBranch/POST", PayLoad, function (res) {
        });

        //create Doctor Specialization object
        let selectedSpecialization = $("#DrpSpecialization").val();
        let PayloadSp = new DoctorSpecialization(DoctorSpecializationId == 0 ? 0 : DoctorSpecializationId, Response.Data.Id, selectedSpecialization, 1, _UserIdAdmin);
        _Request.Post("DoctorSpecialization/Post", PayloadSp, SuccessSaveNewSpecialization);
        DoctorSpecializationId = 0;

        //create Doctor Qualification object
        let selectedQualification = $("#DrpQualifications").val();
        let PayloadQu = new DoctorQualification(DoctorQualificationId == 0 ? 0 : DoctorQualificationId, Response.Data.Id, selectedQualification, 1, _UserIdAdmin);
        _Request.Post("DoctorQualification/Save", PayloadQu, SuccessSaveNewQualificationtest);
        DoctorQualificationId = 0;
    }
}

function SuccessSaveNewSpecialization(Response) {
    if (Response.Status !== 1000) {

        makeCustomHeader(_UserId);
        // ShowMessage("Error !", MessageTypes.Error, "Error!");
    }
}

function SuccessSaveNewQualificationtest(Response) {
    makeCustomHeader(_UserId);
    DoctorBranch_Search();
    $('#ModalForBranchAddOrUpdate').modal('hide');
    ShowMessage("Doctor Saved Successfully !", MessageTypes.Success, "Success !");

}

var SelectedDoctor;

function ChangeDoctorPassword(doctorId) {

    SelectedDoctor = doctorId;

    let UserName = document.getElementById("TxtDoctorUser_Name").value;
    let Password = document.getElementById("TxtDoctorPassword").value;
    let ConfirmPassword = document.getElementById("TxtDoctorConfirm_Password").value;

    if (!(Password === ConfirmPassword)) {
        ShowMessage("Please check your password", MessageTypes.Error, "Error !");
        return;
    }

    makeCustomHeader(_UserIdAdmin);

    let Payload = new User(0, UserName, Password, 3, 1, SelectedDoctor, undefined);
    _Request.Post("User/Post", Payload, SuccessSaveUserLoginDetails);
}

function SuccessSaveUserLoginDetails(Response) {

    if (Response.Status !== 1000) {
        makeCustomHeader(_UserId);
        ShowMessage("Error", MessageTypes.Error, "Error !");
    } else {
        let Payload = new DoctorUser(0, Response.Data.Id, parseInt(SelectedDoctor), SelectedDoctor);   //Error in DoctorId
        _Request.Post("UserDoctor/Save", Payload, SuccessSaveDoctorUserLoginDetails);
    }
}

function SuccessSaveDoctorUserLoginDetails(Response) {
    makeCustomHeader(_UserId);
    if (Response.Status !== 1000)

        ShowMessage("Error", MessageTypes.Error, "Error !");
    else {
        $('#ModalDoctorsLogin').modal('hide');
        ShowMessage("Doctor Login Details Saved Successfully !", MessageTypes.Success, "Success !");
    }
}


//report

function Report_Search() {

    let branch = $('#DrpBranch').val();
    let doctor = $('#DrpDoctor').val();
    let FromDate = $('#TxtReportFrom_Date').val() + " 00:00:00";
    let ToDate = $('#TxtReportTo_Date').val() + " 23:59:59";

    // let FromDate = moment(document.getElementById('TxtReportFrom_Date').value, "MM/DD/YYYY").format("YYYY-MM-DD")+" 00:00:00";
    // let ToDate = moment(document.getElementById('TxtReportTo_Date').value, "MM/DD/YYYY").format("YYYY-MM-DD")+" 23:59:59";

    makeCustomHeader(_UserIdAdmin);
    _Request.Post("Appointment/Report", new AppointmentReport(FromDate, ToDate, doctor, branch, _UserIdAdmin), function (Response) {
        makeCustomHeader(_UserId);
        const ResultsData = [];
        Response = Response.Data;
        if (Response.length > 0) {
            let Data = {};
            for (let Count = 0; Count < Response.length; Count++) {
                Data = Response[Count];
                ResultsData.push({
                    "No": (Count + 1),
                    "Date & Time": formatDateAndTime(new Date(Data.DateCreated)),
                    "Appointment No": Data.Number,
                    "Patient Name": Data.FirstName + " " + Data.LastName,
                    "Patient Mobile": Data.Mobile
                });
            }
        }

        new ReportSearchResultsTable().Render('ReportSearchResults', ResultsData);
        CreateDataTable('TableReportSearchResults');
    });
}
