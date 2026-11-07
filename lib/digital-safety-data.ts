// lib/digital-safety-data.ts
// Master Data Repository for Module 10: Digital Safety & Cyber-Wellness Shield
// Student RSO 2.0 – Official Cybersecurity Education, Scam Defense & Emergency Support Platform

export interface SafetyActionStep {
  stepNumber: number;
  title: string;
  instruction: string;
  warningNotice?: string;
}

export interface SafetyFeature {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  authority: string;
  category: string;
  summary: string;
  riskSeverity: 'Critical' | 'High' | 'Important';
  actionSteps: SafetyActionStep[];
  threatsCovered: string[];
  statutoryRemedies: string[];
  practicalTips: string[];
  officialPortalUrl?: string;
  officialPortalLabel?: string;
  emergencyHelpline?: string;
}

export interface GuidanceSection {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  badge: string;
  overview: string;
  keyPractices: string[];
  warningSign: string;
  studentActionTip: string;
}

export interface OfficialCyberResource {
  id: string;
  name: string;
  authority: string;
  description: string;
  portalUrl: string;
  badge: string;
  isEmergencyHelpline?: boolean;
  contactNumber?: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  criticalTakeaway: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'Accounts' | 'Payments' | 'Devices' | 'Privacy' | 'Emergency';
}

export interface PrivacyQuestion {
  id: string;
  prompt: string;
  category: string;
  options: {
    label: string;
    points: number; // 0 (risky), 1 (moderate), 2 (safe)
    recommendation: string;
  }[];
}

export interface EmergencyProcedure {
  id: string;
  title: string;
  situation: string;
  urgencyLevel: 'Immediate (Within 1 Hour)' | 'Urgent (Same Day)' | 'Prompt Action';
  primaryHotline?: string;
  primaryAction: string;
  sequentialSteps: string[];
  avoidActions: string[];
  officialReportingLink: string;
}

