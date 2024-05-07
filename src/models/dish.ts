import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface dishAttributes {
  id: number;
  name: string;
  category_id: number;
  price?: number;
  code: string;
  image: string;
  description?: string;
  status: number;
  sort: number;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
  is_deleted: number;
}

export type dishPk = "id";
export type dishId = dish[dishPk];
export type dishOptionalAttributes = "price" | "description" | "status" | "sort" | "is_deleted";
export type dishCreationAttributes = Optional<dishAttributes, dishOptionalAttributes>;

export class dish extends Model<dishAttributes, dishCreationAttributes> implements dishAttributes {
  id!: number;
  name!: string;
  category_id!: number;
  price?: number;
  code!: string;
  image!: string;
  description?: string;
  status!: number;
  sort!: number;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;
  is_deleted!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof dish {
    return dish.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      comment: "主键"
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "菜品名称",
      unique: "idx_dish_name"
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      comment: "菜品分类id"
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      comment: "菜品价格"
    },
    code: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: "商品码"
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: false,
      comment: "图片"
    },
    description: {
      type: DataTypes.STRING(400),
      allowNull: true,
      comment: "描述信息"
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: "0 停售 1 起售"
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
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "是否删除"
    }
  }, {
    sequelize,
    tableName: 'dish',
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
        name: "idx_dish_name",
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
