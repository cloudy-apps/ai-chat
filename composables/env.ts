import { ref, unref } from "vue";

const env = ref<Record<string, any>>({});
export const useEnv = function () {
  const getEnv = (key: string) => String(unref(env)[key] || "");
  return { getEnv };
};

export const set = (value) => {
  env.value = value;
};
