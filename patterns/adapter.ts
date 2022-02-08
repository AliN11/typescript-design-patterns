/**
 * Adapter Design Pattern.
 *
 * This pattern allows objects with incompatible interfaces to work together
 * without modifying their source code.
 *
 * In this example, clients want to send notifications to users with various
 * services (e.g. SMS, Email, push). Each service has its own implementations.
 * So the client code would be tightly coupled with the services and their
 * implementation steps.
 * Adapter pattern provides a unified interface. Each service should be wrapped
 * into a distinct class that implements that interface. The client works with
 * the services only through Adapter interface.
 *
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/adapter
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/adapter-design-pattern/JmRx5
 */

/**
 * Adapter Interface.
 * This interface defines a method that will be used by the client in order to
 * work with the service.
 */
interface Notification {
  send(): void;
}

/**
 * An External Service (Adaptee)
 * This service lets us send notifications to users via SMS. But its interface
 * is not compatible with the client code. In many cases modifying external
 * libraries is not possible. We might be able to change client code but what if
 * client code wants to work with another service? It is always prone to change.
 */
class XYZ_SMS {
  login() {}
  setPort() {}
  sendSms() {
    console.log('Sending SMS');
  }
}

/**
 * Concrete Adapter.
 * An Adapter for an external library. This class implements Adapter interface
 * and then must implement required methods.
 * Concrete adapters should wrap external services. Instead of the client, usually
 * adapters directly work with service. An instance of this class will be passed
 * to the client and the client will work with the service through its interface.
 */
class XyzSmsAdapter implements Notification {
  private service: XYZ_SMS;

  // Adapter wraps the service
  constructor(service: XYZ_SMS) {
    this.service = service;
  }

  // Adapter directly works with the service
  public send() {
    this.service.login();
    this.service.setPort();
    this.service.sendSms();
  }
}

// Another Adapter
class EmailNotification implements Notification {
  public send() {
    console.log('Sending Email');
  }
}


/**
 * Client Code.
 *
 * The client works with the services through the Adapter interface.
 * The client is able to work with any services as long as the service is an
 * implementation of Adapter interface.
 */
function notifyUsers(notifier: Notification) {
  notifier.send();
}

// We first instantiate our desired adapter and then pass it to the client.
// Notify with SMS:
const SmsNotifier = new XyzSmsAdapter(new XYZ_SMS);
notifyUsers(SmsNotifier);

// Notify with email:
const emailNotifier = new EmailNotification();
notifyUsers(emailNotifier);
