import { EntityRepository, Repository } from 'typeorm';

import Task from '../models/Task';

@EntityRepository(Task)
class TasksRepository extends Repository<Task> {}

export default TasksRepository;
