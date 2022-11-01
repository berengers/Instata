import { DataTypes } from 'sequelize';
import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Post } from 'src/post/post.model';

@Table({ tableName: 'User' })
export class User extends Model {
  @Column({
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
  })
  id: string;

  @Column({ unique: true, allowNull: false })
  email: string;

  @Column({ unique: true, allowNull: false })
  username: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: true })
  description: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: true })
  profilePicture: string;

  @Column({ allowNull: false })
  createdAt: Date;

  @Column({ allowNull: false })
  updatedAt: Date;

  @HasMany(() => Post)
  posts: Post[];
}
