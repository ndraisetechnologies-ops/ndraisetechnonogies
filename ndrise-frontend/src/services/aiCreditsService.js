/**
 * Client-Side AI Credits & Career History Manager
 * Manages 3 Free Credits per student, ₹10 Top-up, custom API key bypass, and saved ATS scans.
 */

const STORAGE_PREFIX = 'ndrise_ai_user_';

export const getStudentAiProfile = (userEmail = 'guest') => {
  try {
    const key = `${STORAGE_PREFIX}${userEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {}

  return {
    credits: 3,
    customApiKey: '',
    hasPaidTopup: false,
    history: [
      {
        id: 'sample-1',
        type: 'ats-scan',
        title: 'General Full-Stack Resume Analysis',
        score: 78,
        grade: 'Good',
        date: new Date(Date.now() - 86400000).toLocaleDateString()
      }
    ]
  };
};

export const saveStudentAiProfile = (userEmail, profile) => {
  try {
    const key = `${STORAGE_PREFIX}${userEmail.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    localStorage.setItem(key, JSON.stringify(profile));
  } catch (e) {}
};

export const consumeAiCredit = (userEmail) => {
  const profile = getStudentAiProfile(userEmail);

  // If user has a valid custom Gemini API key, usage is UNLIMITED!
  if (profile.customApiKey && profile.customApiKey.trim().length > 10) {
    return { success: true, isUnlimited: true, remaining: profile.credits };
  }

  if (profile.credits <= 0) {
    return { success: false, remaining: 0, reason: 'LIMIT_EXCEEDED' };
  }

  profile.credits = Math.max(0, profile.credits - 1);
  saveStudentAiProfile(userEmail, profile);

  return { success: true, isUnlimited: false, remaining: profile.credits };
};

export const addAiCredits = (userEmail, count = 3) => {
  const profile = getStudentAiProfile(userEmail);
  profile.credits += count;
  profile.hasPaidTopup = true;
  saveStudentAiProfile(userEmail, profile);
  return profile;
};

export const setCustomApiKey = (userEmail, apiKey) => {
  const profile = getStudentAiProfile(userEmail);
  profile.customApiKey = apiKey;
  saveStudentAiProfile(userEmail, profile);
  return profile;
};

export const saveAtsScanToHistory = (userEmail, scanResult) => {
  const profile = getStudentAiProfile(userEmail);
  const newScan = {
    id: `ats-${Date.now()}`,
    type: 'ats-scan',
    title: scanResult.analyzedFile || 'Resume Analysis',
    score: scanResult.score || 78,
    grade: scanResult.grade || 'Good',
    date: new Date().toLocaleDateString(),
    details: scanResult
  };

  profile.history = [newScan, ...(profile.history || [])];
  saveStudentAiProfile(userEmail, profile);
  return profile;
};
