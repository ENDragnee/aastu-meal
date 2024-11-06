'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export default function StudentVerificationComponent() {
  const [qrCode, setQrCode] = useState('')
  const [message, setMessage] = useState('')
  const [lastStudentId, setLastStudentId] = useState(0)
  const [recentEntries, setRecentEntries] = useState([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (message) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        setMessage('')
      }, 3000)
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [message])

  useEffect(() => {
    fetchLastStudentId()
    fetchRecentEntries()
  }, [])

  const fetchLastStudentId = async () => {
    try {
      const response = await fetch('/api/attendance/count')
      const data = await response.json()
      setLastStudentId(data.lastId)
    } catch (error) {
      console.error('Error fetching last student ID:', error)
    }
  }

  const fetchRecentEntries = async () => {
    try {
      const response = await fetch('/api/attendance/recent')
      const data = await response.json()
      setRecentEntries(data.entries.map(entry => ({
        id: entry.scan,
        timestamp: new Date(entry.create_time)
      })))
    } catch (error) {
      console.error('Error fetching recent entries:', error)
    }
  }

  const handleInputChange = async (e) => {
    const scannedCode = e.target.value
    setQrCode(scannedCode)

    if (scannedCode.length > 0) {
      try {
        const response = await fetch('/api/attendance/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ scan: scannedCode }),
        })

        const data = await response.json()

        if (response.ok) {
          if (data.status === 'new') {
            setMessage('Welcome!')
            fetchLastStudentId() // Refresh the last student ID
            setRecentEntries(prev => [{
              id: scannedCode,
              timestamp: new Date()
            }, ...prev].slice(0, 10))
          } else {
            setMessage('Already Taken!')
          }
        } else {
          setMessage('Error occurred!')
        }
      } catch (error) {
        console.error('Error verifying attendance:', error)
        setMessage('Error occurred!')
      }

      setQrCode('')
    }
  }

  const handleReset = async () => {
    try {
      await fetch('/api/attendance/reset', {
        method: 'POST'
      })
      fetchLastStudentId() // Refresh the last student ID after reset
      setRecentEntries([])
      setMessage('Reset successful!')
    } catch (error) {
      console.error('Error resetting:', error)
      setMessage('Reset failed!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-100">Student Verification</CardTitle>
          <CardDescription className="text-center text-gray-400">Scan your QR code to enter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-300">Last Student ID</h2>
            <p className="text-4xl font-bold text-blue-400">{lastStudentId}</p>
          </div>
          <Input
            type="text"
            placeholder="Scan QR Code"
            value={qrCode}
            onChange={handleInputChange}
            className="bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
            autoFocus
          />
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={handleReset}
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Reset
            </Button>
          </div>
          {message && (
            <div className={`mt-4 p-2 rounded-lg text-center ${message === 'Welcome!' ? 'bg-green-500' : 'bg-red-500'}`}>
              {message}
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Recent Entries</h3>
            <ScrollArea className="h-[200px] w-full rounded border border-gray-700">
              {recentEntries.map((entry, index) => (
                <div key={index} className="p-2 border-b border-gray-700 last:border-b-0">
                  <p className="text-sm text-gray-400">
                    ID: {entry.id} - {entry.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}