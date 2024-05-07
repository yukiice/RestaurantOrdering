import type { Sequelize } from "sequelize";
import { address_book as _address_book } from "./address_book";
import type { address_bookAttributes, address_bookCreationAttributes } from "./address_book";
import { category as _category } from "./category";
import type { categoryAttributes, categoryCreationAttributes } from "./category";
import { dish as _dish } from "./dish";
import type { dishAttributes, dishCreationAttributes } from "./dish";
import { dish_flavor as _dish_flavor } from "./dish_flavor";
import type { dish_flavorAttributes, dish_flavorCreationAttributes } from "./dish_flavor";
import { employee as _employee } from "./employee";
import type { employeeAttributes, employeeCreationAttributes } from "./employee";
import { order_detail as _order_detail } from "./order_detail";
import type { order_detailAttributes, order_detailCreationAttributes } from "./order_detail";
import { orders as _orders } from "./orders";
import type { ordersAttributes, ordersCreationAttributes } from "./orders";
import { setmeal as _setmeal } from "./setmeal";
import type { setmealAttributes, setmealCreationAttributes } from "./setmeal";
import { setmeal_dish as _setmeal_dish } from "./setmeal_dish";
import type { setmeal_dishAttributes, setmeal_dishCreationAttributes } from "./setmeal_dish";
import { shopping_cart as _shopping_cart } from "./shopping_cart";
import type { shopping_cartAttributes, shopping_cartCreationAttributes } from "./shopping_cart";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";
export interface SequelizeModels {
  Employee: typeof _employee;
  AddressBook: typeof _address_book;
    Category: typeof _category;
    Dish: typeof _dish;
    DishFlavor: typeof _dish_flavor;
    OrderDetail: typeof _order_detail;
    Orders: typeof _orders;
    Setmeal: typeof _setmeal;
    SetmealDish: typeof _setmeal_dish;
    ShoppingCart: typeof _shopping_cart;
    User: typeof _user;
}
export {
  _address_book as address_book,
  _category as category,
  _dish as dish,
  _dish_flavor as dish_flavor,
  _employee as employee,
  _order_detail as order_detail,
  _orders as orders,
  _setmeal as setmeal,
  _setmeal_dish as setmeal_dish,
  _shopping_cart as shopping_cart,
  _user as user,
};

export type {
  address_bookAttributes,
  address_bookCreationAttributes,
  categoryAttributes,
  categoryCreationAttributes,
  dishAttributes,
  dishCreationAttributes,
  dish_flavorAttributes,
  dish_flavorCreationAttributes,
  employeeAttributes,
  employeeCreationAttributes,
  order_detailAttributes,
  order_detailCreationAttributes,
  ordersAttributes,
  ordersCreationAttributes,
  setmealAttributes,
  setmealCreationAttributes,
  setmeal_dishAttributes,
  setmeal_dishCreationAttributes,
  shopping_cartAttributes,
  shopping_cartCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const address_book = _address_book.initModel(sequelize);
  const category = _category.initModel(sequelize);
  const dish = _dish.initModel(sequelize);
  const dish_flavor = _dish_flavor.initModel(sequelize);
  const employee = _employee.initModel(sequelize);
  const order_detail = _order_detail.initModel(sequelize);
  const orders = _orders.initModel(sequelize);
  const setmeal = _setmeal.initModel(sequelize);
  const setmeal_dish = _setmeal_dish.initModel(sequelize);
  const shopping_cart = _shopping_cart.initModel(sequelize);
  const user = _user.initModel(sequelize);


  return {
    address_book: address_book,
    category: category,
    dish: dish,
    dish_flavor: dish_flavor,
    employee: employee,
    order_detail: order_detail,
    orders: orders,
    setmeal: setmeal,
    setmeal_dish: setmeal_dish,
    shopping_cart: shopping_cart,
    user: user,
  };
}

