package server.handlers;

import server.utilities.SneakerUtils;
import spark.Request;
import spark.Response;
import spark.Route;
import edu.brown.cs32.examples.sprint3.JsonHandlers.JSONParser;
import edu.brown.cs32.examples.sprint3.server.utilities.Serialize;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class SneakerSKUHandler implements Route {
    private SneakerUtils.SneakerInfo sneakerInfo;
    private SneakerUtils.SneakerData data;


    //gives the sneaker SKU
    public SneakerSKUHandler(String sneakerJSON) {
        try {
            this.sneakerInfo = JSONParser.fromSneakerJson(sneakerJSON);
        } catch (IOException e) {
            System.err.println("Sneaker Data couldn't be deserialized.");
        }
    }

    private static String findSneakerSKU(SneakerUtils.SneakerData sneakerInfoData, String sneakerName) {
        for (SneakerUtils.SneakerInfo datum : sneakerData.data()) {
            if (sneakerName.toLowerCase().equals(datum.name().toLowerCase())) {
                return datum.sku();
            }
        }
        return null;
    }


    @Override
    public Object handle(Request request, Response response) throws Exception {
        String sneakerName = request.queryParams("name");

        if (sneakerName == null || sneakerName.isBlank() || sneakerName == "") {
            return edu.brown.cs32.examples.sprint3.server.utilities.Serialize.error("error_bad_request", "keyword parameter is missing");
        }

        String skuNumber = findSneakerSKU(sneakerInfo, sneakerName);


        if (skuNumber.isBlank()) {
            return Serialize.error("error_bad_request", "sku number does not exist. try a more specific sneaker name");
        }


        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("result", "success");
        successResponse.put("sku", skuNumber);

        return Serialize.success(successResponse);


    }
}
