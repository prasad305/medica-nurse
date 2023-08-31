/*=================================
		Response Handlers
 =================================*/

//Variables
let DataLength;
let LoopCount = 0;
let selectedRowSessionId = 0;
let selectedRowStatus = 2;
let selectedRowAppointmentId = 0;
let selectedRowPatientId = 0;
let DoctorContactIdArr = [0, 0];
let DoctorSpecializationId = 0;
let DoctorSpecializationDrpId = 0;
let DoctorQualificationId = 0;
var selectedDoctorId;
var selectedSessionId;
var selectedAppId;
var selectedAppointmentId;
var selectedPatientId;
var billId = 0;

async function Login_Success(Response) {
    if (Response.Status != 1000 || Response.Data.UserTypeId != 4) {
        return ShowMessage(Messages.LoginInvalid, MessageTypes.Warning, "Warning!");
    } else {
        _Username = Response.Data.Username;
        setCookie("UserId", Response.Data.Id);
        _UserId = Response.Data.Id;
        setCookie("AccessToken", Response.Data.AccessToken);

        InitRequestHandler();

        new LayoutMain().Render();
        document.getElementById("SessionCard").style.backgroundColor = "#BDC3C7";
        new Session().Render(Containers.MainContent);
        _AppointmentSessionId = undefined;
        try{
            $('#loading').modal('show');
            const allocatedDoctorsForNurse = await GetAsyncV2(
                {
                    serviceUrl: ServiceMethods.NurseDoctor,
                    searchParam: _UserId
                }
            )
            console.log(allocatedDoctorsForNurse);
            _DoctorSessionData = [];
            if (allocatedDoctorsForNurse.Data === 0 || allocatedDoctorsForNurse.Status !== 1000) {
                return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
            } else {
                let Count;
                let DataLength = allocatedDoctorsForNurse.Data.length;
                if(DataLength !== 0){
                    _NurseId = allocatedDoctorsForNurse.Data[0].NurseId;
                    NurseGet();
                }
                const doctorGetPromises = []
                for (Count = 0; Count < DataLength; Count++) {
                    doctorGetPromises.push(GetAsyncV2({
                        serviceUrl: ServiceMethods.DoctorGet + allocatedDoctorsForNurse.Data[Count].DoctorId,
                        searchParam: undefined
                    }))
                }
                const doctorGetResponses = await Promise.all(doctorGetPromises)
                doctorGetResponses.forEach(doctor=>GetDoctorData_Success(doctor))
                console.log(doctorGetResponses);
                if (_DoctorId !== "" && _DoctorId !== undefined) {
                    console.log(_DoctorId);
                    document.getElementById('DrpAppoinmentDoctor').value = _DoctorId;
                    GetDoctorAllSessionDataByDoctor(_DoctorId);
                }
            }

            SetDoctorData('DrpSessionDoctor');

        }catch (e) {
            console.log(e)
        }finally {

        }
        // GetSessionDoctorId();
        GetNurseBranches();
        NurseGet();
        // new PatientSearch().Render(Containers.MainContent);




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
        var dataAll = [];
        dataAll.push(Response.Data);
        FilterPatientData(dataAll);

        return ShowMessage(Messages.UserSaveSuccess, MessageTypes.Success, "Success!");
    }
}

function NurseGet() {
    if(_NurseId === null || _NurseId === undefined || _NurseId === '') return;
    _Request.Get(`${ServiceMethods.GetNurse}/${_NurseId}`, null, NurseGet_Success);
}

