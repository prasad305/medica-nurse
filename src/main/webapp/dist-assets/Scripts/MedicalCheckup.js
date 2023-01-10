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

    $("#btChkp").click(function(){
        var formData = $("#MedicalCheckupForm").serialize();

        $.ajax({
            type: "POST",
            url: "https://digayu.medica.lk/dhcPatient/checkupQn.php",
            cache: false,
            data: formData,
            success: onSuccessnbChkp,
            error: onError
        });
        return false;
    });

    function onSuccessnbChkp(data, status)
    {
        data = $.trim(data);
        $("#nbChkp").html(data);
    }


    $("#btChkAdv").click(function(){
        var formData = $("#MedicalCheckupForm").serialize();

        $.ajax({
            type: "POST",
            url: "https://digayu.medica.lk/dhcPatient/checkupAdvice.php",
            cache: false,
            data: formData,
            success: onSuccessnbChkAdv,
            error: onError
        });
        return false;
    });

    function onSuccessnbChkAdv(data, status)
    {
        data = $.trim(data);
        $("#nbChkAdv").html(data);
    }


    $("#btPsych").click(function(){
        var formData = $("#psychForm").serialize();

        $.ajax({
            type: "POST",
            url: "dietConsInput.php",
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
            url: "dietConsOutput.php",
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
