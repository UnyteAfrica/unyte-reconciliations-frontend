import _ from "lodash";

export function commalizeMoney(num) {
  let stringedNum = num.toString();
  const originalArr = stringedNum.split("");
  const copyArr = [...originalArr];
  const newArr = [];
  for (let i = 0; i < originalArr.length; i++) {
    let poppedArr = copyArr.pop();
    if (newArr !== 0 && newArr.length % 4 === 0) newArr.push(",");
    newArr.push(poppedArr);
  }
  newArr.splice(0, 1);
  const commalizedResult = newArr.reverse().join("");
  return commalizedResult;
}

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}
