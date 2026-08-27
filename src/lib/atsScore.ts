export interface AtsScoreCheck {
  label: string;
  passed: boolean;
  note: string;
}

export interface AtsScoreResult {
  score: number; // 0-100
  checks: AtsScoreCheck[];
}

const EMAIL_REGEX = /[^\s@]+@[^\s@]+\.[^\s@]+/;
const PHONE_REGEX = /(\+?\d[\d\s().-]{7,}\d)/;

function countBulletLines(text: string): number {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\s*[-•*]|^\s*\d+[.)]/.test(line))
    .length;
}

export function scoreResume(resumeText: string, targetKeywords: string): AtsScoreResult {
  const text = resumeText.trim();
  const lowerText = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const checks: AtsScoreCheck[] = [];
  let score = 0;

  const goodLength = wordCount >= 250 && wordCount <= 900;
  checks.push({
    label: "Resume length",
    passed: goodLength,
    note: goodLength
      ? `${wordCount} words — a solid length for most roles.`
      : wordCount < 250
      ? `Only ${wordCount} words — likely too short to show enough detail.`
      : `${wordCount} words — may be longer than most recruiters scan comfortably.`,
  });
  score += goodLength ? 15 : wordCount >= 150 && wordCount <= 1200 ? 8 : 0;

  const hasEmail = EMAIL_REGEX.test(text);
  checks.push({
    label: "Contact email present",
    passed: hasEmail,
    note: hasEmail ? "Found an email address." : "No email address detected.",
  });
  score += hasEmail ? 10 : 0;

  const hasPhone = PHONE_REGEX.test(text);
  checks.push({
    label: "Phone number present",
    passed: hasPhone,
    note: hasPhone ? "Found a phone number." : "No phone number detected.",
  });
  score += hasPhone ? 10 : 0;

  const sections = [
    { key: "experience", label: "Experience section" },
    { key: "education", label: "Education section" },
    { key: "skills", label: "Skills section" },
  ];
  for (const s of sections) {
    const present = lowerText.includes(s.key);
    checks.push({
      label: s.label,
      passed: present,
      note: present ? `"${s.label}" heading found.` : `No clear "${s.label}" heading found.`,
    });
    score += present ? 10 : 0;
  }

  const bulletCount = countBulletLines(text);
  const hasBullets = bulletCount >= 5;
  checks.push({
    label: "Uses bullet points",
    passed: hasBullets,
    note: hasBullets
      ? `${bulletCount} bullet points found — easy for ATS and recruiters to scan.`
      : "Few or no bullet points found — ATS and recruiters prefer scannable bullets over paragraphs.",
  });
  score += hasBullets ? 15 : bulletCount >= 2 ? 7 : 0;

  const keywords = targetKeywords
    .split(/[,\n]/)
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean);

  if (keywords.length > 0) {
    const matched = keywords.filter((k) => lowerText.includes(k));
    const matchRatio = matched.length / keywords.length;
    checks.push({
      label: "Target keyword match",
      passed: matchRatio >= 0.5,
      note: `${matched.length} of ${keywords.length} target keywords found in your resume.`,
    });
    score += Math.round(matchRatio * 20);
  } else {
    score += 10;
  }

  return { score: Math.min(100, score), checks };
}