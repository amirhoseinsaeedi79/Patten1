import React, { TextareaHTMLAttributes } from "react";

import classNames from "classnames";

import styles from "./styles.module.css";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelClassName?: string;
  fieldClassName?: string;
  wrapperClassName?: string;
  isError?: boolean;
}

export const Textarea: React.FC<IProps> = ({
  label,
  labelClassName,
  isError,
  fieldClassName,
  wrapperClassName,
  ...props
}) => {
  return (
    <div className={classNames(styles.content, wrapperClassName)}>
      <label
        htmlFor={props.id}
        className={classNames(styles.label, labelClassName)}
      >
        {label}
      </label>
      <textarea
        className={classNames(styles.field, fieldClassName, {
          [styles.fieldError]: isError,
        })}
        {...props}
      />
    </div>
  );
};