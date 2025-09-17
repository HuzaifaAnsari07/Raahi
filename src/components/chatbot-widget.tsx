'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { faqs } from '@/lib/data';

type Message = {
  text: string;
  sender: 'bot' | 'user';
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: "Hello! I'm the NMMT assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Simple FAQ-based response logic
    const matchingFaq = faqs.find(faq => input.toLowerCase().includes(faq.question.toLowerCase().split(' ')[0]));
    
    let botResponse: Message;
    if (matchingFaq) {
      botResponse = { sender: 'bot', text: matchingFaq.answer };
    } else {
      botResponse = { sender: 'bot', text: "I'm sorry, I don't have an answer for that. You can try asking about ticket booking, bus tracking, or our helpline number." };
    }
    
    setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <Bot className="h-8 w-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-80 rounded-lg p-0 border-0 shadow-2xl mr-4 mb-2"
        sideOffset={10}
      >
        <div className="flex flex-col h-96">
          <header className="flex items-center justify-between p-3 bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-6" />
              <h3 className="font-semibold">NMMT Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-primary/80">
              <X className="h-5 w-5" />
            </button>
          </header>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-end gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'bot' && <Avatar sender="bot" />}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    {message.text}
                  </div>
                   {message.sender === 'user' && <Avatar sender="user" />}
                </div>
              ))}
            </div>
          </ScrollArea>
          <footer className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1"
                autoComplete='off'
              />
              <Button type="submit" size="icon" disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </footer>
        </div>
      </PopoverContent>
    </Popover>
  );
}

const Avatar = ({ sender }: { sender: 'bot' | 'user'}) => (
    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full", sender === 'bot' ? 'bg-muted' : 'bg-primary')}>
        {sender === 'bot' ? <Bot className="h-5 w-5 text-muted-foreground" /> : <User className="h-5 w-5 text-primary-foreground" />}
    </div>
)
