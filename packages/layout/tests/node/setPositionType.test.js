import { beforeEach, describe, expect, test, vi } from "vitest";

import * as Yoga from "yoga-layout/load";

import setPositionType from "../../src/node/setPositionType";

describe("node setPositionType", () => {
  const mock = vi.fn();
  const node = { yogaNode: { setPositionType: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test("should return node if no yoga node available", () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setPositionType(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test("Should set relative", () => {
    const result = setPositionType("relative")(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.PositionType.Relative);
    expect(result).toBe(node);
  });

  test("Should set absolute", () => {
    const result = setPositionType("absolute")(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.PositionType.Absolute);
    expect(result).toBe(node);
  });

  test("Should set static", () => {
    const result = setPositionType("static")(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.PositionType.Static);
    expect(result).toBe(node);
  });
});
