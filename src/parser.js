function parseLine(line) {

  if (!line || !line.trim()) {
    return null;
  }

  line = line.trim();

  if (line.startsWith("{")) {

    try {

      const log = JSON.parse(line);

      return {
        timestamp: log.timestamp || null,
        ip: log.ip || null,
        method: log.method || null,
        path: log.path || null,
        status: log.status || null,
        responseTime: normalizeResponseTime(log.responseTime)
      };

    } catch {
      return null;
    }
  }

  const parts = line.split(" ");

  if (parts.length < 6) {
    return null;
  }

  return {
    timestamp: parts[0],
    ip: parts[1],
    method: parts[2],
    path: parts[3],
    status: parts[4] === "-"
      ? null
      : Number(parts[4]),
    responseTime: normalizeResponseTime(parts[5])
  };
}

function normalizeResponseTime(value) {

  if (!value) {
    return null;
  }

  if (value.endsWith("ms")) {
    return Number(value.replace("ms", ""));
  }

  if (value.endsWith("s")) {
    return Number(value.replace("s", "")) * 1000;
  }

  return Number(value);
}

module.exports = parseLine;