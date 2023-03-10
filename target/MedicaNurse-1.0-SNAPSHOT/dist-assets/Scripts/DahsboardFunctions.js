var DietPlanType = "";
var BackButton = "";

var BackDiv;

// var BackButton = document.getElementById("BackButton");
var Prescription = document.getElementById("Prescription");
var MainNavigation = document.getElementById("MainNavigation");
var Reports = document.getElementById("Reports");
var History = document.getElementById("History");
var Allergies = document.getElementById("Allergies");

var QRcode = document.getElementById("QRcode");
var EditProfile = document.getElementById("EditProfile");

var ResetPassword = document.getElementById("ResetPassword");

var AddMembers = document.getElementById("AddMembers");

var AnalyticTemp = document.getElementById("AnalyticTemp");
var AnalyticPressure = document.getElementById("AnalyticPressure");
var AnalyticPulse = document.getElementById("AnalyticPulse");
var AnalyticBMI = document.getElementById("AnalyticBMI");

var PrescriptionDashboard = document.getElementById("PrescriptionDashboard");

var Reminder = document.getElementById("Reminder");
var AddReminder = document.getElementById("AddReminder");
var ReminderInside = document.getElementById("ReminderInside");

var DietPlan = document.getElementById("DietPlan");
var ChooseDietPlan = document.getElementById("ChooseDietPlan");
var DietPlanHeading = document.getElementById("DietPlanHeading");

var LongCorona = document.getElementById("LongCorona");


//testing only
var Button800 = document.getElementById("800Button");
var Button1600 = document.getElementById("1600Button");


var logo = document.getElementById("logo");


window.onload = function () {
    document.getElementById('HandleButton').click();
}

function HideAllDiv() {

    $('.PatientAppDiv').hide();
    document.getElementById("PatientAppLogo").style.display = "none";
    document.getElementById("PatientAppBackButton").style.display = "block";

    document.getElementById("PrescriptionCard").style.backgroundColor = '';
    document.getElementById("HistoryCard").style.backgroundColor = '';
    document.getElementById("ReportsCard").style.backgroundColor = '';
    document.getElementById("AllergiesCard").style.backgroundColor = '';
}

