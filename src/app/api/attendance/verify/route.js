// app/api/attendance/verify/route.js
import { NextResponse } from 'next/server'
import { getConnection } from '@/lib/db'

export async function POST(request) {
  const conn = await getConnection()
  try {
    const { scan } = await request.json()
    
    const [existingRows] = await conn.execute(
      'SELECT * FROM students WHERE scan = ?',
      [scan]
    )

    if (existingRows.length > 0) {
      return NextResponse.json({ status: 'taken' })
    }

    await conn.execute(
      'INSERT INTO students (create_time, scan) VALUES (NOW(), ?)',
      [scan]
    )

    return NextResponse.json({ status: 'new' })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.error()
  } finally {
    await conn.end()
  }
}
