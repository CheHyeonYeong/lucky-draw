const STORAGE_KEYS = {
  FORTUNES: 'lucky_fortunes',
  ANIMATION_URL: 'lucky_animation_url',
  ADMIN_PASSWORD: 'lucky_admin_password'
};

const DEFAULT_FORTUNES = [
  {
    id: 1,
    title: '대길',
    content: '오늘은 행운이 가득한 날! 새로운 시도를 해보세요. 예상치 못한 좋은 일이 생길 거예요.',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: '중길',
    content: '차근차근 노력하면 좋은 결과가 있을 거예요. 조급해하지 말고 한 걸음씩 나아가세요.',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: '소길',
    content: '작은 행복을 발견하는 하루가 될 거예요. 주변 사람들에게 감사함을 표현해보세요.',
    color: '#95E1D3'
  },
  {
    id: 4,
    title: '평',
    content: '평범한 하루지만 그 속에서 평온함을 느낄 수 있어요. 휴식을 취하기 좋은 날입니다.',
    color: '#FFA07A'
  },
  {
    id: 5,
    title: '희망',
    content: '어려움이 있더라도 희망을 잃지 마세요. 곧 좋은 일이 생길 거예요. 긍정적인 마음을 유지하세요.',
    color: '#9B59B6'
  }
];

const DEFAULT_PASSWORD = 'admin1234';

// 초기 데이터 설정
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.FORTUNES)) {
    localStorage.setItem(STORAGE_KEYS.FORTUNES, JSON.stringify(DEFAULT_FORTUNES));
  }
  if (!localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD)) {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, DEFAULT_PASSWORD);
  }
};

// 운세 관련 함수
export const getFortunes = () => {
  const data = localStorage.getItem(STORAGE_KEYS.FORTUNES);
  return data ? JSON.parse(data) : DEFAULT_FORTUNES;
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
