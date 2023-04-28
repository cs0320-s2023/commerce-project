package server.handlers;

import JsonHandlers.JSONParser;
import server.utilities.SneakerUtils;
import spark.Request;
import spark.Response;
import spark.Route;

import edu.brown.cs32.examples.sprint3.server.utilities.Serialize;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class SneakerPriceHandler implements Route {

    // we must not Serialize the success response in SKUHandler - we could just simply include a call to Sneaker price Handler in the previous handler and
    // return the cheapest price using a simple logic algo
    public SneakerPriceHandler(String sku){

    }

    @Override
    public Object handle(Request request, Response response) throws Exception {
        // System.out.println(data);

        // String sneakerName = request.queryParams("name");

        // if (sneakerName == null || sneakerName.isBlank() || sneakerName == "") {
        //     return edu.brown.cs32.examples.sprint3.server.utilities.Serialize.error("error_bad_request", "keyword parameter is missing");
        // }

        // String skuNumber = findSneakerSKU(data, sneakerName);
        // System.out.println(skuNumber);


        // if (skuNumber.isBlank()) {
        //     return Serialize.error("error_bad_request", "sku number does not exist. try a more specific sneaker name");
        // }


        Map<String, Object> successResponse = new HashMap<>();
        successResponse.put("result", "success");
        successResponse.put("sku", skuNumber);

        return Serialize.success(successResponse);


    }
    
}
