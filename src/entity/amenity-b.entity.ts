import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AmenityEntity } from "./amenity.entity";

@Entity('AmenityB')
export class AmenityBEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  option_b: string;

  @OneToOne(() => AmenityEntity, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  amenity: AmenityEntity;
}