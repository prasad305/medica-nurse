/*===========================
		Constants
===========================*/
const _GasEnabled = true;

const _LiveEnabled = true;

//LIVE
const _ServiceURL = _GasEnabled ? "https://clinic.medica.lk/API" : "http://api.medica.gq";

//TEST
// const _ServiceURL = _LiveEnabled ? "https://ayu-api.medica.lk" : "http://api.medica.gq";

//File Upload URL
/*const _FileUploadURL = "https://utilities.mobios.gq/Uploader";*/

//const _FileUploadURL = "http://api.medica.gq/";


const _Body = "Body";
const _Footer = "Footer";
const _IdHolder = "DivHolder";
const _UploadSizeMax = 5242880;// 1024 * 1024 * 5 =5MB

//Element Attributes
_AttributeOnBlur = "onblur";
_AttributeCursor = "cursor";
_AttributeHidden = "hidden";
_AttributeAreaLable = "aria-label";
_AttributeAutoComplete = "autocomplete";
_AttributeFullScreen = "data-fullscreen";

/*===========================
		Variables
===========================*/
var _HttpRequestMultiPartWithoutAsync;

var _Id;
var _UserId;
var _UserIdAdmin = "2";
var _Request;
var _PatientId;
var _PatientNIC;
var _PatientData;
var _PatientName;
var _LayoutCommon;
var _PatientMobile;
var _RequestUpload;

var _PaymentCheck = "LKR2000";

var _DoctorId;
var _SessionId;
var _UserBranchId
var _AppointmentId;
var _SessionDetails;
var _PatientDetails;
var _DoctorDropDown;
var _AppointmentUser;
var _AppointmentNumber;
var _AppointmentDetails;
var _AppointmentSessionId;
let StoredSessionId;
var _AppointmentPatientId;
var _AppointmentDoctorName;
var _AppointmentPatientName;
var _ApoointmentHeadingTitle;
var _UpdateSession=false;

var _ArrayDrugData = [];
var _DoctorSessionData = [];
var _BranchData = [];
var _ArrayPrescriptionData = [];
var _ArrayAppointedPatientData = [];
var _ArrayAppointedMentNumber = [];
let _ArrayClinicBillsSearchResultsData = [];
let _ArrayPatientSearchResultsData = [];
var _ArrayPrescriptionSearchResultsData = [];

let _ArrayAppointmentsForTodayCount = 0;
let _ArrayAppointmentsForToday = [];
let _ArrayAppointmentsLoaded = [];
let _AppointmentSelected = {};

var _NurseNIC;
var _NurseLastName;
var _NurseFirstName;
let _NurseLoggedIn = {};
let _NurseBranch = {};
let _NurseInstitute = {};
let _ArrayAllInstitutes = [];

let _IsSetAppointmentToDoctorClicked = false;
let _CardClicked = '';

let CmdCardClicked = '';

//-- Admin UI

let _ArrayAllBranchesOfTheInstituteResultsData = [];
let _IsAdminUserIdRequired = false;
let _AddressId = 0;

/*========================
     Enums
=========================*/
const ServiceMethods =
    {
        OTPSend: "OTP/Send",
        UserPost: "User/Post",
        DoctorGet: "Doctor/Get/",
        SavePatient: "Patient/Save",
        Login: "Authenticate/Login",
        GetPatient: "Patient/GetPatient",
        UserPatient: "UserPatient/Post",
        GetPatientData: "Patient/GET/",
        SaveSession: "Session/POST",
        NurseDoctor: "NurseDoctor/GET/",
        SessionGet: "Session/GET/",
        SessionsGet: "Session/GetSessions",
        SessionGetByDate: "Session/GetByDate",
        NextAppoinment: "Appointment/GetNext",
        GetAppoinment: "Appointment/GetAppointment",
        SaveAppoinmnet: "Appointment/Post",
        SaveAnalaytics: "MedicalAnalytic/Save",
        PatientReportUpload: "patientreport/uploads/",
        PatientReportSave: "PatientReport/Save",
        PrescriptionRecords: "PrescriptionRecord/GetPrescriptionByInstituteBranch",
        GetPrescriptionRecord: "PrescriptionRecord/GetPrescriptionRecord",
        DrugsPrescriptions: "PrescriptionRecord/PresciptionRcordDrugGet",
        ReadyPrescription: "AppointmentPrescriptionRecord/Update",
        InstituteBranch: "InstituteBranch/GetInstituteBranch",
        InstituteBranchPost: "InstituteBranch/POST",
        InstituteBranchGet: "InstituteBranch/Get",
        GetNurse: "Nurse/Get",
        PatientInformationSave: "PatientDiagnosisDocument/Post",
        GetInstitute: "Institute/GET",
        AddressPost: "Address/POST",
        ChanalingStatusSave: "DoctorChanalingStatus/Save",
        GetInstituteBranchDoctor: "DoctorBranch/GetInstituteBranchDoctor",
        BillSave:"Bill/Post",
        BillGet:"Bill/Get",
        SENDSMS: "/Schedule/Save",
    };

