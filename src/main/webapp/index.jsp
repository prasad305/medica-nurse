<%@ page import="Mobios.API.Helper.BaseServlet" %>
<!DOCTYPE html>

<html>
<head>
    <%
        BaseServlet.Init(request, response);
        int version = (int) (Math.random() * (10000)) + 1;
    %>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
    <title>Medica Reception</title>

    <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,400i,600,700,800,900" rel="stylesheet"/>
    <link href="dist-assets/css/themes/lite-purple.min.css" rel="stylesheet"/>
    <link href="dist-assets/css/plugins/perfect-scrollbar.css" rel="stylesheet"/>
    <link href="dist-assets/css/themes/component-custom-switch.css" rel="stylesheet"/>
    <link href="dist-assets/css/plugins/sweetalert2.min.css" rel="stylesheet"/>
    <link href="dist-assets/css/themes/chosen.min.css" rel="stylesheet"/>
    <link href="dist-assets/css/plugins/nuslider.min.css" rel="stylesheet"/>
    <link href="dist-assets/css/themes/Common.css" rel="stylesheet"/>
    <link href="dist-assets/css/themes/WelcomePage.css" rel="stylesheet"/>
    <link href="dist-assets/plugins/Loader.css" rel="stylesheet"/>
    <link href="dist-assets/css/themes/ChangeColor.css" rel="stylesheet"/>

    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.0/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

    <link href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.dataTables.min.css" rel="stylesheet"/>
    <link href="https://cdn.datatables.net/1.11.1/css/jquery.dataTables.min.css" rel="stylesheet"/>

    <script type="text/javascript" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript"
            src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" integrity="sha512-r22gChDnGvBylk90+2e/ycr3RVrDi8DIOkIGNhJlKfuyQM4tIRAI062MaV8sfjQKYVGjOBaZBOA87z+IhZE9DA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<style>
    .loader-animation{
        display: block;
        position: relative;
        height: 20px;
        width: 80px;
        border: 3px solid #673ab7;
        border-radius: 20px;
        box-sizing: border-box;
        animation: balancing 1s linear infinite alternate;
        transform-origin: center center;
    }
    .loader-animation:before{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 35px;
        height: 15px;
        border-radius: 20px;
        background: #673ab7;
        animation: ballbns 1s linear infinite alternate;
    }
    @keyframes ballbns {
        0% {  left: 0; transform: translateX(0%); }
        100% {  left: 100%; transform: translateX(-100%); }
    }
    @keyframes balancing {
        0% {  transform: rotate(-25deg); }
        50% {  transform: rotate(0deg); }
        100% {  transform: rotate(25deg); }
    }

    .patient-table {
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
        border: none;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08);
        overflow: hidden;
        font-size: 12px;
        color: #666;
        font-family: "Open Sans", sans-serif;
        font-weight: 400;
        line-height: 1.5;
    }
    .patient-table > thead {
        position: sticky;
        top: 0;
        z-index: 5;
    }

    .patient-table th {
        background-color: #f5f5f5 !important;
        color: #333 !important;
        font-weight: 600;
        padding: 10px 10px !important;
        text-align: left;
    }

    .patient-table td {
        padding: 10px 5px;
        border: 1px solid #ddd !important;
        padding: 9px !important;
    }

    .patient-table > tbody tr:nth-child(even) {
        background-color: #f3f3f3;
    }

    .patient-table > tbody tr:hover {
        background-color: #eaeaea;
    }



</style>
</head>

<body id="Body">
</body>

<script src="dist-assets/js/scripts/jquery-3.5.1.js" integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
        crossorigin="anonymous"></script>
<script src="dist-assets/js/scripts/jquery-ui.js"></script>
<script src="dist-assets/js/plugins/jquery.timepicker.min.js"></script>
<script src="dist-assets/js/plugins/bootstrap.bundle.min.js"></script>
<script src="dist-assets/js/scripts/script.min.js"></script>
<script src="dist-assets/js/scripts/sweetalert.script.min.js"></script>
<script src="dist-assets/js/plugins/sweetalert2.min.js"></script>
<script src="dist-assets/js/scripts/qrious.min.js"></script>
<script src="dist-assets/js/scripts/qrious.min.js"></script>
<script src="dist-assets/js/scripts/jquery.dataTables.min.js"></script>
<script src="dist-assets/js/scripts/dataTables.responsive.min.js"></script>
<script src="dist-assets/js/scripts/qrcode.min.js"></script>
<script src="dist-assets/js/plugins/sha256.min.js"></script>
<script src="https://js.devartsoftware.com/devart/extender/main/v1.0/devart.extender.min.js"></script>
<script src="https://js.devartsoftware.com/devart/extender/UI/v1.0/DevArt.Extender.UI.min.js"></script>


<script src="https://js.mobios.lk/GasHelper.min.js"></script>
<script src="https://js.mobios.lk/httprequest.min.js"></script>
<script src="https://js.mobios.lk/HttpRequestMultiPart.min.js"></script>

<script src="https://unpkg.com/html5-qrcode@2.2.1/html5-qrcode.min.js"></script>

<script src="Scripts/Classes.js"></script>
<script src="Scripts/Events.js"></script>
<script src="Scripts/Cookies.js"></script>
<script src="Scripts/Views.js"></script>
<script src="Scripts/Main.js"></script>
<script src="Scripts/ServiceMethods.js"></script>
<script src="Scripts/UI.js"></script>
<script src="Scripts/Common.js"></script>

</html>
