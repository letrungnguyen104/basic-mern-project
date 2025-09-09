import React from 'react'
import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
  return (
    <Card className="p-8 text-center border-0 bg-gradient-card shadow-custom-md">
      <div className="space-y-3">
        <Circle className="size-12 mx-auto text-muted-foreground" />
        <div>
          <h3 className='font-medium text-foreground'>
            {
              filter === 'active' ? 'You don not have any active task!' :
                filter === 'complete' ? 'You do not have any completed task!' : 'You don not have any task!'
            }
          </h3>
          <p className='text-sm text-muted-foreground'>
            {
              filter === 'all' ? 'Add first task to start!' : `'Move to "all" to see ${filter === 'active' ? 'completed task' : 'doing task'}`
            }
          </p>
        </div>
      </div>
    </Card>
  )
}

export default TaskEmptyState