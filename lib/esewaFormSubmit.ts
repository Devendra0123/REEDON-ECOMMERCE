export function submitForm(path : any, params : any) {
    const form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);
  
    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", params[key]);
      form.appendChild(hiddenField);
    }
  
    document.body.appendChild(form);
    form.submit();
  }