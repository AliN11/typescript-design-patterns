/**
 * Facade Design Pattern
 * This pattern provides a simplified interface to a complex system.
 * This pattern is useful for when a library or a class has some complexities
 * in order to be uses. Facade pattern hides those complexities in itself and
 * provides an interface to use that library or class.
 * In this example we want to simplify using a sms library by using Facade pattern.
 *
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/facade
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/facade-design-pattern/nx765
 */


/**
 * Facade Class
 * Facade class constructs the desired object within itself and provides a simple
 * interface for the client to use that object. Facade also manages the lifecycle
 * of the object.
 * 
 */
class SmsFacade {
  /**
   * The send method only takes the required arguments from the client.
   * The complexities of initializing and constructing the SMS library are never
   * exposed to the client.
   */
  public static send(text, recipient) {
    const client_id     = config('sms.client_id');
    const client_secret = config('sms.client_secret');
    const sms_driver    = config('sms.driver');
    
    const sms = new SmsLibrary(client_id, client_secret, sms_driver);
    
    sms.recipient(recipient);
    sms.send(text);
  }
}

/**
 * To send SMS, client code uses the interface that Facade pattern provided.
 * As we can see, the client is not aware of what is happening behind the scenes
 */ 
SmsFacade.send('Welcome!', '+989...');
// ...
SmsFacade.send('Your 2FA code', '+001...');
