/*=================================
            Layouts
 =================================*/

function LayoutCommon() {
  this.IdHolder = "DivHolder";
  this.IdLoader = "DivLoader";

  this.Render = function () {
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

    let Footer = new Div(undefined, "w-100 d-flex justify-content-center");
    Footer.appendChild(
      new Heading6("MEDICA Solution by mobiOs Private Limited", [
        new Attribute(_AttributeClass, "FooterText ColorBlue"),
      ])
    );
    DivLayout.appendChild(Footer);

    DivLayout.appendChild(DivContent);

    document.body.appendChild(DivLayout);

    new Login().Render(this.IdHolder);
  };

  this.RenderLoader = function () {
    let DivContentLoader = new Div(
      this.IdLoader,
      "row zindex-10 w-100 align-items-center"
    );
    let DivLoadingIconLoader = new Div(
      "DivLoadingIconLoader",
      "mx-auto justify-content-center"
    );
    DivLoadingIconLoader.appendChild(
      new Imagebox(
        "imageLoader",
        "dist-assets/images/Spinner-1s-204px.gif",
        undefined,
        undefined,
        [new Attribute(_AttributeClass, "c-default w-50")]
      )
    );
    DivContentLoader.appendChild(DivLoadingIconLoader);
    document.getElementById(_Body).appendChild(DivContentLoader);
  };

  this.DerenderLoader = function () {
    // document.getElementById(_Body).removeChild(document.getElementById(this.IdLoader));
  };
}

function LayoutMain() {
  this.Render = function () {
    let DivMain = new Div(undefined, "app-admin-wrap layout-sidebar-large");
    let DivNavBar = new Div(Containers.Header, undefined);
    DivMain.appendChild(DivNavBar);

    let DivHeader = new Div(
      undefined,
      "main-content-wrap sidenav-close d-flex flex-column m-auto"
    );

    let DivMainContent = Div(undefined, "main-content");

    DivMainContent.appendChild(new Div(Containers.ButtonBar));

    let DivSwitchMenu = new Div(
      undefined,
      "d-flex justify-content-center align-items-center mb-3"
    );
    DivSwitchMenu.appendChild(
      new Button(undefined, "", "SwitchMenuButton SwitchMenuButton-Active", [
        new Attribute(_AttributeOnClick, "LnkGeneral_Click(this)"),
      ])
    );
    DivSwitchMenu.appendChild(
      new Button(undefined, "", "SwitchMenuButton", [
        new Attribute(_AttributeOnClick, "LnkSettings_Click(this)"),
      ])
    );

    DivMainContent.appendChild(DivSwitchMenu);

    let DivRowMainContent = new Div(undefined, "row");
    DivRowMainContent.appendChild(new Div(undefined, "col-lg-2"));
    let DivSubRowMain = new Div(
      Containers.MainContent,
      "col-lg-8 col-12 pd-lr-5"
    );
    DivRowMainContent.appendChild(DivSubRowMain);

    DivRowMainContent.appendChild(new Div(undefined, "col-lg-2"));

    DivMainContent.appendChild(DivRowMainContent);

    // DivMainContent.innerHTML += `<div class='modal fade' id='loading' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
    //                                 <div style="height:100vh; width:100vw;" class="d-flex justify-content-center align-items-center">
    //                                     <div style="background-color:white; width:150px; height:150px; border-radius:10px;
    //                                                 " class="d-flex flex-column  justify-content-center align-items-center
    //                                                          ">
    //                                      <span class="loader-animation mt-3 mb-1"></span>
    //                                      <p class="mt-3">Loading ... </p>
    //                                     </div>
    //                                 </div>
    //                             </div>`;

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

function Login() {
  this.Render = function (Container) {
    let DivContent = new Div(undefined, "p-4");

    let DivRow = new Div(undefined, "row justify-content-center");

    DivRow.appendChild(
      new Imagebox(
        undefined,
        "dist-assets/images/LogoNurse.png",
        undefined,
        undefined,
        [new Attribute(_AttributeClass, "c-default mr-5  medicanurse")]
      )
    );
    DivRow.appendChild(
      new Imagebox(
        undefined,
        "dist-assets/images/docnote.png",
        undefined,
        undefined,
        [new Attribute(_AttributeClass, "c-default ml-2 docnote")]
      )
    );
    DivContent.appendChild(DivRow);
    DivContent.appendChild(
      new Heading4("Sign In", [
        new Attribute(_AttributeClass, "mb-3 text-18 LoginTitle ColorBlue"),
      ])
    );

    let RowUsername = new Div(undefined, "form-group"); //p-4 child
    RowUsername.appendChild(
      new Label(undefined, "Username / Mobile No", undefined, [
        new Attribute(_AttributeFor, "TxtUsername"),
        new Attribute(_AttributeClass, "ColorBlue"),
      ])
    );
    RowUsername.appendChild(
      new Textbox(
        "TxtUsername",
        "form-control form-control-rounded UserLogin",
        [
          new Attribute(_AttributePattern, "[0-9]{10}"),
          new Attribute(_AttributePlaceHolder, "Username"),
        ]
      )
    );
    DivContent.appendChild(RowUsername);

    let RowPassword = new Div(undefined, "form-group");
    RowPassword.appendChild(
      new Label(undefined, "Password", undefined, [
        new Attribute(_AttributeFor, "TxtPassword"),
        new Attribute(_AttributeClass, "ColorBlue"),
      ])
    );
    RowPassword.appendChild(
      new Passwordbox(
        "TxtPassword",
        "form-control form-control-rounded UserLogin",
        [new Attribute(_AttributePlaceHolder, "Password")]
      )
    );
    DivContent.appendChild(RowPassword);

    DivContent.appendChild(
      new Button(
        "CmdLogin",
        "Login",
        "btn btn-rounded btn-primary btn-block mt-2",
        [new Attribute(_AttributeOnClick, "CmdLogin_Click(this)")]
      )
    );

    let DivRememberAndForgot = new Div(
      undefined,
      "row px-2 mt-3 justify-content-between"
    );

    let DivRemember = new Div(undefined, "ml-2 text-center");
    DivRemember.appendChild(new Checkbox("ChkRemember", false));
    DivRemember.appendChild(
      new Label(undefined, "&nbsp;Remember Me ", undefined, [
        new Attribute(_AttributeFor, "ChkRemember"),
        new Attribute(_AttributeClass, "ColorBlue"),
      ])
    );
    // DivContent.appendChild(DivRemember);
    DivRememberAndForgot.appendChild(DivRemember);

    let DivForgotPassword = new Div(undefined, "text-center");
    DivForgotPassword.appendChild(
      new Hyperlink(
        "LnkRecover",
        _ClickVoid,
        "Forgot Password?",
        "text-muted ColorGrey",
        [new Attribute(_AttributeOnClick, "LnkRecover_Click(this)")]
      )
    );
    // DivContent.appendChild(DivForgotPassword);
    DivRememberAndForgot.appendChild(DivForgotPassword);
    DivContent.appendChild(DivRememberAndForgot);

    DivContent.appendChild(
      new Button(
        "CmdIAmDoctor",
        "I am a doctor",
        "btn btn-warning btn-rounded w-100",
        [new Attribute(_AttributeOnClick, "LnkVirtualconsultation_Click()")]
      )
    );

    // let DivDoctor = new Div(undefined, " mt-2 text-center mr-4");
    // DivDoctor.appendChild(new Hyperlink("LnkDoctor", _ClickVoid, "I am a doctor", "text-muted", [new Attribute(_AttributeOnClick, "LnkVirtualconsultation_Click()")]));
    // DivContent.appendChild(DivDoctor);

    //let DivSignInDescription = new Div(undefined, "text-center mt-3");
    //DivSignInDescription.appendChild(new Label(undefined, "DoctorOnline Consulation by MEDICA", undefined), [new Attribute(_AttributeFor, "LnkDoctorOnline_Click")]);
    //DivContent.appendChild(DivSignInDescription);

    let DivSignInDescription = new Div(undefined, "text-center mt-3");
    DivSignInDescription.appendChild(
      new Hyperlink(
        "LnkRecover1",
        _ClickVoid,
        "MEDICA Reception",
        "text-muted ColorBlue",
        [new Attribute(_AttributeOnClick, "LnkDocNote_Click()")]
      )
    );
    DivContent.appendChild(DivSignInDescription);

    BindView(Container, DivContent);
  };
}

function Welcome() {
  this.Render = function (Container) {
    let DivWelcome = new Div(
      undefined,
      "CustomMarginTop FontColorWhite text-center"
    );

    let WelcomeHeadingLine1 = new Heading2("Welcome to");
    DivWelcome.appendChild(WelcomeHeadingLine1);

    let WelcomeHeadingLine2 = new Heading1("Medica for Patients");
    DivWelcome.appendChild(WelcomeHeadingLine2);

    let DivLogo = new Imagebox(
      undefined,
      Images.Logo,
      undefined,
      "Medica Logo"
    );
    DivWelcome.appendChild(DivLogo);

    let DivLoader = new Div(undefined, "row justify-content-center pt-4");
    let Loader = new Div(undefined, "loader");
    DivLoader.appendChild(Loader);
    DivWelcome.appendChild(DivLoader);

    let DivFooter = new Div(undefined, "Footer FontColorWhite");
    let CreditsHeading = new Heading6("Powered By mobiOs", [
      new Attribute(_AttributeClass, "text-center"),
    ]);
    DivFooter.appendChild(CreditsHeading);
    DivWelcome.appendChild(DivFooter);

    let ScriptWelcome = new Javascript(undefined);
    ScriptWelcome.src = "Scripts/Welcome.js";
    ScriptWelcome.onload = Welcome_Load;
    DivWelcome.appendChild(ScriptWelcome);

    BindView(Container, DivWelcome);
  };
}

function SiteNavigation() {
  this.Render = function (Container) {
    let DivMainHeader = new Div(undefined, "main-header");

    let DivLogo = new Div(undefined, "logo");
    let Logo = new Div("logo");
    DivLogo.appendChild(Logo);
    let ImageLogo = new Imagebox(
      "PatientAppDiv",
      "dist-assets/images/LogoNurse.png",
      undefined,
      "Medica Logo",
      [
        new Attribute(_AttributeClass, "PateintAppDiv"),
        new Attribute(_AttributeOnClick, "General_View();"),
      ]
    );
    Logo.appendChild(ImageLogo);
    DivMainHeader.appendChild(DivLogo);

    let DivDFlex = new Div(undefined, "d-flex align-items-center");
    DivMainHeader.appendChild(DivDFlex);
    let DivMargin = new Div(undefined, "margin-auto");
    DivMainHeader.appendChild(DivMargin);

    let DivRightHeaderPart = new Div(undefined, "header-part-right");
    let FullScreenIcon = new Span(
      undefined,
      undefined,
      "i-Full-Screen header-icon d-none d-sm-inline-block",
      [new Attribute(_AttributeOnClick, "CmdFullScreen_Click()")]
    );
    DivRightHeaderPart.appendChild(FullScreenIcon);

    let DropDownRemainder = new Div(undefined, "dropown");
    let DivBadgeTop = new Div("dropdownNotification", "badge-top-container", [
      new Attribute(_AttributeDataToggle, "dropdown"),
      new Attribute(_AttributeAriaHaspopup, "true"),
      new Attribute(_AttributeAriaExpand, "false"),
    ]);
    DropDownRemainder.appendChild(DivBadgeTop);
    let BellIcon = new Span(undefined, undefined, "i-Bell header-icon", [
      new Attribute("style", "color: #175aa9 ;"),
    ]);
    DivBadgeTop.appendChild(BellIcon);
    DivRightHeaderPart.appendChild(DropDownRemainder);

    let DropDownProfile = new Div(undefined, "drpodown");
    let DivUser = new Div(undefined, "user col align-self-end");
    let ImageProfile = new Imagebox(
      "userDrpodown",
      "dist-assets/images/Nurse/hamburger.png",
      undefined,
      "Hamburger Image",
      [
        new Attribute(_AttributeDataToggle, "dropdown"),
        new Attribute(_AttributeAriaHaspopup, "true"),
        new Attribute(_AttributeAriaExpand, "false"),
        new Attribute(_AttributeOnClick, "CmdBtnColorRemove_Click();"),
      ]
    );
    DivUser.appendChild(ImageProfile);
    let DropDownProfileMenu = new Div(
      undefined,
      "dropdown-menu dropdown-menu-right",
      [new Attribute(_AttributeAreaLabledBy, "userDropdown")]
    );
    let HyperlinkProfile = new Hyperlink(
      "LblNurseName",
      undefined,
      "Profile",
      "dropdown-item",
      [new Attribute(_AttributeOnClick, "CmdProfile_Click(this)")]
    );
    let HyperlinkAbout = new Hyperlink(
      undefined,
      undefined,
      "About",
      "dropdown-item",
      [new Attribute(_AttributeOnClick, "CmdAboutUs_Click(this)")]
    );
    let HyperlinkSignOut = new Hyperlink(
      undefined,
      undefined,
      "Sign Out",
      "dropdown-item",
      [new Attribute(_AttributeOnClick, "LnkSignOut_Click(this)")]
    );
    DropDownProfileMenu.appendChild(HyperlinkProfile);
    DropDownProfileMenu.appendChild(HyperlinkAbout);
    DropDownProfileMenu.appendChild(HyperlinkSignOut);
    let HyperlinkBranchId = new Hyperlink(
      "LblInstituteBranch",
      undefined,
      "Branch",
      "dropdown-item d-none"
    );
    DropDownProfileMenu.appendChild(HyperlinkBranchId);

    // let HyperlinkSettings = new Hyperlink("LblSettings", undefined, "Settings", "dropdown-item", [new Attribute(_AttributeOnClick, "LnkSettings_Click(this)")]);
    // DropDownProfileMenu.appendChild(HyperlinkSettings);

    // let HyperlinkGeneral = new Hyperlink("LblHome", undefined, "Home", "dropdown-item", [new Attribute(_AttributeOnClick, "LnkGeneral_Click(this)")]);
    // DropDownProfileMenu.appendChild(HyperlinkGeneral);

    let DropDownProfileName = new Div(undefined, "dropdown");
    let ProfileName = new Heading6(undefined, [
      new Attribute(_AttributeClass, "card-title m-unset"),
      new Attribute(_AttributeId, "ProfileName"),
    ]);
    DropDownProfileName.appendChild(ProfileName);
    DivRightHeaderPart.appendChild(DropDownProfileName);

    DivUser.appendChild(DropDownProfileMenu);
    DropDownProfile.appendChild(DivUser);
    DivRightHeaderPart.appendChild(DropDownProfile);
    DivMainHeader.appendChild(DivRightHeaderPart);

    BindView(Container, DivMainHeader);
  };
}

function SiteButtonBar() {
  this.Render = function (Container) {
    let DivRowMainButtonBar = Div(undefined, "row");
    DivRowMainButtonBar.appendChild(new Div(undefined, "col-lg-2 pd-lr-5"));
    let RowCelRowCellSite = Div(undefined, "col-lg-2 col-3 pd-lr-5");

    let SpanPrescription = new Span(undefined, undefined, "c-pointer");
    let DivPrescription = new Div(undefined, "card mb-4 o-hidden");
    let DivPrescriptionCardBody = new Div("PatientCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "CmdPatientSearch_Click(this),CmdBtnClickable_Click(this)"
      ),
    ]);

    let DivWidgetRowPrescription = new Div(
      undefined,
      "ul-widget__row-v2 p-relative"
    );
    let DivWidgetImagePrescription = new Div(undefined, "ul-widget6__pic");
    let ImagePrescription = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Patientn.png",
      undefined,
      "Prescription Image"
    );

    let DivWidgetContentPrescription = new Div(
      "PrescriptionHeading",
      "ul-widget__content-v2"
    );
    let HeadingPrescription = new Heading4("Patients", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    let DivReportCardBody = new Div("AppoinmentsCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "CmdAppoinments_Click(this),CmdBtnClickable_Click(this)"
      ),
    ]);

    let DivWidgetRowReport = new Div(undefined, "ul-widget__row-v2 p-relative");
    let DivWidgetImageReport = new Div(undefined, "ul-widget6__pic");
    let ImageReport = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Appointment.png",
      undefined,
      "Report Image"
    );

    let DivWidgetContentReport = new Div(
      "ReportsHeading",
      "ul-widget__content-v2"
    );
    let HeadingReport = new Heading4("Appointments", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    let DivHistoryCardBody = new Div("SessionCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "CmdSession_Click(this),CmdBtnClickable_Click(this)"
      ),
    ]);

    let DivWidgetRowHistory = new Div(
      undefined,
      "ul-widget__row-v2 p-relative"
    );
    let DivWidgetImageHistory = new Div(undefined, "ul-widget6__pic");
    let ImageHistory = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Schedule.png",
      undefined,
      "History Image"
    );

    let DivWidgetContentHistory = new Div(
      "HistoryHeading",
      "ul-widget__content-v2"
    );
    let HeadingHistory = new Heading4("Sessions", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    let DivAllergiesCardBody = new Div("InvoiceCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "CmdPrescription_Click(this),CmdBtnClickable_Click(this)"
      ),
    ]);

    let DivWidgetRowAllergies = new Div(
      undefined,
      "ul-widget__row-v2 p-relative"
    );
    let DivWidgetImageAllergies = new Div(undefined, "ul-widget6__pic");
    let ImageAllergies = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Pharmacy.png",
      undefined,
      "Allergies Image"
    );

    let DivWidgetContentAllergies = new Div(
      "AllergiesHeading",
      "ul-widget__content-v2"
    );
    let HeadingAllergies = new Heading4("Pharmacy", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    ///////////////////////////////////////////

    BindView(Container, DivRowMainButtonBar);
  };
}

function Profile() {
  this.Render = function (Container) {
    let CardProfile = new Div(undefined, "card");
    let CardBodyEditProfile = new Div(undefined, "card-body");
    let UserProfile = new Div(undefined, "user-profile mb-4");
    UserProfile.innerHTML = ` 
              <h1>User Profile</h1>
                  <div class="row mt-3">
                    <div class="col-3 fs-3"><h3>Name</h3></div>
                    <div class="col"><h4>: ${_NurseLoggedIn?.Title} ${_NurseLoggedIn?.FirstName}  ${_NurseLoggedIn?.LastName}</h4></div>
                  </div>
                  
                  <div class="row mt-3">
                    <div class="col-3 fs-3"><h3>NIC</h3></div>
                    <div class="col"><h4>:  ${_NurseLoggedIn?.NIC}</h4></div>
                  </div>
                  
                   <div class="row mt-3">
                    <div class="col-3 fs-3"><h3>Email</h3></div>
                    <div class="col"><h4>:  ${_NurseLoggedIn?.Email}</h4></div>
                  </div>
                  
                  <div class="row mt-3">
                    <div class="col-3 fs-3"><h3>Branch Name</h3></div>
                    <div class="col"><h4>:  ${_NurseBranch?.Name}</h4></div>
                  </div>
                  
                  <div class="row mt-3">
                    <div class="col-3 fs-3"><h3>Branch Address</h3></div>
                    <div class="col"><h4>:  ${_NurseBranch?.AddressLine1} ${_NurseBranch?.AddressLine2}</h4></div>
                  </div>
              </div>`;

    CardBodyEditProfile.appendChild(UserProfile);
    CardProfile.appendChild(CardBodyEditProfile);

    BindView(Container, CardProfile);
  };
}

function AboutUs() {
  this.Render = function (Container) {
    let CardProfile = new Div(undefined, "card");
    let CardBodyEditProfile = new Div(undefined, "card-body");
    let UserProfile = new Div(undefined, "user-profile mb-4");
    let WidgetProfileCard = new Div(undefined, "ul-widget-card__user-info");
    let UserFullName = new Paragraph(undefined, [
      new Attribute(_AttributeClass, "m-0 text-24"),
      new Attribute(_AttributeId, "UserFullName"),
    ]);
    let UserAge = new Paragraph(undefined, [
      new Attribute(_AttributeClass, "text-muted m-0"),
      new Attribute(_AttributeId, "UserAge"),
    ]);
    let UserGender = new Paragraph(undefined, [
      new Attribute(_AttributeClass, "text-muted m-0"),
      new Attribute(_AttributeId, "UserGender"),
    ]);
    WidgetProfileCard.appendChild(UserFullName);
    WidgetProfileCard.appendChild(UserAge);
    WidgetProfileCard.appendChild(UserGender);
    UserProfile.appendChild(WidgetProfileCard);
    CardBodyEditProfile.appendChild(UserProfile);
    CardProfile.appendChild(CardBodyEditProfile);

    let AboutUsDiv = new Div("DependentDetails", undefined);

    CardBodyEditProfile.appendChild(AboutUsDiv);

    BindView(Container, CardProfile);
  };
}

/*=================================
         Patient UIs
 =================================*/

