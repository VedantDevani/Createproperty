export function validatePassword(password: string): boolean {
    // Regular expression to check if the password meets the criteria
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%!^]).{8,16}$/;
    return passwordRegex.test(password);
  }