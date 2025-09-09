import React from 'react'

const Footer = ({ completedTaskCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className='text-center'>
          <p className='text-sm text-muted-foreground'>
            {completedTaskCount > 0 && (
              <>
                Great, you have completed {completedTaskCount} task
                {
                  activeTaskCount > 0 && `, ${activeTaskCount} task left. Try your best!`
                }
              </>
            )}
            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>
                Lets start {activeTaskCount} task!
              </>
            )}
          </p>
        </div>
      )}
    </>
  )
}

export default Footer