export function testMentalHealthPlaybackModal() {
  it('should complete the mental health playback modal (if present)', async () => {
    try {
      await element(by.id('button-negative').withAncestor(by.id('mental-health-playback-modal'))).tap();
    } catch (_) {}
  });
}

export function testCovidTestListOnboardingModal() {
  it('should complete the mental health playback modal (if present)', async () => {
    try {
      await element(by.id('button-close-modal').withAncestor(by.id('covid-test-modal-0'))).tap();
    } catch (_) {}
  });
}
