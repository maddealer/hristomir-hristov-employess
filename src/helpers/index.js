//This function finds the most days working together
export default function output(masterArr) {
  let output = [];
  let mostDays = 0;
  for (let k = 0; k < masterArr.length; k++) {
    let sorted = masterArr[k].sort(
      (a, b) => Date.parse(a[2]) - Date.parse(b[2])
    );
    for (let i = 0; i < sorted.length; i++) {
      let endDate =
        sorted[i][3] === "NULL" ? Date.now() : Date.parse(sorted[i][3]);
      let diff;

      for (let j = i + 1; j < sorted.length; j++) {
        let startDateCurrent = Date.parse(
          sorted[j][2].substring(0, sorted[j][2].length - 1)
        );
        let endDateCurrent =
          sorted[j][3] === "NULL" ? Date.now() : Date.parse(sorted[j][3]);
        if (
          isNaN(endDate) ||
          isNaN(startDateCurrent) ||
          isNaN(endDateCurrent)
        ) {
          return {
            error: true,
            output: output,
            mostDays: mostDays,
          };
        }
        if (startDateCurrent < endDate) {
          if (endDate > endDateCurrent) {
            diff = Math.round(
              ((startDateCurrent - endDateCurrent) * -1) / 60000 / 60 / 24
            );
          } else if (endDate <= endDateCurrent) {
            diff = Math.round(
              ((startDateCurrent - endDate) * -1) / 60000 / 60 / 24
            );
          }
        }
        if (parseInt(diff) > mostDays) {
          mostDays = parseInt(diff);
          let toPush = {
            id1: sorted[i][0],
            id2: sorted[j][0],
            project: sorted[i][1],
            diffDays: diff,
          };
          output.push(toPush);
        }
      }
    }
  }
  return {
    error: false,
    output: output,
    mostDays: mostDays,
  };
}
