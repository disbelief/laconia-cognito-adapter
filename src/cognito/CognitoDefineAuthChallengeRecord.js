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

  // returns all challenges in the current session, optionally filtered by challenge type
  getChallenges(challengeName = undefined) {
    if (typeof this.session === 'undefined' || this.session === null) {
      return [];
    }
    if (typeof challengeName === 'undefined') {
      return this.session;
    }
    return this.session.reduce((challenges, obj) => {
      if (obj.challengeName === challengeName) {
        return [...challenges, obj];
      }
      challenges;
    }, []);
  }

  // has submitted a sucessful challenge resonse
  isChallengeSuccess(challengeName = 'CUSTOM_CHALLENGE') {
    const challenges = this.getChallenges(challengeName);
    const successful = challenges.find(({ challengeResult }) => challengeResult === true);
    return typeof successful !== 'undefined' && successful !== null;
  }

  // has taken at least one challenge without success
  isChallengeFailure(challengeName = undefined) {
    const challenges = this.getChallenges(challengeName);
    const successful = this.isChallengeSuccess(challengeName);
    return Boolean(challenges.length > 0 && successful);
  }
}
