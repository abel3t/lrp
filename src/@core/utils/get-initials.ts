// ** Returns initials from string
export const getInitials = (str: string) => {
  if (!str) {
    return 'N/A';
  }

  const words = str.split(/\s/);
  const abbrWords = words.reduce((response, word) => (response += word.slice(0, 1)), '');

  return abbrWords.slice(-2);
}
