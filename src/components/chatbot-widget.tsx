
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Bot, User, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { askChatbot } from '@/ai/flows/ask-chatbot';
import type { AskChatbotInput } from '@/ai/types';
import { useTranslation } from '@/lib/i18n/use-translation';

type DisplayMessage = {
  text: string;
  sender: 'bot' | 'user';
};

export default function ChatbotWidget() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

   // Set initial greeting only once when component mounts
  useEffect(() => {
    setMessages([{ sender: 'bot', text: t('chatbot.greeting') }]);
  }, [t]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: DisplayMessage = { sender: 'user', text: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    const history: AskChatbotInput = currentMessages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      content: [{ text: msg.text }],
    }));

    try {
      const result = await askChatbot(history);
      console.log('Raw API Response:', result);

      // Safely access the response property with optional chaining and provide a default fallback
      const botResponseText = result?.response ?? t('chatbot.error');
      
      const botResponse: DisplayMessage = { sender: 'bot', text: botResponseText };
      setMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Chatbot error:", error);
      const errorResponse: DisplayMessage = { sender: 'bot', text: t('chatbot.error') };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
              <h3 className="font-semibold">{t('chatbot.title')}</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-primary/80">
              <X className="h-5 w-5" />
            </button>
          </header>
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
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
               {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                  <Avatar sender="bot" />
                  <div className="max-w-[75%] rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
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
                placeholder={t('chatbot.placeholder')}
                className="flex-1"
                autoComplete='off'
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
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
