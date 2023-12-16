module.exports.generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}



exports.compareStudentMarks = (marks1, marks2) => {

  const removalIndexes = [];

  for (let i = 0; i < marks1.length; i++) {

    if (marks1[i] !== marks2[i]) {
      removalIndexes.push(i + 1);
    }
  }

  return removalIndexes;
}


