// app/api/attendance/recent/route.js
import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'

export async function GET() {
  const conn = await getConnection()
  try {
    const [rows] = await conn.execute(
      'SELECT * FROM students ORDER BY create_time DESC LIMIT 10'
    )
    return NextResponse.json({ entries: rows })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.error()
  } finally {
    await conn.end()
  }
}