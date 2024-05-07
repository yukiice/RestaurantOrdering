import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dish_flavorAttributes {
  id: number;
  dish_id: number;
  name: string;
  value?: string;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
  is_deleted: number;
}

export type dish_flavorPk = "id";
export type dish_flavorId = dish_flavor[dish_flavorPk];
export type dish_flavorOptionalAttributes = "value" | "is_deleted";
export type dish_flavorCreationAttributes = Optional<dish_flavorAttributes, dish_flavorOptionalAttributes>;

export class dish_flavor extends Model<dish_flavorAttributes, dish_flavorCreationAttributes> implements dish_flavorAttributes {
  id!: number;
  dish_id!: number;
  name!: string;
  value?: string;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;
  is_deleted!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof dish_flavor {
    return dish_flavor.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    dish_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "菜品"
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "口味名称"
    },
    value: {
      type: DataTypes.STRING(500),
      allowNull: true,
      comment: "口味数据list"
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
    tableName: 'dish_flavor',
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
