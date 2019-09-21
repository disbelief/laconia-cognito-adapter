import CognitoAuthenticationRecord from './CognitoAuthenticationRecord';
import CognitoDefineAuthChallengeRecord from './CognitoDefineAuthChallengeRecord';
import CognitoCreateAuthChallengeRecord from './CognitoCreateAuthChallengeRecord';
import CognitoVerifyAuthChallengeResponseRecord from './CognitoVerifyAuthChallengeResponseRecord';
import CognitoPreTokenRecord from './CognitoPreTokenRecord';
import CognitoUserMigrationRecord from './CognitoUserMigrationRecord';
import CognitoCustomMessageRecord from './CognitoCustomMessageRecord';

/**
 * Trigger definitions are here:
 * https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html#cognito-user-identity-pools-working-with-aws-lambda-trigger-sources
 */

// Sign-up, confirmation, and sign-in (authentication) triggers:
export const PRE_SIGNUP_TRIGGER = 'PreSignUp_SignUp';
export const PRE_SIGNUP_ADMIN_TRIGGER = 'PreSignUp_AdminCreateUser';
export const POST_CONFIRMATION_SIGNUP_TRIGGER = 'PostConfirmation_ConfirmSignUp';
export const POST_CONFIRMATION_FORGOT_PASSWORD_TRIGGER = 'PostConfirmation_ConfirmForgotPassword';
export const PRE_AUTHENTICATION_TRIGGER = 'PreAuthentication_Authentication';
export const POST_AUTHENTICATION_TRIGGER = 'PostAuthentication_Authentication';

// Custom authentication challenge triggers:
export const DEFINE_AUTH_CHALLENGE_TRIGGER = 'DefineAuthChallenge_Authentication';
export const CREATE_AUTH_CHALLENGE_TRIGGER = 'CreateAuthChallenge_Authentication';
export const VERIFY_AUTH_CHALLENGE_RESPONSE_TRIGGER = 'VerifyAuthChallengeResponse_Authentication';

// Pre token generation triggers:
export const PRE_TOKEN_GENERATION_HOSTED_TRIGGER = 'TokenGeneration_HostedAuth';
export const PRE_TOKEN_GENERATION_AUTHENTICATION_TRIGGER = 'TokenGeneration_Authentication';
export const PRE_TOKEN_GENERATION_NEW_PASSWORD_CHALLENGE_TRIGGER =
  'TokenGeneration_NewPasswordChallenge';
export const PRE_TOKEN_GENERATION_AUTHENTICATION_DEVICE_TRIGGER =
  'TokenGeneration_AuthenticateDevice';
export const PRE_TOKEN_GENERATION_REFRESH_TRIGGER = 'TokenGeneration_RefreshTokens';

// User migration triggers:
export const USER_MIGRATION_AUTHENTICATION_TRIGGER = 'UserMigration_Authentication';
export const USER_MIGRATION_FORGOT_PASSWORD_TRIGGER = 'UserMigration_ForgotPassword';

// Custom message triggers:
export const CUSTOM_MESSAGE_SIGNUP_TRIGGER = 'CustomMessage_SignUp';
export const CUSTOM_MESSAGE_ADMIN_CREATE_TRIGGER = 'CustomMessage_AdminCreateUser';
export const CUSTOM_MESSAGE_RESEND_CODE_TRIGGER = 'CustomMessage_ResendCode';
export const CUSTOM_MESSAGE_FORGOT_PASSWORD_TRIGGER = 'CustomMessage_ForgotPassword';
export const CUSTOM_MESSAGE_UPDATE_USER_ATTRIBUTE_TRIGGER = 'CustomMessage_UpdateUserAttribute';
export const CUSTOM_MESSAGE_VERIFY_USER_ATTRIBUTE_TRIGGER = 'CustomMessage_VerifyUserAttribute';
export const CUSTOM_MESSAGE_AUTHENTICATION_TRIGGER = 'CustomMessage_Authentication';

