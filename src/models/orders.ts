import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ordersAttributes {
  id: number;
  number?: string;
  status: number;
  user_id: number;
  address_book_id: number;
  order_time: Date;
  checkout_time: Date;
  pay_method: number;
  amount: number;
  remark?: string;
  phone?: string;
  address?: string;
  user_name?: string;
  consignee?: string;
}

export type ordersPk = "id";
export type ordersId = orders[ordersPk];
export type ordersOptionalAttributes = "number" | "status" | "pay_method" | "remark" | "phone" | "address" | "user_name" | "consignee";
export type ordersCreationAttributes = Optional<ordersAttributes, ordersOptionalAttributes>;

export class orders extends Model<ordersAttributes, ordersCreationAttributes> implements ordersAttributes {
  id!: number;
  number?: string;
  status!: number;
  user_id!: number;
  address_book_id!: number;
  order_time!: Date;
  checkout_time!: Date;
  pay_method!: number;
  amount!: number;
  remark?: string;
  phone?: string;
  address?: string;
  user_name?: string;
  consignee?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof orders {
    return orders.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键"
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "订单号"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "订单状态 1待付款，2待派送，3已派送，4已完成，5已取消"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "下单用户"
    },
    address_book_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "地址id"
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "下单时间"
    },
    checkout_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "结账时间"
    },
    pay_method: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "支付方式 1微信,2支付宝"
    },
    amount: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      comment: "实收金额"
    },
    remark: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "备注"
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    consignee: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders',
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
