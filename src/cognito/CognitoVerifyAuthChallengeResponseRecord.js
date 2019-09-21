import CognitoRecord from './CognitoRecord';

export default class CognitoVerifyAuthChallengeResponseRecord extends CognitoRecord {
  constructor(cognitoEvent) {
    super(cognitoEvent);
    const {
      request: { userAttributes, privateChallengeParameters, challengeAnswer },
      response: { answerCorrect }
    } = cognitoEvent;

    this.userAttributes = userAttributes;
    this.privateChallengeParameters = privateChallengeParameters;
    this.challengeAnswer = challengeAnswer;
    this.answerCorrect = answerCorrect;
  }

  isCorrectAnswer() {
    if (!this.privateChallengeParameters || !this.privateChallengeParameters.secretLoginCode) {
      return false;
    }
    const expectedAnswer = this.privateChallengeParameters.secretLoginCode;
    return this.challengeAnswer === expectedAnswer;
  }
}
