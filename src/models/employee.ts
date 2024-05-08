import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface employeeAttributes {
  id: number;
  name: string;
  username: string;
  password: string;
  phone: string;
  sex: string;
  id_number: string;
  status: number;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
}

export type employeePk = "id";
export type employeeId = employee[employeePk];
export type employeeOptionalAttributes = "status";
export type employeeCreationAttributes = Optional<employeeAttributes, employeeOptionalAttributes>;

export class employee extends Model<employeeAttributes, employeeCreationAttributes> implements employeeAttributes {
  id!: number;
  name!: string;
  username!: string;
  password!: string;
  phone!: string;
  sex!: string;
  id_number!: string;
  status!: number;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof employee {
    return employee.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // 这使得id字段自增
      comment: "主键"
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "姓名"
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "用户名",
      unique: "idx_username"
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "密码"
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
      comment: "手机号"
    },
    sex: {
      type: DataTypes.STRING(2),
      allowNull: false,
      comment: "性别"
    },
      id_number: {
      type: DataTypes.STRING(18),
      allowNull: false,
      comment: "身份证号"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "状态 0:禁用，1:正常"
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
    }
  }, {
    sequelize,
    tableName: 'employee',
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
      {
        name: "idx_username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
