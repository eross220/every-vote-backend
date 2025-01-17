import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CoreEntity } from './core.entity';

@Entity("todo")
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date | null;

}
