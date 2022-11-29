import { useState } from "react";

function AddressForm({ form, additionalData, endpointUrl, id }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    if (form) {
      e.preventDefault();
      setStatus("loading");
      setMessage("");

      const finalFormEndpoint = endpointUrl || form.action;
      const data = Array.from(form.elements)
        .filter((input) => input.name)
        .reduce(
          (obj, input) => Object.assign(obj, { [input.name]: input.value }),
          {}
        );

      if (additionalData) {
        Object.assign(data, additionalData);
      }

      fetch(finalFormEndpoint+'addresses/' + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }

          return response.json();
        })
        .then(() => {
          setMessage("Salvo com sucesso!");
          setStatus("success");
        })
        .catch((err) => {
          console.log(err);
          setMessage('Já existe esta pessoa nesse municipio!');
          setStatus("error");
        });
    }
  };

  return { handleSubmit, status, message };
}

export default AddressForm;