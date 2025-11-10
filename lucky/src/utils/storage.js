const STORAGE_KEYS = {
  FORTUNES: 'lucky_fortunes',
  ANIMATION_URL: 'lucky_animation_url',
  ADMIN_PASSWORD: 'lucky_admin_password'
};

// Google Sheets 설정
const GOOGLE_SHEETS_ID = '1RKfDDjDHEc5Dm27wpul2nRoSQIeYReiOQWbOkwyyQ4w';
const GOOGLE_SHEETS_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_ID}/export?format=csv`;

const DEFAULT_PASSWORD = 'admin1234';

// CSV 파싱 함수
const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const fortunes = [];

  // 첫 번째 줄은 헤더이므로 건너뛰기
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // CSV 파싱 (간단한 버전 - 따옴표 안의 쉼표 처리)
    const values = [];
    let currentValue = '';
    let insideQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === ',' && !insideQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    if (values.length >= 4) {
      const [id, title, content, color] = values;
      fortunes.push({
        id: parseInt(id) || Date.now() + i,
        title: title.replace(/^"|"$/g, ''),
        content: content.replace(/^"|"$/g, ''),
        color: color.replace(/^"|"$/g, '')
      });
    }
  }

  return fortunes;
};

// Google Sheets에서 운세 데이터 가져오기
export const fetchFortunesFromGoogleSheets = async () => {
  try {
    const response = await fetch(GOOGLE_SHEETS_CSV_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch Google Sheets data');
    }
    const csvText = await response.text();
    const fortunes = parseCSV(csvText);
    return fortunes;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return [];
  }
};

// 초기 데이터 설정
export const initializeStorage = async () => {
  // Google Sheets에서 운세 데이터 가져오기
  if (!localStorage.getItem(STORAGE_KEYS.FORTUNES)) {
    try {
      const fortunes = await fetchFortunesFromGoogleSheets();
      localStorage.setItem(STORAGE_KEYS.FORTUNES, JSON.stringify(fortunes));
    } catch (error) {
      console.error('Failed to initialize fortunes from Google Sheets:', error);
      localStorage.setItem(STORAGE_KEYS.FORTUNES, JSON.stringify([]));
    }
  }

  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, DEFAULT_PASSWORD);
  }
};

// 운세 관련 함수
export const getFortunes = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FORTUNES);
  return data ? JSON.parse(data) : [];
};

export const saveFortunes = (fortunes) => {
  localStorage.setItem(STORAGE_KEYS.FORTUNES, JSON.stringify(fortunes));
};

export const addFortune = (fortune) => {
  const fortunes = getFortunes();
  const newFortune = {
    ...fortune,
    id: Date.now()
  };
  saveFortunes([...fortunes, newFortune]);
  return newFortune;
};

export const updateFortune = (id, updatedFortune) => {
  const fortunes = getFortunes();
  const newFortunes = fortunes.map(f =>
    f.id === id ? { ...f, ...updatedFortune, id } : f
  );
  saveFortunes(newFortunes);
};

export const deleteFortune = (id) => {
  const fortunes = getFortunes();
  saveFortunes(fortunes.filter(f => f.id !== id));
};

export const getRandomFortune = () => {
  const fortunes = getFortunes();
  if (fortunes.length === 0) return null;
  return fortunes[Math.floor(Math.random() * fortunes.length)];
};

// 애니메이션 관련 함수
export const getAnimationUrl = () => {
  return localStorage.getItem(STORAGE_KEYS.ANIMATION_URL) || '';
};

export const saveAnimationUrl = (url) => {
  localStorage.setItem(STORAGE_KEYS.ANIMATION_URL, url);
};

// 비밀번호 관련 함수
export const checkPassword = (password) => {
  const savedPassword = localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD);
  return password === savedPassword;
};

export const changePassword = (newPassword) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPassword);
};
