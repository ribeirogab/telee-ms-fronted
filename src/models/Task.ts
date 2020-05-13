import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  author: string;

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

  @Column()
  writer: string;

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
