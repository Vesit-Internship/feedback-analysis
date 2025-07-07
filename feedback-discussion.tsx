'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Heart,
  Reply,
  MoreHorizontal,
  Star,
  Search,
  Send,
  ThumbsUp,
  Flag,
  Pin,
  Shield,
  Calendar,
  Activity,
  Baby,
  Brain,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

type UserRole = 'user' | 'admin' | 'moderator';

type FeedbackReply = {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: UserRole;
    title?: string;
  };
  content: string;
  date: string;
  likes: number;
};

type Feedback = {
  id: number;
  user: {
    name: string;
    avatar: string;
    role: UserRole;
    verified?: boolean;
    title?: string;
  };
  title: string;
  content: string;
  category: string;
  rating: number;
  date: string;
  likes: number;
  replies: number;
  tags?: string[];
  isPinned: boolean;
  replies_data: FeedbackReply[];
};

const feedbackData: Feedback[] = [/* your existing data goes here unchanged */];

const FeedbackDiscussion: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [expandedFeedback, setExpandedFeedback] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');
  const [newFeedback, setNewFeedback] = useState<{
    title: string;
    content: string;
    category: string;
    rating: number;
    anonymous: boolean;
  }>({
    title: '',
    content: '',
    category: '',
    rating: 5,
    anonymous: false,
  });

  const getCategoryIcon = (category: string): JSX.Element => {
    switch (category) {
      case 'Symptom Tracking':
        return <Activity className="h-4 w-4" />;
      case 'Fertility Monitoring':
        return <Baby className="h-4 w-4" />;
      case 'Health Insights':
        return <Brain className="h-4 w-4" />;
      case 'Period Tracking':
        return <Calendar className="h-4 w-4" />;
      case 'Mood Tracking':
        return <Heart className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: UserRole): string => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'moderator':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleSubmitFeedback = () => {
    console.log('Submitting feedback:', newFeedback);
    setShowSubmissionForm(false);
    setNewFeedback({
      title: '',
      content: '',
      category: '',
      rating: 5,
      anonymous: false,
    });
  };

  const handleReply = (feedbackId: number) => {
    console.log('Replying to feedback:', feedbackId, replyText);
    setReplyText('');
  };

  return (
    // KEEP YOUR EXISTING JSX HERE EXACTLY
    // No need to change JSX; only types were added
    // Your existing functional component markup follows from here
  );
};

export default FeedbackDiscussion;
