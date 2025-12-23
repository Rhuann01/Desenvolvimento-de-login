export function verifyPass(password: string) {
  const minword = password.length >= 9;
  const haveNumber = /\d/.test(password);
  const haveSimbol = /[@%#_-]/.test(password);

  if (!minword) {
    return "A senha deve ter no minimo 9 caracteres";
  }
  if (!haveNumber) {
    return "A senha tem que ter um número";
  }
  if (!haveSimbol) {
    return "A senha tem que conter um dos simbolo (@, %, #, -, _)";
  }

  return null;
}
