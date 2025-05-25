export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  export const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };
  
  export const validateHucha = (hucha: {
    name: string;
    meta: number;
  }): boolean => {
    return hucha.name.trim().length > 0 && hucha.meta > 0;
  };