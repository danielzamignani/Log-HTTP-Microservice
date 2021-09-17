import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class LogHttp {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  @Column({ type: 'jsonb' })
  body: any;

  @Column({ type: 'jsonb' })
  headers: any;

  @Column()
  method: string;

  @CreateDateColumn()
  dateHour: Date;
}
