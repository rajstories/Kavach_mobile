import { COLORS } from '../constants/colors';
import type { SeverityLevel, IncidentStatus } from '../types';

// ─── Severity Helpers ───────────────────────────────────────

const SEVERITY_COLOR_MAP: Record<SeverityLevel, string> = {
  CRITICAL: COLORS.critical,
  HIGH: COLORS.high,
  MEDIUM: COLORS.medium,
  LOW: COLORS.low,
};

const SEVERITY_BG_MAP: Record<SeverityLevel, string> = {
  CRITICAL: COLORS.criticalBg,
  HIGH: COLORS.highBg,
  MEDIUM: COLORS.mediumBg,
  LOW: COLORS.lowBg,
};

const SEVERITY_LABEL_MAP: Record<SeverityLevel, string> = {
  CRITICAL: 'Critical',
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low',
};

export function getSeverityColor(severity: SeverityLevel): string {
  return SEVERITY_COLOR_MAP[severity] ?? COLORS.textMuted;
}

export function getSeverityBgColor(severity: SeverityLevel): string {
  return SEVERITY_BG_MAP[severity] ?? COLORS.bgPage;
}

export function getSeverityLabel(severity: SeverityLevel): string {
  return SEVERITY_LABEL_MAP[severity] ?? severity;
}

// ─── Status Helpers ─────────────────────────────────────────

const STATUS_COLOR_MAP: Record<IncidentStatus, string> = {
  OPEN: COLORS.critical,
  IN_PROGRESS: COLORS.saffron,
  CONTAINED: COLORS.warning,
  RESOLVED: COLORS.success,
};

export function getStatusColor(status: IncidentStatus): string {
  return STATUS_COLOR_MAP[status] ?? COLORS.textMuted;
}

export function getStatusLabel(status: IncidentStatus): string {
  const labels: Record<IncidentStatus, string> = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    CONTAINED: 'Contained',
    RESOLVED: 'Resolved',
  };
  return labels[status] ?? status;
}

// ─── Time Helpers ───────────────────────────────────────────

export function timeAgo(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return `${diffSec}s ago`;

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} min ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
}

export function formatIST(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }) + ' IST';
}

// ─── Classification → Title ─────────────────────────────────

const CLASSIFICATION_MAP: Record<string, string> = {
  brute_force: 'Brute Force Attack',
  ddos: 'DDoS Attack',
  sql_injection: 'SQL Injection',
  data_exfiltration: 'Data Exfiltration',
  credential_stuffing: 'Credential Stuffing',
  port_scan: 'Port Scan',
  phishing_attempt: 'Phishing Attempt',
  malware: 'Malware Detected',
  ransomware: 'Ransomware Attack',
  insider_threat: 'Insider Threat',
  xss: 'Cross-Site Scripting (XSS)',
  man_in_the_middle: 'Man-in-the-Middle Attack',
};

export function getIncidentTitle(classification: string): string {
  return (
    CLASSIFICATION_MAP[classification] ??
    classification
      .split('_')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
}
