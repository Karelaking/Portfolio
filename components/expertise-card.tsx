import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

interface ExpertiseCardProps {
  title: string
  description: string
  skills: string[]
  pastelColor?: string
  viewMoreUrl?: string
  onViewMoreClick?: () => void
  className?: string
  animationDelay?: number
}

export default function ExpertiseCard({
  title,
  description,
  skills,
  pastelColor = "blue",
  viewMoreUrl,
  onViewMoreClick,
  className,
  animationDelay = 0
}: ExpertiseCardProps) {
  const handleViewMore = () => {
    if (onViewMoreClick) {
      onViewMoreClick()
    } else if (viewMoreUrl) {
      window.open(viewMoreUrl, '_blank')
    }
  }

  const colorClasses = {
    purple: "hover:border-purple-300 dark:hover:border-purple-600",
    blue: "hover:border-blue-300 dark:hover:border-blue-600", 
    pink: "hover:border-pink-300 dark:hover:border-pink-600",
    green: "hover:border-green-300 dark:hover:border-green-600",
    yellow: "hover:border-yellow-300 dark:hover:border-yellow-600",
    indigo: "hover:border-indigo-300 dark:hover:border-indigo-600"
  }

  const buttonColorClasses = {
    purple: "text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-300 dark:hover:border-purple-600",
    blue: "text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-600",
    pink: "text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800 hover:bg-pink-50 dark:hover:bg-pink-950 hover:border-pink-300 dark:hover:border-pink-600",
    green: "text-green-600 dark:text-green-400 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-300 dark:hover:border-green-600",
    yellow: "text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-50 dark:hover:bg-yellow-950 hover:border-yellow-300 dark:hover:border-yellow-600",
    indigo: "text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-300 dark:hover:border-indigo-600"
  }

  return (
    <Card 
      className={cn(
        "bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white/80 dark:hover:bg-gray-900/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fade-in-up",
        colorClasses[pastelColor as keyof typeof colorClasses],
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
          {skills.map((skill, index) => (
            <Badge 
              key={index}
              variant="outline"
              className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleViewMore}
          className={cn(
            "transition-all duration-200",
            buttonColorClasses[pastelColor as keyof typeof buttonColorClasses]
          )}
        >
          View More
        </Button>
      </CardFooter>
    </Card>
  )
}