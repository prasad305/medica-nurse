
$.ajax({
   // url: 'http://localhost:8084/DietSrilanka_war_exploded/GetPhysicalHealth',
   url: 'http://213.136.77.176:8080/DietSrilanka2/GetPhysicalHealth',
    dataType: 'json',
    type: 'POST',
    contentType: 'application/json',
  //  data: JSON.stringify({"CaloriesCount": Count}),
    processData: false,
    success: function (response, textStatus, jQxhr) {

        if(response != null) {
            $("#DietPlanBreakfast").html("");
            for (i = 0; i < response.Question.length; i++) {
                $('#PhysicalHealthCard').append(' <div class="card"\n' +
                    '                 style="margin-top: 10px;">\n' +
                    '                <div class="card-body">\n' +
                    '                    <div class="ul-widget__head v-margin">\n' +
                    '                        <div class="ul-widget__head-label">\n' +
                    '                            <h3 class="ul-widget__head-title">'+ response.Question[i] +'</h3>\n' +
                    '                        </div>\n' +
                    '                        <div style="margin: auto 6px auto auto;">\n' +
                    '                            <a id="BreakfastStatus"></a>\n' +
                    '                        </div>\n' +

                    '                    </div>\n' +
                    '                    <div class="ul-widget__body">\n' +
                    '\n' +
                    '                        <div class="ul-widget1" >\n' +
                    '\n' +
                    '                          \n' +
                    '                                                                   <input type="checkbox" id="vehicle1" name="vehicle1" value="0">\n' +
                    '                                                                   <label for="vehicle1">For not at all</label><br>\n' +
                    '                                                                   <input type="checkbox" id="vehicle2" name="vehicle2" value="1">\n' +
                    '                                                                   <label for="vehicle1">For several <days></days></label><br>\n' +
                    '                                                                   <input type="checkbox" id="vehicle3" name="vehicle3" value="2">\n' +
                    '                                                                   <label for="vehicle1">For more days than not</label><br>\n' +
                    '                                                                   <input type="checkbox" id="vehicle4" name="vehicle3" value="3">\n' +
                    '                                                                   <label for="vehicle1">For nearly every day</label><br>\n' +


                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n'
                   );
            }
        }
    },
    error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});

function SetPhysicalHealthQuestions(){



}