import { FormEvent, useEffect, useRef } from "react";
import GT4Init from "../funcitons/gt4";
import toast from "react-hot-toast";

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
        captchaId: process.env.NEXT_PUBLIC_CAPTCHA_ID,
        product: "bind",
        onError: (err: any) => toast.error(err.msg),
      },
      handlerForBind
    );
  }, []);

  async function handlerForBind(c: any) {
    // console.log(c);

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

    c.onSuccess(async () => {
      var result = c.getValidate();
      // console.log("GT success: ", result);

      const inputText = inputRef.current?.value;

      toast(() => (
        <span>
          Name: {inputText}
          <br />
          Pass Token: {result.pass_token}
        </span>
      ));

      toast.success("Captcha Success");
    });

    c.onError((err: any) => {
      // console.log("GT error: ", err);
      toast.error(err.msg);
      c.reset();
    });
    c.onClose(() => {
      // console.log("GT close: ");
      toast.error("Captcha Closed!");

      c.reset();
    });
    c.onFail((err: any) => {
      // console.log("GT fail: ", err);
      toast.error("Captcha Failed!");

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
      <input type="text" name="name" placeholder="Name" ref={inputRef} />

      <button type="submit" id="submitBtn" ref={btnRef}>
        Submit
      </button>
    </form>
  );
};
