import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AmenityAEntity } from './amenity-a.entity';
import { AmenityBEntity } from './amenity-b.entity';
import { MainEntity } from './main.entity';
import { transform } from "../utils";

export enum AmenityType {
  a = 'a',
  b = 'b'
}

@Entity('Amenity')
export class AmenityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: AmenityType
  })
  type: AmenityType;

  @ManyToOne(() => MainEntity, (main: MainEntity) => main.amenities, {
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  main: MainEntity;

  @OneToOne(() => AmenityAEntity, (entity: AmenityAEntity) => entity.amenity, {
    cascade: true,
    eager: true
  })
  amenityAEntity?: AmenityAEntity;

  @OneToOne(() => AmenityBEntity, (entity: AmenityBEntity) => entity.amenity, {
    cascade: true,
    eager: true
  })
  amenityBEntity?: AmenityBEntity;

  features:
    | AmenityAEntity
    | AmenityBEntity;

  @BeforeInsert()
  beforeStore(): void {
    if (process.env.ENTITY_TRANSFORM_TYPE === "TYPEORM") {
      console.log('TYPEORM before transform');
      console.dir(this, {depth: null});

      transform(this);

      console.log('TYPEORM after transform');
      console.dir(this, {depth: null});
    }
  }
}
