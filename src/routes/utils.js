export async function roll() {
  return new Promise((fullfil, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.3) {
        reject(new Error('Request failed'));
        return;
      }

      fullfil(Math.ceil(Math.random() * 6));
    }, 1000);
  });
}
