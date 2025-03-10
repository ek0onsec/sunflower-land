import { INITIAL_BUMPKIN, TEST_FARM } from "features/game/lib/constants";
import { MOVE_CHICKEN_ERRORS, moveChicken } from "./moveChicken";

describe("moveChicken", () => {
  it("does not move chicken with invalid id", () => {
    expect(() =>
      moveChicken({
        state: {
          ...TEST_FARM,
          bumpkin: INITIAL_BUMPKIN,
          chickens: {
            1: {
              coordinates: {
                x: 1,
                y: 1,
              },
              multiplier: 1,
            },
          },
        },
        action: {
          type: "chicken.moved",
          id: "2",
          coordinates: { x: 2, y: 2 },
        },
      }),
    ).toThrow(MOVE_CHICKEN_ERRORS.CHICKEN_NOT_PLACED);
  });

  it("moves a chicken", () => {
    const gameState = moveChicken({
      state: {
        ...TEST_FARM,
        bumpkin: INITIAL_BUMPKIN,
        chickens: {
          123: {
            coordinates: {
              x: 1,
              y: 1,
            },
            multiplier: 1,
          },
          456: {
            coordinates: {
              x: 4,
              y: 4,
            },
            multiplier: 1,
          },
          789: {
            coordinates: {
              x: 8,
              y: 8,
            },
            multiplier: 1,
          },
        },
      },
      action: {
        type: "chicken.moved",
        id: "123",
        coordinates: { x: 2, y: 2 },
      },
    });

    expect(gameState.chickens).toEqual({
      "123": { coordinates: { x: 2, y: 2 }, multiplier: 1 },
      "456": { coordinates: { x: 4, y: 4 }, multiplier: 1 },
      "789": { coordinates: { x: 8, y: 8 }, multiplier: 1 },
    });
  });

  it("doesn't throw an error if colliding with itself", () => {
    const state = moveChicken({
      state: {
        ...TEST_FARM,
        bumpkin: INITIAL_BUMPKIN,
        chickens: {
          123: {
            coordinates: {
              x: 1,
              y: 1,
            },
            multiplier: 1,
          },
        },
      },
      action: {
        type: "chicken.moved",
        id: "123",
        coordinates: { x: 1, y: 1 },
      },
    });

    expect(state.chickens["123"].coordinates).toEqual({ x: 1, y: 1 });
  });
});