function PatientSearch() {
  this.Render = function (Container) {
    let CardPatient = new Div(undefined, "card text-left");

    let CardBodyPatient = new Div(undefined, "card-body");

    let HeadingSearchPatient = new Heading4("Patient Search", [
      new Attribute(_AttributeClass, "card-title mb-3 text-center"),
    ]);
    CardBodyPatient.appendChild(HeadingSearchPatient);

    let RowUploadPatientPrescription = new Div(undefined, "row");

    RowUploadPatientPrescription.appendChild(new Div(undefined, "col-lg-2"));

    let ColSub0UploadPatientPrescription = new Div(undefined, "col-lg-8");

    RowUploadPatientPrescription.appendChild(ColSub0UploadPatientPrescription);
    CardBodyPatient.appendChild(RowUploadPatientPrescription);

    let FormPatientSearch = new Form(undefined);

    let FormRow0PatientSearch = new Div(undefined, "form-group row mt-3");

    let PatientDivFormRow = new Div(undefined, "col-sm-6 col-12 mt-2");
    PatientDivFormRow.appendChild(
      new Label(undefined, "Patient NIC", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPatientNIC"),
      ])
    );
    PatientDivFormRow.appendChild(
      new Textbox("TxtPatientNIC", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
        new Attribute(_AttributeOnBlur, "TxtPatientNIC"),
      ])
    );
    FormRow0PatientSearch.appendChild(PatientDivFormRow);

    let DivFormRowPatient = new Div(undefined, "col-sm-6 col-12 mt-2");
    DivFormRowPatient.appendChild(
      new Label(undefined, "Patient Birth Date", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPatientDateBirth"),
      ])
    );
    DivFormRowPatient.appendChild(
      new Textbox("TxtPatientDateBirth", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
      ])
    );
    FormRow0PatientSearch.appendChild(DivFormRowPatient);
    FormPatientSearch.appendChild(FormRow0PatientSearch);

    let DivFormPatient = new Div(undefined, "col-sm-6 col-12 mt-2");
    DivFormPatient.appendChild(
      new Label(undefined, "Patient Mobile Number *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPatientMobileNumber"),
      ])
    );
    DivFormPatient.appendChild(
      new Numberbox(
        "TxtPatientMobileNumber",
        "form-control form-control-rounded",
        [
          new Attribute(
            _AttributeOnKeyDown,
            "javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))"
          ),
        ]
      )
    );
    FormRow0PatientSearch.appendChild(DivFormPatient);

    let DivFormRowHealthID = new Div(undefined, "col-sm-6 col-12 mt-2");
    DivFormRowHealthID.appendChild(
      new Label(undefined, "Patient HealthID", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPatientHealthID"),
      ])
    );
    DivFormRowHealthID.appendChild(
      new Textbox("TxtPatientHealthID", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
      ])
    );
    FormRow0PatientSearch.appendChild(DivFormRowHealthID);
    FormPatientSearch.appendChild(FormRow0PatientSearch);

    //let DivFormRowPatientName = new Div(undefined, "col-sm-12 col-12 mt-1");
    //DivFormRowPatientName.appendChild(new Label(undefined, "Patient Name", [new Attribute(_AttributeClass, "col-form-label"), new Attribute(_AttributeFor, "TxtPatientName")]));
    //DivFormRowPatientName.appendChild(new Textbox("TxtPatientName", "form-control form-control-rounded", [new Attribute(_AttributeType, "text")]));
    //FormRow0PatientSearch.appendChild(DivFormRowPatientName);
    //FormPatientSearch.appendChild(FormRow0PatientSearch);

    let FormRow3PatientSearchLOad = new Div(undefined, "form-group row ");

    let DivFormRow3Load = new Div(undefined, "col-sm-12 col-12 mt-2");
    DivFormRow3Load.appendChild(
      new Button(
        "CmdSearch",
        "Search",
        "btn btn-info btn-primary btn-rounded w-100",
        [new Attribute(_AttributeOnClick, "CmdSearchPatient_Click()")]
      )
    );
    FormRow3PatientSearchLOad.appendChild(DivFormRow3Load);
    FormPatientSearch.appendChild(FormRow3PatientSearchLOad);

    let FormRow3PatientSearch = new Div(undefined, "form-group row ");

    let DivFormRow3 = new Div(undefined, "col-sm-12 col-12 mt-1");
    DivFormRow3.appendChild(
      new Button(
        "CmdLoadCamera",
        "Scan HealthID",
        "btn btn-warning btn-rounded w-100",
        [new Attribute(_AttributeOnClick, "CmdLoadCamera_Click()")]
      )
    );
    FormRow3PatientSearch.appendChild(DivFormRow3);
    let DivFormQrReader = new Div("reader", "mb -2  col-sm-6 mx-auto mb-3");
    FormRow3PatientSearch.appendChild(DivFormQrReader);

    //FormRow3PatientSearch.appendChild(DivFormRow3);
    FormPatientSearch.appendChild(FormRow3PatientSearch);

    let FormRow3PatientSearchClear = new Div(undefined, "form-group row ");

    let DivFormRow3Clear = new Div(undefined, "col-sm-12 col-12");
    DivFormRow3Clear.appendChild(
      new Button(
        "CmdClear",
        "Clear",
        "btn btn-info btn-primary btn-rounded w-100",
        [new Attribute(_AttributeOnClick, "CmdClearSearchPatient_Click()")]
      )
    );
    FormRow3PatientSearchClear.appendChild(DivFormRow3Clear);
    FormPatientSearch.appendChild(FormRow3PatientSearchClear);

    ColSub0UploadPatientPrescription.appendChild(FormPatientSearch);

    CardBodyPatient.appendChild(new Div(undefined, "col-lg-2"));

    CardPatient.appendChild(CardBodyPatient);

    BindView(Container, CardPatient);
  };
}

function PatientTable() {
  this.Render = function (Container, Data) {
    let Headers = ["Name", "NIC", "Mobile", "Gender", "Dep", "Action"];
    let CardPrescriptions = new Div(undefined, "card text-left");
    let CardBodyPrescriptions = new Div(undefined, "card-body");

    let HeadingPrescriptions = new Heading4("Patient Data", undefined);
    let ImagePrescriptions = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Patientn.png",
      undefined,
      "Add Icon Image",
      [
        new Attribute(_AttributeClass, "TopIcons pres-img"),
        new Attribute(_AttributeOnClick, "AddPatient_Click()"),
      ]
    );
    HeadingPrescriptions.appendChild(ImagePrescriptions);
    CardBodyPrescriptions.appendChild(HeadingPrescriptions);

    let DivTablePrescriptions = new Div(undefined, "table-responsive");
    DivTablePrescriptions.appendChild(
      new TableView(
        "TableSelectPatient",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );

    CardBodyPrescriptions.appendChild(DivTablePrescriptions);

    CardPrescriptions.appendChild(CardBodyPrescriptions);

    BindView(Container, CardPrescriptions);
  };
}

function NavEditPatient(type) {
  this.Render = function (Container) {
    let CardEditPatient = new Div(undefined, "card text-left");
    let CardBodyEditPatient = new Div(undefined, "card-body");
    let HeadingEditPatient = new Heading4(type + " Patient", [
      new Attribute(_AttributeClass, "card-title mb-3"),
    ]);
    CardBodyEditPatient.appendChild(HeadingEditPatient);

    let NavEditPatient = new Nav();
    let DivNavEditPatient = new Div("nav-tab", "nav nav-tabs", [
      new Attribute(_AttributeRole, "tablist"),
    ]);
    DivNavEditPatient.appendChild(
      new Hyperlink(
        "nav-primary-tab",
        "#nav-primary",
        "Primary",
        "nav-item nav-link ",
        [
          new Attribute(_AttributeDataToggle, "tab"),
          new Attribute(_AttributeRole, "role"),
          new Attribute(_AttributeAreaControl, "nav-primary"),
          new Attribute(_AttributeAreaSelected, "true"),
          new Attribute(_AttributeOnClick, "CmdPrimaryPatient_Click(this)"),
        ]
      )
    );
    DivNavEditPatient.appendChild(
      new Hyperlink(
        "nav-dependant-tab",
        "#nav-dependant",
        "Family Members",
        "nav-item nav-link",
        [
          new Attribute(_AttributeDataToggle, "tab"),
          new Attribute(_AttributeRole, "role"),
          new Attribute(_AttributeAreaControl, "nav-dependant"),
          new Attribute(_AttributeAreaSelected, "false"),
        ]
      )
    );
    NavEditPatient.appendChild(DivNavEditPatient);
    CardBodyEditPatient.appendChild(NavEditPatient);

    let DivContentNavEditPatient = new Div(
      "na-tabContent",
      "tab-content ul-tab__content"
    );
    DivContentNavEditPatient.appendChild(
      new Div("nav-primary", "tab-pane fade", [
        new Attribute(_AttributeRole, "tabpanel"),
        new Attribute(_AttributeAreaLabledBy, "nav-primary-tab"),
      ])
    );
    let DivFamily = new Div("nav-dependant", "tab-pane fade", [
      new Attribute(_AttributeRole, "tabpanel"),
      new Attribute(_AttributeAreaLabledBy, "nav-dependant-tab"),
    ]);
    DivFamily.appendChild(
      new Heading4("No Data Available", [
        new Attribute(_AttributeClass, "card-title mb-3"),
      ])
    );
    DivContentNavEditPatient.appendChild(DivFamily);
    DivContentNavEditPatient.appendChild(
      new Div("nav-child", "tab-pane fade", [
        new Attribute(_AttributeRole, "tabpanel"),
        new Attribute(_AttributeAreaLabledBy, "nav-child-tab"),
      ])
    );
    CardBodyEditPatient.appendChild(DivContentNavEditPatient);

    CardEditPatient.appendChild(CardBodyEditPatient);

    BindView(Container, CardEditPatient);
  };
}

function EditPatient() {
  this.Render = function (Container) {
    let FormEditPatient = new Form(undefined);

    let FormGroupRowPatient = new Div(undefined, "form-group row");
    let DivFormGroupRowPatient = new Div(undefined, "col-lg-12 col-12");
    let LabelEditNIC = new Label(undefined, "Registered NIC Number", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtEditNicNumber"),
    ]);
    let InputEditNIC = new Textbox(
      "TxtEditNicNumber",
      "form-control form-control-rounded patient-form",
      [new Attribute(_AttributeType, "text")]
    );
    DivFormGroupRowPatient.appendChild(LabelEditNIC);
    DivFormGroupRowPatient.appendChild(InputEditNIC);
    FormGroupRowPatient.appendChild(DivFormGroupRowPatient);
    FormEditPatient.appendChild(FormGroupRowPatient);

    let FormGroupRowMobileNo = new Div(undefined, "form-group row");
    let DivFormGroupRowMobileNumber = new Div(undefined, "col-lg-12 col-12");
    let LabelEditMobileNumber = new Label(undefined, "Enter Mobile Number", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtEditMobileNumber"),
      new Attribute(
        _AttributeOnChange,
        "ValidateMobileNumber(document.getElementById('TxtEditMobileNumber'))"
      ),
    ]);
    let InputEditMobileNumber = new Textbox(
      "TxtEditMobileNumber",
      "form-control form-control-rounded patient-form",
      [new Attribute(_AttributeType, "text")]
    );
    DivFormGroupRowMobileNumber.appendChild(LabelEditMobileNumber);
    DivFormGroupRowMobileNumber.appendChild(InputEditMobileNumber);
    FormGroupRowMobileNo.appendChild(DivFormGroupRowMobileNumber);
    FormEditPatient.appendChild(FormGroupRowMobileNo);

    let FormGroupRowPatientTtitle = new Div(undefined, "form-group row");
    let DivFormGroupRowPatientTtitle = new Div(undefined, "col-lg-4 col-4");
    let SelectTitle = new Select("DrpEditPatientTtitle", [
      new Attribute(_AttributeClass, "form-control form-control-rounded"),
    ]);
    SelectTitle.appendChild(
      new SelectItem("Mr.", "Mr.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Mrs.", "Mrs.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Ms.", "Ms.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Miss.", "Miss.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Baby.", "Baby.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Dr.", "Dr.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Rev.", "Rev.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DivFormGroupRowPatientTtitle.appendChild(SelectTitle);
    FormGroupRowPatientTtitle.appendChild(DivFormGroupRowPatientTtitle);

    let DivFormGroupRow2SubPatient = new Div(undefined, "col-lg-4 col-4");
    let LabelGenderMale = new Label(
      undefined,
      undefined,
      "radio radio-primary"
    );
    LabelGenderMale.appendChild(
      new RadioButton("RadioEditMale", "RadioEdit", [
        new Attribute(_AttributeValue, "Male"),
      ])
    );
    LabelGenderMale.appendChild(new Span(undefined, "Male"));
    LabelGenderMale.appendChild(new Span(undefined, undefined, "checkmark"));
    DivFormGroupRow2SubPatient.appendChild(LabelGenderMale);
    FormGroupRowPatientTtitle.appendChild(DivFormGroupRow2SubPatient);

    let DivFormGroupRow2Female = new Div(undefined, "col-lg-4 col-4");
    let LabelGenderFemale = new Label(
      undefined,
      undefined,
      "radio radio-primary"
    );
    LabelGenderFemale.appendChild(
      new RadioButton("RadioEditFemale", "RadioEdit", [
        new Attribute(_AttributeValue, "Male"),
      ])
    );
    LabelGenderFemale.appendChild(new Span(undefined, "Female"));
    LabelGenderFemale.appendChild(new Span(undefined, undefined, "checkmark"));
    DivFormGroupRow2Sub0.appendChild(LabelGenderFemale);
    FormGroupRowPatientTtitle.appendChild(DivFormGroupRow2Female);
    FormEditPatient.appendChild(FormGroupRow2);

    let FormGroupRowFirst = new Div(undefined, "form-group row");
    let DivFormGroupRowName = new Div(undefined, "col-lg-12 col-12");
    let LabelEditFirstName = new Label(undefined, "Enter First Name", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtEditFirstName"),
    ]);
    let InputEditFirstName = new Textbox(
      "TxtEditFirstName",
      "form-control form-control-rounded patient-form",
      [new Attribute(_AttributeType, "text")]
    );
    DivFormGroupRowName.appendChild(LabelEditFirstName);
    DivFormGroupRowName.appendChild(InputEditFirstName);
    FormGroupRowFirst.appendChild(DivFormGroupRowName);
    FormEditPatient.appendChild(FormGroupRowFirst);

    let FormGroupRowLastName = new Div(undefined, "form-group row");
    let DivFormGroupRowLastName = new Div(undefined, "col-lg-12 col-12");
    let LabelEditLastName = new Label(undefined, "Enter Last Name", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtEditLastName"),
    ]);
    let InputEditLastName = new Textbox(
      "TxtEditLastName",
      "form-control form-control-rounded patient-form",
      [new Attribute(_AttributeType, "text")]
    );
    DivFormGroupRowLastName.appendChild(LabelEditLastName);
    DivFormGroupRowLastName.appendChild(InputEditLastName);
    FormGroupRowLastName.appendChild(DivFormGroupRowLastName);
    FormEditPatient.appendChild(FormGroupRowLastName);

    let FormGroupRowDOB = new Div(undefined, "form-group row");
    let DivFormGroupRowDOB = new Div(undefined, "col-lg-12 col-12");
    let LabelEditDateBirth = new Label(undefined, "Enter Date of Birth", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtEditDateBirth"),
    ]);
    let InputEditDateBirth = new Textbox(
      "TxtEditDateBirth",
      "form-control form-control-rounded Date-Picker patient-form",
      [new Attribute(_AttributeType, "text")]
    );
    DivFormGroupRowDOB.appendChild(LabelEditDateBirth);
    DivFormGroupRowDOB.appendChild(InputEditDateBirth);
    FormGroupRowDOB.appendChild(DivFormGroupRowDOB);
    FormEditPatient.appendChild(FormGroupRowDOB);

    BindView(Container, FormEditPatient);
  };
}

