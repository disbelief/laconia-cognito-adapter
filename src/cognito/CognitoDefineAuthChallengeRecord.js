import CognitoRecord from './CognitoRecord';

export default class CognitoDefineAuthChallengeRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);
    const {
      request: { userAttributes, session },
      response: { challengeName, issueTokens, failAuthentication }
    } = cognitoEvent;

    this.userAttributes = userAttributes;
    this.session = session;
    this.challengeName = challengeName;
    this.issueTokens = issueTokens;
    this.failAuthentication = failAuthentication;
  }

  isChallengeFailure() {
    return (
      this.session &&
      this.session.length >= 3 &&
      this.session.slice(-1)[0].challengeResult === false
    );
  }

  isChallengeSuccess() {
    return (
      this.session && this.session.length && this.session.slice(-1)[0].challengeResult === true
    );
  }
}
