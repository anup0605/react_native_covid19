import { by, element, expect } from 'detox';

async function scrollToElement(scrollElementId: string, element: Detox.NativeElement, direction: Detox.Direction) {
  try {
    await waitFor(element).toBeVisible().whileElement(by.id(scrollElementId)).scroll(500, direction);
  } catch (_) {}
}

export async function scrollUpToElement(scrollElementId: string, element: Detox.NativeElement) {
  await scrollToElement(scrollElementId, element, 'up');
}

export async function scrollDownToElement(scrollElementId: string, element: Detox.NativeElement) {
  await scrollToElement(scrollElementId, element, 'down');
}

export async function scrollDownToId(scrollElementId: string, elementId: string) {
  return scrollDownToElement(scrollElementId, element(by.id(elementId)));
}

async function tapInputByElement(element: Detox.NativeElement) {
  // Tap twice to lose the focus from the previous input (if it was a text input).
  await element.tap();
  await element.tap();
}

export async function tapInputById(elementId: string) {
  return tapInputByElement(element(by.id(elementId)));
}

export async function submitForm(screenId: string, scrollViewId: string, buttonId: string) {
  await expect(element(by.id(buttonId).withAncestor(by.id(screenId)))).toExist();
  await scrollDownToId(scrollViewId, buttonId);
  // Sometimes scrolling down causes the button to be pressed.
  try {
    await element(by.id(buttonId).withAncestor(by.id(screenId))).tap();
  } catch (_) {}
  // Double tap to lose the focus from a possible text input above.
  try {
    await element(by.id(buttonId).withAncestor(by.id(screenId))).tap();
  } catch (_) {}
}