function AddPatient() {
  this.Render = function (Container) {
    let FormEditPatient = new Form(undefined);

    let FormGroupRowPatient = new Div(undefined, "form-group row");
    let DivFormGroupRowPatient = new Div(undefined, "col-lg-4 col-12");
    DivFormGroupRowPatient.appendChild(
      new Label(undefined, "NIC Number *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAddId"),
      ])
    );
    DivFormGroupRowPatient.appendChild(
      new Textbox(
        "TxtAddId",
        "form-control form-control-rounded Add-Patient patient-form",
        [
          new Attribute(_AttributeType, "text"),
          new Attribute(_AttributeOnBlur, "CmdGetDOBandGender()"),
        ]
      )
    );
    FormGroupRowPatient.appendChild(DivFormGroupRowPatient);

    let DivFormGroupRowPassport = new Div(
      undefined,
      "col-lg-2 col-4 Add-Patient-Div"
    );
    let LabelPassport = new Label(
      undefined,
      undefined,
      "radio radio-primary mt-4 "
    );
    LabelPassport.appendChild(
      new RadioButton("RadioAddPassport", "RadioEdit", [
        new Attribute(_AttributeValue, "Passport"),
      ])
    );
    LabelPassport.appendChild(new Span(undefined, "Passport *"));
    LabelPassport.appendChild(new Span(undefined, undefined, "checkmark"));
    DivFormGroupRowPassport.appendChild(LabelPassport);
    FormGroupRowPatient.appendChild(DivFormGroupRowPassport);

    let DivFormGroupRowRadioAddHealthId = new Div(
      undefined,
      "col-lg-2 col-4 Add-Patient-Div"
    );
    let LabelHealthId = new Label(
      undefined,
      undefined,
      "radio radio-primary mt-4"
    );
    LabelHealthId.appendChild(
      new RadioButton("RadioAddHealthId", "RadioEdit", [
        new Attribute(_AttributeValue, "Helath Id"),
      ])
    );
    LabelHealthId.appendChild(new Span(undefined, "Health Id"));
    LabelHealthId.appendChild(new Span(undefined, undefined, "checkmark"));
    DivFormGroupRowRadioAddHealthId.appendChild(LabelHealthId);
    FormGroupRowPatient.appendChild(DivFormGroupRowRadioAddHealthId);

    let DivFormGroupRowTxtPatientHealthId = new Div(
      undefined,
      "col-lg-2 col-4"
    );
    DivFormGroupRowTxtPatientHealthId.appendChild(
      new Span(
        "TxtPatientHealthId",
        undefined,
        "badge badge-pill badge-outline-danger p-2 mt-4"
      )
    );
    FormGroupRowPatient.appendChild(DivFormGroupRowTxtPatientHealthId);
    FormEditPatient.appendChild(FormGroupRowPatient);

    let FormGroupRowMobile = new Div(undefined, "form-group row");
    let DivFormGroupRowMobileNumber = new Div(undefined, "col-lg-4 col-12");
    DivFormGroupRowMobileNumber.appendChild(
      new Label(undefined, "Mobile Number *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtEditMobileNumber"),
      ])
    );
    DivFormGroupRowMobileNumber.appendChild(
      new Textbox(
        "TxtAddMobileNumber",
        "form-control form-control-rounded Add-Patient patient-form",
        [new Attribute(_AttributeType, "text")]
      )
    );
    FormGroupRowMobile.appendChild(DivFormGroupRowMobileNumber);
    FormEditPatient.appendChild(FormGroupRowMobile);

    let FormGroupRowDOB = new Div(undefined, "form-group row");
    let DivFormGroupRowDOB = new Div(undefined, "col-lg-4 col-4");
    DivFormGroupRowDOB.appendChild(
      new Label(undefined, "Date of Birth *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtEditDateBirth"),
      ])
    );
    DivFormGroupRowDOB.appendChild(
      new Textbox(
        "TxtAddDateBirth",
        "form-control form-control-rounded Add-Patient patient-form Date-Picker",
        [new Attribute(_AttributeType, "text")]
      )
    );
    FormGroupRowDOB.appendChild(DivFormGroupRowDOB);

    let DivFormGroupRowRadioGender = new Div(undefined, "col-lg-2 col-4");
    let LabelGenderMale = new Label(
      undefined,
      undefined,
      "radio radio-primary mt-4 Add-Patient"
    );
    LabelGenderMale.appendChild(
      new RadioButton("ChkPatientMale", "RadioGender", [
        new Attribute(_AttributeValue, "MALE"),
      ])
    );
    LabelGenderMale.appendChild(new Span(undefined, "Male"));
    LabelGenderMale.appendChild(new Span(undefined, undefined, "checkmark"));
    DivFormGroupRowRadioGender.appendChild(LabelGenderMale);
    FormGroupRowDOB.appendChild(DivFormGroupRowRadioGender);

    let DivFormGroupRowRadioGenderFemale = new Div(undefined, "col-lg-2 col-4");
    let LabelGenderFemale = new Label(
      undefined,
      undefined,
      "radio radio-primary mt-4 Add-Patient"
    );
    LabelGenderFemale.appendChild(
      new RadioButton("ChkPatientFemale", "RadioGender", [
        new Attribute(_AttributeValue, "FEMALE"),
      ])
    );
    LabelGenderFemale.appendChild(new Span(undefined, "Female"));
    LabelGenderFemale.appendChild(new Span(undefined, undefined, "checkmark"));
    DivFormGroupRowRadioGenderFemale.appendChild(LabelGenderFemale);
    FormGroupRowDOB.appendChild(DivFormGroupRowRadioGenderFemale);
    FormEditPatient.appendChild(FormGroupRowDOB);

    let FormGroupRowTitle = new Div(undefined, "form-group row");

    let DivFormGroupRow42 = new Div(undefined, "col-lg-4 col-6");
    DivFormGroupRow42.appendChild(
      new Label(undefined, "Title *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "Title"),
      ])
    );
    let SelectTitle = new Select("DrpAddPatientTtitle", [
      new Attribute(_AttributeClass, "form-control form-control-rounded "),
    ]);
    SelectTitle.appendChild(
      new SelectItem("Mr.", "Mr.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Mrs.", "Mrs.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Ms.", "Ms.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Miss.", "Miss.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Baby.", "Baby.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Dr.", "Dr.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectTitle.appendChild(
      new SelectItem("Rev.", "Rev.", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DivFormGroupRow42.appendChild(SelectTitle);
    FormGroupRowTitle.appendChild(DivFormGroupRow42);

    let DivFormGroupRowFirstName = new Div(undefined, "col-lg-4 col-6");
    DivFormGroupRowFirstName.appendChild(
      new Label(undefined, "First Name *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtEditFirstName"),
      ])
    );
    DivFormGroupRowFirstName.appendChild(
      new Textbox(
        "TxtAddFirstName",
        "form-control form-control-rounded Add-Patient patient-form",
        [new Attribute(_AttributeType, "text")]
      )
    );
    FormGroupRowTitle.appendChild(DivFormGroupRowFirstName);

    let DivFormGroupRowLastName = new Div(undefined, "col-lg-4 col-6");
    DivFormGroupRowLastName.appendChild(
      new Label(undefined, "Last Name *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtEditLastName"),
      ])
    );
    DivFormGroupRowLastName.appendChild(
      new Textbox(
        "TxtAddLastName",
        "form-control form-control-rounded Add-Patient patient-form",
        [new Attribute(_AttributeType, "text")]
      )
    );
    FormGroupRowTitle.appendChild(DivFormGroupRowLastName);
    FormEditPatient.appendChild(FormGroupRowTitle);

    let FormGroupRowAddress = new Div(undefined, "form-group row");
    let DivFormGroupRowAddress = new Div(undefined, "col-lg-12 col-12");
    DivFormGroupRowAddress.appendChild(
      new Label(undefined, "Address", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAddAddress"),
      ])
    );
    DivFormGroupRowAddress.appendChild(
      new Textbox(
        "TxtAddAddress",
        "form-control form-control-rounded Add-Patient patient-form",
        [new Attribute(_AttributeType, "text")]
      )
    );
    FormGroupRowAddress.appendChild(DivFormGroupRowAddress);
    FormEditPatient.appendChild(FormGroupRowAddress);

    let FormGroupRowOccupation = new Div(undefined, "form-group row");
    let DivFormGroupRow6 = new Div(undefined, "col-lg-6 col-12");
    DivFormGroupRow6.appendChild(
      new Label(undefined, "Occupation", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAddOccupation"),
      ])
    );
    DivFormGroupRow6.appendChild(
      new Textbox(
        "TxtAddOccupation",
        "form-control form-control-rounded Add-Patient patient-form",
        [new Attribute(_AttributeType, "text")]
      )
    );
    FormGroupRowOccupation.appendChild(DivFormGroupRow6);
    FormEditPatient.appendChild(FormGroupRowOccupation);

    let DivFormGroupRowMarialStatus = new Div(undefined, "col-lg-6 col-12");
    DivFormGroupRowMarialStatus.appendChild(
      new Label(undefined, "Marital Status", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "MaritalStatus"),
      ])
    );
    let SelectMaritalStatus = new Select("DrpAddPatientMaritalStatus", [
      new Attribute(_AttributeClass, "form-control form-control-rounded"),
    ]);
    SelectMaritalStatus.appendChild(
      new SelectItem("Select Status", "Select", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectMaritalStatus.appendChild(
      new SelectItem("Married", "Married", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectMaritalStatus.appendChild(
      new SelectItem("Widowed", "Widowed", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectMaritalStatus.appendChild(
      new SelectItem("Separated", "Separated", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectMaritalStatus.appendChild(
      new SelectItem("Divorced.", "Divorced", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    SelectMaritalStatus.appendChild(
      new SelectItem("Single.", "Single", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DivFormGroupRowMarialStatus.appendChild(SelectMaritalStatus);
    FormGroupRowOccupation.appendChild(DivFormGroupRowMarialStatus);
    FormEditPatient.appendChild(FormGroupRowOccupation);

    let FormGroupRowSave = new Div(undefined, "modal-footer row mt-4");
    FormGroupRowSave.appendChild(
      new Button("BtnSavePatient", "Save", "btn btn-rounded btn-info  mt-2", [
        new Attribute(_AttributeOnClick, "SavePatient_Click()"),
      ])
    );
    FormGroupRowSave.appendChild(
      new Button(
        "BtnCancelPatient",
        "Cancel",
        "btn btn-rounded btn-warning mt-2",
        [new Attribute(_AttributeOnClick, "CmdAddPatientCancel_Click()")]
      )
    );
    FormEditPatient.appendChild(FormGroupRowSave);

    BindView(Container, FormEditPatient);
  };
}

/*=================================
            Session UIs
 =================================*/

function Session() {
  this.Render = function (Container) {
    const ContainerEl = document.getElementById(Container);
    ContainerEl.innerHTML = `
        <div class="card" >
            <div class="card-title text-center mt-4">
                <h4>Session Management</h4>
            </div>
            <div class="d-flex pl-4 pr-4 justify-content-between">
                <div id="doctor-count" class="d-flex align-items-center " style="font-size:22px; font-weight:normal">
                    0 Total doctors
                </div>
                <div class="d-flex">
                    <input class="form form-control form-control-rounded col" id="doctor-search-text" style="width:250px" placeholder="Search by doctor name" onkeyup="handleOnChangeDoctorSearch()"/>
                    <select  class="form form-control form-control-rounded  ml-2 col">
                        <option>All doctors</option>
                        <option>Now Available</option>
                        <option>Sessions Available</option>
                    </select>
                </div>
            </div>
            <div id="DivDoctorsAndSessionTable">
            </div>
                <div class='modal' id='session-select-modal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                <div style="height:100vh; width:100vw;" class="d-flex justify-content-center align-items-center">
                <div id="session-select" style="background-color:white; border-radius:10px;" class="  align-items-center p-3">
                </div>
            </div>
            </div>
        </div>`;
  };
}

function DoctorSessionTable() {
  this.Render = function (Container, Data) {
    let Headers = [
      "#",
      "DoctorName",
      "NearestSession",
      "NoOfSessions",
      "Actions",
    ];

    let DivMain = new Div(undefined, "card-body");

    let DivTablePrescriptions = new Div(undefined, "table-responsive mt-4");
    DivTablePrescriptions.appendChild(
      new TableView(
        "TableSession",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );

    DivMain.appendChild(DivTablePrescriptions);

    BindView(Container, DivMain);

    // Object.values(document.getElementById('TableSession').rows).forEach(function (row, index) {
    //     row.cells[3].classList.add('text-center');
    //     row.cells[4].classList.add('text-center');
    //     row.cells[5].classList.add('text-center');
    //  });
  };
}

function DoctorAndSessionsTable() {
  this.Render = function (Container, Data) {

    const containerElement = document.getElementById(Container);
    const tableBodyContent = Data.map((item, index) => {
      return `<tr>
                <td class="text-center">${index + 1}</td>
                  <td>${item.DoctorName}</td>
                  <td class="text-center">${item.NearestSession}</td>
                  <td class="text-center">${item.NoOfSessions}</td>
                  <td class="d-flex text-center">
                  ${item.Actions}
                  </td>
               </tr>`
    });
    containerElement.innerHTML = `
      <div class="card-body" >
        <div class="table-responsive">
            <table class="table table-striped" id="TableDoctorAndSessions">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Doctor Name</th>
                        <th class="text-center">Nearest Session</th>
                        <th class="text-center">No Of Sessions</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableBodyContent.join('')}
                </tbody>
            </table>
        </div>
      </div>
    `;
  };
}

function showViewMoreSessionsModal(index) {
  const doctorAndSessions = _DoctorsAndSessions[index];
  const doctor = doctorAndSessions?.doctor;
  const doctorName = doctor?.Title + " " + doctor?.FirstName + " " + doctor?.LastName;

  const tableContent = doctorAndSessions?.sessions.map((session, innerIndex) => {
    const date = new Date(session?.TimeStart).toISOString().split("T")[0];
    let TimeStartSplit = session?.TimeStart.split("T")[1].split(":");
    let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
    const startTime = new Date(
        TimeFormat.DateFormat + TimeStart + "Z"
    ).toLocaleTimeString(Language.SelectLanguage, {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return ` <tr>
                    <td>${innerIndex + 1}</td>
                    <td>${doctorName}</td>
                    <td class="text-center">${session.RoomNumber}</td>
                    <td>${date}</td>
                    <td>${startTime}</td>
                    <td class="text-center">${session.AppointmentLimit}</td>
                     <td class="text-center">${session.AppointmentReserved}</td>
                    <td class="text-center">
                        <button class="btn btn-outline-danger p-1  ml-2" onclick="onCLickContinueQuickSuggestedSession(${index}, ${innerIndex})">Appointment</button>
                    </td>
          </tr>`;
  });

  const modalContentElement = document.getElementById('session-select');

  const element = `
    <div class="d-flex justify-content-between">
      <h3>View Sessions</h3>
       <button class="btn btn-light bg-transparent ml-4 p-1 py-0 mb-1 border-0" onclick="$('#session-select-modal').modal('hide')">X</button>
    </div>
      
        <div
            style="overflow:auto; height:178px; scrollbarWidth:thin;marginTop:1rem;marginBottom:1rem; width: 660px"
          >
            <table class="patient-table">
              <thead>
                <tr>
                  <th>#A</th>
                  <th>Doctor</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>A. Limit</th>
                  <th>A. Reserved</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                ${tableContent.join("")}
              </tbody>
            </table>
          </div>
    `;

  modalContentElement.innerHTML = element;

  $("#session-select-modal").modal("show");
}

function AddNewSession() {
  this.Render = function (Container) {
    let CardAddSession = new Div(undefined, "card text-left");
    let CardBodyAddSession = new Div(undefined, "card-body");

    let HeadingAddSession = new Heading4(
      _UpdateSession ? "Update Session" : "Add New Session",
      [new Attribute(_AttributeClass, "card-title mb-3 text-center")]
    );
    CardBodyAddSession.appendChild(HeadingAddSession);

    let RowSubAddSession = new Div(undefined, "row");
    RowSubAddSession.appendChild(new Div(undefined, "col-lg-2"));

    let ColSubAddSession = new Div(undefined, "col-lg-8 text-left");

    RowSubAddSession.appendChild(ColSubAddSession);
    CardBodyAddSession.appendChild(RowSubAddSession);

    let FormAddSession = new Form(undefined);

    let DivFormGroupRowRoom = new Div(undefined, "form-group row");

    let DivFormGroupRowRoomNumber = new Div(undefined, "col-lg-2 col-2");
    DivFormGroupRowRoomNumber.appendChild(
      new Label(undefined, "Room No *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionRoomNumber"),
      ])
    );
    DivFormGroupRowRoomNumber.appendChild(
      new Textbox("TxtSessionRoomNumber", "form-control form-control-rounded", [
        new Attribute(
          _AttributeOnInput,
          "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        ),
        new Attribute(_AttributeMaxLength, "3"),
      ])
    );
    DivFormGroupRowRoom.appendChild(DivFormGroupRowRoomNumber);

    let DivFormGroupRowInstitute = new Div(undefined, "col-lg-3 col-3");
    DivFormGroupRowInstitute.appendChild(
      new Label(undefined, "Branch Name *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionInstituteBranchId"),
      ])
    );
    let DrpSessionInstituteBranch = new Select("DrpSessionInstituteBranchId", [
      new Attribute(_AttributeClass, "form-control form-control-rounded"),
    ]);
    DrpSessionInstituteBranch.appendChild(
      new SelectItem("Select Branch", "0", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DivFormGroupRowInstitute.appendChild(DrpSessionInstituteBranch);
    DivFormGroupRowRoom.appendChild(DivFormGroupRowInstitute);

    let DivFormGroupRowSessionDate = new Div(undefined, "col-lg-4 col-4");
    DivFormGroupRowSessionDate.appendChild(
      new Label(undefined, "Session Date *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionDate"),
      ])
    );
    DivFormGroupRowSessionDate.appendChild(
      new Textbox(
        "TxtSessionDate",
        "form-control form-control-rounded Date-Picker",
        [new Attribute(_AttributeType, "text")]
      )
    );
    DivFormGroupRowRoom.appendChild(DivFormGroupRowSessionDate);

    let DivFormGroupRowSessionType = new Div(undefined, "col-lg-3 col-3");
    DivFormGroupRowSessionType.appendChild(
      new Label(undefined, "Session Type *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionType"),
      ])
    );
    let DrpSessionType = new Select("DrpSessionType", [
      new Attribute(_AttributeClass, "form-control form-control-rounded"),
    ]);
    DrpSessionType.appendChild(
      new SelectItem("Physical", "2", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DrpSessionType.appendChild(
      new SelectItem("Virtual", "1", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DrpSessionType.appendChild(
      new SelectItem("Both", "3", [
        new Attribute(_AttributeClass, "form-control form-control-rounded"),
      ])
    );
    DivFormGroupRowSessionType.appendChild(DrpSessionType);
    DivFormGroupRowRoom.appendChild(DivFormGroupRowSessionType);
    FormAddSession.appendChild(DivFormGroupRowRoom);

    let DivFormGroupRowStart = new Div(undefined, "form-group row");
    let DivFormGroupRowStartTime = new Div(undefined, "col-lg-6 col-6");
    DivFormGroupRowStartTime.appendChild(
      new Label(undefined, "Start Time *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionStart"),
      ])
    );
    DivFormGroupRowStartTime.appendChild(
      new Textbox(
        "TxtSessionStart",
        "form-control form-control-rounded Time-Picker z-1",
        [new Attribute(_AttributeType, "text")]
      )
    );
    DivFormGroupRowStart.appendChild(DivFormGroupRowStartTime);

    let DivFormGroupRowEnd = new Div(undefined, "col-lg-6 col-6");
    DivFormGroupRowEnd.appendChild(
      new Label(undefined, "End Time *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionEnd"),
      ])
    );
    DivFormGroupRowEnd.appendChild(
      new Textbox(
        "TxtSessionEnd",
        "form-control form-control-rounded Time-Picker z-1",
        [new Attribute(_AttributeType, "text")]
      )
    );
    DivFormGroupRowStart.appendChild(DivFormGroupRowEnd);
    FormAddSession.appendChild(DivFormGroupRowStart);

    let DivAppointmentBlock = new Div(undefined, "form-group row");

    let DivMaxAppointmentNumber = new Div(undefined, "col-lg-6 col-6");
    DivMaxAppointmentNumber.appendChild(
      new Label(undefined, "Max. No of appointments", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionMaxNumberOfAppointments"),
      ])
    );
    if (_UpdateSession) {
      DivMaxAppointmentNumber.appendChild(
        new Textbox(
          "TxtSessionMaxNumberOfAppointments",
          "form-control form-control-rounded",
          [
            new Attribute(
              _AttributeOnInput,
              "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            ),
            new Attribute(_AttributeMaxLength, "3"),
            new Attribute("disabled", "true"),
          ]
        )
      );
    } else {
      DivMaxAppointmentNumber.appendChild(
        new Textbox(
          "TxtSessionMaxNumberOfAppointments",
          "form-control form-control-rounded",
          [
            new Attribute(
              _AttributeOnInput,
              "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            ),
            new Attribute(_AttributeMaxLength, "3"),
          ]
        )
      );
    }
    DivAppointmentBlock.appendChild(DivMaxAppointmentNumber);

    //update is impossible with current APIs
    let DivBlockAppointmentTill = new Div(undefined, "col-lg-6 col-6");
    DivBlockAppointmentTill.appendChild(
      new Label(undefined, "No of reserved appointments", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtSessionNumberOfReservedAppointments"),
      ])
    );
    if (_UpdateSession) {
      DivBlockAppointmentTill.appendChild(
        new Textbox(
          "TxtSessionNumberOfReservedAppointments",
          "form-control form-control-rounded",
          [
            new Attribute(
              _AttributeOnInput,
              "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            ),
            new Attribute(_AttributeMaxLength, "3"),
            new Attribute("disabled", "true"),
          ]
        )
      );
    } else {
      DivBlockAppointmentTill.appendChild(
        new Textbox(
          "TxtSessionNumberOfReservedAppointments",
          "form-control form-control-rounded",
          [
            new Attribute(
              _AttributeOnInput,
              "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
            ),
            new Attribute(_AttributeMaxLength, "3"),
          ]
        )
      );
    }

    DivAppointmentBlock.appendChild(DivBlockAppointmentTill);

    FormAddSession.appendChild(DivAppointmentBlock);

    let FormGroupRowSaveSession = new Div(undefined, "modal-footer row mt-4");
    FormGroupRowSaveSession.appendChild(
      new Button("BtnSaveSession", "Save", "btn btn-rounded btn-info  mt-2", [
        new Attribute(_AttributeOnClick, "CmdSaveSession_Click()"),
      ])
    );
    FormGroupRowSaveSession.appendChild(
      new Button(
        "BtnCancelSession",
        "Cancel",
        "btn btn-rounded btn-warning  mt-2",
        [new Attribute(_AttributeOnClick, "CmdCancelSession_Click()")]
      )
    );
    FormAddSession.appendChild(FormGroupRowSaveSession);
    ColSubAddSession.appendChild(FormAddSession);

    RowSubAddSession.appendChild(new Div(undefined, "col-lg-2"));
    CardAddSession.appendChild(CardBodyAddSession);

    BindView(Container, CardAddSession);
  };
}

function SessionTable() {
  this.Render = function (Container) {
    let Headers = ["Date", "Time", "Gender", "Dep"];

    let CardSessionTable = new Div(undefined, "card text-left");
    let CardBodySessionTable = new Div(undefined, "card-body");

    let HeadingSessionTable = new Heading4("Patient Data", undefined);
    let ImageSessionTable = new Imagebox(
      undefined,
      "images/add-icon.png",
      undefined,
      "Add Icon Image",
      [
        new Attribute(_AttributeClass, "TopIcons pres-img"),
        new Attribute(_AttributeOnClick, "CmdPrescriptionUpload_Click()"),
      ]
    );
    HeadingSessionTable.appendChild(ImageSessionTable);
    CardBodySessionTable.appendChild(HeadingSessionTable);

    let DivSessionTable = new Div(undefined, "table-responsive");
    let Commands = [
      new DataGridCommand(
        "Edit",
        "<i class='i-Edit'></i>",
        DataGridCommandType.Link,
        "btn btn-success btn-icon m-1",
        "RowReportsPreview_Click()",
        false
      ),
      new DataGridCommand(
        "Delete",
        "<i class='i-Delete-Window'></i>",
        DataGridCommandType.Link,
        "btn btn-danger btn-icon m-1",
        "RowReportsPreview_Click()",
        false
      ),
    ];

    DivSessionTable.appendChild(
      new TableView(
        "TableSelectPatient",
        "table table-striped",
        Headers,
        Data,
        Commands
      )
    );

    CardBodySessionTable.appendChild(DivSessionTable);

    CardSessionTable.appendChild(CardBodySessionTable);

    BindView(Container, CardSessionTable);
  };
}

/*=================================
            Appoinment UIs
 =================================*/

function Appoinments() {
  this.Render = function (Container) {
    let CardAppoinments = new Div(undefined, "card text-left");
    let CardBodyAppoinments = new Div(undefined, "card-body");

    let HeadingAppoinments = new Heading4("Appoinments", [
      new Attribute(_AttributeClass, "card-title mb-3 text-center"),
    ]);
    CardBodyAppoinments.appendChild(HeadingAppoinments);

    let SearchRow = new Div("AppointmentsSearchRow", "row");
    SearchRow.appendChild(new Div(undefined, "col-lg-2"));

    let ColSub0Appoinments = new Div(undefined, "col-lg-8 text-center");
    SearchRow.appendChild(ColSub0Appoinments);
    CardBodyAppoinments.appendChild(SearchRow);

    let FormAppoinments = new Form(undefined);

    let FormRow0Appoinment = new Div(undefined, "form-group row mt-3");
    let DivFormRowDoctor = new Div(undefined, "col-sm-12 col-12 text-left ");
    let LabelAppoinment = new Label(undefined, "Select Doctor *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpAppoinmentsDoctor"),
    ]);
    let SelectAppoinment = new Select("DrpAppoinmentDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
      new Attribute(
        _AttributeOnChange,
        "GetDoctorSessionDataForAppoinment('Appoinments')"
      ),
    ]);
    SelectAppoinment.appendChild(
      new SelectItem("Select Doctor", " ", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    DivFormRowDoctor.appendChild(LabelAppoinment);
    DivFormRowDoctor.appendChild(SelectAppoinment);
    FormRow0Appoinment.appendChild(DivFormRowDoctor);
    FormAppoinments.appendChild(FormRow0Appoinment);

    let FormRow1Appoinment = new Div(undefined, "form-group row mt-3");
    let DivFormRowSession = new Div(undefined, "col-sm-12 col-12 text-left ");
    let LabelAppoinmentSession = new Label(undefined, "Select Session *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpSessionDateDoctor"),
    ]);
    let SelectAppoinmentSession = new Select("DrpSessionDateDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
    ]);
    SelectAppoinmentSession.appendChild(
      new SelectItem("Select Session", " ", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    DivFormRowSession.appendChild(LabelAppoinmentSession);
    DivFormRowSession.appendChild(SelectAppoinmentSession);
    FormRow1Appoinment.appendChild(DivFormRowSession);
    FormAppoinments.appendChild(FormRow1Appoinment);

    let FormRow3PatientSearch = new Div(undefined, "form-group row");
    let DivFormRowNext = new Div(undefined, "col-sm-12 col-12");
    let ButtonPatientSearch = new Button(
      undefined,
      "Next",
      "btn btn-primary btn-rounded w-100",
      [new Attribute(_AttributeOnClick, "SetAppoinmentToDoctor_Click()")]
    );
    DivFormRowNext.appendChild(ButtonPatientSearch);
    FormRow3PatientSearch.appendChild(DivFormRowNext);
    FormAppoinments.appendChild(FormRow3PatientSearch);

    ColSub0Appoinments.appendChild(FormAppoinments);

    let FormGroupRow0Table = new Div(
      "AppointmentsSearchResultsRow",
      "form-group row"
    );
    FormGroupRow0Table.appendChild(
      new Div("DivAppointedPatientTable", "col-lg-12")
    );
    CardBodyAppoinments.appendChild(FormGroupRow0Table);

    CardAppoinments.appendChild(CardBodyAppoinments);

    BindView(Container, CardAppoinments);
  };
}

function NewAppoinment() {
  this.Render = function (Container) {
    let CardAddAppoinment = new Div(undefined, "card text-left");
    let CardBodyAddAppoinment = new Div(undefined, "card-body");

    CardBodyAddAppoinment.appendChild(
      new Heading4("Appointments", [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
      ])
    );

    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetails"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetailsSession"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetailsPatient"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointPaymentCheck"),
      ])
    );

    let AppointmentAddRow = new Div("NewAppointmentAddRow", "row");
    let AppointmentAddRowColumn = new Div(undefined, "col-lg-12 mt-4");

    let FormGroupRow = new Div(undefined, "form-group row");
    FormGroupRow.appendChild(new Div(undefined, "col-lg-3"));

    let DivFormGroupRowCheckAppointment = new Div(
      undefined,
      "col-lg-3 text-center"
    );
    DivFormGroupRowCheckAppointment.appendChild(
      new Label(undefined, "Paid Appoinment *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAppoinmentNumber"),
      ])
    );
    DivFormGroupRowCheckAppointment.appendChild(
      new Checkbox("CheckAppoinmentNumber", undefined, [
        new Attribute(_AttributeOnClick, "CmdChkAppointment_Click()"),
        new Attribute(_AttributeClass, "form-control"),
      ])
    );

    let DivFormGroupRowAppointment = new Div(undefined, "col-lg-3");
    DivFormGroupRowAppointment.appendChild(
      new Label(undefined, "Available Appointment *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAppoinmentNumber"),
      ])
    );
    DivFormGroupRowAppointment.appendChild(
      new Textbox(
        "TxtAppoinmentNumber",
        "form-control form-control-rounded Time-Picker",
        [
          new Attribute(
            _AttributeOnInput,
            "javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
          ),
          new Attribute(_AttributeMaxLength, "3"),
        ]
      )
    );

    let DivFormGroupRowSaveAppointment = new Div(
      "IdBtnAppointment",
      "col-lg-3"
    );
    DivFormGroupRowSaveAppointment.appendChild(
      new Button(
        "BtnSaveAppointment",
        "Save",
        "btn btn-rounded btn-info  mt-4 w-100",
        [new Attribute(_AttributeOnClick, "SaveAppointment_Click()")]
      )
    );
    DivFormGroupRowSaveAppointment.appendChild(
      new Button(
        "BtnNewAppointment",
        "+ New Appointment",
        "btn btn-rounded btn-info  mt-4 w-100",
        [
          new Attribute(_AttributeOnClick, "AddPatientAppointment_Click()"),
          new Attribute("style", "display: none;"),
        ]
      )
    );

    FormGroupRow.appendChild(DivFormGroupRowCheckAppointment);
    FormGroupRow.appendChild(DivFormGroupRowAppointment);
    FormGroupRow.appendChild(DivFormGroupRowSaveAppointment);
    AppointmentAddRowColumn.appendChild(FormGroupRow);
    AppointmentAddRow.appendChild(AppointmentAddRowColumn);
    CardBodyAddAppoinment.appendChild(AppointmentAddRow);

    let AppointmentSearchRow = new Div("NewAppointmentSearchRow", "row");
    let SearchColumnOne = new Div(undefined, "col-lg-12 text-center");
    AppointmentSearchRow.appendChild(SearchColumnOne);
    CardBodyAddAppoinment.appendChild(AppointmentSearchRow);

    let FormAppoinments = new Form(undefined);
    let FormRow0Appoinment = new Div(undefined, "form-group row mt-3");

    let DivFormRowDoctor = new Div(undefined, "col-sm-3 text-left");
    let LabelAppoinment = new Label(undefined, "Select Doctor *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpAppoinmentsDoctor"),
    ]);
    let SelectAppoinment = new Select("DrpAppoinmentDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
      new Attribute(
        _AttributeOnChange,
        "GetDoctorSessionDataForAppoinment('NewAppoinment')"
      ),
    ]);
    SelectAppoinment.appendChild(
      new SelectItem("Select Doctor", " ", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    DivFormRowDoctor.appendChild(LabelAppoinment);
    // let MandatoryStar = new Label(undefined, " *", [new Attribute(_AttributeClass, "ml-2 mandatory")]);
    // DivFormRowDoctor.appendChild(MandatoryStar);
    DivFormRowDoctor.appendChild(SelectAppoinment);
    FormRow0Appoinment.appendChild(DivFormRowDoctor);

    let DivFormRowSession = new Div(undefined, "col-sm-3 text-left");

    const DateToday = new Date().toISOString().slice(0, 10);
    let DivFormRowDate = new Div(undefined, "col-sm-3 text-left");
    let LabelAppointmentDate = new Label(undefined, "Select Date *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentSearchDate"),
    ]);
    let AppointmentDateSelect = new Textbox(
      "TxtAppointmentSearchDate",
      "form-control form-control-rounded Date-Picker",
      [
        new Attribute(_AttributeType, "date"),
        new Attribute("value", DateToday),
        new Attribute(
          _AttributeOnChange,
          "GetDoctorSessionDataForAppoinment('NewAppoinment')"
        ),
      ]
    );

    DivFormRowDate.appendChild(LabelAppointmentDate);
    DivFormRowDate.appendChild(AppointmentDateSelect);
    FormRow0Appoinment.appendChild(DivFormRowDate);

    let LabelAppoinmentSession = new Label(undefined, "Select Session *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpSessionDateDoctor"),
    ]);

    let SelectAppoinmentSession = new Select("DrpSessionDateDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
    ]);

    SelectAppoinmentSession.appendChild(
      new SelectItem("Select Session", " ", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );

    DivFormRowSession.appendChild(LabelAppoinmentSession);
    DivFormRowSession.appendChild(SelectAppoinmentSession);
    FormRow0Appoinment.appendChild(DivFormRowSession);

    let DivFormRowSearch = new Div(undefined, "col-sm-3 d-flex mt-2");
    let ButtonPatientSearch = new Button(
      "AppointmentsSearchButton",
      "Search",
      "btn btn-primary btn-rounded w-100 mt-auto",
      [new Attribute(_AttributeOnClick, "Appointments_Search()")]
    );

    DivFormRowSearch.appendChild(ButtonPatientSearch);
    FormRow0Appoinment.appendChild(DivFormRowSearch);

    FormAppoinments.appendChild(FormRow0Appoinment);
    SearchColumnOne.appendChild(FormAppoinments);

    let AppointmentSearchResultsRow = new Div(
      "NewAppointmentSearchResultsRow",
      "form-group row"
    );
    AppointmentSearchResultsRow.appendChild(
      new Div("DivAppointedPatientTable", "col-lg-12")
    );
    CardBodyAddAppoinment.appendChild(AppointmentSearchResultsRow);

    CardAddAppoinment.appendChild(CardBodyAddAppoinment);

    BindView(Container, CardAddAppoinment);
    const ContainerEl = document.getElementById(Container);
    ContainerEl.innerHTML += `<div class='modal' id='show-patients-modal' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                        <div style="height:100vh; width:100vw;" class="d-flex justify-content-center align-items-center">
                                            <div id="show-patients-content" style="background-color:white; border-radius:10px;" class="  align-items-center p-3">
                                            
                                            </div>
                                        </div>
                                    </div>`;

    // console.log('NewAppoinment._CardClicked:', _CardClicked);
    if (_CardClicked === "" || _CardClicked === "PatientSearch") {
      $("#NewAppointmentSearchRow").hide();
      $("#NewAppointmentAddRow").show();
    } else if (_CardClicked === "Appointments") {
      $("#NewAppointmentAddRow").hide();
      $("#NewAppointmentSearchRow").show();
    }

    $("#TxtAppointmentSearchDate").prop("type", "date");
  };
}

