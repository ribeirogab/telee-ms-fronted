import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import User from './User';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.author_tasks, { eager: true })
  @JoinColumn({ name: 'fk_author' })
  author: User;

  @ManyToOne(() => User, user => user.writer_tasks, { eager: true })
  @JoinColumn({ name: 'fk_writer' })
  writer: User;

  @Column()
  fk_author: string;

  @Column()
  fk_writer: string;

  @Column()
  keyword: string;

  @Column()
  sub_keywords: string;

  @Column()
  website: string;

  @Column()
  status:
    | 'available'
    | 'writing'
    | 'pending'
    | 'recused'
    | 'accepted'
    | 'returned';

  @Column('timestamp with time zone')
  assumed: Date;

  @Column('timestamp with time zone')
  delivered: Date;

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
}

export default Task;
