import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { profile } from '../data/profile';

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  telegram: Send,
  whatsapp: MessageCircle,
};

const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <aside className="profile-sidebar" aria-label={t('profile-summary')}>
      <div className="profile-card">
        <div className="profile-overview">
          <div className="avatar-frame">
            <img
              src={profile.avatar.src}
              srcSet={profile.avatar.srcSet}
              sizes="(max-width: 980px) 72px, 112px"
              alt={profile.avatar.alt}
              width="160"
              height="160"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            {profile.availability.available && (
              <span className="availability-dot" aria-hidden="true" />
            )}
          </div>

          <div className="profile-copy">
            {profile.availability.available && (
              <p
                className="availability-badge"
                title={profile.availability.detail}
              >
                <span aria-hidden="true" />
                {profile.availability.label}
              </p>
            )}
            <p className="profile-name">{profile.fullName}</p>
            <p className="profile-title">{profile.professionalTitle}</p>
            <p className="profile-context">{profile.secondaryContext}</p>
          </div>
        </div>

        {profile.cv.available && (
          <a
            className="button button-primary profile-cv"
            href={profile.cv.path}
            download={profile.cv.downloadName}
            aria-label={profile.cv.ariaLabel}
          >
            <Download aria-hidden="true" size={18} />
            {t('download-cv')}
          </a>
        )}

        <div className="profile-divider" aria-hidden="true" />

        <address className="profile-contact">
          <a href={`mailto:${profile.email}`}>
            <span className="icon-container">
              <Mail aria-hidden="true" size={18} />
            </span>
            <span>
              <small>{t('contact-email')}</small>
              {profile.email}
            </span>
          </a>

          {profile.phone.showPhone && (
            <a href={`tel:${profile.phone.value}`}>
              <span className="icon-container">
                <Phone aria-hidden="true" size={18} />
              </span>
              <span>
                <small>{t('contact-phone')}</small>
                {profile.phone.display}
              </span>
            </a>
          )}

          <div>
            <span className="icon-container">
              <MapPin aria-hidden="true" size={18} />
            </span>
            <span>
              <small>{t('contact-location')}</small>
              {profile.location}
            </span>
          </div>
        </address>

        <nav className="profile-socials" aria-label={t('social-links')}>
          {profile.socials
            .filter(
              (social) =>
                !social.requiresPhoneVisibility || profile.phone.showPhone,
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
                  <Icon aria-hidden="true" size={19} />
                </a>
              );
            })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
