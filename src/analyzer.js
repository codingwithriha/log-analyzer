function analyzeLogs(logs, malformedLines) {

  const statusCodes = {};

  const endpoints = {};

  let totalResponseTime = 0;

  
  for (const log of logs) {

   
    if (log.status) {

      statusCodes[log.status] =
        (statusCodes[log.status] || 0) + 1;
    }

   
    const endpointKey =
      `${log.method} ${log.path}`;

    endpoints[endpointKey] =
      (endpoints[endpointKey] || 0) + 1;

   
    if (log.responseTime) {
      totalResponseTime += log.responseTime;
    }
  }


  const averageResponseTime =
    logs.length > 0
      ? (totalResponseTime / logs.length).toFixed(2)
      : 0;

  return {
    totalValidLogs: logs.length,
    malformedLines,
    averageResponseTime: `${averageResponseTime} ms`,
    statusCodes,
    endpoints
  };
}

module.exports = analyzeLogs;