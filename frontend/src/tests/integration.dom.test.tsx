
import "@testing-library/jest-dom";
import { fireEvent, getByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

// import {jest} from '@jest/globals'
import "@testing-library/dom";
import "@testing-library/jest-dom";
import * as main from "../main";


import App from "../App";
import Boxes from "../components/BoundsInputBox";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import { keyboard } from "@testing-library/user-event/dist/keyboard";



/**
 * test that the app renders
 */
test("renders features", () => {
    render(<App />);
  expect(screen.getByRole("minLat")).toBeInTheDocument();
  expect(screen.getByRole("maxLat")).toBeInTheDocument();
  expect(screen.getByRole("minLon")).toBeInTheDocument();
  expect(screen.getByRole("maxLon")).toBeInTheDocument();
  expect(screen.getByRole("boundsbutton")).toBeInTheDocument();

  expect(screen.getByRole("keywordbox")).toBeInTheDocument();
  expect(screen.getByRole("querybutton")).toBeInTheDocument();
  expect(screen.getByRole("querymessage")).toBeInTheDocument();
  expect(screen.getByRole("boundsmessage")).toBeInTheDocument();

});

/**
 * test that the initial state is as expected
 */
test("initial state is as expected", () => {
    render(<App />);
    expect(screen.getByRole("minLat")).toHaveValue("-90");
    expect(screen.getByRole("maxLat")).toHaveValue("90");
    expect(screen.getByRole("minLon")).toHaveValue("-180");
    expect(screen.getByRole("maxLon")).toHaveValue("180");
    expect(screen.getByRole("keywordbox")).toHaveValue("");
  });



    /**
     * test reset shortcut
     */
  test("handleKeyDown resets boxState as expected when 'r' key is pressed", async () => {
    
    const { getByLabelText } = render(<Boxes setState={function (data: FeatureCollection<Geometry, GeoJsonProperties> | undefined): void {
        throw new Error("Function not implemented.");
    } } />);
    fireEvent.keyDown(window, { key: "r", code: "KeyR", ctrlKey: true });
    expect(getByLabelText("minimum latitude goes here")).toHaveValue("-90");
    expect(getByLabelText("maximum latitude goes here")).toHaveValue("90");
    expect(getByLabelText("minimum longitude goes here")).toHaveValue("-180");
    expect(getByLabelText("maximum longitude goes here")).toHaveValue("180");
    waitFor(() => expect(screen.findByText("Success! Check out the map!")).toBeInTheDocument());
    
  });


  /**
   * tests updating of input boxes
   */
    test("handleInputChange updates state correctly", () => {
        render(<App />);

        let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
        minLatBox.value = "";
        userEvent.click(minLatBox);
        userEvent.type(minLatBox, "-80");
        expect(screen.getByRole("minLat")).toHaveValue("-80");
  })



/**
 * test when string is passed into coordinates
 */
test("boundbox incorrect type of params",  () => {
    // const setState = jest.fn();
    render(<App />);
    

    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    minLatBox.value = ''
    maxLatBox.value = ''
    minLonBox.value = ''
    maxLonBox.value = ''
    
    userEvent.type(minLatBox, "dog");
    expect(screen.getByRole("minLat")).toHaveValue("dog");
    // userEvent.type(maxLatBox, "0");
    // userEvent.type(minLonBox, "0");
    // userEvent.type(maxLonBox, "0");
    userEvent.click(boundsButton);

    waitFor(() => expect(screen.findByText("Message: all of the 4 max/min lat/lon parameters are required and must be numbers")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  
  });

/**
 * test when no params are passed into coordinates
 */
  test("boundbox empty params",  () => {
    // const setState = jest.fn();
    render(<App />);
    

    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    minLatBox.value = ''
    maxLatBox.value = ''
    
    
    
    expect(screen.getByRole("minLat")).toHaveValue("");
    // userEvent.type(maxLatBox, "0");
    // userEvent.type(minLonBox, "0");
    // userEvent.type(maxLonBox, "0");
    userEvent.click(boundsButton);

    waitFor(() => expect(screen.findByText("Message: all of the 4 max/min lat/lon parameters are required and must be numbers")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  
  });

/**
 * test when params are out of bounds
 */
  test("boundbox out of bounds",  () => {
    // const setState = jest.fn();
    render(<App />);
    

    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    minLatBox.value = ''
    maxLatBox.value = ''
    minLonBox.value = ''
    maxLonBox.value = ''
    
    userEvent.type(minLatBox, "2000");
    expect(screen.getByRole("minLat")).toHaveValue("2000");
    userEvent.type(maxLatBox, "0");
    userEvent.type(minLonBox, "0");
    userEvent.type(maxLonBox, "0");
    userEvent.click(boundsButton);

    waitFor(() => expect(screen.findByText("Data is now out of bounds, please enter a latitude between -90 and 90, and a longitude"
    + " between -180 and 180.")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  
  });

    /**
     * test when params are missing
     */
  test("missing minLat",  () => {
    // const setState = jest.fn();
    render(<App />);
    

    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    minLatBox.value = ''
    maxLatBox.value = ''
    minLonBox.value = ''
    maxLonBox.value = ''
    
   
    
    userEvent.type(maxLatBox, "0");
    userEvent.type(minLonBox, "0");
    userEvent.type(maxLonBox, "0");
    userEvent.click(boundsButton);

    waitFor(() => expect(screen.findByText("at least one of the max/min lat/lon parameters is missing")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  
  });
  /**
   * tests successful bounds
   */
  test("successful bounds",  () => {
    // const setState = jest.fn();
    render(<App />);
    

    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    minLatBox.value = ''
    maxLatBox.value = ''
    minLonBox.value = ''
    maxLonBox.value = ''
    
   // detroit
    userEvent.type(minLatBox, "42.020223");
    userEvent.type(maxLatBox, "42.512096");
    userEvent.type(minLonBox, "-83.484421");
    userEvent.type(maxLonBox, "-82.297897");
    userEvent.click(boundsButton);

    waitFor(() => expect(screen.findByText("Success! Check out the map!")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  
  });

  // TESTING QUERY----------------------------------------------

  /**
   * test when no keyword is entered
   */
  test("empty keyword",  () => {
    // const setState = jest.fn();
    render(<App />);
    
    let keywordBox = screen.getByRole("keywordbox") as HTMLInputElement;
    
    let queryButton = screen.getByRole("querybutton");
    
    userEvent.click(queryButton);

    waitFor(() => expect(screen.findByText("no keyword was entered. please enter a keyword!")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  
  });

  /**
   * tests when keyword is wrong
   */
  test("wrong keyword",  () => {
    // const setState = jest.fn();
    render(<App />);
    
    let keywordBox = screen.getByRole("keywordbox") as HTMLInputElement;
    
    let queryButton = screen.getByRole("querybutton");
    userEvent.type(keywordBox, "zeeshanbhalwani");
    expect(screen.getByRole("keywordbox")).toHaveValue("zeeshanbhalwani");

    userEvent.click(queryButton);

    waitFor(() => expect(screen.findByText("no features match the keyword. try another keyword.")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();
  
  });

  /**
   * tests when multiple keywords are entered
   */
  test("multiple keywords",  () => {
    // const setState = jest.fn();
    render(<App />);
    
    let keywordBox = screen.getByRole("keywordbox") as HTMLInputElement;
    
    let queryButton = screen.getByRole("querybutton");
    userEvent.type(keywordBox, "detroit ohio");
    expect(screen.getByRole("keywordbox")).toHaveValue("detroit ohio");

    userEvent.click(queryButton);

    waitFor(() => expect(screen.findByText("only one keyword is allowed")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();
  
  });

  /**
   * tests when keyword is correct
   */
  test("correct keyword",  () => {
    // const setState = jest.fn();
    render(<App />);
    
    let keywordBox = screen.getByRole("keywordbox") as HTMLInputElement;
    
    let queryButton = screen.getByRole("querybutton");
    userEvent.type(keywordBox, "detroit");
    expect(screen.getByRole("keywordbox")).toHaveValue("detroit");

    userEvent.click(queryButton);
    
    waitFor(() => expect(screen.findByText("Message: Success! Check out the map!")).toBeInTheDocument());

    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

  });

    /**
     * tests when bounds and query endpoints are used together
     */
  test("multiple api endpoints",  () => {
    // const setState = jest.fn();
    render(<App />);
    
    
    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    minLatBox.value = ''
    maxLatBox.value = ''
    minLonBox.value = ''
    maxLonBox.value = ''
    
   // detroit
    userEvent.type(minLatBox, "42.020223");
    userEvent.type(maxLatBox, "42.512096");
    userEvent.type(minLonBox, "-83.484421");
    userEvent.type(maxLonBox, "-82.297897");
    userEvent.click(boundsButton);

    waitFor(() => expect(screen.findByText("Success! Check out the map!")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();
    
    let keywordBox = screen.getByRole("keywordbox") as HTMLInputElement;
    
    let queryButton = screen.getByRole("querybutton");
    userEvent.type(keywordBox, "detroit");
    expect(screen.getByRole("keywordbox")).toHaveValue("detroit");

    userEvent.click(queryButton);
    
    waitFor(() => expect(screen.findByText("Message: Success! Check out the map!")).toBeInTheDocument());

    const responseMessageElement2 = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement2).toBeInTheDocument();

  });



  test("keyword with 2 searches",  () => {
    // const setState = jest.fn();
    render(<App />);
    
    let keywordBox = screen.getByRole("keywordbox") as HTMLInputElement;
    
    let queryButton = screen.getByRole("querybutton");
    userEvent.type(keywordBox, "detroit");
    expect(screen.getByRole("keywordbox")).toHaveValue("detroit");

    userEvent.click(queryButton);
    
    waitFor(() => expect(screen.findByText("Message: Success! Check out the map!")).toBeInTheDocument());

    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

    keywordBox.value = ''
    userEvent.type(keywordBox, "ohio");
    expect(screen.getByRole("keywordbox")).toHaveValue("ohio");
    waitFor(() => expect(screen.findByText("Message: Success! Check out the map!")).toBeInTheDocument());
    const responseMessageElement2 = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement2).toBeInTheDocument();

  });



  test("2 successful bounds",  () => {
    // const setState = jest.fn();
    render(<App />);
    

    let minLatBox = screen.getByRole("minLat") as HTMLInputElement;
    let maxLatBox = screen.getByRole("maxLat") as HTMLInputElement;
    let minLonBox = screen.getByRole("minLon") as HTMLInputElement;
    let maxLonBox = screen.getByRole("maxLon") as HTMLInputElement;
    let boundsButton = screen.getByLabelText("submit bounds");
    userEvent.clear(minLatBox);
    userEvent.clear(maxLatBox);
    userEvent.clear(minLonBox);
    userEvent.clear(maxLonBox);
    
   // detroit
    userEvent.type(minLatBox, "42.020223");
    userEvent.type(maxLatBox, "42.512096");
    userEvent.type(minLonBox, "-83.484421");
    userEvent.type(maxLonBox, "-82.297897");
    userEvent.click(boundsButton);

    expect(screen.getByRole("minLat")).toHaveValue("42.020223");
    expect(screen.getByRole("maxLat")).toHaveValue("42.512096");
    expect(screen.getByRole("minLon")).toHaveValue("-83.484421");
    expect(screen.getByRole("maxLon")).toHaveValue("-82.297897");
    waitFor(() => expect(screen.findByText("Success! Check out the map!")).toBeInTheDocument());
    const responseMessageElement = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement).toBeInTheDocument();

    userEvent.clear(minLatBox);
    userEvent.clear(maxLatBox);
    userEvent.clear(minLonBox);
    userEvent.clear(maxLonBox);
    
   // entire usa
    userEvent.type(minLatBox, "-90");
    userEvent.type(maxLatBox, "90");
    userEvent.type(minLonBox, "-180");
    userEvent.type(maxLonBox, "180");
    userEvent.click(boundsButton);



    expect(screen.getByRole("minLat")).toHaveValue("-90");
    expect(screen.getByRole("maxLat")).toHaveValue("90");
    expect(screen.getByRole("minLon")).toHaveValue("-180");
    expect(screen.getByRole("maxLon")).toHaveValue("180");
    waitFor(() => expect(screen.findByText("Success! Check out the map!")).toBeInTheDocument());
    const responseMessageElement2 = document.querySelector('[role="boundsmessage"].response-message') as HTMLElement;
    expect(responseMessageElement2).toBeInTheDocument();

  
  });














