import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface order_detailAttributes {
  id: number;
  name?: string;
  image?: string;
  order_id: number;
  dish_id?: number;
  setmeal_id?: number;
  dish_flavor?: string;
  number: number;
  amount: number;
}

export type order_detailPk = "id";
export type order_detailId = order_detail[order_detailPk];
export type order_detailOptionalAttributes = "name" | "image" | "dish_id" | "setmeal_id" | "dish_flavor" | "number";
export type order_detailCreationAttributes = Optional<order_detailAttributes, order_detailOptionalAttributes>;

export class order_detail extends Model<order_detailAttributes, order_detailCreationAttributes> implements order_detailAttributes {
  id!: number;
  name?: string;
  image?: string;
  order_id!: number;
  dish_id?: number;
  setmeal_id?: number;
  dish_flavor?: string;
  number!: number;
  amount!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof order_detail {
    return order_detail.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "名字"
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "图片"
    },
    order_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "订单id"
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
    }
  }, {
    sequelize,
    tableName: 'order_detail',
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
