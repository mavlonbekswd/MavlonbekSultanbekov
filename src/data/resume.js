export const experience = Object.freeze([
  {
    id: 'itransition',
    roleKey: 'itransition-role',
    organisationKey: 'itransition-title',
    dateKey: 'itransition-date',
    contextKey: 'itransition-duration',
    organisationUrl: 'https://www.itransition.com',
    bulletKeys: [
      'itransition-description1',
      'itransition-description2',
    ],
    group: 'data',
  },
  {
    id: 'speed-fix',
    roleKey: 'speedfix-role',
    organisationKey: 'speedfix-title',
    dateKey: 'speedfix-date',
    contextKey: 'speedfix-duration',
    organisationUrl: 'https://www.speedyplumbingdrain.co.uk/',
    bulletKeys: ['speedfix-description1', 'speedfix-description2'],
    group: 'software',
  },
]);

export const education = Object.freeze([
  {
    id: 'aru',
    qualificationKey: 'aru-degree',
    institutionKey: 'aru-title',
    dateKey: 'aru-date',
    institutionUrl: 'https://aru.ac.uk',
    bulletKeys: ['aru-description1', 'aru-description2'],
  },
]);

export const certifications = Object.freeze([
  {
    id: 'maab-data-analytics',
    title: 'Data Analytics (SQL, Python, Power BI)',
    issuer: 'MAAB Innovation LLC',
    recipient: 'Sultonbekov Mavlonbek',
    issueDate: '31 March 2026',
    issueDateIso: '2026-03-31',
    credentialId: '000266',
    category: 'Data Analytics',
    icon: 'analytics',
    path: '/certificates/data-analytics-certificate.pdf',
    downloadName:
      'Mavlonbek-Sultonbekov-MAAB-Data-Analytics-Certificate.pdf',
  },
  {
    id: 'itransition-data-engineering',
    title: 'Commercial Software Development — Data Engineering',
    issuer: 'Itransition',
    recipient: 'Mavlonbek Sultanbekov',
    issueDate: '5 June 2026',
    issueDateIso: '2026-06-05',
    credentialId: null,
    category: 'Data Engineering',
    certificateType: 'Certificate of Participation',
    icon: 'engineering',
    path: '/certificates/data-engineering-certificate.pdf',
    downloadName:
      'Mavlonbek-Sultonbekov-Itransition-Data-Engineering-Certificate.pdf',
  },
]);
