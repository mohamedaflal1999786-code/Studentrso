// components/career-assistant/ConversationSidebar.tsx
'use client';

import { useState } from 'react';
import {
  Plus,
  MessageSquare,
  Trash2,
  Edit2,
  Check,
  X,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ConversationSession } from '@/lib/ai/types';

interface ConversationSidebarProps {
  conversations: ConversationSession[];
  activeId: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, newTitle: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function ConversationSidebar({
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
  onClearAll,
  isOpen,
  onToggleOpen,
}: ConversationSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  function startRename(conv: ConversationSession, e: React.MouseEvent) {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditTitle(conv.title);
  }

  function handleSaveRename(id: string, e: React.MouseEvent | React.FormEvent) {
    e.stopPropagation();
    if (editTitle.trim()) {
      onRenameConversation(id, editTitle.trim());
    }
    setEditingId(null);
  }

  return (
    <aside
      className={`transition-all duration-200 border-r border-[#efe3cc] bg-[#fdfbf6] flex flex-col justify-between shrink-0 ${
        isOpen ? 'w-72 sm:w-80 p-4' : 'w-0 p-0 overflow-hidden border-none'
      }`}
    >
      <div className="flex flex-col h-full space-y-4">
        {/* Top: New Chat Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNewConversation}
            className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#8c2f39] text-white hover:bg-[#6d1824] transition shadow-xs flex items-center justify-center gap-2 font-sans text-xs font-bold"
          >
            <Plus className="w-4 h-4" /> New Conversation
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 font-sans">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#7a6a5a] px-2 py-1">
            Recent Conversations ({conversations.length})
          </div>

          {conversations.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-[#efe3cc] text-center text-xs text-[#7a6a5a] mt-2">
              <MessageSquare className="w-8 h-8 text-[#d8c7ad] mx-auto mb-1.5" />
              <span>No past chats yet. Start a new conversation to begin!</span>
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = conv.id === activeId;
              const isEditing = editingId === conv.id;

              return (
                <div
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`group relative p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs ${
                    isActive
                      ? 'bg-[#8c2f39]/10 border-[#8c2f39]/30 text-[#8c2f39] font-bold'
                      : 'bg-white border-[#efe3cc] hover:bg-[#fbf5e9] text-[#2b2118]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#8c2f39]' : 'text-[#7a6a5a]'}`} />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editTitle}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSaveRename(conv.id, e);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                        autoFocus
                        className="w-full text-xs px-1.5 py-0.5 rounded border border-[#8c2f39] bg-white text-[#2b2118] focus:outline-none"
                      />
                    ) : (
                      <span className="truncate">{conv.title}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={(e) => handleSaveRename(conv.id, e)}
                          className="p-1 hover:text-emerald-700 transition"
                          title="Save"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingId(null);
                          }}
                          className="p-1 hover:text-stone-700 transition"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </>
                    ) : (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => startRename(conv, e)}
                          className="p-1 text-[#7a6a5a] hover:text-[#8c2f39] transition"
                          title="Rename"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteConversation(conv.id);
                          }}
                          className="p-1 text-[#7a6a5a] hover:text-red-700 transition"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions */}
        {conversations.length > 0 && (
          <div className="pt-3 border-t border-[#efe3cc]">
            <button
              type="button"
              onClick={onClearAll}
              className="w-full py-1.5 text-xs text-[#7a6a5a] hover:text-red-700 transition text-center flex items-center justify-center gap-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All History
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
