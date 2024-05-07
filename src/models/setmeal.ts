import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface setmealAttributes {
  id: number;
  category_id: number;
  name: string;
  price: number;
  status?: number;
  code?: string;
  description?: string;
  image?: string;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
  is_deleted: number;
}

export type setmealPk = "id";
export type setmealId = setmeal[setmealPk];
export type setmealOptionalAttributes = "status" | "code" | "description" | "image" | "is_deleted";
export type setmealCreationAttributes = Optional<setmealAttributes, setmealOptionalAttributes>;

export class setmeal extends Model<setmealAttributes, setmealCreationAttributes> implements setmealAttributes {
  id!: number;
  category_id!: number;
  name!: string;
  price!: number;
  status?: number;
  code?: string;
  description?: string;
  image?: string;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;
  is_deleted!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof setmeal {
    return setmeal.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "菜品分类id"
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "套餐名称",
      unique: "idx_setmeal_name"
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      comment: "套餐价格"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "状态 0:停用 1:启用"
    },
    code: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "编码"
    },
    description: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: "描述信息"
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "图片"
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
    tableName: 'setmeal',
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
        name: "idx_setmeal_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
  }
}
