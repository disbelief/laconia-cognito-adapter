import EventAdapter from '../EventAdapter';

export default class CognitoEventAdapter extends EventAdapter {
  async handle(rawEvent, laconiaContext) {
    // eslint-disable-next-line no-param-reassign
    laconiaContext.context.callbackWaitsForEmptyEventLoop = false;
    return super.handle(rawEvent, laconiaContext);
  }
}
