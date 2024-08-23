import classNames from 'classnames';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import {
  Control,
  Controller,
  FieldValues,
  Path,
} from 'react-hook-form';
import DatePicker from 'react-multi-date-picker';

import eventIcon from '@/assets/icons/event.svg';


import styles from './styles.module.css';

interface IProps<T extends FieldValues> {
  label: string;
  id: Path<T>;
  control: Control<T, unknown>;
  labelClassName?: string;
  fieldClassName?: string;
  isError?: boolean;
}

export const DateInput = <T extends FieldValues>({
  label,
  id,
  control,
  fieldClassName,
  labelClassName,
  isError = false,
}: IProps<T>) => {
  return (
    <div className={styles.content}>
      <label className={classNames(styles.label, labelClassName)} htmlFor={id}>
        {label}
      </label>
      <div className={styles.innerDivider}>
        <div className={styles.pos}>
          <Controller
            control={control}
            name={id}
            render={({ field: { onChange, value } }) => (
              <DatePicker
                containerClassName="w-full"
                render={
                  <input
                    id={id}
                    placeholder="روز/ ماه/ سال"
                    className={classNames(styles.dateField , fieldClassName , {
                      [styles.fieldError]: isError,
                    })}
                  />
                }
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                calendarPosition="top"
                fixMainPosition={false}
                showOtherDays
                fixRelativePosition={false}
                value={value || ""}
                onChange={(date) => {
                  onChange(date ? date.toString() : "");
                }}
                id={id}
              />
            )}
          />
          <img className={styles.icon} src={eventIcon} />
        </div>
      </div>
    </div>
  );
};
