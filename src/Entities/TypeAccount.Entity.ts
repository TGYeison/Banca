import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TypeAccount {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;
}