package Mobios.API.Helper;

import Mobios.Carriers.Response;
import Mobios.Common.Config;
import Mobios.HTTP.ContentType;
import Mobios.HTTP.HttpMethods;
import Mobios.HTTP.RequestHandler;
import com.google.gson.Gson;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

class TokenDTO{
    public String token;
}

@WebServlet(
        urlPatterns = {"/GasExtension"}
)
public class GasExtension extends HttpServlet {

    protected void doPost(HttpServletRequest Request, HttpServletResponse Response) throws IOException {
        try{
           Mobios.Carriers.Response TokenResponse =  GAS.IssueTokens(Request);

            TokenDTO tokenDTO = new TokenDTO();
            tokenDTO.token = TokenResponse.GetData().toString();

            Gson gson = new Gson();
            String response = gson.toJson(tokenDTO);

            Response.setContentType("application/json");
            Response.setCharacterEncoding("UTF-8");
            PrintWriter out = Response.getWriter();

            out.print(response);
            out.flush();

        }catch(Exception e){
            System.out.println(e);
        }

    }

}
