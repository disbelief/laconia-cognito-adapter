/* eslint-disable class-methods-use-this */
import CognitoEvent from './CognitoEvent';

export default class CognitoInputConverter {
  convert(rawEvent) {
    return CognitoEvent.fromRaw(rawEvent);
  }
}
