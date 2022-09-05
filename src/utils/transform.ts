export function makeCardName(name: string): string {
  const names: string[] = name.split(' ');
  const transformedNames: string[] = names.map((nameString, index, names) => {
    if (index === 0 || index === names.length - 1) {
      return nameString.toUpperCase();
    }
    if (nameString.length > 2) {
      return nameString[0].toUpperCase();
    }

    return 'remove';
  })
  const filteredNames: string[] = transformedNames.filter(
    (nameString) => nameString !== 'remove'
  );
  const transformedFullName: string = filteredNames.join(' ');

  return transformedFullName;
}
