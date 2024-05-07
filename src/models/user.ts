import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface userAttributes {
  id: number;
  name?: string;
  phone: string;
  sex?: string;
  id_number?: string;
  avatar?: string;
  status?: number;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "name" | "sex" | "id_number" | "avatar" | "status";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  name?: string;
  phone!: string;
  sex?: string;
  id_number?: string;
  avatar?: string;
  status?: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "姓名"
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: "手机号"
    },
    sex: {
      type: DataTypes.STRING(2),
      allowNull: true,
      comment: "性别"
    },
    id_number: {
      type: DataTypes.STRING(18),
      allowNull: true,
      comment: "身份证号"
    },
    avatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "头像"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      comment: "状态 0:禁用，1:正常"
    }
  }, {
    sequelize,
    tableName: 'user',
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
