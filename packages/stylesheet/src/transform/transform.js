const parse = (transformString) => {
  const transforms = transformString.trim().split(/\)[ ,]|\)/);

  // Handle "initial", "inherit", "unset".
  if (transforms.length === 1) {
    return [[transforms[0], true]];
  }

  const parsed = [];

  for (let i = 0; i < transforms.length; i += 1) {
    const transform = transforms[i];

    if (transform) {
      const [name, rawValue] = transform.split("(");
      const splitChar = rawValue.indexOf(",") >= 0 ? "," : " ";
      const value = rawValue.split(splitChar).map((val) => val.trim());
      parsed.push({ operation: name.trim(), value });
    }
  }

  return parsed;
};

const parseAngle = (value) => {
  const unitsRegexp = /(-?\d*\.?\d*)(\w*)?/i;
  const [, angle, unit] = unitsRegexp.exec(value);
  const number = Number.parseFloat(angle);

  return unit === "rad" ? (number * 180) / Math.PI : number;
};

const normalizeTransformOperation = ({ operation, value }) => {
  switch (operation) {
    case "scale": {
      const [scaleX, scaleY = scaleX] = value.map((num) => Number.parseFloat(num));
      return { operation: "scale", value: [scaleX, scaleY] };
    }

    case "scaleX": {
      return { operation: "scale", value: [Number.parseFloat(value), 1] };
    }
    case "scaleY": {
      return { operation: "scale", value: [1, Number.parseFloat(value)] };
    }

    case "rotate": {
      return { operation: "rotate", value: [parseAngle(value)] };
    }

    case "translate": {
      return {
        operation: "translate",
        value: value.map((num) => Number.parseFloat(num)),
      };
    }

    case "translateX": {
      return {
        operation: "translate",
        value: [Number.parseFloat(value), 0],
      };
    }

    case "translateY": {
      return { operation: "translate", value: [0, Number.parseFloat(value)] };
    }

    case "skew": {
      return { operation: "skew", value: value.map(parseAngle) };
    }

    case "skewX": {
      return { operation: "skew", value: [parseAngle(value), 0] };
    }

    case "skewY": {
      return { operation: "skew", value: [0, parseAngle(value)] };
    }

    default: {
      return { operation, value: value.map((num) => Number.parseFloat(num)) };
    }
  }
};

const normalize = (operations) => {
  return operations.map((operation) => normalizeTransformOperation(operation));
};

const processTransform = (value) => {
  if (typeof value !== "string") return value;

  return normalize(parse(value));
};

export default processTransform;
