import React from 'react'
import { Button } from '@heroui/react';
import { NavLink } from 'react-router-dom';

export default function MyButton({styles , event , btnType, children ,disabled,  variant , target}) {
  return (
    <Button as={NavLink} to={target} disabled={disabled}  type={btnType} onClick={event} color="primary" variant={variant} className={`${styles} `}>{children}</Button>
  )
}
