import CognitoRecord from './CognitoRecord';

export default class CognitoAuthenticationRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);
    const {
      request: { userAttributes, validationData, newDeviceUsed },
      response: { autoConfirmUser, autoVerifyEmail, autoVerifyPhone }
    } = cognitoEvent;

    this.userAttributes = userAttributes;
    this.validationData = validationData;
    this.newDeviceUsed = newDeviceUsed;
    this.autoConfirmUser = autoConfirmUser;
    this.autoVerifyEmail = autoVerifyEmail;
    this.autoVerifyPhone = autoVerifyPhone;
  }
}
