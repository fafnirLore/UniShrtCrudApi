import { isEmpty } from 'lodash';
import axios from 'axios';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

export const addStandardParameters = (
  payload: any,
  item: any,
  fromService?: boolean,
): any => {
  if (item instanceof Object) {
    for (const key in item) {
      if (Array.isArray(item[key])) {
        addStandardParameters(payload, item[key]);
      } else if (item[key] instanceof Object) {
        item[key] = addStandardParameters(payload, item[key]);
      }
    }
  }
  if (!fromService) {
    item = {
      ...item,
      dmlUserId: payload.currentUserId,
      dmlUsername: payload.username,
      dmlActivatedRoleTitle: payload.activatedRoleTitle,
      dmlActivatedRoleId: payload.activatedRoleId,
    };
    //console.log(item);
  } else {
    // when we call function from service level and it will auto insert metadata in payload

    item = {
      ...item,
      dmlUserId: payload.dmlUserId,
      dmlUsername: payload.dmlUsername,
      dmlActivatedRoleTitle: payload.dmlActivatedRoleTitle,
      dmlActivatedRoleId: payload.dmlActivatedRoleId,
    };
  }
  return item;
};

export const addStandardParametersForExternalApi = (
  payload: any,
  item: any,
): any => {
  item = {
    ...item,
    project_id: payload.currentProjectId,
    user_id: payload.currentUserId,
    user_name: payload.username,
  };
  return item;
};

export const addStandardParametersWithMetaAllData = (
  payload: any,
  item: any,
): any => {
  item = {
    ...item,
    project_id: payload.current_project_id,
    user_id: payload.current_user_id,
    user_name: payload.username,
    activated_role_id: payload.activated_role_id,
    client_id: payload.client_id,
    version_id: payload.version_id,
    sub_project_id: payload.sub_project_id,
  };
  return item;
};

export const addStandardParametersWithMetaAllDataTesting = (
  payload: any,
  item: any,
): any => {
  item = {
    data: { ...item },
    project_id: payload.current_project_id,
    user_id: payload.current_user_id,
  };
  return item;
};

export const addStandardParametersForAdd = (
  payload: any,
  document: any,
): any => {
  document = {
    ...document,
    username: payload.username,
    role_title: payload.activated_role_title,
    role_id: payload.activated_role_id,
  };
  return document;
};

export const addStandardParametersWithoutArray = (payload: any): any => {
  return {
    ...payload.data,
    projectId: payload.current_project_id,
    userId: payload.current_user_id,
  };
};

export const formatDate = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const date = dayjs().utcOffset(5).get('date');
  const month = dayjs().utcOffset(5).get('month') + 1;
  const year = dayjs().utcOffset(5).get('year');
  const hours = dayjs().utcOffset(5).get('hour');
  const minutes = dayjs().utcOffset(5).get('minute');
  const seconds = dayjs().utcOffset(5).get('second');

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

export const getSelectedDateFormat = () => {
  const dateOb = new Date();

  const date = ('0' + dateOb.getDate()).slice(-2);
  const month = ('0' + (dateOb.getMonth() + 1)).slice(-2);
  const year = dateOb.getFullYear();
  const hours = dateOb.getHours();
  const minutes = dateOb.getMinutes();
  const seconds = dateOb.getSeconds();
  const day = dateOb.getDay();
  const miliseconds = dateOb.getMilliseconds();

  return { year, month, date, hours, minutes, seconds, day, miliseconds };
};
