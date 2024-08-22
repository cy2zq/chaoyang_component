describe('export', () => {
  it('should work', async () => {
    const all = await import('../src');

    expect(Object.keys(all)).toMatchSnapshot();
  });

  it('should export all hooks', async () => {
    const hooks = await import('../src/hooks');

    expect(Object.keys(hooks)).toMatchInlineSnapshot(`
      [
        "useBoolean",
        "useLatestFunc",
        "useModalEnhanced",
      ]
    `);
  });

  it('should export all utils', async () => {
    const types = await import('../src/util');

    expect(Object.keys(types)).toMatchInlineSnapshot(`
      [
        "has",
        "omit",
        "isElement",
        "isDOMTypeElement",
      ]
    `);
  });

  describe('mobile', () => {
    it('should work', async () => {
      const all = await import('../src/mobile');

      expect(Object.keys(all)).toMatchSnapshot();
    });
  });
});
