import { DataTypes } from 'sequelize';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { User } from 'src/user/user.model';

@Table({ tableName: 'Post' })
export class Post extends Model {
  @Column({
    allowNull: false,
    defaultValue: uuid(), // Fix it - only one value generate at the compilation
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  })
  id: string;

  @Column({ allowNull: true, type: DataTypes.TEXT })
  description: string;

  @Column({ allowNull: true })
  media: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @ForeignKey(() => User)
  @Column({ type: DataTypes.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
