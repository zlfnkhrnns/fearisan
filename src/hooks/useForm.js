import React from "react";

const useForm = (initialValue) => {
  const [form, setForm] = React.useState(initialValue);
  const handleChange = (event) => {
    event.persist();
    setForm((form) => ({ ...form, [event.target.name]: event.target.value,  }));
  };
  return {
    form,
    setForm,
    handleChange,
  };
};

export default useForm;
