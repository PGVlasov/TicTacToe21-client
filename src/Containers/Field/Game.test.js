import {
  checkWinnerLeftTopRightBottom,
  checkWinnerLeftToRight,
  checkWinnerTopToBottom,
  checkWinnerLeftBottomRightTop,
} from "./checkWinner.js";

describe("Game unit tests", () => {
  test("should show winner when last move left x0 y0", () => {
    const board = [
      ["x", "x", "x"],
      [null, null, null],
      [null, null, null],
    ];

    const isWinner = checkWinnerLeftToRight("x", board, 3, 0, 0);
    expect(isWinner).toEqual(true);
  });
});

test("should show winner when last move x1 y1", () => {
  const board = [
    [null, null, null],
    ["x", "x", "x"],
    [null, null, null],
  ];

  const isWinner = checkWinnerLeftToRight("x", board, 3, 1, 1);
  expect(isWinner).toEqual(true);
});

test("should show winner when last move x2 y2", () => {
  const board = [
    [null, null, null],
    [null, null, null],
    ["x", "x", "x"],
  ];

  const isWinner = checkWinnerLeftToRight("x", board, 3, 2, 2);
  expect(isWinner).toEqual(true);
});

test("should show winner when last move x2 y1 in game 5*5", () => {
  const board = [
    [null, null, null, null, null],
    ["x", "x", "x", "x", null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
  ];

  const isWinner = checkWinnerLeftToRight("x", board, 4, 1, 2);
  expect(isWinner).toEqual(true);
});

test("should not show winner in game 5*5", () => {
  const board = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, "x", "x", "x", null],
  ];

  const isWinner = checkWinnerLeftToRight("o", board, 4, 4, 4);
  expect(isWinner).toEqual(false);
});

test("should  show winner in game 5*5", () => {
  const board = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, "x", "x", "x", "x"],
  ];

  const isWinner = checkWinnerLeftToRight("x", board, 4, 4, 4);
  expect(isWinner).toEqual(true);
});

test("should show winner when last move left x0 y0 in function checkWinnerTopToBottom", () => {
  const board = [
    ["x", null, null],
    ["x", null, null],
    ["x", null, null],
  ];

  const isWinner = checkWinnerTopToBottom("x", board, 3, 0, 0);
  expect(isWinner).toEqual(true);
});

test("should show winner when last move left x2 y2 in function checkWinnerTopToBottom", () => {
  const board = [
    [null, null, "x"],
    [null, null, "x"],
    [null, null, "x"],
  ];

  const isWinner = checkWinnerTopToBottom("x", board, 3, 2, 2);
  expect(isWinner).toEqual(true);
});

test("should  show winner in game 5*5 in function checkWinnerTopToBottom", () => {
  const board = [
    [null, null, null, null, null],
    [null, null, null, "x", null],
    [null, null, null, "x", null],
    [null, null, null, "x", null],
    [null, null, null, "x", null],
  ];

  const isWinner = checkWinnerTopToBottom("x", board, 4, 3, 3);
  expect(isWinner).toEqual(true);
});

test("should not show winner in game 5*5 in function checkWinnerTopToBottom", () => {
  const board = [
    [null, null, null, null, null],
    [null, null, null, "x", null],
    [null, null, null, "o", null],
    [null, null, null, "x", null],
    [null, null, null, "x", null],
  ];

  const isWinner = checkWinnerTopToBottom("x", board, 4, 4, 4);
  expect(isWinner).toEqual(false);
});