function NurseGet_Success(Response) {
    _NurseFirstName = Response.Data?.FirstName;
    _NurseLastName = Response.Data?.LastName;
    _NurseNIC = Response.Data?.NIC;
    _NurseLoggedIn = Response.Data;
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
            Action: '<button class="btn btn-info btn-icon" type="button" onclick="LoadPatientData(' + Data.Id + ')">' + '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' + '</button>' + '<button class="btn btn-primary btn-icon" type="button" onclick="SetAppointmentPatient(this,' + Data.Id + ')">' + '<span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span>' + '</button>'
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
                Action: '<button class="btn btn-info btn-icon" type="button" onclick="LoadPatientData(' + isNull(Data[Count].Id) + ')">' + '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' + '</button>' + '<button class="btn btn-primary btn-icon mx-2" type="button" onclick="SetAppointmentPatient(this,' + isNull(Data[Count].Id) + ')">' + '<span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span>' + '</button>'
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

async function SaveSession_Success(Response) {
    if (Response.Status !== 1000) {
        return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    }
    else {
        let sessionId = Response.Data.Id
        let appointments = [];
        console.log(Response)
        if (_UpdateSession) {
            try {
                //send notification to all patients
                //get all appointments in the session
                const response = await PostAsync({
                    serviceMethod: ServiceMethods.GetAppoinment, requestBody: new SessionId(sessionId)
                });
                console.log(response)
                let doctorName = '';
                let startingDateTime = Response.Data.TimeStart;
                let endingDateTime = Response.Data.TimeEnd;

                if (response.Data.length > 0) {
                    doctorName = response.Data[0].DoctorName;
                }
                await shareSessionUpdateWithPatients(response.Data, {
                    messageTitle: "Session Updated!",
                    doctorName: doctorName,
                    startingDateTime: startingDateTime,
                    endingDateTime: endingDateTime
                });

            } catch (e) {
                console.log(e)
            }
        } else {
            //feat/block appointments - 7/22/2023
            await SetReservedAppointmentCount(sessionId);
            ShowMessage(Messages.SessionSaveSuccess, MessageTypes.Success, "Success!");
        }

        CmdCancelSession_Click();

    }
}

/**
 * Share updated session details with patients
 * @param {Array} appointments
 * */
async function shareSessionUpdateWithPatients(appointments = [], {
    messageTitle, doctorName, startingDateTime, endingDateTime
}) {

    //filter appointments that are not cancelled
    let appointmentsNotCancelled = appointments.filter(appointment => appointment.ChannelingStatus !== 'cancelled');

    ShowMessage(`<i id='count'> Sending message 0 of ${appointmentsNotCancelled.length}</i>`, MessageTypes.Success, "Success!");

    const count = document.getElementById('count');

    let completed = 1;

    function setCompletedCount() {
        count.innerHTML = `Sending message ${completed} of ${appointmentsNotCancelled.length}`;
        completed++;
    }

    function setCompletedStatus() {
        count.innerHTML = `All patients notified`;
    }

    for (let i = 0; i < appointmentsNotCancelled.length; i++) {

        const appointment = appointmentsNotCancelled[i];
        const {Id, Mobile, Number} = appointment;
        let messageToPatient = ''
        if (endingDateTime) {
            messageToPatient = `${messageTitle} Docnote Booking Reference Number : ${Id}, Appointment Number: ${Number}, Doctor: ${doctorName}, Session Date: ${startingDateTime.split("T")[0]}, Session Start Time: ${new Date(startingDateTime).toLocaleString('en-US', {
                hour: 'numeric', minute: 'numeric', hour12: true
            })} Session End Time: ${new Date(endingDateTime).toLocaleString('en-US', {
                hour: 'numeric', minute: 'numeric', hour12: true
            })}`
        } else {
            messageToPatient = `${messageTitle} Docnote Booking Reference Number : ${Id}, Appointment Number: ${Number}, Doctor: ${doctorName}, Session Date: ${startingDateTime.split("T")[0]}, Session Start Time: ${new Date(startingDateTime).toLocaleString('en-US', {
                hour: 'numeric', minute: 'numeric', hour12: true
            })}`
        }

        let status = await PostAsync({
            serviceMethod: ServiceMethods.SENDSMS, requestBody: {
                "ScheduleMedium": [{
                    "MediumId": 1, "Destination": Mobile, "Status": 0
                }], "ScheduleMediumType": [{
                    "MediumId": 1, "Destination": Mobile, "Status": 0
                }], "NotifactionType": 1, "Message": messageToPatient, "Status": 0
            }
        })
        setCompletedCount()
    }
    setCompletedStatus();
}

async function SetReservedAppointmentCount(sessionId) {
    let numberOfReservedAppointments = document.getElementById('TxtSessionNumberOfReservedAppointments').value;
    if(numberOfReservedAppointments !== "" && numberOfReservedAppointments !== "0"){
        try{
            numberOfReservedAppointments = parseInt(numberOfReservedAppointments);
            let blockedAppointments = await PostAsync({
                serviceMethod: ServiceMethods.SaveAppoinmnet, requestBody: {
                    "SessionId": sessionId,
                    "PatientId": 635918339075,
                    "Id": 0,
                    "Description": null,
                    "Status":10,
                    "Number": numberOfReservedAppointments,
                    "UserId": _UserId,
                }
            })

        }catch (e) {

        }
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
        if(DataLength !== 0){
            _NurseId = Response.Data[0].NurseId;
            NurseGet();
        }
        for (Count = 0; Count < DataLength; Count++) {
            _Request.Get(ServiceMethods.DoctorGet + Response.Data[Count].DoctorId, undefined, GetDoctorData_Success);
        }
        if (_DoctorId !== "" && _DoctorId !== undefined) {
            console.log(_DoctorId);
            document.getElementById('DrpAppoinmentDoctor').value = _DoctorId;
            GetDoctorAllSessionDataByDoctor(_DoctorId);
        }
    }

}

function GetDoctorData_Success(Response) {

    _DoctorSessionData.push(Response.Data);
}


function setDoctorDropDown(Id){
    let Count;
    let DataLength = _DoctorSessionData.length;
    console.log(_DoctorSessionData)
    //all doctors - as the first option
    // $('#' + Id).append('<option value="all">All Doctors</option>');
    for (Count = 0; Count < DataLength; Count++) {
        $('#' + Id).append('<option value="' + _DoctorSessionData[Count].Id + '">' + _DoctorSessionData[Count].FirstName + " " + _DoctorSessionData[Count].LastName + '</option>');
    }
}


async function SetDoctorData(Id) {
    let Count;
    let DataLength = _DoctorSessionData.length;
    console.log(_DoctorSessionData)
    //all doctors - as the first option
    // $('#' + Id).append('<option value="all">All Doctors</option>');
    for (Count = 0; Count < DataLength; Count++) {
        $('#' + Id).append('<option value="' + _DoctorSessionData[Count].Id + '">' + _DoctorSessionData[Count].FirstName + " " + _DoctorSessionData[Count].LastName + '</option>');
    }
    console.log(_DoctorSessionData);


    let doctors = {};

   _DoctorSessionData.forEach((doctor) => {
         doctors[doctor.Id] = {doctor, sessions:[]};
    });

    //get all sessions for doctor list
    try{
        $('#loading').modal('show');
        const getSessionsResponse = await Promise.all(Object.keys(doctors).map((doctorId) => PostAsyncV2({
            serviceUrl:ServiceMethods.SessionsGet,
            requestBody:{
                "DoctorId": doctorId,
            }
        })));

        console.log("session response",getSessionsResponse);

        for(let i=0; i<getSessionsResponse.length; i++){
            if(getSessionsResponse[i]?.Data?.length > 0){
                getSessionsResponse[i]?.Data?.forEach((session) => {
                doctors[session.DoctorId].sessions.push(session);
                });
            }
        }

        doctors = Object.values(doctors);
        _DoctorsAndSessions = doctors;
        _DoctorsAndSessionsWithoutFiltering = doctors;



        let tableData = doctors.map((doctor, index) => {
            let StartingDateTime = "No sessions";
            if(doctor?.sessions?.length > 0){
                const timeStart = doctor.sessions[0]?.TimeStart
                StartingDateTime = new Date(timeStart).toISOString().split('T')[0] + " @ ";
                let TimeStartSplit = timeStart.split("T")[1].split(":");
                let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
                StartingDateTime += new Date(TimeFormat.DateFormat + TimeStart + "Z").toLocaleTimeString(Language.SelectLanguage, {
                    timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
                });
            }
            const doctorObjString = JSON.stringify(doctor);

            return {
                "No": index + 1,
                "DoctorName":doctor.doctor.FirstName + " " + doctor.doctor.LastName,
                "NearestSession":StartingDateTime,
                "NoOfSessions":doctor?.sessions?.length > 0 ? doctor.sessions.length : "N/A",
                "Actions":`
                    <button class='btn btn-outline-primary btn-sm p-1 ' ${doctor?.sessions?.length > 0 ? '' : "disabled"} style='font-size: 0.7rem' onclick='showViewMoreSessionsModal(${index})'>View Sessions</button>
                    <button class='btn btn-outline-primary btn-sm p-1 ml-2' ${doctor?.sessions?.length > 0 ? '' : "disabled"} style='font-size: 0.7rem' onclick='showNearestDoctorSession(${index})'>Appointment</button>
                    <button class='btn btn-outline-primary btn-sm p-1 ml-2' style='font-size: 0.7rem' onclick='CmdAddSession_Click(${doctor.doctor.Id})'>Add Session</button>`
            }
        });

        new DoctorAndSessionsTable().Render('DivDoctorsAndSessionTable', tableData);
        CreateDataTable('TableDoctorAndSessions');
        document.getElementById('doctor-count').innerHTML = `${doctors.length} Total doctors`;

    }catch (e) {
        console.log(e)
    }finally {
        $('#loading').modal('hide');
    }

}

function seeOtherSessions(index){
    $('#session-select-modal').modal('hide');
    showViewMoreSessionsModal(index);
}

function onCLickContinueQuickSuggestedSession(index, sessionIndex){
    const doctor = _DoctorsAndSessions[index]?.doctor;
    _AppointmentDoctorName  = doctor.FirstName + " " + doctor.LastName;
    const session = _DoctorsAndSessions[index]?.sessions[sessionIndex];
    const sessionDate = new Date(session.TimeStart).toISOString().split('T')[0];
    const timeStart = session.TimeStart
    let TimeStartSplit = timeStart.split("T")[1].split(":");
    let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
    const StartingDateTime = new Date(TimeFormat.DateFormat + TimeStart + "Z").toLocaleTimeString(Language.SelectLanguage, {
        timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
    });
    const timeEnd = session.TimeEnd
    let TimeEndSplit = timeEnd.split("T")[1].split(":");
    let TimeEnd = TimeEndSplit[0] + ":" + TimeEndSplit[1];
    const EndingDateTime = new Date(TimeFormat.DateFormat + TimeEnd + "Z").toLocaleTimeString(Language.SelectLanguage, {
        timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
    });
    let Type = "";
    if (session.Type === 1) Type = "Virtual"; else if (session.Type === 2) Type = "Physical"; else Type = "Both";
    _SessionDetails  = `Session : Room No ${session.RoomNumber}/ ${sessionDate} / ${StartingDateTime}-${EndingDateTime} / ${Type}`
    $('#session-select-modal').modal('hide');
    _AppointmentSessionId = session?.Id;
    StoredSessionId = session?.Id;
    _IsSetAppointmentToDoctorClicked = true;
    LoadSessionViceAppointments(undefined,session?.Id);

    // new PatientSearch().Render(Containers.MainContent);
    // LoadSessionViceAppointments(undefined,session?.Id);
    // SetAppoinmentDoctorDetails(doctorName, sessionDetails);

}

function  showNearestDoctorSession (index){
    const doctorAndSession = _DoctorsAndSessions[index];
    const doctor = doctorAndSession.doctor;
    const selectSessionElement = document.getElementById('session-select');
    const availableDate = new Date(doctorAndSession.sessions?.[0].TimeStart).toISOString().split('T')[0];

    const timeStart = doctorAndSession.sessions[0]?.TimeStart
    let TimeStartSplit = timeStart.split("T")[1].split(":");
    let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
    const startTime = new Date(TimeFormat.DateFormat + TimeStart + "Z").toLocaleTimeString(Language.SelectLanguage, {
        timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
    });

    selectSessionElement.innerHTML = `  
          <div class="d-flex justify-content-between ">  
          <h3>Place appointment </h3>
            <button class="btn btn-light bg-transparent ml-4 p-1 py-0 mb-1 border-0" onclick="$('#session-select-modal').modal('hide')">X</button>
          </div>
          <p style="color:green">Session available on ${availableDate} </p>
          <div class="row">
            <div class="col-6">
            Doctor name
            </div>  
            <div class="col">
           ${doctor.Title} ${doctor.FirstName} ${doctor.LastName}
            </div>
          </div><div class="row">
            <div class="col-6">
            Start time
            </div>  
            <div class="col">
            ${startTime}
            </div>
          </div><div class="row">
            <div class="col-6">Appointment No</div>  
            <div class="col">01</div>
          </div>
        
          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-outline-primary"  onclick='seeOtherSessions(${index})'>See other sessions</button>
            <button class="btn btn-primary bg-transparent" onclick='onCLickContinueQuickSuggestedSession(${index},0)'>Continue</button>
          </div>`
    $('#session-select-modal').modal('show');
}


function GetDoctorSessionData_Success(Response) {
    if (Response.Status != 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    if (Response.Data.length === 0) return ShowMessage(Messages.NoSession, MessageTypes.Warning, "Warning!"); else FilterDoctorSessionData(Response.Data);
}

function FilterDoctorSessionData(Data) {

    console.log(Data);

    const filteredData = {};

    Data?.forEach((item) => {
        let DoctorId = item?.Title + item?.FirstName + item?.LastName;
        if(filteredData[DoctorId]){
            filteredData[DoctorId].push(item);
        }else{
            filteredData[DoctorId] = [item];
        }
    });

    console.log(filteredData);


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
        let MaxAppointments = Data[Count].AppointmentLimit ?? "-";
        let AppointmentReserved = Data[Count].AppointmentReserved ?? "-";

        if (Data[Count].Type === 1) Type = "Virtual"; else if (Data[Count].Type === 2) Type = "Physical"; else Type = "Both";


        ArrayDoctorSessionData.push({
            " ": " ",
            "Date": SelectDate,
            "StartTime": StartTime,
            "EndTime": EndTime,
            "Max.App": MaxAppointments,
            "Reserved": AppointmentReserved,
            "Room": RoomNumber,
            Type: Type,
            "Action": '<button class="btn btn-info btn-icon" type="button" onclick= "LoadSessionData(' + Data[Count].Id + ')"><span class="ul-btn__icon"><i class="i-Pen-2"></i></span></button> ' + '<button class="btn btn-warning btn-icon" type="button" onclick= "LoadSessionViceAppointments(this,' + Data[Count].Id + ')"><span class="ul-btn__icon"><i class="i-Calendar-4"></i></span></button>'
        });
    }
    new DoctorSessionTable().Render('DivSessionTable', ArrayDoctorSessionData);
    CreateDataTable('TableSession');


}

function LoadSessionData(Id) {
    _UpdateSession = true;
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
        document.getElementById('TxtSessionMaxNumberOfAppointments').value = Response.Data.AppointmentLimit;
        document.getElementById('TxtSessionNumberOfReservedAppointments').value = Response.Data.AppointmentReserved;
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
        $('#DrpSessionDateDoctor').append('<option value="0">All Sessions</option>');
    } else {
        let DataLength = Response.Data.length;
        let Count = 0;
        let Type;
        if (DataLength === 0) {
            $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>');
            $('#DrpSessionDateDoctor').append('<option value="0">All Sessions</option>');
        } else {
            $('#DrpSessionDateDoctor').append('<option value=" ">Select Session</option>');
            $('#DrpSessionDateDoctor').append('<option value="0">All Sessions</option>');
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
    //if session is set load it
    if(StoredSessionId !== undefined && StoredSessionId !== ""){
        document.getElementById('DrpSessionDateDoctor').value = StoredSessionId;
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
        // document.getElementById('TxtAppointmentsDetailsPatient').innerHTML = "Patient : " + _AppointmentPatientName;
        const PatientMatched = _ArrayPatientSearchResultsData.filter((Patient) => Patient.Id === _PatientId)[0];
        document.getElementById('TxtAppointmentsDetailsPatient').innerHTML = "Patient : " + PatientMatched.FirstName + ' ' + PatientMatched.LastName;
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
        //send message to patient
        let appointmentNumber = Response.Data.Number;
        let appointmentId = Response.Data.Id;
        let doctorName = Response.Data.DoctorName;
        let startingDateTime = Response.Data.TimeStart;
        let patientMobileNo = Response.Data.Mobile;

        shareAppointmentDetailsWithPatient({
            messageTitle: 'New Appointment Placed!',
            mobileNumber: patientMobileNo,
            appointmentNumber: appointmentNumber,
            appointmentId: appointmentId,
            doctorName: doctorName,
            startingDateTime: startingDateTime
        })


        _PatientId = null;
        _AppointmentSessionId = null;
        StoredSessionId = null;


        $('#AppoinmentsCard').click();

        // GetNextAppoinmentNumber(_AppointmentSessionId, _AppointmentDoctorName, _SessionDetails);
        // GetDoctorAppoinmentList();

        //SavePatientAnalytics(Response.Data);
        return ShowMessage(Messages.ApoointmentSaveSuccess, MessageTypes.Success, "Success!");
    }
}

/**
 * Sends SMS to patient with appointment details
 * @param {string} messageTitle - Title of the message
 * @param {string} mobileNumber - Mobile number of the patient
 * @param {string} appointmentNumber - Appointment number'
 * @param {string} appointmentId - Appointment id
 * @param {string} doctorName - Name of the doctor
 * @param {string} startingDateTime - Starting date and time of the appointment
 * @param {string} doctorName - Name of the doctor
 * @param {string} startingDateTime - Starting date and time of the appointment
 * @param {function} onSuccess - Callback function
 * */
function shareAppointmentDetailsWithPatient({
                                                messageTitle,
                                                mobileNumber,
                                                appointmentNumber,
                                                appointmentId,
                                                doctorName,
                                                startingDateTime
                                            }, onSuccess = null) {
    _Request.Post(ServiceMethods.SENDSMS, {
        "ScheduleMedium": [{
            "MediumId": 1, "Destination": mobileNumber, "Status": 0
        }],
        "ScheduleMediumType": [{
            "MediumId": 1, "Destination": mobileNumber, "Status": 0
        }],
        "NotifactionType": 1,
        "Message": `${messageTitle} Docnote Booking Reference Number : ${appointmentId}, Appointment Number: ${appointmentNumber}, Doctor: ${doctorName}, Session Date: ${startingDateTime.split("T")[0]}, Session Start Time: ${new Date(startingDateTime).toLocaleString('en-US', {
            hour: 'numeric', minute: 'numeric', hour12: true
        })}`,
        "Status": 0
    }, onSuccess);
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
        _ArrayAppointmentsLoaded = Response.Data;
        //GetAppointedPatients(Response.Data);

        if (Response.Data.length > 0) {
            _ArrayAppointmentsForToday = [..._ArrayAppointmentsForToday, ...Response.Data];
        }
        $('#loading').modal('hide');

        //*******new
        FilterAppointedPatientData(Response.Data);

    }
}

function FilterAppointedPatientData(Data) {

    let DataLength = Data.length;
    console.log(Data)

    for (let Count = 0; Count < DataLength; Count++) {

        // let PaymentStatus = "<span style='background-color:Green; color:white; padding:5px; text-left'>Paid</span>";
        // let PaymentPaid = " <span style='background-color:green; color:white; padding:5px;'><i class='i-Yes'></i></span>";
        // let PaymentUnpaid = " <span style='background-color:red; color:white; padding:5px;'><i class='i-Close'></i></span>";

        let PaymentStatus = Data[Count].Status;
        // console.log('PaymentStatus:', Data[Count].Id, PaymentStatus);

        // switch (Data[Count].Status) {
        //     case 2:
        //         PaymentStatus = "<span style='background-color:Green; color:white; padding:5px; text-left'>Paid</span>";
        //         break;
        //     case 3:
        //         PaymentStatus = "<span style='background-color:Red; color:white; padding:5px;'>Pending</span>";
        //         break;
        // }

        // if (Count % 2 === 0) {
        //     PaymentStatus = 5;
        // }

        let PaymentTypeIcon = '';
        let PaidButton = '<span class="btn" style="background-color:Green; color:white; cursor: default; padding:2px; text-left">Paid</span>';

        if (PaymentStatus === 1) {
            PaymentTypeIcon = `<img src="dist-assets/images/Nurse/card.png" alt="Payment Status Image" style="max-height: 25px;"> ${PaidButton}`;

        } else if (PaymentStatus === 10) {
            PaymentTypeIcon = `<img src="dist-assets/images/Nurse/cash.png" alt="Payment Status Image" style="max-height: 25px;"> ${PaidButton}`;

        } else if (PaymentStatus === 6) {
            PaymentTypeIcon = `<img src="dist-assets/images/Nurse/coupon.png" alt="Payment Status Image" style="max-height: 25px;"> ${PaidButton}`;
        }

        let PaymentTypeEditButton = '<button class="btn btn-danger btn-icon custom-btn" type="button" onclick="AppointmentDetailsEdit(' + Data[Count].Id + ',' + Data[Count].Number + ',' + Data[Count].SessionId + ',' + Data[Count].PatientId + ',1,' + Data[Count].Status + ',' + Data[Count].DoctorId + ')">' + 'Unpaid' + '</button>'

        let IsPaid = false;
        let PaymentStatusColumn = '';
        if (PaymentStatus === 1 || PaymentStatus === 6 || PaymentStatus === 10) {
            IsPaid = true;
            PaymentStatusColumn = PaymentTypeIcon;
        } else if (PaymentStatus === 9 || PaymentStatus === 5) {
            PaymentStatusColumn = PaymentTypeIcon + PaymentTypeEditButton;
        }

        let ChannelingStatusEditButton = '<button class="btn btn-info btn-icon custom-btn" type="button"' +
            ' onclick="AppointmentChannelingStatusEdit(' + Data[Count].Id + ',' + Data[Count].Number + ',' + Data[Count].SessionId + ',' + Data[Count].PatientId + ')">' + '<span class="ul-btn__icon">' +
            '<i style="margin-left: -5;" class="i-Pen-2"></i></span>' + '</button>';

        const ChannelingStatusOriginal = Data[Count].ChannelingStatus != null ? Data[Count].ChannelingStatus.toLowerCase() : '-';
        let ChannelingStatus = '-';

        let isDisable = '';
        if (IsPaid) {
            isDisable = '';
            if (ChannelingStatusOriginal.includes('refund')) {
                ChannelingStatus = 'Refund';
            } else if (ChannelingStatusOriginal.includes('rescheduling')) {
                ChannelingStatus = 'Rescheduled';
            } else if (ChannelingStatusOriginal.includes('successful')) {
                ChannelingStatus = 'Successful';
            } else if (ChannelingStatusOriginal.includes('pending')) {
                ChannelingStatus = 'Pending';
            } else if (ChannelingStatusOriginal.includes('show')) {
                ChannelingStatus = 'No Show';
            } else if(ChannelingStatusOriginal.includes('cancelled')){
                isDisable = 'disabled';
                ChannelingStatus = 'Cancelled';
            }
        } else {
            isDisable = '';
            if (ChannelingStatusOriginal.includes('successful')) {
                ChannelingStatus = 'Successful';
            } else if (ChannelingStatusOriginal.includes('pending')) {
                ChannelingStatus = 'Pending';
            } else if (ChannelingStatusOriginal.includes('show')) {
                ChannelingStatus = 'No Show';
            } else if (ChannelingStatusOriginal.includes('refund')) {
                ChannelingStatus = 'Refunded';
            } else if (ChannelingStatusOriginal.includes('rescheduling')) {
                ChannelingStatus = 'Rescheduled';
            } else if(ChannelingStatusOriginal.includes('cancelled')){
                isDisable = 'disabled';
                ChannelingStatus = 'Cancelled';
            }
        }

        // console.log(ChannelingStatusOriginal, ChannelingStatus);

        const GenderOriginal = Data[Count].Gender != null ? Data[Count].Gender.toLowerCase() : '-';
        let Gender = '-';

        if (GenderOriginal === 'female') {
            Gender = 'F';

        } else if (GenderOriginal === 'male') {
            Gender = 'M';
        }

        console.log(Data);

            const propName = Data[Count]?.DoctorName + Data[Count]?.TimeStart;
            if (!groupedData[propName]) {
                groupedData[propName] = [{...Data[Count], Gender, ChannelingStatus, IsPaid,PaymentTypeIcon}];
            }else{
                groupedData[propName].push({...Data[Count], Gender, ChannelingStatus, IsPaid,PaymentTypeIcon});
            }

        console.log(groupedData); //TODO: show data

    }
    _ArrayAppointedPatientData = [];

    Object.keys(groupedData).forEach((propName, index) => {
        const timeStart = groupedData[propName]?.[0]?.TimeStart
        let StartingDateTime = new Date(timeStart).toISOString().split('T')[0] + "@";
        let TimeStartSplit = timeStart.split("T")[1].split(":");
        let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
        StartingDateTime += new Date(TimeFormat.DateFormat + TimeStart + "Z").toLocaleTimeString(Language.SelectLanguage, {
            timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
        });
        _ArrayAppointedPatientData.push({
            "A#": isNull(index + 1),
            "Doctor": isNull(groupedData[propName]?.[0]?.DoctorName),
            "Session Start": isNull(StartingDateTime),
            "No of Appointments": isNull(groupedData[propName]?.length),
            "Action": `<button class='btn btn-outline-primary p-1' style='font-size: 0.7rem' onclick="ShowPatientsModal('${propName}')">View Patients</button>`
        });

    });
    LoadAppointmentedPatientList();

}

function handleOnChangeDoctorSearch(){
    const doctorsAndSessions = [..._DoctorsAndSessionsWithoutFiltering]
    const keyword = document.getElementById('doctor-search-text').value;
    _DoctorsAndSessions = doctorsAndSessions.filter(doctorAndSession => (doctorAndSession.doctor.Title + doctorAndSession.doctor.FirstName + doctorAndSession.doctor.LastName).toLowerCase().includes(keyword.toLowerCase()));

    let tableData = _DoctorsAndSessions.map((doctor, index) => {
        let StartingDateTime = "No sessions";
        if(doctor?.sessions?.length > 0){
            const timeStart = doctor.sessions[0]?.TimeStart
            StartingDateTime = new Date(timeStart).toISOString().split('T')[0] + " @ ";
            let TimeStartSplit = timeStart.split("T")[1].split(":");
            let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
            StartingDateTime += new Date(TimeFormat.DateFormat + TimeStart + "Z").toLocaleTimeString(Language.SelectLanguage, {
                timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric'
            });
        }

        return {
            "No": index + 1,
            "DoctorName":doctor.doctor.FirstName + " " + doctor.doctor.LastName,
            "NearestSession":StartingDateTime,
            "NoOfSessions":doctor?.sessions?.length > 0 ? doctor.sessions.length : "N/A",
            "Actions":`
                    <button class='btn btn-outline-primary btn-sm p-1 ' ${doctor?.sessions?.length > 0 ? '' : "disabled"} style='font-size: 0.7rem' onclick='showViewMoreSessionsModal(${index})'>View Sessions</button>
                    <button class='btn btn-outline-primary btn-sm p-1 ml-2' ${doctor?.sessions?.length > 0 ? '' : "disabled"} style='font-size: 0.7rem' onclick='showNearestDoctorSession(${index})'>Appointment</button>
                    <button class='btn btn-outline-primary btn-sm p-1 ml-2' style='font-size: 0.7rem' onclick='CmdAddSession_Click(${doctor.doctor.Id})'>Add Session</button>`
        }
    });

    new DoctorAndSessionsTable().Render('DivDoctorsAndSessionTable', tableData);
    CreateDataTable('TableDoctorAndSessions');
    document.getElementById('doctor-count').innerHTML = `${_DoctorsAndSessions.length} Total doctors`;

}

function GetAllPatientAppointmentsList(SearchType) {
    // console.log('GetAllPatientAppointmentsList.SearchType:', SearchType);
    $('#loading').modal('show');
    _ArrayAppointedPatientData = [];

    // _Request.Post(ServiceMethods.GetAppoinment, new AppointmentList(undefined, undefined, undefined, undefined), GetAllPatientAppointmentsList_Success);

    const GetCurrentDate = new Date();
    const GetTodayDate = GetCurrentDate.getFullYear() + '-' + (GetCurrentDate.getMonth() + 1).toString().padStart(2, "0") + '-' + GetCurrentDate.getDate().toString().padStart(2, "0");
    const AppointmentDate = $('#TxtAppointmentSearchDate').val();
    const DoctorId = $('#DrpAppoinmentDoctor option:selected').val();
    if (SearchType === 'sessions') {
        _Request.Post(ServiceMethods.GetAppoinment, new AppointmentListAllSessions(undefined, _UserId, 999999, _SessionId, AppointmentDate, DoctorId), GetDoctorAppoinmentList_Success);
    } else if (SearchType === 'search') {
        _Request.Post(ServiceMethods.SessionGetByDate, new AllAppointmentsForToday(_UserId, AppointmentDate), GetAllPatientAppointmentsForTodayList_Success);
    } else if (SearchType === 'all') {
        _Request.Post(ServiceMethods.SessionGetByDate, new AllAppointmentsForToday(_UserId, GetTodayDate), GetAllPatientAppointmentsForTodayList_Success);
    }
}

async function GetAllPatientAppointmentsForTodayList_Success(Response) {
    console.log(Response);
    $('#AppointmentsSearchButton').prop('disabled', false);

    if (Response.Status !== 1000) {
        return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    } else {
        const AppointmentsForToday = Response.Data;
        // _ArrayAppointmentsForToday = [];
        _ArrayAppointedPatientData= []
        groupedData = {}

        const getAppointmentsResponses = await Promise.all(AppointmentsForToday.map(appointment => PostAsyncV2({
            serviceUrl: ServiceMethods.GetAppoinment,
            requestBody: new AppointmentList(undefined, undefined, undefined, appointment.Id)
        })));
        $('#loading').modal('hide');
        getAppointmentsResponses.forEach((response, ) => {
            _ArrayAppointmentsForToday = [..._ArrayAppointmentsForToday , ...response?.Data];
            FilterAppointedPatientData(response?.Data);
        });
    }
}

function GetAllPatientAppointmentsList_Success(Response) {
    if (Response.Status !== 1000) return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!"); else {
        _AppointmentDetails = Response.Data;
        // FilterAppointedPatientData(Response.Data);
        // LoadAppointmentedPatientList();
    }
}

