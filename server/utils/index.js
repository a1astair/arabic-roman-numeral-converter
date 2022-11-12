const romanMap = (r) => {
    if (r == 'I')
        return 1;
    if (r == 'V')
        return 5;
    if (r == 'X')
        return 10;
    if (r == 'L')
        return 50;
    if (r == 'C')
        return 100;
    if (r == 'D')
        return 500;
    if (r == 'M')
        return 1000;
    return -1;
}

export const convertToArabic = (str) => {

    // Initialize result
    let res = 0;
  
     for (let i = 0; i < str.length; i++) 
     {
         // Getting value of symbol s[i]
         const s1 = romanMap(str.charAt(i));
  
         // Getting romanMap of symbol s[i+1]
         if (i + 1 < str.length) 
         {
             const s2 = romanMap(str.charAt(i + 1));
  
             // Comparing both values
             if (s1 >= s2) 
             {
                 // Value of current symbol
                 // is greater or equalto
                 // the next symbol
                 res = res + s1;
             } 
             else 
             {
                 // Value of current symbol is
                 // less than the next symbol
                 res = res + s2 - s1;
                 i++;
             }
         } 
         else  
         {
             res = res + s1;
         }
     }
     return res;
};

export const convertToRoman = (str) => {
    const roman = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1
    };
    let answer = '';
  
    for (const i of Object.keys(roman)) {
      const q = Math.floor(str / roman[i]);
      str -= q * roman[i];
      answer += i.repeat(q);
    }
  
    return answer;
  };

export const checkIfRomanNumeral = (numeral) => {
    const _regexp = /^((\(M\)){0,3})(\(C\)\(M\)|\(C\)\(D\)|(\(D\))?(\(C\)){0,3})(\(X\)\(C\)|\(X\)\(L\)|(\(L\))?(\(X\)){0,3})(M\(X\)|M\(V\)|(\(V\))?)(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

    return _regexp.test(numeral)
}