// -----------------------------------------------------------------------------
// 1. THE 6 PRIMARY FEATURE CARDS
// -----------------------------------------------------------------------------
export const SAFETY_FEATURES: SafetyFeature[] = [
  {
    id: 'cyberbullying-safeguards',
    title: 'Cyberbullying Safeguards',
    subtitle: 'Anti-harassment, evidence preservation & 6-step reporting',
    badge: 'SAFETY DIRECTIVE',
    authority: 'I4C & Women and Child Cyber Crime Reporting Wing',
    category: 'Online Harassment & Bullying',
    summary:
      'Structured protection against trolling, doxxing, non-consensual image sharing, defamation, and digital extortion targeted at students.',
    riskSeverity: 'High',
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Do Not Retaliate or Escalate',
        instruction:
          'Do not respond in anger, insult back, or threaten the harasser. Retaliation often escalates the abuse and complicates legal documentation.',
        warningNotice: 'Never delete threatening messages or posts before capturing forensic evidence.',
      },
      {
        stepNumber: 2,
        title: 'Capture Forensic Evidence Immediately',
        instruction:
          'Take full uncropped screenshots including timestamps, sender username/handle, profile URL, post links, and message headers before accounts or chats vanish.',
      },
      {
        stepNumber: 3,
        title: 'Block and Restrict the Harasser',
        instruction:
          'Utilize platform blocking, account restriction, and muting tools. Disable direct messaging from non-followers on Instagram, X, and WhatsApp.',
      },
      {
        stepNumber: 4,
        title: 'Report to the Social Media Platform',
        instruction:
          'File an in-app report for harassment, hate speech, or non-consensual media sharing. Platforms are legally mandated under Indian IT Rules to address grievances.',
      },
      {
        stepNumber: 5,
        title: 'File a Complaint at Cybercrime Portal',
        instruction:
          'Submit a formal complaint on the National Cyber Crime Reporting Portal (cybercrime.gov.in). Use the dedicated "Report Crime Against Women/Children" section if applicable.',
      },
      {
        stepNumber: 6,
        title: 'Seek Emotional & Institutional Support',
        instruction:
          'Confide in a trusted faculty advisor, campus grievance cell, or family member. For free 24x7 psychological support, call Tele-MANAS at 14416.',
      },
    ],
    threatsCovered: [
      'Targeted online harassment and derogatory smear campaigns',
      'Doxxing (unauthorized publishing of phone numbers, addresses, or private photos)',
      'Non-consensual sharing of intimate images or morphed photographs',
      'Cyber extortion and blackmail threatening academic reputation',
    ],
    statutoryRemedies: [
      'Section 66E, Information Technology Act, 2000 (Violation of privacy for transmitting images of private area)',
      'Section 67 & 67A, IT Act, 2000 (Publishing or transmitting sexually explicit/obscene material)',
      'Section 354D & 506, Indian Penal Code / Bharatiya Nyaya Sanhita (Cyber stalking and criminal intimidation)',
    ],
    practicalTips: [
      'Keep your social profiles set to Private during exam seasons and public events.',
      'Regularly review your follower list and remove anonymous or suspicious followers.',
      'Never share your current live location or daily transit commute routines in public stories.',
    ],
    officialPortalUrl: 'https://cybercrime.gov.in/home',
    officialPortalLabel: 'National Cyber Crime Reporting Portal',
    emergencyHelpline: '1930',
  },
  {
    id: 'social-media-impersonation',
    title: 'Social Media Impersonation Guide',
    subtitle: 'Fake profile removal, account takeover recovery & 2FA lockdown',
    badge: 'IDENTITY PROTECTION',
    authority: 'CERT-In & Platform Trust & Safety Directives',
    category: 'Identity Theft & Account Security',
    summary:
      'Systematic defense against fake clone accounts, identity impersonation, credential theft, and unauthorized profile takeovers.',
    riskSeverity: 'High',
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Document the Impersonating Account',
        instruction:
          'Copy the exact account username (@handle) and profile URL. Take screenshots of bio, profile picture, and any fraudulent stories or direct messages soliciting funds.',
      },
      {
        stepNumber: 2,
        title: 'Alert Friends and Classmates',
        instruction:
          'Post a notice on your legitimate accounts warning your network that an impersonator is active and advising everyone never to send money or click sent links.',
      },
      {
        stepNumber: 3,
        title: 'Submit In-App Impersonation Report',
        instruction:
          'Use platform reporting: Profile > More (...) > Report > "It\'s pretending to be someone else" > "Me". Ask 5-10 trusted friends to submit identical reports for faster triage.',
      },
      {
        stepNumber: 4,
        title: 'Enable Two-Factor Authentication (2FA)',
        instruction:
          'Set up app-based 2FA (Google Authenticator, Aegis, or Microsoft Authenticator) instead of SMS OTP. SMS can be intercepted via SIM-swap scams.',
        warningNotice: 'Save and print your one-time 2FA backup codes in a secure physical place.',
      },
      {
        stepNumber: 5,
        title: 'Audit Active Sessions & Revoke Logins',
        instruction:
          'Go to Settings > Security > Login Activity. Terminate all unknown devices and locations, then immediately update your primary account password.',
      },
      {
        stepNumber: 6,
        title: 'File Impersonation Complaint on Cyber Portal',
        instruction:
          'If the impersonator is soliciting money or posting harmful content, file a formal complaint at cybercrime.gov.in under "Social Media Crime".',
      },
    ],
    threatsCovered: [
      'Clone profiles created with your photos to solicit emergency loans from contacts',
      'SIM-swap fraud leading to WhatsApp/Instagram takeover',
      'Fake recruiter profiles promising student jobs while stealing credentials',
      'Third-party "profile viewers" and tracker apps that hijack session cookies',
    ],
    statutoryRemedies: [
      'Section 66C, IT Act, 2000 (Identity theft using another person\'s electronic signature, password, or unique identifier)',
      'Section 66D, IT Act, 2000 (Cheating by personation using computer resource)',
    ],
    practicalTips: [
      'Never approve login verification prompts on your phone that you did not initiate yourself.',
      'Use distinct, complex passwords for your email and each social media network.',
      'Regularly audit connected third-party apps in your Google, Meta, and X security settings.',
    ],
    officialPortalUrl: 'https://cybercrime.gov.in/home',
    officialPortalLabel: 'Report Identity Crime on Cyber Portal',
  },
  {
    id: 'financial-scam-alert-1930',
    title: 'Financial Scam Alert – Helpline 1930',
    subtitle: 'UPI fraud, digital arrest extortion & golden hour reporting',
    badge: 'EMERGENCY 1930',
    authority: 'Citizen Financial Cyber Fraud Reporting System (I4C / MHA)',
    category: 'Financial Fraud & Extortion',
    summary:
      'Crucial safeguards against UPI reverse-QR frauds, fake job deposit demands, fraudulent scholarship processing fees, and "digital arrest" extortion.',
    riskSeverity: 'Critical',
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Act Within the "Golden Hour" — Dial 1930',
        instruction:
          'If you transferred funds to a scammer or had money debited without authorization, dial 1930 immediately. Reporting within 1-2 hours enables police and banks to freeze accounts before money is cashed out.',
        warningNotice: 'Do not delay. Every minute counts when freezing fraudulent recipient accounts.',
      },
      {
        stepNumber: 2,
        title: 'Gather All Transaction Credentials',
        instruction:
          'Locate your bank account number, UPI transaction ID (UTR number), debit timestamp, scammer phone number/UPI ID, and screenshot of the debit SMS.',
      },
      {
        stepNumber: 3,
        title: 'Block Cards and Freeze Net Banking',
        instruction:
          'Immediately contact your bank hotline or mobile banking app to temporarily block your debit card, freeze UPI, and disable net banking if credentials were exposed.',
      },
      {
        stepNumber: 4,
        title: 'Reject "Scan QR to Receive Money" Demands',
        instruction:
          'Remember: Scanning a QR code or entering your UPI PIN is STRICTLY FOR SENDING MONEY. You NEVER need to enter a PIN or scan a QR code to receive a payment or scholarship.',
      },
      {
        stepNumber: 5,
        title: 'Recognize Fake "Digital Arrest" Extortion',
        instruction:
          'Real police, CBI, ED, and customs officials NEVER conduct "digital arrests" via Skype or WhatsApp video calls, nor do they demand money to clear your name.',
      },
      {
        stepNumber: 6,
        title: 'Lodge Official Complaint at cybercrime.gov.in',
        instruction:
          'Register the formal complaint online at the National Cyber Crime Reporting Portal to receive an official acknowledgement number for bank dispute resolution.',
      },
    ],
    threatsCovered: [
      'Reverse QR Code Scam: Fraudsters claim you must scan a QR code and enter UPI PIN to receive money',
      'Digital Arrest Extortion: Criminals impersonating law enforcement threatening immediate arrest',
      'Part-Time Telegram Job Scams: Small initial returns followed by demands for heavy deposits',
      'Fake Scholarship Processing Fees: Bogus portals asking for upfront "document clearance fees"',
    ],
    statutoryRemedies: [
      'Section 66D, IT Act, 2000 (Punishment for cheating by personation using computer resource)',
      'Section 420, Indian Penal Code / Section 318(4), BNS (Cheating and dishonestly inducing delivery of property)',
    ],
    practicalTips: [
      'Your UPI PIN is like your ATM PIN — never enter it unless you intentionally intend to pay money.',
      'Government scholarships NEVER charge registration fees, security deposits, or UPI fees.',
      'Hang up immediately if an unknown caller claims a parcel with contraband has been found in your name.',
    ],
    officialPortalUrl: 'https://cybercrime.gov.in/home',
    officialPortalLabel: 'Lodge Financial Cyber Fraud Complaint',
    emergencyHelpline: '1930',
  },
  {
    id: 'device-security-practices',
    title: 'Device Security Best Practices',
    subtitle: 'Mobile & laptop hardening, malware defense & Wi-Fi safety',
    badge: 'SYSTEM DEFENSE',
    authority: 'Cyber Swachhta Kendra (CSK - CERT-In)',
    category: 'Device & Endpoint Hygiene',
    summary:
      'Practical security measures to protect Android phones, iPhones, and student laptops from spyware, rogue APKs, keyloggers, and insecure public Wi-Fi networks.',
    riskSeverity: 'High',
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Disable Side-Loading and Unknown APKs',
        instruction:
          'Never install APKs from Telegram channels, modded app websites, or WhatsApp forwards. Rogue APKs frequently contain trojans that steal banking OTPs and student credentials.',
        warningNotice: 'Free cracked software and modded games are the #1 source of student device malware.',
      },
      {
        stepNumber: 2,
        title: 'Audit App Permissions Regularly',
        instruction:
          'Review permissions for Camera, Microphone, Location, and SMS. Revoke permissions for calculators, flashlight apps, or games that request access to contacts or messages.',
      },
      {
        stepNumber: 3,
        title: 'Keep Operating Systems Updated',
        instruction:
          'Install all official security patches on Windows, macOS, Android, and iOS promptly. Patches resolve critical vulnerabilities exploited by remote attackers.',
      },
      {
        stepNumber: 4,
        title: 'Secure Public Wi-Fi Usage',
        instruction:
          'Avoid logging into bank accounts or student portals on public Wi-Fi networks (railway stations, cafes). If essential, use a verified VPN and disable auto-connect.',
      },
      {
        stepNumber: 5,
        title: 'Run Cyber Swachhta Kendra Botnet Tools',
        instruction:
          'Use free security botnet cleaning tools provided by CERT-In and Cyber Swachhta Kendra (csk.gov.in) to scan and clean infected Windows laptops and Android devices.',
      },
      {
        stepNumber: 6,
        title: 'Enable Full-Disk Device Encryption & Screen Lock',
        instruction:
          'Set a 6-digit PIN or passphrase screen lock. Ensure phone encryption is enabled so stored data cannot be extracted if your device is misplaced or stolen.',
      },
    ],
    threatsCovered: [
      'Malicious APKs that silently read SMS messages and intercept one-time passwords (OTPs)',
      'Cracked software, torrent downloads, and keyloggers stealing saved browser passwords',
      'Man-in-the-Middle (MitM) attacks and fake captive portals on insecure public Wi-Fi',
      'Ransomware locking student research theses, assignments, and personal records',
    ],
    statutoryRemedies: [
      'Section 43 & Section 66, IT Act, 2000 (Penalty for damage to computer system, unauthorized extraction of data)',
    ],
    practicalTips: [
      'Never allow AnyDesk, TeamViewer, or RustDesk to be installed on your phone at an unknown caller\'s request.',
      'Check Cyber Swachhta Kendra (csk.gov.in) for CERT-In approved malware removal utilities.',
      'Backup assignments and essential academic documents to an encrypted cloud drive or offline flash drive.',
    ],
    officialPortalUrl: 'https://www.csk.gov.in/',
    officialPortalLabel: 'Cyber Swachhta Kendra (CSK Portal)',
  },
  {
    id: 'digital-footprint-hygiene',
    title: 'Digital Footprint Hygiene',
    subtitle: 'Personal data auditing, metadata risks & location privacy',
    badge: 'PRIVACY AUDIT',
    authority: 'Information Security Education and Awareness (ISEA - MeitY)',
    category: 'Digital Privacy & Footprint',
    summary:
      'Strategies to audit personal data visibility, strip EXIF photo metadata, defend against deepfakes, and safeguard privacy across search engines and social platforms.',
    riskSeverity: 'Important',
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Audit What the Internet Knows About You',
        instruction:
          'Search your full name, phone number, and student registration number in incognito mode. Identify old blogs, school forums, or public directories exposing your personal information.',
      },
      {
        stepNumber: 2,
        title: 'Scrub Photo Metadata (EXIF) Before Sharing',
        instruction:
          'Camera photos often embed exact GPS coordinates and device model. Disable location tagging in your camera app settings or use privacy-stripping utilities before posting online.',
      },
      {
        stepNumber: 3,
        title: 'Manage Real-Time Location Tagging',
        instruction:
          'Never post stories with live geotags showing your exact cafe, hostel, or home while you are physically present. Post updates only after you have departed the location.',
      },
      {
        stepNumber: 4,
        title: 'Defend Against AI Voice Cloning Scams',
        instruction:
          'Establish a secret family "safe phrase" with your parents. If an AI cloned voice calls claiming you were detained or need urgent emergency money, the safe phrase disproves the scam.',
      },
      {
        stepNumber: 5,
        title: 'Deactivate Old and Dormant Accounts',
        instruction:
          'Delete obsolete accounts on forums, games, and old student portals. Dormant accounts are frequent targets in credential stuffing and data breach dumps.',
      },
      {
        stepNumber: 6,
        title: 'Review Data Permissions on Sanchar Saathi',
        instruction:
          'Visit sancharsaathi.gov.in (TAFCOP portal) to verify how many mobile connections are registered under your Aadhaar ID and disconnect any unauthorized numbers immediately.',
      },
    ],
    threatsCovered: [
      'Identity theft and stalking enabled by public phone numbers and address disclosures',
      'AI voice cloning and deepfakes built using public reels and audio snippets',
      'Unchecked mobile SIM cards fraudulently registered under student identification documents',
      'Recruiter rejection caused by unprofessional or controversial historical public posts',
    ],
    statutoryRemedies: [
      'Digital Personal Data Protection (DPDP) Act, 2023 (Right to correction, erasure, and grievance redressal)',
      'Section 66E, IT Act, 2000 (Privacy violation protections)',
    ],
    practicalTips: [
      'Check haveibeenpwned.com to see if your student email has been exposed in public data breaches.',
      'Check Sanchar Saathi TAFCOP every 6 months to monitor SIM cards issued against your identity.',
      'Treat anything posted on the internet as permanent, even if published in ephemeral "stories".',
    ],
    officialPortalUrl: 'https://www.sancharsaathi.gov.in/',
    officialPortalLabel: 'Sanchar Saathi Telecom Safety Portal',
  },
  {
    id: 'phishing-fake-link-detection',
    title: 'Phishing & Fake Link Detection',
    subtitle: 'Spoofed portal identification, URL analysis & malicious SMS',
    badge: 'THREAT INTELLIGENCE',
    authority: 'CERT-In Incident Response Guidelines',
    category: 'Phishing & Social Engineering',
    summary:
      'Essential forensic skills to detect spoofed government websites, fraudulent exam admit card portals, fake scholarship URLs, and deceptive SMS text headers.',
    riskSeverity: 'Critical',
    actionSteps: [
      {
        stepNumber: 1,
        title: 'Inspect the Complete Domain Structure',
        instruction:
          'Look at the domain name immediately preceding the first single slash (/), not the subdomain. For example: "scholarships-gov-in.portal-scam.com" is NOT a government site; it belongs to portal-scam.com.',
        warningNotice: 'An HTTPS padlock only means the connection is encrypted; it does NOT verify website honesty.',
      },
      {
        stepNumber: 2,
        title: 'Verify Official Government TLD (.gov.in / .nic.in)',
        instruction:
          'Authentic Indian Central and State Government portals strictly end in ".gov.in" or ".nic.in". Government portals NEVER use .com, .xyz, .top, or .org domain extensions.',
      },
      {
        stepNumber: 3,
        title: 'Decode SMS Sender Headers',
        instruction:
          'Official government SMS headers follow regulatory 6-character formats (e.g., "VM-NSPGOV", "AD-TNEB"). Generic 10-digit mobile numbers sending "Urgent scholarship credit" messages are fraudulent.',
      },
      {
        stepNumber: 4,
        title: 'Beware of Urgent Psychological Triggers',
        instruction:
          'Phishing links rely on manufactured urgency ("Admit card cancelled within 2 hours", "Scholarship forfeited if not confirmed"). Pause and verify on the official board website directly.',
      },
      {
        stepNumber: 5,
        title: 'Never Enter Credentials on Webview Windows',
        instruction:
          'When clicking a link inside WhatsApp or Instagram, do not enter passwords inside the app\'s internal browser. Open in Chrome or Safari to verify the true URL bar.',
      },
      {
        stepNumber: 6,
        title: 'Report Malicious Links to CERT-In and ISEA',
        instruction:
          'Forward phishing SMS to 1909 (DoT spam reporting) or email incident details to incident@cert-in.org.in so malicious domains can be blocked nationally.',
      },
    ],
    threatsCovered: [
      'Cloned National Scholarship Portal (NSP) sites harvesting bank account and Aadhaar credentials',
      'Bogus University admit card and revaluation payment links capturing credit/debit card numbers',
      'WhatsApp forwards promising free government laptops or student recharges containing ad-trackers',
      'Quishing: Malicious QR codes placed over legitimate notices on college message boards',
    ],
    statutoryRemedies: [
      'Section 66D, IT Act, 2000 (Cheating by personation using computer resource)',
      'Telecom Commercial Communications Customer Preference Regulations (TCCCPR)',
    ],
    practicalTips: [
      'Always type the official URL directly into your browser bookmark rather than clicking search engine ads.',
      'Use virustotal.com to safely scan suspicious links before opening them.',
      'If in doubt about an exam notice, verify it directly on your university\'s verified controller of examination site.',
    ],
    officialPortalUrl: 'https://www.cert-in.org.in/',
    officialPortalLabel: 'CERT-In Threat Response & Incident Reporting',
  },
];

