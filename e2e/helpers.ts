export function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function scrollToElement(
  scrollElementId: string,
  element: Detox.NativeElement,
  direction: Detox.Direction,
) {
  try {
    await waitFor(element).toBeVisible().whileElement(by.id(scrollElementId)).scroll(500, direction);
  } catch (_) {}
}

export async function scrollUpToElement(scrollElementId: string, element: Detox.NativeElement) {
  await scrollToElement(scrollElementId, element, 'up');
}

export async function scrollUpToId(scrollElementId: string, elementId: string) {
  return scrollUpToElement(scrollElementId, element(by.id(elementId)));
}

export async function scrollDownToElement(scrollElementId: string, element: Detox.NativeElement) {
  await scrollToElement(scrollElementId, element, 'down');
}

export async function scrollDownToId(scrollElementId: string, elementId: string) {
  return scrollDownToElement(scrollElementId, element(by.id(elementId)));
}

export async function tapInputByElement(element: Detox.NativeElement) {
  // Tap twice to lose the focus from the previous input (if it was a text input).
  await element.tap();
  await element.tap();
}

export async function tapInputById(elementId: string) {
  return tapInputByElement(element(by.id(elementId)));
}
