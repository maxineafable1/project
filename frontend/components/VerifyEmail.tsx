'use client'

import { verifyEmail } from '@/actions/auth-actions'
import React, { useEffect, useState } from 'react'

export default function VerifyEmail({
  tokenVal,
}: {
  tokenVal: string
}) {
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    async function fetch() {
      const res = await verifyEmail(tokenVal)
      if (res.error)
        setErr(res.error)
    }

    fetch()
  }, [tokenVal])

  return (
    <div>{err ? err : 'Verifying your email'}</div>
  )
}
