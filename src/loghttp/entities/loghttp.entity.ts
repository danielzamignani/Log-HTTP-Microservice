import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class LogHttp {
  @PrimaryColumn()
  id: string;

  @Column()
  url: string;

  //  @Column()
  //  body: any;
  //
  //  @Column()
  //  headers: any;

  @Column()
  method: string;

  @CreateDateColumn()
  dateHour: Date;
}
