import { isNil, last } from "@easypliant/react-pdf-fns";

/**
 * Append glyph indices with given length
 *
 * Ex. appendIndices(3, [0, 1, 2, 2]) => [0, 1, 2, 2, 3, 3, 3]
 *
 * @param {number} length length
 * @param {number[]} indices glyph indices
 * @returns {number[]} extended glyph indices
 */
const appendIndices = (length, indices) => {
  const lastIndex = last(indices);
  const value = isNil(lastIndex) ? 0 : lastIndex + 1;
  const newIndices = Array(length).fill(value);

  return indices.concat(newIndices);
};

export default appendIndices;
