import { CSSProperties } from "react";
import { theme } from "antd";
import { FormItem, InputField, PasswordField } from "./styles";

const TextField = ({
  value,
  type,
  message,
  placeholder,
  label,
  name,
  suffix,
  styleFormItem,
  style,
  disabled,
  required,
  isTable,
  ...rest
}) => {
  const { useToken } = theme;
  const { token } = useToken();

  const rules =
    name !== "confirmPassword"
      ? [
          {
            required: required || false,
            message: message,
          },
        ]
      : [
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, val) {
              if (!val || getFieldValue("password") === val) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ];

  return (
    <FormItem
      name={name}
      label={label}
      rules={rules}
      style={{ ...styleFormItem }}
      isTable={isTable}
    >
      {type === "password" ? (
        <PasswordField
          disabled={disabled}
          name={name}
          value={value}
          size="large"
          theme={token}
          placeholder={placeholder}
          style={{
            color: token.colorTextHeading,
            borderRadius: "0",
            ...style,
          }}
          suffix={suffix}
          {...rest}
        />
      ) : (
        <InputField
          disabled={disabled}
          type={type}
          value={value}
          name={name}
          theme={token}
          size="large"
          placeholder={placeholder}
          style={{
            color: token.colorTextHeading,
            borderRadius: "0",
            ...style,
          }}
          isTable={isTable}
          suffix={suffix}
          {...rest}
        />
      )}
    </FormItem>
  );
};

export default TextField;
