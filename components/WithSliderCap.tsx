import { FormEvent, useEffect, useRef } from "react";
import SliderCaptcha from "@slider-captcha/react";

export const WithSliderCap = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  function verifiedCallback(token: any) {
    console.log("Captcha token: " + token);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>with slider-captcha</p>

      <input type="text" name="name" placeholder="Name" ref={inputRef} />

      <SliderCaptcha
        create="https://example.com/captcha/create"
        verify="https://example.com/captcha/verify"
        callback={verifiedCallback}
        // variant="dark"
      />

      <button type="submit" id="submitBtn" ref={btnRef}>
        Submit
      </button>
    </form>
  );
};
