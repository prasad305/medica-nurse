var BrowserTestValues =
    [
        "audio",
        "availableScreenResolution",
        "canvas",
        "colorDepth",
        "cookies",
        "cpuClass",
        "deviceDpi",
        "doNotTrack",
        "indexedDb",
        //"installedFonts",
        "installedLanguages",
        "language",
        //"localIp",
        "localStorage",
        "pixelRatio",
        "platform",
        "plugins",
        "processorCores",
        "screenResolution",
        "sessionStorage",
        "timezoneOffset",
        "touchSupport",
        "userAgent",
        "webGl",
        "publicIp"
    ];

var _BrowserId;
var _BidClient;

imprint.test(BrowserTestValues).then(function (result) {
    _BrowserId = result;
    PostBrowserId();
});

/*========================
     Request Handler
=========================*/
var GlobalFail = function (Response) {
    if (Response.responseJSON !== undefined && Response.responseJSON !== null)
        alert(Response.responseJSON.Message);
    else
        alert("An error occured while processing your request. Please check your internet connection.");
};

var ShowLoader = function () {
};

var HideLoader = function () {
};

function Init_Load() {

    // _BidClient = new HttpRequest(_BrowserIdUrl, new Array(), GlobalFail);
    _BidClient = new HttpRequest(_BrowserIdUrl, new Array(), GlobalFail);
    // _BidClient = new HttpRequest("callApi", new Array(), GlobalFail);
}

function PostBrowserId() {
    /**  console.log("Hiiiii!");
     let  requestData=new FormData();
     console.log(_BrowserId);
     console.log(_BrowserToken);
     requestData.append('BrowsrToken', _BrowserToken);
     requestData.append('BrowserId',_BrowserId);
     console.log(requestData.get("BrowserId"));
     console.log(requestData.get("BrowsrToken"));
     $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "callApi",
        data: requestData,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 2000,
        async: false,
        success: function (response)
        {
            console.log(response);
        },
        error: function (e)
        {
            showError("Alert", "Error", 2000);
        }
    });**/

    console.log("_BidClient ", _BidClient);


    _BidClient.Post("SaveBrowserId", {'BrowsrToken': _BrowserToken, 'BrowserId': _BrowserId}, function (Response) {
        if (Response.Status === 401 || Response.Data === "") {
            alert("Mobios GAS is unable to authenticate this application. Please contact system administrator.");
        } else {
            _GasBrowserId = Response
            _GasToken = _BrowserToken
            setCookie("Token", _BrowserToken, 1);
            setCookie("BrowserId", Response, 1);
        }
    });
}


Init_Load();
