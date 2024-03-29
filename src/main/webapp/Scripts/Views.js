﻿/*=================================
            Layouts
 =================================*/

function LayoutCommon()
{
    this.IdHolder = "DivHolder";
    this.IdLoader = "DivLoader";

    this.Render = function ()
    {
        let LayoutDivRow = new Div(undefined, "row");
        LayoutDivRow.appendChild(new Div(this.IdHolder, "col-md-12"));

        let DivCard = new Div(undefined, "card o-hidden");
        DivCard.appendChild(LayoutDivRow);

        let DivCell = new Div(undefined, "col-lg-6 col-12");
        DivCell.appendChild(DivCard);

        let DivRow = new Div(undefined, "row");
        DivRow.appendChild(new Div(undefined, "col-lg-3"));
        DivRow.appendChild(DivCell);
        DivRow.appendChild(new Div(undefined, "col-lg-3"));

        let DivContent = new Div(undefined, "auth-content");
        DivContent.appendChild(DivRow);

        let DivLayout = new Div(undefined, "auth-layout-wrap BgImage");
        DivLayout.appendChild(DivContent);

        document.body.appendChild(DivLayout);

        new Login().Render(this.IdHolder);        

    };

    this.RenderLoader = function ()
    {
        let DivContentLoader = new Div(this.IdLoader, "row zindex-10 w-100 align-items-center");
        let DivLoadingIconLoader = new Div("DivLoadingIconLoader", "mx-auto justify-content-center");
        DivLoadingIconLoader.appendChild(new Imagebox("imageLoader", "dist-assets/images/Spinner-1s-204px.gif", undefined, undefined, [new Attribute(_AttributeClass, "c-default w-50")]));
        DivContentLoader.appendChild(DivLoadingIconLoader);
        document.getElementById(_Body).appendChild(DivContentLoader);
    };

    this.DerenderLoader = function ()
    {
        document.getElementById(_Body).removeChild(document.getElementById(this.IdLoader));
    };
}

function LayoutMain()
{
    this.Render = function ()
    {
        let DivMain = new Div(undefined, "app-admin-wrap layout-sidebar-large");
        let DivNavBar = new Div(Containers.Header, undefined);
        DivMain.appendChild(DivNavBar);

        let DivHeader = new Div(undefined, "main-content-wrap sidenav-close d-flex flex-column m-auto");

        let DivMainContent = Div(undefined, "main-content");
        DivMainContent.appendChild(new Div(Containers.ButtonBar));

        let DivRowMainContent = new Div(undefined, "row");
        DivRowMainContent.appendChild(new Div(undefined, "col-lg-2"));
        let DivSubRowMain = new Div(Containers.MainContent, "col-lg-8 col-12 pd-lr-5");
        DivRowMainContent.appendChild(DivSubRowMain);

        DivRowMainContent.appendChild(new Div(undefined, "col-lg-2"));              

        DivMainContent.appendChild(DivRowMainContent);

        DivHeader.appendChild(DivMainContent);

        let DivFlex = new Div(undefined, "flex-grow-1");
        DivHeader.appendChild(DivFlex);

        DivMain.appendChild(DivHeader);       

        let DivFooter = new Div(Containers.Footer, "footer");
        DivMain.appendChild(DivFooter);

        document.body.innerHTML = "";
        
        document.body.appendChild(DivMain);       

        //Call initial views here
        new SiteNavigation().Render(Containers.Header);
        new SiteButtonBar().Render(Containers.ButtonBar);
        new Footer().Render(Containers.Footer);
    };
}


/*=================================
            Views
 =================================*/

function Login()
{
    this.Render = function (Container)
    {
        let DivContent = new Div(undefined, "p-4");

        let DivLogo = new Div(undefined, "auth-logo text-center mb-4");
        DivLogo.appendChild(new Imagebox(undefined, "dist-assets/images/LogoNurse.png", undefined, undefined, [new Attribute(_AttributeClass, "c-default")]));
        DivContent.appendChild(DivLogo);
        DivContent.appendChild(new Heading4("MEDICA Reception Sign In", [new Attribute(_AttributeClass, "mb-3 text-18 LoginTitle ")]));

        let RowUsername = new Div(undefined, "form-group"); //p-4 child
        RowUsername.appendChild(new Label(undefined, "Username / Mobile No", undefined, [new Attribute(_AttributeFor, "TxtUsername")]));
        RowUsername.appendChild(new Textbox("TxtUsername", "form-control form-control-rounded UserLogin", [new Attribute(_AttributePattern, "[0-9]{10}"), new Attribute(_AttributePlaceHolder, "Username")]));
        DivContent.appendChild(RowUsername);

        let RowPassword = new Div(undefined, "form-group");
        RowPassword.appendChild(new Label(undefined, "Password", undefined, [new Attribute(_AttributeFor, "TxtPassword")]));
        RowPassword.appendChild(new Passwordbox("TxtPassword", "form-control form-control-rounded UserLogin", [new Attribute(_AttributePlaceHolder, "Password")]));
        DivContent.appendChild(RowPassword);

        DivContent.appendChild(new Button("CmdLogin", "Login", "btn btn-rounded btn-primary btn-block mt-2", [new Attribute(_AttributeOnClick, "CmdLogin_Click(this)")]));

        let DivRemember = new Div(undefined, "mt-3 text-center");
        DivRemember.appendChild(new Checkbox("ChkRemember", false));
        DivRemember.appendChild(new Label(undefined, "&nbsp;Remember Me ", undefined, [new Attribute(_AttributeFor, "ChkRemember")]));
        DivContent.appendChild(DivRemember);

        let DivForgotPassword = new Div(undefined, "text-center");
        DivForgotPassword.appendChild(new Hyperlink("LnkRecover", _ClickVoid, "Forgot Password?", "text-muted", [new Attribute(_AttributeOnClick, "LnkRecover_Click(this)")]));
        DivContent.appendChild(DivForgotPassword);

        let DivDoctor = new Div(undefined, " mt-2 text-center mr-4");
        DivDoctor.appendChild(new Hyperlink("LnkDoctor", _ClickVoid, "I am a doctor", "text-muted", [new Attribute(_AttributeOnClick, "LnkVirtualconsultation_Click()")]));
        DivContent.appendChild(DivDoctor);

        //let DivSignInDescription = new Div(undefined, "text-center mt-3");
        //DivSignInDescription.appendChild(new Label(undefined, "DoctorOnline Consulation by MEDICA", undefined), [new Attribute(_AttributeFor, "LnkDoctorOnline_Click")]);
        //DivContent.appendChild(DivSignInDescription);

        let DivSignInDescription = new Div(undefined, "text-center mt-3");
        DivSignInDescription.appendChild(new Hyperlink("LnkRecover1", _ClickVoid, "Ayurweda by MEDICA", "text-muted", [new Attribute(_AttributeOnClick, "LnkDoctorOnline_Click()")]));
        DivContent.appendChild(DivSignInDescription);

        BindView(Container, DivContent);
    };
}

function Welcome()
{
    this.Render = function (Container)
    {
        let DivWelcome = new Div(undefined, "CustomMarginTop FontColorWhite text-center");

        let WelcomeHeadingLine1 = new Heading2("Welcome to");
        DivWelcome.appendChild(WelcomeHeadingLine1);

        let WelcomeHeadingLine2 = new Heading1("Medica for Patients");
        DivWelcome.appendChild(WelcomeHeadingLine2);

        let DivLogo = new Imagebox(undefined, Images.Logo, undefined, "Medica Logo");
        DivWelcome.appendChild(DivLogo);

        let DivLoader = new Div(undefined, "row justify-content-center pt-4");
        let Loader = new Div(undefined, "loader");
        DivLoader.appendChild(Loader);
        DivWelcome.appendChild(DivLoader);

        let DivFooter = new Div(undefined, "Footer FontColorWhite");
        let CreditsHeading = new Heading6("Pwered By mobiOs", [new Attribute(_AttributeClass, "text-center")]);
        DivFooter.appendChild(CreditsHeading);
        DivWelcome.appendChild(DivFooter);

        let ScriptWelcome = new Javascript(undefined);
        ScriptWelcome.src = "Scripts/Welcome.js";
        ScriptWelcome.onload = Welcome_Load;
        DivWelcome.appendChild(ScriptWelcome);

        BindView(Container, DivWelcome);
    }
}

