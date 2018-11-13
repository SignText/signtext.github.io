import * as signtext from "signtext";

(function () {
  function getPlayground() {
    return ({
      input_javascript: playground_input_js.value,
      input_signtext: playground_input_st.value,
      namespace: eval(`(${playground_input_js.value})`)
    });
  }

  const playground_input_st = document.getElementById("playground-st-code") as HTMLInputElement;
  const playground_input_js = document.getElementById("playground-js-code") as HTMLTextAreaElement;
  const playground_output = document.getElementById("playground-output") as HTMLTextAreaElement;
  const rt = new signtext.Runtime();

  document.getElementById("playground").addEventListener("submit", function (ev) {
    ev.preventDefault();

    const pg = getPlayground();
    rt.eval(pg.input_signtext, pg.namespace)
        .catch((err) => err)
        .then((x) => playground_output.innerText = x);

    return false;
  });

  playground_input_st.value = `[concat]("Hello", " ", [name], "!")`;
  playground_input_js.value = `
{
  concat(...x) {
    return x.join("");
  },
  name: "world"
}
  `.trim();
})();
