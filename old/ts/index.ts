type ConversionSucceeded = {
  kind: 'success'
  value: number
};

type ConversionFailed = {
  kind: 'failure'
  reason: string
};

type ConversionResult = ConversionSucceeded | ConversionFailed;

function safeNumber(s: string): ConversionResult {
  const n: number = Number(s);
  if (Number.isNaN(n)) {
    return {kind: 'failure', reason: 'conversion returned a NaN'};
  } else {
    return {kind: 'success', value: n};
  }
}

safeNumber('1')