// -----------------------------------------------------------------------------
// 2. THE 5 ADDITIONAL EDUCATIONAL GUIDANCE SECTIONS
// -----------------------------------------------------------------------------
export const GUIDANCE_SECTIONS: GuidanceSection[] = [
  {
    id: 'password-protection-centre',
    title: 'Password Protection Centre',
    subtitle: 'Passphrases, password managers & breach auditing',
    category: 'Credential Hygiene',
    badge: 'CORE DEFENSE',
    overview:
      'Weak and reused passwords are the primary doorway for student account hijacking. Transitioning from predictable single words to multi-word passphrases or open-source password managers dramatically eliminates exposure.',
    keyPractices: [
      'Use passphrases of 4+ random words (e.g., "mango-breeze-stadium-guitar9#") instead of easily guessed names or birth dates.',
      'Never reuse your primary email password on any university club, gaming, or shopping site.',
      'Adopt a reputable password manager (such as Bitwarden or KeePass) to generate and autofill complex credentials.',
      'Check haveibeenpwned.com quarterly to verify if your email address appeared in commercial data breaches.',
    ],
    warningSign:
      'Receiving unexpected password reset emails or SMS OTPs means an attacker possesses your username and is actively attempting credential stuffing.',
    studentActionTip:
      'Immediately change the password of your master Google/Outlook recovery email; it controls access to all other accounts.',
  },
  {
    id: 'safe-online-payments',
    title: 'Safe Online Payments',
    subtitle: 'UPI security, virtual cards & screen-sharing defense',
    category: 'Financial Safety',
    badge: 'PAYMENT SHIELD',
    overview:
      'Digital payment convenience carries risks when scammers weaponize social engineering. Following basic payment discipline guarantees immunity from 99% of student payment frauds.',
    keyPractices: [
      'Remember the Golden Rule: UPI PIN is entered ONLY to SEND money. Never enter a PIN to receive a payment or refund.',
      'Never download screen-sharing applications (AnyDesk, TeamViewer, QuickSupport) during a phone call with anyone claiming to be bank or customer support.',
      'Enable domestic online transaction limits (e.g., ₹2,000 maximum daily) in your mobile banking app to contain risk.',
      'Verify the merchant name shown on the UPI approval screen before typing your PIN.',
    ],
    warningSign:
      'Any caller claiming "Your electricity/hostel fee/scholarship payment failed, download this quick support app to fix it."',
    studentActionTip:
      'Set an instant daily transaction limit on your primary bank account and use a separate low-balance account for daily campus UPI expenses.',
  },
  {
    id: 'online-mental-wellbeing',
    title: 'Online Mental Well-being & Cyber-Wellness',
    subtitle: 'Screen time balance, doomscrolling & digital fatigue',
    category: 'Digital Wellness',
    badge: 'MENTAL HEALTH',
    overview:
      'Cyber-wellness extends beyond technical defenses to encompass emotional health. Continuous social comparison, doomscrolling, cyberbullying anxiety, and late-night screen addiction severely degrade academic performance.',
    keyPractices: [
      'Implement a "Digital Sunset": Discontinue smartphone usage at least 45 minutes prior to sleep to restore circadian rhythms.',
      'Mute or unfollow accounts that trigger feelings of inadequacy, imposter syndrome, or academic panic.',
      'Turn off non-essential notifications for social media applications during study sessions.',
      'Take 24-hour weekend "digital detox" intervals to reconnect with offline hobbies and sports.',
    ],
    warningSign:
      'Compulsive phone checking during lectures, loss of sleep due to endless social feeds, and overwhelming distress over online interactions.',
    studentActionTip:
      'Call the Ministry of Health\'s free 24x7 tele-mental health helpline Tele-MANAS at 14416 if online stress or bullying feels overwhelming.',
  },
  {
    id: 'ai-deepfakes-manipulation',
    title: 'AI, Deepfakes & Online Manipulation',
    subtitle: 'Detecting synthetic media, reporting & legal remedies',
    category: 'Emerging AI Threats',
    badge: 'AI ETHICS & SAFETY',
    overview:
      'Generative AI tools make it trivial to fabricate convincing video deepfakes, clone voices from short audio clips, and generate deceptive student notices. Knowing how to detect and counter synthetic manipulation is an indispensable 21st-century skill.',
    keyPractices: [
      'Examine facial boundaries, unnatural blinking patterns, irregular ear/hair borders, and mismatched lighting in suspicious video clips.',
      'Listen for robotic intonations, unnatural pauses, or breathlessness in unexpected emergency voice messages.',
      'Establish a family verification code word that cannot be guessed by automated scrapers.',
      'Know your legal rights: Creating or disseminating non-consensual deepfakes violates Section 66D, 66E, and 67 of the IT Act, 2000.',
    ],
    warningSign:
      'An urgent voice message claiming a close friend or family member has met with an accident and demands an immediate funds transfer.',
    studentActionTip:
      'Always call back the individual on their standard cellular phone number (not WhatsApp audio) before taking any action based on an audio message.',
  },
  {
    id: 'student-emergency-support',
    title: 'Student Emergency Support & Incident Hierarchy',
    subtitle: 'Escalation matrix, campus cells & statutory hotlines',
    category: 'Institutional Support',
    badge: 'CAMPUS SHIELD',
    overview:
      'When an incident occurs, swift and orderly escalation minimizes trauma and ensures institutional backing. Students are never alone; national hotlines and university grievance cells exist specifically to defend student rights.',
    keyPractices: [
      'Save the National Cyber Financial Helpline 1930 directly into your smartphone contacts.',
      'Identify your university\'s Internal Complaints Committee (ICC) and Student Grievance Redressal Cell (SGRC).',
      'For ragging or senior bullying issues, contact the National Anti-Ragging Helpline at 1800-180-5522 or email helpline@antiragging.in.',
      'Utilize Sanchar Saathi\'s CEIR service (sancharsaathi.gov.in) immediately if your smartphone is stolen on campus or during travel.',
    ],
    warningSign:
      'Threats from seniors or external groups warning you not to report an incident to authorities or family members.',
    studentActionTip:
      'Remember that all official cybercrime complaints filed under "Women and Child" categories on cybercrime.gov.in can be filed anonymously if desired.',
  },
];

