package server.handlers;

import server.utilities.SneakerUtils;
import spark.Request;
import spark.Response;
import spark.Route;

import java.io.IOException;

public class SneakerSKUHandler implements Route {
    private SneakerUtils.SneakerData sneakerData;


    public void SneakerDataHandler(String sneakerJSON) {
        try {
            this.sneakerData = edu.brown.cs32.examples.sprint3.JsonHandlers.JSONParser.fromSneakerJson(sneakerJSON);
        } catch (IOException e) {
            System.err.println("Sneaker Data couldn't be deserialized.");
        }
    }


    @Override
    public Object handle(Request request, Response response) throws Exception {
        String sneakerName = request.queryParams("name");

        if (sneakerName == null || sneakerName.isBlank() || sneakerName == "") {
            return edu.brown.cs32.examples.sprint3.server.utilities.Serialize.error("error_bad_request", "keyword parameter is missing");
        }



        return null;
    }
}