function LoadVitals(Id) {
    _PatientId = Id;
    _AppointmentUser = _AppointmentDetails.filter(PId => PId.PatientId === GetPatientOriginalId(Id))[0];

    _Request.Get(ServiceMethods.GetPatientData + Id, Id, LoadPatientDataForVitals_Success);

    new AddVitals().Render(Containers.MainContent);
}

async function AppointmentDetailsEdit(AppointmentId, AppointmentNumber, SessionId, PatientId, ViewType,Status, DoctorId, propName='') {
    // console.log('AppointmentDetailsEdit.ViewType', ViewType);
    _AppointmentSelected = {};
    selectedRowSessionId = SessionId;
    selectedRowAppointmentId = AppointmentId;
    selectedRowPatientId = PatientId;
    selectedRowStatus = Status;
    let doctor = {};
    //get doctor to fetch the fees
    try{
        const response = await GetAsync({
                serviceMethod: ServiceMethods.DoctorGet,
                params: `/${DoctorId}`,
            }
        );

        doctor = response?.Data;
        doctor.fees = JSON.parse(doctor?.ZoomEmail);
        console.log(doctor);
    }catch(e){
        console.log(e)
    }

    new AppointmentDetailsEditModal().Render(Containers.Footer, AppointmentId, ViewType, AppointmentNumber,doctor,propName);
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

function AppointmentChannelingStatusEdit(AppointmentId) {
    // console.log('AppointmentChannelingStatusEdit.AppointmentId', AppointmentId);
    new AppointmentChannelingStatusEditModal().Render(Containers.Footer, AppointmentId);
}

function AppointmentChannelingStatusUpdate(AppointmentId, AppointmentNumber, SessionId, PatientId) {
    // console.log('AppointmentChannelingStatusUpdate:', AppointmentId, AppointmentNumber, SessionId, PatientId);
    _Request.Post(ServiceMethods.ChanalingStatusSave, new ChannelingStatus(AppointmentId, SessionId, PatientId, "NA", $('#TxtChannelingStatus').val(), 0), AppointmentChannelingStatusUpdate_success);
}

function AppointmentChannelingStatusUpdate_success(Response) {
    if (Response.Status === 1000) {
        $('#ModalForAppointmentChannelingStatusEdit').modal('hide');
        // AllBranchesOfTheInstituteGet();
        // _AddressId = 0;
        CmdAppoinments_Click('AppoinmentsCard');
        Appointments_Search();
        return ShowMessage("Channeling Status Updated!", MessageTypes.Success, "Success!");
    } else {
        return ShowMessage(Response.Message.split('-')[1].trim(), MessageTypes.Warning, "Warning!");
    }
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

async function MedicalBillDisplay(AppointmentId, appId, doctorId) {
    // console.log(appId)
    selectedAppId = appId;
    selectedAppointmentId = AppointmentId;
    const PatientMatched = _ArrayAppointmentsForToday.filter((Patient) => Patient.Id === AppointmentId)[0];

    var allData = new Bill(undefined, selectedSessionId, selectedDoctorId, selectedPatientId, undefined, undefined, selectedAppId, undefined, AppointmentId);

    let doctor = {};
    try{
        const response = await GetAsync({
                serviceMethod: ServiceMethods.DoctorGet,
                params: `/${doctorId}`,
            }
        );

        doctor = response?.Data;
        doctor.fees = JSON.parse(doctor?.ZoomEmail);
        _MedicalBillDoctor = doctor;
    }catch(e){
        console.log(e)
    }

    _Request.Post(ServiceMethods.BillGet, allData, async function (res) {
        // console.log(res);
        if (res.Data) {
            billId = res.Data.Id;
            //pass data to ui
            medicalBillTableSavedResponseAppend(res);
        } else {
            billId = 0;

            MedicalBillData = [
                {
                    itemName: 'Doctor charges',
                    feeType: FeeTypes.DoctorFee,
                    feeAmount: parseFloat(doctor?.fees?.DoctorFee + doctor?.fees?.HospitalFee + doctor?.fees?.OtherFee).toFixed(2),
                    disabled: true,
                    saved: true,
                    hasChanges: false
                },
                {
                    itemName: 'Service charges',
                    feeType: FeeTypes.BookingFee,
                    feeAmount: '250',
                    disabled: true,
                    saved: true,
                    hasChanges: false
                }
            ]
            RerenderMedicalBillTable();
            medicalBillTableTotalSumGet();
        }
    });

    new MedicalBill(PatientMatched, appId).Render(Containers.Footer);

}

function medicalBillTableFirstRowReplace() {
    // $("#TblPatientInvoiceBody").html('');
    // $("#TblPatientInvoiceBody").append(_MedicaBillTableRowBuilder({
    //     itemName: 'Doctor charges',
    //     feeType: FeeTypes.DoctorFee,
    //     feeAmount: '500',
    //     disabled: true
    // }));
    // $("#TblPatientInvoiceBody").append(_MedicaBillTableRowBuilder({
    //     itemName: 'Service charges',
    //     feeType: FeeTypes.HospitalFee,
    //     feeAmount: '250',
    //     disabled: true
    // }));
    // $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
    // medicalBillTableRowCountReset();
    // medicalBillTableButtonsReset();
}

function addNewFee() {
    MedicalBillData.push({
        itemName: "",
        feeType: "",
        feeAmount: "",
        disabled: false,
        saved:false,
        hasChanges:false
    });
    RerenderMedicalBillTable();
    medicalBillTableTotalSumGet();
}

function discardFeeChanges(index){
   //remove element at index from array
    MedicalBillData.splice(index,1);
    RerenderMedicalBillTable();
}

function deleteFee(index){
    MedicalBillData.splice(index,1);
    RerenderMedicalBillTable();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
}

function editFee(index){
    MedicalBillData[index].saved = false;
    MedicalBillData[index].hasChanges = true;
    RerenderMedicalBillTable();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
}

function discardChanges(index){
    MedicalBillData[index].saved = true;
    MedicalBillData[index].hasChanges = false;
    RerenderMedicalBillTable();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
}

function saveChanges(index){
    const itemName = $('#TxtItem'+index).val();
    const feeType = $('#TxtFeeType'+index).val();
    let feeAmount = $('#TxtFeeAmount'+index).val();
    if(itemName === '' || feeType === '' || feeAmount === ''){
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }
    feeAmount = parseFloat(feeAmount);

    if(isNaN(feeAmount) || feeAmount < 0){
        return ShowMessage(Messages.InvalidAmount, MessageTypes.Warning, "Warning!");
    }
    MedicalBillData[index].itemName = itemName;
    MedicalBillData[index].feeType = feeType;
    MedicalBillData[index].feeAmount = feeAmount;
    MedicalBillData[index].saved = true;
    MedicalBillData[index].hasChanges = false;
    RerenderMedicalBillTable();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
}

function  saveFeeToList(index){
    const itemName = $('#TxtItem'+index).val();
    const feeType = $('#TxtFeeType'+index).val();
    let feeAmount = $('#TxtFeeAmount'+index).val();

    if(itemName === '' || feeType === '' || feeAmount === ''){
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }

    feeAmount = parseFloat(feeAmount);

    if(isNaN(feeAmount) || feeAmount < 0){
        return ShowMessage(Messages.InvalidAmount, MessageTypes.Warning, "Warning!");
    }

    MedicalBillData[index].saved = true;
    MedicalBillData[index].hasChanges = false;
    RerenderMedicalBillTable();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
}

function handleBillTextItemChange(index) {
    const content = $('#TxtItem'+index).val();
    console.log(content, index);
    MedicalBillData[index].itemName = content;

}

function handleBillFeeTypeChange(index) {
    const content = $('#TxtFeeType'+index).val();
    MedicalBillData[index].feeType = content;
}

function handleBillFeeAmountChange(index) {
    const content = $('#TxtFeeAmount'+index).val();
    MedicalBillData[index].feeAmount = content;
}



function medicalBillTableRowAdd() {
    if (medicalBillInputsAreAllValid()) {
        $("#TblPatientInvoiceBody").append(_MedicalBillTableRow);
        medicalBillTableRowCountReset();
        medicalBillTableTotalSumGet();
        medicalBillTableButtonsReset();
    } else {
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    }
}

function medicalBillInputsAreAllValid() {
   let isAllValid = true;
    MedicalBillData.forEach((item) => {
        const feeAmount = parseInt(item.feeAmount);
        if (item.itemName === "" || item.feeType === "" || item.feeAmount === "" || isNaN(feeAmount)) {
            isAllValid = false;
        }
    });
    return isAllValid;
}

function medicalBillTableAllRowsRemove() {
    MedicalBillData = [
        {
            itemName: 'Doctor charges',
            feeType: FeeTypes.DoctorFee,
            feeAmount: parseFloat(_MedicalBillDoctor?.fees?.DoctorFee + _MedicalBillDoctor?.fees?.HospitalFee + _MedicalBillDoctor?.fees?.OtherFee).toFixed(2),
            disabled: true,
            saved: true,
            hasChanges: false
        },
        {
            itemName: 'Service charges',
            feeType: FeeTypes.BookingFee,
            feeAmount: '250',
            disabled: true,
            saved: true,
            hasChanges: false
        }
    ]
    RerenderMedicalBillTable();
    medicalBillTableTotalSumGet();
}

function medicalBillTableRowDelete(TableRowElement) {
    $(TableRowElement).closest('tr').remove();
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
    medicalBillTableButtonsReset();
}

function medicalBillTableTotalSumGet() {
    let Sum = 0;
    MedicalBillData.forEach((item) => {
        const feeAmount = parseInt(item.feeAmount);
        if(!isNaN(feeAmount)){
            Sum += feeAmount;
        }
    });
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
        for (let i = 2; i < Columns.length; i++) {
            Column = Columns[i];
            if (i === Columns.length - 1) {
                $(Column).html(_MedicalBillTableButtonAddRow + _MedicalBillTableButtonDelete);
            } else {
                $(Column).html(_MedicalBillTableButtonDelete);
            }
        }
        if(Columns.length === 2){
            $(Columns[1]).html(_MedicalBillTableButtonAddRow);
        }else{
            $(Columns[1]).html('');
        }
    }
}

function medicalBillSave(PatientId, appId) {
    // console.log('medicalBillSave.PatientId:', PatientId);
    const PatientMatched = _ArrayAppointmentsForToday.filter((Patient) => Patient.Id === PatientId)[0];
    let MedicalBillItems = [];
    let hasUnsavedChanges = false;
    MedicalBillData.forEach((item) => {
        if (!item.saved) {
            hasUnsavedChanges = true;
        }
    });

    if(hasUnsavedChanges){
        return ShowMessage(Messages.UnsavedChanges, MessageTypes.Warning, "Warning!");
    }

    if (!medicalBillInputsAreAllValid()) {
        //failed
        return ShowMessage(Messages.EmptyFields, MessageTypes.Warning, "Warning!");
    } else {
        MedicalBillItems = MedicalBillData.map((item) => {
            return {
                Item: item.itemName,
                FeeType: item.feeType,
                FeeAmount: item.feeAmount,
            }
        });
    }

    let date = new Date();
    let month = parseInt(date.getMonth()) + 1;
    const DateTime = date.getFullYear() + '-' + ("0" + month).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) + ' ' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);

    const PatientsAge = parseInt(date.getFullYear().toString()) - parseInt(PatientMatched.DateOfBirth.split('-')[0]);

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
        'Patient': Patient, 'Bill': MedicalBill, 'UserId': _UserId,
    }

    SaveBillData(JsonObjectToSave);
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

