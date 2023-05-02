/*=================================
		Response Handlers
 =================================*/

//Variables
let DataLength;
let LoopCount = 0;
let selectedRowSessionId = 0;
let selectedRowAppointmentId = 0;
let selectedRowPatientId = 0;
let DoctorContactIdArr =  [0 , 0];
let DoctorSpecializationId = 0;
let DoctorSpecializationDrpId = 0;
let DoctorQualificationId = 0;

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

    _NurseLoggedIn = Response.Data[0];
    // console.log('NurseGet_Success._NurseLoggedIn:', _NurseLoggedIn);
}

function GetNurseBranches() {
    _Request.Post(ServiceMethods.InstituteBranch, new Doctor(undefined, undefined), GetNurseBranches_Success);
    //_Request.Get(ServiceMethods.InstituteBranchGet, null, GetNurseBranches_Success);
}

function GetNurseBranches_Success(Response) {
    if (Response.Data[0] != null || Response.Data[0] != "") {
        _UserBranchId = Response.Data[0].Id;
        document.getElementById("LblInstituteBranch").innerHTML = Response.Data[0].Name;

        _NurseBranch = Response.Data[0];

        //invoke a flag to modify the '_UserId' value in 'InitRequestHandler()'
        _IsAdminUserIdRequired = true;
        //rerun
        InitRequestHandler();

        _ArrayAllInstitutes = [];
        _Request.Get(ServiceMethods.GetInstitute, null, GetAllInstitutes_Success);
    }
}

