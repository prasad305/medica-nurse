$(document).ready(function () {
    document.getElementById('vayasa').value = getCookie('patientAge');

  //  document.getElementById("ExerciseTxtAge").disabled = true;
   // document.getElementById("ExerciseRadioGenderF").disabled = true;
   // document.getElementById("ExerciseRadioGenderM").disabled = true;

    // range slider for temperature
    let rangeSlider = document.getElementById('slider-weight');
    noUiSlider.create(rangeSlider, {
        start: [20],
        behaviour: 'snap',
        connect: [false, false],
        step: 1,
        range: {
            'min': [20],
            'max': [160]
        }
    });
    // show value of range
    let rangeSliderValueElement = document.getElementById('wt');
    rangeSlider.noUiSlider.on('update', function (values, handle) {
        rangeSliderValueElement.value = values[handle];
    });

    $("#txtTemperature").change(function () {
        document.getElementById('wt').noUiSlider.set($(this).val());
    });
});

function UnlockExerciseForm(){

    document.getElementById("ExerciseTxtAge").disabled = false;
    document.getElementById("ExerciseRadioGenderF").disabled = false;
    document.getElementById("ExerciseRadioGenderM").disabled = false;
}

function ChangeM(){
    document.getElementById("MaleButton").style.backgroundColor = "purple";
    document.getElementById("FemaleButton").style.backgroundColor = "grey";
}
function ChangeF(){
    document.getElementById("MaleButton").style.backgroundColor = "Grey";
    document.getElementById("FemaleButton").style.backgroundColor = "yellow";
}

