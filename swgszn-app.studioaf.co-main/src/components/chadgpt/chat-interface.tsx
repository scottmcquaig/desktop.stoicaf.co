'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Bot, Send, User } from 'lucide-react';
import { getAIChadGPTAction } from '@/lib/actions';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChadGPTSvg } from '../ChadGPTSvg';
import React from 'react';

const initialState = {
  advice: '',
  error: null,
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatInterface() {
  const [state, formAction] = useFormState(getAIChadGPTAction, initialState);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: 'assistant',
      content: "Greetings. I am a Stoic advisor. How can I help you apply these ancient principles to your modern life?",
    },
  ]);
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.advice) {
      setMessages((prev) => [...prev, { role: 'assistant', content: state.advice }]);
    }
    if (state.error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${state.error}` }]);
    }
  }, [state]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        // A bit of a hack to scroll to the bottom. A better solution might involve a ref on the viewport.
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if(viewport) viewport.scrollTop = viewport.scrollHeight;
    }
  }, [messages])

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string;
    if (query) {
      setMessages((prev) => [...prev, { role: 'user', content: query }]);
      formAction(formData);
      formRef.current?.reset();
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <ScrollArea className="h-96 w-full p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div key={index} className={cn('flex items-start gap-3', message.role === 'user' && 'justify-end')}>
                {message.role === 'assistant' && (
                  <Avatar className="size-8 border bg-primary text-primary-foreground p-1">
                    <ChadGPTSvg />
                  </Avatar>
                )}
                <div className={cn(
                    'max-w-sm rounded-lg px-4 py-3 text-sm shadow-sm',
                    message.role === 'user' ? 'rounded-br-none bg-primary text-primary-foreground' : 'rounded-bl-none bg-muted'
                )}>
                  <p className="leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="size-8 border">
                    <AvatarFallback><User size={18} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {useFormStatus().pending && (
                <div className="flex items-start gap-3">
                    <Avatar className="size-8 border bg-primary text-primary-foreground p-1">
                        <ChadGPTSvg />
                    </Avatar>
                    <div className="max-w-sm rounded-lg rounded-bl-none bg-muted px-4 py-3 text-sm shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]" />
                            <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]" />
                            <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50" />
                        </div>
                    </div>
                </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form action={handleFormSubmit} ref={formRef} className="flex w-full items-center gap-2">
          <Input name="query" placeholder="Ask about a Stoic principle..." className="flex-1" />
          <SubmitButton />
        </form>
      </CardFooter>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" aria-label="Send message" disabled={pending}>
      <Send className="size-4" />
    </Button>
  );
}
