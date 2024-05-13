import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface setmeal_dishAttributes {
  id: number;
  setmeal_id: string;
  dish_id: string;
  name?: string;
  price?: number;
  copies: number;
  sort: number;
  create_time: Date;
  update_time: Date;
  create_user: number;
  update_user: number;
  is_deleted: number;
}

export type setmeal_dishPk = "id";
export type setmeal_dishId = setmeal_dish[setmeal_dishPk];
export type setmeal_dishOptionalAttributes = "name" | "price" | "sort" | "is_deleted";
export type setmeal_dishCreationAttributes = Optional<setmeal_dishAttributes, setmeal_dishOptionalAttributes>;

export class setmeal_dish extends Model<setmeal_dishAttributes, setmeal_dishCreationAttributes> implements setmeal_dishAttributes {
  id!: number;
  setmeal_id!: string;
  dish_id!: string;
  name?: string;
  price?: number;
  copies!: number;
  sort!: number;
  create_time!: Date;
  update_time!: Date;
  create_user!: number;
  update_user!: number;
  is_deleted!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof setmeal_dish {
    return setmeal_dish.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键"
    },
    setmeal_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "套餐id "
    },
    dish_id: {
      type: DataTypes.STRING(32),
      allowNull: false,
      comment: "菜品id"
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: true,
      comment: "菜品名称 （冗余字段）"
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      comment: "菜品原价（冗余字段）"
    },
    copies: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "份数"
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "排序"
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
    tableName: 'setmeal_dish',
      timestamps: true,
      createdAt: 'create_time', // 将 createdAt 映射到 create_time 字段
      updatedAt: 'update_time', // 将 updatedAt 映射到 update_time 字段
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
