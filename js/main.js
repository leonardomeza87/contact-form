const d = document,
  $inputs = d.querySelectorAll("input");

d.addEventListener("", () => {
  for (let i = 0; i < $inputs.length; i++) {
    if ($inputs[i] === d.activeElement) {
      console.log("a");
    }
  }
});