function RerenderMedicalBillTable(){
    $('#TblPatientInvoiceBody').html('');
    for (let index = 0; index < MedicalBillData.length; index++) {
        const rowData = MedicalBillData[index];
        if(rowData.disabled){
            $("#TblPatientInvoiceBody").append(_MedicaBillTableReadOnlyRowBuilder({
                itemName: rowData.itemName,
                feeType: rowData.feeType,
                feeAmount: rowData.feeAmount,
            }));
        }else{
            $("#TblPatientInvoiceBody").append(_MedicaBillTableRowBuilder({index, ...rowData}));
        }
    }
    medicalBillTableRowCountReset();
    medicalBillTableTotalSumGet();
}

function medicalBillTableSavedResponseAppend(Response) {

    const data = Response.Data?.BillData;
    console.log(Response.Data);
    MedicalBillData = [];

    //just renders the received data. must contain the hospital charges and doctor charges
    for (let i = 0; i < data.length; i++) {
        let billItem = data[i];
        let isDisabled = billItem.ItemName === 'Doctor charges' || billItem.ItemName === 'Service charges';
        MedicalBillData.push({
            itemName: billItem.ItemName,
            feeType: billItem.FeeType,
            feeAmount: billItem.Amount,
            disabled: isDisabled,
            saved: true,
            hasChanges: false,
        });
    }
    $("#TxtDiscount").val(Response.Data.Discount);
    $("#TxtTotal").text(Response.Data.Total);
    RerenderMedicalBillTable();
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
    if(_ViewedDoctorSessionName !== ""){
        ShowPatientsModal(_ViewedDoctorSessionName);
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
    //invoke a flag to modify the '_UserId' value in 'InitRequestHandler()'
    _IsAdminUserIdRequired = true;
    //rerun
    InitRequestHandler();

    _ArrayPrescriptionSearchResultsData = [];

    _Request.Post(ServiceMethods.GetPrescriptionRecord, new GetPrescriptionRecord($('#TxtPrescriptionsSearchDate').val() + " 00:00:00", // '2023-04-16',
        $('#TxtPrescriptionsSearchDate').val() + " 23:59:59", parseInt($('#TxtPrescriptionsSearchDoctor').val()), null), GetPrescriptionList_Success);
}

function GetPrescriptionList_Success(Response) {
    if ($('#PrescriptionsSearchButton').prop('disabled', true)) {
        $('#PrescriptionsSearchButton').prop('disabled', false);
    }

    //reset flag
    _IsAdminUserIdRequired = false;
    //reset
    InitRequestHandler();

    if (Response.Status != 1000) {
        return ShowMessage(Response.Message, MessageTypes.Warning, "Warning!");
    } else {
        FilterPrescriptionData(Response.Data);
    }
}

function FilterPrescriptionData(Data) {
    _ArrayPrescriptionSearchResultsData = Data;
    let ArrayPrescriptionData = [];

    for (Count = 0; Count < Data.length; Count++) {
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
            // "No": Count + 1,
            // "Prescription Id": Data[Count].PrescriptionId,
            // "Name": Data[Count].PatientFullName,
            // "Health Id": Data[Count].HealthId !== null ? Data[Count].HealthId : '-',
            // "Status": '<button class="btn btn-info btn-icon mr-2">' + Status + '</button>' +
            //     '<button class="btn btn-primary btn-icon mr-2" onclick= "LoadPrescriptionRecordDrugs(' + Data[Count].Id + ')">View</button>' +
            //     '<button class="btn btn-info btn-icon mr-2" onclick= "LoadContactData(' + Data[Count].Id + ')">Contact</button>' +
            //     '<button class="btn btn-info btn-icon mr-2" onclick= "UpdateIssueStatus(' + Data[Count].Id + ')">' + NextStatus + '</button>' +
            //     '<button class="btn btn-info btn-icon" onclick= "ClinicMedicalBillPrint(' + Data[Count].Id + ')">Print</button>'
            "No": Count + 1,
            "Patient": Data[Count].PatientFullName,
            "Age": Data[Count].AgeYears + 'y ' + Data[Count].AgeMonths + 'm',
            "Mobile": Data[Count].Mobile,
            "Actions": '<button class="btn btn-primary btn-icon mr-2" onclick= "PrescriptionView(' + Data[Count].Id + ')">View</button>'
        });
    }

    new PharmacySearchResultsTable().Render('PrescriptionsSearchResultsTableWrapper', ArrayPrescriptionData);
    CreateDataTable('TablePharmacySearchResults');
}

