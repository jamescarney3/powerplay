export const kebab = (...sections: string | number): string => {
  return sections.map((section) => (section.toString())).join('-');
};