// -----------------------------------------------------------------------------
// 3. THE 8 OFFICIAL VERIFIED CYBERSECURITY RESOURCES
// -----------------------------------------------------------------------------
export const OFFICIAL_CYBER_RESOURCES: OfficialCyberResource[] = [
  {
    id: 'national-cyber-crime-portal',
    name: 'National Cyber Crime Reporting Portal',
    authority: 'Ministry of Home Affairs & Indian Cyber Crime Coordination Centre (I4C)',
    description:
      'Official Government of India portal for reporting all cybercrimes including cyber financial fraud, social media abuse, identity theft, and crimes against women or children.',
    portalUrl: 'https://cybercrime.gov.in/home',
    badge: 'CENTRAL PORTAL',
  },
  {
    id: 'cyber-fraud-helpline-1930',
    name: 'Cyber Financial Fraud Helpline — Dial 1930',
    authority: 'Citizen Financial Cyber Fraud Reporting System (I4C)',
    description:
      '24x7 toll-free national emergency helpline. Call 1930 immediately within the "Golden Hour" of fraudulent debit to freeze transacted amounts across Indian banking networks.',
    portalUrl: 'tel:1930',
    badge: 'TOLL-FREE 24x7',
    isEmergencyHelpline: true,
    contactNumber: '1930',
  },
  {
    id: 'cert-in-official',
    name: 'Indian Computer Emergency Response Team (CERT-In)',
    authority: 'Ministry of Electronics & Information Technology (MeitY)',
    description:
      'National nodal agency for responding to computer security incidents, publishing security advisories, vulnerability disclosures, and cyber incident guidelines.',
    portalUrl: 'https://www.cert-in.org.in/',
    badge: 'NATIONAL NODAL AGENCY',
  },
  {
    id: 'cert-in-awareness-booklets',
    name: 'CERT-In Cyber Awareness Booklets & Guidelines',
    authority: 'CERT-In Public Education Wing',
    description:
      'Free, comprehensive downloadable public awareness booklets and safety guidelines covering mobile security, secure social networking, and safe digital banking.',
    portalUrl: 'https://www.cert-in.org.in/AwarenessBooklets.jsp',
    badge: 'FREE GUIDANCE BOOKLETS',
  },
  {
    id: 'sanchar-saathi',
    name: 'Sanchar Saathi (CEIR & TAFCOP Portal)',
    authority: 'Department of Telecommunications (DoT)',
    description:
      'Citizen-centric initiative to track and block lost or stolen mobile phones nationwide (CEIR), and audit all mobile connections issued under your identity documents (TAFCOP).',
    portalUrl: 'https://www.sancharsaathi.gov.in/',
    badge: 'MOBILE & SIM SECURITY',
  },
  {
    id: 'cyber-swachhta-kendra',
    name: 'Cyber Swachhta Kendra (CSK)',
    authority: 'Botnet Cleaning and Malware Analysis Centre (CERT-In)',
    description:
      'Free government utilities and security botnet removal tools to scan, disinfect, and protect student Windows computers and Android mobile devices from malicious infections.',
    portalUrl: 'https://www.csk.gov.in/',
    badge: 'FREE MALWARE REMOVAL',
  },
  {
    id: 'isea-official',
    name: 'Information Security Education and Awareness (ISEA)',
    authority: 'MeitY Government of India',
    description:
      'Dedicated nationwide cybersecurity awareness program featuring tailored student curriculum, safety posters, newsletters, interactive toolkits, and cyber quizzes.',
    portalUrl: 'https://www.isea.gov.in/',
    badge: 'AWARENESS & TOOLKITS',
  },
  {
    id: 'cytrain-ncrb',
    name: 'National Cybercrime Training Centre (CyTrain)',
    authority: 'National Crime Records Bureau (NCRB) & MHA',
    description:
      'Massive Open Online Course (MOOC) platform delivering foundational and advanced cybersecurity awareness and digital investigation certifications for students and professionals.',
    portalUrl: 'https://cytrain.ncrb.gov.in/staticpage/r0.php',
    badge: 'OFFICIAL E-LEARNING',
  },
];

