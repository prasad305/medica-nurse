Array0101 = [];
Array0102 = [];
Array0103 = [];
Array0104 = [];
Array0105 = [];
Array0106 = [];
Answers = [];

// var uuid = getCookie("mobileNumber");

function SetPHRData() {

    var Array0102 = $('#PHR1').val();
    var Array0103 = $('#PHR2').val();
    var Array0104 = $('#PHR3').val();
    var Array0105 = $('#PHR4').val();
    var Array0106 = $('#PHR5').val();


    var Questions =
        {


            "0101": Array0101,
            "0102": Array0102,
            "0103": Array0103,
            "0104": Array0104,
            "0105": Array0105,
            "0106": Array0106

        }


    $.ajax({
        // url: 'http://localhost:8084/DietSrilanka_war_exploded/GetDataNew',
        url: 'http://localhost:8084/DietSrilanka_war_exploded/SetPersonalHealthRecords',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(Questions),
        processData: false,
        success: function (response, textStatus, jQxhr) {

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}


function GetPHRData() {

    $.ajax({
        // url: 'http://localhost:8084/DietSrilanka_war_exploded/GetDataNew',
        url: 'http://localhost:8084/DietSrilanka_war_exploded/GetPersonalHealthRecords',
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json',
        data: JSON.stringify({"UUID": "1212"}),
        processData: false,
        success: function (response, textStatus, jQxhr) {

        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });

}


function ShowHidePHRQuestions(){

    (phr1.checked) ? document.getElementById("ChronicDiseasesStatus").innerHTML = "No" : document.getElementById("ChronicDiseasesStatus").innerHTML = "Yes";
    (phr2.checked) ? document.getElementById("DailyLivingStatus").innerHTML = "No" : document.getElementById("DailyLivingStatus").innerHTML = "Yes";
    (phr3.checked) ? document.getElementById("ExerciseStatus").innerHTML = "No" : document.getElementById("ExerciseStatus").innerHTML = "Yes";
    (phr4.checked) ? document.getElementById("FoodHabitStatus").innerHTML = "No" : document.getElementById("FoodHabitStatus").innerHTML = "Yes";

    let ChronicDiseasesDiv = document.getElementById("ChronicDiseasesDiv");
    (phr1.checked) ? ChronicDiseasesDiv.style.display = "none" : ChronicDiseasesDiv.style.display = "block";

    let DailyLivingDiv = document.getElementById("DailyLivingDiv");
    (phr2.checked) ? DailyLivingDiv.style.display = "none" : DailyLivingDiv.style.display = "block";

    let ExerciseStatusDiv = document.getElementById("ExerciseStatusDiv");
    (phr3.checked) ? ExerciseStatusDiv.style.display = "none" : ExerciseStatusDiv.style.display = "block";

    let FoodHabitStatusDiv = document.getElementById("FoodHabitStatusDiv");
    (phr4.checked) ? FoodHabitStatusDiv.style.display = "none" : FoodHabitStatusDiv.style.display = "block";

    // let PHR2DataWidget = document.getElementById("PHRData2");
    // (phr1.checked) ? PHR2DataWidget.style.display = "none" : PHR2DataWidget.style.display = "block";
    //
    // let PHR3DataWidget = document.getElementById("PHRData3");
    // (phr1.checked) ? PHR3DataWidget.style.display = "none" : PHR3DataWidget.style.display = "block";


}
