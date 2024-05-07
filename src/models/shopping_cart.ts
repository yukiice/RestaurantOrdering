import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface shopping_cartAttributes {
  id: number;
  name?: string;
  image?: string;
  user_id: number;
  dish_id?: number;
  setmeal_id?: number;
  dish_flavor?: string;
  number: number;
  amount: number;
  create_time?: Date;
}

export type shopping_cartPk = "id";
export type shopping_cartId = shopping_cart[shopping_cartPk];
export type shopping_cartOptionalAttributes = "name" | "image" | "dish_id" | "setmeal_id" | "dish_flavor" | "number" | "create_time";
export type shopping_cartCreationAttributes = Optional<shopping_cartAttributes, shopping_cartOptionalAttributes>;

export class shopping_cart extends Model<shopping_cartAttributes, shopping_cartCreationAttributes> implements shopping_cartAttributes {
  id!: number;
  name?: string;
  image?: string;
  user_id!: number;
  dish_id?: number;
  setmeal_id?: number;
  dish_flavor?: string;
  number!: number;
  amount!: number;
  create_time?: Date;


  static initModel(sequelize: Sequelize.Sequelize): typeof shopping_cart {
    return shopping_cart.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "名称"
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "图片"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "主键"
    },
    dish_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "菜品id"
    },
    setmeal_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      comment: "套餐id"
    },
    dish_flavor: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "口味"
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "数量"
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      comment: "金额"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "创建时间"
    }
  }, {
    sequelize,
    tableName: 'shopping_cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
