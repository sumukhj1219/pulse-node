import React from 'react'
import Grid from '@/components/Grid'
const AuthLayout = ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <Grid>
     <div className='flex items-center justify-center mx-auto min-h-screen'>
      {children}
    </div>
    </Grid>
  )
}

export default AuthLayout
