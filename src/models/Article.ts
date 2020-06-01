import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import User from './User';
import Task from './Task';

@Entity('articles')
class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.writer_articles, { eager: true })
  @JoinColumn({ name: 'fk_writer' })
  writer: User;

  @OneToOne(() => Task, task => task, { eager: true })
  @JoinColumn({ name: 'fk_task' })
  task: User;

  @Column()
  fk_writer: string;

  @Column()
  fk_task: string;

  @Column('int')
  words: number;

  @Column('decimal')
  value: number;

  @Column('text')
  article: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('timestamp with time zone')
  delivered_at: Date;
}

export default Article;
