import { Badge, BadgeAlign } from "../cards/types";
import { formatHexColor } from "./hex-color";

/**
 * Validates the line.
 * If the line is not valid, it returns 1.
 * The line is invalid when it's not a number or less than one.
 *
 * @param {number} lineCount The number of lines.
 * @returns {number} A valid lineCount.
 */
export const validateLineCount = (lineCount: string): number => {
  const lineNum = parseInt(lineCount);

  // it's not a number
  if (isNaN(lineNum)) {
    return 1;
  }

  // it's less than one
  return lineNum < 1 ? 1 : lineNum;
};

/**
 * Validates the given align.
 *
 * @param {string} align The alignment
 * @returns {BadgeAlign} A valid BadgeAlign
 */
export const validateAlign = (align: string): BadgeAlign => {
  switch (align) {
    case "left":
      return "left";
    case "center" || "middle":
      return "center";
    case "right":
      return "right";
    default:
      return "left";
  }
};

/**
 * Converts the line into a Badge array.
 * If there's any error in the line,
 * it returns an empty array.
 *
 * @param {string} line The line.
 * @returns {Badge[]} The converted badges
 */
export const validateLine = (line: string): Badge[] => {
  // replace the comma and the semicolon if the line contains "base64"
  line = line.replace(";base64,", "-base64-");

  // split the line by semicolon
  // each item in this array is one single badge
  const splitBySemi = line.split(";");

  // there are no badges
  if (splitBySemi.length < 1) {
    return [];
  }

  const badges: Badge[] = [];

  // example badgeLine: react,react,ffffff
  // {logoName},{label (badge text)},{logoColor}
  for (const badgeLine of splitBySemi) {
    // this should have 3 items
    const splitByComma = badgeLine.split(",");

    if (splitByComma.length !== 3) {
      continue;
    }

    // add the comma and the semicolon back
    const logoName = splitByComma[0].replace("-base64-", ";base64,");

    const logoColor =
      splitByComma[2] === "auto" ? "" : formatHexColor(splitByComma[2]);

    badges.push({
      logoName: logoName,
      label: splitByComma[1],
      logoColor: logoColor,
    });
  }

  return badges;
};
