import React from 'react'
import { Button } from '@heroui/react';
import { NavLink } from 'react-router-dom';

export default function MyButton({styles , children , variant , target}) {
  return (
    <Button as={NavLink} to={target}  color="primary" variant={variant} className={`${styles} `}>{children}</Button>
  )
}