function ShowPatientsModal(propName) {
  console.log(propName);
  _ViewedDoctorSessionName = propName;
  const appointments = groupedData[propName];
  if(!appointments) return;

  const tableContent = appointments.map((appointment, index) => {
    const date = new Date(appointment?.TimeStart).toISOString().split("T")[0];
    const paymentStatus = appointment?.IsPaid ? "Paid" : "Unpaid";
    let TimeStartSplit = appointment?.TimeStart.split("T")[1].split(":");
    let TimeStart = TimeStartSplit[0] + ":" + TimeStartSplit[1];
    const startTime = new Date(
      TimeFormat.DateFormat + TimeStart + "Z"
    ).toLocaleTimeString(Language.SelectLanguage, {
      timeZone: "UTC",
      hour12: true,
      hour: "numeric",
      minute: "numeric",
    });
    return ` <tr>
                    <td>${appointment.Number}</td>
                    <td>${appointment.DoctorName}</td>
                    <td>${date}</td>
                    <td>${startTime}</td>
                    <td class="text-center">
                    ${appointment?.IsPaid ? appointment.PaymentTypeIcon : `<button class="btn btn-outline-primary p-1" ${appointment?.IsPaid ? "disabled" : ""} onclick="AppointmentDetailsEdit(${appointment?.Id},${appointment.Number},${appointment.SessionId},${appointment.PatientId},1, ${appointment.Status},${appointment.DoctorId})">${paymentStatus}</button>`}
                    </td>
                    <td class="text-center">
                        ${appointment?.ChannelingStatus === "Pending" ? 
                        `<button class="btn btn-outline-primary p-1"  onclick="AppointmentChannelingStatusEdit(${appointment?.Id})">${appointment.ChannelingStatus}</button>` 
                      : `<button class="btn btn-outline-primary p-1" disabled >${appointment.ChannelingStatus}</button>`}
                    </td>
                    <td class="d-flex justify-content-center">
                        <button class="btn btn-outline-warning p-1" onclick="AppointmentDetailsEdit(${appointment?.Id},${appointment.Number},${appointment.SessionId},${appointment.PatientId},0, ${appointment.Status},${appointment.DoctorId})">Edit</button>
                        <button class="btn btn-outline-danger p-1  ml-2" onclick="MedicalBillDisplay(${appointment?.Id},0,${appointment?.DoctorId})">View bill</button>
                    </td>
          </tr>`;
  });

  const modalContentElement = document.getElementById("show-patients-content");

  const element = `
    <div class="d-flex justify-content-between">
      <h3>View Appointments</h3>
       <button class="btn btn-light bg-transparent ml-4 p-1 py-0 mb-1 border-0" onclick="$('#show-patients-modal').modal('hide');_ViewedDoctorSessionName='';$('.modal-backdrop').remove();">X</button>
    </div>
      
        <div
            style="overflow:auto; height:350px; scrollbarWidth:thin;marginTop:1rem;marginBottom:1rem; width: 660px"
          >
            <table class="patient-table">
              <thead>
                <tr>
                  <th>#A</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th  class="text-center">Payment Status</th>
                  <th>Status</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                ${tableContent.join("")}
              </tbody>
            </table>
          </div>
    `;

  modalContentElement.innerHTML = element;

  $("#show-patients-modal").modal("show");
}

function VitalsEditor() {
  this.Render = function (Container) {
    let CardAddAppoinment = new Div(undefined, "card text-left");
    let CardBodyAddAppoinment = new Div(undefined, "card-body");

    let FormGroupRowPatientVitals = new Div("PatientVitals", "form-group row ");
    let DivFormGroupRowAddAppoinment = new Div(undefined, "col-lg-12");

    let NavAddAppoinment = new Nav();
    let DivNavAddAppoinment = new Div("nav-tab", "nav nav-tabs", [
      new Attribute(_AttributeRole, "tablist"),
    ]);
    DivNavAddAppoinment.appendChild(
      new Hyperlink(
        "nav-bmi-tab",
        "#nav-bmi",
        "BMI",
        "nav-item nav-link show",
        [
          new Attribute(_AttributeDataToggle, "tab"),
          new Attribute(_AttributeRole, "role"),
          new Attribute(_AttributeAreaControl, "nav-bmi"),
          new Attribute(_AttributeAreaSelected, "true"),
        ]
      )
    );
    DivNavAddAppoinment.appendChild(
      new Hyperlink(
        "nav-pressure-tab",
        "#nav-pressure",
        "Pressure",
        "nav-item nav-link",
        [
          new Attribute(_AttributeDataToggle, "tab"),
          new Attribute(_AttributeRole, "role"),
          new Attribute(_AttributeAreaControl, "nav-pressure"),
          new Attribute(_AttributeAreaSelected, "false"),
        ]
      )
    );
    DivNavAddAppoinment.appendChild(
      new Hyperlink("nav-temp-tab", "#nav-temp", "Temp", "nav-item nav-link", [
        new Attribute(_AttributeDataToggle, "tab"),
        new Attribute(_AttributeRole, "role"),
        new Attribute(_AttributeAreaControl, "nav-temp"),
        new Attribute(_AttributeAreaSelected, "false"),
      ])
    );
    // DivNavAddAppoinment.appendChild(new Hyperlink("nav-file-upload-tab", "#nav-file-upload", "File Upload", "nav-item nav-link", [new Attribute(_AttributeDataToggle, "tab"), new Attribute(_AttributeRole, "role"), new Attribute(_AttributeAreaControl, "nav-file-upload"), new Attribute(_AttributeAreaSelected, "false")]));

    NavAddAppoinment.appendChild(DivNavAddAppoinment);
    DivFormGroupRow1.appendChild(NavAddAppoinment);

    let DivContentNavAddAppoinment = new Div(
      "na-tabContent",
      "tab-content ul-tab__content"
    );
    DivContentNavAddAppoinmentBMI = new Div("nav-bmi", "tab-pane fade", [
      new Attribute(_AttributeRole, "tabpanel"),
      new Attribute(_AttributeAreaLabledBy, "nav-bmi-tab"),
    ]);

    let FormGroupRow1BMI = new Div(undefined, "form-group row");
    FormGroupRow1BMI.appendChild(
      new Label(undefined, "Height(Cm)", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtBMIHeight"),
      ])
    );
    FormGroupRow1BMI.appendChild(
      new Textbox("TxtBMIHeight", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
      ])
    );
    DivContentNavAddAppoinmentBMI.appendChild(FormGroupRow1BMI);

    let FormGroupRow2BMI = new Div(undefined, "form-group row");
    FormGroupRow2BMI.appendChild(
      new Label(undefined, "Weight(Kg)", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtBMIWeight"),
      ])
    );
    FormGroupRow2BMI.appendChild(
      new Textbox("TxtBMIWeight", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
        new Attribute(_AttributeOnChange, "BMICalculator()"),
      ])
    );
    DivContentNavAddAppoinmentBMI.appendChild(FormGroupRow2BMI);

    FormGroupRow2BMI.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "mt-3 text-center"),
        new Attribute(_AttributeId, "TxtBMIValue"),
      ])
    );

    DivContentNavAddAppoinment.appendChild(DivContentNavAddAppoinmentBMI);

    DivContentNavAddAppoinmentPressure = new Div(
      "nav-pressure",
      "tab-pane fade",
      [
        new Attribute(_AttributeRole, "tabpanel"),
        new Attribute(_AttributeAreaLabledBy, "nav-pressure-tab"),
      ]
    );

    let FormGroupRow1Pressure = new Div(undefined, "form-group row");
    FormGroupRow1Pressure.appendChild(
      new Label(undefined, "BP Systolic", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPressureBp"),
      ])
    );
    FormGroupRow1Pressure.appendChild(
      new Textbox(
        "TxtPressureBpSystolic",
        "form-control form-control-rounded",
        [new Attribute(_AttributeType, "text")]
      )
    );
    DivContentNavAddAppoinmentPressure.appendChild(FormGroupRow1Pressure);

    let FormGroupRow2Pressure = new Div(undefined, "form-group row");
    FormGroupRow2Pressure.appendChild(
      new Label(undefined, "BP Diastolic", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPressureBp"),
      ])
    );
    FormGroupRow2Pressure.appendChild(
      new Textbox(
        "TxtPressureBpDiastolic",
        "form-control form-control-rounded",
        [new Attribute(_AttributeType, "text")]
      )
    );
    DivContentNavAddAppoinmentPressure.appendChild(FormGroupRow2Pressure);

    let FormGroupRow3Pressure = new Div(undefined, "form-group row");
    FormGroupRow3Pressure.appendChild(
      new Label(undefined, "Pulse", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPressurePulse"),
      ])
    );
    FormGroupRow3Pressure.appendChild(
      new Textbox("TxtPressurePulse", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
      ])
    );
    DivContentNavAddAppoinmentPressure.appendChild(FormGroupRow3Pressure);

    DivContentNavAddAppoinment.appendChild(DivContentNavAddAppoinmentPressure);

    DivContentNavAddAppoinmentTemp = new Div("nav-temp", "tab-pane fade", [
      new Attribute(_AttributeRole, "tabpanel"),
      new Attribute(_AttributeAreaLabledBy, "nav-temp-tab"),
    ]);
    let FormGroupRow1Temp = new Div(undefined, "form-group row");
    FormGroupRow1Temp.appendChild(
      new Label(undefined, "Temperature(F)", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPressureTemp"),
      ])
    );
    FormGroupRow1Temp.appendChild(
      new Textbox("TxtPressureTemp", "form-control form-control-rounded", [
        new Attribute(_AttributeType, "text"),
      ])
    );
    DivContentNavAddAppoinmentTemp.appendChild(FormGroupRow1Temp);
    DivContentNavAddAppoinment.appendChild(DivContentNavAddAppoinmentTemp);

    DivFormGroupRowAddAppoinment.appendChild(DivContentNavAddAppoinment);

    FormGroupRowPatientVitals.appendChild(DivFormGroupRowAddAppoinment);
    CardBodyAddAppoinment.appendChild(FormGroupRowPatientVitals);

    let FormGroupRowAppointment = new Div(undefined, "modal-footer row mt-4");
    FormGroupRowAppointment.appendChild(
      new Button(
        "BtnSaveAppointment",
        "Save",
        "btn btn-rounded btn-info  mt-2",
        [new Attribute(_AttributeOnClick, "SavePatientAnalytics()")]
      )
    );
    FormGroupRowAppointment.appendChild(
      new Button(
        "BtnCancelSession",
        "Cancel",
        "btn btn-rounded btn-warning  mt-2",
        [new Attribute(_AttributeOnClick, "CmdCancelSession_Click()")]
      )
    );
    CardBodyAddAppoinment.appendChild(FormGroupRowAppointment);

    CardBodyAddAppoinment.appendChild(new Div(undefined, "col-lg-1"));

    CardAddAppoinment.appendChild(CardBodyAddAppoinment);

    BindView(Container, CardAddAppoinment);
  };
}

function DocumentUploader() {
  this.Render = function (Container) {
    let CardAddAppoinment = new Div(undefined, "card text-left");
    let CardBodyAddAppoinment = new Div(undefined, "card-body");

    let FormGroupRowPatientVitals = new Div("PatientVitals", "form-group row");
    let DivFormGroupRowPatientVitals = new Div(undefined, "col-lg-12");

    let FormRow1PrescriptionUpload = new Div(undefined, "form-group row mt-3");
    let DivFormRowUploader = new Div(undefined, "col-sm-8 col-8");
    let InputPrescriptionFileName = new FileUpload("FilePrescriptionChoosen", [
      new Attribute(_AttributeClass, "form-control form-control-rounded"),
      new Attribute(
        _AttributeOnChange,
        "FileChoosenValidate('FilePrescriptionChoosen')"
      ),
      new Attribute(_AttributeHidden, "hidden"),
    ]);
    let SpanPrescriptionFileName = new Span(
      "SpanPrescriptionFile",
      "No File Selected",
      "form-control form-control-rounded"
    );

    DivFormRowUploader.appendChild(InputPrescriptionFileName);
    DivFormRowUploader.appendChild(SpanPrescriptionFileName);
    FormRow1PrescriptionUpload.appendChild(DivFormRowUploader);

    let DivFormRowDocumentUploader = new Div(undefined, "col-sm-4 col-4");
    let ButtonUploadPrescriptionImage = new Button(
      "CmdUploadPrescription",
      "Choose",
      "btn btn-primary btn-rounded w-100",
      [
        new Attribute(
          _AttributeOnClick,
          "CmdUploadFile_Click('FilePrescriptionChoosen', 'SpanPrescriptionFile')"
        ),
      ]
    );
    DivFormRowDocumentUploader.appendChild(ButtonUploadPrescriptionImage);
    FormRow1PrescriptionUpload.appendChild(DivFormRowDocumentUploader);

    DivFormGroupRowPatientVitals.appendChild(FormRow1PrescriptionUpload);

    let FormRow2PrescriptionUpload = new Div(undefined, "form-group row");
    let DivFormRow3PatientReports = new Div(undefined, "col-sm-12 col-12");
    let ButtonUploadPatientReports = new Button(
      undefined,
      "Upload",
      "btn btn-primary btn-rounded w-100",
      [new Attribute(_AttributeOnClick, "CmdUploadReportFile_Click()")]
    );
    DivFormRow3PatientReports.appendChild(ButtonUploadPatientReports);
    let ButtonCloseFileUpload = new Button(
      undefined,
      "Close",
      "btn btn-primary btn-rounded w-100 mt-2",
      [
        new Attribute(
          _AttributeOnClick,
          "CmdAppoinments_Click('AppoinmentsCard')"
        ),
      ]
    );
    DivFormRow3PatientReports.appendChild(ButtonCloseFileUpload);
    FormRow2PrescriptionUpload.appendChild(DivFormRow3PatientReports);
    DivFormGroupRowPatientVitals.appendChild(FormRow2PrescriptionUpload);

    FormGroupRowPatientVitals.appendChild(DivFormGroupRowPatientVitals);
    CardBodyAddAppoinment.appendChild(FormGroupRowPatientVitals);

    CardBodyAddAppoinment.appendChild(new Div(undefined, "col-lg-1"));

    CardAddAppoinment.appendChild(CardBodyAddAppoinment);

    BindView(Container, CardAddAppoinment);
  };
}

