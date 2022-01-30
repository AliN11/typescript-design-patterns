/**
 * Factory Method Design Pattern.
 * By this pattern, we can move the object constructions to a separate, special
 * methods named Factory Methods. The factory method is responsible for constructing
 * and delivering desired objects.
 *
 * In this example, we are going to create a delivery app with various delivery
 * methods. This example is inspired by:
 * https://refactoring.guru/design-patterns/factory-method
 */

/**
 * Creator Class.
 * The Creator class contains the factory method (in this case: makeVehicle()).
 * Its factory method returns an object of a product (Bike, Car, ...).
 * The Creator is usually an abstract class and its subclasses are supposed to
 * provide the implementation of its factory method.
 */
abstract class Delivery {
  public abstract makeVehicle(): Vehicle;

  public handle(): void {
    // Calling the factory method to get the product
    const vehicle = this.makeVehicle();

    // Finally, working with the product
    vehicle.move();
  }
}

/**
 * Concrete Creator.
 * Concrete Creators are supposed to override the factory method and return
 * their own configured product.
 */
class BikeDelivery extends Delivery {
  /**
   * The factory method implementation.
   * Creation and configuration of the concrete product happens here.
   * The factory method's return type is the abstract product. It ensures the
   * Creator to be independent of concrete products.
   */
  public makeVehicle(): Vehicle {
    const bike = new Bike();
    bike.setMode('eco');

    return bike;
  }
}

/**
 * Another Concrete Creator.
 * We usually make a concrete creator for every
 * concrete product.
 */
class CarDelivery extends Delivery {
  public makeVehicle(): Vehicle {
    const car = new Car();
    car.setColor('green');

    return car;
  }
}

/**
 * Products Interface.
 * Interface for concrete products.
 * Products Interface contains the operations that concrete products
 * (Bike, Car, Train, ...) must implement.
 */
 interface Vehicle {
  setMode(mode: String): void;
  move(): void;
}

/**
 * Concrete Product.
 * Concrete products, in their own way, must provide the implementation of the
 * Product Interface.
 */
class Bike implements Vehicle {
  setMode(mode: String): void {
    // this.mode = mode;
  }

  move(): void {
    console.log('Delivering by bike');
  };
}

/**
 * Another Concrete Product that in its own way, implements the Product
 * Interface.
 */
class Car implements Vehicle {
  setMode(mode: String): void {
    // this.mode = mode;
  }

  move(): void {
    console.log('Delivering by car');
  }

  setColor(color: String): void {

  }
}

/**
 * Client code.
 * The client works with the concrete creators through their interface.
 * By that, we can pass any creator without client caring about which concrete
 * creator is working with.
 */
function client(delivery: Delivery) {
  delivery.handle();
}

// Delivery by car
client(new CarDelivery());

// Delivery by bike
client(new BikeDelivery());
