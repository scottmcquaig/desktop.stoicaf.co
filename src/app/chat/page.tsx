'use client'

import { useState } from 'react'
import { AppLayout } from '@/components/layout/app-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Sparkles, User } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: `Greetings, fellow Stoic. I am ChadGPT, your AI coach trained in the wisdom of Marcus Aurelius, Seneca, and Epictetus.

How may I assist you on your journey today? You can ask me:
• For advice on applying Stoic principles
• To help interpret your journal entries
• For perspective on challenges you're facing
• About the teachings of the Stoic philosophers`,
    timestamp: new Date(),
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock AI response based on keywords
    let response = ''
    const lowercaseInput = input.toLowerCase()

    if (lowercaseInput.includes('angry') || lowercaseInput.includes('anger')) {
      response = `"How much more grievous are the consequences of anger than the causes of it." - Marcus Aurelius

When anger arises, remember: the obstacle is not what happened, but your judgment of it. Ask yourself:
1. Will this matter in a year? In a week?
2. Is my anger solving the problem, or creating new ones?
3. What would the wisest version of myself do?

The Stoics taught that anger is a choice. You cannot control external events, but you can control your response. Take a breath, and choose reason over reaction.`
    } else if (lowercaseInput.includes('anxious') || lowercaseInput.includes('anxiety') || lowercaseInput.includes('worried')) {
      response = `"We suffer more often in imagination than in reality." - Seneca

Your anxiety is a projection into a future that does not yet exist. Consider:
1. What specifically are you worried about?
2. How much of this is within your control?
3. Have your past worries often materialized?

Focus on what you can do today. The present moment is the only reality. As Marcus Aurelius wrote: "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present."`
    } else if (lowercaseInput.includes('money') || lowercaseInput.includes('wealth') || lowercaseInput.includes('financial')) {
      response = `"Wealth consists not in having great possessions, but in having few wants." - Epictetus

The Stoics viewed external wealth as a "preferred indifferent" - useful, but not essential to the good life. Consider:
1. Are you pursuing money as a means or an end?
2. What would "enough" look like for you?
3. Is your financial anxiety about survival, or status?

True wealth is freedom from the tyranny of wants. Simplify your needs, and you simplify your path to contentment.`
    } else {
      response = `Thank you for sharing. Let me reflect on this through a Stoic lens.

Remember the dichotomy of control: focus your energy on what you can influence - your thoughts, choices, and actions. Release attachment to outcomes beyond your control.

"The happiness of your life depends upon the quality of your thoughts." - Marcus Aurelius

Would you like to explore this further? Tell me more about what's on your mind, and I'll offer more specific guidance.`
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-4rem)] lg:h-screen max-w-3xl mx-auto">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-stoic-blue flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">ChadGPT</h1>
              <p className="text-sm text-muted-foreground">Your Stoic AI Coach</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-stoic-blue flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.role === 'user'
                    ? 'bg-stoic-blue text-white rounded-br-sm'
                    : 'bg-gray-100 dark:bg-gray-800 rounded-bl-sm'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-stoic-blue flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 lg:p-6 border-t bg-white dark:bg-gray-900">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask ChadGPT for Stoic wisdom..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            ChadGPT provides Stoic-inspired guidance. Coming soon: Full AI integration.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
