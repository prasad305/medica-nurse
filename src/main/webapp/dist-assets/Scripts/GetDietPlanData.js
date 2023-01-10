
function GetDietPlanData(Count) {

    $.ajax({
     // url: 'http://localhost:8084/DietSrilanka_war_exploded/GetDataNew',
        url: 'http://213.136.77.176:8080/DietSrilanka2/GetDataNew',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({"CaloriesCount": Count}),
        processData: false,
        success: function (response, textStatus, jQxhr) {
            (LockBreakfast.checked) ? SetBreakfast(1, response, Count) : SetBreakfast(0, response, Count);
            (LockMorningSnacks.checked) ? SetMorningSnacks(1, response, Count) : SetMorningSnacks(0, response, Count);
            (LockLunch.checked) ? SetLunch(1, response, Count) : SetLunch(0, response);
            (LockEveningSnacks.checked) ? SetEveningSnacks(1, response, Count) : SetEveningSnacks(0, response, Count);
            (LockDinner.checked) ? SetDinner(1, response, Count) : SetDinner(0, response, Count);

            document.getElementById("DietPlanHeading").innerHTML = response.Diet_Plan_Name;
            SetLockUnlockStatus();
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}
//Breakfast
function SetBreakfast(CheckedStatus, response, Count) {

    if (CheckedStatus === 1) {
        //nothing
    } else {
        $("#DietPlanBreakfast").html("");
        for (i=0; i<response.Breakfast.length; i++){
            $('#DietPlanBreakfast').append(' <li class="mb-2"><span >' + response.Breakfast[i] + '</span></li>');
        }

    }

}


//Morning Snack
function SetMorningSnacks(CheckedStatus, response, Count) {

    if (CheckedStatus === 1) {

    } else {


        $("#DietPlanMorningSnacks").html("");
        for (i=0; i<response.Morning_Snacks.length; i++){
            $('#DietPlanMorningSnacks').append(' <li class="mb-2"><span >' + response.Morning_Snacks[i] + '</span></li>');
        }
        if(response.Morning_Snacks.length === 2){
            $('#DietPlanMorningSnacks').append(' <p class="mb-2"><span >&nbsp;&nbsp;&nbsp;</span></p>');
        }

    }

}


// Lunch
function SetLunch(CheckedStatus, response, Count) {

    if (CheckedStatus === 1) {


    } else {

        $("#DietPlanLunch").html("");
        for (i=0; i<response.Lunch.length; i++){
            $('#DietPlanLunch').append(' <li class="mb-2"><span >' + response.Lunch[i] + '</span></li>');
        }

    }

}


//Evening Snacks
function SetEveningSnacks(CheckedStatus, response, Count) {

    if (CheckedStatus === 1) {

    } else {
        $("#DietEveningSnacks").html("");
        for (i=0; i<response.Evening_Snacks.length; i++){
            $('#DietEveningSnacks').append(' <li class="mb-2"><span >' + response.Evening_Snacks[i] + '</span></li>');
        }
        if(response.Evening_Snacks.length === 2){
            $('#DietEveningSnacks').append(' <p class="mb-2"><span >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>');
        }

    }

}


//Dinner
function SetDinner(CheckedStatus, response, Count) {
    if (CheckedStatus === 1) {

    } else {
        $("#DietPlanDinner").html("");
        for (i=0; i<response.Dinner.length; i++){
            $('#DietPlanDinner').append(' <li class="mb-2"><span >' + response.Dinner[i] + '</span></li>');
        }

        $('#DietPlanDinner').append(' <p class="mb-2" id="Additional"><span >' + response.Additional + '</span></p>');
    }

}

function SetLockUnlockStatus(){

    (LockBreakfast.checked) ? document.getElementById("BreakfastStatus").innerHTML = "Hold" : document.getElementById("BreakfastStatus").innerHTML = "Change";
    (LockMorningSnacks.checked) ? document.getElementById("MorningSnacksStatus").innerHTML = "Hold" : document.getElementById("MorningSnacksStatus").innerHTML = "Change";
    (LockLunch.checked) ? document.getElementById("LunchStatus").innerHTML = "Hold" : document.getElementById("LunchStatus").innerHTML = "Change";
    (LockEveningSnacks.checked) ? document.getElementById("EveningSnacksStatus").innerHTML = "Hold" : document.getElementById("EveningSnacksStatus").innerHTML = "Change";
    (LockDinner.checked) ? document.getElementById("DinnerStatus").innerHTML = "Hold" : document.getElementById("DinnerStatus").innerHTML = "Change";

}






