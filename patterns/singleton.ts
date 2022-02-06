/**
 * Singleton Design Pattern.
 * This pattern ensures that a class only has one instance throughout the
 * program and provides a method to get that instance.
 *
 * In this example we want to make a class for accessing application configuration
 * variables.
 * Assuming that this class loads whole variables from several distinct config
 * files on local file-system and remote server, this could be a heavy operation
 * and will slow down the application if the clients try to instantiate this
 * class every time they need the variables.
 * By applying Singleton pattern to this problem, we can load the config files
 * only once, cache them and then return same result for the later usages.
 *
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/singleton
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/singleton-design-pattern/XNrxX
 */

/**
 * Config, the Singleton class.
 * It should define a `getInstance` method to allow clients to access the instance.
 */
class Config {
  /**
   *  The instance object that `getInstance` method will return it.
   */
  private static instance: Config = null;

  /**
   * The application configuration variables that will be get and set only once.
   */
  private items: Object;

  /**
   * The singleton's constructor sould always be private to disallow direct
   * object construction with the `new` operator, outside the class.
   */
  private constructor() {
    this.items = {};
    const files = this.loadAllConfigFiles();

    for (const file in files) {
      this.items[file] = files[file];
    }
  }

  /**
   * The static `getInstance` method that creates the instance if it is not been
   * created yet and is the only way to access the instance.
   */
  public static getInstance() {
    if (this.instance === null) {
      this.instance = new Config();
    }

    return this.instance;
  }

  /**
   * Some business logics that we intend to execute them once.
   */
  private loadAllConfigFiles(): Object {
    /**
     * Suppose these variables are fetched from the server and file-system.
     */
    return {
      app_locale: 'en',
      db_host: '127.0.0.1',
      db_port: '3306',
    };
  }

  public get(key) {
    return this.items[key];
  }

  public set(key, value) {
    this.items[key] = value;
  }
}

/**
 * The Client code.
 * The only way the access the config variables is by using the `getInstance`
 * method.
 */
const config = Config.getInstance();
config.set('app_locale', 'fa');

// Accessing the variables somewhere else in the program.
const config2 = Config.getInstance();

// Checking whether the instances are the same:
console.log(config === config2); // true
