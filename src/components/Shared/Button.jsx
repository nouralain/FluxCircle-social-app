import React from 'react'
import { Button } from '@heroui/react';
import { NavLink } from 'react-router-dom';

export default function MyButton({isLoading, styles , event , btnType, children ,disabled,  variant , target}) {
  if (target) {
    return (
      <Button isLoading={isLoading} as={NavLink}  onClick={event}  to={target} color="primary" variant={variant} className={styles}>
        {children}
      </Button>
    )
  }

  return (
    <Button isLoading={isLoading} disabled={disabled} type={btnType} onClick={event} color="primary" variant={variant} className={styles}>
      {children}
    </Button>
  )
}
