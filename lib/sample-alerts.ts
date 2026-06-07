import type { SampleAlert } from "@/lib/types"

export const sampleAlerts: SampleAlert[] = [
  {
    id: "powershell-word",
    title: "Suspicious PowerShell",
    category: "Endpoint",
    severityHint: "High",
    alert: `Alert: Suspicious PowerShell execution detected
Host: WIN-ENDPOINT-07
User: j.smith
Process: powershell.exe -nop -w hidden -enc SQBFAFgA
Parent Process: winword.exe
Source IP: 10.0.5.21
Timestamp: 2026-06-07 09:21:44
Detection: Office child process with encoded PowerShell`,
  },
  {
    id: "vpn-bruteforce",
    title: "VPN Brute Force",
    category: "Identity",
    severityHint: "Medium",
    alert: `Alert: Multiple failed VPN login attempts
User: m.chen
Source IP: 185.199.110.44
Target: vpn-gateway-02
Failed Attempts: 46
Successful Login: No
Geo: Country differs from user's usual login region
Timestamp: 2026-06-07 10:02:18`,
  },
  {
    id: "data-exfiltration",
    title: "Possible Exfiltration",
    category: "Network",
    severityHint: "Critical",
    alert: `Alert: Unusual outbound data transfer
Host: FINANCE-LAPTOP-12
User: a.nguyen
Destination IP: 203.0.113.91
Destination Port: 443
Data Sent: 4.8 GB
Process: unknown.exe
Time Window: 17 minutes
Notes: Transfer occurred outside normal business hours`,
  },
  {
    id: "local-admin",
    title: "New Local Admin",
    category: "Endpoint",
    severityHint: "High",
    alert: `Alert: Suspicious local administrator account creation
Host: APP-SERVER-03
User: svc-backup
Event ID: 4720, 4732
New Account: helpdesk-temp
Group Added: Administrators
Source IP: 10.0.7.42
Timestamp: 2026-06-07 02:44:12`,
  },
  {
    id: "malware-detection",
    title: "Malware Detection",
    category: "Endpoint",
    severityHint: "High",
    alert: `Alert: Endpoint malware detection
Host: HR-DESKTOP-22
User: r.patel
Detection Name: Trojan.GenericKD.481516
File Path: C:\\Users\\r.patel\\Downloads\\invoice_review.exe
Action Taken: Quarantined
Parent Process: chrome.exe
Hash: 7f83b1657ff1fc53b92dc18148a1d65d
Timestamp: 2026-06-07 13:31:06`,
  },
]
