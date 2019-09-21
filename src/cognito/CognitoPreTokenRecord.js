import CognitoRecord from './CognitoRecord';

export default class CognitoPreTokenRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);
    const {
      request: {
        userAttributes,
        groupConfiguration,
        groupsToOverride,
        iamRolesToOverride,
        preferredRole
      },
      response: { claimsOverrideDetails }
    } = cognitoEvent;

    this.userAttributes = userAttributes;
    this.groupConfiguration = groupConfiguration;
    this.groupsToOverride = groupsToOverride;
    this.iamRolesToOverride = iamRolesToOverride;
    this.preferredRole = preferredRole;

    this.claimsOverrideDetails = claimsOverrideDetails;
  }
}
