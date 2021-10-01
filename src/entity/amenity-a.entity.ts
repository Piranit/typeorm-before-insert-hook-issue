import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AmenityEntity } from "./amenity.entity";

@Entity('AmenityA')
export class AmenityAEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column()
  option_a: string;

  @OneToOne(() => AmenityEntity, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  amenity: AmenityEntity;
}