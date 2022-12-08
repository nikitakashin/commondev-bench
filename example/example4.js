import { benchmark } from "../src/helpFunctions";
import { stringData, stringFunctions } from "./test-data";

async function runTests() {
  const bench = await benchmark(stringFunctions, stringData);

  console.log("comparison", bench.comparison);
  console.log("benchmarks", bench.benchmarks);
}

runTests();
