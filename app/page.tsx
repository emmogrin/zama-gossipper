'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const handleSubmit = async () => {
    if (!message.trim()) return
    await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
    setMessage('')
    fetchMessages()
  }

  const fetchMessages = async () => {
    const res = await fetch('/api/post')
    const data = await res.json()
    setMessages(data.messages.reverse())
  }

  useEffect(() => { fetchMessages() }, [])

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Zama Gossipper 🕵️‍♂️</h1>
      <textarea
        placeholder="Say something anonymously..."
        className="w-full p-3 rounded border mb-3"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
        onClick={handleSubmit}
      >
        Submit
      </button>
      <div className="mt-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">{msg}</div>
        ))}
      </div>
    </main>
  )
}
