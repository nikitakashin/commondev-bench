import { benchmark } from "../src/helpFunctions";
import { data, functions } from "./test-data";

async function runTests() {
  const bench = await benchmark(functions, data);

  console.log("comparison", bench.comparison);
  console.log("benchmarks", bench.benchmarks);
}

runTests();
