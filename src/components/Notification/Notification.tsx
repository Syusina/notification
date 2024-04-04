import { FC, useEffect, useState } from 'react';
import styles from './Notification.module.css';
import successIcon from './success.png';
import errorIcon from './error.png';

interface Props {
  status: string;
  label: string;
  text: string;
  buttonClicked: boolean;
}

const Notification: FC<Props> = ({ status, label, text, buttonClicked }) => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [count, setCount] = useState<any>(null);
  const duration = 3000;
  let currentValue = 0;
  const interval = 30;
  const maxValue = 100;
  const step = (maxValue / (duration / interval));

  useEffect(() => {
    const count = setInterval(() => {
      if (currentValue <= maxValue) {
        setValue(currentValue);
        setIsVisible(true);
      } else {
        clearInterval(count);
        setIsVisible(false);
      }
      currentValue += step;
    }, interval);

    setCount(count);

    return () => {
      if (count) {
        clearInterval(count);
      }
    };
  }, [status, label, text, buttonClicked]);

  const focusMouse = () => {
    setValue(value);
    if (count) {
      clearInterval(count);
    }
  }

  const downMouse = () => {
    currentValue = value;
    const count = setInterval(() => {
      if (currentValue <= maxValue) {
        setValue(currentValue);
      } else {
        clearInterval(count);
        setIsVisible(false);
      }
      currentValue += step;
    }, interval);
  
    setCount(count);
  };

  return (
    <>
      {isVisible && (
        <div className={styles.wrapper}  onMouseEnter={focusMouse} onMouseLeave={downMouse}>
          <div className={styles.notification}>
            <img 
              src={status === 'success' ? successIcon : errorIcon}
              alt='statusIcon'
              className={styles.icon}
            />
            <div className={styles.info}>
              <label className={styles.label}>{label}</label>
              <p className={styles.text}>{text}</p>
              <div className={styles.progressBar}>
                <div className={styles.progressValue} style={{ width: `${value}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
};

export default Notification;