// -----------------------------------------------------------------------------
// 4. THE 10-QUESTION CYBER SCAM AWARENESS QUIZ
// -----------------------------------------------------------------------------
export const CYBER_SCAM_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    scenario:
      'You receive an SMS stating: "Congratulations! Your National Merit Scholarship of ₹25,000 has been approved. Scan the QR code below and enter your UPI PIN to claim credit instantly." What is the correct response?',
    options: [
      'Scan the QR code and enter UPI PIN immediately to avoid losing the grant',
      'Forward the message to your friends so they can claim their scholarship too',
      'Never scan or enter PIN; entering a UPI PIN always sends money, never receives it',
      'Enter a wrong PIN first to test if the portal is authentic',
    ],
    correctOptionIndex: 2,
    explanation:
      'Correct! The UPI architecture strictly requires a PIN only when sending or debiting money from your bank account. Receiving funds or scholarships never requires entering your UPI PIN or scanning a recipient QR code.',
    criticalTakeaway: 'Rule: UPI PIN is strictly for DEBITS. No PIN is ever needed to receive funds.',
  },
  {
    id: 2,
    scenario:
      'An unknown caller on a WhatsApp video call wears a police uniform, displays an official-looking badge, and claims you are placed under "Digital Arrest" for money laundering unless you transfer ₹30,000 into a government verification escrow account. What should you do?',
    options: [
      'Transfer the funds immediately to avoid being arrested at your college hostel',
      'Disconnect immediately, block the number, and dial 1930; "digital arrests" are 100% fraudulent scams',
      'Beg the officer for a discount on the penalty amount',
      'Provide your parents\' bank details instead',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! Law enforcement agencies (Police, CBI, ED, Customs) never conduct investigations or place citizens under "digital arrest" via WhatsApp or Skype video calls. No legitimate authority ever asks citizens to transfer money to "clear their name".',
    criticalTakeaway: 'Rule: Digital Arrest is an extortion scam. Indian law recognizes no such concept.',
  },
  {
    id: 3,
    scenario:
      'A message on Telegram offers a flexible student part-time job: "Earn ₹3,000 per day by rating hotels on Google Maps. Pay an initial refundable security deposit of ₹500 to activate your task account." What is this?',
    options: [
      'A legitimate digital marketing student internship',
      'A standard corporate freelance placement test',
      'A classic task-based financial advance-fee scam designed to steal increasing sums',
      'A government employment scheme under Digital India',
    ],
    correctOptionIndex: 2,
    explanation:
      'Correct! Task-based frauds lure students with easy initial tasks, occasionally paying a small sum (e.g. ₹150) to build trust, before trapping victims into depositing tens of thousands of rupees for "prepaid task unlocking".',
    criticalTakeaway: 'Rule: Legitimate employers never ask candidates to pay money to work.',
  },
  {
    id: 4,
    scenario:
      'A close classmate\'s Instagram profile suddenly sends you a direct message: "Hey, my UPI app is locked and I need ₹2,000 urgently for an emergency hospital bill. Send to this UPI ID, I will repay tonight." How should you handle this?',
    options: [
      'Send the money right away to be a supportive classmate',
      'Call your classmate directly on their regular phone number to confirm before transferring a single rupee',
      'Ask the Instagram account for their ATM PIN as collateral',
      'Post their message in the college group chat with your approval',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! Cloned and compromised Instagram accounts frequently message followers requesting urgent loans. Always verify emergencies by calling your friend directly on a traditional voice cellular call before sending money.',
    criticalTakeaway: 'Rule: Always verify money requests through an independent, direct phone call.',
  },
  {
    id: 5,
    scenario:
      'You are studying at a railway station or cafe and want to connect to the free public Wi-Fi network. Which security practice is essential?',
    options: [
      'Public Wi-Fi is managed by the government so it is safe to conduct net banking',
      'Disable Wi-Fi auto-connect, avoid accessing banking or sensitive portals, and use a trusted VPN',
      'Turn off your laptop\'s firewall to improve download speeds',
      'Share your laptop\'s root password with the cafe manager',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! Open public Wi-Fi networks are vulnerable to Man-in-the-Middle (MitM) packet sniffing and rogue hotspot spoofing. Avoid online banking and never enter passwords without a secure VPN connection.',
    criticalTakeaway: 'Rule: Treat public Wi-Fi as untrusted. Never perform financial transactions on it.',
  },
  {
    id: 6,
    scenario:
      'You are looking for the official State Scholarship portal. Which of the following domain names is an authentic Indian government portal?',
    options: [
      'http://scholarship-portal.gov-scheme.in',
      'https://scholarships.gov.in',
      'https://national-scholarship-online.com',
      'https://gov.in.scholarships-direct-apply.org',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! Authentic Indian government portals always end in ".gov.in" or ".nic.in" immediately preceding the path slash. The domain "scholarships.gov.in" is the verified official National Scholarship Portal.',
    criticalTakeaway: 'Rule: Authentic government portals end strictly in .gov.in or .nic.in.',
  },
  {
    id: 7,
    scenario:
      'You want to sell your used textbook on an online marketplace. A prospective buyer messages saying: "I have transferred the amount; please scan this QR code and approve the request to credit it into your account." What will happen if you scan and enter your UPI PIN?',
    options: [
      'The book price will be credited to your bank account',
      'The transaction will be verified by the marketplace escrow system',
      'The specified amount will be immediately DEBITED from your bank account and sent to the scammer',
      'Your phone will automatically take a screenshot and report the buyer',
    ],
    correctOptionIndex: 2,
    explanation:
      'Correct! A QR code containing an approval request is a "collect request". Approving it and typing your PIN authorizes your bank to transfer money OUT of your account to the scammer.',
    criticalTakeaway: 'Rule: Never scan a QR code or enter your PIN to receive money from a buyer.',
  },
  {
    id: 8,
    scenario:
      'You discover someone has created a clone Instagram account using your personal photos, name, and bio, and is sending inappropriate messages to your college peers. What is the best sequence of actions?',
    options: [
      'Retaliate by posting threatening abusive messages on the clone account',
      'Ignore it because Instagram accounts delete themselves after 48 hours',
      'Document the profile URL/screenshots, alert friends, submit an impersonation report, and file on cybercrime.gov.in',
      'Delete your own genuine account permanently so no one can compare',
    ],
    correctOptionIndex: 2,
    explanation:
      'Correct! Documenting evidence, warning your network to prevent them from being scammed, submitting an in-app report for impersonation, and reporting on the national cybercrime portal is the statutory, effective response.',
    criticalTakeaway: 'Rule: Document evidence, alert contacts, report through in-app and cybercrime portals.',
  },
  {
    id: 9,
    scenario:
      'A Telegram message provides a link to download a "Modded WhatsApp / Free Spotify Premium APK". When installing, it asks for permission to read SMS, Contacts, and Accessibility Services. What should you do?',
    options: [
      'Grant all permissions to enjoy free premium music and themes',
      'Cancel the installation immediately and delete the APK file; accessibility and SMS access enable full device takeover',
      'Install it on your friend\'s phone first to test if it works',
      'Grant only Accessibility Services because that is harmless',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! Rogue APKs targeting students request "SMS" and "Accessibility Services" so they can silently intercept banking OTPs, read WhatsApp chats, and authorize fraudulent fund transfers in the background.',
    criticalTakeaway: 'Rule: Never install modded APKs; Accessibility + SMS permissions equal complete device takeover.',
  },
  {
    id: 10,
    scenario:
      'You accidentally entered your net banking password and OTP on a phishing website 15 minutes ago, and an unauthorized transaction of ₹12,000 has been debited. What is the single most critical national helpline number to dial immediately?',
    options: [
      '100 (General Police Emergency)',
      '1930 (National Cyber Financial Fraud Reporting Helpline)',
      '139 (Indian Railways Enquiry)',
      '1098 (Childline)',
    ],
    correctOptionIndex: 1,
    explanation:
      'Correct! 1930 is the national cyber financial fraud emergency helpline operated by the Indian Cyber Crime Coordination Centre (I4C). Dialing within the Golden Hour allows banks to freeze stolen funds in the recipient account before withdrawal.',
    criticalTakeaway: 'Rule: Dial 1930 immediately within the Golden Hour to stop cyber financial fraud.',
  },
];

// -----------------------------------------------------------------------------
// 5. THE STUDENT CYBER SAFETY CHECKLIST
// -----------------------------------------------------------------------------
export const STUDENT_CYBER_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-2fa-email',
    title: 'Two-Factor Authentication (2FA) on Primary Email',
    description:
      'Enabled an authenticator app (Google/Microsoft Authenticator) on my main email address so password theft alone cannot compromise it.',
    category: 'Accounts',
  },
  {
    id: 'chk-2fa-social',
    title: 'Two-Factor Authentication on Social Media',
    description:
      'Activated login verification on Instagram, WhatsApp, LinkedIn, and X, and stored emergency backup codes securely.',
    category: 'Accounts',
  },
  {
    id: 'chk-upi-pin-rule',
    title: 'Verified UPI PIN Golden Rule',
    description:
      'Acknowledged and memorized that my UPI PIN is NEVER entered to receive payments, cashbacks, refunds, or scholarship credits.',
    category: 'Payments',
  },
  {
    id: 'chk-screen-share-ban',
    title: 'Strict Screen-Sharing Ban During Transactions',
    description:
      'Committed to never install or launch AnyDesk, TeamViewer, or QuickSupport at the request of any caller claiming to be support staff.',
    category: 'Payments',
  },
  {
    id: 'chk-phone-permissions',
    title: 'Audited Smartphone App Permissions',
    description:
      'Reviewed Camera, Microphone, SMS, and Location permissions on my phone, revoking access for apps that do not legitimately need them.',
    category: 'Devices',
  },
  {
    id: 'chk-sideload-blocked',
    title: 'Blocked Unknown APKs and Pirated Software',
    description:
      'Disabled "Install Unknown Apps" on Android and uninstalled cracked games, torrented software, or suspicious browser plugins.',
    category: 'Devices',
  },
  {
    id: 'chk-wifi-hygiene',
    title: 'Public Wi-Fi Hygiene & Auto-Connect Off',
    description:
      'Turned off automatic network connection for open Wi-Fi networks and resolved never to perform bank logins on public hotspots.',
    category: 'Devices',
  },
  {
    id: 'chk-privacy-settings',
    title: 'Social Media Audience & Geotag Audit',
    description:
      'Restricted social account visibility to approved friends, removed phone numbers from bios, and stopped sharing real-time location tags.',
    category: 'Privacy',
  },
  {
    id: 'chk-tafcop-sim-audit',
    title: 'Audited Mobile SIMs on Sanchar Saathi',
    description:
      'Checked the TAFCOP portal (sancharsaathi.gov.in) to verify all mobile numbers issued under my Aadhaar document and reported unknown numbers.',
    category: 'Privacy',
  },
  {
    id: 'chk-saved-1930',
    title: 'Saved Emergency 1930 Helpline in Phone',
    description:
      'Saved the National Cyber Financial Fraud Helpline (1930) and bookmark for cybercrime.gov.in in my smartphone for immediate emergency access.',
    category: 'Emergency',
  },
];

// -----------------------------------------------------------------------------
// 6. THE DIGITAL PRIVACY SELF-ASSESSMENT QUESTIONS
// -----------------------------------------------------------------------------
export const PRIVACY_ASSESSMENT_QUESTIONS: PrivacyQuestion[] = [
  {
    id: 'pq-passwords',
    prompt: 'How do you currently manage passwords across your college, email, and social accounts?',
    category: 'Password Management',
    options: [
      {
        label: 'I use the same password (or minor variations like adding 123) across multiple sites.',
        points: 0,
        recommendation:
          'High Risk: A single breach on an insecure website compromises your primary email and social accounts. Transition to unique passphrases immediately.',
      },
      {
        label: 'I have 2 or 3 distinct passwords that I rotate between important and unimportant sites.',
        points: 1,
        recommendation:
          'Moderate Risk: Better, but still vulnerable if a "minor" site is breached. Consider adopting a password manager like Bitwarden.',
      },
      {
        label: 'I use unique, complex passwords/passphrases for every single service, stored in a password manager.',
        points: 2,
        recommendation:
          'Excellent Defense: You adhere to industry gold-standard credential security.',
      },
    ],
  },
  {
    id: 'pq-social-visibility',
    prompt: 'Who can view your full personal profile, stories, photos, and followers on social media?',
    category: 'Profile Visibility',
    options: [
      {
        label: 'My account is public; anyone on the internet can see my stories, photos, and tagged locations.',
        points: 0,
        recommendation:
          'High Risk: Public photos and stories provide scammers with the exact material needed to create clone accounts or AI voice clones.',
      },
      {
        label: 'My account is public, but I do not post photos of my family or home location.',
        points: 1,
        recommendation:
          'Moderate Risk: Good caution, but your follower list and identity details remain accessible to social engineers.',
      },
      {
        label: 'My account is private; only accepted friends and relatives can view my updates.',
        points: 2,
        recommendation:
          'Excellent Defense: You maintain strict perimeter defense around your personal identity.',
      },
    ],
  },
  {
    id: 'pq-public-wifi',
    prompt: 'How do you handle online banking, UPI payments, or student portal logins on public Wi-Fi?',
    category: 'Network Hygiene',
    options: [
      {
        label: 'I log in whenever I need to; if there is an HTTPS padlock, I assume it is safe.',
        points: 0,
        recommendation:
          'High Risk: The padlock only guarantees encryption between you and the server, but public networks can be spoofed by rogue access points.',
      },
      {
        label: 'I avoid banking on public Wi-Fi, but I still log into my social media and email accounts.',
        points: 1,
        recommendation:
          'Moderate Risk: Session cookies for social media and email can still be intercepted on unencrypted or misconfigured networks.',
      },
      {
        label: 'I switch to mobile cellular data or use an encrypted VPN whenever I need to access any account on public networks.',
        points: 2,
        recommendation:
          'Excellent Defense: Cellular data isolates your traffic from local snooping entirely.',
      },
    ],
  },
  {
    id: 'pq-app-downloads',
    prompt: 'Where do you install applications, tools, and entertainment software on your devices?',
    category: 'Software Sourcing',
    options: [
      {
        label: 'I download APKs from Telegram channels, mod websites, or torrents for free premium apps.',
        points: 0,
        recommendation:
          'Critical Risk: Modded APKs and cracked tools are the number one vector for Android spyware, banking trojans, and keyloggers.',
      },
      {
        label: 'I primarily use official app stores, but occasionally download open-source APKs from GitHub.',
        points: 1,
        recommendation:
          'Moderate Risk: GitHub projects are generally safer if open-source, but always verify developer reputation before installing.',
      },
      {
        label: 'I strictly install applications from official stores (Google Play, Apple App Store, Microsoft Store) with Play Protect enabled.',
        points: 2,
        recommendation:
          'Excellent Defense: Official stores provide sandboxing, code-signing, and automated malware scanning.',
      },
    ],
  },
  {
    id: 'pq-urgent-messages',
    prompt: 'How do you respond when you receive an urgent message about an exam cancellation, scholarship prize, or parcel delivery issue?',
    category: 'Social Engineering Defense',
    options: [
      {
        label: 'I immediately click the attached link because I cannot afford to miss an important deadline.',
        points: 0,
        recommendation:
          'Critical Risk: Manufactured urgency is the #1 psychological weapon in phishing. Scammers count on your panic to bypass critical thinking.',
      },
      {
        label: 'I click the link, but if it asks for payment or password, I close it.',
        points: 1,
        recommendation:
          'Moderate Risk: Even clicking malicious links can trigger browser drive-by downloads or confirm your phone number is active.',
      },
      {
        label: 'I never click the link; I independently navigate to the verified official portal to check notices.',
        points: 2,
        recommendation:
          'Excellent Defense: Direct portal verification renders phishing attacks completely ineffective.',
      },
    ],
  },
];

// -----------------------------------------------------------------------------
// 7. EMERGENCY INCIDENT PROCEDURES
// -----------------------------------------------------------------------------
export const EMERGENCY_PROCEDURES: EmergencyProcedure[] = [
  {
    id: 'proc-financial-fraud',
    title: 'Financial Cyber Fraud (Unauthorized Debit / UPI Fraud)',
    situation: 'Money was debited from your account via UPI, net banking, or debit card without your authorization.',
    urgencyLevel: 'Immediate (Within 1 Hour)',
    primaryHotline: '1930',
    primaryAction: 'Call 1930 immediately to trigger the Indian National Citizen Financial Fraud reporting network.',
    sequentialSteps: [
      'Step 1: Dial 1930 immediately. Keep your bank account number, debit timestamp, transaction ID (UTR), and recipient UPI handle ready.',
      'Step 2: Log into your bank app and temporarily block the compromised debit card and freeze UPI access.',
      'Step 3: Save unedited screenshots of the debit SMS, transaction receipt, and scammer chat or phone log.',
      'Step 4: File a formal written complaint on cybercrime.gov.in to receive a permanent police acknowledgement number.',
      'Step 5: Submit the acknowledgement number and written dispute letter to your home bank branch within 3 days for zero-liability protection under RBI guidelines.',
    ],
    avoidActions: [
      'Do NOT wait until the next working day; the Golden Hour window (first 2 hours) is vital for account freezing.',
      'Do NOT call phone numbers found on Google search results for "bank customer care"; scammers spoof these numbers.',
    ],
    officialReportingLink: 'https://cybercrime.gov.in/home',
  },
  {
    id: 'proc-account-compromised',
    title: 'Compromised Social Media or Email Account',
    situation: 'An attacker changed your password or is sending unauthorized messages from your profile.',
    urgencyLevel: 'Urgent (Same Day)',
    primaryAction: 'Initiate account recovery and revoke all active device sessions.',
    sequentialSteps: [
      'Step 1: Visit the platform\'s official recovery page (e.g., instagram.com/hacked or accounts.google.com/signin/recovery).',
      'Step 2: If access is partially maintained, go to Security > Active Sessions and click "Log out of all other devices".',
      'Step 3: Change your account password immediately to a strong multi-word passphrase.',
      'Step 4: Audit recovery email and phone number to ensure the attacker did not replace them with their own.',
      'Step 5: Enable Two-Factor Authentication using an Authenticator app (not SMS).',
    ],
    avoidActions: [
      'Do NOT pay external "hackers" on Instagram or Telegram who promise to recover your account for a fee; they are scammers.',
    ],
    officialReportingLink: 'https://cybercrime.gov.in/home',
  },
  {
    id: 'proc-cyberbullying-harassment',
    title: 'Cyberbullying, Stalking or Non-Consensual Media',
    situation: 'You are being harassed, threatened, stalked, or private images are being shared without consent.',
    urgencyLevel: 'Immediate (Within 1 Hour)',
    primaryHotline: '1930 / 14416',
    primaryAction: 'Preserve forensic evidence, report to platform, and file on cybercrime.gov.in under Women/Child wing.',
    sequentialSteps: [
      'Step 1: Take unedited screenshots of all abusive messages, profiles, timestamps, and URLs. Do not delete them.',
      'Step 2: Block the abuser on all social platforms and restrict direct messaging settings.',
      'Step 3: File an anonymous or registered complaint on cybercrime.gov.in under "Report Crime Against Women / Children".',
      'Step 4: If you are experiencing panic, call Tele-MANAS (14416) for free 24x7 psychological counseling.',
      'Step 5: Inform your college Internal Complaints Committee (ICC) or student welfare dean for campus security backing.',
    ],
    avoidActions: [
      'Do NOT retaliate with abusive language; keep your record clean for legal documentation.',
      'Do NOT delete the chat thread before capturing complete screenshots and web links.',
    ],
    officialReportingLink: 'https://cybercrime.gov.in/home',
  },
  {
    id: 'proc-lost-stolen-phone',
    title: 'Lost or Stolen Smartphone',
    situation: 'Your smartphone was stolen or misplaced, containing active SIM cards, banking apps, and personal photos.',
    urgencyLevel: 'Urgent (Same Day)',
    primaryAction: 'Block SIM card, initiate remote wipe, and block device IMEI on Sanchar Saathi (CEIR).',
    sequentialSteps: [
      'Step 1: Call your telecom operator immediately to suspend the lost SIM card so scammers cannot receive OTPs.',
      'Step 2: Use Google "Find My Device" (android.com/find) or Apple "Find My" (icloud.com/find) to initiate a remote lock and erase.',
      'Step 3: Obtain a duplicate SIM from your telecom provider with the same number to regain account control.',
      'Step 4: Visit sancharsaathi.gov.in and submit a request on the CEIR portal to block the device IMEI across all Indian networks.',
      'Step 5: File a lost device report with your local police station or state police lost-article portal.',
    ],
    avoidActions: [
      'Do NOT delay blocking the SIM card; OTPs can be intercepted within minutes if your SIM is inserted into another device.',
    ],
    officialReportingLink: 'https://www.sancharsaathi.gov.in/',
  },
];
