/**
 * Injector class for dependency management.
 */
export default class Injector {
  private dependencies: Map<any, any> = new Map();

  /**
   * @desc Method for dependency registration.
   *
   * @param {*} key - Unique dependency name.
   * @param {*} value - Dependency instance.
   * @throws {TypeError} if dependency with such key is already exist.
   * @returns {boolean} true if dependency successfully registered.
   */
  register(key: any, value: any) {
    if (this.dependencies.has(key)) {
      throw new TypeError(`[Injector] Injectable "${key}" has already registered`);
    }

    this.dependencies.set(key, value);

    return true;
  }

  /**
   * @desc Method for dependency deregister.
   *
   * @param {*} key - Unique dependency name.
   * @throws {ReferenceError} if dependency with such key is not exist.
   * @returns {boolean} true if dependency successfully deregistered.
   */
  deregister(key: any) {
    if (!this.dependencies.has(key)) {
      throw new ReferenceError(`[Injector] Injectable "${key}" has never been configured`);
    }

    return this.dependencies.delete(key);
  }

  /**
   * Method for verification whether a dependency with the specified key exists or not.
   *
   * @param {*} key - Unique dependency name.
   * @returns {boolean}
   */
  has(key: any) {
    return this.dependencies.has(key);
  }

  /**
   * Method for retrieving a dependency.
   *
   * @param {*} key - Unique dependency name.
   * @throws {ReferenceError} if dependency with such key is not exist.
   * @returns {any}
   */
  resolve(key: any) {
    if (!this.dependencies.has(key)) {
      throw new ReferenceError(`[Injector] Injectable "${key}" has never been configured`);
    }

    return this.dependencies.get(key);
  }
}