function GetDoctorSessionDataForPharmacy() {
    const DoctorId = document.getElementById('TxtPrescriptionsSearchDoctor').value;
    const AppointmentSearchDate = $('#TxtPrescriptionsSearchDate').val();
    _Request.Post(ServiceMethods.SessionGetByDate, new GetSessions(DoctorId, AppointmentSearchDate, null), GetDoctorSessionDataForPharmacy_Success);
}

function GetDoctorSessionDataForPharmacy_Success(Response) {
    const SessionDropdown = $("#TxtPrescriptionsSearchSession");
    $(SessionDropdown).empty();

    if (Response.Status != 1000) {
        $(SessionDropdown).append('<option value="all">All Sessions</option>');
    } else {
        let DataLength = Response.Data.length;
        let Count = 0;
        let Type;
        if (DataLength === 0) {
            $(SessionDropdown).append('<option value="all">All Sessions</option>');
        } else {
            $(SessionDropdown).append('<option value="all">All Sessions</option>');
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

                $(SessionDropdown).append('<option value="' + Response.Data[Count].Id + '">  Room No ' + Response.Data[Count].RoomNumber + " / " + SessionDate + " / " + StartTime + "-" + EndTime + " / " + Type + '</option>');
            }
        }
    }
}

function Prescriptions_Search() {
    $('#PrescriptionsSearchButton').prop('disabled', true);
    GetPrescriptionList();
}