$('#radioBtn a').on('click', function(){
    var sel = $(this).data('title');
    var tog = $(this).data('toggle');
    $('#'+tog).prop('value', sel);

    $('a[data-toggle="'+tog+'"]').not('[data-title="'+sel+'"]').removeClass('active').addClass('notActive');
    $('a[data-toggle="'+tog+'"][data-title="'+sel+'"]').removeClass('notActive').addClass('active');
})
    $(document).ready(function() {
    var x = 0.0;
    var str,str1,str2,str3,str4,str5,str6,str7,str8;

    $("#submit1").click(function(){
    var formData = $("#callAjaxForm1").serialize();

    $.ajax({
    type: "POST",
    url: "https://digayu.medica.lk/dhcPatient/viyapra-3.php",
    cache: false,
    data: formData,
    success: onSuccess1a,
    error: onError
});
    return false;
});

    $("#submit999").click(function(){
    var formData = $("#callAjaxForm1").serialize();

    $.ajax({
    type: "POST",
    url: "https://digayu.medica.lk/dhcPatient/viyapra-1.php",
    cache: false,
    data: formData,
    success: onSuccess1b,
    error: onError
});
    return false;
});

    $("#submit9999").click(function(){
    var formData = $("#callAjaxForm1").serialize();

    $.ajax({
    type: "POST",
    url: "https://digayu.medica.lk/dhcPatient/viyapra-3.php",
    cache: false,
    data: formData,
    success: onSuccess1b,
    error: onError
});
    return false;
});

    $("#submit2").click(function(){

    var formData = $("#callAjaxForm2").serialize();

    $.ajax({
    type: "POST",
    url: "ndr2.php",
    cache: false,
    data: formData,
    success: onSuccess2a,
    error: onError
});
    return false;

});

    $("#submit998").click(function(){
    var formData = $("#callAjaxForm2").serialize();

    $.ajax({
    type: "POST",
    url: "ndr2a.php",
    cache: false,
    data: formData,
    success: onSuccess2b,
    error: onError
});
    return false;
});


    $("#submit3").click(function(){

    var formData = $("#callAjaxForm3").serialize();

    $.ajax({
    type: "POST",
    url: "ndr3.php",
    cache: false,
    data: formData,
    success: onSuccess3a,
    error: onError
});
    return false;
});

    $("#submit997").click(function(){
    var formData = $("#callAjaxForm3").serialize();

    $.ajax({
    type: "POST",
    url: "ndr3a.php",
    cache: false,
    data: formData,
    success: onSuccess3b,
    error: onError
});
    return false;
});



    $("#submit4").click(function(){

    var formData = $("#callAjaxForm4").serialize();

    $.ajax({
    type: "POST",
    url: "ndr4.php",
    cache: false,
    data: formData,
    success: onSuccess4a,
    error: onError
});
    return false;
});

    $("#submit996").click(function(){
    var formData = $("#callAjaxForm4").serialize();

    $.ajax({
    type: "POST",
    url: "ndr4a.php",
    cache: false,
    data: formData,
    success: onSuccess4b,
    error: onError
});
    return false;
});


    $("#submit5").click(function(){

    var formData = $("#callAjaxForm5").serialize();

    $.ajax({
    type: "POST",
    url: "ndr5.php",
    cache: false,
    data: formData,
    success: onSuccess5a,
    error: onError
});
    return false;
});

    $("#submit995").click(function(){
    var formData = $("#callAjaxForm5").serialize();

    $.ajax({
    type: "POST",
    url: "ndr5a.php",
    cache: false,
    data: formData,
    success: onSuccess5b,
    error: onError
});
    return false;
});


    $("#submit6").click(function(){

    var formData = $("#callAjaxForm6").serialize();

    $.ajax({
    type: "POST",
    url: "ndr6.php",
    cache: false,
    data: formData,
    success: onSuccess6a,
    error: onError
});
    return false;
});

    $("#submit994").click(function(){
    var formData = $("#callAjaxForm6").serialize();

    $.ajax({
    type: "POST",
    url: "ndr6a.php",
    cache: false,
    data: formData,
    success: onSuccess6b,
    error: onError
});
    return false;
});

    $("#submit7").click(function(){

    var formData = $("#callAjaxForm7").serialize();

    $.ajax({
    type: "POST",
    url: "ndr7.php",
    cache: false,
    data: formData,
    success: onSuccess7a,
    error: onError
});
    return false;
});

    $("#submit993").click(function(){
    var formData = $("#callAjaxForm7").serialize();

    $.ajax({
    type: "POST",
    url: "ndr7a.php",
    cache: false,
    data: formData,
    success: onSuccess7b,
    error: onError
});
    return false;
});


    $("#submit8").click(function(){

    var formData = $("#callAjaxForm8").serialize();

    $.ajax({
    type: "POST",
    url: "ndr8.php",
    cache: false,
    data: formData,
    success: onSuccess8a,
    error: onError
});
    return false;
});

    $("#submit992").click(function(){
    var formData = $("#callAjaxForm8").serialize();

    $.ajax({
    type: "POST",
    url: "ndr8a.php",
    cache: false,
    data: formData,
    success: onSuccess8b,
    error: onError
});
    return false;
});



    $("#submit9").click(function(){

    var formData = $("#callAjaxForm9").serialize();

    $.ajax({
    type: "POST",
    url: "ndr9.php",
    cache: false,
    data: formData,
    success: onSuccess9a,
    error: onError
});
    return false;
});

    $("#submit991").click(function(){
    var formData = $("#callAjaxForm9").serialize();

    $.ajax({
    type: "POST",
    url: "ndr9a.php",
    cache: false,
    data: formData,
    success: onSuccess9b,
    error: onError
});
    return false;
});



    $("#submit10").click(function(){

    var formData = $("#callAjaxForm10").serialize();

    $.ajax({
    type: "POST",
    url: "ndr10.php",
    cache: false,
    data: formData,
    success: onSuccess10a,
    error: onError
});
    return false;
});

    $("#submit990").click(function(){
    var formData = $("#callAjaxForm10").serialize();

    $.ajax({
    type: "POST",
    url: "ndr10a.php",
    cache: false,
    data: formData,
    success: onSuccess10b,
    error: onError
});
    return false;
});


    $("#viuIx").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "ndrViuIx.php",
    cache: false,
    data: formData,
    success: onSuccessViuTx,
    error: onError
});
    return false;
});


    $("#viuDx").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "ndrViuDx.php",
    cache: false,
    data: formData,
    success: onSuccessViuTx,
    error: onError
});
    return false;
});

    $("#viuTx").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "ndrViuTx.php",
    cache: false,
    data: formData,
    success: onSuccessViuTx,
    error: onError
});
    return false;
});


    $("#viuFup").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "ndrViuFup.php",
    cache: false,
    data: formData,
    success: onSuccessViuTx,
    error: onError
});
    return false;
});



    $("#viuVs").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "ndrViuVs.php",
    cache: false,
    data: formData,
    success: onSuccessViuTx,
    error: onError
});
    return false;
});


    $("#viuOdl").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "ndrViuOdl.php",
    cache: false,
    data: formData,
    success: onSuccessViuTx,
    error: onError
});
    return false;
});




    $("#savbt").click(function(){

    var formData = $("#cajsavForm").serialize();

    $.ajax({
    type: "POST",
    url: "emrithiriya.php",
    cache: false,
    data: formData,
    success: onSuccessSav,
    error: onError
});
    return false;
});



    $("#viubt1").click(function(){

    var formData = $("#viuajForm").serialize();

    $.ajax({
    type: "POST",
    url: "dattapenvima1.php",
    cache: false,
    data: formData,
    success: onSuccessViu,
    error: onError
});
    return false;
});



