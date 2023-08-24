import { Button } from 'antd';

export interface FormPrimaryButtonProps {
  children?: any;
  name?: string;
  disabled?: boolean;
}

export function FormPrimaryButton(props: FormPrimaryButtonProps) {
  return (
    <>
      <Button
        block
        type="primary"
        shape="round"
        size="large"
        htmlType="submit"
        className="form-primary-button"
        disabled={props.disabled}
      >
        {props.name}
      </Button>

      <style jsx global>{`
        .form .form-primary-button {
          font-weight: bold;
          font-size: 14px;
          text-transform: uppercase;
        }
      `}</style>
    </>
  );
}
