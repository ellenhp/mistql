// Parser Types
export type AstLiteralExpression =
  | {
    type: "literal";
    valueType: "string";
    value: string;
  }
  | {
    type: "literal";
    valueType: "number";
    value: number;
  }
  | {
    type: "literal";
    valueType: "boolean";
    value: boolean;
  }
  | {
    type: "literal";
    valueType: "array";
    value: Array<AstExpression>;
  }
  | {
    type: "literal";
    valueType: "null";
    value: null;
  }
  | {
    type: "literal";
    valueType: "object";
    value: { [key: string]: AstExpression };
  };

export type AstPipelineExpression = {
  type: "pipeline";
  stages: AstExpression[];
};

export type AstReferenceExpression = {
  type: "reference";
  ref: string;
  internal?: true;
};

export type AstApplicationExpression = {
  type: "application";
  function: AstExpression;
  arguments: AstExpression[];
};

export type AstExpression =
  | AstApplicationExpression
  | AstReferenceExpression
  | AstPipelineExpression
  | AstLiteralExpression;

/* Runtime types */
export type RuntimeValue =
  | RuntimeValue[]
  | { [key: string]: RuntimeValue }
  | ExecutionFunction
  | RegExp
  | number
  | boolean
  | string
  | null
  | any; // TODO: Remove this one.

export type RuntimeValueType =
  | "array"
  | "object"
  | "regex"
  | "number"
  | "boolean"
  | "string"
  | "function"
  | "null";

export type Closure = {
  [varname: string]: RuntimeValue;
};
export type Stack = Closure[];

export type ExecutionFunction = (
  exp: AstExpression,
  stack: Stack
) => RuntimeValue;
export type BuiltinFunction = (
  args: AstExpression[],
  stack: Stack,
  executeInner: ExecutionFunction
) => RuntimeValue;

export type LexToken =
  | {
    token: "value";
    value: string | number | boolean | null;
    position: number;
  }
  | {
    token: "ref";
    value: string;
    position: number;
  }
  | {
    token: "special";
    value: string;
    position: number;
  };
