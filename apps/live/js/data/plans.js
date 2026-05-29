export const PLANS = [
  {
    id: 'plan-l',
    name: 'Plan L',
    tag: 'Hospitalario',
    tagColor: 'primary',
    monthlyPrice: 378800,
    benefits: [
      { text: 'Acceso directo a citas con <strong>todas las especialidades médicas.</strong>', included: true },
      { text: '<strong>Médico en casa 24/7.</strong>', included: true },
      { text: '<strong>Citas médicas virtuales</strong> y orientación telefónica.', included: true },
      { text: 'Traslados en ambulancia.', included: true },
      { text: '<strong>Exámenes ilimitados de laboratorio y diagnóstico.</strong>', included: true },
      { text: '<strong>Hospitalización, cirugías y medicamentos.</strong>', included: true },
      { text: '<strong>Consultas sin cita previa.</strong>', included: true },
      { text: 'Atención de urgencias médicas.', included: true },
      { text: '<strong>Odontología general y especializada.</strong>', included: true },
      { text: 'Tratamiento médico y rehabilitación a enfermedades de alto costo.', included: true },
      { text: 'Terapias físicas, respiratorias y de lenguaje.', included: true },
      { text: 'Cobertura para el embarazo y recién nacido.', included: true },
      { text: 'Deducible por cada servicio: <strong>$32,000.</strong>', included: true, hasInfo: true }
    ]
  },
  {
    id: 'plan-m',
    name: 'Plan M',
    tag: 'Ambulatorio',
    tagColor: 'secondary',
    monthlyPrice: 101400,
    recommended: true,
    benefits: [
      { text: 'Acceso directo a citas con <strong>18 especialidades médicas.</strong>', included: true },
      { text: '<strong>Médico en casa 24/7.</strong>', included: true },
      { text: '<strong>Citas médicas virtuales</strong> y orientación telefónica.', included: true },
      { text: 'Traslados en ambulancia.', included: true },
      { text: '<strong>$420,000 para exámenes de laboratorio y diagnóstico.</strong>', included: true },
      { text: '<strong>Consultas sin cita previa.</strong>', included: true },
      { text: 'Odontología general y especializada.', included: true },
      { text: 'Hospitalización, cirugías y medicamentos.', included: false },
      { text: 'Atención a urgencias médicas.', included: false },
      { text: 'Tratamiento médico y rehabilitación a enfermedades de alto costo.', included: false },
      { text: 'Terapias físicas, respiratorias y de lenguaje.', included: false },
      { text: 'Cobertura para el embarazo y recién nacido.', included: false },
      { text: 'Deducible por cada servicio: <strong>$20,000.</strong>', included: true, hasInfo: true }
    ]
  },
  {
    id: 'plan-s',
    name: 'Plan S',
    tag: 'Ambulatorio',
    tagColor: 'secondary',
    monthlyPrice: 41500,
    benefits: [
      { text: 'Acceso directo a citas con <strong>18 especialidades médicas.</strong>', included: true },
      { text: '<strong>Médico en casa 24/7.</strong>', included: true },
      { text: '<strong>Citas médicas virtuales</strong> y orientación telefónica.', included: true },
      { text: 'Traslados en ambulancia.', included: true },
      { text: 'Odontología general y especializada.', included: true },
      { text: 'Exámenes de laboratorio y diagnóstico.', included: false },
      { text: 'Consultas sin cita previa.', included: false },
      { text: 'Hospitalización, cirugías y medicamentos.', included: false },
      { text: 'Atención a urgencias médicas.', included: false },
      { text: 'Tratamiento médico y rehabilitación a enfermedades de alto costo.', included: false },
      { text: 'Terapias físicas, respiratorias y de lenguaje.', included: false },
      { text: 'Cobertura para el embarazo y recién nacido.', included: false },
      { text: 'Deducible por cada servicio: <strong>$20,000.</strong>', included: true, hasInfo: true }
    ]
  }
];

export const PLAN_M_PLUS_DETAILS = {
  name: 'Plan M Plus',
  benefits: [
    'Acceso directo a citas con 18 especialidades médicas.',
    'Médico en casa 24/7.',
    'Odontología general y especializado.',
    'Citas médicas virtuales y orientación telefónica.',
    'Traslados en ambulancia.',
    '$630,000 para exámenes de laboratorio y diagnóstico.',
    'Consultas sin cita previa.',
    '$210,000 para Medicamentos.',
    'Atención a urgencias médicas.',
    'Cada servicio tiene un deducible de $20,000. En caso de urgencias médicas, el deducible es de $40,000.'
  ]
};

export const EPS_OPTIONS = [
  'Sura EPS',
  'Nueva EPS',
  'Sanitas EPS',
  'Compensar EPS',
  'Famisanar EPS',
  'Salud Total EPS',
  'Coomeva EPS',
  'Medimás EPS',
  'Aliansalud EPS',
  'Otra'
];

export const INCOME_SOURCES = [
  'Empleado',
  'Independiente',
  'Pensionado',
  'Rentista de capital',
  'Otro'
];

export const DOCUMENT_TYPES = [
  'Cédula de Ciudadanía',
  'Cédula de Extranjería',
  'Pasaporte',
  'Tarjeta de Identidad'
];

export const COLOMBIAN_CITIES = [
  'BOGOTA D.C.-CUNDINAMARCA',
  'MEDELLIN-ANTIOQUIA',
  'CALI-VALLE DEL CAUCA',
  'BARRANQUILLA-ATLANTICO',
  'CARTAGENA-BOLIVAR',
  'BUCARAMANGA-SANTANDER',
  'PEREIRA-RISARALDA',
  'MANIZALES-CALDAS',
  'SANTA MARTA-MAGDALENA',
  'IBAGUE-TOLIMA',
  'VILLAVICENCIO-META',
  'CUCUTA-NORTE DE SANTANDER',
  'ARMENIA-QUINDIO',
  'NEIVA-HUILA',
  'PASTO-NARIÑO'
];
