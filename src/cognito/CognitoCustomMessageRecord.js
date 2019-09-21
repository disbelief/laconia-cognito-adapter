import CognitoRecord from './CognitoRecord';

export default class CognitoCustomMessageRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);
    const {
      request: { userAttributes, codeParameter, usernameParameter },
      response: { smsMessage, emailMessage, emailSubject }
    } = cognitoEvent;

    this.userAttributes = userAttributes;
    this.codeParameter = codeParameter;
    this.usernameParameter = usernameParameter;
    this.smsMessage = smsMessage;
    this.emailMessage = emailMessage;
    this.emailSubject = emailSubject;
  }
}
