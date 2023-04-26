# cs32 --> Term Project
## Contributors
Developed by Zeeshan Bhalwani (zbhalwan) & Kyle Sohn (ksohn3) & Safae Merigh (smerigh) & Omer Chaudhry (mchaud11)

Total time this week: 10 hours 

Github Repo: https://github.com/cs0320-s2023/commerce-project.git


## Project Description
See Term Project Specifications

## Backend
In the `src` package is `main` and `test`:
* `main` project entry point.
    * `server` includes server handling code 
        * `handlers` 
           
* `test` and its subdirectories contains unit testing, fuzz testing, and testing with mocks. 

### API Endpoints
* will use:  https://rapidapi.com/letscrape-6bRBa3QguO5/api/real-time-product-search/ 

## Frontend
* `frontend` contains code for rendering the website

  * `src` directory contains `data`, `components`, , `tests` directories and `App.tsx`

  * `data` directory contains mock data 
    * _getProductList.ts_ : provides a list of the different sneakers
    * _getprices.ts_ : provides a list of the different sneakers´ prices, vendors, and images

  * `components` directory contains components for SearchBar, ProductDescription, SearchResults
    * _SearchBar.ts_: where the user can type the product he is looking for. A Dropdown menu appears, from which the user can select one product (will extent it to being able to retrieve several ones).
    * _ProductDescription.ts_: after a user selects a product, its description appeats below the SearchBar. Description includes an image of the product and its name.
    * _SearchResults.ts_ : shows all the vendors selling the selected product 

  * `tests` directory contains tests for the forntend 
    * _dom.test.tsx_: contains the DOM and integration testing for the webapp.


## Errors and Bugs - todo
No bugs were indentified. The following errors are outputted in a user-friendly and understanding manner on our webapp. Generally, these errors are returned:
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
