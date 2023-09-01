export enum APP_CONFIG_KEY {}

export const APP_SERVICE_IDENTIFIER = {
  ConfigFileWatcherService: Symbol.for('ConfigFileWatcherService'),
  SecretFileWatcherService: Symbol.for('SecretFileWatcherService'),
  TensorFlowValidateService: Symbol.for('TensorFlowValidateService'),
};
