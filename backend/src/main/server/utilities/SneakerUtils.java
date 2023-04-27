package server.utilities;

import com.squareup.moshi.Json;

import java.util.HashMap;
import java.util.List;

public class SneakerUtils {

        public record SneakerData(
                @Json(name = "count") String count,
                @Json(name = "data") List<SneakerInfo> data,
                @Json(name = "error") String error
        ){}

        public record SneakerInfo(
                @Json(name = "id") String id,
                @Json(name = "name") String name,

                @Json(name = "image") String image,

                @Json(name = "releasedAt") String released,

                @Json(name = "sizing") String sizing,

                @Json(name = "initialPrice") Double initialPrice,

                @Json(name = "colorway") String colorway,
                @Json(name = "sku") String sku,

                @Json(name = "createdAt") String createdAt,

                @Json(name = "updatedAt") String updatedAt,

                @Json(name = "brand") Brand brandMap

        ){}

        public record Brand(
                @Json(name = "id") String brandID,
                @Json(name = "name") String brandName

        ){}

}