function PrescriptionView(PrescriptionId) {
    const PrescriptionMatched = _ArrayPrescriptionSearchResultsData.filter((Prescription) => Prescription.Id === PrescriptionId)[0];
    // console.log('PrescriptionView.PrescriptionMatched:', PrescriptionMatched);
    // new PharmacyPrescriptionIframeModal().Render(Containers.Footer, PrescriptionId);

    // const IframeUrl = 'https://docnote.medica.lk/Prescription?Id=334322799953';
    const IframeUrl = 'https://docnote.medica.lk/Prescription?Id=' + PrescriptionId;
    const Iframe = '<iframe src="' + IframeUrl + '" title="Prescription" height="700px" class="w-100 border-0"></iframe>';
    // $('#PrescriptionIframeWrapper').append(Iframe);

    // //reset flag
    // _IsAdminUserIdRequired = false;
    // //reset
    // InitRequestHandler();

    window.open(IframeUrl);
}

/*=================================
		Clinic Bill Methods
 =================================*/

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
                "Action": '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="ClinicPrescriptionDisplay(' + Data[Count].Id + ')">' + '<span class="ul-btn__icon"><i class="i-Pen-2"></i></span>' + '</button>' + '<button class="btn btn-info btn-icon custom-btn mx-2" type="button" onclick="ClinicMedicalBillDisplay(' + Data[Count].Id + ')">' + '<span class="ul-btn__icon"><i class="i-Billing"></i></span>' + '</button>' + '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="ClinicReferenceLetterDisplay(' + Data[Count].Id + ')">' + '<span class="ul-btn__icon"><i class="i-Letter-Open"></i></span>' + '</button>'
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

    const TableData = [];

    if (Response.Data.length > 0) {
        let Branch = {};
        for (let Count = 0; Count < Response.Data.length; Count++) {
            Branch = Response.Data[Count];
            TableData.push({
                "Branch Name": Branch.Name,
                "Contact No": isEmpty(Branch.Postcode.split('|')[1]),
                "Address": Branch.AddressLine1,
                "Email": Branch.Email,
                "Action": '<button class="btn btn-info btn-icon custom-btn" type="button" onclick="BranchAddOrUpdateModalView(' + Branch.Id + ')">' + '<span class="ul-btn__icon"><i class="i-Newspaper-2"></i></span>' + '</button>'
            });
        }
    }

    new BranchesSearchResultsTable().Render('BranchesSearchResults', TableData);
    CreateDataTable('TableBranchesSearchResults');

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
    const BranchMatched = _ArrayAllBranchesOfTheInstituteResultsData.filter((Branch) => Branch.Id === BranchId)[0];
    // console.log('BranchAddOrUpdate.BranchMatched:', BranchMatched);
    const Numbers = [new ContactNumbers(BranchMatched !== undefined ? BranchMatched.Postcode.split('|')[2] : 0, ContactNo, 1)];
    // console.log('BranchAddOrUpdate.Numbers:', Numbers);
    const Status = 1;
    const UserSavedId = getCookie("UserId");
    const InstituteId = _NurseBranch.InstituteId;

    //validation
    if (Name === "") return ShowMessage('Invalid Branch Name!', MessageTypes.Warning, "Warning!");

    if (Email === "") return ShowMessage('Invalid Email!', MessageTypes.Warning, "Warning!");

    if (Address1 === "") return ShowMessage('Invalid Address!', MessageTypes.Warning, "Warning!");

    if (City === "") return ShowMessage('Invalid City!', MessageTypes.Warning, "Warning!");

    if (ContactNo === "") return ShowMessage(Messages.InvalidMobileNumber, MessageTypes.Warning, "Warning!");

    if (ValidateMobile(ContactNo) === false && ContactNo !== "") return ShowMessage(Messages.InvalidMobileNumber, MessageTypes.Warning, "Warning!");

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
        return ShowMessage(Response.Message.split('-')[1].trim(), MessageTypes.Warning, "Warning!");
    }
}

