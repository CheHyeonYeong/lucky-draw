import React, { useState, useEffect } from 'react';
import {
  checkPassword,
  getFortunes,
  addFortune,
  updateFortune,
  deleteFortune,
  getAnimationUrl,
  saveAnimationUrl
} from '../utils/storage';
import './Admin.css';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [fortunes, setFortunes] = useState([]);
  const [animationUrl, setAnimationUrl] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    color: '#667eea'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (authenticated) {
      loadData();
    }
  }, [authenticated]);

  const loadData = () => {
    setFortunes(getFortunes());
    setAnimationUrl(getAnimationUrl());
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (checkPassword(password)) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    if (editingId) {
      updateFortune(editingId, formData);
      setEditingId(null);
    } else {
      addFortune(formData);
    }

    setFormData({ title: '', content: '', color: '#667eea' });
    loadData();
    setError('');
  };

  const handleEdit = (fortune) => {
    setEditingId(fortune.id);
    setFormData({
      title: fortune.title,
      content: fortune.content,
      color: fortune.color
    });
  };

  const handleDelete = (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      deleteFortune(id);
      loadData();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', color: '#667eea' });
  };

  const handleSaveAnimation = () => {
    saveAnimationUrl(animationUrl);
    alert('애니메이션 URL이 저장되었습니다.');
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h1>관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button">로그인</button>
          </form>
          <p className="login-hint">기본 비밀번호: admin1234</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <h1>운세 관리</h1>
          <a href="#/" className="home-link">메인으로</a>
        </header>

        <section className="admin-section">
          <h2>애니메이션 설정</h2>
          <div className="animation-config">
            <input
              type="text"
              placeholder="애니메이션 영상 URL (mp4, mov, gif)"
              value={animationUrl}
              onChange={(e) => setAnimationUrl(e.target.value)}
              className="animation-input"
            />
            <button onClick={handleSaveAnimation} className="save-button">
              저장
            </button>
          </div>
          <p className="help-text">
            영상 파일을 public 폴더에 업로드하고 /video.mp4 형식으로 입력하세요
          </p>
        </section>

        <section className="admin-section">
          <h2>{editingId ? '운세 수정' : '운세 추가'}</h2>
          <form onSubmit={handleSubmit} className="fortune-form">
            <div className="form-group">
              <label>제목</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="예: 대길"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="운세 내용을 입력하세요"
                className="form-textarea"
                rows="4"
              />
            </div>
            <div className="form-group">
              <label>색상</label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="form-color"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="form-buttons">
              <button type="submit" className="submit-button">
                {editingId ? '수정' : '추가'}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancelEdit} className="cancel-button">
                  취소
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="admin-section">
          <h2>운세 목록 ({fortunes.length}개)</h2>
          <div className="fortune-list">
            {fortunes.map((fortune) => (
              <div key={fortune.id} className="fortune-item" style={{ borderLeftColor: fortune.color }}>
                <div className="fortune-info">
                  <h3>{fortune.title}</h3>
                  <p>{fortune.content}</p>
                </div>
                <div className="fortune-actions">
                  <button onClick={() => handleEdit(fortune)} className="edit-button">
                    수정
                  </button>
                  <button onClick={() => handleDelete(fortune.id)} className="delete-button">
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
