const service = document.querySelector("#service");
const complexity = document.querySelector("#complexity");
const complexityLabel = document.querySelector("#complexityLabel");
const cleaning = document.querySelector("#cleaning");
const urgent = document.querySelector("#urgent");
const report = document.querySelector("#report");
const slides = document.querySelector("#slides");
const extraRounds = document.querySelector("#extraRounds");
const price = document.querySelector("#price");
const summary = document.querySelector("#summary");
const calculate = document.querySelector("#calculate");

const labels = ["简单", "较简单", "中等", "较复杂", "复杂"];
const bases = {
  figure: [299, 699],
  standard: [999, 2999],
  complex: [2999, 5999],
  review: [999, 3999],
  tutoring: [299, 399]
};

function money(value) {
  return "¥" + Math.round(value).toLocaleString("zh-CN");
}

function estimate() {
  const level = Number(complexity.value);
  const [baseLow, baseHigh] = bases[service.value];
  const multiplier = 1 + (level - 1) * 0.18;
  let low = baseLow * multiplier;
  let high = baseHigh * multiplier;

  if (cleaning.checked) {
    low += 150;
    high += 500;
  }
  if (report.checked && service.value !== "tutoring") {
    low += 100;
    high += 300;
  }
  if (slides.checked) {
    low += 200;
    high += 600;
  }
  const rounds = Math.max(0, Number(extraRounds.value) || 0);
  low += rounds * 120;
  high += rounds * 300;
  if (urgent.checked) {
    low *= 1.5;
    high *= 1.5;
  }

  price.textContent = money(low) + "～" + money(high);
  summary.textContent = `复杂度：${labels[level - 1]}；${urgent.checked ? "含加急；" : ""}${cleaning.checked ? "含数据清洗；" : ""}估算不含税。`;
}

complexity.addEventListener("input", () => {
  complexityLabel.textContent = labels[Number(complexity.value) - 1];
  estimate();
});
[service, cleaning, urgent, report, slides, extraRounds].forEach((element) => {
  element.addEventListener("change", estimate);
  element.addEventListener("input", estimate);
});
calculate.addEventListener("click", estimate);
estimate();
