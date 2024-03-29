﻿/*=================================
			Event Handlers
 =================================*/

function CmdLogin_Click(Sender)
{
    if (!ValidateFields("UserLogin"))
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");

    _Request.Post(ServiceMethods.Login, new UserCredential(document.getElementById("TxtUsername").value, document.getElementById("TxtPassword").value), Login_Success);
    
}

function Welcome_Load()
{
    let UserMobileNumber = new MobileNumber(_Username);
    _Request.Post(ServiceMethods.GetPatient, UserMobileNumber, Welcome_Success);
}

function CmdFullScreen_Click()
{
    var elem = document.documentElement;

    if (elem.requestFullscreen)
    {
        elem.requestFullscreen();
    }
    else if (elem.msRequestFullscreen)
    {
        elem.msRequestFullscreen();
    }
    else if (elem.mozRequestFullScreen)
    {
        elem.mozRequestFullScreen();
    }
    else if (elem.webkitRequestFullscreen)
    {
        elem.webkitRequestFullscreen();
    }
}

function LnkRecover_Click()
{
    return ShowMessage(Messages.ResetPassword, MessageTypes.Warning, "Warning!");
}

function LnkDoctorOnline_Click()
{
    //a.href = "www.doctoronline.lk";
    //document.body.prepend(a);
    
    window.location.replace("http://www.doctoronline.lk");
}

function LnkVirtualconsultation_Click()
{
    window.location.replace("http://www.medica.gq/Vc/");
}

function LnkEditProfile_Click()
{
    new Profile().Render(Containers.MainContent);

    document.getElementById('UserFullName').innerHTML = _PatientTitle + " " + _PatientFirstName + " " + _PatientLastName;
    document.getElementById('UserAge').innerHTML = _PatientAge + " Years";
    document.getElementById('UserGender').innerHTML = _PatientGender;
    GetDependentData();
}
      
function LnkResetPassword_Click()
{
    new ResetPassword().Render(Containers.MainContent);
}

