import CognitoRecord from './CognitoRecord';

export default class CognitoUserMigrationRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);
    const {
      request: { password },
      response: {
        userAttributes,
        finalUserStatus,
        messageAction,
        desiredDeliveryMediums,
        forceAliasCreation
      }
    } = cognitoEvent;

    this.password = password;
    this.userAttributes = userAttributes;
    this.finalUserStatus = finalUserStatus;
    this.messageAction = messageAction;
    this.desiredDeliveryMediums = desiredDeliveryMediums;
    this.forceAliasCreation = forceAliasCreation;
  }
}
