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

  @Column()
  fk_author: string;

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
    | 'returned'
    | 'refused'
    | 'okay'
    | 'published';

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Task;
