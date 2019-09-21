export default class CognitoRecord {
  constructor({ request, response }) {
    const { userAttributes } = request;
    this.userAttributes = userAttributes;
    this.cognitoId = this.userAttributes.sub;
    this.response = response;
  }

  static fromRaw(cognitoEvent) {
    return new this(cognitoEvent);
  }
}
