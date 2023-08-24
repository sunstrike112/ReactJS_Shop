import { forgotPasswordApi } from "@ss-fe-fw/api/auth/password";
import { validateMessages } from "@ss-fe-fw/constants";
import { emailValidator, formValidator, STATUS_CODES } from "@ss-fe-fw/shared/ui";
import { Button, Form } from "antd";
import FormBuilder from "antd-form-builder";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { AtomArrowButton } from '@ss-fe-fw/atoms'
import { debounce } from "lodash";

/* eslint-disable-next-line */
export interface OGForgotPasswordFormProps { }

export function OGForgotPasswordForm(props: OGForgotPasswordFormProps) {
  const [form] = Form.useForm();
  const [isDone, setIsDone] = useState(false);
  const [formInvalid, setFormInvalid] = useState(true)
  const router = useRouter();

  const meta = {
    columns: 4,
    formItemLayout: null,
    fields: [
      {
        key: 'email', label: 'Email', placeholder: 'Enter your email', colSpan: 24, required: true,
        rules: [
          {
            validator: async (rule, value, callback) => {
              return await emailValidator(value);
            }
          }
        ],
      },
    ],
  };

  const handleFinish = useCallback(async values => {
    let isExistEmail = await forgotPasswordApi({ email: values.email })
    if (isExistEmail.status != STATUS_CODES.NOT_FOUND)
      setIsDone(true);
  }, []);

  const handleValuesChange = debounce(() => {
    setTimeout(() => {
      setFormInvalid(formValidator(form))
    }, 0);
  }, 500)

  return (
    <>
      <div className="box-form-login">
        <div className="box-form-login-back">
          <AtomArrowButton color="#888E9C" href="/login" direction="left" />
          <p>Back to login</p>
        </div>
        {!isDone ?
          <>
            <h3>Reset Password</h3>
            <p>Please enter your email address. We have emailed you instructions on how to reset your password.</p>
            <Form
              onValuesChange={handleValuesChange}
              validateMessages={validateMessages}
              onFinish={handleFinish}
              style={{ marginTop: 40 }}
              form={form}
              layout="vertical"
              requiredMark={false}
            >
              <FormBuilder meta={meta} form={form} />
              <Form.Item style={{ marginTop: 110, marginBottom: 0 }}>
                <Button block htmlType="submit" disabled={formInvalid}>Send</Button>
              </Form.Item>
            </Form>
          </> :
          <>
            <h3>Check your email</h3>
            <p>We have emailed you instructions on how to reset your password.</p>
            <p className="box-form-login-receive-email">
              Did not receive the email? <br />
              Check your spam filter, or <a onClick={() => setIsDone(false)}> try another email address</a>
            </p>
          </>
        }
      </div>
      <style jsx global>{`
        .box-form-login-receive-email {
          margin-top: 40px !important;
        }
        .box-form-login-receive-email a {
          font-weight: bold;
          text-decoration: underline;
          color: #272F3E;
          text-underline-position: from-font;
        }
      `}
      </style>
    </>
  );
}

export default OGForgotPasswordForm;
