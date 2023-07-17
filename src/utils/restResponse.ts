import {
  API_NO_CONTENT_MESSAGE,
  API_SUCCESS_MESSAGE,
  ERROR_STATUS,
  FORBIDDEN_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  METHOD_NOT_ALLOWED_STATUS,
  NO_CONTENT_STATUS,
  NOT_FOUND_STATUS,
  REQUEST_TIMEOUT_STATUS,
  SERVICE_UNAVAILABLE_STATUS,
  SUCCESS_STATUS,
  UNAUTHORIZED_STATUS,
} from './constants';
import { ResponseModel } from './responseModel';

export class RestResponse {
  static success = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: API_SUCCESS_MESSAGE,
      statusCode: SUCCESS_STATUS,
      data: dataList,
    };
  };

  static noContent = (dataList: any, doc: string): ResponseModel => {
    if (dataList == null) {
      dataList = [];
    }
    dataList.push('');

    return {
      documentation: doc,
      message: API_NO_CONTENT_MESSAGE,
      statusCode: NO_CONTENT_STATUS,
      data: dataList,
    };
  };

  static error = (dataList: any, doc: string, e: any): ResponseModel => {
    return {
      documentation: doc,
      message: e.reason.message?.message
        ? e.reason.message.message
        : e.reason.message,
      statusCode: e.reason.message?.status
        ? e.reason.message.status
        : e.reason.statusCode,
      data: dataList,
    };
  };

  static unauthorized = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: UNAUTHORIZED_STATUS,
      data: dataList,
    };
  };

  static forbidden = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: FORBIDDEN_STATUS,
      data: dataList,
    };
  };

  static notFound = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: NOT_FOUND_STATUS,
      data: dataList,
      timeStamp: '',
    };
  };

  static methodNotAllowed = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: METHOD_NOT_ALLOWED_STATUS,
      data: dataList,
      timeStamp: '',
    };
  };

  static requestTimeout = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: REQUEST_TIMEOUT_STATUS,
      data: dataList,
      timeStamp: '',
    };
  };

  static internalServer = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: INTERNAL_SERVER_ERROR_STATUS,
      data: dataList,
      timeStamp: '',
    };
  };

  static serviceUnavailable = (dataList: any, doc: string): ResponseModel => {
    return {
      documentation: doc,
      message: 'ERROR',
      statusCode: SERVICE_UNAVAILABLE_STATUS,
      data: dataList,
      timeStamp: '',
    };
  };
}