function SiteNavigation()
{
    this.Render = function (Container)
    {
        let DivMainHeader = new Div(undefined, "main-header");

        let DivLogo = new Div(undefined, "logo");
        let Logo = new Div("logo");
        DivLogo.appendChild(Logo);
        let ImageLogo = new Imagebox("PatientAppDiv", "dist-assets/images/LogoNurse.png", undefined, "Medica Logo", [new Attribute(_AttributeClass, "PateintAppDiv"), new Attribute(_AttributeOnClick, "CmdBtnColorRemove_Click();")]);
        Logo.appendChild(ImageLogo);
        DivMainHeader.appendChild(DivLogo);

        let DivDFlex = new Div(undefined, "d-flex align-items-center");
        DivMainHeader.appendChild(DivDFlex);
        let DivMargin = new Div(undefined, "margin-auto");
        DivMainHeader.appendChild(DivMargin);

        let DivRightHeaderPart = new Div(undefined, "header-part-right");
        let FullScreenIcon = new Span(undefined, undefined, "i-Full-Screen header-icon d-none d-sm-inline-block", [new Attribute(_AttributeOnClick, "CmdFullScreen_Click()")]);
        DivRightHeaderPart.appendChild(FullScreenIcon);

        let DropDownRemainder = new Div(undefined, "dropown");
        let DivBadgeTop = new Div("dropdownNotification", "badge-top-container", [new Attribute(_AttributeDataToggle, "dropdown"), new Attribute(_AttributeAriaHaspopup, "true"), new Attribute(_AttributeAriaExpand, "false")]);
        DropDownRemainder.appendChild(DivBadgeTop);
        let BellIcon = new Span(undefined, undefined, "i-Bell header-icon",[new Attribute("style", "color: #3CB043;")]);
        DivBadgeTop.appendChild(BellIcon);
        DivRightHeaderPart.appendChild(DropDownRemainder);

        let DropDownProfile = new Div(undefined, "drpodown");
        let DivUser = new Div(undefined, "user col align-self-end");
        let ImageProfile = new Imagebox("userDrpodown", "dist-assets/images/Nurse/hamburger.png", undefined, "Hamburger Image", [new Attribute(_AttributeDataToggle, "dropdown"), new Attribute(_AttributeAriaHaspopup, "true"), new Attribute(_AttributeAriaExpand, "false"), new Attribute(_AttributeOnClick, "CmdBtnColorRemove_Click();")]);
        DivUser.appendChild(ImageProfile);
        let DropDownProfileMenu = new Div(undefined, "dropdown-menu dropdown-menu-right", [new Attribute(_AttributeAreaLabledBy, "userDropdown")]);
        let HyperlinkProfile = new Hyperlink(undefined, undefined, "Profile", "dropdown-item", [new Attribute(_AttributeOnClick, "CmdProfile_Click(this)")]);
        let HyperlinkAbout = new Hyperlink(undefined, undefined, "About", "dropdown-item", [new Attribute(_AttributeOnClick, "CmdAboutUs_Click(this)")]);
        let HyperlinkSignOut = new Hyperlink(undefined, undefined, "Sign Out", "dropdown-item", [new Attribute(_AttributeOnClick, "LnkSignOut_Click(this)")]);
        DropDownProfileMenu.appendChild(HyperlinkProfile);
        DropDownProfileMenu.appendChild(HyperlinkAbout);
        DropDownProfileMenu.appendChild(HyperlinkSignOut);
        let HyperlinkBranchId = new Hyperlink("LblInstituteBranch", undefined, "Branch Id", "dropdown-item");
        DropDownProfileMenu.appendChild(HyperlinkBranchId);

        let DropDownProfileName = new Div(undefined, "dropdown");
        let ProfileName = new Heading6(undefined, [new Attribute(_AttributeClass, "card-title m-unset"), new Attribute(_AttributeId, "ProfileName")]);
        DropDownProfileName.appendChild(ProfileName);
        DivRightHeaderPart.appendChild(DropDownProfileName);

        DivUser.appendChild(DropDownProfileMenu);
        DropDownProfile.appendChild(DivUser);
        DivRightHeaderPart.appendChild(DropDownProfile);
        DivMainHeader.appendChild(DivRightHeaderPart);

        BindView(Container, DivMainHeader);
    }
}

function SiteButtonBar()
{
    this.Render = function (Container)
    {
        let DivRowMainButtonBar = Div(undefined, "row");
        DivRowMainButtonBar.appendChild(new Div(undefined, "col-lg-2 pd-lr-5"));
        let RowCelRowCellSite = Div(undefined, "col-lg-2 col-3 pd-lr-5");

        let SpanPrescription = new Span(undefined, undefined, "c-pointer");
        let DivPrescription = new Div(undefined, "card mb-4 o-hidden");
        let DivPrescriptionCardBody = new Div("PatientCard", "card-body", [new Attribute(_AttributeOnClick, "CmdPatientSearch_Click(this),CmdBtnClickable_Click(this)")]);

        let DivWidgetRowPrescription = new Div(undefined, "ul-widget__row-v2 p-relative");
        let DivWidgetImagePrescription = new Div(undefined, "ul-widget6__pic");
        let ImagePrescription = new Imagebox(undefined, "dist-assets/images/Nurse/Patientn.png", undefined, "Prescription Image");

        let DivWidgetContentPrescription = new Div("PrescriptionHeading", "ul-widget__content-v2");
        let HeadingPrescription = new Heading4("Patient", [new Attribute(_AttributeClass, "heading mt-3")]);

        DivWidgetImagePrescription.appendChild(ImagePrescription);
        DivWidgetRowPrescription.appendChild(DivWidgetImagePrescription);
        DivPrescriptionCardBody.appendChild(DivWidgetRowPrescription);

        DivWidgetContentPrescription.appendChild(HeadingPrescription);
        DivWidgetRowPrescription.appendChild(DivWidgetContentPrescription);

        DivPrescription.appendChild(DivPrescriptionCardBody);
        SpanPrescription.appendChild(DivPrescription);

        RowCelRowCellSite.appendChild(SpanPrescription);
        DivRowMainButtonBar.appendChild(RowCelRowCellSite);

        ////////////////////////////////////////////
        let RowCellSiteButtonBar = Div(undefined, "col-lg-2 col-3 pd-lr-5");

        let SpanReport = new Span(undefined, undefined, "c-pointer");
        let DivReport = new Div(undefined, "card mb-4 o-hidden");
        let DivReportCardBody = new Div("AppoinmentsCard", "card-body", [new Attribute(_AttributeOnClick, "CmdAppoinments_Click(this),CmdBtnClickable_Click(this)")]);

        let DivWidgetRowReport = new Div(undefined, "ul-widget__row-v2 p-relative");
        let DivWidgetImageReport = new Div(undefined, "ul-widget6__pic");
        let ImageReport = new Imagebox(undefined, "dist-assets/images/Nurse/Appointment.png", undefined, "Report Image");

        let DivWidgetContentReport = new Div("ReportsHeading", "ul-widget__content-v2");
        let HeadingReport = new Heading4("Appoinments", [new Attribute(_AttributeClass, "heading mt-3")]);

        DivWidgetImageReport.appendChild(ImageReport);
        DivWidgetRowReport.appendChild(DivWidgetImageReport);
        DivReportCardBody.appendChild(DivWidgetRowReport);

        DivWidgetContentReport.appendChild(HeadingReport);
        DivWidgetRowReport.appendChild(DivWidgetContentReport);

        DivReport.appendChild(DivReportCardBody);
        SpanReport.appendChild(DivReport);

        RowCellSiteButtonBar.appendChild(SpanReport);
        DivRowMainButtonBar.appendChild(RowCellSiteButtonBar);

        //////////////////////////////////////////
        let RowCellSiteDocument = Div(undefined, "col-lg-2 col-3 pd-lr-5");

        let SpanHistory = new Span(undefined, undefined, "c-pointer");
        let DivHistory = new Div(undefined, "card mb-4 o-hidden");
        let DivHistoryCardBody = new Div("SessionCard", "card-body", [new Attribute(_AttributeOnClick, "CmdSession_Click(this),CmdBtnClickable_Click(this)")]);

        let DivWidgetRowHistory = new Div(undefined, "ul-widget__row-v2 p-relative");
        let DivWidgetImageHistory = new Div(undefined, "ul-widget6__pic");
        let ImageHistory = new Imagebox(undefined, "dist-assets/images/Nurse/Schedule.png", undefined, "History Image");

        let DivWidgetContentHistory = new Div("HistoryHeading", "ul-widget__content-v2");
        let HeadingHistory = new Heading4("Session", [new Attribute(_AttributeClass, "heading mt-3")]);

        DivWidgetImageHistory.appendChild(ImageHistory);
        DivWidgetRowHistory.appendChild(DivWidgetImageHistory);
        DivHistoryCardBody.appendChild(DivWidgetRowHistory);

        DivWidgetContentHistory.appendChild(HeadingHistory);
        DivWidgetRowHistory.appendChild(DivWidgetContentHistory);

        DivHistory.appendChild(DivHistoryCardBody);
        SpanHistory.appendChild(DivHistory);

        RowCellSiteDocument.appendChild(SpanHistory);
        DivRowMainButtonBar.appendChild(RowCellSiteDocument);

        //////////////////////////////////////////
        let RowCellSiteDoc = Div(undefined, "col-lg-2 col-3 pd-lr-5");

        let SpanAllergies = new Span(undefined, undefined, "c-pointer");
        let DivAllergies = new Div(undefined, "card mb-4 o-hidden");
        let DivAllergiesCardBody = new Div("InvoiceCard", "card-body", [new Attribute(_AttributeOnClick, "CmdPrescription_Click(this),CmdBtnClickable_Click(this)")]);

        let DivWidgetRowAllergies = new Div(undefined, "ul-widget__row-v2 p-relative");
        let DivWidgetImageAllergies = new Div(undefined, "ul-widget6__pic");
        let ImageAllergies = new Imagebox(undefined, "dist-assets/images/Nurse/Pharmacy.png", undefined, "Allergies Image");

        let DivWidgetContentAllergies = new Div("AllergiesHeading", "ul-widget__content-v2");
        let HeadingAllergies = new Heading4("Pharmacy", [new Attribute(_AttributeClass, "heading mt-3")]);

        DivWidgetImageAllergies.appendChild(ImageAllergies);
        DivWidgetRowAllergies.appendChild(DivWidgetImageAllergies);
        DivAllergiesCardBody.appendChild(DivWidgetRowAllergies);

        DivWidgetContentAllergies.appendChild(HeadingAllergies);
        DivWidgetRowAllergies.appendChild(DivWidgetContentAllergies);

        DivAllergies.appendChild(DivAllergiesCardBody);
        SpanAllergies.appendChild(DivAllergies);

        RowCellSiteDoc.appendChild(SpanAllergies);
        DivRowMainButtonBar.appendChild(RowCellSiteDoc);

        DivRowMainButtonBar.appendChild(new Div(undefined, "col-lg-2 pd-lr-5"));
        /////////////////////////////////////////

        BindView(Container, DivRowMainButtonBar);
    }
}

