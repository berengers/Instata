import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Posts extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: string;

  @Column
  description: string;

  @Column
  media: string;

  @Column
  userId: string;

  @Column
  createdAt: Date;

  @Column
  updatedAt: Date;
}
