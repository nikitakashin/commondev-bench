import { unitTestBenchmark } from "../src/helpFunctions";
import { singleFunc, singleData } from "./test-data";

async function runTests() {
  const bench = await unitTestBenchmark(singleFunc, singleData, 30000, 1);

  console.log(bench);
}

runTests();
