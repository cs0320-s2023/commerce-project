package server.utilities;

import com.squareup.moshi.Json;


import java.net.URL;
import java.util.List;

public class SneakerUtils {
        public record SneakerData(
                @Json(name = "sku") String sku,
                @Json(name = "name") String name,
                @Json(name = "initialPrice") Double initialPrice,
                @Json(name = "image") String image

        ){}

}
