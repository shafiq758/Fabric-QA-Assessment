export function getRandomString(length: number): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function getRandomNumberString(length: number): string {
  const digits = '0123456789';
  return Array.from({ length }, () => digits[Math.floor(Math.random() * digits.length)]).join('');
}

export function getRandomUsername(): string {
  return `user_${getRandomString(6)}`;
}

export function getRandomPassword(): string {
  return `Pass${getRandomString(6)}!`;
}

export function getRandomFirstName(): string {
  const names = ['Liam', 'Olivia', 'Noah', 'Isla', 'Oliver', 'Charlotte'];
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomLastName(): string {
  const names = ['Smith', 'Brown', 'Taylor', 'Wilson', 'Lee', 'Martin'];
  return names[Math.floor(Math.random() * names.length)];
}

export function getRandomAustralianCity(): string {
  const cities = ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'];
  return cities[Math.floor(Math.random() * cities.length)];
}

export function getRandomAustralianState(): string {
  const states = ['NSW', 'VIC', 'QLD', 'WA', 'SA'];
  return states[Math.floor(Math.random() * states.length)];
}

export function getRandomAustralianZip(): string {
  return getRandomNumberString(4);
}

export function getRandomAustralianPhone(): string {
  return `04${getRandomNumberString(8)}`;
}

export function getRandomAddress(): string {
  return `${getRandomNumberString(3)} ${getRandomLastName()} Street`;
}