function TablePatientAppointment() {
  this.Render = function (Container, Data) {
    let Headers = [
      "A#",
      "Doctor",
      "Session Start",
      "No of Appointments",
      "Action",
    ];

    let DivMainAppointmnetTable = new Div(undefined, "card-body");
    let DivHeadingPrescriptions = new Div(undefined, "col-lg-12");

    let HeadingPrescriptions = new Heading4("Patient Appointments", undefined);

    if (_CardClicked != "Appointments") {
      DivHeadingPrescriptions.innerHTML = `<div class="row px-0 d-flex justify-content-between mb-2">
        <h4>Patient Appointments</h4>
        </div>`;

      DivMainAppointmnetTable.appendChild(DivHeadingPrescriptions);
    }

    let DivTablePrescriptions = new Div(undefined, "table-responsive");
    DivTablePrescriptions.appendChild(
      new TableView(
        "TableAppointedPatient",
        "table table-striped display responsive",
        Headers,
        Data,
        undefined
      )
    );

    DivMainAppointmnetTable.appendChild(DivTablePrescriptions);
    BindView(Container, DivMainAppointmnetTable);

    Object.values(
      document.getElementById("TableAppointedPatient").rows
    ).forEach(function (row, index) {
      row.cells[1].classList.add("text-center");
      row.cells[2].classList.add("text-center");
      row.cells[3].classList.add("text-center");
      row.cells[4].classList.add("text-center");
    });
  };
}

function MedicalBill(Patient, appId) {
  this.Render = function (Container) {
    const MedicalBillModal = new Div("ModalMedicalBill", "modal");
    MedicalBillModal.setAttribute("data-backdrop", "static");
    MedicalBillModal.setAttribute("data-keyboard", "false");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    ModalContentHeader.appendChild(new Heading4("Medical Bill", undefined));
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");

    const ModalContentBodyRowOne = new Div(undefined, "row");

    const PatientDataToDisplay = [
      ["Patient:", "LabelPatientName"],
      ["Age:", "LabelPatientAge"],
      ["Tel. No:", "LabelPatientTelephoneNo"],
      ["Date:", "LabelMedicalBillDate"],
    ];

    const PatientsAge =
      parseInt(new Date().getFullYear().toString()) -
      parseInt(Patient?.DateOfBirth.split("-")[0]);

    for (let i = 0; i < PatientDataToDisplay.length; i++) {
      let LabelValueText = "-";
      switch (i) {
        case 0:
          LabelValueText =
            Patient.Title + " " + Patient.FirstName + " " + Patient.LastName;
          break;

        case 1:
          LabelValueText = PatientsAge;
          break;

        case 2:
          LabelValueText = Patient.Mobile;
          break;

        case 3:
          LabelValueText = new Date().toISOString().slice(0, 10);
          break;
      }

      const InnerArray = PatientDataToDisplay[i];
      const LabelText = InnerArray[0];
      const LabelValueTextId = InnerArray[1];

      const ColumnOne = new Div(undefined, "col-md-2");
      ColumnOne.appendChild(new Label(undefined, LabelText, undefined));
      ModalContentBodyRowOne.appendChild(ColumnOne);

      const ColumnTwo = new Div(undefined, "col-md-10");
      ColumnTwo.appendChild(
        new Label(LabelValueTextId, LabelValueText, undefined)
      );
      ModalContentBodyRowOne.appendChild(ColumnTwo);
    }

    //modal content body > row one
    ModalContentBody.appendChild(ModalContentBodyRowOne);
    //modal content body > row two
    const ModalContentBodyRowTwo = MedicalBillTableWithDynamicRowsGet();
    ModalContentBody.appendChild(ModalContentBodyRowTwo);

    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseMedicalBill", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnPrintMedicalBill", "Print", "btn btn-primary mx-2", [
        // new Attribute('data-dismiss', 'modal'),
        new Attribute(
          _AttributeOnClick,
          "medicalBillSave(" + Patient.Id + "," + appId + ")"
        ),
        // new Attribute(_AttributeOnClick, 'medicalBillSave(' + Patient.Id + ',' + appId + ')')
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnSaveMedicalBill", "Save", "btn btn-primary", [
        // new Attribute('data-dismiss', 'modal'),
        new Attribute(
          _AttributeOnClick,
          "medicalBillSave(" + Patient.Id + "," + appId + ")"
        ),
        // new Attribute(_AttributeOnClick, 'medicalBillSave(' + Patient.Id + ',' + appId + ')')
      ])
    );
    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    MedicalBillModal.appendChild(ModalDialog);

    BindView(Container, MedicalBillModal);

    //replace the first empty table row with the pre-defined row
    medicalBillTableFirstRowReplace();

    $("#ModalMedicalBill").modal("show");
  };
}

function MedicalBillTableWithDynamicRowsGet() {
  const ParentRow = new Div(undefined, "row");

  const ParentRowColumnOne = new Div(undefined, "col-md-12");
  ParentRowColumnOne.appendChild(
    new Button(
      undefined,
      "Remove All Rows",
      "btn btn-danger btn-sm float-right mb-3",
      [new Attribute(_AttributeOnClick, "medicalBillTableAllRowsRemove()")]
    )
  );

  const ParentRowColumnTwo = new Div(undefined, "col-md-12");

  const TableWrapper = new Div(undefined, "table-responsive");
  const TableHeaders = ["#", "Item *", "Fee Type *", "Amount (Rs.) *", ""];
  const TableData = [];
  const Table = new TableView(
    "TblPatientInvoice",
    "table",
    TableHeaders,
    TableData,
    undefined
  );
  TableWrapper.appendChild(Table);
  ParentRowColumnTwo.appendChild(TableWrapper);
  ParentRowColumnTwo.innerHTML += `
    <div class="d-flex justify-content-end w-100 mb-3">
        <button class="btn btn-primary" onclick="addNewFee()">Add Fee</button>
    </div>`;

  const ParentRowColumnThree = new Div(undefined, "col-md-12");

  const InnerRowOne = new Div(undefined, "row d-flex justify-content-end");
  const RowOneInnerColumnOne = new Div(undefined, "col-md-2");
  RowOneInnerColumnOne.appendChild(
    new Label(undefined, "Discount (Rs.):", undefined)
  );
  InnerRowOne.appendChild(RowOneInnerColumnOne);
  const RowOneInnerColumnTwo = new Div(undefined, "col-md-3");
  const Discount = new Textbox("TxtDiscount", "form-control form-control", [
    new Attribute(_AttributeType, "number"),
    new Attribute(_AttributeOnChange, "medicalBillTableTotalSumGet()"),
    new Attribute("min", "0"),
    new Attribute("max", ""),
  ]);
  RowOneInnerColumnTwo.appendChild(Discount);
  InnerRowOne.appendChild(RowOneInnerColumnTwo);

  ParentRowColumnThree.appendChild(InnerRowOne);

  const InnerRowTwo = new Div(undefined, "row d-flex justify-content-end");
  const RowTwoInnerColumnOne = new Div(undefined, "col-md-2 mt-2");
  RowTwoInnerColumnOne.appendChild(
    new Label(undefined, "Total Fee (Rs.):", undefined)
  );
  InnerRowTwo.appendChild(RowTwoInnerColumnOne);
  const RowTwoInnerColumnTwo = new Div(undefined, "col-md-3 mt-2 pl-4");
  RowTwoInnerColumnTwo.appendChild(new Span("TxtTotal", "0", undefined));
  InnerRowTwo.appendChild(RowTwoInnerColumnTwo);

  ParentRowColumnThree.appendChild(InnerRowTwo);

  ParentRow.appendChild(ParentRowColumnOne);
  ParentRow.appendChild(ParentRowColumnTwo);
  ParentRow.appendChild(ParentRowColumnThree);

  return ParentRow;
}

function MedicalBillPrintPageIframeModal() {
  this.Render = function (Container) {
    const IframeModal = new Div("ModalForMedicalBillIframe", "modal");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentBody = new Div(undefined, "modal-body");
    // ModalContentBody.appendChild(new Label(undefined, "Modal body..", undefined));
    ModalDialogContent.appendChild(ModalContentBody);

    ModalDialog.appendChild(ModalDialogContent);
    IframeModal.appendChild(ModalDialog);

    // console.log('MedicalBillPrintPageIframeModal.IframeModal',IframeModal);

    BindView(Container, IframeModal);
  };
}

function ClinicMedicalBillPrintPageIframeModal(Prescription) {
  this.Render = function (Container) {
    // console.log('ClinicMedicalBillPrintPageIframeModal.Prescription', Prescription);

    const Modal = new Div("ModalForMedicalClinicBillIframe", "modal");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    ModalContentHeader.appendChild(
      new Heading4("Clinic Medical Bill", undefined)
    );
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");
    const TestText =
      Prescription.AppointmentId +
      ", " +
      Prescription.PatientId +
      ", " +
      Prescription.PatientFullName;
    ModalContentBody.appendChild(new Label(undefined, TestText, undefined));
    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseMedicalBill", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnPrintMedicalBill", "Print", "btn btn-primary mx-2", [
        // new Attribute('data-dismiss', 'modal'),
        new Attribute(
          _AttributeOnClick,
          "medicalBillInputsValidate(" + Prescription.Id + ")"
        ),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnSaveMedicalBill", "Save", "btn btn-primary", [
        // new Attribute('data-dismiss', 'modal'),
        new Attribute(
          _AttributeOnClick,
          "medicalBillInputsValidate(" + Prescription.Id + ")"
        ),
      ])
    );
    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    // console.log('ClinicMedicalBillPrintPageIframeModal.Modal',Modal);

    BindView(Container, Modal);

    $("#ModalForMedicalClinicBillIframe").modal("show");
  };
}

function AppointmentDetailsEditModal() {
  this.Render = function (
    Container,
    AppointmentId,
    ViewType,
    AppointmentNumber,
    doctor
  ) {
    // console.log('AppointmentDetailsEditModal:', Container, AppointmentId, ViewType, AppointmentNumber);

    // console.log('AppointmentDetailsEditModal._ArrayAppointmentsForToday:', _ArrayAppointmentsForToday);
    const AppointmentMatched = _ArrayAppointmentsForToday.filter(
      (Appointment) => Appointment.Id === AppointmentId
    )[0];
    // console.log('AppointmentDetailsEditModal.AppointmentMatched:', AppointmentMatched);

    _AppointmentSelected = AppointmentMatched;

    const Modal = new Div("ModalForAppointmentDetailsEdit", "modal");
    Modal.setAttribute("data-backdrop", "static");
    Modal.setAttribute("data-keyboard", "false");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    if (ViewType === 1) {
      ModalContentHeader.appendChild(new Heading4("Update Payment", undefined));
    } else {
      ModalContentHeader.appendChild(
        new Heading4("Update Appointment", undefined)
      );
    }
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");
    // ModalContentBody.appendChild(new Label(undefined, 'Text', undefined));

    const SearchForm = new Form(undefined);

    //---- row 01

    const FormRowOne = new Div(undefined, "form-group row");
    const ColumnPatientName = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left"
    );
    const AppointmentPatientLabel = new Label(
      "AppointmentPatientLabel",
      "Patient *",
      [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAppointmentUpdatePatientName"),
      ]
    );
    const AppointmentPatientName = new Textbox(
      "TxtAppointmentUpdatePatientName",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute(
          "value",
          AppointmentMatched.FirstName + " " + AppointmentMatched.LastName
        ),
      ]
    );
    // const AppointmentPatientId = new Textbox("TxtAppointmentUpdatePatientId", "form-control form-control-rounded",
    //     [new Attribute(_AttributeType, "hidden"), new Attribute('disabled', 'true'), new Attribute('value', '1')]
    // );
    ColumnPatientName.appendChild(AppointmentPatientLabel);
    ColumnPatientName.appendChild(AppointmentPatientName);

    // RowOneColumnOne.appendChild(AppointmentPatientId);
    FormRowOne.appendChild(ColumnPatientName);

    const ColumnAppointmentId = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const AppointmentNoLabel = new Label(
      "AppointmentNoLabel",
      "Appointment No *",
      [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtAppointmentUpdateAppointmentNo"),
      ]
    );
    const AppointmentNoText = new Textbox(
      "TxtAppointmentUpdateAppointmentNo",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute("value", AppointmentMatched.Number),
      ]
    );
    ColumnAppointmentId.appendChild(AppointmentNoLabel);
    ColumnAppointmentId.appendChild(AppointmentNoText);
    FormRowOne.appendChild(ColumnAppointmentId);

    //---- row 02

    const ColumnDoctor = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const AppointmentDoctorLabel = new Label(undefined, "Doctor *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateDoctor"),
    ]);
    const AppointmentDoctorSelect = new Select("TxtAppointmentUpdateDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
      new Attribute("disabled", "true"),
      new Attribute(
        _AttributeOnChange,
        "GetDoctorsSessionsForAppointmentUpdate()"
      ),
    ]);
    // AppointmentDoctorSelect.appendChild(new SelectItem("Select Doctor", " ",
    //     [new Attribute(_AttributeClass, "form-control form-control-rounded appointment-class")]
    // ));
    ColumnDoctor.appendChild(AppointmentDoctorLabel);
    ColumnDoctor.appendChild(AppointmentDoctorSelect);

    const ColumnTime = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const AppointmentDoctorSessionLabel = new Label(undefined, "Session *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateDoctorSession"),
    ]);
    const AppointmentDoctorSession = new Select(
      "TxtAppointmentUpdateDoctorSession",
      [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded select"
        ),
        new Attribute("disabled", "true"),
      ]
    );
    AppointmentDoctorSession.appendChild(
      new SelectItem("None", " ", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    ColumnTime.appendChild(AppointmentDoctorSessionLabel);
    ColumnTime.appendChild(AppointmentDoctorSession);
    // FormRowOne.appendChild(ColumnEmpty);

    const ColumnDoctorEnable = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-2 text-right mt-2 d-flex"
    );
    const AppointmentDoctorEnable = new Button(
      "BtnAppointmentDoctorEnable",
      "Change",
      "btn btn-primary btn-rounded mt-auto",
      [new Attribute(_AttributeOnClick, "AppointmentDoctorChangeEnable()")]
    );
    ColumnDoctorEnable.appendChild(AppointmentDoctorEnable);

    const ColumnDate = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    // const ColumnEmpty = new Div(undefined, "col-sm-5 text-left mt-2");
    const AppointmentDateLabel = new Label(undefined, "Date *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateDate"),
    ]);
    const DateToday = new Date().toISOString().slice(0, 10);
    let AppointmentDate = "";
    if (ViewType === 1) {
      AppointmentDate = new Textbox(
        "TxtAppointmentUpdateDate",
        "form-control form-control-rounded Date-Picker",
        [
          new Attribute(_AttributeType, "date"),
          new Attribute("value", DateToday),
          new Attribute("min", DateToday),
          new Attribute("disabled", true),
        ]
      );
    } else {
      AppointmentDate = new Textbox(
        "TxtAppointmentUpdateDate",
        "form-control form-control-rounded Date-Picker",
        [
          new Attribute(_AttributeType, "date"),
          new Attribute("value", DateToday),
          new Attribute("min", DateToday),
          new Attribute(
            _AttributeOnChange,
            "GetDoctorsSessionsForAppointmentUpdate()"
          ),
        ]
      );
    }

    // doctor fees
    const ColumnDoctorFee = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const DoctorFeeLabel = new Label("DoctorFeeLabel", "Doctor Payable *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateDoctorFee"),
    ]);
    const AppointmentDoctorFee = new Textbox(
      "TxtAppointmentUpdateDoctorFee",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute("value", parseFloat(doctor?.fees?.DoctorFee).toFixed(2)),
      ]
    );

    ColumnDoctorFee.appendChild(DoctorFeeLabel);
    ColumnDoctorFee.appendChild(AppointmentDoctorFee);
    //doctor fees

    // Hospital fees
    const ColumnHospitalFee = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const HospitalFeeLabel = new Label("HospitalFeeLabel", "Hospital Fee *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateHospitalFee"),
    ]);
    const AppointmentHospitalFee = new Textbox(
      "TxtAppointmentUpdateHospitalFee",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute(
          "value",
          parseFloat(doctor?.fees?.HospitalFee).toFixed(2)
        ),
      ]
    );

    ColumnHospitalFee.appendChild(HospitalFeeLabel);
    ColumnHospitalFee.appendChild(AppointmentHospitalFee);
    //Hospital fees

    // Other fees
    const ColumnOtherFee = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const OtherFeeLabel = new Label("OtherFeeLabel", "Other Fee *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateOtherFee"),
    ]);
    const AppointmentOtherFee = new Textbox(
      "TxtAppointmentUpdateOtherFee",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute("value", parseFloat(doctor?.fees?.OtherFee).toFixed(2)),
      ]
    );

    ColumnOtherFee.appendChild(OtherFeeLabel);
    ColumnOtherFee.appendChild(AppointmentOtherFee);
    //Other fees

    // Service fees
    const ColumnServiceFee = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const ServiceFeeLabel = new Label("ServiceFeeLabel", "Service Fee *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateServiceFee"),
    ]);
    const AppointmentServiceFee = new Textbox(
      "TxtAppointmentUpdateServiceFee",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute("value", parseFloat(250).toFixed(2)),
      ]
    );

    ColumnServiceFee.appendChild(ServiceFeeLabel);
    ColumnServiceFee.appendChild(AppointmentServiceFee);
    //Service fees

    const totalFee = parseFloat(
      doctor?.fees?.DoctorFee +
        doctor?.fees?.HospitalFee +
        doctor?.fees?.OtherFee +
        250
    ).toFixed(2);
    // Total fees
    const ColumnTotalFee = new Div(
      undefined,
      "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
    );
    const TotalFeeLabel = new Label("TotalFeeLabel", "Total Fee *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtAppointmentUpdateTotalFee"),
    ]);
    const AppointmentTotalFee = new Textbox(
      "TxtAppointmentUpdateTotalFee",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributeType, "text"),
        new Attribute("disabled", "true"),
        new Attribute("value", totalFee),
      ]
    );

    ColumnTotalFee.appendChild(TotalFeeLabel);
    ColumnTotalFee.appendChild(AppointmentTotalFee);
    //Total fees

    ColumnDate.appendChild(AppointmentDateLabel);
    ColumnDate.appendChild(AppointmentDate);
    FormRowOne.appendChild(ColumnDate);
    FormRowOne.appendChild(ColumnDoctor);
    FormRowOne.appendChild(ColumnTime);
    FormRowOne.appendChild(ColumnDoctorFee);
    FormRowOne.appendChild(ColumnHospitalFee);
    FormRowOne.appendChild(ColumnServiceFee);
    FormRowOne.appendChild(ColumnOtherFee);
    FormRowOne.appendChild(ColumnTotalFee);

    if (ViewType === 0) {
      FormRowOne.appendChild(ColumnDoctorEnable); //button
    }

    // const ColumnDateEnable = new Div(undefined, "col-sm-2 text-left mt-2 d-flex");
    // const AppointmentDateEnable = new Button('BtnAppointmentDateEnable', 'Change', 'btn btn-primary btn-rounded mx-2 mt-auto',
    //     [new Attribute(_AttributeOnClick, 'AppointmentDateChangeEnable()')]
    // );
    // ColumnDateEnable.appendChild(AppointmentDateEnable);
    // FormRowOne.appendChild(ColumnDateEnable);

    //---- row 03

    if (ViewType === 1) {
      const ColumnPaymentType = new Div(
        undefined,
        "col-sm-12 col-md-12 col-lg-5 text-left mt-2"
      );
      const PaymentTypeLabel = new Label(undefined, "Payment Type *", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtPaymentType"),
      ]);
      const PaymentType = new Select("TxtPaymentType", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded select"
        ),
      ]);
      PaymentType.appendChild(
        new SelectItem("Cash", "10", [
          new Attribute(
            _AttributeClass,
            "form-control form-control-rounded appointment-class"
          ),
        ])
      );
      PaymentType.appendChild(
        new SelectItem("Card", "1", [
          new Attribute(
            _AttributeClass,
            "form-control form-control-rounded appointment-class"
          ),
        ])
      );
      PaymentType.appendChild(
        new SelectItem("Coupon", "6", [
          new Attribute(
            _AttributeClass,
            "form-control form-control-rounded appointment-class"
          ),
        ])
      );
      ColumnPaymentType.appendChild(PaymentTypeLabel);
      ColumnPaymentType.appendChild(PaymentType);
      FormRowOne.appendChild(ColumnPaymentType);
    } else {
      const ColumnEmpty = new Div(
        undefined,
        "col-lg-5 d-none d-lg-block text-left mt-2"
      );
      FormRowOne.appendChild(ColumnEmpty);
    }

    // const ColumnTimeEnable = new Div(undefined, "col-sm-2 text-left mt-2 d-flex");
    // const AppointmentTimeEnable = new Button('BtnAppointmentTimeEnable', 'Change', 'btn btn-primary btn-rounded mx-2 mt-auto',
    //     [new Attribute(_AttributeOnClick, 'AppointmentTimeChangeEnable()')]
    // );
    // ColumnTimeEnable.appendChild(AppointmentTimeEnable);
    // FormRowOne.appendChild(ColumnTimeEnable);

    //----

    SearchForm.appendChild(FormRowOne);

    ModalContentBody.appendChild(SearchForm);
    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    if (ViewType === 1) {
      ModalContentFooter.appendChild(
        new Button("BtnCloseModal", "Close", "btn btn-primary", [
          new Attribute("data-dismiss", "modal"),
        ])
      );
      ModalContentFooter.appendChild(
        new Button("BtnUpdatePayment", "Save", "btn btn-primary", [
          new Attribute("data-dismiss", "modal"),
          new Attribute(
            _AttributeOnClick,
            "AppointmentPaymentTypeUpdate(" +
              AppointmentId +
              "," +
              AppointmentNumber +
              ")"
          ),
        ])
      );
    } else {
      ModalContentFooter.appendChild(
        new Button("BtnCloseModal", "Close", "btn btn-primary", [
          new Attribute("data-dismiss", "modal"),
        ])
      );
      ModalContentFooter.appendChild(
        new Button("BtnUpdateAppointment", "Update", "btn btn-primary", [
          new Attribute(_AttributeOnClick, "AppointmentUpdate()"),
          new Attribute("disabled", "true"),
        ])
      );
    }
    // ModalContentFooter.appendChild(new Button('BtnCloseModal', 'Close', 'btn btn-primary', [new Attribute('data-dismiss', 'modal')]));
    // ModalContentFooter.appendChild(new Button('BtnUpdateAppointment', 'Update', 'btn btn-primary',
    //     [
    //         new Attribute(_AttributeOnClick, 'AppointmentUpdate()'),
    //         new Attribute('disabled', 'true')
    //     ]
    // ));
    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    BindView(Container, Modal);

    $("#TxtAppointmentUpdateDate").prop("type", "date");
    $("#ModalForAppointmentDetailsEdit").modal("show");
  };
}

