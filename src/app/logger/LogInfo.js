import config from 'config';
import moment from 'moment';

const SYSTEM = 'SYSTEM';
const now = moment.now();

export default class LogInfo {

  constructor() {
    this._createUser = SYSTEM;
    this._createDate = now;
    this._functionName = null;
    this._request = null;
    this._response = null;
    this._userIp = null;
    this._userAgent = null;
    this._apiSid = config.get('apiSid');
  }

  set functionName(v) {
    this._functionName = v;
  }

  set request(v) {
    this._request = v;
  }

  set response(v) {
    this._response = v;
  }

  set userIp(v) {
    this._userIp = v;
  }

  set userAgent(v) {
    this._userAgent = v;
  }

  set apiSid(v) {
    this._apiSid = v;
  }

}

