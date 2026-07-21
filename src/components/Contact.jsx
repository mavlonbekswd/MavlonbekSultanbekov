import emailjs from '@emailjs/browser';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Seo from './Seo';
import { pageSeo, profile } from '../data/profile';
import {
  validateContactField,
  validateContactForm,
} from '../utils/contactValidation';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
  whatsapp: MessageCircle,
};

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef(null);
  const [errors, setErrors] = useState(
    /** @type {Record<string, string>} */ ({}),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleBlur = (event) => {
    const { name, value } = event.target;
    if (!['name', 'email', 'subject', 'message'].includes(name)) return;

    const error = validateContactField(name, value);
    setErrors((current) => ({ ...current, [name]: error }));
  };

  const handleChange = (event) => {
    const { name } = event.target;
    if (!errors[name]) return;
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus(null);

    const formData = new FormData(formRef.current);
    const values = /** @type {Record<string, string>} */ (
      Object.fromEntries(formData.entries())
    );
    const validation = validateContactForm(values);

    if (validation.isSpam) {
      formRef.current.reset();
      setErrors({});
      setStatus({ type: 'success', message: t('notification-success') });
      return;
    }

    if (!validation.isValid) {
      setErrors(validation.errors);
      const firstInvalidField = Object.keys(validation.errors)[0];
      formRef.current.elements[firstInvalidField]?.focus();
      setStatus({
        type: 'error',
        message: t('form-correct-errors'),
      });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({
        type: 'error',
        message: t('form-service-unavailable'),
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: 'loading', message: t('notification-sending') });

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey,
      );
      formRef.current.reset();
      setErrors({});
      setStatus({ type: 'success', message: t('notification-success') });
    } catch {
      setStatus({ type: 'error', message: t('notification-error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFieldError = (field) =>
    errors[field] ? (
      <p className="field-error" id={`${field}-error`}>
        {t(errors[field])}
      </p>
    ) : null;

  return (
    <>
      <Seo {...pageSeo.contact} />

      <article className="page-card contact-page">
        <header className="page-header">
          <div>
            <p className="eyebrow">{profile.professionalTitle}</p>
            <h1 data-page-heading tabIndex={-1}>
              {t('contact-title')}
            </h1>
            <p className="page-lead">{t('contact-description')}</p>
          </div>
        </header>

        <div className="contact-layout">
          <aside className="contact-details" aria-labelledby="contact-details">
            <div>
              <p className="eyebrow">{t('contact-details-eyebrow')}</p>
              <h2 id="contact-details">{t('contact-details')}</h2>
            </div>

            <address>
              <a className="contact-detail" href={`mailto:${profile.email}`}>
                <span className="icon-container">
                  <Mail aria-hidden="true" size={19} />
                </span>
                <span>
                  <small>{t('contact-email')}</small>
                  {profile.email}
                </span>
              </a>
              <div className="contact-detail">
                <span className="icon-container">
                  <MapPin aria-hidden="true" size={19} />
                </span>
                <span>
                  <small>{t('contact-location')}</small>
                  {profile.location}
                </span>
              </div>
            </address>

            <nav className="contact-socials" aria-label={t('social-links')}>
              {profile.socials
                .filter(
                  (social) =>
                    !social.requiresPhoneVisibility ||
                    profile.phone.showPhone,
                )
                .map((social) => {
                  const Icon = socialIcons[social.id];
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.label}
                    >
                      <Icon aria-hidden="true" size={20} />
                      <span>{social.label}</span>
                    </a>
                  );
                })}
            </nav>
          </aside>

          <section className="contact-form-panel" aria-labelledby="send-message">
            <h2 id="send-message">{t('send-message')}</h2>
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="name">
                    {t('form-name')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t('form-name-placeholder')}
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {renderFieldError('name')}
                </div>

                <div className="form-field">
                  <label htmlFor="email">
                    {t('form-email')} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder={t('form-email-placeholder')}
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {renderFieldError('email')}
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="subject">
                  {t('form-subject')} <span aria-hidden="true">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  autoComplete="off"
                  placeholder={t('form-subject-placeholder')}
                  required
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? 'subject-error' : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {renderFieldError('subject')}
              </div>

              <div className="form-field">
                <label htmlFor="message">
                  {t('form-message')} <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder={t('form-message-placeholder')}
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {renderFieldError('message')}
              </div>

              <div className="honeypot" aria-hidden="true">
                <label htmlFor="company">Company website</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div
                className={`form-status ${status?.type || ''}`.trim()}
                role={status?.type === 'error' ? 'alert' : 'status'}
                aria-live={status?.type === 'error' ? 'assertive' : 'polite'}
                aria-atomic="true"
              >
                {status?.message}
              </div>

              <button
                className="button button-primary submit-button"
                type="submit"
                disabled={isSubmitting}
              >
                <Send aria-hidden="true" size={18} />
                {isSubmitting ? t('form-sending') : t('form-submit')}
              </button>
            </form>
          </section>
        </div>
      </article>
    </>
  );
};

export default Contact;
