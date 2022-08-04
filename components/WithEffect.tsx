import { FormEvent, useEffect, useRef } from "react";
import GT4Init from "../funcitons/gt4";

const CAPTCHA_MY = "a8e44a0ceeb9e282d9be47af7ea5bc9a";
const CAPTCHA_OTHER = "54088bb07d2df3c46b79f80300b0abbe";

export const WithEffect = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    GT4Init();

    // @ts-ignore
    initGeetest4(
      {
        captchaId: CAPTCHA_OTHER,
        product: "bind",
        riskType: "slide",
        onError: (err: any) =>
          console.log("captcha error before loading: ", err),

        // language: "spa",
      },
      handlerForBind
    );
  }, []);

  async function handlerForBind(c: any) {
    console.log(c);

    const button = btnRef.current;
    var isReady = false;
    // console.log(isReady);

    c.onReady(() => {
      isReady = true;
    });

    button?.addEventListener("click", function () {
      // console.log("before ready: btn clicked");

      if (isReady) {
        // console.log("after ready: btn clicked");

        // both methods work
        // c.showBox();
        c.showCaptcha();
      }
    });

    c.onSuccess(() => {
      var result = c.getValidate();
      console.log("GT success: ", result);

      const inputText = inputRef.current?.value;
      console.log(inputText);
    });

    c.onError((err: any) => {
      console.log("GT error: ", err);
      c.reset();
    });
    c.onClose(() => {
      console.log("GT close: ");
      c.reset();
    });
    c.onFail((err: any) => {
      console.log("GT fail: ", err);
      c.reset();
    });
  }

  async function handlerForFloatOrPopup(captcha: any) {
    // call appendTo to insert CAPTCHA into an element of the page, which can be customized by you
    captcha.appendTo("#captcha");

    captcha.onSuccess(() => {
      var result = captcha.getValidate();

      console.log("GT success: ", result);
    });
    captcha.onError(() => console.log("GT error: "));
    captcha.onClose(() => console.log("GT close: "));
    captcha.onFail(() => console.log("GT fail: "));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>with useEffect</p>

      <input type="text" name="name" placeholder="Name" ref={inputRef} />

      <button type="submit" id="submitBtn" ref={btnRef}>
        Submit
      </button>
    </form>
  );
};
