/**
 * Builder Design Pattern.
 * This pattern allows us to construct a complex objects step by step. Builder
 * is useful for when we want to construct an object that needs a lot of
 * customization before creation. So Instead of relying on functions with huge
 * list of parameters to customize the objects, we use builder pattern that lets
 * us build and customize the objects step by step in a cleaner way.
 *
 * SQL Query Builder is one of the most common use cases of Builder pattern. So
 * in this example we are going to create a SQL query builder using Builder Pattern.
 * This content is inspired by:
 * https://refactoring.guru/design-patterns/builder
 *
 * You can also read a detailed explanation of this pattern here (in Persian):
 * https://ditty.ir/posts/builder-design-pattern/XEW35
 */


/**
 * The Builder Interface.
 * This interface specifies the set of methods for creating the different parts
 * of the resulting objects. In SQL, each query is made of several clauses and
 * keywords. To build a complex and complete SQL query, we separate each clause
 * into a distinct method in this interface.
 */
 interface QueryBuilder {
  /**
   * Some methods' output signature is a type of the Builder Interface. This is
   * useful for implementing the method chaining behavior.
   */
  table(table): QueryBuilder;
  select(cols): QueryBuilder;
  limit(value: Number): QueryBuilder;
  where(col: string, value: Number|String): QueryBuilder;

  // To get the final result (product)
  getQuery(): String;

  /* +100 Other SQL related methods  */
}

/**
 * Concrete Builder class. The program may contain several variations of builders
 * that may return totally different type of objects in comparison to another
 * builder.
 * Each concrete builder must follow the Builder Interface and implement its
 * own build steps.
 * This class, for example is a query builder for MySQL.
 */
class MySqlQueryBuilder implements QueryBuilder {
  /**
   * At the end, every builder returns its result. The result is also called
   * Product. The result of a SQL query builder, is a valid string of SQL query.
   */
  private query: String;
  private tableName: String;

  /**
   * Each instance of a builder, should be created
   * with a raw and empty query (Product)
   */
  public constructor() {
    this.query = "";
  }

  /**
   * We do "return this" to implement the method chaining behavior.
   */
  public table(table): QueryBuilder {
    this.tableName = table;

    return this;
  }

  public select(cols): QueryBuilder {
    /** ... */
    return this;
  }

  public limit(value: Number): QueryBuilder {
    /** ... */
    return this;
  }

  public where(col, value): QueryBuilder {
    /** ... */
    return this;
  }

  public getQuery(): String {
    return 'This is a MySQL query';
  }
}

/**
 * Another concrete builder. Concrete builders implement Builder Interface so
 * they contain similar methods. But the final product may totally be different
 * from the final product of another builder (e.g. MySQL queries are totally
 * different from MongoDB queries). Although the client may not be aware of what
 * kind of builder is working with.
 */
class MongoDbQueryBuilder implements QueryBuilder {
  private query: String;
  private tableName: String;

  public constructor() {
    this.query = '';
  }

  public table(table): QueryBuilder {
    this.tableName = table;

    return this;
  }

  public select(cols): QueryBuilder {
    /** ... */
    return this;
  }

  public limit(value: Number): QueryBuilder {
    /** ... */
    return this;
  }

  public where(col, value): QueryBuilder {
    /** ... */
    return this;
  }

  public getQuery(): String {
    return 'This is a MongoDB query';
  }
}

/**
 * The Client works with the builders through abstraction. We are able to replace
 * the builders passed to the client without breaking the client code.
 */
function client(builder: QueryBuilder) {
  const query = builder.table('posts')
    .where('id', 429)
    .limit(10)
    .select(['id', 'title'])
    .getQuery();

  console.log(query);
}

/**
 * The application configuration decides which builder should be used in the
 * client
 */
const config = {
  database1: MongoDbQueryBuilder,
  database2: MySqlQueryBuilder
}

// Client uses MongoDB:
client(new config.database1); // This is a MongoDB query

// Client uses MySQL:
client(new config.database2); // This is a MySQL query

