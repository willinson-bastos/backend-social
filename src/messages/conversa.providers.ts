import { DataSource } from 'typeorm';
import { Conversa } from './entities/conversa.entity';

export const conversaProviders = [
  {
    provide: 'CHAT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Conversa),
    inject: ['DATABASE_CONNECTION'],
  },
];