import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AmenityEntity } from './amenity.entity';

@Entity('Main')
export class MainEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => AmenityEntity, (amenity: AmenityEntity) => amenity.main, {
    cascade: true,
    eager: true
  })
  amenities: AmenityEntity[];
}