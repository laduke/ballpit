function safeNumber(s) {
    var n = Number(s);
    if (Number.isNaN(n)) {
        return { kind: 'failure', reason: 'conversion returned a NaN' };
    }
    else {
        return { kind: 'success', value: n };
    }
}
safeNumber('1');
