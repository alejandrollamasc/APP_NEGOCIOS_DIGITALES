// Global state store for the purchase flow
const STATE_KEY = 'sb_purchase_state';

const defaultState = {
  currentStep: 1,
  completedSteps: [],
  // Step 1 - Home
  home: {
    fullName: '',
    email: '',
    phone: '',
    acceptPrivacy: false,
    acceptData: false,
    acceptOffers: false
  },
  // Step 2 - Plan selection
  selectedPlan: null,
  // Step 3 - Datos del titular (Datos básicos)
  holder: {
    documentType: '',
    documentNumber: '',
    expeditionDate: '',
    firstName: '',
    secondName: '',
    firstLastName: '',
    secondLastName: '',
    phone: ''
  },
  // Step 4 - Datos complementarios
  complementary: {
    birthDate: '',
    gender: '',
    birthCity: '',
    email: '',
    residenceCity: '',
    residenceAddress: '',
    useAddressForAll: false,
    currentEPS: '',
    incomeSource: ''
  },
  // Step 5 - Confirmation (read-only summary)
  // Step 6 - Payment
  payment: {
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    installments: '1'
  }
};

class Store {
  constructor() {
    this.state = this._load();
    this.listeners = [];
  }

  _load() {
    try {
      const saved = localStorage.getItem(STATE_KEY);
      return saved ? { ...defaultState, ...JSON.parse(saved) } : { ...defaultState };
    } catch {
      return { ...defaultState };
    }
  }

  _save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(this.state));
    this.listeners.forEach(fn => fn(this.state));
  }

  get(key) {
    return key ? this.state[key] : this.state;
  }

  set(key, value) {
    if (typeof key === 'object') {
      Object.assign(this.state, key);
    } else {
      this.state[key] = value;
    }
    this._save();
  }

  update(section, data) {
    this.state[section] = { ...this.state[section], ...data };
    this._save();
  }

  completeStep(step) {
    if (!this.state.completedSteps.includes(step)) {
      this.state.completedSteps.push(step);
      this.state.completedSteps.sort((a, b) => a - b);
    }
    this._save();
  }

  goToStep(step) {
    this.state.currentStep = step;
    this._save();
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  reset() {
    this.state = { ...defaultState };
    this._save();
  }
}

export const store = new Store();
