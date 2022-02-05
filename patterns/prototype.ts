/**
 * Prototype Design Pattern.
 * This pattern allows us to copy (clone) an object without depending their classes.
 * This is useful for when instantiating an object constructing it is costly or real
 * object's class is unknown to us.
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/prototype
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/prototype-design-pattern/X8dLX
 */

/**
 * Prototype Interface
 * We make an interface for cloneable objects. If a class implement this interface,
 * it means its objects can be cloned.
 */
interface Prototype<T> {
  /**
   * clone method should return an object with the same type
   */
  clone(): T;
}

/**
 * Concrete Cloneable Classes
 */
class Book implements Prototype<Book> {
  private title;
  private price;
  private content = null;

  constructor(title, price, content = null) {
    this.title = title;
    this.price = price;

    /**
     * When constructing an object for the first time, the book content is not
     * available and should be fetched from the database. We've added an ability
     * to provide the previous fetched content when cloning the object in order
     * to reduce resources' usage and increase the application speed.
     */
    this.content = content !== null ? content : this.fetchContentFromDb();
  }

  /**
   * clone method in concrete classes usually works with the current object,
   * may customize and re-configure its properties and then return it.
   */
  public clone(): Book {
    const content = this.content + ' (cached)';

    // The previous content get passed here
    return new Book(this.title, this.price, content);
  }

  public fetchContentFromDb() {
    // const content = db.books.where('title', title).find().content;
    const content = "The book content";

    return content;
  }

  public getContent() {
    return this.content;
  }
}

// The initial object
const original = new Book('Funny JS', 36);

// Cloning the object
const cloned = original.clone();

console.log(original.getContent()); // The book content
console.log(cloned.getContent());   // The book content (cached)

  
