const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const database = () => {
  return {
    get: async (id) => {
      return toObject(
        await prisma.item.findFirst({
          where: {
            public_id: id,
          },
        }),
      );
    },

    set: async (id, content, expiration, exposure, password, language, created_at) => {
      await prisma.item.create({
        data: {
          public_id: id,
          content: content,
          exposure: exposure,
          created_at: created_at,
          expire_at: expiration !== 'never' ? parseInt(created_at) + parseInt(expiration) : null,
          has_password: password,
          language: language,
          private: exposure === 'private',
        },
      });
    },

    list: async () => {
      return (
        await prisma.item.findMany({
          where: {
            private: false,
            OR: [
              {
                expire_at: { gte: parseInt(new Date().getTime()) },
              },
              {
                expire_at: null,
              },
            ],
          },
          orderBy: {
            created_at: 'desc',
          },
        })
      ).map((o) => toObject(o));
    },
  };
};

// Fix for conversation of BigInt
const toObject = (data) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? parseInt(value.toString()) : value)),
  );
};

export default database;
