import {
  Table,
  Column,
  Model,
} from 'sequelize-typescript';

export interface UserCreationAttributes {
  name: string;
  email: string;
  password: string;
  role: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {

  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    allowNull: false,
  })
  declare password: string;

  @Column({
    allowNull: false,
  })
  declare role: string;
}
