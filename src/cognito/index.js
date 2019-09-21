import CognitoEventAdapter from './CognitoEventAdapter';
import CognitoInputConverter from './CognitoInputConverter';

const cognito = app => new CognitoEventAdapter(app, new CognitoInputConverter()).toFunction();

export default cognito;