function AppointmentChannelingStatusEditModal() {
  this.Render = function (Container, AppointmentId) {
    // console.log('AppointmentChannelingStatusEditModal.AppointmentId:', AppointmentId);

    const AppointmentMatched = _ArrayAppointmentsForToday.filter(
      (Appointment) => Appointment.Id === AppointmentId
    )[0];
    // console.log('AppointmentDetailsEditModal.AppointmentMatched.ChannelingStatus:', AppointmentMatched.ChannelingStatus);

    const Modal = new Div("ModalForAppointmentChannelingStatusEdit", "modal");
    Modal.setAttribute("data-backdrop", "static");
    Modal.setAttribute("data-keyboard", "false");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    ModalContentHeader.appendChild(
      new Heading4("Update Channeling Status", undefined)
    );
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");

    const SearchForm = new Form(undefined);

    const FormRowOne = new Div(undefined, "form-group row");
    const ColumnPaymentType = new Div(undefined, "col-sm-12 text-left mt-2");
    const PaymentTypeLabel = new Label(undefined, "Channeling Status *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtChannelingStatus"),
    ]);
    const PaymentType = new Select("TxtChannelingStatus", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
    ]);
    PaymentType.appendChild(
      new SelectItem("Successful consultation", "Successful Consultation", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    PaymentType.appendChild(
      new SelectItem("Cancellation as `No Show`", "Cancellation as `No Show`", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    PaymentType.appendChild(
      new SelectItem(
        "Unsuccessful consultation with refund",
        "Unsuccessful consultation with Refund",
        [
          new Attribute(
            _AttributeClass,
            "form-control form-control-rounded appointment-class"
          ),
        ]
      )
    );
    PaymentType.appendChild(
      new SelectItem(
        "Unsuccessful consultation with rescheduling",
        "Unsuccessful consultation with Rescheduling",
        [
          new Attribute(
            _AttributeClass,
            "form-control form-control-rounded appointment-class"
          ),
        ]
      )
    );
    ColumnPaymentType.appendChild(PaymentTypeLabel);
    ColumnPaymentType.appendChild(PaymentType);
    FormRowOne.appendChild(ColumnPaymentType);

    SearchForm.appendChild(FormRowOne);

    ModalContentBody.appendChild(SearchForm);
    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseModal", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnUpdatePayment", "Save", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
        new Attribute(
          _AttributeOnClick,
          "AppointmentChannelingStatusUpdate(" + AppointmentId + ")"
        ),
      ])
    );
    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    BindView(Container, Modal);

    $("#ModalForAppointmentChannelingStatusEdit").modal("show");
    $(
      "#TxtChannelingStatus option[value='" +
        AppointmentMatched.ChannelingStatus +
        "']"
    ).prop("selected", true);
  };
}

function ClinicMedicalBillsSearchModal() {
  this.Render = function (Container) {
    const Modal = new Div("ModalForClinicMedicalBill", "modal");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    ModalContentHeader.appendChild(
      new Heading4("Clinic Medical Bills", undefined)
    );
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");
    // ModalContentBody.appendChild(new Label(undefined, 'Text', undefined));

    const BodyRowOne = new Div(undefined, "row");

    const RowOneColumnOne = new Div("ClinicMedicalBillsSearch", "col-md-12");
    RowOneColumnOne.appendChild(new Label(undefined, "Text", undefined));
    BodyRowOne.appendChild(RowOneColumnOne);

    const RowOneColumnTwo = new Div(
      "ClinicMedicalBillsSearchResults",
      "col-md-12"
    );
    RowOneColumnTwo.appendChild(new Label(undefined, "Text", undefined));
    BodyRowOne.appendChild(RowOneColumnTwo);

    ModalContentBody.appendChild(BodyRowOne);

    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseMedicalBill", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnPrintMedicalBill", "Print", "btn btn-primary mx-2", [
        // new Attribute('data-dismiss', 'modal'),
        new Attribute(
          _AttributeOnClick,
          "medicalBillInputsValidate(" + Prescription.Id + ")"
        ),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnSaveMedicalBill", "Save", "btn btn-primary", [
        // new Attribute('data-dismiss', 'modal'),
        new Attribute(
          _AttributeOnClick,
          "medicalBillInputsValidate(" + Prescription.Id + ")"
        ),
      ])
    );
    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    BindView(Container, Modal);

    //append 'search'
    ClinicMedicalBillsSearchFormRender();

    const Response = {
      Status: 1000,
      Data: [],
      Message: "Success",
    };

    //append an 'empty' 'search' results table
    ClinicMedicalBillsSearchResultsTableDisplay(Response.Data);

    $("#ModalForClinicMedicalBill").modal("show");
  };
}

function FooterDefaultContent() {
  this.Render = function (Container) {
    let DivFooter = new Div(undefined, "Footer FontColorWhite");
    let CreditsHeading = new Heading6("Powered By mobiOs", [
      new Attribute(_AttributeClass, "text-center"),
    ]);
    DivFooter.appendChild(CreditsHeading);

    BindView(Container, DivFooter);
  };
}

function Vitals(Patient) {
  this.Render = function (Container) {
    console.log("Vitals.Patient:", Patient);

    const CardVitals = new Div(undefined, "card text-left");
    const CardBody = new Div(undefined, "card-body");

    let CardBodyRow = new Div(undefined, "row");
    let CardBodyRowColumn = new Div(undefined, "col-md-12");
    CardBodyRow.appendChild(CardBodyRowColumn);

    CardBody.appendChild(CardBodyRow);
    CardVitals.appendChild(CardBody);

    console.log("Vitals.CardVitals", CardVitals);

    BindView(Container, CardVitals);
  };
}

/*=================================
            Pharmacy UIs
 =================================*/

function Pharmacy() {
  this.Render = function (Container, Data) {
    let CardPrescriptions = new Div(undefined, "card text-left");
    let CardBodyPrescriptions = new Div(undefined, "card-body");

    CardBodyPrescriptions.appendChild(
      new Heading4("Prescriptions", [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
      ])
    );

    let SearchRow = new Div(undefined, "row");
    let SearchColumnOne = new Div(undefined, "col-lg-12 text-center");
    SearchRow.appendChild(SearchColumnOne);
    CardBodyPrescriptions.appendChild(SearchRow);

    let FormPrescriptions = new Form(undefined);
    let RowSearch = new Div(undefined, "form-group row mt-3");

    let ColumnDoctor = new Div(undefined, "col-sm-3 text-left");
    let LabelSelectDoctor = new Label(undefined, "Select Doctor *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtPrescriptionsSearchDoctor"),
    ]);
    let DropdownSelectDoctor = new Select("TxtPrescriptionsSearchDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
      new Attribute(_AttributeOnChange, "GetDoctorSessionDataForPharmacy()"),
    ]);
    DropdownSelectDoctor.appendChild(
      new SelectItem("All Doctors", "null", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    ColumnDoctor.appendChild(LabelSelectDoctor);
    ColumnDoctor.appendChild(DropdownSelectDoctor);
    RowSearch.appendChild(ColumnDoctor);

    let ColumnSession = new Div(undefined, "col-sm-3 text-left");
    let LabelSelectSession = new Label(undefined, "Select Session *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtPrescriptionsSearchSession"),
    ]);
    let DropdownSelectSession = new Select("TxtPrescriptionsSearchSession", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
    ]);
    DropdownSelectSession.appendChild(
      new SelectItem("All Sessions", "null", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    ColumnSession.appendChild(LabelSelectSession);
    ColumnSession.appendChild(DropdownSelectSession);
    RowSearch.appendChild(ColumnSession);

    let ColumnDate = new Div(undefined, "col-sm-3 text-left");
    const DateToday = new Date().toISOString().slice(0, 10);
    let LabelSelectDate = new Label(undefined, "Select Date *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtPrescriptionsSearchDate"),
    ]);
    let TextSelectDate = new Textbox(
      "TxtPrescriptionsSearchDate",
      "form-control form-control-rounded Date-Picker",
      [new Attribute(_AttributeType, "date"), new Attribute("value", DateToday)]
    );
    ColumnDate.appendChild(LabelSelectDate);
    ColumnDate.appendChild(TextSelectDate);
    RowSearch.appendChild(ColumnDate);

    let ColumnSearch = new Div(undefined, "col-sm-3 d-flex");
    let ButtonSearch = new Button(
      "PrescriptionsSearchButton",
      "Search",
      "btn btn-primary btn-rounded w-100 mt-auto",
      [new Attribute(_AttributeOnClick, "Prescriptions_Search()")]
    );
    ColumnSearch.appendChild(ButtonSearch);
    RowSearch.appendChild(ColumnSearch);

    FormPrescriptions.appendChild(RowSearch);
    SearchColumnOne.appendChild(FormPrescriptions);

    let RowSearchResults = new Div(undefined, "form-group row");
    RowSearchResults.appendChild(
      new Div("PrescriptionsSearchResultsTableWrapper", "col-lg-12")
    );
    CardBodyPrescriptions.appendChild(RowSearchResults);

    CardPrescriptions.appendChild(CardBodyPrescriptions);

    BindView(Container, CardPrescriptions);

    $("#TxtPrescriptionsSearchDate").prop("type", "date");
  };
}

function PharmacyPrescription() {
  this.Render = function (Container, Data) {
    let Headers = [
      "No",
      "BrandName",
      "Dosage",
      "Frequency",
      "Duration",
      "Available",
    ];

    let CardPrescriptions = new Div(undefined, "card text-left");
    let CardBodyPrescriptions = new Div(undefined, "card-body");

    let HeadingPrescriptions = new Heading4("Drug List", undefined);
    CardBodyPrescriptions.appendChild(HeadingPrescriptions);

    let DivTablePrescriptions = new Div(undefined, "table-responsive");
    DivTablePrescriptions.appendChild(
      new TableView(
        "TableDrugList",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );

    CardBodyPrescriptions.appendChild(DivTablePrescriptions);

    let FormRow0Session = new Div(undefined, "form-group row mt-4");

    FormRow0Session.appendChild(new Div(undefined, "col-sm-6 col-6"));

    let DivFormSubRowPrescription = new Div(undefined, "col-sm-2 col-2");
    let ButtonReject = new Button(
      undefined,
      "Reject",
      "btn btn-danger btn-rounded w-100",
      [new Attribute(_AttributeOnClick, "CmdReadyDrugUpdate_Click()")]
    );
    DivFormSubRowPrescription.appendChild(ButtonReject);
    FormRow0Session.appendChild(DivFormSubRowPrescription);

    let DivFormSubRowPharmacy = new Div(undefined, "col-sm-2 col-2");
    let ButtonReady = new Button(
      "BtnStatusUpdate",
      "Ready",
      "btn btn-primary btn-rounded w-100",
      [new Attribute(_AttributeOnClick, "CmdReadyDrugUpdate_Click()")]
    );
    DivFormSubRowPharmacy.appendChild(ButtonReady);
    FormRow0Session.appendChild(DivFormSubRowPharmacy);

    let DivFormSubRowCancel = new Div(undefined, "col-sm-2 col-2");
    let ButtonCancel = new Button(
      undefined,
      "Cancel",
      "btn btn-primary btn-rounded w-100",
      [new Attribute(_AttributeOnClick, "CmdPrescription_Click()")]
    );
    DivFormSubRowCancel.appendChild(ButtonCancel);
    FormRow0Session.appendChild(DivFormSubRowCancel);

    CardBodyPrescriptions.appendChild(FormRow0Session);

    CardPrescriptions.appendChild(CardBodyPrescriptions);

    BindView(Container, CardPrescriptions);
  };
}

function PharmacySearchResultsTable() {
  this.Render = function (Container, Data) {
    let Headers = ["No", "Patient", "Age", "Mobile", "Actions"];

    let ParentRow = new Div(undefined, "row");
    let ColumnOne = new Div(undefined, "col-md-12 mt-2");

    let Heading = new Heading5("Search Results", undefined);
    ColumnOne.appendChild(Heading);

    let DivTablePrescriptions = new Div(undefined, "table-responsive mt-3");
    DivTablePrescriptions.appendChild(
      new TableView(
        "TablePharmacySearchResults",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );
    ColumnOne.appendChild(DivTablePrescriptions);

    ParentRow.appendChild(ColumnOne);

    BindView(Container, ParentRow);
  };
}

function PharmacyPrescriptionIframeModal() {
  this.Render = function (Container, PrescriptionId) {
    const IframeModal = new Div("ModalForPharmacyPrescriptionIframe", "modal");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    // const ModalDialogHeader = new Div(undefined, "modal-header");
    // ModalDialogHeader.appendChild(new Button('BtnPrintPrescription', 'Print', 'btn btn-primary mr-2',
    //     [
    //         new Attribute(_AttributeOnClick, 'window.print();')
    //     ]
    // ));
    // ModalDialogHeader.appendChild(new Button(undefined, 'Close', 'btn btn-danger',
    //     [
    //         new Attribute('data-dismiss', 'modal'),
    //     ]
    // ));
    // ModalDialog.appendChild(ModalDialogHeader);

    const ModalContentBody = new Div(undefined, "modal-body");

    const Row = new Div(undefined, "row");
    const ColumnOne = new Div("PrescriptionIframeWrapper", "col-md-12 mt-2");
    // ColumnOne.appendChild(new Label(undefined, "Modal body", undefined));

    Row.appendChild(ColumnOne);
    ModalContentBody.appendChild(Row);

    ModalDialogContent.appendChild(ModalContentBody);

    ModalDialog.appendChild(ModalDialogContent);
    IframeModal.appendChild(ModalDialog);

    BindView(Container, IframeModal);

    $("#ModalForPharmacyPrescriptionIframe").modal("show");
  };
}

/*=================================
            Clinic Bills
 =================================*/

function ClinicBillSearch() {
  this.Render = function (Container) {
    const ParentRow = new Div(undefined, "row");

    const ParentRowColumnOne = new Div(undefined, "col-md-12");
    const Heading = new Heading5("Search", [
      new Attribute(_AttributeClass, undefined),
    ]);
    ParentRowColumnOne.appendChild(Heading);
    ParentRow.appendChild(ParentRowColumnOne);

    let ParentRowColumnTwo = new Div(undefined, "col-md-12");
    ParentRow.appendChild(ParentRowColumnTwo);

    const DateToday = new Date().toISOString().slice(0, 10);
    const DateSixMonthsPrior = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 6,
      new Date().getDate()
    )
      .toISOString()
      .slice(0, 10);

    let FormSearch = new Form(undefined);

    let FormRowOne = new Div(undefined, "form-group row");

    let FormRowColumnOne = new Div(undefined, "col-sm-6 col-12 mt-2");
    FormRowColumnOne.appendChild(
      new Label(undefined, "From Date", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtClinicBillSearchFromDate"),
      ])
    );
    FormRowColumnOne.appendChild(
      new Textbox(
        "TxtClinicBillSearchFromDate",
        "form-control form-control-rounded",
        [
          new Attribute(_AttributeType, "date"),
          new Attribute(_AttributeFor, "TxtClinicBillSearchFromDate"),
          new Attribute("min", DateSixMonthsPrior),
          new Attribute("value", DateToday),
        ]
      )
    );
    FormRowOne.appendChild(FormRowColumnOne);

    let FormRowColumnTwo = new Div(undefined, "col-sm-6 col-12 mt-2");
    FormRowColumnTwo.appendChild(
      new Label(undefined, "To Date", [
        new Attribute(_AttributeClass, "col-form-label"),
        new Attribute(_AttributeFor, "TxtClinicBillSearchToDate"),
      ])
    );
    FormRowColumnTwo.appendChild(
      new Textbox(
        "TxtClinicBillSearchToDate",
        "form-control form-control-rounded",
        [
          new Attribute(_AttributeType, "date"),
          new Attribute(
            _AttributeOnChange,
            "ClinicMedicalBillsSearchDatesValidate()"
          ),
          new Attribute("min", DateSixMonthsPrior),
          new Attribute("value", DateToday),
        ]
      )
    );
    FormRowOne.appendChild(FormRowColumnTwo);
    FormSearch.appendChild(FormRowOne);

    let FormRowTwo = new Div(undefined, "form-group row");
    let FormRowTwoColumnOne = new Div(undefined, "col-sm-12 col-12 mt-2");
    FormRowTwoColumnOne.appendChild(
      new Button(
        "CmdSearch",
        "Search",
        "btn btn-info btn-primary btn-rounded w-100",
        [new Attribute(_AttributeOnClick, "ClinicMedicalBillsSearch()")]
      )
    );
    FormRowTwo.appendChild(FormRowTwoColumnOne);
    FormSearch.appendChild(FormRowTwo);

    let FormRowThree = new Div(undefined, "form-group row");
    let FormRowThreeColumnOne = new Div(undefined, "col-sm-12 col-12");
    FormRowThreeColumnOne.appendChild(
      new Button(
        "CmdClear",
        "Clear",
        "btn btn-info btn-primary btn-rounded w-100",
        [
          new Attribute(
            _AttributeOnClick,
            "ClinicMedicalBillsSearchFieldsClear()"
          ),
        ]
      )
    );
    FormRowThree.appendChild(FormRowThreeColumnOne);
    FormSearch.appendChild(FormRowThree);

    ParentRowColumnTwo.appendChild(FormSearch);

    BindView(Container, ParentRow);
  };
}

