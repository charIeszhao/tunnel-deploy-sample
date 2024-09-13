import { type FormEvent, useCallback } from 'react';

import styles from './App.module.scss';

export const App = () => {
  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      await fetch('/api/experience', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interactionEvent: 'SignIn' }),
      });

      const verificationResponse = await fetch('/api/experience/verification/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: { type: 'username', value: formData.get('username') },
          password: formData.get('password'),
        }),
      });

      const { verificationId } = await verificationResponse.json<{ verificationId: string }>();

      await fetch('/api/experience/identification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationId }),
      });

      const submitResponse = await fetch('/api/experience/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const { redirectTo } = await submitResponse.json<{ redirectTo: string }>();
      window.location.replace(redirectTo);
    } catch (error) {
      console.error('Oops!', error);
    }
  }, []);
  return (
    <div className={styles.container}>
      <h1>Welcome Back</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input required type="text" id="username" name="username" />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input required type="password" id="password" name="password" />
        </div>
        <button type="submit" className={styles.button} id="loginButton">
          Login
        </button>
      </form>
    </div>
  );
};
