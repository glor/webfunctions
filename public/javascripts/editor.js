require.config({paths: {"vs": "http://localhost:3000/monaco/min/vs"}});

window.MonacoEnvironment = {
    getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          self.MonacoEnvironment = {
            baseUrl: 'http://localhost:3000/monaco/min/'
          };
          importScripts('http://localhost:3000/monaco/min/vs/base/worker/workerMain.js');`
        )}`;
    }
};

require(["vs/editor/editor.main"], function () {
    const editor = monaco.editor.create(document.getElementById("container"), {
        value: window.sourceCode,
        language: "javascript",
        scrollBeyondLastLine: false,
    });

    const form = document.getElementById("edit");
    form.addEventListener("formdata", e => {
        e.formData.append("function", editor.getModel().getValue());
    });
});