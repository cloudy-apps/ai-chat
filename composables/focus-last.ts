export function useFocusLast() {
  function focusLast() {
    const container = document.querySelector("main");
    if (!container) {
      return;
    }

    setTimeout(
      () =>
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        }),
      400
    );
  }

  return { focusLast };
}