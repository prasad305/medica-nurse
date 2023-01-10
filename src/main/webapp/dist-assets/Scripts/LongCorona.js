
    $(document).ready(function() {

    $("#btSave").click(function(){
        var formData = $("#regisForm").serialize();

        $.ajax({
            type: "POST",
            url: "sanchi.php",
            cache: false,
            data: formData,
            success: onSuccessNb,
            error: onError
        });
        return false;
    });

    function onSuccessNb(data, status)
{
    data = $.trim(data);
    $("#nbSav").html(data);
}

    function onError(data, status)
{
    // handle an error
}



    $("#btPHQ").click(function(){
    var formData = $("#phqForm").serialize();

    $.ajax({
    type: "POST",
    url: "dietPHQ.php",
    cache: false,
    data: formData,
    success: onSuccessNbPHQ,
    error: onError
});
    return false;
});

    function onSuccessNbPHQ(data, status)
{
    data = $.trim(data);
    $("#nbPHQ").html(data);
}


    $("#btGAD").click(function(){
    var formData = $("#gadForm").serialize();

    $.ajax({
    type: "POST",
    url: "dietGAD.php",
    cache: false,
    data: formData,
    success: onSuccessNbGAD,
    error: onError
});
    return false;
});

    function onSuccessNbGAD(data, status)
{
    data = $.trim(data);
    $("#nbGAD").html(data);
}


    $("#btODL").click(function(){
    var formData = $("#odlForm").serialize();

    $.ajax({
    type: "POST",
    url: "dietODL.php",
    cache: false,
    data: formData,
    success: onSuccessNbODL,
    error: onError
});
    return false;
});

    function onSuccessNbODL(data, status)
{
    data = $.trim(data);
    $("#nbODL").html(data);
}


    $("#btSUI").click(function(){
    var formData = $("#suiForm").serialize();

    $.ajax({
    type: "POST",
    url: "dietSUI.php",
    cache: false,
    data: formData,
    success: onSuccessNbSUI,
    error: onError
});
    return false;
});

    function onSuccessNbSUI(data, status)
{
    data = $.trim(data);
    $("#nbSUI").html(data);
}

    $("#btLC").click(function(){
    var formData = $("#lcForm").serialize();

    $.ajax({
    type: "POST",
    url: "https://digayu.medica.lk/dhcPatient/dhc_Long_Corona.php",
    cache: false,
    data: formData,
    success: onSuccessnbLC,
    error: onError
});
    return false;
});

    function onSuccessnbLC(data, status)
{
    data = $.trim(data);
    $("#nbLC").html(data);
}

        function ShowLoader() {
            $("#LongCoronaLoading").show();
            setTimeout(function() {
                // long code here
                $("#LongCoronaLoading").hide();
            },1); // give it a moment to redraw
        }

    $("#advice").click(function(){
    var formData = $("#lcForm").serialize();

    $.ajax({
    type: "POST",
    url: "https://digayu.medica.lk/dhcPatient/dhc_Long_Corona_Cam.php",
    cache: false,
    data: formData,
    success: onSuccessnbAA,
    error: onError

});

    return false;
});

    function onSuccessnbAA(data, status)
{
    $("#LongCoronaLoading").show();
    setTimeout(function() {
    data = $.trim(data);
    $("#nbAA").html(data);
        $("#LongCoronaLoading").hide();
    },1); // give it a moment to redraw
}


    $("#btPsych").click(function(){
    var formData = $("#psychForm").serialize();

    $.ajax({
    type: "POST",
    url: "ei-qn-input.php",
    cache: false,
    data: formData,
    success: onSuccessnbPsych,
    error: onError
});
    return false;
});

    function onSuccessnbPsych(data, status)
{
    data = $.trim(data);
    $("#nbPsych").html(data);
}

    $("#advicePsych").click(function(){
    var formData = $("#psychForm").serialize();

    $.ajax({
    type: "POST",
    url: "ei-qn-output.php",
    cache: false,
    data: formData,
    success: onSuccessnbPsychAdv,
    error: onError
});
    return false;
});

    function onSuccessnbPsychAdv(data, status)
{
    data = $.trim(data);
    $("#nbPsychAdv").html(data);
}


});//document ready function's outer brackets