const MessageTypes =
    {
        Warning: "Warning",
        Success: "Success",
        Error: "Error",
        Info: "Info"
    };

const Messages =
    {
        LoginInvalid: "Invalid Username or Password!",
        InvalidMobileNumber: "Invalid Mobile Number!",
        SearchFieldValidate: "Please Add at Least One Field",
        UserSaveSuccess: "Patient Saved Successfully!",
        EmptyFields: "All Fields Must Be Filled!",
        SelectDrp: "Please select from dropdown",
        UserNotFound: "Sorry no Patient Found!",
        SessionSaveSuccess: "The Session Has Been Saved Successfully",
        NoSession: "No Session Found!",
        ApoointmentSaveSuccess: "The Appointment Has Been Saved Successfully!",
        InvalidDate: "Invalid Date!",
        ReportUploadSuccess: "Report Upload Success!",
        ReportUploadFailed: "Report Upload Failed!",
        ResetPassword: "Please call to reset password!",
        SelectDoctor: "Please Select a Doctor",
        NoMessage: "No New Message!",
        NoAuthorizedSearch: "Sorry. You are not authorized for this search",
        InvalidNIC: "Invalid NIC!",
        FileExceed: "Upload File Size is Exceed Please Check File Size",
        FileMaximumSize: "Fie size has been exceeded.maximum limit is 5 MB",
        InvalidFileType: "File format is Invalid only format that allowed Pdf,Jpg,Png",
        FileUploadSuccess: "File Uploaded SuccessFully",
        ConnectingError: "An error occured while communicating with the server",
        NofileChoosen: "No file chosen, yet.",
        FileUploadFailed: "Upload Information Failed",
        NoDataToDisplay: "No data to display",
        BranchSaveSuccess: "Branch Saved Successfully!"
    };

const Images =
    {
        Logo: "./images/medica_logo.png"
    };

const TimeFormat =
    {
        DateFormat: '1970-01-01T'
    }

const Language =
    {
        SelectLanguage: 'en-US'
    }

const Containers =
    {
        Header: "DivHeader",
        ButtonBar: "DivButtonBar",
        MainContent: "DivContentMain",
        AdContent: "DivContentAd",
        Footer: "Divfooter"
    };

/*========================
     Request Handler
=========================*/
var GlobalFail = function (Response) {
    if (Response.status === 401)
        location.reload();
    else
        alert("Global Fail : " + JSON.stringify(Response));
};




var ShowLoader = function () {
    if (_LayoutCommon !== undefined)
        _LayoutCommon.RenderLoader();
};

var HideLoader = function () {
    if (_LayoutCommon !== undefined)
        _LayoutCommon.DerenderLoader();
};

function InitRequestHandler() {
    if (_IsAdminUserIdRequired) {
        _UserId = 2;
    } else {
        _UserId = getCookie("UserId");
    }

    let Headers = new Array();

    if (_UserId !== undefined && _UserId !== null && _UserId !== "" && parseInt(_UserId) > 0)
        Headers.push(new HttpHeader("UserId", _UserId));

    if (_PatientId !== null && _PatientId !== undefined && _PatientId !== "")
        Headers.push(new HttpHeader("PatientId", _PatientId));

    _Request = GetRequest(_ServiceURL, Headers);

    //_Request = new Request(_ServiceURL, new Array(), GlobalFail);

    _HttpRequestMultiPartWithoutAsync = new HttpRequestMultiPartWithoutAsync(_ServiceURL, new Array(), GlobalFail);

    //Comman File Upload-Nurse

    _HttpRequestMultiPartWithoutAsync.Headers = _Request.Headers;

}