function ClinicBillSearchResultsTable() {
  this.Render = function (Container, Data) {
    let Headers = [
      "No",
      "Name",
      "Mobile",
      "Gender",
      "Payment",
      "Status",
      "Action",
    ];

    let ParentRow = new Div(undefined, "row");
    let ColumnOne = new Div(undefined, "col-md-12 mt-2");

    let Heading = new Heading5("Search Results", undefined);
    ColumnOne.appendChild(Heading);

    let DivTablePrescriptions = new Div(undefined, "table-responsive mt-3");
    DivTablePrescriptions.appendChild(
      new TableView(
        "TableClinicMedicalBillsSearchResults",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );
    ColumnOne.appendChild(DivTablePrescriptions);

    ParentRow.appendChild(ColumnOne);

    BindView(Container, ParentRow);
  };
}

//Footer
function Footer() {
  this.Render = function (Container) {
    let DivPopup = new Div("DivPopup");
    let CardFooter = new Div(undefined, "col-12 footer-1");
    CardFooter.appendChild(DivPopup);
    let CardBodyFooter = new Div(undefined, "");

    let RowFooter = new Div(undefined, "row");

    let RowColSub1Footer = new Div(
      undefined,
      "col-md-12 col-12 mt-4 mb-4 col-footer text center"
    );
    let WidgetFooter1 = new Div(undefined, "ul-widget7__pic");
    WidgetFooter1.appendChild(
      new Heading6("MEDICA Solution by mobiOs Private Limited")
    );
    RowColSub1Footer.appendChild(WidgetFooter1);
    RowFooter.appendChild(RowColSub1Footer);

    CardBodyFooter.appendChild(RowFooter);
    CardFooter.appendChild(CardBodyFooter);
    CardFooter.innerHTML += `<div class='modal' id='loading' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>
                                        <div style="height:100vh; width:100vw;" class="d-flex justify-content-center align-items-center">
                                            <div style="background-color:white; width:150px; height:150px; border-radius:10px;position: relative;
                                                        " class="d-flex flex-column  align-items-center
                                                                 ">
                                             <span class="loader-animation mt-5"></span>
                                             <p class="mt-3" style="position: absolute; bottom: 5px;">Loading ... </p>
                                            </div>
                                        </div>
                                    </div>`;

    BindView(Container, CardFooter);
  };
}

/*=================================
         Admin UIs
 =================================*/

function AdminLayoutMain() {
  this.Render = function () {
    let DivMain = new Div(undefined, "app-admin-wrap layout-sidebar-large");
    let DivNavBar = new Div(Containers.Header, undefined);
    DivMain.appendChild(DivNavBar);

    let DivHeader = new Div(
      undefined,
      "main-content-wrap sidenav-close d-flex flex-column m-auto"
    );

    let DivMainContent = Div(undefined, "main-content");
    DivMainContent.appendChild(new Div(Containers.ButtonBar));

    let DivSwitchMenu = new Div(
      undefined,
      "d-flex justify-content-center align-items-center mb-3"
    );
    DivSwitchMenu.appendChild(
      new Button(undefined, "", "SwitchMenuButton ", [
        new Attribute(_AttributeOnClick, "LnkGeneral_Click(this)"),
      ])
    );
    DivSwitchMenu.appendChild(
      new Button(undefined, "", "SwitchMenuButton SwitchMenuButton-Active", [
        new Attribute(_AttributeOnClick, "LnkSettings_Click(this)"),
      ])
    );

    DivMainContent.appendChild(DivSwitchMenu);

    let DivRowMainContent = new Div(undefined, "row");
    DivRowMainContent.appendChild(new Div(undefined, "col-lg-2"));
    let DivSubRowMain = new Div(
      Containers.MainContent,
      "col-lg-8 col-12 pd-lr-5"
    );
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
    // new SiteButtonBar().Render(Containers.ButtonBar);
    new AdminSiteButtonBar().Render(Containers.ButtonBar);
    new Footer().Render(Containers.Footer);
  };
}

function AdminSiteButtonBar() {
  this.Render = function (Container) {
    let DivRowMainButtonBar = Div(undefined, "row justify-content-center");
    DivRowMainButtonBar.appendChild(new Div(undefined, "col-lg-2 pd-lr-5"));
    let RowCelRowCellSite = Div(undefined, "col-lg-2 col-3 pd-lr-5");

    let SpanPrescription = new Span(undefined, undefined, "c-pointer");
    let DivPrescription = new Div(undefined, "card mb-4 o-hidden");
    let DivPrescriptionCardBody = new Div("BranchesCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "Branches_Click(this),AdminButtons_Click(this)"
      ),
    ]);

    let DivWidgetRowPrescription = new Div(
      undefined,
      "ul-widget__row-v2 p-relative"
    );
    let DivWidgetImagePrescription = new Div(undefined, "ul-widget6__pic");
    let ImagePrescription = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Branch.png",
      undefined,
      "Prescription Image"
    );

    let DivWidgetContentPrescription = new Div(
      "BranchesHeading",
      "ul-widget__content-v2 d-none d-md-block"
    );
    let HeadingPrescription = new Heading4("Branches", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    let DivReportCardBody = new Div("DoctorsCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "Doctors_Click(this),AdminButtons_Click(this)"
      ),
    ]);

    let DivWidgetRowReport = new Div(undefined, "ul-widget__row-v2 p-relative");
    let DivWidgetImageReport = new Div(undefined, "ul-widget6__pic");
    let ImageReport = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Doctors.png",
      undefined,
      "Report Image"
    );

    let DivWidgetContentReport = new Div(
      "DoctorsHeading",
      "ul-widget__content-v2 d-none d-md-block"
    );
    let HeadingReport = new Heading4("Doctors", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    let DivHistoryCardBody = new Div("ReportsCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "Reports_Click(this),AdminButtons_Click(this)"
      ),
    ]);

    let DivWidgetRowHistory = new Div(
      undefined,
      "ul-widget__row-v2 p-relative"
    );
    let DivWidgetImageHistory = new Div(undefined, "ul-widget6__pic");
    let ImageHistory = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Reports.png",
      undefined,
      "History Image"
    );

    let DivWidgetContentHistory = new Div(
      "ReportsHeading",
      "ul-widget__content-v2 d-none d-md-block"
    );
    let HeadingHistory = new Heading4("Apt. Reports", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

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
    let DivAllergiesCardBody = new Div("MiscCard", "card-body", [
      new Attribute(
        _AttributeOnClick,
        "Misc_Click(this),AdminButtons_Click(this)"
      ),
    ]);

    let DivWidgetRowAllergies = new Div(
      undefined,
      "ul-widget__row-v2 p-relative"
    );
    let DivWidgetImageAllergies = new Div(undefined, "ul-widget6__pic");
    let ImageAllergies = new Imagebox(
      undefined,
      "dist-assets/images/Nurse/Pharmacy.png",
      undefined,
      "Allergies Image"
    );

    let DivWidgetContentAllergies = new Div(
      "MiscHeading",
      "ul-widget__content-v2"
    );
    let HeadingAllergies = new Heading4("Inv. Reports", [
      new Attribute(_AttributeClass, "heading mt-3"),
    ]);

    DivWidgetImageAllergies.appendChild(ImageAllergies);
    DivWidgetRowAllergies.appendChild(DivWidgetImageAllergies);
    DivAllergiesCardBody.appendChild(DivWidgetRowAllergies);

    DivWidgetContentAllergies.appendChild(HeadingAllergies);
    DivWidgetRowAllergies.appendChild(DivWidgetContentAllergies);

    DivAllergies.appendChild(DivAllergiesCardBody);
    SpanAllergies.appendChild(DivAllergies);

    RowCellSiteDoc.appendChild(SpanAllergies);
    // DivRowMainButtonBar.appendChild(RowCellSiteDoc);

    DivRowMainButtonBar.appendChild(new Div(undefined, "col-lg-2 pd-lr-5"));

    /////////////////////////////////////////

    BindView(Container, DivRowMainButtonBar);
  };
}

/*=================================
             Branches
 =================================*/

function Branches() {
  this.Render = function (Container) {
    const Card = new Div(undefined, "card text-left");
    const CardBody = new Div(undefined, "card-body");

    const RowOne = new Div(undefined, "row");
    const ColumnCardTitle = new Div(undefined, "col-md-12");
    const Heading = new Heading4("Branches", [
      new Attribute(_AttributeClass, "card-title mb-3 text-center"),
    ]);
    ColumnCardTitle.appendChild(Heading);
    RowOne.appendChild(ColumnCardTitle);

    const RowTwo = new Div(undefined, "row mt-3");
    const ColumnBranchesSearchResultsTableRow = new Div(
      "BranchesSearchResults",
      "col-sm-12"
    );
    RowTwo.appendChild(ColumnBranchesSearchResultsTableRow);

    CardBody.appendChild(RowOne);
    CardBody.appendChild(RowTwo);
    Card.appendChild(CardBody);

    BindView(Container, Card);
  };
}

function BranchesSearchResultsTable() {
  this.Render = function (Container, Data) {
    let Headers = ["Branch Name", "Contact No", "Address", "Email", "Action"];

    let ParentRow = new Div(undefined, "row");

    let ColumnTableTitle = new Div(undefined, "col-md-6");
    let Heading = new Heading5("All Branches", undefined);
    ColumnTableTitle.appendChild(Heading);
    ParentRow.appendChild(ColumnTableTitle);

    const ColumnAddNewBranch = new Div(undefined, "col-md-6");
    const ButtonAddNewBranch = new Button(
      undefined,
      "Add A New Branch",
      "btn btn-primary btn-rounded float-right",
      [new Attribute(_AttributeOnClick, "BranchAddOrUpdateModalView('0')")]
    );
    // ColumnAddNewBranch.appendChild(ButtonAddNewBranch);
    ParentRow.appendChild(ColumnAddNewBranch);

    const ColumnTable = new Div(undefined, "col-md-12 mt-2");
    let DivTableBranchesSearchResults = new Div(undefined, "table-responsive");
    DivTableBranchesSearchResults.appendChild(
      new TableView(
        "TableBranchesSearchResults",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );
    ColumnTable.appendChild(DivTableBranchesSearchResults);
    ParentRow.appendChild(ColumnTable);

    BindView(Container, ParentRow);
  };
}

function BranchAddOrUpdateModal() {
  this.Render = function (Container, BranchId, ProcessType) {
    // console.log('BranchAddOrUpdateModal:', Container, BranchId, ProcessType);

    const Modal = new Div("ModalForBranchAddOrUpdate", "modal");
    Modal.setAttribute("data-backdrop", "static");
    Modal.setAttribute("data-keyboard", "false");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    if (ProcessType === "AddNew") {
      ModalContentHeader.appendChild(
        new Heading4("Add A New Branch", undefined)
      );
    } else {
      ModalContentHeader.appendChild(new Heading4("Update Branch", undefined));
    }
    // ModalContentHeader.appendChild(new Heading4("Update Branch", undefined));
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");

    const ParentRow = new Div(undefined, "row");

    const ColumnInstitute = new Div(undefined, "col-sm-6 mt-2");
    const LabelInstitute = new Label(undefined, "Institute *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateInstituteName"),
    ]);
    const TextInstitute = new Textbox(
      "TxtBranchUpdateInstituteName",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePattern, "[0-9]{20}"),
        new Attribute(_AttributePlaceHolder, "Institute Name"),
        new Attribute("disabled", true),
        new Attribute("value", _NurseInstitute.Name),
      ]
    );
    ColumnInstitute.appendChild(LabelInstitute);
    ColumnInstitute.appendChild(TextInstitute);
    ParentRow.appendChild(ColumnInstitute);

    const ColumnBranch = new Div(undefined, "col-sm-6 mt-2");
    const LabelBranch = new Label(undefined, "Branch *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateBranchName"),
      new Attribute("disabled", true),
    ]);
    const TextBranch = new Textbox(
      "TxtBranchUpdateBranchName",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePattern, "[0-9]{20}"),
        new Attribute(_AttributePlaceHolder, "Branch Name"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnBranch.appendChild(LabelBranch);
    ColumnBranch.appendChild(TextBranch);
    ParentRow.appendChild(ColumnBranch);

    const ColumnEmail = new Div(undefined, "col-sm-6 mt-2");
    const LabelEmail = new Label(undefined, "Email *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateEmail"),
      new Attribute("disabled", true),
    ]);
    const TextEmail = new Textbox(
      "TxtBranchUpdateEmail",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "Email"),
        new Attribute(_AttributeType, "email"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnEmail.appendChild(LabelEmail);
    ColumnEmail.appendChild(TextEmail);
    ParentRow.appendChild(ColumnEmail);

    const ColumnWebsite = new Div(undefined, "col-sm-6 mt-2");
    const LabelWebsite = new Label(undefined, "Website", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateWebsite"),
      new Attribute("disabled", true),
    ]);
    const TextWebsite = new Textbox(
      "TxtBranchUpdateWebsite",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "Website"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnWebsite.appendChild(LabelWebsite);
    ColumnWebsite.appendChild(TextWebsite);
    ParentRow.appendChild(ColumnWebsite);

    const ColumnAddressLine1 = new Div(undefined, "col-sm-6 mt-2");
    const LabelAddressLine1 = new Label(undefined, "Address Line 1 *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateAddressLine1"),
      new Attribute("disabled", true),
    ]);
    const TextAddressLine1 = new Textbox(
      "TxtBranchUpdateAddressLine1",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "Address Line 1"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnAddressLine1.appendChild(LabelAddressLine1);
    ColumnAddressLine1.appendChild(TextAddressLine1);
    ParentRow.appendChild(ColumnAddressLine1);

    const ColumnAddressLine2 = new Div(undefined, "col-sm-6 mt-2");
    const LabelAddressLine2 = new Label(undefined, "Address Line 2", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateAddressLine2"),
      new Attribute("disabled", true),
    ]);
    const TextAddressLine2 = new Textbox(
      "TxtBranchUpdateAddressLine2",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "Address Line 2"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnAddressLine2.appendChild(LabelAddressLine2);
    ColumnAddressLine2.appendChild(TextAddressLine2);
    ParentRow.appendChild(ColumnAddressLine2);

    const ColumnPostCode = new Div(undefined, "col-sm-6 mt-2");
    const LabelPostCode = new Label(undefined, "Post Code", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdatePostCode"),
      new Attribute("disabled", true),
    ]);
    const TextPostCode = new Textbox(
      "TxtBranchUpdatePostCode",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePattern, "[0-9]{10}"),
        new Attribute(_AttributePlaceHolder, "Post Code"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnPostCode.appendChild(LabelPostCode);
    ColumnPostCode.appendChild(TextPostCode);
    ParentRow.appendChild(ColumnPostCode);

    const ColumnSuburb = new Div(undefined, "col-sm-6 mt-2");
    const LabelSuburb = new Label(undefined, "Suburb", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateSuburb"),
      new Attribute("disabled", true),
    ]);
    const TextSuburb = new Textbox(
      "TxtBranchUpdateSuburb",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "Suburb"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnSuburb.appendChild(LabelSuburb);
    ColumnSuburb.appendChild(TextSuburb);
    ParentRow.appendChild(ColumnSuburb);

    const ColumnCity = new Div(undefined, "col-sm-6 mt-2");
    const LabelCity = new Label(undefined, "City *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateCity"),
      new Attribute("disabled", true),
    ]);
    const TextCity = new Textbox(
      "TxtBranchUpdateCity",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "City"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnCity.appendChild(LabelCity);
    ColumnCity.appendChild(TextCity);
    ParentRow.appendChild(ColumnCity);

    const ColumnContactNo = new Div(undefined, "col-sm-6 mt-2");
    const LabelContactNo = new Label(undefined, "Contact No *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateContactNo"),
      new Attribute("disabled", true),
    ]);
    const TextContactNo = new Textbox(
      "TxtBranchUpdateContactNo",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePattern, "[0-9]{10}"),
        new Attribute(_AttributePlaceHolder, "Contact No"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
        new Attribute("disabled", true),
      ]
    );
    ColumnContactNo.appendChild(LabelContactNo);
    ColumnContactNo.appendChild(TextContactNo);
    ParentRow.appendChild(ColumnContactNo);

    const ColumnInstituteFee = new Div(undefined, "col-sm-6 mt-2");
    const LabelInstituteFee = new Label(undefined, "Institute Fee *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "TxtBranchUpdateInstituteFee"),
      new Attribute("disabled", true),
    ]);
    const TextInstituteFee = new Textbox(
      "TxtBranchUpdateInstituteFee",
      "form-control form-control-rounded",
      [
        new Attribute(_AttributePlaceHolder, "Institute fee"),
        new Attribute(_AttributeType, "text"),
        new Attribute("value", ""),
      ]
    );

    ColumnInstituteFee.appendChild(LabelInstituteFee);
    ColumnInstituteFee.appendChild(TextInstituteFee);
    ParentRow.appendChild(ColumnInstituteFee);

    ModalContentBody.appendChild(ParentRow);
    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseBranchUpdateModal", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnUpdateBranch", "Update", "btn btn-primary", [
        new Attribute(_AttributeOnClick, "CMD_UpdateBranch(" + BranchId + ")"),
      ])
    );

    // if (ProcessType === 'AddNew') {
    //     ModalContentFooter.appendChild(new Button('BtnBranchSave', 'Save', 'btn btn-primary',
    //         [new Attribute(_AttributeOnClick, 'BranchAddOrUpdate("0")')]
    //     ));
    // } else {
    //     ModalContentFooter.appendChild(new Button('BtnBranchUpdate', 'Update', 'btn btn-primary',
    //         [new Attribute(_AttributeOnClick, 'BranchAddOrUpdate(' + BranchId + ')')]
    //     ));
    // }

    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    BindView(Container, Modal);

    $("#ModalForBranchAddOrUpdate").modal("show");
  };
}

/*=================================
             Doctors
 =================================*/

function Doctors() {
  this.Render = function (Container) {
    const Card = new Div(undefined, "card text-left");
    const CardBody = new Div(undefined, "card-body");

    const Heading = new Heading4("Doctors", [
      new Attribute(_AttributeClass, "card-title mb-3 text-center"),
    ]);
    CardBody.appendChild(Heading);

    const RowOne = new Div(undefined, "row");
    const RowOneColumnOne = new Div(undefined, "col-md-12");

    RowOneColumnOne.appendChild(
      new Label(undefined, "Doctors", undefined, undefined)
    );

    RowOne.appendChild(RowOneColumnOne);
    CardBody.appendChild(RowOne);

    Card.appendChild(CardBody);

    BindView(Container, Card);

    new DoctorSearch().Render(Containers.MainContent);
  };
}

