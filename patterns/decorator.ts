/**
 * Decorator Design Pattern
 *
 * This pattern allows us to attach new behaviors to an existing object
 * at run-time without changing their classes and relying on sub-classing. Each
 * behavior is defined in a distinct class called decorator and will wrap the
 * intended object to add the behavior to that.
 *
 * In this example we have a hotel and rooms with basic specifications. We want
 * to add behaviors to rooms on demand.
 *
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/decorator
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/decorator-design-pattern/5dPv5
 */

/**
 * Base Component Interface
 * This interface defines the operations that are common to both the intended
 * object and the decorators (behaviors).
 */
interface RoomInterface {
  getDescription(): string;
  getPrice(): number;
}

/**
 * Concrete Component (The object to be decorated)
 * The Concrete Components should implement the Base Component interface in order
 * for the instances to be compatible with decorators.
 * Here we have a simple room, but we can also have more variations.
 */
class SimpleRoom implements RoomInterface {
  getDescription() {
    return "Base room";
  }

  getPrice() {
    return 2.0;
  }
}

/**
 * Base Decorator Class
 * This class follows the same Interface as the other components. By doing this,
 * the Concrete Components and the decorators are compatible with each other and
 * then we are able to wrap the concrete components and the decorators into
 * each other.
 */
abstract class BaseDecorator implements RoomInterface {
  /**
   * To implement wrapping feature, we define a field for storing wrapping
   * components.
   */
  protected room: RoomInterface;

  constructor(room: RoomInterface) {
    this.room = room;
  }

  /**
   * The Decorator delegates all works to the wrapped component.
   */
  public getDescription() {
    return this.room.getDescription();
  }

  public getPrice() {
    return this.room.getPrice();
  }
}

/**
 * Concrete Decorators.
 * Each Decorator extends the Base Decorator class, defines and adds the desired
 * behaviors to the decorated object.
 */
class WiFiDecorator extends BaseDecorator {
  public getDescription() {
    return `${super.getDescription()} + WiFi`;
  }

  public getPrice() {
    return super.getPrice() + 0.2;
  }
}

/**
 * Another Concrete Decorator: Adds "breakfast" behaviors to the component (room)
 */
class BreakfastDecorator extends BaseDecorator {
  public getDescription() {
    return `${super.getDescription()} + Breakfast`;
  }

  public getPrice() {
    return super.getPrice() + 2.00;
  }
}

/**
 * Client
 * The client works with all objects via Base Interface. This guarantees that
 * the client is able to work with simple components or decorated versions of
 * them.
 */
function client(room: RoomInterface) {
  console.log(room.getDescription());
  console.log(room.getPrice());
}

// Creating a simple component
let room = new SimpleRoom();
// Wrapping the component into a decorator to add the Wi-Fi behavior
room = new WiFiDecorator(room);
// Wrap decorated component into another decorator
room = new BreakfastDecorator(room);

client(room);