function BranchWardAdd(BranchId) {

}

//doctor

function EditPassword() {
    $('#TxtDoctorConfirm_Password').show();
    $('#LblDoctorConfirm_Password').show();
    $('#TxtDoctorUser_Name').prop('disabled', false);
    $('#TxtDoctorPassword').prop('disabled', false);
}

function  SearchDoctor(){
    _DoctorSearchKeyword = $('#TxtDoctor_Search').val();
    _DoctorSearchBy = $('#Doctor_SearchBy').val();
    let filteredDoctors = []
    if(_DoctorSearchKeyword !== "" && _DoctorSearchKeyword !== undefined){
        filteredDoctors = ArrayDoctorSearchResultsData.filter(doctor=>doctor[_DoctorSearchBy].toString().toLowerCase().includes(_DoctorSearchKeyword.toLowerCase()))
        setDoctorsTable(filteredDoctors);
    }else{
        setDoctorsTable(ArrayDoctorSearchResultsData);
    }
}

function setDoctorsTable(Data){
    let Headers = ["Doctor Name", "Email", "NIC", "Registration Number", "Action"];
    const tableContainer = document.getElementById("DoctorsTableContainer");
    tableContainer.innerHTML = '';
    tableContainer.appendChild(new TableView("TableDoctorsSearchResults", "table table-striped", Headers, Data, undefined));
    if(Data.length === 0){
        $('#TableDoctorsSearchResults').append('<tr><td colspan="5" class="text-center">No Data Found</td></tr>')
    }
    CreateDataTable('TableDoctorsSearchResults');
}


