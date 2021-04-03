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

  getCodeChallenges() {
    return (this.session || []).filter(challenge => challenge.challengeName === 'CUSTOM_CHALLENGE');
  }

  isNewSession() {
    return this.getCodeChallenges().length === 0;
  }

  getPreviousCode() {
    const codeChallenges = this.getCodeChallenges();
    if (codeChallenges.length > 0) {
      const lastCodeChallenge = codeChallenges[codeChallenges.length - 1];
      return lastCodeChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
    }
    return null;
  }
}
