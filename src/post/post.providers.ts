import { DataSource } from 'typeorm';
import { PostEntity } from './post.entity';

export const postProviders = [
  {
    provide: 'POST_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(PostEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];