function ShowPrescription() {
    HideAllDiv();
    $(".PrescriptionDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowPrescriptionDashboard() {
    HideAllDiv();
    $(".PrescriptionDashboardDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowProfile() {
    HideAllDiv();
    $(".EditProfileDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowReminder() {
    HideAllDiv();
    $(".ReminderDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowAddReminder() {
    HideAllDiv();
    $(".AddReminderDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowInsideReminder() {
    HideAllDiv();
    $(".ReminderInsideDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowAddMembers() {
    HideAllDiv();
    $(".AddMembersDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowResetPassword() {
    HideAllDiv();
    $(".ResetPasswordDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowQRcode() {
    HideAllDiv();
    $(".QRcodeDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowAnalyticTemp() {
    HideAllDiv();
    $(".AnalyticTempDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowAnalyticPressure() {
    HideAllDiv();
    $(".AnalyticPressureDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowAnalyticPulse() {
    HideAllDiv();
    $(".AnalyticPulseDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowAnalyticBMI() {
    HideAllDiv();
    $(".AnalyticBMIDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowMainNavigation() {
    HideAllDiv();
    $(".MainNavigationDiv").show();
}

function ShowReports() {
    HideAllDiv();
    $(".ReportsDiv").show();
    BackButton = "MainNavigationDiv";
}

function ShowHistory() {
    HideAllDiv();
    $(".HistoryDiv").show();
    ShowHideHistoryButton();
    BackButton = "MainNavigationDiv";
}

function ShowAllergies() {
    HideAllDiv();
    $(".AllergiesDiv").show();
    ShowHideHistoryButton();
    BackButton = "MainNavigationDiv";
}


function ShowDietPlanMenu() {
    HideAllDiv();
    $(".ChooseDietPlanDiv").show();
    BackButton = "ChooseDietPlanDiv";
}

function SetDietPlanType(DietPlan) {
    DietPlanType = DietPlan;
    HideAllDiv();
    $(".DietPlanDiv").show();
    GetDietPlanData(DietPlanType);
}

function ShowDietPlan() {
    HideAllDiv();
    $(".DietPlanDiv").show();
    //BackButton = "ChooseDietPlanDiv";
    GetDietPlanData(DietPlanType);
}

function ShowLongCorona() {
    HideAllDiv();
    $(".LongCoronaDiv").show();
    BackButton = "LongCoronaDiv";

}

function ShowLongCoronaPhp() {
    HideAllDiv();
    $(".LongCoronaPhpDiv").show();
    document.getElementById("btLC").click();
   // BackButton = "LongCoronaDiv";

}

function ShowMentalHealth() {
    swal({
        imageUrl: 'dist-assets/images/Home/404.png',
        imageWidth: 200,
        imageHeight: 200,
        //  type: 'warning',
        // title: 'oops!',
        text: 'This Facility Is Not Available Yet',
        buttonsStyling: false,
        confirmButtonText: 'Ok',
        confirmButtonClass: 'btn btn-lg btn-warning'
    });
}

function ShowPhysicalHealth() {

    HideAllDiv();
    $(".PhysicalHealthDiv").show();


    // swal({
    //     imageUrl: 'dist-assets/images/Home/404.png',
    //     imageWidth: 200,
    //     imageHeight: 200,
    //     //  type: 'warning',
    //     //  title: 'oops!',
    //     text: 'This Facility Is Not Available Yet',
    //     buttonsStyling: false,
    //     confirmButtonText: 'Ok',
    //     confirmButtonClass: 'btn btn-lg btn-warning'
    // });
}

function ShowLifeStyleMedicine(){
    HideAllDiv();
    $(".LifeStyleMedicineDiv").show();
    BackButton = "LifeStyleMedicineDiv";
}
function ShowPersonalHealthReport(){
    HideAllDiv();
    $(".PersonalHealthRecordDiv").show();
    ShowHidePHRQuestions();
    BackButton = "LifeStyleMedicineDiv";
}

function ShowExercisePrescription(){
    HideAllDiv();
    $(".ExercisePrescriptionDiv").show();
}

function ShowVaccinePrescription(){
    HideAllDiv();
    $(".VaccinePhpDiv").show();
    document.getElementById("btVac").click();
}

function ShowMedicalCheckup(){
    HideAllDiv();
    $(".MedicalCheckupPhpDiv").show();
    document.getElementById("btChkp").click();
}

function ShowReportUploadImage() {

    HideAllDiv();
    $(".ReportUploadImageDiv").show();
}

function ShowReportUploadPDF() {
    HideAllDiv();
    $(".ReportUploadPDFDiv").show();
}

function ShowPrescriptionReportUploadImage() {
    HideAllDiv();
    $(".PrescriptionReportUploadImageDiv").show();
}

function ShowPrescriptionReportUploadPDF() {
    HideAllDiv();
    $(".PrescriptionReportUploadPDFDiv").show();
}

function ShowGoogleMap() {
    HideAllDiv();
    $(".FindDiv").show();
}


function RefreshPage() {
    location.reload();
    BackButton.style.display = "none";
}
function backfucntion(){
  // location.reload();
    HideAllDiv();
    $('.' +BackButton).show();

}
function salert(){
    alert("dsadsadsa");
}

function BackButtonFunction() {
    // HideAllDiv();
    // $("." + BackButton).show();

    location.reload();

    document.getElementById("PatientAppLogo").style.display = "block";
    document.getElementById("PatientAppBackButton").style.display = "none";


}

function ShowHideHistoryButton() {
    //History section
    let GynoObstetricsHistoryWidget = document.getElementById("GynoObstetricsHistoryWidget");
    let GynoObstetricsHistory = document.getElementById('GynoObstetricsHistory');

    let PatientDiseaseHistoryWidget = document.getElementById("PatientDiseaseHistoryWidget");
    let PatientDiseaseHistory = document.getElementById('PatientDiseaseHistory');

    let PastSurgicalHistoryWidget = document.getElementById("PastSurgicalHistoryWidget");
    let PastSurgicalHistory = document.getElementById('PastSurgicalHistory');

    let HistoryOtherDetailsWidget = document.getElementById("HistoryOtherDetailsWidget");
    let HistoryOtherDetails = document.getElementById('HistoryOtherDetails');

    //Allergies Section
    let FoodAllergiesWidget = document.getElementById("FoodAllergiesWidget");
    let FoodAllergies = document.getElementById('FoodAllergies');

    let DrugAllergiesWidget = document.getElementById("DrugAllergiesWidget");
    let DrugAllergies = document.getElementById('DrugAllergies');

    let AllergiesOtherDetailsWidget = document.getElementById("AllergiesOtherDetailsWidget");
    let AllergiesOtherDetails = document.getElementById('AllergiesOtherDetails');

    (GynoObstetricsHistory.checked) ? GynoObstetricsHistoryWidget.style.display = "none" : GynoObstetricsHistoryWidget.style.display = "block";
    (GynoObstetricsHistory.checked) ? document.getElementById("GynoText").innerText= "Hide" : document.getElementById("GynoText").innerText= "Show" ;

    (PatientDiseaseHistory.checked) ? PatientDiseaseHistoryWidget.style.display = "none" : PatientDiseaseHistoryWidget.style.display = "block";
    (PatientDiseaseHistory.checked) ? document.getElementById("DiseaseText").innerText= "Hide" : document.getElementById("DiseaseText").innerText= "Show" ;

    (PastSurgicalHistory.checked) ? PastSurgicalHistoryWidget.style.display = "none" : PastSurgicalHistoryWidget.style.display = "block";
    (PastSurgicalHistory.checked) ? document.getElementById("SurgicalText2").innerText= "Hide" : document.getElementById("SurgicalText2").innerText= "Show" ;

    (HistoryOtherDetails.checked) ? HistoryOtherDetailsWidget.style.display = "none" : HistoryOtherDetailsWidget.style.display = "block";
    (HistoryOtherDetails.checked) ? document.getElementById("HistoryOtherText").innerText= "Hide" : document.getElementById("HistoryOtherText").innerText= "Show" ;

    (FoodAllergies.checked) ? FoodAllergiesWidget.style.display = "none" : FoodAllergiesWidget.style.display = "block";
    (FoodAllergies.checked) ? document.getElementById("FoodAllergyText").innerText= "Hide" : document.getElementById("FoodAllergyText").innerText= "Show" ;

    (DrugAllergies.checked) ? DrugAllergiesWidget.style.display = "none" : DrugAllergiesWidget.style.display = "block";
    (DrugAllergies.checked) ? document.getElementById("DrugAllergyText").innerText= "Hide" : document.getElementById("DrugAllergyText").innerText= "Show" ;

    (AllergiesOtherDetails.checked) ? AllergiesOtherDetailsWidget.style.display = "none" : AllergiesOtherDetailsWidget.style.display = "block";
    (AllergiesOtherDetails.checked) ? document.getElementById("OtherDetailsText2").innerText= "Hide" : document.getElementById("OtherDetailsText2").innerText= "Show" ;


}


var Id;
var MobileNumber;
var UUID;
var Subscriber;
var SubscriptionDateTime;
var LongCorona1;
var DietPlan1;
var PhysicalHealth;
var MentalHealth;
var PlanType;
var SubscriptionPlanType;
var LifeStyleMedicine;

function CheckSubscriptionServices() {
    let MobileNumberCookie = getCookie("mobileNumber");
    //$.getJSON('http://localhost:8084/DietSrilanka_war_exploded/CheckSubscribe' + "?PhoneNumber=" + MobileNumberCookie, function (response) {
       $.getJSON('http://213.136.77.176:8080/DietSrilanka/CheckSubscribe' + "?PhoneNumber=" + MobileNumberCookie, function (response) {

        Id = response.Id;
        MobileNumber = response.Mobile_Number;
        UUID = response.UUID;
        Subscriber = response.Subscriber;
        SubscriptionDateTime = response.Subscription_Date_Time;
        LongCorona1 = response.Long_Corona;
        DietPlan1 = response.Diet_Plan;
        PhysicalHealth = response.Physical_Health;
        MentalHealth = response.Mental_Health;

       // MobileNumber = "0" + MobileNumber;
        if (MobileNumber === parseInt(MobileNumberCookie)) {


            if (LongCorona1 === 1) {

            } else {

            }

            if (DietPlan1 === 1) {
                ShowDietPlanMenu();
            } else {

                // swal({
                //     imageUrl: 'dist-assets/images/Home/subscribe.png',
                //     imageWidth: 200,
                //     imageHeight: 200,
                //     text: 'Sorry You Did Not Subscribe To This Service',
                //     buttonsStyling: false,
                //     confirmButtonText: 'OK',
                //     confirmButtonClass: 'btn btn-lg btn-warning'
                // });
                $('#exampleModalCenter').modal('show');
               // document.getElementById("dddd").click();
            }


            if (PhysicalHealth === 1) {

            } else {

            }
            if (MentalHealth === 1) {

            } else {

            }
            if (LifeStyleMedicine === 1) {

            } else {

            }


        } else {
            // swal({
            //     imageUrl: 'dist-assets/images/Home/subscribe.png',
            //     imageWidth: 200,
            //     imageHeight: 200,
            //     text: 'Sorry You Did Not Subscribe To This Service',
            //     buttonsStyling: false,
            //     confirmButtonText: 'OK',
            //     confirmButtonClass: 'btn btn-lg btn-warning'
            // });
            document.getElementById("dddd").click();

        }

    });


}

function clickbtn(){
    $('#exampleModalCenter').modal('hide');
    document.getElementById("eee").click();
}

function SubscriptionSuccess(){



    $('#exampleModalLong').modal('hide');

    swal({
        type: 'success',
        title: 'Congratulations!',
        text: 'Your Can Start Using The Service Now.',
        buttonsStyling: false,
        confirmButtonText: 'Close',
        confirmButtonClass: 'btn btn-lg btn-success'
    });




}

