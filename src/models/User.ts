import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Task from './Task';
import Article from './Article';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  permission: 'writer' | 'editor' | 'administrator' | 'developer';

  @OneToMany(() => Task, task => task.fk_author)
  author_tasks: Task[];

  @OneToMany(() => Article, article => article.fk_writer)
  writer_articles: Article[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
