import * as asciichart from "asciichart";
import logUpdate from "log-update";

const colors = [
  asciichart.green,
  asciichart.red,
  asciichart.blue,
]

export default class LiveChart {
  chartoptions = {
    height: process.stdout.rows - 3,
    colors: [],
  };

  constructor(legend) {
    this.values = [];
    for (let iChart = 0; iChart < legend.length; iChart++) {
      let width = 60;
      if (process.stdout.columns) {
        width = process.stdout.columns - 30;
      }
      this.values.push(new Array(width).fill(0));
      this.chartoptions.colors.push(colors[iChart]);
    }
    this.chartoptions.legend = legend;
  }

  push(values) {
    if (values.length !== this.values.length) {
      throw Error(`Expected ${this.values.length} values, got ${values.length}`);
    }

    let legendString = '\t';
    for (let iChart = 0; iChart < this.values.length; iChart++) {
      legendString += `${colors[iChart]}█${this.chartoptions.legend[iChart]}:${values[iChart].toFixed(2)}${asciichart.reset}\t`;
    }
    for (let iPlot = 0; iPlot < this.values.length; iPlot++) {
      this.values[iPlot].push(values[iPlot]);
      this.values[iPlot].shift();
    }
    logUpdate(legendString + '\n' + asciichart.plot(this.values, this.chartoptions));
  }
}