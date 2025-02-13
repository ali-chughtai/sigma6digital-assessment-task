import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../style/LoginForm.module.css';

interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
  server?: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = { email: '', password: '' };

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            setIsLoading(true);
            setErrors((prevErrors) => ({ ...prevErrors, server: '' }));

            try {
            const response = await axios.post(`${import.meta.env.VITE_PROHOMEZ_BACKEND_URL}/api/auth/login`, formData);

            localStorage.setItem('token', response.data.token);

            // Redirect to vendor dashboard
            navigate('/vendor-dashboard');
            } catch (error: any) {
            console.error('Login error:', error);
            setErrors((prevErrors) => ({
                ...prevErrors,
                server: error.response?.data?.message || 'An error occurred during login.',
            }));
            } finally {
            setIsLoading(false);
            }
        }
    };


  return (
    <>
      <div className="container">
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className="container px-0 py-5 py-lg-0">
            <div className="row">
              <div className="col-sm-12 mb-3">
                <label htmlFor="email" className={styles.contactFormLabel}>
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${styles.contactFormInput} w-100`}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>

              <div className="col-sm-12 mb-3">
                <label htmlFor="password" className={styles.contactFormLabel}>
                  Password<span>*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${styles.contactFormInput} w-100`}
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>

              {errors.server && (
                <div className="col-sm-12 mb-3">
                  <small className="text-danger">{errors.server}</small>
                </div>
              )}

              <div className="col-sm-12 mb-3">
                <button type="submit" className={styles.contactFormSubmitBtn} disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Login'}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