function GetAllInstitutes_Success(Response) {
    //reset flag
    _IsAdminUserIdRequired = false;
    //reset
    InitRequestHandler();

    _ArrayAllInstitutes = Response.Data;
    _NurseInstitute = _ArrayAllInstitutes.filter((Institute) => Institute.Id === _NurseBranch.InstituteId)[0];
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
    let ArrayPatientData = [];
    let PatientType = "-";
    _ArrayPatientSearchResultsData = Data;

    if (DataLength === undefined) {

        ArrayPatientData.push({
            Name: Data.Title + Data.FirstName + " " + Data.LastName,
            NIC: Data.NIC,
            Mobile: Data.Mobile,
            Gender: Data.Gender,
            Dep: PatientType,
            Action: '<button class="btn btn-info btn-icon" type="button" onclick="LoadPatientData(' + Data.Id + ')">' +
                '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' +
                '</button>' +
                '<button class="btn btn-primary btn-icon" type="button" onclick="SetAppointmentPatient(this,' + Data.Id + ')">' +
                '<span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span>' +
                '</button>'
        });

    } else {

        for (let Count = 0; Count < DataLength; Count++) {
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
                Name: isNull(Data[Count].Title) + " " + isNull(Data[Count].FirstName) + " " + isNull(Data[Count].LastName),
                NIC: isNull(Data[Count].NIC),
                Mobile: isNull(Data[Count].Mobile),
                Gender: isNull(Data[Count].Gender),
                Dep: PatientType,
                Action: '<button class="btn btn-info btn-icon" type="button" onclick="LoadPatientData(' + isNull(Data[Count].Id) + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-primary btn-icon mx-2" type="button" onclick="SetAppointmentPatient(this,' + isNull(Data[Count].Id) + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span>' +
                    '</button>'
                // '<button class="btn btn-primary btn-icon" type="button" onclick="PatientMedicalBillModalDisplay(' + isNull(Data[Count].Id) + ')">' +
                // '<span class="ul-btn__icon"><i class="i-Billing"></i></span>' +
                // '</button>'
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

function PatientMedicalBillModalDisplay(PatientId) {
    // console.log(appId);
    // console.log('PatientMedicalBillModalDisplay.PatientId:', PatientId);
    // console.log('PatientMedicalBillModalDisplay._ArrayPatientSearchResultsData:', _ArrayPatientSearchResultsData);
    const PatientMatched = _ArrayPatientSearchResultsData.filter((Patient) => Patient.Id === PatientId)[0];
    // console.log('PatientMedicalBillModalDisplay.PatientMatched:', PatientMatched);
    new MedicalBill(PatientMatched).Render(Containers.Footer);
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
    // console.log('GetDoctorData_Success._DoctorSessionData:',_DoctorSessionData);
}

function SetDoctorData(Id) {
    // console.log('SetDoctorData.Id:', Id);
    let Count;
    let DataLength = _DoctorSessionData.length;
    //all doctors - as the first option
    $('#' + Id).append('<option value="all">All Doctors</option>');
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

    if (Response.Status != 1000) {
        $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>');
        $('#DrpSessionDateDoctor').append('<option value="all">All Sessions</option>');
    } else {
        let DataLength = Response.Data.length;
        let Count = 0;
        let Type;
        if (DataLength === 0) {
            $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>');
            $('#DrpSessionDateDoctor').append('<option value="all">All Sessions</option>');
        } else {
            $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>');
            $('#DrpSessionDateDoctor').append('<option value="all">All Sessions</option>');
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

function GetDoctorsSessionsForAppointmentUpdate_Success(Response) {
    const DoctorSessionSelect = $("#TxtAppointmentUpdateDoctorSession");
    $(DoctorSessionSelect).empty();

    if (Response.Status != 1000) {
        $(DoctorSessionSelect).append('<option value=" ">None</option>');
    } else {
        let DataLength = Response.Data.length;
        let Type;
        if (DataLength === 0) {
            $(DoctorSessionSelect).append('<option value=" ">None</option>');
        } else {
            for (let Count = 0; Count < DataLength; Count++) {
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

                $(DoctorSessionSelect).append('<option value="' + Response.Data[Count].Id + '">  Room No ' + Response.Data[Count].RoomNumber + " / " + SessionDate + " / " + StartTime + "-" + EndTime + " / " + Type + '</option>');
            }
        }
    }
}

function GetNextAppoinmentNumber(Id, DoctorName, SessionDetails) {
    new NewAppoinment().Render(Containers.MainContent);
    // if (_IsSetAppointmentToDoctorClicked) {
    //     new Appoinments().Render(Containers.MainContent);
    //     _IsSetAppointmentToDoctorClicked = false;
    // } else {
    //     new NewAppoinment().Render(Containers.MainContent);
    // }
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
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    else document.getElementById('TxtAppoinmentNumber').value = Response.Data.Number;
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
    if ($('#AppointmentsSearchButton').prop('disabled', true)) {
        $('#AppointmentsSearchButton').prop('disabled', false);
    }
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        LoopCount = 0;
        _AppointmentDetails = Response.Data;
        //GetAppointedPatients(Response.Data);

        if (Response.Data.length > 0) {
            for (let i = 0; i < Response.Data.length; i++) {
                _ArrayAppointmentsForToday.push(Response.Data[i]);
            }
        }

        //*******new
        FilterAppointedPatientData(Response.Data);
        LoadAppointmentedPatientList();
    }
}

function FilterAppointedPatientData(Data) {

    let DataLength = Data.length;

    for (let Count = 0; Count < DataLength; Count++) {

        let PaymentStatus = '-';

        switch (Data[Count].Status) {
            case 2:
                PaymentStatus = "<span style='background-color:Green; color:white; padding:5px; text-left'>Paid</span>";
                break;
            case 3:
                PaymentStatus = "<span style='background-color:Red; color:white; padding:5px;'>Pending</span>";
                break;

        }

        const ChannelingStatusOriginal = Data[Count].ChannelingStatus != null ? Data[Count].ChannelingStatus.toLowerCase() : '-';
        let ChannelingStatus = '-';

        if (ChannelingStatusOriginal.includes('unsuccessful')) {
            ChannelingStatus = 'Unsuccessful';
        } else if (ChannelingStatusOriginal.includes('successful')) {
            ChannelingStatus = 'Successful';
        } else if (ChannelingStatusOriginal.includes('pending')) {
            ChannelingStatus = 'Pending';
        } else if(ChannelingStatusOriginal.includes('cancelled')){
            ChannelingStatus = 'Cancelled';
        }

        // console.log(ChannelingStatusOriginal, ChannelingStatus);

        const GenderOriginal = Data[Count].Gender != null ? Data[Count].Gender.toLowerCase() : '-';
        let Gender = '-';

        if (GenderOriginal === 'female') {
            Gender = 'F';

        } else if (GenderOriginal === 'male') {
            Gender = 'M';
        }

        _ArrayAppointedPatientData.push(
            {
                "A#": isNull(Data[Count].Number),
                "Doctor": isNull(Data[Count].DoctorName),
                "Patient": isNull(Data[Count].Title) + " " + isNull(Data[Count].FirstName) + " " + isNull(Data[Count].LastName),
                "Mobile": isNull(Data[Count].Mobile),
                "M/F": Gender,
                "Payment": PaymentStatus,
                "Status": ChannelingStatus,
                "Action": '<button class="btn btn-info btn-icon w-25 custom-btn" type="button" onclick="AppointmentDetailsEdit(' + Data[Count].Id + ','+Data[Count].SessionId+','+Data[Count].PatientId+')">' +
                    '<span class="ul-btn__icon"><i style="margin-left: -5;" class="i-Pen-2"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-info btn-icon w-25 custom-btn mx-2" type="button" onclick="UploadFile(' + Data[Count].Id + ')">' +
                    '<span class="ul-btn__icon"><i style="margin-left: -5;" class="i-Upload"></i></span>' +
                    '</button>' +
                    '<button class="btn btn-info btn-icon w-25 custom-btn" type="button" onclick="MedicalBillDisplay(' + Data[Count].Id + ',' + Data[Count].Number + ')">' +
                    '<span class="ul-btn__icon"><i style="margin-left: -5;" class="i-Billing"></i></span>' +
                    '</button>'
            });

    }
}

function GetAllPatientAppointmentsList(SearchType) {
    // console.log('GetAllPatientAppointmentsList.SearchType:', SearchType);
    _ArrayAppointedPatientData = [];

    // _Request.Post(ServiceMethods.GetAppoinment, new AppointmentList(undefined, undefined, undefined, undefined), GetAllPatientAppointmentsList_Success);

    const GetCurrentDate = new Date();
    const GetTodayDate = GetCurrentDate.getFullYear() + '-' + (GetCurrentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + GetCurrentDate.getDate().toString().padStart(2, "0");
    // _Request.Post(ServiceMethods.SessionGetByDate, new AllAppointmentsForToday(_UserId, GetTodayDate), GetAllPatientAppointmentsList_Success);
    if (SearchType === 'search') {
        const AppointmentDate = $('#TxtAppointmentSearchDate').val();
        _Request.Post(ServiceMethods.SessionGetByDate, new AllAppointmentsForToday(_UserId, AppointmentDate), GetAllPatientAppointmentsForTodayList_Success);
    } else {
        _Request.Post(ServiceMethods.SessionGetByDate, new AllAppointmentsForToday(_UserId, GetTodayDate), GetAllPatientAppointmentsForTodayList_Success);
    }
}

function GetAllPatientAppointmentsForTodayList_Success(Response) {
    if (Response.Status !== 1000) {
        return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    } else {
        const AppointmentsForToday = Response.Data;
        // console.log('GetAllPatientAppointmentsForTodayList_Success.AppointmentsForToday:', AppointmentsForToday);
        _ArrayAppointmentsForToday = [];
        // _AppointmentsForToday = Response.Data;
        for (let i = 0; i < AppointmentsForToday.length; i++) {
            // console.log('GetAllPatientAppointmentsForTodayList_Success.AppointmentsForToday[i].Id:', AppointmentsForToday[i].Id);
            _Request.Post(ServiceMethods.GetAppoinment, new AppointmentList(undefined, undefined, undefined, AppointmentsForToday[i].Id), GetDoctorAppoinmentList_Success);
        }
    }
}

function GetAllPatientAppointmentsList_Success(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        _AppointmentDetails = Response.Data;
        FilterAppointedPatientData(Response.Data);
        LoadAppointmentedPatientList();
    }
}

function LoadVitals(Id) {
    _PatientId = Id;
    _AppointmentUser = _AppointmentDetails.filter(PId => PId.PatientId === GetPatientOriginalId(Id))[0];

    _Request.Get(ServiceMethods.GetPatientData + Id, Id, LoadPatientDataForVitals_Success);

    new AddVitals().Render(Containers.MainContent);
}

function AppointmentDetailsEdit(AppointmentId,SessionId,PatientId) {
    _AppointmentSelected = {};
    selectedRowSessionId = SessionId;
    selectedRowAppointmentId = AppointmentId;
    selectedRowPatientId = PatientId;
    new AppointmentDetailsEditModal().Render(Containers.Footer, AppointmentId);
    $('#TxtAppointmentUpdateDoctor').empty();
    for (let Count = 0; Count < _DoctorSessionData.length; Count++) {
        $('#TxtAppointmentUpdateDoctor').append('<option value="' + _DoctorSessionData[Count].Id + '">' + _DoctorSessionData[Count].FirstName + " " + _DoctorSessionData[Count].LastName + '</option>');
    }
    //set matching options as 'selected'
    AppointmentsMatchingDropdownItemsSetSelected();
    //auto set selected doctor's session
    GetDoctorsSessionsForAppointmentUpdate();
}

function AppointmentsMatchingDropdownItemsSetSelected() {
    // console.log('AppointmentsMatchingDropdownItemsSetSelected._AppointmentSelected:', _AppointmentSelected);
    $("#TxtAppointmentUpdateDoctor option[value='" + _AppointmentSelected.DoctorId + "']").prop("selected", true);
    $("#TxtAppointmentUpdateDoctorSession option[value='" + _AppointmentSelected.SessionId + "']").prop("selected", true);
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

function MedicalBillDisplay(PatientId) {
    // console.log(appId);
    // console.log('MedicalBillDisplay.PatientId:', PatientId);
    // console.log('MedicalBillDisplay._AppointmentDetails:', _AppointmentDetails);
    const PatientMatched = _AppointmentDetails.filter((Patient) => Patient.Id === PatientId)[0];
    // console.log('MedicalBillDisplay.PatientMatched:', PatientMatched);
    new MedicalBill(PatientMatched).Render(Containers.Footer);
}

function medicalBillTableFirstRowReplace() {
    $("#TblPatientInvoiceBody").html('');
    $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
}

function medicalBillTableRowAdd() {
    if (medicalBillInputsAreAllValid()) {
        $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
        medicalBillTableRowCountReset();
        medicalBillTableButtonsReset();
    } else {
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }
}

function medicalBillInputsAreAllValid() {
    let TableRows = $('#TblPatientInvoiceBody .TblRow');
    let TableRow = '';
    let Item = '-';
    let FeeType = '-';
    let FeeAmount = 0;
    let TotalInputElements = 0;
    let FilledInputElements = 0;

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
    }

    // console.log('medicalBillInputsValidate:', 'FilledInputElements:', FilledInputElements, 'TotalInputElements:', TotalInputElements);

    if (FilledInputElements === TotalInputElements) {
        //passed
        return true;
    } else {
        //failed
        return false;
    }
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

function medicalBillSave(PatientId) {
    // console.log('medicalBillSave.PatientId:', PatientId);
    // console.log('medicalBillSave._ArrayPatientSearchResultsData:', _ArrayPatientSearchResultsData);
    const PatientMatched = _ArrayPatientSearchResultsData.filter((Patient) => Patient.Id === PatientId)[0];
    const MedicalBillItems = [];
    // let TotalInputElements = 0;
    // let FilledInputElements = 0;

    if (!medicalBillInputsAreAllValid()) {
        //failed
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    } else {
        //passed
        let TableRows = $('#TblPatientInvoiceBody .TblRow');
        let TableRow = '';
        let Item = '-';
        let FeeType = '-';
        let FeeAmount = 0;
        let MedicalBillItem = {};

        for (let i = 0; i < TableRows.length; i++) {
            TableRow = TableRows[i];
            Item = $(TableRow).find('#TxtItem').val() !== '' ? $(TableRow).find('#TxtItem').val() : '';
            FeeType = $(TableRow).find('#TxtFeeType').val() !== '' ? $(TableRow).find('#TxtFeeType').val() : '';
            FeeAmount = $(TableRow).find('#TxtFeeAmount').val() > 0 ? $(TableRow).find('#TxtFeeAmount').val() : 0;
            // TotalInputElements += 3;
            // if (Item !== '') {
            //     FilledInputElements++;
            // }
            // if (FeeType !== '') {
            //     FilledInputElements++;
            // }
            // if (FeeAmount > 0) {
            //     FilledInputElements++;
            // }
            MedicalBillItem = {
                'Item': Item, 'FeeType': FeeType, 'FeeAmount': FeeAmount
            };
            MedicalBillItems.push(MedicalBillItem);
        }
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

    // console.log('medicalBillSave._DoctorSessionData:', _DoctorSessionData);

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
        // 'AppNumber': appId,
        'AppNumber': 1,
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

    // if (FilledInputElements === TotalInputElements) {
    medicalBillSaveInLocalStorage(JSON.stringify(JsonObjectToSave));
    // } else {
    //     return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    // }
}

function medicalBillSaveInLocalStorage(JsonString) {
    // console.log('medicalBillSaveInLocalStorage.JsonString:', JsonString);
    if (localStorage.getItem('ReceptionMedicalBill') == null) {
        localStorage.setItem('ReceptionMedicalBill', '{}');
    }
    localStorage.setItem('ReceptionMedicalBill', JsonString);

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
    new ClinicBillSearch().Render('ClinicMedicalBillsSearch');
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
                    '<button class="btn btn-info btn-icon custom-btn mx-2" type="button" onclick="ClinicMedicalBillDisplay(' + Data[Count].Id + ')">' +
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

/*=================================
		Settings [Admin] Section
 =================================*/

function General_View() {
    new LayoutMain().Render();
    new PatientSearch().Render(Containers.MainContent);
    document.getElementById("PatientCard").style.backgroundColor = "#BDC3C7";
}

function Admin_View() {
    new AdminLayoutMain().Render();
    new Branches().Render(Containers.MainContent);
    document.getElementById("BranchesCard").style.backgroundColor = "#BDC3C7";
    AllBranchesOfTheInstituteGet();
}

/*=================================
		Branches Methods
 =================================*/

function AllBranchesOfTheInstituteGet() {
    _ArrayAllBranchesOfTheInstituteResultsData = [];
    //invoke a flag to modify the '_UserId' value in 'InitRequestHandler()'
    _IsAdminUserIdRequired = true;
    //rerun
    InitRequestHandler();
    _Request.Post(ServiceMethods.InstituteBranch, new InstituteBranch(undefined, '2', _NurseBranch.InstituteId), AllBranchesOfTheInstituteGet_Success);
}

function AllBranchesOfTheInstituteGet_Success(Response) {
    //reset flag
    _IsAdminUserIdRequired = false;
    //reset
    InitRequestHandler();
    _ArrayAllBranchesOfTheInstituteResultsData = Response.Data;

    const ArrayBranchesSearchResultsData = [];

    if (Response.Data.length > 0) {

        let Branch = {};

        for (let Count = 0; Count < Response.Data.length; Count++) {

            Branch = Response.Data[Count];
            // console.log('AllBranchesOfTheInstituteGet_Success.Branch:', Branch);

            ArrayBranchesSearchResultsData.push({
                "Branch Name": Branch.Name,
                "Action": '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="BranchAddOrUpdateModalView(' + Branch.Id + ')">' +
                    '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' +
                    '</button>'
            });

        }

    }

    // console.log('AllBranchesOfTheInstituteGet_Success.ArrayBranchesSearchResultsData:', ArrayBranchesSearchResultsData);

    new BranchesSearchResultsTable().Render('BranchesSearchResults', ArrayBranchesSearchResultsData);
    // CreateDataTable('TableBranchesSearchResults');

}

function BranchAddOrUpdateModalView(BranchId) {
    _AddressId = 0;
    if (parseInt(BranchId) > 0) {
        //update
        new BranchAddOrUpdateModal().Render(Containers.Footer, BranchId, 'Update');
        //pass data
        const BranchMatched = _ArrayAllBranchesOfTheInstituteResultsData.filter((Branch) => Branch.Id === BranchId)[0];
        // console.log('BranchAddOrUpdateModalView.BranchMatched:', BranchMatched);
        $('#TxtBranchUpdateBranchName').val(BranchMatched.Name);
        $('#TxtBranchUpdateEmail').val(BranchMatched.Email);
        $('#TxtBranchUpdateWebsite').val(BranchMatched.Website);
        $('#TxtBranchUpdateAddressLine1').val(BranchMatched.AddressLine1);
        $('#TxtBranchUpdateAddressLine2').val(BranchMatched.AddressLine2);
        $('#TxtBranchUpdatePostCode').val(BranchMatched.Postcode.split('|')[0]);
        $('#TxtBranchUpdateSuburb').val(BranchMatched.Suburb);
        $('#TxtBranchUpdateCity').val(BranchMatched.City);
        const ContactNo = '0' + BranchMatched.Postcode.split('|')[1].toString().slice(2);
        $('#TxtBranchUpdateContactNo').val(ContactNo);
    } else {
        //add new
        new BranchAddOrUpdateModal().Render(Containers.Footer, BranchId, 'AddNew');
    }
}

function BranchAddOrUpdate(BranchId) {
    // console.log('BranchAddOrUpdate.BranchId:', BranchId);
    const Name = document.getElementById("TxtBranchUpdateBranchName").value.trim();
    const Address1 = document.getElementById("TxtBranchUpdateAddressLine1").value.trim();
    const Address2 = document.getElementById("TxtBranchUpdateAddressLine2").value.trim();
    const Suburb = document.getElementById("TxtBranchUpdateSuburb").value.trim();
    const City = document.getElementById("TxtBranchUpdateCity").value.trim();
    const PostCode = document.getElementById("TxtBranchUpdatePostCode").value.trim();
    const Email = document.getElementById("TxtBranchUpdateEmail").value.trim();
    const Website = document.getElementById("TxtBranchUpdateWebsite").value.trim();
    const ContactNo = document.getElementById("TxtBranchUpdateContactNo").value.trim();
    // const Numbers = [0, document.getElementById("TxtBranchUpdateContactNo").value.trim(), 1];
    const Numbers = [new ContactNumbers(0, ContactNo, 1)];
    const Status = 1;
    const UserSavedId = getCookie("UserId");
    const InstituteId = _NurseBranch.InstituteId;

    //validation
    if (Name === "")
        return ShowMessage('Invalid Branch Name!', MessageTypes.Warning, "Warning!");

    if (Email === "")
        return ShowMessage('Invalid Email!', MessageTypes.Warning, "Warning!");

    if (Address1 === "")
        return ShowMessage('Invalid Address!', MessageTypes.Warning, "Warning!");

    if (City === "")
        return ShowMessage('Invalid City!', MessageTypes.Warning, "Warning!");

    if (ContactNo === "")
        return ShowMessage(Messages.InvalidMobileNumber, MessageTypes.Warning, "Warning!");

    if (ValidateMobile(ContactNo) === false && ContactNo !== "")
        return ShowMessage(Messages.InvalidMobileNumber, MessageTypes.Warning, "Warning!");

    const AddressPayLoad = new Address(_AddressId, Address1, Address2, Suburb, City, PostCode, 1, 2);

    _Request.Post(ServiceMethods.AddressPost, AddressPayLoad, function (Response) {
        // console.log('AddressPost.Response:', Response);
        if (Response.Status === 1000) {
            const AddressSavedId = Response.Data.Id;
            // console.log('AddressSavedId:', AddressSavedId);
            const BranchPayLoad = new InstituteBranchSave(parseInt(BranchId), InstituteId, Name, AddressSavedId, Email, Website, Numbers, Status, 2);
            _Request.Post(ServiceMethods.InstituteBranchPost, BranchPayLoad, SuccessInstituteBranchSave);
        } else {
            return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
        }
    });
}

function SuccessInstituteBranchSave(Response) {
    if (Response.Status === 1000) {
        $('#ModalForBranchAddOrUpdate').modal('hide');
        AllBranchesOfTheInstituteGet();
        _AddressId = 0;
        return ShowMessage(Messages.BranchSaveSuccess, MessageTypes.Success, "Success!");
    } else {
        return ShowMessage(Messages.Message, MessageTypes.Warning, "Warning!");
    }
}

function BranchWardAdd(BranchId) {

}

//doctor

function EditPassword() {
    $('#TxtDoctorConfirm_Password').show();
    $('#LblDoctorConfirm_Password').show();
    $('#TxtDoctorUser_Name').prop('disabled',false);
    $('#TxtDoctorPassword').prop('disabled',false);
}


//report

function DownloadReport()
{

    let doctor = $('#DrpDoctor').val();
    let FromDate = $('#TxtReportFrom_Date').val()+" 00:00:00";
    let ToDate = $('#TxtReportTo_Date').val()+" 23:59:59";

    makeCustomHeader(_UserIdAdmin);
    _Request.Post("PrescriptionRecord/GetPrescriptionRecord",new NewDailyCollection(FromDate,ToDate,doctor,"ALL"),function (res) {

        makeCustomHeader(_UserId);
        var csv_data = [];
        csv_data.push('#,Date & Time,Prescription No,Patient Name,Patient Mobile,Patient Age,Presenting Symptoms,Diagnosis,Drug Name')
        for (var i = 0; i < res.Data.length; i++)
        {
            let data = res.Data[i];
            csv_data.push(i+','+data.DateCreated+','+data.PrescriptionId+','+
                data.PatientFullName+','+data.Mobile+','+data.AgeYears+','
                +data.PositiveSx.replaceAll(',','-')+','+data.Diagnosis.replaceAll(',','-')+','+data.DrugName)
        }
        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file
        downloadCSVFile(csv_data);
    });

}

function downloadCSVFile(csv_data)
{

    // Create CSV file object and feed
    // our csv_data into it
    var BOM = "\uFEFF";
    var csvData = BOM + csv_data;
    CSVFile = new Blob([csvData], {
        type: 'text/csv; charset=utf-8'
    });

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');

    const TodaysDate = new Date().toISOString().slice(0,10);

    // Download csv file
    temp_link.download = "PrescriptionList-"+TodaysDate+".csv";
    temp_link.href = window.URL.createObjectURL(CSVFile);

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}