test("should show winner when last move left top corner", () => {
  const board = [
    ["x", null, null],
    [null, "x", null],
    [null, null, "x"],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("x", board, 3, 0, 0);
  expect(isWinner).toEqual(true);
});

test("should show winner when last move right bottom corner", () => {
  const board = [
    ["x", null, null],
    [null, "x", null],
    [null, null, "x"],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("x", board, 3, 2, 2);
  expect(isWinner).toEqual(true);
});

test("should not show winner", () => {
  const board = [
    [null, null, null, null],
    [null, "x", null, null],
    [null, null, "x", null],
    [null, null, null, "o"],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("o", board, 3, 3, 3);
  expect(isWinner).toEqual(false);
});

test("should  show winner", () => {
  const board = [
    [null, "x", null, null],
    [null, null, "x", null],
    [null, null, null, "x"],
    [null, null, null, null],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("x", board, 3, 2, 3);
  expect(isWinner).toEqual(true);
});

test("should show winner in game 10*10, last move x5 y4", () => {
  const board = [
    [null, "x", null, null, null, null, null, null, null, null],
    [null, null, "x", null, null, null, null, null, null, null],
    [null, null, null, "x", null, null, null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, null, null, "x", null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("x", board, 5, 4, 5);
  expect(isWinner).toEqual(true);
});

test("should show winner in game 10*10, last move x8 y9", () => {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, null, null, "x", null, null, null, null],
    [null, null, null, null, null, null, "x", null, null, null],
    [null, null, null, null, null, null, null, "x", null, null],
    [null, null, null, null, null, null, null, null, "x", null],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("x", board, 5, 9, 8);
  expect(isWinner).toEqual(true);
});
test("should show winner in game 10*10, last move x4 y5", () => {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, null, null, "x", null, null, null, null],
    [null, null, null, null, null, null, "x", null, null, null],
    [null, null, null, null, null, null, null, "x", null, null],
    [null, null, null, null, null, null, null, null, "x", null],
  ];

  const isWinner = checkWinnerLeftTopRightBottom("x", board, 5, 5, 4);
  expect(isWinner).toEqual(true);
});

test("should  show winner 5*5 last move x4 y3", () => {
  const board = [
    [null, "x", null, null, null],
    [null, null, "x", null, null],
    [null, null, null, "x", null],
    [null, null, null, null, "x"],
    [null, null, null, null, null],
  ];
  const isWinner = checkWinnerLeftTopRightBottom("x", board, 4, 3, 4);
  expect(isWinner).toEqual(true);
});
test("should  show winner 5*5 last move x1 y0", () => {
  const board = [
    [null, "x", null, null, null],
    [null, null, "x", null, null],
    [null, null, null, "x", null],
    [null, null, null, null, "x"],
    [null, null, null, null, null],
  ];
  const isWinner = checkWinnerLeftTopRightBottom("x", board, 4, 0, 1);
  expect(isWinner).toEqual(true);
});

test("should show winner when last move left bottom corner", () => {
  const board = [
    [null, null, "x"],
    [null, "x", null],
    ["x", null, null],
  ];

  const isWinner = checkWinnerLeftBottomRightTop("x", board, 3, 0, 2);
  expect(isWinner).toEqual(true);
});

test("should not show winner last move x0 y3", () => {
  const board = [
    [null, null, "x", null],
    [null, "x", null, null],
    ["o", null, null, null],
    [null, null, null, null],
  ];

  const isWinner = checkWinnerLeftBottomRightTop("o", board, 3, 0, 2);
  expect(isWinner).toEqual(false);
});

test("should show winner in game 10*10, last move x6 y5", () => {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "x", null],
    [null, null, null, null, null, null, null, "x", null, null],
    [null, null, null, null, null, null, "x", null, null, null],
    [null, null, null, null, null, "x", null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const isWinner = checkWinnerLeftBottomRightTop("x", board, 5, 5, 6);
  expect(isWinner).toEqual(true);
});

test("should show winner in game 10*10, last move x0 y7", () => {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, "x", null, null, null, null, null, null],
    [null, null, "x", null, null, null, null, null, null, null],
    [null, "x", null, null, null, null, null, null, null, null],
    ["x", null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const isWinner = checkWinnerLeftBottomRightTop("x", board, 5, 7, 0);
  expect(isWinner).toEqual(true);
});

test("should show winner in game 10*10, last move x0 y9", () => {
  const board = [
    [null, null, null, null, null, null, null, null, "x", null],
    [null, null, null, null, null, null, null, "x", null, null],
    [null, null, null, null, null, null, "x", null, null, null],
    [null, null, null, null, null, "x", null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const isWinner = checkWinnerLeftBottomRightTop("x", board, 5, 0, 8);
  expect(isWinner).toEqual(true);
});
test("should show winner in game 10*10, last move x4 - y5", () => {
  const board = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, "x", null],
    [null, null, null, null, null, null, null, "x", null, null],
    [null, null, null, null, null, null, "x", null, null, null],
    [null, null, null, null, null, "x", null, null, null, null],
    [null, null, null, null, "x", null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  const isWinner = checkWinnerLeftBottomRightTop("x", board, 5, 5, 4);
  expect(isWinner).toEqual(true);
});

test("should  show winner 5*5 last move x0 y3", () => {
  const board = [
    [null, null, null, "x", null],
    [null, null, "x", null, null],
    [null, "x", null, null, null],
    ["x", null, null, null, null],
    [null, null, null, null, null],
  ];
  const isWinner = checkWinnerLeftBottomRightTop("x", board, 4, 0, 3);
  expect(isWinner).toEqual(true);
});
test("should  show winner 5*5 last move x1 y04", () => {
  const board = [
    [null, null, null, null, null],
    [null, null, null, null, "x"],
    [null, null, null, "x", null],
    [null, null, "x", null, null],
    [null, "x", null, null, null],
  ];
  const isWinner = checkWinnerLeftBottomRightTop("x", board, 4, 1, 4);
  expect(isWinner).toEqual(true);
});
