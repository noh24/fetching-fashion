const emailValidator = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) return false;

  const [localPart, domainPart] = email.split("@");

  if (localPart.length > 64) return false;

  if (domainPart.length > 255) return false;

  if (/(\.)\1/.test(domainPart)) return false;

  if (/[^ -~]/.test(domainPart)) return false;

  const tldRegex =
    /^(com|net|org|edu|gov|mil|biz|info|name|museum|us|ca|uk|au|de|fr|it|jp|kr|ru|br|cn|es|nl|se|ch|at|dk|be|il|no|fi|ie|pt|pl|gr|cz|hu|ro|ua)$/i;

  const tld = domainPart.split(".").pop();

  if (!tldRegex.test(tld)) return false;

  return true;
};
export default emailValidator;
