/**
 * Composite Design Pattern.
 *
 * This pattern allows us to compose different objects into a tree structure
 * and then treat the objects uniformly. In other words, we can treat a group of
 * object the same way as a single object.
 *
 * In this example, we are going to build a tree of employees in an organization.
 * An organization may contain many departments and the departments may contain
 * other departments and also employees. By using this pattern we want to get the
 * information and revenue of whole organization (departments + employees).
 *
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/composite
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/composite-design-pattern/5v695
 */


/**
 * The Component Interface.
 * This interface describes operations that make sense in both simple and complex
 * components in the tree.
 * This
 */
abstract class Organ {
  abstract getInformation(): string;
  abstract getRevenue(): number;

  /**
   * Methods to add or remove other components. Compound components should override
   * these methods.
   */
   public add(organ: Organ): void { }

   public remove(organ: Organ): void { }
}


/**
 * A simple component. Also called "Leaf".
 * A leaf is located at the end of tree and doesn't have any sub-components.
 * Usually all the demanded works are delegated to the leaves. In other words,
 * in a tree, a leaf does the actuall job. Compound components usually delegate
 * the request to their sub-components and finally sum-up the result.
 */
class SimpleOrgan extends Organ {
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  public getInformation() {
    return `- My name is ${this.name}\n`;
  }

  public getRevenue() {
    return Math.floor(Math.random() * 10000) + 1000;
  }
}

/**
 * A compound component. Also called "Container".
 * As its name implies, a cotainer includes other components. A container may
 * contain another containers or a simple leaf.
 */
class CompoundOrgan extends Organ {
  public children: Organ[] = [];
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }

  /**
   * A container collects data from current component and its sub-components.
   */
  public getInformation() {
    let output = `- This is ${this.name} organ.`;
    output += ` It contains ${this.children.length} members \n`;

    this.children.forEach(organ => {
      output += organ.getInformation();
    });

    return output;
  }

  /**
   * Getting revenue from sub-components (sub-containers and leaves)
   */
  getRevenue(): number {
    let output = 0;

    this.children.forEach(organ => {
      output += organ.getRevenue();
    });

    return output;
  }

  public add(organ: Organ): void {
    this.children.push(organ);
  }

  public remove(organ: Organ): void {
    const index = this.children.indexOf(organ);
    this.children.splice(index, 1);
  }
}


// Constructing the Organization tree.
const organization = new CompoundOrgan('Main');
organization.add(new SimpleOrgan('Alex as Founder'));
organization.add(new SimpleOrgan('Morgan as HR'));

const officers = new CompoundOrgan('Officers');
officers.add(new SimpleOrgan('John as CEO'));
officers.add(new SimpleOrgan('John as CTO'));
organization.add(officers);

const employees = new CompoundOrgan('Employees');
const it = new CompoundOrgan('IT');
const designers = new CompoundOrgan('Desingers');
designers.add(new SimpleOrgan('Sarah as Desinger'));
designers.add(new SimpleOrgan('John as Desinger'));
designers.add(new SimpleOrgan('Emily as Desinger'));
designers.add(new SimpleOrgan('Mario as Desinger'));

it.add(designers);
employees.add(it);
organization.add(employees);


/**
 * The client code.
 * The client works with the structure only via the base interface. So the
 * client is able to work with any component (simple, complex) without depending
 * on their concrete classes.
 */
function client(organization: Organ) {
  console.log(organization.getInformation());
}

