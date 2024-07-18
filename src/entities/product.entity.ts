export class Product {
  private _id: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _name: string;
  private _price: number;
  private _description: string;
  private _pictures: string[];
  private _categoryId: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    price: number,
    description: string,
    pictures: string[],
    categoryId: number,
  ) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._name = name;
    this._price = price;
    this._description = description;
    this._pictures = pictures;
    this._categoryId = categoryId;
  }

  public get id(): number {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get description(): string {
    return this._description;
  }

  public get pictures(): string[] {
    return this._pictures;
  }
}