import { onMounted, ref } from "vue";
import { useEnv } from "./env";

export function useAuth() {
  const authenticated = ref(false);
  const { getEnv, ready } = useEnv();

  onMounted(async function () {
    await ready;

    const auth = await fetch(getEnv("AUTH_API"), {
      mode: "cors",
      credentials: "include",
    });

    const valid = auth.ok && auth.status === 200;
    authenticated.value = valid;

    if (valid) {
      return;
    }

    location.href = String(
      new URL(
        "/login?url=" + encodeURIComponent(location.href),
        getEnv("AUTH_API")
      )
    );
  });

  return { authenticated };
}
