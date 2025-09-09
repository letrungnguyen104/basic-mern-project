import React, { useState } from 'react'
import { Card } from './ui/card'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from '@/lib/axios';
import { toast } from 'sonner';

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Delete task successfully!');
      handleTaskChanged();
    } catch (error) {
      console.error('Error deleting task!');
      toast.error('Error deleting task!');
    }
  }

  const updateTask = async (taskId) => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${taskId}`, {
        title: updateTaskTitle
      });
      toast.success(`The task has just been changed to ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error('Error updating task!');
      toast.error('Error updating task!');
    }
  }

  const toggleTaskCompleteButton = async (taskId) => {
    try {
      if (task.status === 'active') {
        await api.put(`/tasks/${taskId}`, {
          status: 'complete',
          completedAt: new Date().toISOString()
        });
        handleTaskChanged();
        toast.success(`Task ${task.title} has been completed!`);
      } else {
        await api.put(`/tasks/${taskId}`, {
          status: 'active',
          completedAt: null
        });
        handleTaskChanged();
        toast.success(`Task ${task.title} has been updated!`);
      }
    } catch (error) {
      console.error('Error changing task status!');
      toast.error('Error changing task status!');
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      updateTask(task._id);
    }
  }

  return (
    <>
      <Card className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === 'complete' && 'opacity-75'
      )} style={{ animationDelay: `${index * 50}ms` }}>
        <div className='flex items-center gap-4'>
          {/* Nút tròn */}
          <Button variant='ghost' size="icon" className={cn(
            "flex-shrink-0 size-8 rounded-full transition-all duration-200",
            task.status === 'complete' ? 'text-success hover:text-success/80' :
              'text-muted-foreground hover:text-primary'
          )}
            onClick={() => toggleTaskCompleteButton(task._id)}
          >
            {task.status === 'complete' ? (
              <CheckCircle2 className='size-5' />
            ) : (
              <Circle className='size-5' />
            )}
          </Button>
          {/* Hiển thị hoặc chỉnh sửa tiêu đề */}
          <div className='flex-1 min-w-0'>
            {isEditting ? (
              <Input
                placeholder="What do you want to do?"
                className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                type="text"
                value={updateTaskTitle}
                onChange={(e) => setUpdateTaskTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  setIsEditting(false);
                  setUpdateTaskTitle(task.title || "");
                }}
              />
            ) : (
              <p className={cn(
                "text-base transition-all duration-200",
                task.status === 'complete' ? 'line-through text-muted-foreground' : 'text-foreground'
              )}>
                {task.title}
              </p>
            )}

            {/* Ngày tạo và ngày hoàn thành */}
            <div className='flex items-center gap-2 mt-1'>
              <Calendar className='size-3 text-muted-foreground' />
              <span className='text-xs text-muted-foreground '>
                {new Date(task.createdAt).toLocaleString()}
              </span>
              {task.completedAt && (
                <>
                  <span className='text-xs text-muted-foreground'> - </span>
                  <Calendar className='size-3 text-muted-foreground' />
                  <span className='text-xs text-muted-foreground'>
                    {new Date(task.completedAt).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>
          {/* Nút chỉnh và xoá */}
          <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
            {/* Nút edit */}
            <Button
              variant='ghost'
              size='icon'
              className='flex shrink-0 transition-colors size-8 text-muted-foreground hover:text-info'
              onClick={() => {
                setIsEditting(true);
                setUpdateTaskTitle(task.title || "");
              }}
            >
              <SquarePen className='size-4' />
            </Button>

            {/* Nút xoá */}
            <Button
              variant='ghost'
              size='icon'
              className='flex shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive'
              onClick={() => deleteTask(task._id)}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default TaskCard