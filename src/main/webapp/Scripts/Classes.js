/*=================================
		Proxy Classes
 =================================*/
function UserCredential(Username, Password, RememberMe, UserAgent, AccessToken) {
    this.Username = Username;
    this.Password = Password;
    this.RememberMe = RememberMe;
    this.UserAgent = UserAgent;
    this.AccessToken = AccessToken;
}

function Patient(PatientId, ParentId, Id) {
    this.PatientId = PatientId;
    this.ParentId = ParentId;
    this.Id = Id;
}

function GetPrescriptionDrugReport(PrescriptionRecordId) {
    this.PrescriptionRecordId = PrescriptionRecordId;
}

function SavePatientDetails(Id, FirstName, MiddleName, LastName, NIC, Passport, Mobile, Gender, Title, DateOfBirth, PatientTypeId, UserSaved, UniqueId, ParentId, MaritalStatus, Occupation, Address, BloodGroup, number) {
    this.Id = Id;
    this.FirstName = FirstName;
    this.MiddleName = MiddleName;
    this.LastName = LastName;
    this.NIC = NIC;
    this.Passport = Passport;
    this.Mobile = Mobile;
    this.Gender = Gender;
    this.Title = Title;
    this.DateOfBirth = DateOfBirth;
    this.PatientTypeId = PatientTypeId;
    this.UserSaved = UserSaved;
    this.UniqueId = UniqueId;
    this.ParentId = ParentId;
    this.MaritalStatus = MaritalStatus;
    this.Occupation = Occupation;
    this.Address = Address;
    this.BloodGroup = BloodGroup;
    this.number = number;
}

function UserSave(Username, Password, UserGroupId, UserCreated, UserModified, Status, ParentId) {
    this.Username = Username;
    this.Password = Password;
    this.UserGroupId = UserGroupId;
    this.UserCreated = UserCreated;
    this.UserModified = UserModified;
    this.Status = Status;
    this.ParentId = ParentId;
}

function PatientReminder(PatientId, Subject, ReminderType, Description, Date, Time, Status) {
    this.PatientId = PatientId;
    this.Subject = Subject;
    this.ReminderType = ReminderType;
    this.Description = Description;
    this.Date = Date;
    this.Time = Time;
    this.Status = Status;
}

function SessionSave(Id, AppointmentLimit, DoctorId, InstituteBranchId, RoomNumber, Status, Type, Date, TimeEnd, TimeStart, UserSaved) {
    this.AppointmentLimit = AppointmentLimit;
    this.DoctorId = DoctorId;
    this.Id = Id;
    this.InstituteBranchId = InstituteBranchId;
    this.RoomNumber = RoomNumber;
    this.Status = Status;
    this.Type = Type;
    this.TimeEnd = TimeEnd;
    this.TimeStart = TimeStart;
    this.UserSaved = UserSaved;
    this.SelectedDate = Date;
}

function Nurse(UserId) {
    this.UserId = UserId;
}

function Doctor(DoctorId, InstituteBranchId) {
    this.DoctorId = DoctorId;
    this.InstituteBranchId = InstituteBranchId;
}

function SessionId(Id) {
    this.SessionId = Id;
}

function SaveAppointment(Id, Number, SessionId, PatientId, Description, Status, UserId) {
    this.Id = Id;
    this.Number = Number;
    this.SessionId = SessionId;
    this.PatientId = PatientId;
    this.Description = Description;
    this.Status = Status;
    this.UserId = UserId;
}

function AppointmentList(Id, UserId, Number, SessionId) {
    this.Id = Id;
    this.UserId = UserId;
    this.Number = Number;
    this.SessionId = SessionId;
}

function UserPatient(UserId, PatientId, UserSaved) {
    this.UserId = UserId;
    this.PatientID = PatientId;
    this.UserSaved = UserSaved;
}

function PatientNIC(NIC) {
    this.NIC = NIC;
}

function PatientPassport(Passport) {
    this.Passport = Passport;
}

function MobileNumber(Mobile) {
    this.Mobile = Mobile;
}

function PatientReport(PatientId) {
    this.PatientId = PatientId;
}

function PatientReportIdFileName(ReportId, FileName) {
    this.ReportId = ReportId;
    this.FileName = FileName;
    this.ReportType = ReportType;
    this.DateCreated = DateCreated;
}

function MedicalAnalytic(Id, AppointmentId, PatientId, Weight, Height, PulseRate, BloodPressureSystolic, BloodPressureDiastolic, Temperature, SavePatient, SaveAppointment, UserSaved) {
    this.Id = Id;
    this.AppointmentId = AppointmentId;
    this.PatientId = PatientId;
    this.Weight = Weight;
    this.Height = Height;
    this.PulseRate = PulseRate;
    this.BloodPressureSystolic = BloodPressureSystolic;
    this.BloodPressureDiastolic = BloodPressureDiastolic;
    this.Temperature = Temperature
    this.UserSaved = UserSaved;
    this.Patient = SavePatient;
    this.Appointment = SaveAppointment;
}

function Prescription(Id, InstituteBranchId) {
    this.Id = Id;
    this.InstituteBranchId = InstituteBranchId;
}

function PrescriptionRecord(Id) {
    this.PrescriptionRecordId = Id;
}

function RecordDrugsUpdates(Status, Id, DrugId) {
    this.Status = Status;
    this.Id = Id;
    this.DrugId = DrugId;
}

