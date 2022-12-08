import { benchmark } from "../src/helpFunctions";
import { asyncData, asyncFunctions } from "./test-data";

async function runTests() {
  const bench = await benchmark(asyncFunctions, asyncData);

  console.log("comparison", bench.comparison);
  console.log("benchmarks", bench.benchmarks);
}

runTests();
