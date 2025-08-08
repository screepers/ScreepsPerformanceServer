export default class GeneralHelper {
  /**
   * sleep method
   *
   * Helper method to sleep for amount of seconds.
   * @param {number} seconds Amount of seconds to sleep
   * @return {object}
   */
  static async sleep(seconds) {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}