function SearchPatient(NIC, Mobile, DateOfBirth, Name, Passport, UniqueId) {
    this.NIC = NIC;
    this.Mobile = Mobile;
    this.DateOfBirth = DateOfBirth;
    this.Name = Name;
    this.Passport = Passport;
    this.UniqueId = UniqueId;
}

function RecordDrugsUpdatesDetails(RecordDrugsUpdates, Id, PrescriptionId, AppointmentId, PatientId, Status, UserSaved) {
    this.RecordDrugsUpdates = RecordDrugsUpdates;
    this.Id = Id;
    this.PrescriptionId = PrescriptionId;
    this.AppointmentId = AppointmentId;
    this.PatientId = PatientId;
    this.Status = Status;
    this.UserSaved = UserSaved;
}

function PatientNewGet(PatientId) {
    this.PatientId = PatientId;
}

function GetMobileNumber(MobileNumber) {
    this.MobileNumber = MobileNumber;
}

function HttpRequestReq(ServiceUrl, Headers, GlobalFail, Silent, ShowLoadermethod, HideLoaderMethod) {
    this.ServiceUrl = ServiceUrl;
    this.Headers = Headers;
    this.GlobalFail = GlobalFail;
    this.Silent = Silent === undefined || Silent === null ? false : Silent;
    this.ShowLoadermethod = ShowLoadermethod;
    this.HideLoaderMethod = HideLoaderMethod;
}

function GetSessions(DoctorId, SelectedDate, Type) {
    this.DoctorId = DoctorId;
    this.SelectedDate = SelectedDate;
    this.Type = Type;
}

function AllAppointmentsForToday(NurseId, SelectedDate) {
    this.NurseId = NurseId
    this.SelectedDate = SelectedDate;
}

function PatientUploadInformation(PatientId, Type, FileName, Name, UserSaved) {
    this.PatientId = PatientId;
    this.Type = Type;
    this.FileName = FileName;
    this.Name = Name;
    this.UserSaved = UserSaved;
}

/*=================================
		Admin Proxy Classes
 =================================*/

function InstituteBranch(Id, UserId, InstituteId)
{
    this.Id = Id;
    this.UserId = UserId;
    this.InstituteId = InstituteId;
}

function InstituteBranchSave(Id, InstituteId, Name, AddressId, Email, Website, Numbers, Status, UserSaved)
{
    this.Id = Id;
    this.InstituteId = InstituteId;
    this.Name = Name;
    this.AddressId = AddressId;
    this.Email = Email;
    this.Website = Website;
    this.Numbers = Numbers;
    this.Status = Status;
    this.UserSaved = UserSaved;
}

function Address(Id, AddressLine1, AddressLine2, Suburb, City, Postcode, Status, UserSaved)
{
    this.Id = Id;
    this.AddressLine1 = AddressLine1;
    this.AddressLine2 = AddressLine2;
    this.Suburb = Suburb;
    this.City = City;
    this.Postcode = Postcode;
    this.Status = Status;
    this.UserSaved = UserSaved;
}

function DoctorChannelingStatus(AppointmentId, SessionId, PatientId, DoctorStatus, ChannelingStatus, Id)
{
    this.AppointmentId = AppointmentId;
    this.SessionId = SessionId;
    this.PatientId = PatientId;
    this.DoctorStatus = DoctorStatus;
    this.ChanalingStatus = ChannelingStatus;
    this.Id = Id;
}

function GetDoctorsByInstituteBranchId(InstituteBranchId)
{
    this.InstituteBranchId = InstituteBranchId;
}

function ContactNumbers(Id,ContactNumber,Status){
    this.Id = Id;
    this.ContactNumber=ContactNumber;
    this.Status=Status;
}
function DoctorSpecialization(Id,DoctorId,SpecializationId,Status,UserSaved){
    this.Id = Id;
    this.DoctorId=DoctorId;
    this.SpecializationId=SpecializationId;
    this.Status=Status;
    this.UserSaved=UserSaved;
}
function DoctorQualification(Id,DoctorId,QualificationId,Status,UserSaved){
    this.Id = Id;
    this.DoctorId=DoctorId;
    this.QualificationId=QualificationId;
    this.Status=Status;
    this.UserSaved=UserSaved;
}

function DoctorSave(Id, Title, FirstName, MiddleName, LastName, Email, NIC, Status, UserSaved, RegistrationNumber, DateOfBirth, Addresses, ContactNumbers)
{
    this.Id = Id;
    this.Title = Title;
    this.FirstName = FirstName;
    this.MiddleName = MiddleName;
    this.LastName = LastName;
    this.Email = Email;
    this.NIC = NIC;
    this.Status = Status;
    this.UserSaved = UserSaved;
    this.RegistrationNumber = RegistrationNumber;
    this.DateOfBirth = DateOfBirth;
    this.Addresses = Addresses;
    this.ContactNumbers = ContactNumbers;
}
function DoctorBranch(InstituteBranchId, DoctorId, Status, UserSaved)
{
    this.InstituteBranchId = InstituteBranchId;
    this.DoctorId = DoctorId;
    this.Status = Status;
    this.UserSaved = UserSaved;
}

function User(Id, Username,Password    , UserGroupId, Status, UserCreated, UserModified ){
    this.Id = Id;
    this.Username = Username;
    this.Password =Password;
    this.UserGroupId = UserGroupId;
    this.Status = Status;
    this.UserCreated=UserCreated;
    this.UserModified=UserModified;
}
function DoctorUser(Id, UserId, DoctorId, UserSaved){
    this.Id = Id;
    this.UserId=UserId;
    this.DoctorId =DoctorId;
    this.UserSaved=UserSaved;
}
