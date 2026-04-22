'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AuditDefenseApp } from '@/components/audit-defense-app';

const ACCESS_PASSWORD = 'a2-wl';
const ACCESS_STORAGE_KEY = 'wl-access-granted';

export default function HomePage() {
  const [isGranted, setIsGranted] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const hasAccess = window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === 'true';
    if (hasAccess) {
      setIsGranted(true);
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.trim() === ACCESS_PASSWORD) {
      window.sessionStorage.setItem(ACCESS_STORAGE_KEY, 'true');
      setIsGranted(true);
      setError('');
      return;
    }

    setError('Неверный пароль. Проверьте ввод.');
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(ACCESS_STORAGE_KEY);
    setIsGranted(false);
    setPassword('');
    setError('');
  };

  if (isGranted) {
    return <AuditDefenseApp onLogout={handleLogout} />;
  }

  return (
    <main className="access-gate-shell">
      <div className="access-gate-panel premium-panel">
        <p className="access-gate-eyebrow">Конфиденциальные материалы</p>
        <h1 className="access-gate-title">WestLine AS-IS Audit Defense</h1>
        <p className="access-gate-text">
          Доступ к презентации ограничен. Для входа введите пароль, предоставленный ответственным консультантом.
        </p>

        <form className="access-gate-form" onSubmit={handleSubmit}>
          <label className="access-gate-label" htmlFor="access-password">
            Пароль
          </label>
          <input
            id="access-password"
            className="access-gate-input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Введите пароль"
          />
          {error ? <p className="access-gate-error">{error}</p> : null}
          <button type="submit" className="access-gate-button">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}
