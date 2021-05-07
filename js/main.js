const d = document,
  $inputs = d.querySelectorAll(".input"),
  $labels = d.querySelectorAll("label");

console.log($inputs);

for (let i = 0; i < $inputs.length; i++) {
  if ($inputs[i].value) {
    $labels[i].classList.add("selected");
  }
}

const focus = (num) => {
  for (let i = 0; i < $labels.length; i++) {
    if ($labels[i].dataset.label === num) {
      $labels[i].classList.add("selected");
    } else {
      if ($inputs[i].value === "") {
        $labels[i].classList.remove("selected");
      }
    }
  }
};

for (let i = 0; i < $inputs.length; i++) {
  $inputs[i].addEventListener("focus", (e) => {
    let dataInput = $inputs[i].dataset.input;
    focus(dataInput);
  });
  $inputs[i].addEventListener("focusout", (e) => {
    focus(-1);
  });
}

d.addEventListener("submit", (e) => {
  e.preventDefault();

  const $loader = d.querySelector(".loader"),
    $pop = d.querySelector(".pop"),
    $form = d.querySelector("form"),
    $response = d.querySelector(".response");

  $pop.classList.remove("none");

  fetch("https://formsubmit.co/ajax/ff35e216e825c9779192ce43f80cd701", {
    method: "POST",
    body: new FormData(e.target),
  })
    .then((response) =>
      response.ok ? response.json() : Promise.reject(response)
    )
    .then((json) => {
      console.log(json);
      $loader.classList.add("none");
      $response.innerHTML = `<p>${json.message}</p>`;
      $form.reset();
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setTimeout(() => {
        $pop.classList.add("none");
        $response.innerHTML = "";
      }, 6000);
    });
});
