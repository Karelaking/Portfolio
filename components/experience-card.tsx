import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface ExperienceCardProps {
  title: string
  description: string
  tech: string[]
  viewMoreUrl?: string
  onViewMoreClick?: () => void
  className?: string
  animationDelay?: number
}

export default function ExperienceCard({
  title,
  description,
  tech,
  viewMoreUrl,
  onViewMoreClick,
  className,
  animationDelay = 0
}: ExperienceCardProps) {
  const handleViewMore = () => {
    if (onViewMoreClick) {
      onViewMoreClick()
    } else if (viewMoreUrl) {
      window.open(viewMoreUrl, '_blank')
    }
  }

  return (
    <Card 
      className={cn(
        "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-white/80 dark:hover:bg-gray-900/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
          {description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2">
          {tech.map((item, index) => (
            <Badge 
              key={index}
              variant="outline"
              className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {item}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewMore}
          className="text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200"
        >
          View More
        </Button>
      </CardFooter>
    </Card>
  )
}