function Profile()
{
    this.Render = function (Container)
    {
        let CardProfile = new Div(undefined, "card");
        let CardBodyEditProfile = new Div(undefined, "card-body");
        let UserProfile = new Div(undefined, "user-profile mb-4");
        let WidgetProfileCard = new Div(undefined, "ul-widget-card__user-info");
        let UserFullName = new Paragraph(undefined, [new Attribute(_AttributeClass, "m-0 text-24"), new Attribute(_AttributeId, "UserFullName")]);
        let UserAge = new Paragraph(undefined, [new Attribute(_AttributeClass, "text-muted m-0"), new Attribute(_AttributeId, "UserNIC")]);
        let UserGender = new Paragraph(undefined, [new Attribute(_AttributeClass, "text-muted m-0"), new Attribute(_AttributeId, "UserGender")]);
        WidgetProfileCard.appendChild(UserFullName);
        WidgetProfileCard.appendChild(UserAge);
        WidgetProfileCard.appendChild(UserGender);
        UserProfile.appendChild(WidgetProfileCard);
        CardBodyEditProfile.appendChild(UserProfile);
        CardProfile.appendChild(CardBodyEditProfile);

        let DivProfile = new Div("DependentDetails", undefined);

        CardBodyEditProfile.appendChild(DivProfile);

        BindView(Container, CardProfile);
    }
}

function AboutUs()
{
    this.Render = function (Container)
    {
        let CardProfile = new Div(undefined, "card");
        let CardBodyEditProfile = new Div(undefined, "card-body");
        let UserProfile = new Div(undefined, "user-profile mb-4");
        let WidgetProfileCard = new Div(undefined, "ul-widget-card__user-info");
        let UserFullName = new Paragraph(undefined, [new Attribute(_AttributeClass, "m-0 text-24"), new Attribute(_AttributeId, "UserFullName")]);
        let UserAge = new Paragraph(undefined, [new Attribute(_AttributeClass, "text-muted m-0"), new Attribute(_AttributeId, "UserAge")]);
        let UserGender = new Paragraph(undefined, [new Attribute(_AttributeClass, "text-muted m-0"), new Attribute(_AttributeId, "UserGender")]);
        WidgetProfileCard.appendChild(UserFullName);
        WidgetProfileCard.appendChild(UserAge);
        WidgetProfileCard.appendChild(UserGender);
        UserProfile.appendChild(WidgetProfileCard);
        CardBodyEditProfile.appendChild(UserProfile);
        CardProfile.appendChild(CardBodyEditProfile);

        let AboutUsDiv = new Div("DependentDetails", undefined);

        CardBodyEditProfile.appendChild(AboutUsDiv);

        BindView(Container, CardProfile);
    }
}


/*=================================
         Patient UIs
 =================================*/

