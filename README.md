# cs32 --> Sprint 5 **MAPS!**
## Contributors
Developed by Zeeshan Bhalwani (zbhalwan) & Sam Feldman (sfeldma8)

Total time: 20 hours

Github Repo: https://github.com/cs0320-s2023/sprint-5-sfeldma8-zbhalwan

Would like to acknowledge mke2, ipinedad, ksohn for their code which we took some inspiration from.

## Project Description
Added new data sources to our backend API server which allowed us to filter and query redlining data. Developed frontend that would allow for areas to be rendered on an interactive map. Areas could be filtered through bounds and highlighted through queries. Data api calls which the backend allowed for.


## Usage
Start up webapp using `npm start` or `npm run dev` and go to the link in the terminal to use the webapp. The webapp allows for the user to search for areas based on keyword and filter areas based on bounds. Enter desired minLat, maxLat, minLon, maxLon values. You can also enter a keyword. Zoom in and out of map using mouse or web browser's features. Sucessful searches will result in areas being highlighted and improper searches will lead to error messages being outputted. The user can also reset the map to the entire USA map and reset the highlighted areas based on keyword search. Shortcuts are detailed below to do so


## Backend
In the `src` package is `main` and `test`:


* `main` project entry point.
    * `server` includes server handling code for csv and weather
        * `handlers` contains boundary filtering and query by keyword handlers
            * `BoundaryHandler.java` allows for geo json data to be filtered based on 4 bounding coordinates. takes in a relative filepath of geoJSON data. If there are no errors, there we be a serialized success output with the resulting features within the requested boundary. Otherwise, exceptions will caught and serialized error messages will be outputted. 
            * `QueryHandler.java` handles searching for desired value in area description of the entire redlining data. checks if desired value exists and outputs features with the keyword.Otherwise, exceptions will caught and serialized error messages will be outputted.
        * `utilities` contains utilities used for handling api endpoints
            * `GeoUtils.java` stores data from GeoJSON
            * `Serialize.java` serialzies success and error API events
            * `Unserialize.java` unserializes JSON

* `test` and its subdirectories contains unit testing, fuzz testing, and testing with mocks. tests are self explanatory.
        * `TestBoundaryHandler.java` contains **fuzz tests** as well
        * `TestMockBoundary.java` utilizes mock geoJSON data
        * `TestQueryHandler.java`
        * `TestMockQuery.java` utilizes mock geoJSON data

### Data
There are two geoJSON files that are available to use through the following file paths:

* `data` package in the `backend directory` includes jsons.
    * `fullDownload.json` redlining data
    * `mockGEO.json` smaller mock dataset which can be used for mock testing

### API Endpoints
* `bounds`: returns filtered region. Accepts mandatory `minLat` `minLon` `maxLat` `maxLon` parameters
    * example: `http://localhost:3232/bounds?minLat=42.020223&maxLat=42.512096&minLon=-83.484421&maxLon=-82.297897`
* `query`: returns filtered area based on keyword. Accepts mandatory `keyword` parameter
    * example: `http://localhost:3232/query?keyword=detroit`

   

## Frontend

* `frontend` contains code for rendering map and overlaying desired redlined regions
  * `src` direcotry contains `geodata`, `components`, `utils`, `tests` directories and `App.tsx` and `overlays.ts`
    * `geodata` directory
      * `fullDownload.json` contains redlinign data
    * `components` directory contains components for bounds and query search
  * `tests` contains the DOM and integration testing for the webapp. tests are self explanatory.
    * `integration.dom.test.tsx` 
  * `utils` contains a getter for the api response error messages so that they can outputted on the webapp

  ### Shortcuts
  `ctrl + r` to reset the bounds to entire USA map
  `ctrl + o + p` to reset the highlighted areas based on keyword search
  `ctrl + d` to populate coordiantes with boundbox for detroit
  

## Errors and Bugs
There are many different errors returned by the API, so documenting them all would entail lot of time for the project. No bugs were indetified. The following errors are outputted in a user-friendly and understanding manner on our webapp. Generally, these errors are returned:
* `error_bad_request`: if the request was ill-formed or one of its fields was ill-formed.
* `error_datasource`: if the given data source wasn't accessible (e.g., the file didn't exist or the NWS API returned an error for a given location).
* `error_internal`: an unexpected system error, that ideally should be logged and returned to the developers to check upon.
* `error_bad_json`: if the request was ill-formed

## Running the Program
* cd into backend --> src --> main --> server and run `Server.java`
  * go to `localhost:3232` and utilize API endpoints and parameters detailed in the API section of README.
* cd into frontend and run first `npm install` and then `npm start` or `npm run dev`
* Run `Server.main()` and go to `localhost:3232` and utilize API endpoints and parameters detailed in the API section.
* Run the tests: `npm test` for frontend and `mvn test`
  * run the server before running integration tests

## Reflection
1. VSCode - ide that allows us to devleop clean frontend typescript code
2. TypeScript - allows us to develop frontend code
3. npm - allows us to complile, build, run, and test frontend code
4. mapbox-gl - render frontend map
5. HTML - allows us to organize webpages
6. RTL - allows us to test frontend
7. jest-dom - allows for testing frontend
8. Moshi - allows us to back and forth between jsons
9. Spark - allows us to create backend api server
10. JUnit - allows for testing backend
11. guava - allows for caching on the backend
12. Laptops/Computers - allows us to develop code