//report

function DownloadReport() {

    let branch = $('#DrpBranch').val();
    let doctor = $('#DrpDoctor').val();
    let FromDate = $('#TxtReportFrom_Date').val() + " 00:00:00";
    let ToDate = $('#TxtReportTo_Date').val() + " 23:59:59";

    _Request.Post("Appointment/Report", new AppointmentReport(FromDate, ToDate, doctor, branch, _UserIdAdmin), function (res) {

        let ttlDoctor = 0;
        let ttlHospital = 0;
        let ttlOther = 0;
        let ttlBookingFee = 0;
        let ttlTotalDiscount = 0;
        var csv_data = [];
        csv_data.push(['#', 'Doctor Name', 'Session Date & Time', 'Appointment No', 'Patient Name', 'Patient Mobile', 'Booking Type', 'Payment Status','Appointment Status', 'Hospital Charge', 'Doctor Charge', 'Booking Charge', 'Other Charges', 'Discount Amount'])
        let filteredData = res.Data;
        let filtering = $('#DrpReportAppointmentStatus').val();
        if(filtering !== "" && filtering !== "All Appointments"){
            filteredData = filteredData.filter(appointment=>appointment.ChannelingStatus === filtering);
        }
        for (var i = 0; i < filteredData.length; i++) {
            let data = filteredData[i];

            let hospital = data.HospitalFee == null ? 0 : data.HospitalFee;
            let DoctorFee = data.DoctorFee == null ? 0 : data.DoctorFee;
            let AllOtherFee = data.AllOtherFee == null ? 0 : data.AllOtherFee;
            let BookingFee = data.BookingFee == null ? 0 : data.BookingFee;
            let TotalDiscount = data.TotalDiscount == null ? 0 : data.TotalDiscount;
            ttlOther += parseInt(AllOtherFee);
            ttlHospital += parseInt(hospital);
            ttlDoctor += parseInt(DoctorFee);
            ttlBookingFee += parseInt(BookingFee);
            ttlTotalDiscount += parseInt(TotalDiscount);
            let bookingType = data.Type === 'offline' ? "Reception" : data.Type;
            var d = [i, data.DoctorName, data.TimeStart.replace("T", " ") + ' ' + data.TimeEnd.replace("T", " "), data.Number, data.FirstName + " " + data.LastName, data.Mobile, bookingType, 'PAID',data.ChannelingStatus, hospital, DoctorFee, BookingFee, AllOtherFee, TotalDiscount];
            console.log(d)
            csv_data.push(d);

        }
        // =SUM(I2:I4)
        var d = ["", "", "", "", "", "", "", '',"", ttlHospital, ttlDoctor, ttlBookingFee, ttlOther, ttlTotalDiscount];
        csv_data.push(d)

        // console.log(csv_data);
        // // Combine each row data with new line character
        // csv_data = csv_data.join('\n');

        // Call this function to download csv file
        createExcel(csv_data);
    });

}

function downloadCSVFile(csv_data) {

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

    const TodaysDate = new Date().toISOString().slice(0, 10);

    // Download csv file
    temp_link.download = "PrescriptionList-" + TodaysDate + ".csv";
    temp_link.href = window.URL.createObjectURL(CSVFile);

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    temp_link.click();
    document.body.removeChild(temp_link);
}

function createExcel(data) {

    const TodaysDate = new Date().toISOString().slice(0, 10);

    var workbook = XLSX.utils.book_new(), worksheet = XLSX.utils.aoa_to_sheet(data);
    workbook.SheetNames.push("First");
    workbook.Sheets["First"] = worksheet;

    XLSX.writeFile(workbook, "ReportList-" + TodaysDate + ".xlsx");

    var xlsblob = new Blob([new Uint8Array(XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    }))], {type: "application/octet-stream"});

    // Create to temporary link to initiate
    // download process
    var temp_link = document.createElement('a');


    // Download csv file
    temp_link.download = "ReportList-" + TodaysDate + ".xlsx";
    temp_link.href = window.URL.createObjectURL(xlsblob);

    // This link should not be displayed
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    // Automatically click the link to
    // trigger download
    // temp_link.click();
    document.body.removeChild(temp_link);

}
