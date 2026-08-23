/**
 * Code-submission validators for an interactive answer box.
 *
 * SQL and Excel are truly executable in the browser, so we RUN the
 * student's answer and compare RESULTS. DAX and Tableau calc fields
 * have no browser-side engine, so we either:
 *   (a) ask for the resulting value instead of the formula, or
 *   (b) do structural/pattern validation on the formula text.
 *
 * npm install sql.js hyperformula
 */

// ---------------------------------------------------------------------
// 1. SQL — executed via sql.js (SQLite/WASM). Compares RESULT SETS,
//    not query text, so any correct query passes regardless of style.
// ---------------------------------------------------------------------
import initSqlJs from "sql.js";

export class SQLValidator {
  constructor() {
    this.SQL = null;
  }

  async init() {
    this.SQL = await initSqlJs({
      locateFile: (f) => `https://sql.js.org/dist/${f}`,
    });
  }

  loadDataset(schemaSQL, seedDataSQL) {
    const db = new this.SQL.Database();
    db.run(schemaSQL);
    db.run(seedDataSQL);
    return db;
  }

  runQuery(db, query) {
    try {
      return { success: true, data: db.exec(query) };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  compareResults(studentResult, expectedResult, { orderMatters = false } = {}) {
    if (!studentResult.length || !expectedResult.length) {
      return studentResult.length === expectedResult.length;
    }
    const studentRows = studentResult[0].values;
    const expectedRows = expectedResult[0].values;
    if (studentRows.length !== expectedRows.length) return false;

    const normalize = (rows) =>
      orderMatters
        ? rows
        : [...rows].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    return JSON.stringify(normalize(studentRows)) === JSON.stringify(normalize(expectedRows));
  }

  // wrongPatterns: [{ test: sqlLower => boolean, feedback: "..." }]
  check(schemaSQL, seedDataSQL, studentQuery, correctQuery, wrongPatterns = []) {
    const db = this.loadDataset(schemaSQL, seedDataSQL);
    const studentRes = this.runQuery(db, studentQuery);

    if (!studentRes.success) {
      db.close();
      return { correct: false, message: `SQL error: ${studentRes.error}` };
    }

    const correctRes = this.runQuery(db, correctQuery);
    const isCorrect = this.compareResults(studentRes.data, correctRes.data);
    db.close();

    if (isCorrect) return { correct: true, message: "Correct!" };

    const lower = studentQuery.toLowerCase();
    const matched = wrongPatterns.find((w) => w.test(lower));
    return {
      correct: false,
      message: matched
        ? matched.feedback
        : "Query ran but returned the wrong results — check filters, joins, or grouping.",
    };
  }
}

// Example wrong-answer library for a "distinct customers" question:
export const sqlWrongPatterns = [
  {
    test: (q) => q.includes("count(") && !q.includes("distinct"),
    feedback: "Did you need COUNT(DISTINCT ...) here instead of a plain COUNT?",
  },
  {
    test: (q) => q.includes("count(") && !q.includes("group by"),
    feedback: "You're aggregating without GROUP BY — check if you need to group by another column.",
  },
];

// ---------------------------------------------------------------------
// 2. Excel — executed via HyperFormula. Evaluates the student's exact
//    formula against seeded cell data and compares the numeric output.
// ---------------------------------------------------------------------
import { HyperFormula } from "hyperformula";

export class ExcelValidator {
  constructor() {
    this.hf = HyperFormula.buildEmpty({ licenseKey: "gpl-v3" });
  }

  // seedData: 2D array representing the sheet, e.g. [["Region","Sales"],["East",100]]
  check(seedData, studentFormula, expectedValue, { tolerance = 0.001 } = {}) {
    const sheetName = this.hf.addSheet("Test");
    const sheetId = this.hf.getSheetId(sheetName);
    this.hf.setSheetContent(sheetId, seedData);

    const cell = { sheet: sheetId, col: 0, row: seedData.length };

    try {
      this.hf.setCellContents(cell, [[studentFormula]]);
    } catch (err) {
      this.hf.removeSheet(sheetId);
      return { correct: false, message: `Formula error: ${err.message}` };
    }

    const result = this.hf.getCellValue(cell);
    this.hf.removeSheet(sheetId);

    if (result && typeof result === "object" && result.type === "ERROR") {
      return { correct: false, message: `Formula returned an error: ${result.value}` };
    }

    const isCorrect =
      typeof result === "number"
        ? Math.abs(result - expectedValue) < tolerance
        : result === expectedValue;

    return {
      correct: isCorrect,
      message: isCorrect ? "Correct!" : `Your formula returned ${result}, expected ${expectedValue}.`,
    };
  }
}

// ---------------------------------------------------------------------
// 3. DAX (Power BI) & Tableau calculated fields — NOT executable
//    client-side. Two viable strategies:
//
//    Strategy A (recommended): don't grade the formula at all — ask
//    the student "what value does your measure return?" and validate
//    that number with a simple equality/tolerance check.
//
//    Strategy B: structural/pattern validation on the formula text.
// ---------------------------------------------------------------------
export class FormulaPatternValidator {
  // config: {
  //   requiredFunctions: string[],
  //   forbiddenFunctions: string[],
  //   wrongPatterns: [{ test: normalizedText => boolean, feedback: string }]
  // }
  check(studentFormula, config) {
    const { requiredFunctions = [], forbiddenFunctions = [], wrongPatterns = [] } = config;
    const normalized = studentFormula.toLowerCase().replace(/\s+/g, " ");

    for (const fn of requiredFunctions) {
      if (!normalized.includes(fn.toLowerCase())) {
        return { correct: false, message: `Your formula should use ${fn}.` };
      }
    }
    for (const fn of forbiddenFunctions) {
      if (normalized.includes(fn.toLowerCase())) {
        return { correct: false, message: `Try a more direct approach — avoid ${fn} here.` };
      }
    }

    const matched = wrongPatterns.find((w) => w.test(normalized));
    if (matched) return { correct: false, message: matched.feedback };

    // Structural checks passed. This is NOT proof of correctness —
    // pair it with an output-value question (Strategy A) if you need
    // real certainty.
    return { correct: "needs_review", message: "Structure looks right." };
  }
}

// Example DAX config — "total sales for the current filter context":
export const daxTotalSalesConfig = {
  requiredFunctions: ["sum("],
  forbiddenFunctions: ["sumx("], // overkill for a plain column sum
  wrongPatterns: [
    {
      test: (f) => f.includes("sum(") && f.includes("all("),
      feedback: "ALL() removes filters — that'll ignore the slicers/filters on the report page.",
    },
  ],
};

// Example Tableau calculated-field config — "profit ratio":
export const tableauProfitRatioConfig = {
  requiredFunctions: ["sum(", "/"],
  forbiddenFunctions: ["avg("], // averaging a ratio is a common mistake vs. sum/sum
  wrongPatterns: [
    {
      test: (f) => f.includes("avg(") || f.includes("average("),
      feedback: "Averaging pre-aggregated ratios distorts the result — use SUM(Profit)/SUM(Sales) instead.",
    },
  ],
};

// ---------------------------------------------------------------------
// 4. Strategy A in practice — output-value check for DAX/Tableau
//    (works for any tool, since you're just comparing a number/string
//    the student reports or that your backend pulls from a rendered
//    visual/screenshot-adjacent value).
// ---------------------------------------------------------------------
export function checkOutputValue(studentValue, expectedValue, { tolerance = 0.01 } = {}) {
  const a = Number(studentValue);
  const b = Number(expectedValue);
  const isCorrect = !Number.isNaN(a) && !Number.isNaN(b)
    ? Math.abs(a - b) < tolerance
    : String(studentValue).trim() === String(expectedValue).trim();

  return {
    correct: isCorrect,
    message: isCorrect ? "Correct!" : `Expected ${expectedValue}, got ${studentValue}.`,
  };
}