function LnkQrCode_Click()
{
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

function CmdPatientSearch_Click()
{
    _AppointmentSessionId = undefined;
    new PatientSearch().Render(Containers.MainContent);
    

}

function CmdSearchPatient_Click()
{
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
    else
    {
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

        if (PatientName != null)
        {
            return ShowMessage(Messages.NoAuthorizedSearch, MessageTypes.Warning, "Warning!");
        }

        _Request.Post(ServiceMethods.GetPatient, new SearchPatient(PatientNicNumber, PatientMobileNumber, PatientDateBirth, PatientName, undefined, PatientHealthID), GetPatientData_Success);
    }
}

function CmdClearSearchPatient_Click()
{
    document.getElementById("TxtPatientNIC").value = "";
    document.getElementById("TxtPatientDateBirth").value = "";
    document.getElementById("TxtPatientMobileNumber").value = "";
    document.getElementById("TxtPatientHealthID").value = "";
}

function TxtPatientNIC()
{
   document.getElementById("CmdSearch").disabled = false;
}

function LoadSessionViceAppointments(Object,SessionId)
{
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

function SetAppointmentPatient(Object, PatientId)
{
    var CurrentRow = $(Object).closest("tr");
    _AppointmentPatientName = CurrentRow.find("td:eq(1)").text();

    _PatientId = PatientId;
    InitRequestHandler();

    ViewAppointmentedPatientList();
}

function ViewAppointmentedPatientList()
{
    if (_AppointmentSessionId !== null && _AppointmentSessionId !== undefined)
    {
        new NewAppoinment().Render(Containers.MainContent);
        GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        GetDoctorAppoinmentList();
    }
    else
    {
        new Appoinments().Render(Containers.MainContent);
        GetSessionDoctorId('DrpAppoinmentDoctor');
        SetDoctorData('DrpAppoinmentDoctor');
    }    
}

function AddPatient_Click()
{
    _Id = 0;
    new NavEditPatient().Render(Containers.MainContent);
    document.getElementById('nav-primary-tab').click();

    document.getElementById("TxtPatientCardHeading").innerHTML = "Add New Patient";

    if (_PatientNIC != undefined && _PatientNIC != null && _PatientNIC != "")
    {
        document.getElementById('TxtAddId').value = _PatientNIC; 
        CmdGetDOBandGender();
    }

    if (_PatientMobile != undefined && _PatientMobile != null && _PatientMobile != "" )
        document.getElementById('TxtAddMobileNumber').value = _PatientMobile; 

    DatePicker();
}

function CmdGetDOBandGender()
{
    var GetDateofBirth = GetDateOfBirthByNIC(document.getElementById('TxtAddId').value).split("/");
    document.getElementById('TxtAddDateBirth').value = GetDateofBirth[0] + "-" + GetDateofBirth[1] + "-" + GetDateofBirth[2];

    if (GetDateofBirth[3] == "Male")
        document.getElementById("ChkPatientMale").checked = true;

    if (GetDateofBirth[3] == "Female")
        document.getElementById("ChkPatientFemale").checked = true;
}

function SavePatient_Click()
{
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


    if(DateBirth === ""){
        return ShowMessage(Messages.Birthday, MessageTypes.Warning, "Warning!");
    }else if(document.getElementById("ChkPatientMale").checked === false && document.getElementById("ChkPatientFemale").checked === false){
        return ShowMessage(Messages.Gender, MessageTypes.Warning, "Warning!");
    }else if(FirstName === "" ){
        return ShowMessage(Messages.FirstNameEmpty, MessageTypes.Warning, "Warning!");
    }else if(LastName === ""){
        return ShowMessage(Messages.LastNameEmpty, MessageTypes.Warning, "Warning!");
    }else if (!/^[a-zA-Z]*$/g.test(FirstName) || !/^[a-zA-Z]*$/g.test(LastName)){
        return ShowMessage(Messages.NameLetters, MessageTypes.Warning, "Warning!");
    }

    let PatientData = new SavePatientDetails(_Id, FirstName, undefined, LastName, NIC, Passport, MobileNumber, Gender, Title, DateBirth, PatientTypeId, getCookie("UserId"), undefined, MaritalStatus, Occupation, Address, "");

    _Request.Post(ServiceMethods.SavePatient, PatientData, SaveDetails_Success);
}

function SetPatientDataByNIC()
{
    let NIC = document.getElementById('TxtAddMobileNumber').value;
    if (GetDateOfBirthByNIC(NIC) === null)
        return ShowMessage(Messages.InvalidNIC, MessageTypes.Warning, "Warning!");
    else
    {
        let NICDetailsArray = GetDateOfBirthByNIC(NIC).split("/");
        document.getElementById('TxtAddDateBirth').value = NICDetailsArray[0] + "-" + NICDetailsArray[1] + "-" + NICDetailsArray[2];
    }
}

function EditPatient_Click()
{
    new NavEditPatient().Render(Containers.MainContent);
    document.getElementById('nav-primary-tab').click();
    document.querySelectorAll('.Add-Patient-Div').forEach(function (Element)
    {
        Element.style.display = 'none';
    });
}

function CmdPrimaryPatient_Click()
{
    new AddPatient().Render("nav-primary");
}

function CmdAddPatientCancel_Click()
{
    new PatientSearch().Render(Containers.MainContent);
}


/*=================================
			Session Events
 =================================*/

function CmdSession_Click()
{
    new Session().Render(Containers.MainContent);
    SetDoctorData('DrpSessionDoctor');
}

function CmdAddSession_Click()
{
    if (document.getElementById('DrpSessionDoctor').value === '0')
        return ShowMessage(Messages.SelectDoctor, MessageTypes.Warning, "Warning!");
    else
    {
        _SessionId = 0;
        _DoctorId = document.getElementById('DrpSessionDoctor').value;
        new AddNewSession().Render(Containers.MainContent);
        GetInstituteBranches();
        DatePicker();
        TimePicker();
        document.getElementById("TxtSessionCardHeading").innerHTML = "Add New Session";
    }
}

function CmdSaveSession_Click()
{
    let RoomNumber = document.getElementById('TxtSessionRoomNumber').value;
    let SessionDate = document.getElementById('TxtSessionDate').value;
    let StartTime = document.getElementById('TxtSessionStart').value;
    let EndTime = document.getElementById('TxtSessionEnd').value;
    let BranchId = document.getElementById('DrpSessionInstituteBranchId').value;
    let SessionType = document.getElementById('DrpSessionType').value;

    if (RoomNumber === "" ){
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }else if(BranchId === 0){
        return ShowMessage(Messages.SelectDrp, MessageTypes.Warning, "Warning!");
    }else if(SessionDate === ""){
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }else if(SessionType === 0){
        return ShowMessage(Messages.SelectDrp, MessageTypes.Warning, "Warning!");
    }else if(StartTime === ""){
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }
    else if(EndTime === ""){
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }


    _Request.Post(ServiceMethods.SaveSession, new SessionSave(_SessionId, null, _DoctorId, BranchId, RoomNumber, 1, SessionType, SessionDate, EndTime, StartTime, _UserId), SaveSession_Success);
}

function CmdSessionSearch_Click()
{
    _DoctorId = document.getElementById('DrpSessionDoctor').value;
    _AppointmentDoctorName = $("#DrpSessionDoctor option:selected").text();

    if (document.getElementById('DrpSessionDoctor').value === '0')
        return ShowMessage(Messages.SelectDoctor, MessageTypes.Warning, "Warning!");
    
    _Request.Post(ServiceMethods.SessionsGet, new Doctor(_DoctorId, null), GetDoctorSessionData_Success);
}

function CmdCancelSession_Click()
{
    CmdSession_Click();
    document.getElementById('DrpSessionDoctor').value = _DoctorId;
    _Request.Post(ServiceMethods.SessionsGet, new Doctor(_DoctorId, null), GetDoctorSessionData_Success);
}


/*=================================
			Appoiment Events
 =================================*/

function CmdAppoinments_Click()
{
    _PatientId = undefined;
    InitRequestHandler();
    _AppointmentPatientName = undefined;
    new Appoinments().Render(Containers.MainContent);
    SetDoctorData('DrpAppoinmentDoctor');
}

function GetDoctorSessionDataForAppoinment()
{
   // _Request.Post(ServiceMethods.SessionGetByDate, new Doctor(document.getElementById('DrpAppoinmentDoctor').value, null), GetDoctorSessionDataForAppoinment_Success);
     var GetCurrentDate = new Date();
     var GetTodayDate = GetCurrentDate.getFullYear() + '-' + (GetCurrentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + GetCurrentDate.getDate();
    _Request.Post(ServiceMethods.SessionGetByDate, new GetSessions(document.getElementById('DrpAppoinmentDoctor').value, GetTodayDate, null), GetDoctorSessionDataForAppoinment_Success);
}

function SetAppoinmentToDoctor_Click()
{ 
    _AppointmentSessionId = parseInt(document.getElementById('DrpSessionDateDoctor').value);
    _AppointmentDoctorName = $("#DrpAppoinmentDoctor option:selected").text();
    _SessionDetails = $("#DrpSessionDateDoctor option:selected").text();

    if (document.getElementById('DrpSessionDateDoctor').value != " " && document.getElementById('DrpAppoinmentDoctor').value != " ")
    {
        GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        GetDoctorAppoinmentList();
        document.getElementById('BtnSaveAppointment').setAttribute('disabled', 'disabled');
    }
    else
    {
        return ShowMessage(Messages.SelectDrp, MessageTypes.Warning, "Warning!");
    }
}

function SaveAppointment_Click()
{
    _Request.Post(ServiceMethods.SaveAppoinmnet, new SaveAppointment(0, parseInt(document.getElementById('TxtAppoinmentNumber').value), _AppointmentSessionId, _PatientId, null,1, _UserId), SaveAppointment_Success);
}

function AddPatientAppointment_Click()
{
    new PatientSearch().Render(Containers.MainContent);
}

function CmdBmi_Click(Id)
{
    new BMIAppoinment().Render(Id);
}

function CmdPressure_Click(Id)
{
    new PressureAppoinment().Render(Id);
}

function CmdTemperature_Click(Id)
{
    new TemperatureAppoinment().Render(Id);
}

this.ShowCommunicationError = function ()
{
    return ShowMessage(Messages.ConnectingError, MessageTypes.Error, "error");
};



// ***Warning -Need to Refactor 
function CmdUploadReportFile_Click()
{
    //File Validating
    let FupUpload = document.getElementById("FilePrescriptionChoosen").cloneNode(true);

    //If File is missing Give's Error
    if (FupUpload.files.length == 0)
        return ShowMessage(Messages.EmptyFileUpload, MessageTypes.Error, "Error!");

    try
    {
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

        _Request.Upload("PatientDiagnosisDocument", Files, FupUpload, function (Response)
        {
             HideLoader();

            _Request.Post(ServiceMethods.PatientInformationSave, new PatientUploadInformation(_PatientId, FupUploadSize.type, FupUploadSize.name, FileName, _UserId), PatientReportSave_Success);
        });
         
    }
    catch (Error)
    {
        HideLoader();
        if (Error.message !== null && Error.message !== undefined)
        {
            ShowMessage(Error.message, MessageTypes.Error, "Error");
            HideLoader();
        }
        else
        {
            ShowMessage(Error.message, MessageTypes.Error, "Error");
            HideLoader();
        }
    }
}

function PatientReportSave_Success(Response)
{
    if (Response.Status != 1000)
        return ShowMessage(Messages.FileUploadFailed, MessageTypes.Warning, "Warning!");
    else
    {
        return ShowMessage(Messages.FileUploadSuccess, MessageTypes.Success, "Success!");
    }
}

function SavePatientAnalytics()
{

}


/*=================================
			Pharmacy Events
 =================================*/

function CmdPrescription_Click()
{
    //javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    GetPrescriptionList();
}

function LoadPrescriptionRecordDrugs(Id)
{
    _ArrayPrescriptionData = _ArrayPrescriptionData.filter(Prescriptions => Prescriptions.Id === Id);
    _Request.Post(ServiceMethods.DrugsPrescriptions, new PrescriptionRecord(Id), LoadPrescriptionRecordDrugs_Success)
}

function CmdReadyDrugUpdate_Click()
{    
    let RecordDrugs = [];
    let PrescriptionRecordId = _ArrayPrescriptionData[0].Id;
    let PrescriptionId = _ArrayPrescriptionData[0].PrescriptionId;
    let AppointmentId = _ArrayPrescriptionData[0].AppointmentId;
    let PatientId = _ArrayPrescriptionData[0].PatientId;

    let StatusButtonValue = document.getElementById("BtnStatusUpdate").value;
    let PrescriptionStatus;
    switch (StatusButtonValue)
    {
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
    let length = PrescriptionDrugList.rows.length-1;

    for (let RowCount = 0; RowCount < length; RowCount++)
    {
        if (document.getElementById("AvailableRecordDrug_" + RowCount).checked === true)
        {
            let Id = document.getElementById("AvailableRecordDrug_" + RowCount).getAttribute("recorddrugid");
            let DrugId = document.getElementById("AvailableRecordDrug_" + RowCount).getAttribute("drugid");
            let Status = PrescriptionStatus;

            let Entity = new RecordDrugsUpdates(Status, Id, DrugId);

            RecordDrugs.push(Entity);
        } 
    }

    AvailableDrugStatusSave(RecordDrugs, PrescriptionRecordId, PrescriptionId, AppointmentId, PatientId, PrescriptionStatus, _UserId)
}



/*=================================
			Common Events
 =================================*/

function CmdUploadFile_Click(InputId, SpanId)
{
    const InputFile = document.getElementById(InputId);
    InputFile.click();
    const FileText = document.getElementById(SpanId);
    InputFile.addEventListener("change", function ()
    {
        if (InputFile.value)
        {
            FileText.innerHTML = InputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        }
        else
        {
            FileText.innerHTML = Messages.NofileChoosen;
        }
    });
}

function CmdResetInputFields(Class)
{
    var x = document.querySelectorAll("." +Class);
    x.forEach(el =>
    {
        el.value = '';
        el.innerHTML = '';
    });
}

function MessageAlert()
{
    return ShowMessage(Messages.NoMessage, MessageTypes.Warning, "Oops!");
}

function CmdProfile_Click()
{
    new Profile().Render(Containers.MainContent);
    let FullName = _NurseFirstName + " " + _NurseLastName;
    document.getElementById('UserFullName').innerHTML = FullName;
    document.getElementById('UserNIC').innerHTML = _NurseNIC;
}

function CmdAboutUs_Click()
{
    new AboutUs().Render(Containers.MainContent);
}

function LnkSignOut_Click()
{
   location.reload();
}

function CmdBtnClickable_Click(Event)
{
    CmdBtnColorRemove_Click();    
    Event.style.backgroundColor = "#BDC3C7";
   
}

function CmdBtnColorRemove_Click()
{
    
    document.getElementById("PatientCard").style.backgroundColor = "white";
    document.getElementById("AppoinmentsCard").style.backgroundColor = "white";
    document.getElementById("SessionCard").style.backgroundColor = "white";
    document.getElementById("InvoiceCard").style.backgroundColor = "white";
}



// Warning -Need to Refactor-  Refactor Done
function SuccessReadingScan(QrCodeMessage)
{
    document.getElementById("TxtPatientHealthID").value = QrCodeMessage;
}

function ErrorReadingScan(ErrorMessage)
{

}

function CmdLoadCamera_Click()
{
    const QrCodeScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    QrCodeScanner.render(SuccessReadingScan, ErrorReadingScan);
}

function CmdChkAppointment_Click()
{
    if (document.getElementById('CheckAppoinmentNumber').checked)
    {

        document.getElementById("BtnSaveAppointment").disabled = false;
    }
    else
    {
        document.getElementById("BtnSaveAppointment").disabled = true;
    }

}

$('#TableAppointedPatient').each(function (index)
{
    $(this).children('td').two().addClass('d-none d-lg-table-cell');
    $(this).children('td').three().addClass('d-none d-lg-table-cell');
    $(this).children('td').four().addClass('d-none d-lg-table-cell');
    $(this).children('td').five().addClass('d-none d-lg-table-cell');
   
});