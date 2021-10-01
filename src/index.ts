import { type } from "os";
import "reflect-metadata";

import { createConnection } from "typeorm";
import { AmenityAEntity } from "./entity/amenity-a.entity";
import { AmenityBEntity } from "./entity/amenity-b.entity";
import { AmenityEntity, AmenityType } from "./entity/amenity.entity";
import { MainEntity } from "./entity/main.entity";
import { transform } from "./utils";

const createTruncateQueries = (rows: { name: string }[]): string[] =>
  rows
    .map((row) => Object.values(row)[0])
    .map((name: string) => `TRUNCATE TABLE \`${name}\``);

createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  database: "test",
  entities: [
    MainEntity,
    AmenityEntity,
    AmenityAEntity,
    AmenityBEntity
  ],
  multipleStatements: true,
  synchronize: true,
  logging: true
}).then(async (connection) => {
  const amenityEntityA = new AmenityEntity();

  amenityEntityA.name = '123'
  amenityEntityA.type = AmenityType.a;
  amenityEntityA.features = {
    option_a: 'option_a_3'
  } as AmenityAEntity;

  const amenityEntityB = new AmenityEntity();

  amenityEntityB.name = '456'
  amenityEntityB.type = AmenityType.b;
  amenityEntityB.features = {
    option_b: 'option_b_3'
  } as AmenityBEntity;

  const amenities = [
    amenityEntityA,
    amenityEntityB
  ] as AmenityEntity[];

  const mainEntity = {
    name: 'main1',
    amenities: amenities
  } as MainEntity

  await connection.manager.query(
    [
      'SET FOREIGN_KEY_CHECKS=0',
      ...createTruncateQueries(await connection.manager.query('SHOW TABLES;')),
      'SET FOREIGN_KEY_CHECKS=1'
    ].join(';')
  );

  if (process.env.ENTITY_TRANSFORM_TYPE === "MANUAL") {
    console.log('MANUAL before transform');
    console.dir(mainEntity.amenities, {depth: null});

    mainEntity.amenities.forEach(transform);

    console.log('MANUAL after transform');
    console.dir(mainEntity.amenities, {depth: null});
  }

  await connection.getRepository(MainEntity).save(mainEntity);
  await connection.close();
}).catch(error => console.log(error));
