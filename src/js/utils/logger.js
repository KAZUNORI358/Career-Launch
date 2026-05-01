const PREFIX = '[StaticSite]';

export function log(message) {
  console.log(`${PREFIX} ${message}`);
}

export function warn(message) {
  console.warn(`${PREFIX} ${message}`);
}

export function info(message) {
  console.info(`${PREFIX} ${message}`);
}
