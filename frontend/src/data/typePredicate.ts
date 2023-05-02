import { IProduct } from "./dataTypes";
export interface ServerErrorResponse {
    result: string;
    message: string;
  }
  
  /**
   * Type guard function for checking if given object is a ServerErrorResponse
   */
  export function isServerErrorResponse(
    rjson: any
  ): rjson is ServerErrorResponse {

    if (!("result" in rjson)) return false;
    if (!("message" in rjson)) return false;
    return true;
  }
  
  export interface ServerSuccessResponse {
    result: string;
    data: IProduct[];
  }
  
  
  export function isServerSuccessResponse(rjson: any): rjson is ServerSuccessResponse {
 //   if (!("result" in rjson)) return false;
    if (!("data" in rjson)) return false;
    return true;
  }