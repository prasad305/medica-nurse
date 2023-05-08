{
    var Id;
    var MobileNumber;
    var UUID;
    var Subscriber;
    var SubscriptionDateTime;
    var LongCorona;
    var DietPlan;
    var PhysicalHealth;
    var MentalHealth;
    var PlanType;

    function CheckSubscriptionServices(SubscriptionPlanType) {
        let MobileNumberCookie = getCookie("mobileNumber");
        $.getJSON('http://localhost:8084/DietSrilanka_war_exploded/CheckSubscribe' + "?PhoneNumber=" + MobileNumberCookie, function (response) {

            Id = response.Id;
            MobileNumber = response.Mobile_Number;
            UUID = response.UUID;
            Subscriber = response.Subscriber;
            SubscriptionDateTime = response.Subscription_Date_Time;
            LongCorona = response.Long_Corona;
            DietPlan = response.Diet_Plan;
            PhysicalHealth = response.Physical_Health;
            MentalHealth = response.Mental_Health;

            MobileNumber = "0" +MobileNumber;
            if (MobileNumber === MobileNumberCookie) {

                if (LongCorona === 1) {

                } else {

                }
                if (DietPlan === 1) {
                   // ShowDietPlanMenu();
                   // HideAllDiv();
                } else {
                    swal({
                        imageUrl: 'dist-assets/images/Home/not-subscribe.png',
                        imageWidth: 200,
                        imageHeight: 200,
                        text: 'Sorry You Did Not Subscribe To This Service' ,
                        buttonsStyling: false,
                        confirmButtonText: 'OK',
                        confirmButtonClass: 'btn btn-lg btn-warning'
                    });
                }
                if (PhysicalHealth === 1) {

                } else {

                }
                if (MentalHealth === 1) {

                } else {

                }


            }

        });


    }

}
