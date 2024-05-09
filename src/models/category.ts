import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
export interface categoryAttributes {
  id: number;
  type?: number;
  name: string;
  sort: number;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
}

export type categoryPk = "id";
export type categoryId = category[categoryPk];
export type categoryOptionalAttributes = "type" | "sort";
export type categoryCreationAttributes = Optional<categoryAttributes, categoryOptionalAttributes>;

export class category extends Model<categoryAttributes, categoryCreationAttributes> implements categoryAttributes {
  id!: number;
  type?: number;
  name!: string;
  sort!: number;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;

  static initModel(sequelize: Sequelize.Sequelize): typeof category {
     category.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键"
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "类型   1 菜品分类 2 套餐分类"
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "分类名称",
      unique: "idx_category_name"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "顺序"
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
    tableName: 'category',
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
        name: "idx_category_name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
    return category;
  }
}
