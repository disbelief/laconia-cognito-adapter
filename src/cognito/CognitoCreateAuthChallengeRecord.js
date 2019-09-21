import CognitoRecord from './CognitoRecord';

export default class CognitoCreateAuthChallengeRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);

    const {
      request: { userAttributes, session, challengeName },
      response: { publicChallengeParameters, privateChallengeParameters, challengeMetadata }
    } = cognitoEvent;

    this.userAttributes = userAttributes;
    this.session = session;
    this.challengeName = challengeName;
    this.publicChallengeParameters = publicChallengeParameters;
    this.privateChallengeParameters = privateChallengeParameters;
    this.challengeMetadata = challengeMetadata;
  }

  isNewSession() {
    return !this.session || !this.session.length;
  }

  getPreviousCode() {
    const previousChallenge = this.session.slice(-1)[0];
    return previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
  }
}
