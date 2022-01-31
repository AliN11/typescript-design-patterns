/**
 * Abstract Factory Design Pattern.
 * This pattern lets us produce related objects that belong to a family, without
 * exposing their concrete classes to the client.
 * In this example, we are going to create an application that contains various
 * tech manufactures with various products. The client will create and interact
 * with products and isn't aware of which manufactorer it is working with. This
 * example is inspired by:
 * https://refactoring.guru/design-patterns/abstract-factory
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/abstract-factory-design-pattern/XbqOn
 */

/**
 * The Abstract Factory Interface.
 * In this interface we define the methods that return the abstract products of
 * a family.
 * In this example, a family is a manufacturer that produces various products.
 */
interface DeviceFactory {
  createSmartphone(): Smartphone;

  createTablet(): Tablet;
}

/**
 * Concrete Factory.
 * Concrete factories must implement the Abstract Factory interface. Each
 * factory produces various products that belong to the same family
 * (e.g. Apple Factory that produces its own products).
 */
class AppleFactory implements DeviceFactory {
  /**
   * The signature of each method is the abstract type of the product that is
   * returning by the method. It guarantees that the client will work with
   * products through abstraction.
   */
  public createSmartphone(): Smartphone {
    return new AppleSmartphone();
  }

  public createTablet(): Tablet {
    return new AppleTablet();
  }
}

/**
 * Another Concrete Factory. We can create an arbitrary amount of facotories.
 * The client will interact with factories through their interface and isn't
 * aware of which concrete factory is passed to it.
 */
class SamsungFactory implements DeviceFactory {
  public createSmartphone(): Smartphone {
    return new SamsungSmartphone();
  }

  public createTablet(): Tablet {
    return new SamsungTablet();
  }
}

/**
 * Products Interface.
 * We define an interface for each distinct product. All concrete products must
 * implement their related interface.
 * The below interface is for Tablets and must be implemented by the tablets in
 * each family.
 */
interface Tablet {
  /**
   * We define the operations that are common across all tablets
   */
  switchOn(): boolean;
}

/**
 * Another Product interface.
 * It includes the set of methods that are common between smartphones
 */
interface Smartphone {
  switchOn(): boolean;
  ring(): void;
}

/**
 * Concrete Products. Each concrete product implements its respective interface
 * and will be created within their respective concrete factories.
 * The below product is a Samsung smartphone and then will be created in
 * SamsungFactory factory.
 */
class SamsungSmartphone implements Smartphone {
  public switchOn(): boolean {
    console.log("Samsung Smartphone: Switching on");

    return true;
  }

  public ring() {
    console.log("Samsung Smartphone: Ringing");
  }
}

/**
 * Another concrete product. Apple Smartphones that will be created in the
 * AppleFactory factory
 */
class AppleSmartphone implements Smartphone {
  public switchOn(): boolean {
    console.log("Apple Smartphone: Switching on");

    return true;
  }

  public ring() {
    console.log("Apple Smartphone: Ringing");
  }
}

/**
 * Apple tablets that will be created in its respective factory
 */
class AppleTablet implements Tablet {
  public switchOn(): boolean {
    console.log("Apple Tablet: Switching on");

    return true;
  }
}

/**
 * And another product. We can create an arbitrary amount of products if their
 * interface exists and being used in their factories.
 */
class SamsungTablet implements Tablet {
  public switchOn(): boolean {
    console.log("Samsung Tablet: Switching on");

    return true;
  }
}

/**
 * The client.
 * The client code will work with factories and products only through abstraction.
 * This allows us to pass any kind of factories to the client and work with any
 * kind of products without breaking the client code.
 */
function client(factory: DeviceFactory) {
  // As we can see, the client isn't aware of which factory is working with
  const smartphone = factory.createSmartphone();
  smartphone.ring();

  const tablet = factory.createTablet();

  tablet.switchOn();
}

/**
 * The application and configurations will decide which concrete factory should
 * be passed to the client
 */
client(new SamsungFactory());

// Samsung Smartphone: Ringing
// Samsung Tablet: Switching on