function DoctorSearch() {
  this.Render = function (Container) {
    let CardAddAppoinment = new Div(undefined, "card text-left");
    let CardBodyAddAppoinment = new Div(undefined, "card-body");

    CardBodyAddAppoinment.appendChild(
      new Heading4("Doctors", [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
      ])
    );

    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetails"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetailsSession"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetailsPatient"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointPaymentCheck"),
      ])
    );

    let DoctorSearchRow = new Div("DoctorSearchRow", "row");
    let SearchColumnOne = new Div(undefined, "col-lg-12 text-center");
    DoctorSearchRow.appendChild(SearchColumnOne);
    CardBodyAddAppoinment.appendChild(DoctorSearchRow);

    let FormAppoinments = new Form(undefined);
    let FormRow0Appoinment = new Div(undefined, "form-group row mt-3");

    let DivFormRowDoctor = new Div(undefined, "col-sm-3 text-left");
    let LabelAppoinment = new Label(undefined, "Select Branch *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpBranch"),
    ]);
    let SelectBranch = new Select("DrpBranch", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
    ]);
    SelectBranch.appendChild(
      new SelectItem("Select Branch", 0, [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    DivFormRowDoctor.appendChild(LabelAppoinment);
    DivFormRowDoctor.appendChild(SelectBranch);
    FormRow0Appoinment.appendChild(DivFormRowDoctor);

    let DivFormRowSearch = new Div(undefined, "col-sm-3 d-flex");
    let ButtonPatientSearch = new Button(
      "DoctorBranchSearchButton",
      "Search",
      "btn btn-primary btn-rounded w-100 mt-auto",
      [new Attribute(_AttributeOnClick, "DoctorBranch_Search()")]
    );

    DivFormRowSearch.appendChild(ButtonPatientSearch);
    FormRow0Appoinment.appendChild(DivFormRowSearch);

    FormAppoinments.appendChild(FormRow0Appoinment);
    SearchColumnOne.appendChild(FormAppoinments);

    let AppointmentSearchResultsRow = new Div("DoctorsSearchResults", "");
    AppointmentSearchResultsRow.appendChild(
      new Div("DivDoctorTable", "col-lg-12")
    );
    CardBodyAddAppoinment.appendChild(AppointmentSearchResultsRow);

    CardAddAppoinment.appendChild(CardBodyAddAppoinment);

    BindView(Container, CardAddAppoinment);
  };
}

function DoctorsSearchResultsTable() {
  this.Render = function (Container, Data) {
    let Headers = [
      "Doctor Name",
      "Email",
      "NIC",
      "Registration Number",
      "Action",
    ];

    let ParentRow = new Div(undefined, "row");

    let ColumnTableTitle = new Div(undefined, "col-md-12");
    let Heading = new Heading5("All Doctors", undefined);
    ColumnTableTitle.appendChild(Heading);
    ParentRow.appendChild(ColumnTableTitle);

    const ColumnDoctorPageActions = new Div(
      undefined,
      "col-md-12 d-flex justify-content-end gap-2"
    );
    TextField({
      parentRow: ColumnDoctorPageActions,
      classList: "col-3 mr-1",
      elementId: "Doctor_Search",
      type: "text",
      value: _DoctorSearchKeyword,
      onKeyUp: "SearchDoctor()",
      placeholder: "Search Doctor",
    });
    SelectOption({
      classList: "col-3 mr-1",
      parentRow: ColumnDoctorPageActions,
      elementId: "Doctor_SearchBy",
      onChangeFunc: "SearchDoctor()",
      selectedValue: _DoctorSearchBy,
      options: [
        {
          value: "Doctor Name",
          label: "Doctor Name",
        },
        {
          value: "Email",
          label: "Doctor Email",
        },
        {
          value: "Registration Number",
          label: "Registration Number",
        },
        {
          value: "NIC",
          label: "Doctor NIC",
        },
      ],
      placeholder: "Search By",
    });
    const ButtonAddNewBranch = new Button(
      undefined,
      "Add A New Doctors",
      "btn btn-primary btn-rounded float-right",
      [new Attribute(_AttributeOnClick, "DoctorAddOrUpdateModalView()")]
    );
    ColumnDoctorPageActions.appendChild(ButtonAddNewBranch);
    ParentRow.appendChild(ColumnDoctorPageActions);

    const ColumnTable = new Div(undefined, "col-md-12 mt-2");
    let DivTableBranchesSearchResults = new Div(
      "DoctorsTableContainer",
      "table-responsive"
    );
    DivTableBranchesSearchResults.appendChild(
      new TableView(
        "TableDoctorsSearchResults",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );
    ColumnTable.appendChild(DivTableBranchesSearchResults);
    ParentRow.appendChild(ColumnTable);

    BindView(Container, ParentRow);
  };
}

function DoctorsAddOrUpdateModal() {
  this.Render = function (Container, dotcorId, ProcessType) {
    // console.log('BranchAddOrUpdateModal:', Container, BranchId, ProcessType);

    const Modal = new Div("ModalForBranchAddOrUpdate", "modal");
    Modal.setAttribute("data-backdrop", "static");
    Modal.setAttribute("data-keyboard", "false");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");
    if (ProcessType === "AddNew") {
      ModalContentHeader.appendChild(
        new Heading4("Add A New Doctor", undefined)
      );
    } else {
      ModalContentHeader.appendChild(new Heading4("Update Doctor", undefined));
    }
    // ModalContentHeader.appendChild(new Heading4("Update Branch", undefined));
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");

    const ParentRow = new Div(undefined, "row");

    let data = [];
    data.push(
      new SelectItem("Dr.", "Dr", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Prof.", "Prof", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Mr.", "Mr", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Mrs.", "Mrs", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Miss.", "Miss", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Rev.", "Rev", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );

    DropDown("col-sm-3  mt-2", "DrpTitle", "Title *", "", data, ParentRow);

    LableAndTextFeild(
      "col-sm-9",
      "DoctorFirst_Name",
      "First Name *",
      "First Name",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorMiddle_Name",
      "Middle Name",
      "Middle Name",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorLast_Name",
      "Last Name *",
      "Last Name",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorContact_No",
      "Contact No. *",
      "Contact No.",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorPhone_No",
      "Phone No.",
      "Phone No.",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorEmail",
      "Email *",
      "Email",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorNIC",
      "N.I.C *",
      "N.I.C",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorRegistration_Number",
      "SLMC Registration Number",
      "Registration Number",
      "",
      "",
      ParentRow,
      ""
    );
    LableAndTextFeild(
      "col-sm-6",
      "DoctorDate_Of_Birth",
      "Date Of Birth *",
      "Date Of Birth",
      "",
      "",
      ParentRow,
      "date"
    );

    DropDown(
      "col-sm-6  mt-2",
      "DrpSpecialization",
      "Specialization *",
      "",
      undefined,
      ParentRow
    );
    DropDown(
      "col-sm-6  mt-2",
      "DrpQualifications",
      "Qualifications *",
      "",
      undefined,
      ParentRow
    );
    ModalContentBody.appendChild(ParentRow);

    const DoctorPayableHospitalRow = new Div(undefined, "row");
    LableAndTextFeild(
      "col-sm-6",
      "DoctorPayable",
      "Doctor Payable*",
      "Doctor payable",
      "",
      "",
      DoctorPayableHospitalRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "HospitalFee",
      "Hospital fee*",
      "Hospital fee",
      "",
      "",
      DoctorPayableHospitalRow
    );

    ModalContentBody.appendChild(DoctorPayableHospitalRow);

    const OtherFeeAndMedicaIdRow = new Div(undefined, "row");
    LableAndTextFeild(
      "col-sm-6",
      "OtherFee",
      "Other Fee*",
      "Other Fee",
      "",
      "0",
      OtherFeeAndMedicaIdRow
    );
    LableAndTextFeild(
      "col-sm-6",
      "MedicaId",
      "Medica Id",
      "45875",
      "",
      "",
      OtherFeeAndMedicaIdRow,
      "",
      ProcessType === "AddNew" ? false : true
    );

    ModalContentBody.appendChild(OtherFeeAndMedicaIdRow);

    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseBranchUpdateModal", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    if (ProcessType === "AddNew") {
      ModalContentFooter.appendChild(
        new Button("BtnBranchSave", "Save", "btn btn-primary", [
          new Attribute(_AttributeOnClick, "AddOrUpdateDoctor()"),
        ])
      );
    } else {
      ModalContentFooter.appendChild(
        new Button("BtnBranchUpdate", "Update", "btn btn-primary", [
          new Attribute(
            _AttributeOnClick,
            "AddOrUpdateDoctor(" + dotcorId + ")"
          ),
        ])
      );
    }

    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    BindView(Container, Modal);

    $("#TxtDoctorDate_Of_Birth").prop("type", "date");
    $("#ModalForBranchAddOrUpdate").modal("show");
  };
}

function DoctorsLoginModal() {
  this.Render = function (Container, dotcorId) {
    // console.log('BranchAddOrUpdateModal:', Container, BranchId, ProcessType);

    const Modal = new Div("ModalDoctorsLogin", "modal");
    Modal.setAttribute("data-backdrop", "static");
    Modal.setAttribute("data-keyboard", "false");

    const ModalDialog = new Div(
      undefined,
      "modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable"
    );
    const ModalDialogContent = new Div(undefined, "modal-content");

    const ModalContentHeader = new Div(undefined, "modal-header");

    ModalContentHeader.appendChild(new Heading4("Login Details", undefined));

    // ModalContentHeader.appendChild(new Heading4("Update Branch", undefined));
    ModalDialogContent.appendChild(ModalContentHeader);

    const ModalContentBody = new Div(undefined, "modal-body");

    const ParentRow = new Div(undefined, "row");

    LableAndTextFeild(
      "col-sm-12",
      "DoctorUser_Name",
      "User Name *",
      "User Name",
      "",
      "",
      ParentRow
    );
    LableAndTextFeild(
      "col-sm-12",
      "DoctorPassword",
      "Password *",
      "Password",
      "",
      "",
      ParentRow
    );

    LableAndTextFeild(
      "col-sm-12",
      "DoctorConfirm_Password",
      "Confirm Password *",
      "Confirm Password",
      "",
      "",
      ParentRow
    );

    ModalContentBody.appendChild(ParentRow);
    ModalDialogContent.appendChild(ModalContentBody);

    const ModalContentFooter = new Div(undefined, "modal-footer");
    ModalContentFooter.appendChild(
      new Button("BtnCloseBranchUpdateModal", "Edit", "btn btn-primary", [
        new Attribute(_AttributeOnClick, "EditPassword()"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnCloseBranchUpdateModal", "Close", "btn btn-primary", [
        new Attribute("data-dismiss", "modal"),
      ])
    );
    ModalContentFooter.appendChild(
      new Button("BtnChangeDoctorPassword", "Save", "btn btn-primary", [
        new Attribute(
          _AttributeOnClick,
          "ChangeDoctorPassword(" + dotcorId + ")"
        ),
      ])
    );

    ModalDialogContent.appendChild(ModalContentFooter);

    ModalDialog.appendChild(ModalDialogContent);
    Modal.appendChild(ModalDialog);

    BindView(Container, Modal);

    $("#TxtDoctorUser_Name").prop("disabled", true);
    $("#TxtDoctorPassword").prop("disabled", true);

    $("#TxtDoctorConfirm_Password").hide();
    $("#LblDoctorConfirm_Password").hide();
    $("#ModalDoctorsLogin").modal("show");
  };
}

/*=================================
             Reports
 =================================*/

function Reports() {
  this.Render = function (Container) {
    const Card = new Div(undefined, "card text-left");
    const CardBody = new Div(undefined, "card-body");

    const Heading = new Heading4("Appointment Reports", [
      new Attribute(_AttributeClass, "card-title mb-3 text-center"),
    ]);
    CardBody.appendChild(Heading);

    const Row = new Div(undefined, "row");

    const ColumnText = new Div(undefined, "col-md-12");
    ColumnText.appendChild(
      new Label(undefined, "Reports", undefined, undefined)
    );
    Row.appendChild(ColumnText);

    const ColumnTable = new Div("ReportsTableWrapper", "col-md-12 mt-2");
    Row.appendChild(ColumnTable);

    CardBody.appendChild(Row);

    Card.appendChild(CardBody);

    BindView(Container, Card);

    new ReportSearch().Render(Containers.MainContent);
  };
}

function ReportSearch() {
  this.Render = function (Container) {
    let CardAddAppoinment = new Div(undefined, "card text-left");
    let CardBodyAddAppoinment = new Div(undefined, "card-body");

    CardBodyAddAppoinment.appendChild(
      new Heading4("Appointment Reports", [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
      ])
    );

    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetails"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetailsSession"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointmentsDetailsPatient"),
      ])
    );
    CardBodyAddAppoinment.appendChild(
      new Heading3(undefined, [
        new Attribute(_AttributeClass, "card-title mb-3 text-center"),
        new Attribute(_AttributeId, "TxtAppointPaymentCheck"),
      ])
    );

    let DoctorSearchRow = new Div("ReportSearchRow", "row");
    let SearchColumnOne = new Div(undefined, "col-lg-12 text-center");
    DoctorSearchRow.appendChild(SearchColumnOne);
    CardBodyAddAppoinment.appendChild(DoctorSearchRow);

    let FormAppoinments = new Form(undefined);
    let FormRow0Appoinment = new Div(undefined, "form-group row mt-0");

    let DivFormRowDoctor = new Div(undefined, "col-sm-3 mt-2 text-left");
    let LabelAppoinment = new Label(undefined, "Select Branch *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpBranch"),
    ]);
    let SelectBranch = new Select("DrpBranch", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
      new Attribute(_AttributeOnChange, "GetDoctorByBranch()"),
    ]);
    SelectBranch.appendChild(
      new SelectItem("Select Branch", 0, [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    DivFormRowDoctor.appendChild(LabelAppoinment);
    DivFormRowDoctor.appendChild(SelectBranch);

    let DivFormRowDoctor1 = new Div(undefined, "col-sm-3 mt-2 text-left");
    let LabelAppoinment1 = new Label(undefined, "Select Doctor *", [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "DrpBranch"),
    ]);
    let SelectDoctor = new Select("DrpDoctor", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded select"
      ),
    ]);
    SelectDoctor.appendChild(
      new SelectItem("Select Doctor", 0, [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    DivFormRowDoctor1.appendChild(LabelAppoinment1);
    DivFormRowDoctor1.appendChild(SelectDoctor);

    FormRow0Appoinment.appendChild(DivFormRowDoctor);
    FormRow0Appoinment.appendChild(DivFormRowDoctor1);

    LableAndTextFeild(
      "col-sm-3 text-left",
      "ReportFrom_Date",
      "From Date",
      "From Date",
      "",
      "",
      FormRow0Appoinment,
      "date"
    );
    LableAndTextFeild(
      "col-sm-3 text-left",
      "ReportTo_Date",
      "To Date",
      "To Date",
      "",
      "",
      FormRow0Appoinment,
      "date"
    );

    let DoctorSearchActionRow = new Div(
      "ReportSearchRow",
      "row align-items-end justify-items-end mb-3"
    );

    let data = [];
    data.push(
      new SelectItem("All Appointments", "All Appointments", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
        new Attribute("id", "All_Appointments"),
      ])
    );
    data.push(
      new SelectItem("Successful Consultation", "Successful Consultation", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Refund", "Unsuccessful consultation with Refund", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("Pending", "pending", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem("No Show", "Cancellation as “No Show", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    data.push(
      new SelectItem(
        "Rescheduled",
        "Unsuccessful consultation with Rescheduling",
        [
          new Attribute(
            _AttributeClass,
            "form-control form-control-rounded appointment-class"
          ),
        ]
      )
    );

    DropDown(
      "col-sm-3  mt-2 form-group",
      "DrpReportAppointmentStatus",
      "Appointment Status",
      "",
      data,
      DoctorSearchActionRow
    );

    let doctorFees = [];
    doctorFees.push(
      new SelectItem("All Fees", "AllFees", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
        new Attribute("id", "All_Fees"),
      ])
    );
    doctorFees.push(
      new SelectItem("Doctor Payable", "DoctorPayable", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    doctorFees.push(
      new SelectItem("Hospital Fee", "HospitalFee", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );
    doctorFees.push(
      new SelectItem("Other Fee", "OtherFee", [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
      ])
    );

    // DropDown("col-sm-3  mt-2 form-group", "DrpFeeFilter", "Fee Type", "", doctorFees, DoctorSearchActionRow);

    DoctorSearchActionRow.innerHTML += `<div class="col-sm-3  mt-2 form-group">
                                                <label >Select Fee *</label>
                                                <div class="dropdown">
                                                  <button class="btn btn-default dropdown-toggle form-control form-control-rounded  text-left" type="button" data-toggle="dropdown"><span class="dropdown-text"> Select Fees</span>
                                                  <span class="caret"></span></button>
                                                  <ul class="dropdown-menu px-2 bg-white" style="left: 10px!important;">
                                                    <li><label><input type="checkbox" class="selectAll" /><span class="select-text"> Select</span> all fees</label></li>
                                                    <li class="divider"></li>
                                                    <li class="option justOne"><label><input name='options[]' type="checkbox" class="option justOne" value='Option 1'/> Doctor payable</label></li>
                                                    <li class="option justOne"><label><input name='options[]' type="checkbox" class="option justOne" value='Option 2'/> Hospital fee</label></li>
                                                    <li class="option justOne"><label><input name='options[]' type="checkbox" class="option justOne" value='Option 3'/> Service fee</label></li>
                                                    <li class="option justOne"><label><input name='options[]' type="checkbox" class="option justOne" value='Option 4'/> Other fee</label></li>
                                                  </ul>
                                                </div>
                                            </div>`;

    let ButtonPatientSearch = new Button(
      "DoctorBranchSearchButton",
      "Search",
      "btn btn-primary btn-rounded  col-2 form-group",
      [new Attribute(_AttributeOnClick, "Report_Search()")]
    );
    DoctorSearchActionRow.appendChild(ButtonPatientSearch);
    CardBodyAddAppoinment.appendChild(DoctorSearchActionRow);
    FormAppoinments.appendChild(FormRow0Appoinment);
    SearchColumnOne.appendChild(FormAppoinments);

    let AppointmentSearchResultsRow = new Div("ReportSearchResults", "");
    AppointmentSearchResultsRow.appendChild(
      new Div("DivReportTable", "col-lg-12")
    );
    CardBodyAddAppoinment.appendChild(AppointmentSearchResultsRow);

    CardAddAppoinment.appendChild(CardBodyAddAppoinment);

    BindView(Container, CardAddAppoinment);

    $("#TxtReportFrom_Date").prop("type", "date");
    $("#TxtReportTo_Date").prop("type", "date");

    $("body").on("click", ".dropdown-menu", function (e) {
      $(this).parent().is(".open") && e.stopPropagation();
    });

    $(".selectAll").click(function () {
      if ($(this).is(":checked")) {
        $(".option").prop("checked", true);
        let total = $('input[name="options[]"]:checked').length;
        $(".dropdown-text").html("(" + total + ") fees selected");
        $(".select-text").html(" Deselect");
      } else {
        $(".option").prop("checked", false);
        $(".dropdown-text").html("(0) fees selected");
        $(".select-text").html(" Select");
      }
    });

    $("li.justOne").click(function () {
      let a = $("input[type='checkbox'].justOne");
      if (a.length == a.filter(":checked").length) {
        $(".selectAll").prop("checked", true);
        $(".select-text").html(" Deselect");
      } else {
        $(".selectAll").prop("checked", false);
        $(".select-text").html(" Select");
      }
      let total = $('input[name="options[]"]:checked').length;
      $(".dropdown-text").html("(" + total + ") fees selected");
    });
  };
}

function ReportSearchResultsTable() {
  this.Render = function (Container, Data) {
    let Headers = [
      "No",
      "Date & Time",
      "Appointment No",
      "Patient Name",
      "Patient Mobile",
      "Appointment Status",
    ];
    let ParentRow = new Div(undefined, "row");

    let ColumnTableTitle = new Div(undefined, "col-md-12");
    let Heading = new Heading5("Prescription History", undefined);
    ColumnTableTitle.appendChild(Heading);
    ParentRow.appendChild(ColumnTableTitle);

    const ColumnAddNewBranch = new Div(undefined, "col-md-12");
    const ButtonAddNewBranch = new Button(
      undefined,
      "Download",
      "btn btn-primary btn-rounded float-right",
      [new Attribute(_AttributeOnClick, "DownloadReport()")]
    );
    ColumnAddNewBranch.appendChild(ButtonAddNewBranch);
    ParentRow.appendChild(ColumnAddNewBranch);

    const ColumnTable = new Div(undefined, "col-md-12 mt-2");
    let DivTableBranchesSearchResults = new Div(undefined, "table-responsive");
    DivTableBranchesSearchResults.appendChild(
      new TableView(
        "TableReportSearchResults",
        "table table-striped",
        Headers,
        Data,
        undefined
      )
    );
    ColumnTable.appendChild(DivTableBranchesSearchResults);
    ParentRow.appendChild(ColumnTable);

    BindView(Container, ParentRow);
  };
}

/*=================================
             Misc
 =================================*/

function Misc() {
  this.Render = function (Container) {
    const Card = new Div(undefined, "card text-left");
    const CardBody = new Div(undefined, "card-body");

    const Heading = new Heading4("Invoice Reports", [
      new Attribute(_AttributeClass, "card-title mb-3 text-center"),
    ]);
    CardBody.appendChild(Heading);

    const RowOne = new Div(undefined, "row");
    const RowOneColumnOne = new Div(undefined, "col-md-12");

    RowOneColumnOne.appendChild(
      new Label(undefined, "Misc", undefined, undefined)
    );

    RowOne.appendChild(RowOneColumnOne);
    CardBody.appendChild(RowOne);

    Card.appendChild(CardBody);

    BindView(Container, Card);
  };
}

function LableAndTextFeild(
  classCol,
  id,
  lbl,
  placeHolder,
  pattern,
  value,
  ParentRow,
  type,
  isDisabled = false
) {
  const ColumnBranch = new Div(undefined, classCol + " mt-2");
  const LabelBranch = new Label(
    "Lbl" + id + lbl.replaceAll(" ", "_").replaceAll(".", ""),
    lbl,
    [
      new Attribute(_AttributeClass, "col-form-label"),
      new Attribute(_AttributeFor, "Txt" + id),
    ]
  );

  var att = [];
  att.push(new Attribute(_AttributePattern, pattern));
  att.push(new Attribute(_AttributePlaceHolder, placeHolder));
  att.push(new Attribute("value", value));
  if (isDisabled) {
    att.push(new Attribute("disabled", "true"));
  }

  console.log(type);
  if (type == "date") {
    att.push(new Attribute(_AttributeType, "date"));
  }
  const TextBranch = new Textbox(
    "Txt" + id,
    "form-control form-control-rounded",
    att
  );
  ColumnBranch.appendChild(LabelBranch);
  ColumnBranch.appendChild(TextBranch);
  ParentRow.appendChild(ColumnBranch);
}

function TextField({
  elementId,
  classList,
  placeholder,
  pattern,
  value,
  parentRow,
  type,
  onKeyUp,
  disabled = false,
}) {
  const attributes = [];
  if (pattern) {
    attributes.push(new Attribute(_AttributePattern, pattern));
  }
  if (placeholder) {
    attributes.push(new Attribute(_AttributePlaceHolder, placeholder));
  }
  if (value) {
    attributes.push(new Attribute("value", value));
  }
  if (disabled) {
    attributes.push(new Attribute("disabled", "true"));
  }
  if (type) {
    attributes.push(new Attribute(_AttributeType, type));
  }
  if (onKeyUp) {
    attributes.push(new Attribute("onkeyup", onKeyUp));
  }
  const textField = new Textbox(
    "Txt" + elementId,
    `form-control form-control-rounded ${classList}`,
    attributes
  );
  parentRow.appendChild(textField);
}

function DropDown(classCol, id, lbl, functionExec, customOptions, ParentRow) {
  let DivFormRowDoctor = new Div(undefined, classCol);
  let LabelAppoinment = new Label(undefined, "Select " + lbl, [
    new Attribute(_AttributeClass, "col-form-label"),
    new Attribute(_AttributeFor, id),
  ]);
  let SelectBranch = new Select(id, [
    new Attribute(_AttributeClass, "form-control form-control-rounded select"),
    new Attribute(_AttributeOnChange, functionExec),
  ]);
  SelectBranch.appendChild(
    new SelectItem("Select " + lbl, "", [
      new Attribute(
        _AttributeClass,
        "form-control form-control-rounded appointment-class"
      ),
    ])
  );

  if (customOptions) {
    customOptions.forEach((currentElement) => {
      SelectBranch.appendChild(currentElement);
    });
  }
  DivFormRowDoctor.appendChild(LabelAppoinment);
  DivFormRowDoctor.appendChild(SelectBranch);
  ParentRow.appendChild(DivFormRowDoctor);
}

function SelectOption({
  elementId,
  classList,
  placeholder,
  parentRow,
  selectedValue,
  onChangeFunc = () => {},
  options = [],
  disabled = false,
}) {
  const attributes = [];
  if (placeholder) {
    attributes.push(new Attribute(_AttributePlaceHolder, placeholder));
  }
  if (disabled) {
    attributes.push(new Attribute("disabled", "true"));
  }

  let SelectBranch = new Select(elementId, [
    new Attribute(
      _AttributeClass,
      `form-control form-control-rounded select ${classList}`
    ),
    new Attribute(_AttributeOnChange, onChangeFunc),
    ...attributes,
  ]);
  options.forEach((currentElement) => {
    let isSelected = false;
    if (selectedValue) {
      isSelected = currentElement.value === selectedValue;
    }
    let selectOption = new SelectItem(
      currentElement.label,
      currentElement.value,
      [
        new Attribute(
          _AttributeClass,
          "form-control form-control-rounded appointment-class"
        ),
        ...(isSelected ? [new Attribute("selected", "true")] : []),
      ]
    );
    SelectBranch.appendChild(selectOption);
  });
  parentRow.appendChild(SelectBranch);
}
