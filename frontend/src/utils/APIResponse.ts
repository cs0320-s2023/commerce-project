export interface APIResponse {
    result: string;
    data: string;
    message: string;
  }

  export function isSuccessResponse(rjson: any): rjson is APIResponse {
    if (!("result" in rjson)) return false;
    if (!("data" in rjson)) return false;
    return true;
  }

  export function isErrorResponse(rjson: any): rjson is APIResponse {
    if (!("result" in rjson)) return false;
    if (!("message" in rjson)) return false;
    return true;
  }