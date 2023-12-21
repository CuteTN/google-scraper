const ACCEPTED_SPECIAL_CHARS = [" ", "-", '"'] as string[];

/**
 * The keyword to query is limited to alphanumeric characters, space, hyphen and double quotes
 * @param keyword
 */
export function validateKeyword(keyword: string) {
  if (!keyword) return false;
  
  for (let i = 0; i < keyword.length; ++i) {
    const charCode = keyword.charCodeAt(i);

    if (charCode >= 48 && charCode <= 57) continue;
    if (charCode >= 65 && charCode <= 90) continue;
    if (charCode >= 97 && charCode <= 122) continue;
    if (ACCEPTED_SPECIAL_CHARS.includes(keyword[i])) continue;

    return false;
  }

  return true;
}