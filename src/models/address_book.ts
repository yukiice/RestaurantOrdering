import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface address_bookAttributes {
  id: number;
  user_id: number;
  consignee: string;
  sex: number;
  phone: string;
  province_code?: string;
  province_name?: string;
  city_code?: string;
  city_name?: string;
  district_code?: string;
  district_name?: string;
  detail?: string;
  label?: string;
  is_default: number;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
  is_deleted: number;
}

export type address_bookPk = "id";
export type address_bookId = address_book[address_bookPk];
export type address_bookOptionalAttributes = "province_code" | "province_name" | "city_code" | "city_name" | "district_code" | "district_name" | "detail" | "label" | "is_default" | "is_deleted";
export type address_bookCreationAttributes = Optional<address_bookAttributes, address_bookOptionalAttributes>;

export class address_book extends Model<address_bookAttributes, address_bookCreationAttributes> implements address_bookAttributes {
  id!: number;
  user_id!: number;
  consignee!: string;
  sex!: number;
  phone!: string;
  province_code?: string;
  province_name?: string;
  city_code?: string;
  city_name?: string;
  district_code?: string;
  district_name?: string;
  detail?: string;
  label?: string;
  is_default!: number;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;
  is_deleted!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof address_book {
    return address_book.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键"
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "用户id"
    },
    consignee: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "收货人"
    },
    sex: {
      type: DataTypes.TINYINT,
      allowNull: false,
      comment: "性别 0 女 1 男"
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: "手机号"
    },
    province_code: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "省级区划编号"
    },
    province_name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "省级名称"
    },
    city_code: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "市级区划编号"
    },
    city_name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "市级名称"
    },
    district_code: {
      type: DataTypes.STRING(12),
      allowNull: true,
      comment: "区级区划编号"
    },
    district_name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "区级名称"
    },
    detail: {
      type: DataTypes.STRING(200),
      allowNull: true,
      comment: "详细地址"
    },
    label: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "标签"
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: "默认 0 否 1是"
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "创建时间"
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false,
      comment: "更新时间"
    },
    create_user: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "创建人"
    },
    update_user: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "修改人"
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除"
    }
  }, {
    sequelize,
    tableName: 'address_book',
    timestamps: true,
      createdAt: 'create_time',
        updatedAt: 'update_time',
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
