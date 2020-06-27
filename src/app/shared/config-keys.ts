export class SysMessages {
    public static RecordSaved = "Record saved successfully.";
    public static RecordDeleted = "Record deleted successfully.";
    public static OperationError = "Error in performing operation. Check system logs for more details";
    public static Unauthorized = "You are not authorized to perform this action.";
    public static BadGateway = "Error connecting to server. Please check your internet connection.";
    public static NotFound = "Not Found. The resource you requested can not be found.";
    public static NotAllowed = "Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.";
    public static ConnectionLost = "Connection to server was lost.";
}


export class AppRouteNames {
    public static Login = "login";
    public static UnAuthorized = "unauthorized";
    public static Admin = "admin";
    public static Expired = "expired";
    public static Subscription = "subscription";
    public static Dashboard = "dashboard";
    public static Clients = "clients";
    public static Register = "register";
    public static MessagePortal = "messageportal";
    public static Reports = "reports";
    public static ReportViewer = "reportViewer";
    public static Settings = "settings";
    public static GenericSettings = ":model";
    public static Configs = "configs";
    public static UserManagement = "user-management";
    public static Users = "users";
    public static Roles = "roles";
    public static UserProfile = "profile";
    public static ProfileAccount = "profileaccount";
    public static ProfileSetting = "profilesetting";
    public static ChangePassword = "changepassword";
}


export class StoreKeys {
    public static CurrentUser = "cmVzdQ==";
    public static Token = "c2FuZmlsMw==";
}

export class LoadingMessages {
    public static Loading = "Loading...";
    public static Saving = "Saving...";
    public static Deleting = "Deleting...";
}

export class LookUpStores {
    public static Users = "users";
    public static Titles = "titles";
    public static Units = "units";
}

export class Enums {
    public static UserTypes = "UserType";
}

export class Privileges {
    public static UserCreate = "User.Create";
    public static UserUpdate = "User.Update";
    public static UserRead = "User.Read";
    public static UserDelete = "User.Delete";

    public static RoleCreate = "Role.Create";
    public static RoleUpdate = "Role.Update";
    public static RoleRead = "Role.Read";
    public static RoleDelete = "Role.Delete";

    public static StationCreate = "Station.Create";
    public static StationUpdate = "Station.Update";
    public static StationRead = "Station.Read";
    public static StationDelete = "Station.Delete";

    public static Dashboard = "Dashboard";
    public static Report = "Report";
    public static Setting = "Setting";
    public static Administration = "Administration";


}