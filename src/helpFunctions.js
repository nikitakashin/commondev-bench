const amountOfTests = 5;
const amountOfIterations = 5000000;
// const amountOfTests = 10;
// const amountOfIterations = 3;

const call = async (func, data, isAsync) => {
  if (isAsync) {
    await func.call(null, data);
  } else {
    func.call(null, data);
  }
};

const round = function (number, simbolsAfterComma) {
  return parseFloat(number.toFixed(simbolsAfterComma));
};

const bench = async (func, data, isAsync, amount = amountOfIterations) => {
  const start = Date.now() / 1000;

  for (let i = 0; i < amount; i++) {
    await call(func, data, isAsync);
  }

  const end = Date.now() / 1000;

  return end - start;
};

const makeSingleBenchResults = (
  results,
  nameOfFunction,
  amount = amountOfIterations
) => {
  const arithmeticMean =
    results.reduce((acc, num) => acc + num, 0) / amountOfTests;

  const time = round(arithmeticMean, 3);
  const speedRaw = Math.round(amount / arithmeticMean);
  const unit = speedRaw < 25 ? "min" : "sec";
  const speed =
    speedRaw < 25 ? Math.round((amount / arithmeticMean) * 60) : speedRaw;

  return {
    benchResult: {
      name: nameOfFunction,
      results: results,
      time: {
        title: "Arithmetic mean time (sec)",
        value: time,
      },
      speed: {
        title: `Speed (ops / ${unit})`,
        value: speed,
      },
    },
    speed: speed,
  };
};

export const benchmark = async (functions, data) => {
  const benchResults = {
    comparison: [],
    benchmarks: {},
  };

  const amountOfSteps = Object.keys(functions).length * amountOfTests;
  const stepSize = 100 / amountOfSteps;
  let step = 0;
  let process = 0;

  for (let key in functions) {
    const results = [];

    const functionsCopy = Object.create(
      Object.getPrototypeOf(functions),
      Object.getOwnPropertyDescriptors(functions)
    );
    const syncOrAsync = functionsCopy[key](data);

    const isAsync = syncOrAsync instanceof Promise;

    for (let i = 0; i < amountOfTests; i++) {
      const result = await bench(functions[key], data, isAsync);
      results.push(result);
      process += stepSize;
      step += 1;
      console.log(`Step ${step}/${amountOfSteps} - ${Math.round(process)}%`);
    }

    const { benchResult, speed } = makeSingleBenchResults(results, key);

    benchResults.benchmarks[key] = benchResult;
    benchResults.comparison.push({ [key]: speed });
  }

  benchResults.comparison.sort((method1, method2) => {
    return method2[Object.keys(method2)[0]] - method1[Object.keys(method1)[0]];
  });

  return benchResults;
};

export const unitTestBenchmark = async (
  func,
  data,
  amount = amountOfIterations,
  maxTime = 3
) => {
  const results = [];
  const max = parseFloat(maxTime);

  for (let i = 0; i < amountOfTests; i++) {
    const result = await bench(func, data, amount);
    results.push(result);
  }

  const { benchResult } = makeSingleBenchResults(results, func.name, amount);

  return max >= benchResult.time.value;
};