function PatientSearch()
{
    this.Render = function (Container)
    {
        let CardPatient = new Div(undefined, "card text-left");

        let CardBodyPatient = new Div(undefined, "card-body");

        let HeadingSearchPatient = new Heading4("Patient Search", [new Attribute(_AttributeClass, "card-title mb-3 text-center")]);
        CardBodyPatient.appendChild(HeadingSearchPatient);

        let RowUploadPatientPrescription = new Div(undefined, "row");

        RowUploadPatientPrescription.appendChild(new Div(undefined, "col-lg-2"));

        let ColSub0UploadPatientPrescription = new Div(undefined, "col-lg-8");

        RowUploadPatientPrescription.appendChild(ColSub0UploadPatientPrescription);
        CardBodyPatient.appendChild(RowUploadPatientPrescription);

        let FormPatientSearch = new Form(undefined);

        let FormRow0PatientSearch = new Div(undefined, "form-group row mt-3");

        let PatientDivFormRow = new Div(undefined, "col-sm-6 col-12 mt-2");
        PatientDivFormRow.appendChild(new Label(undefined, "Patient NIC", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPatientNIC")]));
        PatientDivFormRow.appendChild(new Textbox("TxtPatientNIC", "form-control form-control-rounded", [new Attribute(_AttributeType, "text"), new Attribute(_AttributeOnBlur, "TxtPatientNIC")]));
        FormRow0PatientSearch.appendChild(PatientDivFormRow);

        let DivFormRowPatient = new Div(undefined, "col-sm-6 col-12 mt-2");
        DivFormRowPatient.appendChild(new Label(undefined, "Patient Birth Date", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPatientDateBirth")]));
        DivFormRowPatient.appendChild(new Textbox("TxtPatientDateBirth", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        FormRow0PatientSearch.appendChild(DivFormRowPatient);
        FormPatientSearch.appendChild(FormRow0PatientSearch);

        let DivFormPatient = new Div(undefined, "col-sm-6 col-12 mt-2");
        DivFormPatient.appendChild(new Label(undefined, "Patient Mobile Number", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPatientMobileNumber")]));
        DivFormPatient.appendChild(new Numberbox("TxtPatientMobileNumber", "form-control form-control-rounded", [new Attribute(_AttributeOnKeyDown, "javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))")]));
        FormRow0PatientSearch.appendChild(DivFormPatient);

        let DivFormRowHealthID = new Div(undefined, "col-sm-6 col-12 mt-2");
        DivFormRowHealthID.appendChild(new Label(undefined, "Patient HealthID", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPatientHealthID")]));
        DivFormRowHealthID.appendChild(new Textbox("TxtPatientHealthID", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        FormRow0PatientSearch.appendChild(DivFormRowHealthID);
        FormPatientSearch.appendChild(FormRow0PatientSearch);

        //let DivFormRowPatientName = new Div(undefined, "col-sm-12 col-12 mt-1");
        //DivFormRowPatientName.appendChild(new Label(undefined, "Patient Name", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPatientName")]));
        //DivFormRowPatientName.appendChild(new Textbox("TxtPatientName", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        //FormRow0PatientSearch.appendChild(DivFormRowPatientName);
        //FormPatientSearch.appendChild(FormRow0PatientSearch);

        let FormRow3PatientSearchLOad = new Div(undefined, "form-group row ");

        let DivFormRow3Load = new Div(undefined, "col-sm-12 col-12 mt-2");
        DivFormRow3Load.appendChild(new Button("CmdSearch", "Search", "btn btn-info btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdSearchPatient_Click()")]));
        FormRow3PatientSearchLOad.appendChild(DivFormRow3Load);
        FormPatientSearch.appendChild(FormRow3PatientSearchLOad);

        let FormRow3PatientSearch = new Div(undefined, "form-group row ");

        let DivFormRow3 = new Div(undefined, "col-sm-12 col-12 mt-1");
        DivFormRow3.appendChild(new Button("CmdLoadCamera", "Scan HealthID", "btn btn-warning btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdLoadCamera_Click()")]));
        FormRow3PatientSearch.appendChild(DivFormRow3);
        let DivFormQrReader = new Div("reader", "mb -2  col-sm-6 mx-auto mb-3");
        FormRow3PatientSearch.appendChild(DivFormQrReader);

        //FormRow3PatientSearch.appendChild(DivFormRow3);       
        FormPatientSearch.appendChild(FormRow3PatientSearch);

        let FormRow3PatientSearchClear = new Div(undefined, "form-group row ");

        let DivFormRow3Clear = new Div(undefined, "col-sm-12 col-12");
        DivFormRow3Clear.appendChild(new Button("CmdClear", "Clear", "btn btn-info btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdClearSearchPatient_Click()")]));
        FormRow3PatientSearchClear.appendChild(DivFormRow3Clear);
        FormPatientSearch.appendChild(FormRow3PatientSearchClear);

        ColSub0UploadPatientPrescription.appendChild(FormPatientSearch);

        CardBodyPatient.appendChild(new Div(undefined, "col-lg-2"));

        CardPatient.appendChild(CardBodyPatient);

        BindView(Container, CardPatient);
    }
}

function PatientTable()
{
    this.Render = function (Container, Data)
    {
        let Headers = ["Name", "NIC", "Mobile", "Gender", "Dep", "Action"];
        let CardPrescriptions = new Div(undefined, "card text-left");
        let CardBodyPrescriptions = new Div(undefined, "card-body");

        let HeadingPrescriptions = new Heading4("Patient Data", undefined);
        let ImagePrescriptions = new Imagebox(undefined, "images/add-icon.png", undefined, "Add Icon Image", [new Attribute(_AttributeClass, "TopIcons pres-img"), new Attribute(_AttributeOnClick, "AddPatient_Click()")]);
        HeadingPrescriptions.appendChild(ImagePrescriptions);
        CardBodyPrescriptions.appendChild(HeadingPrescriptions);

        let DivTablePrescriptions = new Div(undefined, "table-responsive");
        DivTablePrescriptions.appendChild(new TableView("TableSelectPatient", "table table-striped", Headers, Data, undefined));

        CardBodyPrescriptions.appendChild(DivTablePrescriptions);

        CardPrescriptions.appendChild(CardBodyPrescriptions);

        BindView(Container, CardPrescriptions);
    }
}

function NavEditPatient()
{
    this.Render = function (Container)
    {
        let CardEditPatient = new Div(undefined, "card text-left");
        let CardBodyEditPatient = new Div(undefined, "card-body");
        let HeadingEditPatient = new Heading4("Edit Patient", [new Attribute(_AttributeClass, "card-title mb-3"), new Attribute(_AttributeId, "TxtPatientCardHeading")]);
        CardBodyEditPatient.appendChild(HeadingEditPatient);

        let NavEditPatient = new Nav();
        let DivNavEditPatient = new Div("nav-tab", "nav nav-tabs", [new Attribute(_AttributeRole, "tablist")]);
        DivNavEditPatient.appendChild(new Hyperlink("nav-primary-tab", "#nav-primary", "Primary", "nav-item nav-link ", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-primary"), new Attribute(_AttributeAreaSelected, "true"), new Attribute(_AttributeOnClick, "CmdPrimaryPatient_Click(this)")]));
        // DivNavEditPatient.appendChild(new Hyperlink("nav-dependant-tab", "#nav-dependant", "Family Members", "nav-item nav-link", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-dependant"), new Attribute(_AttributeAreaSelected, "false")]));
        NavEditPatient.appendChild(DivNavEditPatient);
        CardBodyEditPatient.appendChild(NavEditPatient);

        let DivContentNavEditPatient = new Div("na-tabContent", "tab-content ul-tab__content");
        DivContentNavEditPatient.appendChild(new Div("nav-primary", "tab-pane fade", [new Attribute(_AttributeRole, "tabpanel"), new Attribute(_AttributeAreaLabledBy, "nav-primary-tab")]));
        let DivFamily = new Div("nav-dependant", "tab-pane fade", [new Attribute(_AttributeRole, "tabpanel"), new Attribute(_AttributeAreaLabledBy, "nav-dependant-tab")]);
        DivFamily.appendChild(new Heading4("No Data Available", [new Attribute(_AttributeClass, "card-title mb-3")]));
        DivContentNavEditPatient.appendChild(DivFamily);
        DivContentNavEditPatient.appendChild(new Div("nav-child", "tab-pane fade", [new Attribute(_AttributeRole, "tabpanel"), new Attribute(_AttributeAreaLabledBy, "nav-child-tab")]));
        CardBodyEditPatient.appendChild(DivContentNavEditPatient);

        CardEditPatient.appendChild(CardBodyEditPatient);

        BindView(Container, CardEditPatient);
    }
}

function EditPatient()
{
    this.Render = function (Container)
    {
        let FormEditPatient = new Form(undefined);

        let FormGroupRowPatient = new Div(undefined, "form-group row");
        let DivFormGroupRowPatient = new Div(undefined, "col-lg-12 col-12");
        let LabelEditNIC = new Label(undefined, "Registered NIC Number", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditNicNumber")]);
        let InputEditNIC = new Textbox("TxtEditNicNumber", "form-control form-control-rounded patient-form", [new Attribute(_AttributeType, "text")]);
        DivFormGroupRowPatient.appendChild(LabelEditNIC);
        DivFormGroupRowPatient.appendChild(InputEditNIC);
        FormGroupRowPatient.appendChild(DivFormGroupRowPatient);
        FormEditPatient.appendChild(FormGroupRowPatient);

        let FormGroupRowMobileNo = new Div(undefined, "form-group row");
        let DivFormGroupRowMobileNumber = new Div(undefined, "col-lg-12 col-12");
        let LabelEditMobileNumber = new Label(undefined, "Enter Mobile Number", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditMobileNumber"), new Attribute(_AttributeOnChange, "ValidateMobileNumber(document.getElementById('TxtEditMobileNumber'))")]);
        let InputEditMobileNumber = new Textbox("TxtEditMobileNumber", "form-control form-control-rounded patient-form", [new Attribute(_AttributeType, "text")]);
        DivFormGroupRowMobileNumber.appendChild(LabelEditMobileNumber);
        DivFormGroupRowMobileNumber.appendChild(InputEditMobileNumber);
        FormGroupRowMobileNo.appendChild(DivFormGroupRowMobileNumber);
        FormEditPatient.appendChild(FormGroupRowMobileNo);

        let FormGroupRowPatientTtitle = new Div(undefined, "form-group row");
        let DivFormGroupRowPatientTtitle = new Div(undefined, "col-lg-4 col-4");
        let SelectTitle = new Select("DrpEditPatientTtitle", [new Attribute(_AttributeClass, "form-control form-control-rounded")]);
        SelectTitle.appendChild(new SelectItem("Mr.", "Mr.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Mrs.", "Mrs.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Ms.", "Ms.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Miss.", "Miss.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Baby.", "Baby.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Dr.", "Dr.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Rev.", "Rev.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DivFormGroupRowPatientTtitle.appendChild(SelectTitle);
        FormGroupRowPatientTtitle.appendChild(DivFormGroupRowPatientTtitle);

        let DivFormGroupRow2SubPatient = new Div(undefined, "col-lg-4 col-4");
        let LabelGenderMale = new Label(undefined, undefined, "radio radio-primary");
        LabelGenderMale.appendChild(new RadioButton("RadioEditMale", "RadioEdit", [new Attribute(_AttributeValue, "Male")]));
        LabelGenderMale.appendChild(new Span(undefined, "Male"));
        LabelGenderMale.appendChild(new Span(undefined, undefined, "checkmark"));
        DivFormGroupRow2SubPatient.appendChild(LabelGenderMale);
        FormGroupRowPatientTtitle.appendChild(DivFormGroupRow2SubPatient);

        let DivFormGroupRow2Female = new Div(undefined, "col-lg-4 col-4");
        let LabelGenderFemale = new Label(undefined, undefined, "radio radio-primary");
        LabelGenderFemale.appendChild(new RadioButton("RadioEditFemale", "RadioEdit", [new Attribute(_AttributeValue, "Male")]));
        LabelGenderFemale.appendChild(new Span(undefined, "Female"));
        LabelGenderFemale.appendChild(new Span(undefined, undefined, "checkmark"));
        DivFormGroupRow2Sub0.appendChild(LabelGenderFemale);
        FormGroupRowPatientTtitle.appendChild(DivFormGroupRow2Female);
        FormEditPatient.appendChild(FormGroupRow2);

        let FormGroupRowFirst = new Div(undefined, "form-group row");
        let DivFormGroupRowName = new Div(undefined, "col-lg-12 col-12");
        let LabelEditFirstName = new Label(undefined, "Enter First Name", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditFirstName")]);
        let InputEditFirstName = new Textbox("TxtEditFirstName", "form-control form-control-rounded patient-form", [new Attribute(_AttributeType, "text")]);
        DivFormGroupRowName.appendChild(LabelEditFirstName);
        DivFormGroupRowName.appendChild(InputEditFirstName);
        FormGroupRowFirst.appendChild(DivFormGroupRowName);
        FormEditPatient.appendChild(FormGroupRowFirst);

        let FormGroupRowLastName = new Div(undefined, "form-group row");
        let DivFormGroupRowLastName = new Div(undefined, "col-lg-12 col-12");
        let LabelEditLastName = new Label(undefined, "Enter Last Name", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditLastName")]);
        let InputEditLastName = new Textbox("TxtEditLastName", "form-control form-control-rounded patient-form", [new Attribute(_AttributeType, "text")]);
        DivFormGroupRowLastName.appendChild(LabelEditLastName);
        DivFormGroupRowLastName.appendChild(InputEditLastName);
        FormGroupRowLastName.appendChild(DivFormGroupRowLastName);
        FormEditPatient.appendChild(FormGroupRowLastName);

        let FormGroupRowDOB = new Div(undefined, "form-group row");
        let DivFormGroupRowDOB = new Div(undefined, "col-lg-12 col-12");
        let LabelEditDateBirth = new Label(undefined, "Enter Date of Birth", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditDateBirth")]);
        let InputEditDateBirth = new Textbox("TxtEditDateBirth", "form-control form-control-rounded Date-Picker patient-form", [new Attribute(_AttributeType, "text")]);
        DivFormGroupRowDOB.appendChild(LabelEditDateBirth);
        DivFormGroupRowDOB.appendChild(InputEditDateBirth);
        FormGroupRowDOB.appendChild(DivFormGroupRowDOB);
        FormEditPatient.appendChild(FormGroupRowDOB);

        BindView(Container, FormEditPatient);
    }
}

function AddPatient()
{
    this.Render = function (Container)
    {
        let FormEditPatient = new Form(undefined);

        let FormGroupRowPatient = new Div(undefined, "form-group row");
        let DivFormGroupRowPatient = new Div(undefined, "col-lg-4 col-12");
        DivFormGroupRowPatient.appendChild(new Label(undefined, "NIC Number", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtAddId")]));
        DivFormGroupRowPatient.appendChild(new Textbox("TxtAddId", "form-control form-control-rounded Add-Patient patient-form", [new Attribute(_AttributeType, "text"), new Attribute(_AttributeOnBlur, "CmdGetDOBandGender()")]));
        FormGroupRowPatient.appendChild(DivFormGroupRowPatient);

        let DivFormGroupRowPassport = new Div(undefined, "col-lg-2 col-4 Add-Patient-Div");
        let LabelPassport = new Label(undefined, undefined, "radio radio-primary mt-4 ");
        LabelPassport.appendChild(new RadioButton("RadioAddPassport", "RadioEdit", [new Attribute(_AttributeValue, "Passport")]));
        LabelPassport.appendChild(new Span(undefined, "Passport"));
        LabelPassport.appendChild(new Span(undefined, undefined, "checkmark"));
        DivFormGroupRowPassport.appendChild(LabelPassport);
        FormGroupRowPatient.appendChild(DivFormGroupRowPassport);

        let DivFormGroupRowRadioAddHealthId = new Div(undefined, "col-lg-2 col-4 Add-Patient-Div");
        let LabelHealthId = new Label(undefined, undefined, "radio radio-primary mt-4");
        LabelHealthId.appendChild(new RadioButton("RadioAddHealthId", "RadioEdit", [new Attribute(_AttributeValue, "Helath Id")]));
        LabelHealthId.appendChild(new Span(undefined, "Health Id"));
        LabelHealthId.appendChild(new Span(undefined, undefined, "checkmark"));
        DivFormGroupRowRadioAddHealthId.appendChild(LabelHealthId);
        FormGroupRowPatient.appendChild(DivFormGroupRowRadioAddHealthId);

        let DivFormGroupRowTxtPatientHealthId = new Div(undefined, "col-lg-2 col-4");
        DivFormGroupRowTxtPatientHealthId.appendChild(new Span("TxtPatientHealthId", undefined, "badge badge-pill badge-outline-danger p-2 mt-4"));
        FormGroupRowPatient.appendChild(DivFormGroupRowTxtPatientHealthId);
        FormEditPatient.appendChild(FormGroupRowPatient);

        let FormGroupRowMobile = new Div(undefined, "form-group row");
        let DivFormGroupRowMobileNumber = new Div(undefined, "col-lg-4 col-12");
        DivFormGroupRowMobileNumber.appendChild(new Label(undefined, "Mobile Number", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditMobileNumber")]));
        DivFormGroupRowMobileNumber.appendChild(new Textbox("TxtAddMobileNumber", "form-control form-control-rounded Add-Patient patient-form", [new Attribute(_AttributeType, "text")]));
        FormGroupRowMobile.appendChild(DivFormGroupRowMobileNumber);
        FormEditPatient.appendChild(FormGroupRowMobile);


        let FormGroupRowDOB = new Div(undefined, "form-group row");
        let DivFormGroupRowDOB = new Div(undefined, "col-lg-4 col-4");
        DivFormGroupRowDOB.appendChild(new Label(undefined, "Date of Birth", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditDateBirth")]));
        DivFormGroupRowDOB.appendChild(new Textbox("TxtAddDateBirth", "form-control form-control-rounded Add-Patient patient-form Date-Picker", [new Attribute(_AttributeType, "text")]));
        FormGroupRowDOB.appendChild(DivFormGroupRowDOB);

        let DivFormGroupRowRadioGender = new Div(undefined, "col-lg-2 col-4");
        let LabelGenderMale = new Label(undefined, undefined, "radio radio-primary mt-4 Add-Patient");
        LabelGenderMale.appendChild(new RadioButton("ChkPatientMale", "RadioGender", [new Attribute(_AttributeValue, "MALE")]));
        LabelGenderMale.appendChild(new Span(undefined, "Male"));
        LabelGenderMale.appendChild(new Span(undefined, undefined, "checkmark"));
        DivFormGroupRowRadioGender.appendChild(LabelGenderMale);
        FormGroupRowDOB.appendChild(DivFormGroupRowRadioGender);

        let DivFormGroupRowRadioGenderFemale = new Div(undefined, "col-lg-2 col-4");
        let LabelGenderFemale = new Label(undefined, undefined, "radio radio-primary mt-4 Add-Patient");
        LabelGenderFemale.appendChild(new RadioButton("ChkPatientFemale", "RadioGender", [new Attribute(_AttributeValue, "FEMALE")]));
        LabelGenderFemale.appendChild(new Span(undefined, "Female"));
        LabelGenderFemale.appendChild(new Span(undefined, undefined, "checkmark"));
        DivFormGroupRowRadioGenderFemale.appendChild(LabelGenderFemale);
        FormGroupRowDOB.appendChild(DivFormGroupRowRadioGenderFemale);
        FormEditPatient.appendChild(FormGroupRowDOB);

        let FormGroupRowTitle = new Div(undefined, "form-group row");

        let DivFormGroupRow42 = new Div(undefined, "col-lg-4 col-6");
        DivFormGroupRow42.appendChild(new Label(undefined, "Title", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "Title")]));
        let SelectTitle = new Select("DrpAddPatientTtitle", [new Attribute(_AttributeClass, "form-control form-control-rounded ")]);
        SelectTitle.appendChild(new SelectItem("Mr.", "Mr.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Mrs.", "Mrs.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Ms.", "Ms.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Miss.", "Miss.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Baby.", "Baby.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Dr.", "Dr.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectTitle.appendChild(new SelectItem("Rev.", "Rev.", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DivFormGroupRow42.appendChild(SelectTitle);
        FormGroupRowTitle.appendChild(DivFormGroupRow42);

        let DivFormGroupRowFirstName = new Div(undefined, "col-lg-4 col-6");
        DivFormGroupRowFirstName.appendChild(new Label(undefined, "First Name", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditFirstName")]));
        DivFormGroupRowFirstName.appendChild(new Textbox("TxtAddFirstName", "form-control form-control-rounded Add-Patient patient-form", [new Attribute(_AttributeType, "text")]));
        FormGroupRowTitle.appendChild(DivFormGroupRowFirstName);

        let DivFormGroupRowLastName = new Div(undefined, "col-lg-4 col-6");
        DivFormGroupRowLastName.appendChild(new Label(undefined, "Last Name", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtEditLastName")]));
        DivFormGroupRowLastName.appendChild(new Textbox("TxtAddLastName", "form-control form-control-rounded Add-Patient patient-form", [new Attribute(_AttributeType, "text")]));
        FormGroupRowTitle.appendChild(DivFormGroupRowLastName);
        FormEditPatient.appendChild(FormGroupRowTitle);

        let FormGroupRowAddress = new Div(undefined, "form-group row");
        let DivFormGroupRowAddress = new Div(undefined, "col-lg-12 col-12");
        DivFormGroupRowAddress.appendChild(new Label(undefined, "Address", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtAddAddress")]));
        DivFormGroupRowAddress.appendChild(new Textbox("TxtAddAddress", "form-control form-control-rounded Add-Patient patient-form", [new Attribute(_AttributeType, "text")]));
        FormGroupRowAddress.appendChild(DivFormGroupRowAddress);
        FormEditPatient.appendChild(FormGroupRowAddress);

        let FormGroupRowOccupation = new Div(undefined, "form-group row");
        let DivFormGroupRow6 = new Div(undefined, "col-lg-6 col-12");
        DivFormGroupRow6.appendChild(new Label(undefined, "Occupation", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtAddOccupation")]));
        DivFormGroupRow6.appendChild(new Textbox("TxtAddOccupation", "form-control form-control-rounded Add-Patient patient-form", [new Attribute(_AttributeType, "text")]));
        FormGroupRowOccupation.appendChild(DivFormGroupRow6);
        FormEditPatient.appendChild(FormGroupRowOccupation);

        let DivFormGroupRowMarialStatus = new Div(undefined, "col-lg-6 col-12");
        DivFormGroupRowMarialStatus.appendChild(new Label(undefined, "Marital Status", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "MaritalStatus")]));
        let SelectMaritalStatus = new Select("DrpAddPatientMaritalStatus", [new Attribute(_AttributeClass, "form-control form-control-rounded")]);
        SelectMaritalStatus.appendChild(new SelectItem("Select Status", "Select", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectMaritalStatus.appendChild(new SelectItem("Married", "Married", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectMaritalStatus.appendChild(new SelectItem("Widowed", "Widowed", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectMaritalStatus.appendChild(new SelectItem("Separated", "Separated", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectMaritalStatus.appendChild(new SelectItem("Divorced.", "Divorced", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        SelectMaritalStatus.appendChild(new SelectItem("Single.", "Single", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DivFormGroupRowMarialStatus.appendChild(SelectMaritalStatus);
        FormGroupRowOccupation.appendChild(DivFormGroupRowMarialStatus);
        FormEditPatient.appendChild(FormGroupRowOccupation);

        let FormGroupRowSave = new Div(undefined, "modal-footer row mt-4");
        FormGroupRowSave.appendChild(new Button("BtnSavePatient", "Save", "btn btn-rounded btn-info  mt-2", [new Attribute(_AttributeOnClick, "SavePatient_Click()")]));
        FormGroupRowSave.appendChild(new Button("BtnCancelPatient", "Cancel", "btn btn-rounded btn-warning mt-2", [new Attribute(_AttributeOnClick, "CmdAddPatientCancel_Click()")]));
        FormEditPatient.appendChild(FormGroupRowSave);

        BindView(Container, FormEditPatient);
    }
}


/*=================================
            Session UIs
 =================================*/

function Session()
{
    this.Render = function (Container)
    {
        let CardSession = new Div(undefined, "card text-left");
        let CardBodySession = new Div(undefined, "card-body");

        let HeadingSession = new Heading4("Session Management", [new Attribute(_AttributeClass, "card-title mb-3 text-center")]);
        CardBodySession.appendChild(HeadingSession);

        let RowSub0Session = new Div(undefined, "row");

        RowSub0Session.appendChild(new Div(undefined, "col-lg-2"));

        let ColSub0Session = new Div(undefined, "col-lg-8 text-center");

        RowSub0Session.appendChild(ColSub0Session);
        CardBodySession.appendChild(RowSub0Session);

        let FormSession = new Form(undefined);

        let FormRow0Session = new Div(undefined, "form-group row");

        FormRow0Session.appendChild(new Div(undefined, "col-sm-4 col-2"));

        let DivFormSubRowSession = new Div(undefined, "col-sm-4 col-5");
        FormRow0Session.appendChild(DivFormSubRowSession);

        let DivFormSubRowNewSession = new Div(undefined, "col-sm-4 col-5");
        let ButtonSessionAddNew = new Button(undefined, "New Session", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdAddSession_Click()")]);
        DivFormSubRowNewSession.appendChild(ButtonSessionAddNew);
        FormRow0Session.appendChild(DivFormSubRowNewSession);

        FormSession.appendChild(FormRow0Session);

        let FormRowSession = new Div(undefined, "form-group row mt-3");
        let DivFormRowSession = new Div(undefined, "col-sm-12 col-12 text-left");
        let LabelSession = new Label(undefined, "Select Doctor", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "DrpAppoinments")]);
        let SelectSession = new Select("DrpSessionDoctor", [new Attribute(_AttributeClass, "form-control form-control-rounded select")]);
        SelectSession.appendChild(new SelectItem("Select Doctor", "0", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));

        DivFormRowSession.appendChild(LabelSession);
        DivFormRowSession.appendChild(SelectSession);
        FormRowSession.appendChild(DivFormRowSession);
        FormSession.appendChild(FormRowSession);

        let FormRowSessionNew = new Div(undefined, "form-group row");
        let DivFormRowNewSession = new Div(undefined, "col-sm-12 col-12");
        let ButtonSessionSearch = new Button(undefined, "Search", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdSessionSearch_Click()")]);

        DivFormRowNewSession.appendChild(ButtonSessionSearch);
        FormRowSessionNew.appendChild(DivFormRowNewSession);
        FormSession.appendChild(FormRowSessionNew);
        ColSub0Session.appendChild(FormSession);

        let RowNewSession = new Div(undefined, "row");
        let DivSessionNew = new Div(undefined, "col-lg-12");

        DivSessionNew.appendChild(new Div("DivSessionTable"));
        RowNewSession.appendChild(DivSessionNew);
        CardBodySession.appendChild(RowNewSession);
        CardSession.appendChild(CardBodySession);

        BindView(Container, CardSession);
    }
}

function DoctorSessionTable()
{
    this.Render = function (Container, Data)
    {
        let Headers = ["Date", "StartTime","EndTime", "Room", "Type", "Action"];

        let DivMain = new Div(undefined, "card-body");

        let DivTablePrescriptions = new Div(undefined, "table-responsive mt-4");
        DivTablePrescriptions.appendChild(new TableView("TableSession", "table table-striped", Headers, Data, undefined));

        DivMain.appendChild(DivTablePrescriptions);

        BindView(Container, DivMain);
    }
}

function AddNewSession()
{
    this.Render = function (Container)
    {
        let CardAddSession = new Div(undefined, "card text-left");
        let CardBodyAddSession = new Div(undefined, "card-body");

        let HeadingAddSession = new Heading4("Edit Session", [new Attribute(_AttributeClass, "card-title mb-3 text-center"), new Attribute(_AttributeId, "TxtSessionCardHeading")]);
        CardBodyAddSession.appendChild(HeadingAddSession);

        let RowSubAddSession = new Div(undefined, "row");
        RowSubAddSession.appendChild(new Div(undefined, "col-lg-2"));

        let ColSubAddSession = new Div(undefined, "col-lg-8 text-left");

        RowSubAddSession.appendChild(ColSubAddSession);
        CardBodyAddSession.appendChild(RowSubAddSession);

        let FormAddSession = new Form(undefined);

        let DivFormGroupRowRoom = new Div(undefined, "form-group row");
        let DivFormGroupRowRoomNumber = new Div(undefined, "col-lg-2 col-2");
        DivFormGroupRowRoomNumber.appendChild(new Label(undefined, "Room No",'ml-2', [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtSessionRoomNumber")]));
        DivFormGroupRowRoomNumber.appendChild(new Textbox("TxtSessionRoomNumber", "form-control form-control-rounded", [new Attribute(_AttributeOnInput, "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"), new Attribute(_AttributeMaxLength, "3")]));
        DivFormGroupRowRoom.appendChild(DivFormGroupRowRoomNumber);

        let DivFormGroupRowInstitute = new Div(undefined, "col-lg-3 col-3");
        DivFormGroupRowInstitute.appendChild(new Label(undefined, "Branch Name", 'ml-2', [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtSessionInstituteBranchId")]));
        let DrpSessionInstituteBranch = new Select("DrpSessionInstituteBranchId", [new Attribute(_AttributeClass, "form-control form-control-rounded")]);
        DrpSessionInstituteBranch.appendChild(new SelectItem("Select Branch", "0", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DivFormGroupRowInstitute.appendChild(DrpSessionInstituteBranch);
        DivFormGroupRowRoom.appendChild(DivFormGroupRowInstitute);

        let DivFormGroupRowSessionDate = new Div(undefined, "col-lg-4 col-4");
        DivFormGroupRowSessionDate.appendChild(new Label(undefined, "Session Date", 'ml-2', [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtSessionDate")]));
        DivFormGroupRowSessionDate.appendChild(new Textbox("TxtSessionDate", "form-control form-control-rounded Date-Picker", [new Attribute(_AttributeType, "text")]));
        DivFormGroupRowRoom.appendChild(DivFormGroupRowSessionDate);


        let DivFormGroupRowSessionType = new Div(undefined, "col-lg-3 col-3");
        DivFormGroupRowSessionType.appendChild(new Label(undefined, "Session Type", 'ml-2', [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtSessionType")]));
        let DrpSessionType = new Select("DrpSessionType", [new Attribute(_AttributeClass, "form-control form-control-rounded")]);
        DrpSessionType.appendChild(new SelectItem("Physical", "2", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DrpSessionType.appendChild(new SelectItem("Virtual", "1", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DrpSessionType.appendChild(new SelectItem("Both", "3", [new Attribute(_AttributeClass, "form-control form-control-rounded")]));
        DivFormGroupRowSessionType.appendChild(DrpSessionType);
        DivFormGroupRowRoom.appendChild(DivFormGroupRowSessionType);
        FormAddSession.appendChild(DivFormGroupRowRoom);

        let DivFormGroupRowStart = new Div(undefined, "form-group row");
        let DivFormGroupRowStartTime = new Div(undefined, "col-lg-6 col-6");
        DivFormGroupRowStartTime.appendChild(new Label(undefined, "Start Time", 'ml-2', [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtSessionStart")]));
        DivFormGroupRowStartTime.appendChild(new Textbox("TxtSessionStart", "form-control form-control-rounded Time-Picker z-1", [new Attribute(_AttributeType, "text")]));
        DivFormGroupRowStart.appendChild(DivFormGroupRowStartTime);

        let DivFormGroupRowEnd = new Div(undefined, "col-lg-6 col-6");
        DivFormGroupRowEnd.appendChild(new Label(undefined, "End Time", 'ml-2', [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtSessionEnd")]));
        DivFormGroupRowEnd.appendChild(new Textbox("TxtSessionEnd", "form-control form-control-rounded Time-Picker z-1", [new Attribute(_AttributeType, "text")]));
        DivFormGroupRowStart.appendChild(DivFormGroupRowEnd);
        FormAddSession.appendChild(DivFormGroupRowStart);

        let FormGroupRowSaveSession = new Div(undefined, "modal-footer row mt-4");
        FormGroupRowSaveSession.appendChild(new Button("BtnSaveSession", "Save", "btn btn-rounded btn-info  mt-2", [new Attribute(_AttributeOnClick, "CmdSaveSession_Click()")]));
        FormGroupRowSaveSession.appendChild(new Button("BtnCancelSession", "Cancel", "btn btn-rounded btn-warning  mt-2", [new Attribute(_AttributeOnClick, "CmdCancelSession_Click()")]));
        FormAddSession.appendChild(FormGroupRowSaveSession);
        ColSubAddSession.appendChild(FormAddSession);

        RowSubAddSession.appendChild(new Div(undefined, "col-lg-2"));
        CardAddSession.appendChild(CardBodyAddSession);

        BindView(Container, CardAddSession);
    }
}

function SessionTable()
{
    this.Render = function (Container)
    {
        let Headers = ["Date", "Time", "Gender", "Dep"];

        let CardSessionTable = new Div(undefined, "card text-left");
        let CardBodySessionTable = new Div(undefined, "card-body");

        let HeadingSessionTable = new Heading4("Patient Data", undefined);
        let ImageSessionTable = new Imagebox(undefined, "images/add-icon.png", undefined, "Add Icon Image", [new Attribute(_AttributeClass, "TopIcons pres-img"), new Attribute(_AttributeOnClick, "CmdPrescriptionUpload_Click()")]);
        HeadingSessionTable.appendChild(ImageSessionTable);
        CardBodySessionTable.appendChild(HeadingSessionTable);

        let DivSessionTable = new Div(undefined, "table-responsive");
        let Commands =
            [
                new DataGridCommand("Edit", "<i class='i-Edit'></i>", DataGridCommandType.Link, "btn btn-success btn-icon m-1", "RowReportsPreview_Click()", false),
                new DataGridCommand("Delete", "<i class='i-Delete-Window'></i>", DataGridCommandType.Link, "btn btn-danger btn-icon m-1", "RowReportsPreview_Click()", false)
            ];

        DivSessionTable.appendChild(new TableView("TableSelectPatient", "table table-striped", Headers, Data, Commands));

        CardBodySessionTable.appendChild(DivSessionTable);

        CardSessionTable.appendChild(CardBodySessionTable);

        BindView(Container, CardSessionTable);
    }
}


/*=================================
            Appoinment UIs
 =================================*/

function Appoinments()
{
    this.Render = function (Container)
    {
        let CardAppoinments = new Div(undefined, "card text-left");
        let CardBodyAppoinments = new Div(undefined, "card-body");

        let HeadingAppoinments = new Heading4("Appoinments", [new Attribute(_AttributeClass, "card-title mb-3 text-center")]);
        CardBodyAppoinments.appendChild(HeadingAppoinments);

        let RowSub0Appoinments = new Div(undefined, "row");

        RowSub0Appoinments.appendChild(new Div(undefined, "col-lg-2"));

        let ColSub0Appoinments = new Div(undefined, "col-lg-8 text-center");

        RowSub0Appoinments.appendChild(ColSub0Appoinments);
        CardBodyAppoinments.appendChild(RowSub0Appoinments);

        let FormAppoinments = new Form(undefined);

        let FormRow0Appoinment = new Div(undefined, "form-group row mt-3");
        let DivFormRowDoctor = new Div(undefined, "col-sm-12 col-12 text-left ");
        let LabelAppoinment = new Label(undefined, "Select Doctor", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "DrpAppoinmentsDoctor")]);
        let SelectAppoinment = new Select("DrpAppoinmentDoctor", [new Attribute(_AttributeClass, "form-control form-control-rounded select"), new Attribute(_AttributeOnChange, "GetDoctorSessionDataForAppoinment()")]);
        SelectAppoinment.appendChild(new SelectItem("Select Doctor", " ", [new Attribute(_AttributeClass, "form-control form-control-rounded appointment-class")]));
        DivFormRowDoctor.appendChild(LabelAppoinment);
        DivFormRowDoctor.appendChild(SelectAppoinment);
        FormRow0Appoinment.appendChild(DivFormRowDoctor);
        FormAppoinments.appendChild(FormRow0Appoinment);

        let FormRow1Appoinment = new Div(undefined, "form-group row mt-3");
        let DivFormRowSession = new Div(undefined, "col-sm-12 col-12 text-left ");
        let LabelAppoinmentSession = new Label(undefined, "Select Session", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "DrpSessionDateDoctor")]);
        let SelectAppoinmentSession = new Select("DrpSessionDateDoctor", [new Attribute(_AttributeClass, "form-control form-control-rounded select")]);
        SelectAppoinmentSession.appendChild(new SelectItem("Select Session", " ", [new Attribute(_AttributeClass, "form-control form-control-rounded appointment-class")]));
        DivFormRowSession.appendChild(LabelAppoinmentSession);
        DivFormRowSession.appendChild(SelectAppoinmentSession);
        FormRow1Appoinment.appendChild(DivFormRowSession);
        FormAppoinments.appendChild(FormRow1Appoinment);

        let FormRow3PatientSearch = new Div(undefined, "form-group row");
        let DivFormRowNext = new Div(undefined, "col-sm-12 col-12");
        let ButtonPatientSearch = new Button(undefined, "Next", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "SetAppoinmentToDoctor_Click()")]);
        DivFormRowNext.appendChild(ButtonPatientSearch);
        FormRow3PatientSearch.appendChild(DivFormRowNext);
        FormAppoinments.appendChild(FormRow3PatientSearch);

        ColSub0Appoinments.appendChild(FormAppoinments);

        CardBodyAppoinments.appendChild(new Div(undefined, "col-lg-2"));

        CardAppoinments.appendChild(CardBodyAppoinments);

        BindView(Container, CardAppoinments);
    }
}

function NewAppoinment()
{
    this.Render = function (Container)
    {
        let CardAddAppoinment = new Div(undefined, "card text-left");
        let CardBodyAddAppoinment = new Div(undefined, "card-body");

        CardBodyAddAppoinment.appendChild(new Heading4("Appointments", [new Attribute(_AttributeClass, "card-title mb-3 text-center")]));

        CardBodyAddAppoinment.appendChild(new Heading3(undefined, [new Attribute(_AttributeClass, "card-title mb-3 text-center"), new Attribute(_AttributeId, "TxtAppointmentsDetails")]));
        CardBodyAddAppoinment.appendChild(new Heading3(undefined, [new Attribute(_AttributeClass, "card-title mb-3 text-center"), new Attribute(_AttributeId, "TxtAppointmentsDetailsSession")]));
        CardBodyAddAppoinment.appendChild(new Heading3(undefined, [new Attribute(_AttributeClass, "card-title mb-3 text-center"), new Attribute(_AttributeId, "TxtAppointmentsDetailsPatient")]));
        CardBodyAddAppoinment.appendChild(new Heading3(undefined, [new Attribute(_AttributeClass, "card-title mb-3 text-center"), new Attribute(_AttributeId, "TxtAppointPaymentCheck")]));

        let DivMainRow = new Div(undefined, "row");
        // DivMainRow.appendChild(new Div(undefined, "col-lg-1"));

        let DivMainRowSubCel0 = new Div(undefined, "col-lg-12 mt-4");

        let FormGroupRowAvailable = new Div(undefined, "form-group row");
        FormGroupRowAvailable.appendChild(new Div(undefined, "col-lg-3"));

        let DivFormGroupRowCheckAppointment = new Div(undefined, "col-lg-3 text-center");
        DivFormGroupRowCheckAppointment.appendChild(new Label(undefined, "Paid Appoinment", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtAppoinmentNumber")]));
        DivFormGroupRowCheckAppointment.appendChild(new Checkbox("CheckAppoinmentNumber", undefined, [new Attribute(_AttributeOnClick, "CmdChkAppointment_Click()"), new Attribute(_AttributeClass, "form-control")]));

        let DivFormGroupRowAppointment = new Div(undefined, "col-lg-3");
        DivFormGroupRowAppointment.appendChild(new Label(undefined, "Available Appointment", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtAppoinmentNumber")]));
        DivFormGroupRowAppointment.appendChild(new Textbox("TxtAppoinmentNumber", "form-control form-control-rounded Time-Picker", [new Attribute(_AttributeOnInput, "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"), new Attribute(_AttributeMaxLength, "3")]));

        let DivFormGroupRowSaveAppointment = new Div("IdBtnAppointment", "col-lg-3");
        DivFormGroupRowSaveAppointment.appendChild(new Button("BtnSaveAppointment", "Save", "btn btn-rounded btn-info  mt-4 w-100", [new Attribute(_AttributeOnClick, "SaveAppointment_Click()")]));
        DivFormGroupRowSaveAppointment.appendChild(new Button("BtnNewAppointment", "+ New Appointment", "btn btn-rounded btn-info  mt-4 w-100", [new Attribute(_AttributeOnClick, "AddPatientAppointment_Click()"), new Attribute("style", "display: none;")]));

        FormGroupRowAvailable.appendChild(DivFormGroupRowCheckAppointment);
        FormGroupRowAvailable.appendChild(DivFormGroupRowAppointment);
        FormGroupRowAvailable.appendChild(DivFormGroupRowSaveAppointment);
        DivMainRowSubCel0.appendChild(FormGroupRowAvailable);
        DivMainRow.appendChild(DivMainRowSubCel0);
        FormGroupRowAvailable.appendChild(new Div(undefined, "col-lg-3"));

        let FormGroupRow0Table = new Div(undefined, "form-group row");
        FormGroupRow0Table.appendChild(new Div("DivAppointedPatientTable", "col-lg-12"));
        DivMainRowSubCel0.appendChild(FormGroupRow0Table);

        CardBodyAddAppoinment.appendChild(DivMainRow);
        CardAddAppoinment.appendChild(CardBodyAddAppoinment);

        BindView(Container, CardAddAppoinment);
    }
}

function VitalsEditor()
{
    this.Render = function (Container)
    {
        let CardAddAppoinment = new Div(undefined, "card text-left");
        let CardBodyAddAppoinment = new Div(undefined, "card-body");

        let FormGroupRowPatientVitals = new Div("PatientVitals", "form-group row ");
        let DivFormGroupRowAddAppoinment = new Div(undefined, "col-lg-12");

        let NavAddAppoinment = new Nav();
        let DivNavAddAppoinment = new Div("nav-tab", "nav nav-tabs", [new Attribute(_AttributeRole, "tablist")]);
        DivNavAddAppoinment.appendChild(new Hyperlink("nav-bmi-tab", "#nav-bmi", "BMI", "nav-item nav-link show", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-bmi"), new Attribute(_AttributeAreaSelected, "true")]));
        DivNavAddAppoinment.appendChild(new Hyperlink("nav-pressure-tab", "#nav-pressure", "Pressure", "nav-item nav-link", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-pressure"), new Attribute(_AttributeAreaSelected, "false")]));
        DivNavAddAppoinment.appendChild(new Hyperlink("nav-temp-tab", "#nav-temp", "Temp", "nav-item nav-link", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-temp"), new Attribute(_AttributeAreaSelected, "false")]));
        // DivNavAddAppoinment.appendChild(new Hyperlink("nav-file-upload-tab", "#nav-file-upload", "File Upload", "nav-item nav-link", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-file-upload"), new Attribute(_AttributeAreaSelected, "false")]));

        NavAddAppoinment.appendChild(DivNavAddAppoinment);
        DivFormGroupRow1.appendChild(NavAddAppoinment);

        let DivContentNavAddAppoinment = new Div("na-tabContent", "tab-content ul-tab__content");
        DivContentNavAddAppoinmentBMI = new Div("nav-bmi", "tab-pane fade", [new Attribute(_AttributeRole, "tabpanel"), new Attribute(_AttributeAreaLabledBy, "nav-bmi-tab")]);

        let FormGroupRow1BMI = new Div(undefined, "form-group row");
        FormGroupRow1BMI.appendChild(new Label(undefined, "Height(Cm)", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtBMIHeight")]));
        FormGroupRow1BMI.appendChild(new Textbox("TxtBMIHeight", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        DivContentNavAddAppoinmentBMI.appendChild(FormGroupRow1BMI);

        let FormGroupRow2BMI = new Div(undefined, "form-group row");
        FormGroupRow2BMI.appendChild(new Label(undefined, "Weight(Kg)", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtBMIWeight")]));
        FormGroupRow2BMI.appendChild(new Textbox("TxtBMIWeight", "form-control form-control-rounded", [new Attribute(_AttributeType, "text"), new Attribute(_AttributeOnChange, "BMICalculator()")]));
        DivContentNavAddAppoinmentBMI.appendChild(FormGroupRow2BMI);

        FormGroupRow2BMI.appendChild(new Heading3(undefined, [new Attribute(_AttributeClass, "mt-3 text-center"), new Attribute(_AttributeId, "TxtBMIValue")]));

        DivContentNavAddAppoinment.appendChild(DivContentNavAddAppoinmentBMI);

        DivContentNavAddAppoinmentPressure = new Div("nav-pressure", "tab-pane fade", [new Attribute(_AttributeRole, "tabpanel"), new Attribute(_AttributeAreaLabledBy, "nav-pressure-tab")]);

        let FormGroupRow1Pressure = new Div(undefined, "form-group row");
        FormGroupRow1Pressure.appendChild(new Label(undefined, "BP Systolic", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPressureBp")]));
        FormGroupRow1Pressure.appendChild(new Textbox("TxtPressureBpSystolic", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        DivContentNavAddAppoinmentPressure.appendChild(FormGroupRow1Pressure);

        let FormGroupRow2Pressure = new Div(undefined, "form-group row");
        FormGroupRow2Pressure.appendChild(new Label(undefined, "BP Diastolic", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPressureBp")]));
        FormGroupRow2Pressure.appendChild(new Textbox("TxtPressureBpDiastolic", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        DivContentNavAddAppoinmentPressure.appendChild(FormGroupRow2Pressure);

        let FormGroupRow3Pressure = new Div(undefined, "form-group row");
        FormGroupRow3Pressure.appendChild(new Label(undefined, "Pulse", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPressurePulse")]));
        FormGroupRow3Pressure.appendChild(new Textbox("TxtPressurePulse", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        DivContentNavAddAppoinmentPressure.appendChild(FormGroupRow3Pressure);

        DivContentNavAddAppoinment.appendChild(DivContentNavAddAppoinmentPressure);

        DivContentNavAddAppoinmentTemp = new Div("nav-temp", "tab-pane fade", [new Attribute(_AttributeRole, "tabpanel"), new Attribute(_AttributeAreaLabledBy, "nav-temp-tab")]);
        let FormGroupRow1Temp = new Div(undefined, "form-group row");
        FormGroupRow1Temp.appendChild(new Label(undefined, "Temperature(F)", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPressureTemp")]));
        FormGroupRow1Temp.appendChild(new Textbox("TxtPressureTemp", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
        DivContentNavAddAppoinmentTemp.appendChild(FormGroupRow1Temp);
        DivContentNavAddAppoinment.appendChild(DivContentNavAddAppoinmentTemp);

        DivFormGroupRowAddAppoinment.appendChild(DivContentNavAddAppoinment);

        FormGroupRowPatientVitals.appendChild(DivFormGroupRowAddAppoinment);
        CardBodyAddAppoinment.appendChild(FormGroupRowPatientVitals);

        let FormGroupRowAppointment = new Div(undefined, "modal-footer row mt-4");
        FormGroupRowAppointment.appendChild(new Button("BtnSaveAppointment", "Save", "btn btn-rounded btn-info  mt-2", [new Attribute(_AttributeOnClick, "SavePatientAnalytics()")]));
        FormGroupRowAppointment.appendChild(new Button("BtnCancelSession", "Cancel", "btn btn-rounded btn-warning  mt-2", [new Attribute(_AttributeOnClick, "CmdCancelSession_Click()")]));
        CardBodyAddAppoinment.appendChild(FormGroupRowAppointment);

        CardBodyAddAppoinment.appendChild(new Div(undefined, "col-lg-1"));

        CardAddAppoinment.appendChild(CardBodyAddAppoinment);

        BindView(Container, CardAddAppoinment);
    }
}


function DocumentUploader()
{
    this.Render = function (Container)
    {
        let CardAddAppoinment = new Div(undefined, "card text-left");
        let CardBodyAddAppoinment = new Div(undefined, "card-body");

        let FormGroupRowPatientVitals = new Div("PatientVitals", "form-group row");
        let DivFormGroupRowPatientVitals = new Div(undefined, "col-lg-12");
      
        let FormRow1PrescriptionUpload = new Div(undefined, "form-group row mt-3");
        let DivFormRowUploader = new Div(undefined, "col-sm-8 col-8");
        let InputPrescriptionFileName = new FileUpload("FilePrescriptionChoosen", [new Attribute(_AttributeClass, "form-control form-control-rounded"), new Attribute(_AttributeOnChange, "FileChoosenValidate('FilePrescriptionChoosen')"), new Attribute(_AttributeHidden, "hidden")]);
        let SpanPrescriptionFileName = new Span("SpanPrescriptionFile", "No File Selected", "form-control form-control-rounded");

        DivFormRowUploader.appendChild(InputPrescriptionFileName);
        DivFormRowUploader.appendChild(SpanPrescriptionFileName);
        FormRow1PrescriptionUpload.appendChild(DivFormRowUploader);

        let DivFormRowDocumentUploader = new Div(undefined, "col-sm-4 col-4");
        let ButtonUploadPrescriptionImage = new Button("CmdUploadPrescription", "Choose", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdUploadFile_Click(\'FilePrescriptionChoosen\', \'SpanPrescriptionFile\')")]);
        DivFormRowDocumentUploader.appendChild(ButtonUploadPrescriptionImage);
        FormRow1PrescriptionUpload.appendChild(DivFormRowDocumentUploader);

        DivFormGroupRowPatientVitals.appendChild(FormRow1PrescriptionUpload);

        let FormRow2PrescriptionUpload = new Div(undefined, "form-group row");
        let DivFormRow3PatientReports = new Div(undefined, "col-sm-12 col-12");
        let ButtonUploadPatientReports = new Button(undefined, "Upload", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdUploadReportFile_Click()")]);
        DivFormRow3PatientReports.appendChild(ButtonUploadPatientReports);
        FormRow2PrescriptionUpload.appendChild(DivFormRow3PatientReports);
        DivFormGroupRowPatientVitals.appendChild(FormRow2PrescriptionUpload);

        FormGroupRowPatientVitals.appendChild(DivFormGroupRowPatientVitals);
        CardBodyAddAppoinment.appendChild(FormGroupRowPatientVitals);

        CardBodyAddAppoinment.appendChild(new Div(undefined, "col-lg-1"));

        CardAddAppoinment.appendChild(CardBodyAddAppoinment);

        BindView(Container, CardAddAppoinment);
    }
}

function TablePatientAppointment()
{
    this.Render = function (Container, Data)
    {
        let Headers = ["No", "Name", "NIC", "Mobile", "Gender", "Payment", "Action"];

        let DivMainAppointmnetTable = new Div(undefined, "card-body");
        let DivHeadingPrescriptions = new Div(undefined, "col-lg-12 mt-4");

        let HeadingPrescriptions = new Heading4("Patient Appointments", undefined);
       
        DivHeadingPrescriptions.appendChild(HeadingPrescriptions);
  
        DivMainAppointmnetTable.appendChild(DivHeadingPrescriptions);

        let DivTablePrescriptions = new Div(undefined, "table-responsive");
        DivTablePrescriptions.appendChild(new TableView("TableAppointedPatient", "table table-striped display responsive", Headers, Data, undefined));

        DivMainAppointmnetTable.appendChild(DivTablePrescriptions);
        BindView(Container, DivMainAppointmnetTable);
    }
}


/*=================================
            Pharmacy UIs
 =================================*/

function Pharmacy()
{
    this.Render = function (Container, Data)
    {
        let Headers = ["No", "PrescriptionId", "Name", "HealthId", "Status"];

        let CardPrescriptions = new Div(undefined, "card text-left");
        let CardBodyPrescriptions = new Div(undefined, "card-body");

        let HeadingPrescriptions = new Heading4("Prescription", undefined);
       
        CardBodyPrescriptions.appendChild(HeadingPrescriptions);

        let DivTablePrescriptions = new Div(undefined, "table-responsive");
        DivTablePrescriptions.appendChild(new TableView("TablePharmacyPrescription", "table table-striped", Headers, Data, undefined));

        CardBodyPrescriptions.appendChild(DivTablePrescriptions);

        CardPrescriptions.appendChild(CardBodyPrescriptions);

        BindView(Container, CardPrescriptions);
    }
}

function PharmacyPrescription()
{
    this.Render = function (Container, Data)
    {
        let Headers = ["No", "BrandName", "Dosage", "Frequency", "Duration", "Available"];

        let CardPrescriptions = new Div(undefined, "card text-left");
        let CardBodyPrescriptions = new Div(undefined, "card-body");

        let HeadingPrescriptions = new Heading4("Drug List", undefined);
        CardBodyPrescriptions.appendChild(HeadingPrescriptions);

        let DivTablePrescriptions = new Div(undefined, "table-responsive");
        DivTablePrescriptions.appendChild(new TableView("TableDrugList", "table table-striped", Headers, Data, undefined));

        CardBodyPrescriptions.appendChild(DivTablePrescriptions);

        let FormRow0Session = new Div(undefined, "form-group row mt-4");

        FormRow0Session.appendChild(new Div(undefined, "col-sm-6 col-6"));

        let DivFormSubRowPrescription = new Div(undefined, "col-sm-2 col-2");
        let ButtonReject = new Button(undefined, "Reject", "btn btn-danger btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdReadyDrugUpdate_Click()")]);
        DivFormSubRowPrescription.appendChild(ButtonReject);
        FormRow0Session.appendChild(DivFormSubRowPrescription);

        let DivFormSubRowPharmacy = new Div(undefined, "col-sm-2 col-2");
        let ButtonReady = new Button("BtnStatusUpdate", "Ready", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdReadyDrugUpdate_Click()")]);
        DivFormSubRowPharmacy.appendChild(ButtonReady);
        FormRow0Session.appendChild(DivFormSubRowPharmacy);

        let DivFormSubRowCancel = new Div(undefined, "col-sm-2 col-2");
        let ButtonCancel = new Button(undefined, "Cancel", "btn btn-primary btn-rounded w-100", [new Attribute(_AttributeOnClick, "CmdPrescription_Click()")]);
        DivFormSubRowCancel.appendChild(ButtonCancel);
        FormRow0Session.appendChild(DivFormSubRowCancel);

        CardBodyPrescriptions.appendChild(FormRow0Session);

        CardPrescriptions.appendChild(CardBodyPrescriptions);

        BindView(Container, CardPrescriptions);
    }
}


//Footer
function Footer()
{
    this.Render = function (Container)
    {
        let DivPopup = new Div("DivPopup");
        let CardFooter = new Div(undefined, "col-12 footer-1");
        CardFooter.appendChild(DivPopup);
        let CardBodyFooter = new Div(undefined, "");

        let RowFooter = new Div(undefined, "row");       

        let RowColSub1Footer = new Div(undefined, "col-md-12 col-12 mt-4 mb-4 col-footer text center");
        let WidgetFooter1 = new Div(undefined, "ul-widget7__pic");
        WidgetFooter1.appendChild(new Heading6("Ayurweda By MEDICA"));
        RowColSub1Footer.appendChild(WidgetFooter1);
        RowFooter.appendChild(RowColSub1Footer);

        CardBodyFooter.appendChild(RowFooter);
        CardFooter.appendChild(CardBodyFooter);

        BindView(Container, CardFooter);
    }
}