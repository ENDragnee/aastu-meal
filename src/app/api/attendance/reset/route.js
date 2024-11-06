// app/api/attendance/reset/route.js
import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'

export async function POST() {
  const conn = await getConnection()
  try {
    await conn.execute(
      'TRUNCATE TABLE students;'
    )
    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.error()
  } finally {
    await conn.end()
  }
}