//insert .click functions here


    function onSuccess1a(data, status)
{
    data = $.trim(data);
    $("#notification1a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess1b(data, status)
{
    $("#ExercisePrescriptionLoading").show();
    setTimeout(function() {
    data = $.trim(data);
    $("#notification1c").html(data);
    $("#pvdata1").html(data);
    $("#ExercisePrescriptionLoading").hide();
},1);


}
    function onSuccess1c(data, status)
{
    data = $.trim(data);
    $("#notification1c").html(data);
    $("#pvdata1").html(data);

}


    function onSuccess2a(data, status)
{
    data = $.trim(data);
    $("#notification2a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess2b(data, status)
{
    data = $.trim(data);
    $("#notification2b").html(data);
    $("#pvdata1").html(data);


}



    function onSuccess3a(data, status)
{
    data = $.trim(data);
    $("#notification3a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess3b(data, status)
{
    data = $.trim(data);
    $("#notification3b").html(data);
    $("#pvdata1").html(data);


}

    function onSuccess4a(data, status)
{
    data = $.trim(data);
    $("#notification4a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess4b(data, status)
{
    data = $.trim(data);
    $("#notification4b").html(data);
    $("#pvdata1").html(data);


}

    function onSuccess5a(data, status)
{
    data = $.trim(data);
    $("#notification5a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess5b(data, status)
{
    data = $.trim(data);
    $("#notification5b").html(data);
    $("#pvdata1").html(data);


}

    function onSuccess6a(data, status)
{
    data = $.trim(data);
    $("#notification6a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess6b(data, status)
{
    data = $.trim(data);
    $("#notification6b").html(data);
    $("#pvdata1").html(data);


}

    function onSuccess7a(data, status)
{
    data = $.trim(data);
    $("#notification7a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess7b(data, status)
{
    data = $.trim(data);
    $("#notification7b").html(data);
    $("#pvdata1").html(data);


}



    function onSuccess8a(data, status)
{
    data = $.trim(data);
    $("#notification8a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess8b(data, status)
{
    data = $.trim(data);
    $("#notification8b").html(data);
    $("#pvdata1").html(data);


}


    function onSuccess9a(data, status)
{
    data = $.trim(data);
    $("#notification9a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess9b(data, status)
{
    data = $.trim(data);
    $("#notification9b").html(data);
    $("#pvdata1").html(data);


}


    function onSuccess10a(data, status)
{
    data = $.trim(data);
    $("#notification10a").html(data);
    $("#pvdata").html(data);
    //str = $("#notification").value;
    //pvdata.value = $("#notification").html(data).value;
}

    function onSuccess10b(data, status)
{
    data = $.trim(data);
    $("#notification10b").html(data);
    $("#pvdata1").html(data);


}

    function onSuccessViuTx(data, status)
{
    data = $.trim(data);
    $("#viuDt").html(data);
    $("#pvdataViu").html(data);
}





    function onSuccessSav(data, status)
{
    data = $.trim(data);
    $("#notificationSav").html(data);
    $("#pvdataSav").html(data);
}




    function onError(data, status)
{
    // handle an error
}



    $("#write").click(function(){

    str = $("#pvdata").val();
    str1 = $("#pvdata1").val();
    str2 = $("#pvdata2").val();
    str3 = $("#pvdata3").val();
    str4 = $("#pvdata4").val();
    str5 = $("#pvdata5").val();
    str6 = $("#firstName").val();
    str7 = $("#lastName").val();
    str8 = $("#contdt").val();

    str99 = str6 + " - " + str7 + " - " + str8 + " - " + str + " - " + str1 + " - " + str2 + " - " + str3 + " - " + str4 + " - " + str5;
    $("#samasthaya").val(str99);

});


    $('#relod').click(function() {
    location.reload();
});


});//document ready function's outer brackets