/*===========================
		Methods
===========================*/

function makeCustomHeader(userId){
    let Headers = [];
        Headers.push(new HttpHeader("UserId", userId));
    _Request = GetRequest(_ServiceURL, Headers);
}

function Wait(FnCondition, FncSuccess) {
    if (FnCondition())
        setTimeout(Wait, 100, FnCondition, FncSuccess);
    else if (FncSuccess !== undefined)
        FncSuccess();
}

function BindView(Container, View) {
    let Element = document.getElementById(Container);
    Element.innerHTML = "";
    Element.appendChild(View);
}

function ValidateFields(Selector) {
    let Fields = document.getElementsByClassName(Selector);
    let Counter = 0, Count = Fields.length;

    for (Counter; Counter < Count; Counter++)
        if (Fields[Counter].value === undefined || Fields[Counter].value === null || Fields[Counter].value === "" || Fields[Counter].value === " ")
            return false;

    return true;
}

/**
 *
 * @param {string} Message
 * @param {MessageTypes} Type
 * @param {string} Title
 */
function ShowMessage(Message, Type, Title) {
    let TypeText = Type.toLowerCase();

    swal(
        {
            type: TypeText,
            title: Title,
            text: Message,
            buttonsStyling: false,
            confirmButtonText: 'OK',
            confirmButtonClass: 'btn btn-lg btn-' + TypeText
        });

    switch (Type) {
        case MessageTypes.Info:
        case MessageTypes.Success:
            return true;

        default:
            return false;
    }
}

function ShowImagePopup(Url) {
    swal(
        {
            imageUrl: Url,
            imageWidth: 900,
            imageHeight: 500,
            confirmButtonText: 'Close',
            imageAlt: 'Custom image',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-primary'
        });
}

/*===========================
		Event Handlers
===========================*/
function Page_Load() {
    Wait(
        function () {
            return _GasBrowserId == null || _GasBrowserId == undefined;
        },
        function () {
            InitRequestHandler();
            _LayoutCommon = new LayoutCommon();
            _LayoutCommon.Render();
        });
}

/*=============================================================================================
		Nurse > Appointments > Table > Rows > 'Bill' Button > Dynamic Table > Constants
===============================================================================================*/

const _MedicalBillTableButtonDelete = '<button class="btn btn-danger btn-sm" onclick="medicalBillTableRowDelete(this)">Delete</button>';
const _MedicalBillTableButtonAddRow = '<button class="btn btn-success btn-sm mr-2" onclick="medicalBillTableRowAdd()"><i class="i-Add"></i></button>';

const _MedicalBillTableRow = '<tr class="TblRow">' +
    '<td>1</td>' +
    '<td> ' +
    '<input name="TxtItem" id="TxtItem" class="form-control form-control-sm" type="text"> ' +
    '</td> ' +
    '<td> ' +
    '<select class="form-control" name="TxtFeeType" id="TxtFeeType"> ' +
    '<option value="" selected>Select A Fee Type</option> ' +
    '<option value="Hospital Fee"> Hospital Fee</option> ' +
    '<option value="Doctor Fee">Doctor Fee</option> ' +
    '<option value="Investigation Fee">Investigation Fee</option> ' +
    '<option value="Booking Fee">Booking Fee</option> ' +
    '<option value="Other Fee">Other Fee</option>' +
    '</select> ' +
    '</td> ' +
    '<td> ' +
    '<input min="1" max="" name="TxtFeeAmount" id="TxtFeeAmount" class="form-control form-control-sm" type="number" onchange="medicalBillTableTotalSumGet()"> ' +
    '</td> ' +
    '<td class="ButtonHolderColumn d-flex justify-content-end"> ' +
    _MedicalBillTableButtonAddRow +
    '</td> ' +
    '</tr> ';
