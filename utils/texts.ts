import slugify from 'slugify';

export const namesToAvatar = (text: string) => {
  const firt2Words = text.split(' ').slice(0, 2).join(' ');
  return firt2Words
    .split(' ')
    .map((name) => name[0])
    .join('')
    .toUpperCase();
};

export const shortID = (word: string): string => {
  const ojioid = `${word.slice(0, 3)}...${word.slice(-3)}`;
  return ojioid.toLocaleUpperCase();
};

export const generateUsername = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
};

export const genSlug = (title: string): string => {
  const slug = slugify(title, {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'en',
    trim: true,
  });
  return slug;
};
