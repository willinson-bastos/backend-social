import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'social-network',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true, //CUIDADO COM ESSA PORRA!
      });

      return dataSource.initialize();
    },
  },
];