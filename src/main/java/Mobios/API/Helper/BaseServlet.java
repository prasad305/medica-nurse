package Mobios.API.Helper;

//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

import Mobios.API.Helper.GAS;
import Mobios.Carriers.Response;
import Mobios.Carriers.ValidationRequest;
import Mobios.Common.Config;
import Mobios.CustomException.CustomExceptionHandler;
import Mobios.HTTP.ContentType;
import Mobios.HTTP.HttpMethods;
import Mobios.HTTP.RequestHandler;
import com.google.gson.Gson;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@WebServlet(
        urlPatterns = {"/SaveBrowserId"}
)
public class BaseServlet extends HttpServlet {
    private static String _UserAgent;
    private static String _ClientIp;
    private static Response _Response;
    private static HttpSession _Session;
    private static RequestHandler _RequestHandler;
    private static HttpServletRequest _ServletRequest;
    private static HttpServletResponse _ServletResponse;

    public BaseServlet() {
    }

    public static void SetSession(String Key, Object Value) {
        _Session.setAttribute(Key, Value);
    }

    public static Object GetSession(String Key) {
        return _Session.getAttribute(Key);
    }

    public static String GetHeader(String Key) {
        return _ServletRequest.getHeader(Key);
    }

    public void SetHeader(String Key, String Value) {
        _ServletResponse.setHeader(Key, Value);
    }

    public static String GetToken() {
        return (String)GetSession("Token");
    }

    public static String GetBrowserId() {
        return (String)GetSession("BrowserId");
    }

    protected HttpServletRequest GetHttpRequest() {
        return _ServletRequest;
    }

    protected HttpServletResponse GetHttpResponse() {
        return _ServletResponse;
    }

    public static void Init(HttpServletRequest Request, HttpServletResponse Response) throws Exception {
        _Session = Request.getSession();
        _ServletRequest = Request;
        _ServletResponse = Response;
        Response TokenResponse = GAS.IssueTokens(Request);
        _Session.setAttribute("Token", TokenResponse.GetData());
        GenerateToken(Request, Response);
    }

    public String CallRemoteApi(String Method, String URL) throws CustomExceptionHandler {
        Map<String, String> Headers = new HashMap();
        Headers.put("Token", GetToken());
        Headers.put("ClientIp", _ClientIp);
        Headers.put("BrowserId", GetBrowserId());
        Headers.put("UserAgent", _UserAgent);
        _RequestHandler = new RequestHandler(ContentType.JSON, Headers);
        return _RequestHandler.Call(Method, URL, (Object)null);
    }

    protected static void GenerateToken(HttpServletRequest Request, HttpServletResponse Response) throws IOException {
        _ServletRequest = Request;
        StringBuilder SetBrowserId = new StringBuilder();
//        SetBrowserId.append("<script> var _BrowserToken=\"" + GetToken() + "\"</script>");
//        SetBrowserId.append("<script src = \"https://js.mobios.lk/jquery_v3.3.1.min.js\" ></script>");
//        SetBrowserId.append("<script src = \"https://js.mobios.lk/httprequest.min.js\"></script>");
//        SetBrowserId.append("<script> var _BrowserIdUrl = \"" + _ServletRequest.getContextPath() + "\"</script>");
//        SetBrowserId.append("<script src = \"https://js.mobios.lk/imprint.min.js\"></script>");
//        SetBrowserId.append("<script src = \"https://js.mobios.lk/BrowserIdJava.js\"></script>");

        SetBrowserId.append("<script> var _BrowserToken=\"" + GetToken() + "\"</script>");
        SetBrowserId.append("<script src = \"Scripts/Gas/jquery_v3.3.1.min.js\" ></script>");
        SetBrowserId.append("<script src = \"Scripts/Gas/httprequest.min.js\"></script>");
        SetBrowserId.append("<script src = \"Scripts/Gas/cookies.js\"></script>");
        SetBrowserId.append("<script> var _BrowserIdUrl = \"" + _ServletRequest.getContextPath() + "\"</script>");
        SetBrowserId.append("<script src = \"Scripts/Gas/imprint.min.js\"></script>");
        SetBrowserId.append("<script src = \"Scripts/Gas/BrowserIdJava.js\"></script>");
        PrintWriter Out = Response.getWriter();
        Out.println(SetBrowserId);
    }

    public static Response SaveBrowserId(String BrowserToken, String BrowserId) {
        Gson Gson = new Gson();
        ValidationRequest ValidateInfo = new ValidationRequest(BrowserId.concat("|" + _UserAgent), BrowserToken, _ClientIp);

        try {
            _RequestHandler = new RequestHandler(ContentType.JSON);
            String URL = Config.Read("GasBrowserIdLogger");
            _Response = (Response)Gson.fromJson(_RequestHandler.Call(HttpMethods.POST, URL, ValidateInfo), Response.class);
            _Session.setAttribute("BrowserId", _Response.GetData());
            System.out.println("GetBrowserId" + GetBrowserId());
        } catch (Exception var5) {
            var5.printStackTrace();
        }

        return _Response;
    }


    protected void doPost(HttpServletRequest Request, HttpServletResponse Response) throws IOException {
        _ServletRequest = Request;
        StringBuilder Builder = new StringBuilder();
        BufferedReader Reader = Request.getReader();
        HashMap<String, String> Headers = new HashMap();
        _RequestHandler = new RequestHandler(ContentType.JSON, Headers);

        String Line;
        while((Line = Reader.readLine()) != null) {
            Builder.append(Line);
        }

        String Data = Builder.toString();
        try {
            JSONObject JsonObject = new JSONObject(Data);
            _ClientIp = !_ServletRequest.getRemoteAddr().equals("0:0:0:0:0:0:0:1") && !_ServletRequest.getRemoteAddr().equals("127.0.0.1") ? _ServletRequest.getRemoteAddr() : _RequestHandler.Call(HttpMethods.GET, Config.Read("IPchecker"), (Object)null).replace("\"", "");
            _UserAgent = _ServletRequest.getHeader("User-Agent");
            Mobios.Carriers.Response response = SaveBrowserId(JsonObject.getString("BrowsrToken"), JsonObject.getString("BrowserId"));

            Response.setContentType("text/html");
            PrintWriter out = Response.getWriter();
            out.append(response.GetData().toString());
            out.close();
        } catch (Exception var9) {
            var9.printStackTrace();
        }
    }
}

