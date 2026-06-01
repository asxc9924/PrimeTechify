export interface Certificate {
  id: string;
  name: string;
  course: string;
  issueDate: string;
  expiryDate: string;
  grade: string;
  college: string;
  duration: string;
  skills: string[];
}

export interface OfferLetter {
  id: string;
  name: string;
  position: string;
  department: string;
  startDate: string;
  endDate: string;
  stipend: string;
  location: string;
  college: string;
  issueDate: string;
  status: 'pending' | 'accepted';
}

const STATIC_CERTS: Record<string, Certificate> = {
  'AUR-2024-001': {
    id: 'AUR-2024-001',
    name: 'Rahul Sharma',
    course: 'Full-Stack Development Internship',
    issueDate: '2024-03-15',
    expiryDate: '2027-03-15',
    grade: 'Distinction',
    college: 'IIT Delhi',
    duration: '6 Months',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
  },
  'AUR-2024-002': {
    id: 'AUR-2024-002',
    name: 'Priya Patel',
    course: 'AI & Machine Learning Program',
    issueDate: '2024-04-20',
    expiryDate: '2027-04-20',
    grade: 'Distinction',
    college: 'BITS Pilani',
    duration: '4 Months',
    skills: ['Python', 'TensorFlow', 'NLP', 'Computer Vision'],
  },
  'AUR-2024-003': {
    id: 'AUR-2024-003',
    name: 'Arjun Verma',
    course: 'UI/UX Design Certification',
    issueDate: '2024-05-10',
    expiryDate: '2027-05-10',
    grade: 'First Class',
    college: 'NID Ahmedabad',
    duration: '3 Months',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
  },
  'AUR-2024-004': {
    id: 'AUR-2024-004',
    name: 'Sneha Gupta',
    course: 'Digital Marketing Specialist',
    issueDate: '2024-06-01',
    expiryDate: '2027-06-01',
    grade: 'Distinction',
    college: 'IIM Bangalore',
    duration: '3 Months',
    skills: ['SEO', 'Content Strategy', 'Analytics', 'Growth Hacking'],
  },
  'AUR-2024-005': {
    id: 'AUR-2024-005',
    name: 'Karan Mehta',
    course: 'Cloud Architecture Program',
    issueDate: '2024-07-12',
    expiryDate: '2027-07-12',
    grade: 'First Class',
    college: 'IIIT Hyderabad',
    duration: '5 Months',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'DevOps'],
  },
  'AUR-2024-006': {
    id: 'AUR-2024-006',
    name: 'Ananya Reddy',
    course: 'Data Science & Analytics',
    issueDate: '2024-08-05',
    expiryDate: '2027-08-05',
    grade: 'Distinction',
    college: 'IIT Madras',
    duration: '6 Months',
    skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
  },
  'AUR-2024-007': {
    id: 'AUR-2024-007',
    name: 'Vikram Singh',
    course: 'Mobile App Development',
    issueDate: '2024-09-18',
    expiryDate: '2027-09-18',
    grade: 'First Class',
    college: 'DTU Delhi',
    duration: '4 Months',
    skills: ['React Native', 'Flutter', 'Firebase', 'iOS'],
  },
  'AUR-2024-008': {
    id: 'AUR-2024-008',
    name: 'Neha Kapoor',
    course: 'Brand Strategy & Consulting',
    issueDate: '2024-10-22',
    expiryDate: '2027-10-22',
    grade: 'Distinction',
    college: 'St. Xavier\'s Mumbai',
    duration: '3 Months',
    skills: ['Brand Strategy', 'Market Research', 'Positioning', 'Campaign Planning'],
  },
  'AUR-2025-001': {
    id: 'AUR-2025-001',
    name: 'Aditya Kumar',
    course: 'Cybersecurity Fundamentals',
    issueDate: '2025-01-10',
    expiryDate: '2028-01-10',
    grade: 'First Class',
    college: 'IIT Kharagpur',
    duration: '4 Months',
    skills: ['Ethical Hacking', 'Network Security', 'Cryptography', 'SOC'],
  },
  'AUR-2025-002': {
    id: 'AUR-2025-002',
    name: 'Meera Iyer',
    course: 'Product Management',
    issueDate: '2025-02-14',
    expiryDate: '2028-02-14',
    grade: 'Distinction',
    college: 'NIT Trichy',
    duration: '3 Months',
    skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping'],
  },
};

// LocalStorage helpers
function getDynamicCerts(): Record<string, Certificate> {
  try {
    const data = localStorage.getItem('aurelia_certs');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveDynamicCerts(certs: Record<string, Certificate>) {
  localStorage.setItem('aurelia_certs', JSON.stringify(certs));
}

function getDynamicOffers(): Record<string, OfferLetter> {
  try {
    const data = localStorage.getItem('aurelia_offers');
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveDynamicOffers(offers: Record<string, OfferLetter>) {
  localStorage.setItem('aurelia_offers', JSON.stringify(offers));
}

export function getAllCertificates(): Record<string, Certificate> {
  return { ...STATIC_CERTS, ...getDynamicCerts() };
}

export function getAllOfferLetters(): Record<string, OfferLetter> {
  return getDynamicOffers();
}

export function addCertificate(cert: Omit<Certificate, 'id'>): string {
  const dynamic = getDynamicCerts();
  const id = generateCertId();
  const newCert = { ...cert, id };
  dynamic[id] = newCert;
  saveDynamicCerts(dynamic);
  return id;
}

export function addOfferLetter(offer: Omit<OfferLetter, 'id'>): string {
  const dynamic = getDynamicOffers();
  const id = generateOfferId();
  const newOffer = { ...offer, id };
  dynamic[id] = newOffer;
  saveDynamicOffers(dynamic);
  return id;
}

export function deleteCertificate(id: string) {
  const dynamic = getDynamicCerts();
  delete dynamic[id];
  saveDynamicCerts(dynamic);
}

export function deleteOfferLetter(id: string) {
  const dynamic = getDynamicOffers();
  delete dynamic[id];
  saveDynamicOffers(dynamic);
}

export function verifyCertificate(id: string): Certificate | null {
  const normalizedId = id.trim().toUpperCase();
  return getAllCertificates()[normalizedId] || null;
}

export function verifyOfferLetter(id: string): OfferLetter | null {
  const normalizedId = id.trim().toUpperCase();
  return getAllOfferLetters()[normalizedId] || null;
}

export function getAdminStats() {
  const certs = Object.values(getDynamicCerts());
  const offers = Object.values(getDynamicOffers());
  return {
    totalCertificates: certs.length,
    totalOfferLetters: offers.length,
    recentCertificates: certs.slice(-5).reverse(),
    recentOffers: offers.slice(-5).reverse(),
  };
}

function generateCertId(): string {
  const year = new Date().getFullYear();
  const dynamic = getDynamicCerts();
  const existing = Object.keys(dynamic).filter(k => k.startsWith(`AUR-${year}`));
  const num = existing.length + 1;
  return `AUR-${year}-${String(num).padStart(3, '0')}`;
}

function generateOfferId(): string {
  const year = new Date().getFullYear();
  const dynamic = getDynamicOffers();
  const existing = Object.keys(dynamic).filter(k => k.startsWith(`OFF-${year}`));
  const num = existing.length + 1;
  return `OFF-${year}-${String(num).padStart(3, '0')}`;
}
