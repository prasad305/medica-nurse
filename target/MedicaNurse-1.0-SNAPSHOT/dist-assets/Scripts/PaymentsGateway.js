let Amount;
let SubscribedType;
let CustomerMobile = "0766113845";
function SubscribePlan(Amount,SubscribedType) {
    let PayURL;
    let ReturnURL = "http://patient.medica.lk/WelcomePage.jsp";
    let MerchantRID;
    let DateTime = Date.now();
    DateTime = new Date(DateTime);
    DateTime = (DateTime.getMonth() + 1) + '/' + DateTime.getDate() + '/' + DateTime.getFullYear() + '-' + (DateTime.getHours() > 12 ? DateTime.getHours() - 12 : DateTime.getHours()) + ':' + DateTime.getMinutes() + ':' + (DateTime.getHours() >= 12 ? "PM" : "AM");
    var RandomNumber = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    MerchantRID = "PA/" + DateTime + "/" + "MP" + RandomNumber;

    $.ajax({
        url: 'https://dev.app.marx.lk/api/v2/ipg/orders',
        dataType: 'json',
        headers: {
            'user_secret': '$2a$10$x1CAe9YuEz9G1X1ZQrTrLOJXFu2PSvrwLuBcWpgT2ecRAx5sxfOhW'
        },
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "merchantRID": MerchantRID,
            "amount": Amount,
            "validTimeLimit": "5",
            "returnUrl": ReturnURL,
            "customerMail": "sarangagamage24@gmail.com",
            "customerMobile": CustomerMobile,
            "mode": "WEB",
            "orderSummery": "Order Description",
            "customerReference": "cus_ref"
        }),
        processData: false,
        success: function (response, textStatus, jQxhr) {
            SuccessPayment(SubscribedType,Amount,CustomerMobile);
            PayURL = response.data.payUrl;
            $(location).attr('href', PayURL)

            console.log(response);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


}

function SuccessPayment(SubscribedType,Amount,CustomerMobile){
    $.ajax({
        url: 'http://localhost:8084/DietSrilanka_war_exploded/Payment',
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            "MobileNumber": CustomerMobile,
            "SubscribedType" : SubscribedType,
            "PaidAmount" : Amount
        }),
        processData: false,
        success: function (response, textStatus, jQxhr) {

           // PayURL = response.data.payUrl;
           // $(location).attr('href', PayURL)
            console.log(response);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


}