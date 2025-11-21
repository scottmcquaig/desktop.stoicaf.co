'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Quick Capture</span>
            <span className="text-xs text-slate-400 font-normal">
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">Cmd</kbd>
              {' + '}
              <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">K</kbd>
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Capture a quick thought..."
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, maxLength))}
              className="min-h-[120px] resize-none pr-12 border-slate-300 focus:ring-2 focus:ring-stoic-blue focus:border-transparent"
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

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-500"
              disabled
              title="Voice capture coming soon"
            >
              <Mic className="h-4 w-4 mr-2" />
              Voice
            </Button>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!text.trim() || saving}
                className="bg-stoic-blue hover:bg-sky-600"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Press <kbd className="px-1 py-0.5 bg-slate-100 rounded text-[10px]">Cmd+Enter</kbd> to save
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
