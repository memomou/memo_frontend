import { useState } from "react";

function Form() {
  const [value, setValue] = useState("hi");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    console.log(value);
    setValue(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <input type="password" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
