package server.utilities;

import com.squareup.moshi.Json;

import java.util.List;

public class SneakerUtils {

        public record SneakerData(
                @Json(name = "count") String count,
                @Json(name = "data") List<SneakerInfo> data
        ){}

        public record SneakerInfo(
                @Json(name = "sku") String sku,
                @Json(name = "name") String name,
                @Json(name = "initialPrice") Double initialPrice,
                @Json(name = "image") String image

        ){}

}