export const GROUPED_TRIGGERS = {
  authentication: [
    PRE_SIGNUP_TRIGGER,
    PRE_SIGNUP_ADMIN_TRIGGER,
    POST_CONFIRMATION_SIGNUP_TRIGGER,
    POST_CONFIRMATION_FORGOT_PASSWORD_TRIGGER,
    PRE_AUTHENTICATION_TRIGGER,
    POST_AUTHENTICATION_TRIGGER
  ],

  custom_authentication: [
    DEFINE_AUTH_CHALLENGE_TRIGGER,
    CREATE_AUTH_CHALLENGE_TRIGGER,
    VERIFY_AUTH_CHALLENGE_RESPONSE_TRIGGER
  ],

  pre_token: [
    PRE_TOKEN_GENERATION_HOSTED_TRIGGER,
    PRE_TOKEN_GENERATION_AUTHENTICATION_TRIGGER,
    PRE_TOKEN_GENERATION_NEW_PASSWORD_CHALLENGE_TRIGGER,
    PRE_TOKEN_GENERATION_AUTHENTICATION_DEVICE_TRIGGER,
    PRE_TOKEN_GENERATION_REFRESH_TRIGGER
  ],

  user_migration: [USER_MIGRATION_AUTHENTICATION_TRIGGER, USER_MIGRATION_FORGOT_PASSWORD_TRIGGER],

  custom_message: [
    CUSTOM_MESSAGE_SIGNUP_TRIGGER,
    CUSTOM_MESSAGE_ADMIN_CREATE_TRIGGER,
    CUSTOM_MESSAGE_RESEND_CODE_TRIGGER,
    CUSTOM_MESSAGE_FORGOT_PASSWORD_TRIGGER,
    CUSTOM_MESSAGE_UPDATE_USER_ATTRIBUTE_TRIGGER,
    CUSTOM_MESSAGE_VERIFY_USER_ATTRIBUTE_TRIGGER,
    CUSTOM_MESSAGE_AUTHENTICATION_TRIGGER
  ]
};

const buildEventRecord = event => {
  if (GROUPED_TRIGGERS.authentication.indexOf(event.triggerSource) >= 0) {
    return CognitoAuthenticationRecord.fromRaw(event);
  }
  if (GROUPED_TRIGGERS.custom_authentication.indexOf(event.triggerSource) >= 0) {
    switch (event.triggerSource) {
      case DEFINE_AUTH_CHALLENGE_TRIGGER:
        return CognitoDefineAuthChallengeRecord.fromRaw(event);
      case CREATE_AUTH_CHALLENGE_TRIGGER:
        return CognitoCreateAuthChallengeRecord.fromRaw(event);
      case VERIFY_AUTH_CHALLENGE_RESPONSE_TRIGGER:
        return CognitoVerifyAuthChallengeResponseRecord.fromRaw(event);
      default:
        return null;
    }
  }
  if (GROUPED_TRIGGERS.pre_token.indexOf(event.triggerSource) >= 0) {
    return CognitoPreTokenRecord.fromRaw(event);
  }
  if (GROUPED_TRIGGERS.user_migration.indexOf(event.triggerSource) >= 0) {
    return CognitoUserMigrationRecord.fromRaw(event);
  }
  if (GROUPED_TRIGGERS.custom_message.indexOf(event.triggerSource) >= 0) {
    return CognitoCustomMessageRecord.fromRaw(event);
  }
  return null;
};

export default class CognitoEvent {
  constructor(rawEvent) {
    this.rawEvent = rawEvent;
    const {
      version,
      triggerSource,
      region,
      userPoolId,
      userName,
      callerContext,
      request,
      response
    } = rawEvent;
    this.version = version;
    this.triggerSource = triggerSource;
    this.region = region;
    this.userPoolId = userPoolId;
    this.userName = userName;
    this.callerContext = callerContext;
    this.request = request;
    this.response = response;
    this.record = buildEventRecord(rawEvent);
  }

  setResponse(attribs = {}) {
    this.response = { ...this.response, ...attribs };
    return this.response;
  }

  toResponse() {
    return {
      ...this.rawEvent,
      response: this.response
    };
  }

  static fromRaw(rawEvent) {
    return new CognitoEvent(rawEvent);
  }
}
