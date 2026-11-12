'use client'

import * as React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/common/Avatar'
import {
  Bell,
  Calendar,
  Megaphone,
  Pin,
  Plus,
  Send,
  Heart,
  MessageCircle,
  CheckCircle2,
  Cake,
  Award,
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  date: string
  category: 'Company Update' | 'Policy' | 'Celebration' | 'Event'
  pinned: boolean
  likes: number
}

const initialPosts: Announcement[] = [
  {
    id: 'ann-1',
    title: '🎉 PeopleCore HRMS 2.0 Official Rollout Across All Branches',
    content:
      'We are thrilled to launch PeopleCore HRMS 2.0 for all employees across Bangalore, Hyderabad, Mumbai, and San Francisco! Enjoy instant check-ins, transparent leave quotas, seamless tax slips, and streamlined 360 appraisals.',
    author: 'Vinay Vakati (People Operations)',
    date: '10 Nov 2026',
    category: 'Company Update',
    pinned: true,
    likes: 42,
  },
  {
    id: 'ann-2',
    title: '📅 Annual All-Hands Town Hall & Product Roadmap Session',
    content:
      'Join executive leadership this Friday at 4:00 PM IST on Zoom for our quarterly financial performance review, upcoming client enterprise milestones, and live Q&A.',
    author: 'Executive Office',
    date: '08 Nov 2026',
    category: 'Event',
    pinned: false,
    likes: 29,
  },
  {
    id: 'ann-3',
    title: '🌴 Diwali & Winter Holiday Schedule Published',
    content:
      'The unified 2026-2027 statutory holiday calendar for India and US teams has been uploaded to the Documents module. All branches will remain closed from Nov 14 – Nov 16.',
    author: 'HR Administration',
    date: '04 Nov 2026',
    category: 'Policy',
    pinned: false,
    likes: 35,
  },
]

export function AnnouncementsClient() {
  const [posts, setPosts] = React.useState<Announcement[]>(initialPosts)
  const [showNewModal, setShowNewModal] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [category, setCategory] = React.useState<Announcement['category']>('Company Update')
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null)

  const handleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    )
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return

    const newPost: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      author: 'Vinay Vakati (HR Admin)',
      date: 'Just now',
      category,
      pinned: false,
      likes: 1,
    }

    setPosts([newPost, ...posts])
    setTitle('')
    setContent('')
    setShowNewModal(false)
    setSuccessMsg('Announcement published to company feed!')
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  return (
    <div className="space-y-6">
      {successMsg && (
        <div className="bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] px-4 py-2.5 rounded-[6px] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#16a34a]" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Header and post action */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111827]">Company Bulletin Board</h3>
          <p className="text-xs text-[#6b7280]">Real-time broadcasts and cultural milestones.</p>
        </div>
        <Button
          size="sm"
          onClick={() => setShowNewModal(!showNewModal)}
          className="h-8 gap-1 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white"
        >
          <Plus className="h-3.5 w-3.5" /> Post Announcement
        </Button>
      </div>

      {/* New Post Form */}
      {showNewModal && (
        <Card className="p-4 border-2 border-[#5e2b9d]/20 bg-[#faf8fc]">
          <form onSubmit={handleCreate} className="space-y-3">
            <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider">
              Draft New Announcement
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <Label className="text-xs">Subject / Headline</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Health Insurance Policy Renewal 2027"
                  className="text-xs h-8"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Category</Label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full text-xs h-8 border border-[#e5e7eb] rounded-[6px] px-2 bg-white"
                >
                  <option value="Company Update">Company Update</option>
                  <option value="Policy">Policy</option>
                  <option value="Event">Event</option>
                  <option value="Celebration">Celebration</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Announcement Details</Label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write message to employees..."
                className="text-xs h-20"
                required
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowNewModal(false)}
                className="h-8 text-xs"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="h-8 text-xs bg-[#5e2b9d] hover:bg-[#4d2382] text-white gap-1"
              >
                <Send className="h-3.5 w-3.5" /> Publish Now
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Feed */}
      <div className="space-y-4 max-w-3xl">
        {posts.map((post) => (
          <Card key={post.id} className="p-5 hover:border-[#d1d5db] transition-colors bg-white">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    post.category === 'Company Update'
                      ? 'bg-purple-50 text-[#5e2b9d]'
                      : post.category === 'Event'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {post.category}
                </span>
                {post.pinned && (
                  <span className="text-[10px] text-amber-700 bg-amber-50 font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <Pin className="h-3 w-3" /> Pinned
                  </span>
                )}
              </div>
              <span className="text-xs text-[#9ca3af]">{post.date}</span>
            </div>

            <h4 className="text-sm font-bold text-[#111827] mt-2.5">{post.title}</h4>
            <p className="text-xs text-[#374151] mt-2 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#f3f4f6] text-xs">
              <span className="text-[11px] text-[#6b7280]">
                Posted by <strong className="text-[#111827]">{post.author}</strong>
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-[#6b7280] hover:text-[#dc2626] transition-colors cursor-pointer"
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span className="text-xs">{post.likes}</span>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

