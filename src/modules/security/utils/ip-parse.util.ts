import * as ipaddr from "ipaddr.js";

function compareIps(a: ipaddr.IPv4 | ipaddr.IPv6, b: ipaddr.IPv4 | ipaddr.IPv6): number {
  const ab = a.toByteArray();
  const bb = b.toByteArray();
  for (let i = 0; i < ab.length; i++) {
    if (ab[i] < bb[i]) return -1;
    if (ab[i] > bb[i]) return 1;
  }
  return 0;
}

export function isIpAllowedAgainstRecord(requestIp: string, ipFrom: string, ipTo?: string | null): boolean {
  try {
    const req = ipaddr.parse(requestIp);
    const from = ipaddr.parse(ipFrom);

    if (ipTo) {
      const to = ipaddr.parse(ipTo);

      if (req.kind() !== from.kind() || from.kind() !== to.kind()) {
        return false; // v4 vs v6 mismatch
      }

      return compareIps(req, from) >= 0 && compareIps(req, to) <= 0;
    }

    // Only ipFrom provided → exact match
    return req.kind() === from.kind() && compareIps(req, from) === 0;
  } catch {
    return false; // invalid IP string
  }
}
