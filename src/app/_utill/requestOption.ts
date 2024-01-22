export default function* getIteratorRequestOption(obj: any) {
  let result = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += `${key}:${obj[key]}, `;
    }
  }
  yield result.slice(0, -2);
}
