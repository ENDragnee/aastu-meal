// app/api/attendance/count/route.js
import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'

export async function GET() {
  const conn = await getConnection()
  try {
    const [rows] = await conn.execute(
      'SELECT MAX(id) as lastId FROM students'
    )
    return NextResponse.json({ lastId: rows[0].lastId })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.error()
  } finally {
    await conn.end()
  }
}
