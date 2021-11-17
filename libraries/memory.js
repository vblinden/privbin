const entries = [];

const memory = () => {
  return {
    get: async (id) => {
      return entries.find((entry) => entry.id === id);
    },

    set: async (id, content, expiration, exposure, password, language, created_at) => {
      entries.push({
        id,
        content,
        expiration,
        exposure,
        password,
        language,
        created_at,
      });
    },

    list: async () => {
      return entries
        .filter((entry) => entry.created_at >= new Date().getTime())
        .filter((entry) => entry.exposure === 'public')
        .map((entry) => JSON.stringify(entry));
    },
  };
};

export default memory;
