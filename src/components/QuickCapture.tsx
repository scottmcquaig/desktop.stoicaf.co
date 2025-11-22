'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic, Send, X, Loader2 } from 'lucide-react';

interface QuickCaptureProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickCapture({ open, onOpenChange }: QuickCaptureProps) {
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const maxLength = 280;

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setSaving(true);
    // For now, navigate to new journal with the quick capture text
    // In production, this would save to Firestore
    const encodedText = encodeURIComponent(text.trim());
    router.push(`/journal/new?quickCapture=${encodedText}`);
    onOpenChange(false);
    setText('');
    setSaving(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setText('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md mx-auto rounded-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Quick Capture</span>
            <span className="text-xs text-slate-400 font-normal hidden sm:inline">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">Cmd</kbd>
              {' + '}
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">K</kbd>
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Quickly capture a thought to add to your journal
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Capture a quick thought..."
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, maxLength))}
              className="min-h-[120px] sm:min-h-[120px] resize-none pr-12 border-slate-300 focus:ring-2 focus:ring-stoic-blue focus:border-transparent text-base"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />
            <div className="absolute bottom-3 right-3 text-xs text-slate-400">
              {text.length}/{maxLength}
            </div>
          </div>

          {/* Mobile-optimized button layout */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-between gap-3">
            <Button
              variant="outline"
              className="text-slate-500 min-h-11 justify-center"
              disabled
              title="Voice capture coming soon"
            >
              <Mic className="h-5 w-5 mr-2" />
              Voice (coming soon)
            </Button>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                onClick={handleClose}
                className="flex-1 sm:flex-none min-h-11"
              >
                <X className="h-5 w-5 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!text.trim() || saving}
                className="flex-1 sm:flex-none min-h-11 bg-stoic-blue hover:bg-sky-600"
              >
                {saving ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Send className="h-5 w-5 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center hidden sm:block">
            Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[10px]">Cmd+Enter</kbd> to save
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
