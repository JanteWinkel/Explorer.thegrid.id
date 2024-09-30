import { CodegenConfig } from '@graphql-codegen/cli';
import { config } from 'dotenv';

// Cargar las variables de entorno desde el archivo .env.local
config();

// Verificar que la URL del endpoint de GraphQL esté definida
if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL) {
  throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL no está definida en el archivo .env.local');
}

const codegenConfig: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,  // URL del endpoint de GraphQL
  overwrite: true,
  ignoreNoDocuments: true,
  documents: './lib/graphql/queries/**/*.graphql',  // Ruta a los archivos de consultas GraphQL
  generates: {
    'lib/graphql/generated-graphql.ts': {
      config: {
        reactQueryVersion: 5,
        addInfiniteQuery: true,
        fetcher: {
          endpoint: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL,  // Endpoint del fetcher
        },
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],  // Plugins de generación
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write', 'echo'],  // Hook para formatear el código con Prettier
  },
};

export default codegenConfig;
