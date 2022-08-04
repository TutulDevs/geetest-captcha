import { FormEvent, useEffect, useRef } from "react";
import { RGCaptcha, reset } from "react-geetest-captcha";

const CAPTCHA_NAME = "a8e44a0ceeb9e282d9be47af7ea5bc9a";

// ERROR: ReferenceError: regeneratorRuntime is not defined
// https://github.com/nrwl/nx/issues/5063

export const WithRGC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const inputText = inputRef.current?.value;

    console.log(inputText);
  };

  const handleSuccess = () => console.log("success");

  return (
    <form onSubmit={handleSubmit}>
      <p>with RGC</p>
      <input type="text" name="name" placeholder="Name" ref={inputRef} />

      <RGCaptcha
        name={CAPTCHA_NAME}
        width="100%"
        onSuccess={handleSuccess}
        // data={() =>
        //   ajax.then((resp) => {
        //     const { captcha } = (resp && resp.data) || {};
        //     // console.log(captcha);
        //     // {
        //     //   "gt": "e385d274eeedb650fa008875ff7b14a2",
        //     //   "challenge": "f4873d2af972a38811814f644920b8ab",
        //     //   "success": 1,
        //     // }
        //     return captcha;
        //   })
        // }
      />

      <button type="submit" id="submitBtn">
        Submit
      </button>
    </form>
  );
};
