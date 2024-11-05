'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

// Simulated database
let attendanceDB = new Map()
let dailyCount = 0

interface RecentEntry {
  id: string;
  timestamp: Date;
}

export function StudentVerificationComponent() {
  const [qrCode, setQrCode] = useState('')
  const [message, setMessage] = useState('')
  const [count, setCount] = useState(0)
  const [recentEntries, setRecentEntries] = useState<RecentEntry[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Reset the database and count at midnight
    const now = new Date()
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // the next day
      0, 0, 0 // at 00:00:00 hours
    )
    const msToMidnight = night.getTime() - now.getTime()

    const timer = setTimeout(() => {
      attendanceDB.clear()
      dailyCount = 0
      setCount(0)
      setRecentEntries([])
    }, msToMidnight)

    return () => clearTimeout(timer)
  }, [])

  const handleVerification = (code: string) => {
    const now = new Date();
    const today = now.toDateString();

    if (attendanceDB.has(code)) {
      const lastEntry = attendanceDB.get(code);
      if (lastEntry.toDateString() === today) {
        setMessage("You have already registered today.");
      } else {
        attendanceDB.set(code, now);
        dailyCount++;
        setCount(dailyCount);
        setMessage("Welcome!");
        addRecentEntry(code);
      }
    } else {
      attendanceDB.set(code, now);
      dailyCount++;
      setCount(dailyCount);
      setMessage("Welcome!");
      addRecentEntry(code);
    }

    // Clear the input after processing
    setQrCode('');
  };

  const addRecentEntry = (id: string) => {
    const newEntry = { id, timestamp: new Date() };
    setRecentEntries(prevEntries => {
      const updatedEntries = [newEntry, ...prevEntries.slice(0, 9)];
      return updatedEntries;
    });
  };

  const handleReset = () => {
    attendanceDB.clear();
    dailyCount = 0;
    setCount(0);
    setRecentEntries([]);
    setMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scannedCode = e.target.value;
    setQrCode(scannedCode);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      if (scannedCode.length > 0) {
        handleVerification(scannedCode);
      }
    }, 100); // 100ms delay
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-100">Student Verification</CardTitle>
          <CardDescription className="text-center text-gray-400">Scan your QR code to enter</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-300">Daily Attendance</h2>
            <p className="text-4xl font-bold text-blue-400">{count}</p>
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